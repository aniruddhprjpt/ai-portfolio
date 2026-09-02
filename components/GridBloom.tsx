"use client";

import { useRef, useMemo, useEffect } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";

/* ── Shaders (verbatim from 21st.dev / chamaac / grid-bloom) ── */
const vertexShader = `
varying vec2 vUv;
void main() {
  vUv = uv;
  gl_Position = vec4(position, 1.0);
}
`;

const fragmentShader = `
uniform float iTime;
uniform vec2 iResolution;
uniform vec3 uColor;
uniform float uSpeed;
uniform float uGridScale;
uniform float uRotationSpeed;
uniform float uFadeFalloff;
uniform float uDistortionAmount;
uniform float uFlowSpeedX;
uniform float uFlowSpeedY;
uniform float uHoverRepulsionRadius;
uniform float uHoverRepulsionStrength;
uniform float uHoverLightRadius;
uniform float uMouseActive;
uniform vec2 iMouse;
varying vec2 vUv;

vec3 permute(vec3 x) { return mod(((x*34.0)+10.0)*x, 289.0); }
float snoise(vec2 v) {
  const vec4 C = vec4(0.211324865405187, 0.366025403784439,
           -0.577350269189626, 0.024390243902439);
  vec2 i  = floor(v + dot(v, C.yy));
  vec2 x0 = v -   i + dot(i, C.xx);
  vec2 i1;
  i1 = (x0.x > x0.y) ? vec2(1.0, 0.0) : vec2(0.0, 1.0);
  vec4 x12 = x0.xyxy + C.xxzz;
  x12.xy -= i1;
  i = mod(i, 289.0);
  vec3 p = permute( permute( i.y + vec3(0.0, i1.y, 1.0))
  + i.x + vec3(0.0, i1.x, 1.0));
  vec3 m = max(0.5 - vec3(dot(x0,x0), dot(x12.xy,x12.xy),
    dot(x12.zw,x12.zw)), 0.0);
  m = m*m; m = m*m;
  vec3 x = 2.0 * fract(p * C.www) - 1.0;
  vec3 h = abs(x) - 0.5;
  vec3 ox = floor(x + 0.5);
  vec3 a0 = x - ox;
  m *= 1.792843 - 0.853735 * (a0*a0 + h*h);
  vec3 g;
  g.x  = a0.x  * x0.x  + h.x  * x0.y;
  g.yz = a0.yz * x12.xz + h.yz * x12.yw;
  return 130.0 * dot(m, g);
}

void mainImage(out vec4 fragColor, in vec2 fragCoord) {
  vec2 unrotatedP = (fragCoord.xy - 0.5 * iResolution.xy) / iResolution.y;
  vec2 mouseP = (iMouse.xy - 0.5 * iResolution.xy) / iResolution.y;
  vec2 mouseDir = unrotatedP - mouseP;
  float mouseDist = length(mouseDir);
  float mouseInfluence = smoothstep(uHoverRepulsionRadius, 0.0, mouseDist) * uMouseActive;

  float rot = iTime * uRotationSpeed * 0.3;
  mat2 m = mat2(cos(rot), -sin(rot), sin(rot), cos(rot));
  vec2 p = m * unrotatedP;

  float noiseDist = snoise(p * 1.5 + iTime * uSpeed * 0.15);
  vec2 distortedPos = p + vec2(noiseDist * uDistortionAmount);

  vec2 rotatedMouseDir = m * mouseDir;
  distortedPos += rotatedMouseDir * mouseInfluence * uHoverRepulsionStrength;

  vec2 gridPos = distortedPos * uGridScale;
  gridPos.x += iTime * uSpeed * uFlowSpeedX;
  gridPos.y += iTime * uSpeed * uFlowSpeedY;

  vec2 cell = fract(gridPos);
  vec2 cellCenter = abs(cell - 0.5);

  float lineWidth = 0.015;
  float smoothEdge = 0.03;
  vec2 lines = smoothstep(0.5 - lineWidth - smoothEdge, 0.5 - lineWidth, cellCenter);
  float gridAlpha = max(lines.x, lines.y);
  float intersections = lines.x * lines.y;

  float glowMask = snoise(floor(gridPos) * 0.4 + iTime * uSpeed * 0.4);
  float glow = smoothstep(0.2, 0.5, cellCenter.x) * smoothstep(0.2, 0.5, cellCenter.y);
  glow *= smoothstep(0.3, 0.8, glowMask);

  float pulseDist = length(p);
  float pulse = 0.5 + 0.5 * sin(pulseDist * 8.0 - iTime * uSpeed * 1.5 + noiseDist * 2.0);

  float finalAlpha = (gridAlpha * 0.3) + (intersections * 0.8) + (glow * 0.6);
  finalAlpha *= (0.6 + 0.4 * snoise(p * 4.0 - iTime * uSpeed * 0.5));
  finalAlpha += finalAlpha * pulse * 0.4;

  float mouseGlow = smoothstep(uHoverLightRadius, 0.0, mouseDist) * 0.6 * uMouseActive;
  finalAlpha += mouseGlow * gridAlpha;

  float vignette = 1.0 - smoothstep(0.1, uFadeFalloff, pulseDist);
  float breathing = 0.8 + 0.2 * sin(iTime * uSpeed * 0.8);

  fragColor = vec4(uColor, clamp(finalAlpha * vignette * breathing, 0.0, 1.0));
}

void main() {
  mainImage(gl_FragColor, vUv * iResolution);
}
`;

/* ── Inner WebGL plane ── */
interface PlaneProps {
  color: string;
  speed: number;
  gridScale: number;
}

function ShaderPlane({ color, speed, gridScale }: PlaneProps) {
  const matRef = useRef<THREE.ShaderMaterial>(null);
  const gl = useThree((s) => s.gl);
  const mouse = useRef({ x: -1000, y: -1000, tx: -1000, ty: -1000, a: 0, ta: 0 });

  const uniforms = useMemo(() => ({
    iTime:                    { value: 0 },
    iResolution:              { value: new THREE.Vector2() },
    iMouse:                   { value: new THREE.Vector2(-1000, -1000) },
    uMouseActive:             { value: 0 },
    uColor:                   { value: new THREE.Color(color) },
    uSpeed:                   { value: speed },
    uGridScale:               { value: gridScale },
    uRotationSpeed:           { value: 0.0 },
    uFadeFalloff:             { value: 8.0 },
    uDistortionAmount:        { value: 0.06 },
    uFlowSpeedX:              { value: -0.15 },
    uFlowSpeedY:              { value: -0.25 },
    uHoverLightRadius:        { value: 0.45 },
    uHoverRepulsionRadius:    { value: 0.5 },
    uHoverRepulsionStrength:  { value: 0.4 },
  }), []); // eslint-disable-line

  useEffect(() => { uniforms.uColor.value.set(color); }, [color, uniforms]);

  useEffect(() => {
    const handleMove = (e: PointerEvent) => {
      const rect = gl.domElement.getBoundingClientRect();
      const inside = e.clientX >= rect.left && e.clientX <= rect.right &&
                     e.clientY >= rect.top  && e.clientY <= rect.bottom;
      mouse.current.ta = inside ? 1 : 0;
      if (inside) { mouse.current.tx = e.clientX - rect.left; mouse.current.ty = rect.bottom - e.clientY; }
    };
    const handleLeave = () => { mouse.current.ta = 0; };
    window.addEventListener("pointermove", handleMove);
    document.addEventListener("pointerleave", handleLeave);
    return () => { window.removeEventListener("pointermove", handleMove); document.removeEventListener("pointerleave", handleLeave); };
  }, [gl.domElement]);

  useFrame((state) => {
    if (!matRef.current) return;
    const m = mouse.current;
    m.x += (m.tx - m.x) * 0.1; m.y += (m.ty - m.y) * 0.1;
    m.a += (m.ta - m.a) * 0.15;
    const u = matRef.current.uniforms;
    u.iTime.value = state.clock.elapsedTime;
    u.iResolution.value.set(state.size.width * state.viewport.dpr, state.size.height * state.viewport.dpr);
    u.iMouse.value.set(m.x * state.viewport.dpr, m.y * state.viewport.dpr);
    u.uMouseActive.value = m.a;
  });

  return (
    <mesh>
      <planeGeometry args={[2, 2]} />
      {/* eslint-disable react/no-unknown-property */}
      <shaderMaterial
        ref={matRef}
        vertexShader={vertexShader}
        fragmentShader={fragmentShader}
        uniforms={uniforms}
        depthWrite={false}
        depthTest={false}
        transparent
        blending={THREE.AdditiveBlending}
      />
      {/* eslint-enable react/no-unknown-property */}
    </mesh>
  );
}

/* ── Public component ── */
export interface GridBloomProps {
  className?: string;
  /** Hex color — defaults to amber to match brand */
  color?: string;
  speed?: number;
  gridScale?: number;
}

export default function GridBloom({
  className = "",
  color = "#d97706",   // amber-600 ≈ oklch(0.72 0.17 52)
  speed = 0.55,
  gridScale = 14.0,
}: GridBloomProps) {
  return (
    <div
      className={className}
      style={{ position: "absolute", inset: 0, pointerEvents: "none", zIndex: 0 }}
    >
      <Canvas
        camera={{ position: [0, 0, 1] }}
        gl={{ antialias: false, alpha: true }}
        dpr={[1, 1.5]}
        style={{ width: "100%", height: "100%" }}
      >
        <ShaderPlane color={color} speed={speed} gridScale={gridScale} />
      </Canvas>
    </div>
  );
}
