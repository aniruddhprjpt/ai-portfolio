import Chatbot from "@/components/Chatbot";
import ScrollReveal from "@/components/ScrollReveal";
import Typewriter from "@/components/Typewriter";
import { portfolioData } from "@/data/portfolio";

export default function Home() {
  const { name, title, bio, links, skills, experience, education, projects, email, location, languages } = portfolioData;
  const firstName = name.split(" ")[0];

  return (
    <main className="min-h-screen bg-[#07070f] text-gray-100 overflow-x-hidden relative">

      {/* ── ANIMATED BACKGROUND ── */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="blob blob-1" />
        <div className="blob blob-2" />
        <div className="blob blob-3" />
        {/* Star particles */}
        {[...Array(20)].map((_, i) => (
          <div key={i} className="star" style={{
            width: `${Math.random() * 2 + 1}px`,
            height: `${Math.random() * 2 + 1}px`,
            top: `${Math.random() * 100}%`,
            left: `${Math.random() * 100}%`,
            ["--duration" as string]: `${Math.random() * 4 + 2}s`,
            ["--delay" as string]: `${Math.random() * 3}s`,
          }} />
        ))}
      </div>

      {/* ── NAV ── */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-[#07070f]/70 backdrop-blur-xl border-b border-white/5">
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
          <span className="font-bold text-xl gradient-text tracking-tight">{firstName}<span className="text-white/30">.dev</span></span>
          <div className="hidden md:flex gap-8 text-sm text-gray-400">
            {["About", "Projects", "Skills", "Experience", "Contact"].map((item) => (
              <a key={item} href={`#${item.toLowerCase()}`}
                className="nav-link hover:text-white transition-colors duration-200">{item}</a>
            ))}
          </div>
          <a href={`mailto:${email}`}
            className="btn-gradient px-5 py-2 rounded-xl text-sm font-semibold">
            <span>Hire Me ✨</span>
          </a>
        </div>
      </nav>

      {/* ── HERO ── */}
      <section className="relative min-h-screen flex items-center justify-center pt-20 dot-bg z-10">
        <div className="text-center px-6 max-w-4xl mx-auto">

          {/* Avatar */}
          <div className="flex justify-center mb-8">
            <div className="avatar-ring w-28 h-28 rounded-full float">
              <div className="w-28 h-28 rounded-full bg-gradient-to-br from-indigo-500 via-purple-600 to-pink-500 flex items-center justify-center text-5xl font-bold glow-purple">
                {firstName.charAt(0)}
              </div>
            </div>
          </div>

          {/* Status badge */}
          <div className="inline-flex items-center gap-2 bg-indigo-500/10 border border-indigo-500/25 text-indigo-300 text-sm px-5 py-2 rounded-full mb-6 backdrop-blur-sm">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-green-400" />
            </span>
            Available for new opportunities
          </div>

          {/* Heading */}
          <h1 className="text-5xl md:text-7xl font-black mb-4 leading-tight tracking-tight">
            Hi, I&apos;m <span className="glow-text">{firstName}</span>
          </h1>

          {/* Typewriter */}
          <div className="text-2xl md:text-3xl font-semibold mb-6 h-10">
            <Typewriter words={[
              "Full Stack Developer",
              "Machine Learning Engineer",
              "Django & React Builder",
              "AI Enthusiast",
              "Problem Solver 🚀",
            ]} />
          </div>

          <p className="text-gray-400 max-w-2xl mx-auto mb-10 leading-relaxed text-lg">
            {bio.split(".")[0]}.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-wrap gap-4 justify-center mb-12">
            <a href="#projects" className="btn-gradient px-8 py-3.5 rounded-xl font-semibold text-base">
              <span>View My Work 🎯</span>
            </a>
            <a href={links.portfolio} target="_blank" rel="noopener noreferrer"
              className="px-8 py-3.5 rounded-xl font-semibold text-base border border-white/10 hover:border-indigo-500/50 hover:bg-indigo-500/10 transition-all duration-300">
              GitHub Pages ↗
            </a>
          </div>

          {/* Social links */}
          <div className="flex gap-6 justify-center mb-10">
            {[
              { href: links.github, label: "GitHub", icon: <path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0112 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z" /> },
              { href: links.linkedin, label: "LinkedIn", icon: <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" /> },
            ].filter(s => s.href).map((s) => (
              <a key={s.label} href={s.href} target="_blank" rel="noopener noreferrer"
                className="w-11 h-11 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-gray-400 hover:text-white hover:bg-indigo-500/20 hover:border-indigo-500/40 hover:scale-110 transition-all duration-300">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">{s.icon}</svg>
              </a>
            ))}
          </div>

          {/* Scroll indicator */}
          <div className="flex flex-col items-center gap-2 text-gray-600 text-xs animate-bounce">
            <span>Scroll down</span>
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </div>
        </div>
      </section>

      {/* ── ABOUT ── */}
      <section id="about" className="py-28 px-6 relative z-10">
        <div className="max-w-5xl mx-auto">
          <ScrollReveal>
            <div className="text-center mb-16">
              <h2 className="text-4xl font-black mb-3 section-title">About <span className="gradient-text">Me</span></h2>
            </div>
          </ScrollReveal>

          <div className="grid md:grid-cols-2 gap-12 items-center">
            <ScrollReveal delay={1}>
              <div className="space-y-5 text-gray-400 leading-relaxed text-[15px]">
                {bio.split(". ").filter(Boolean).map((s, i) => (
                  <p key={i} className="border-l-2 border-indigo-500/40 pl-4">{s}.</p>
                ))}
                <div className="pt-2">
                  <p className="text-sm text-gray-500 mb-2">Languages spoken:</p>
                  <div className="flex flex-wrap gap-2">
                    {languages?.map((lang) => (
                      <span key={lang} className="skill-badge">{lang}</span>
                    ))}
                  </div>
                </div>
              </div>
            </ScrollReveal>

            <ScrollReveal delay={2}>
              <div className="grid grid-cols-2 gap-4">
                {[
                  { label: "Projects Built", value: `${projects.length}+`, icon: "🚀" },
                  { label: "Technologies", value: `${Object.values(skills).flat().length}+`, icon: "⚡" },
                  { label: "Graduating", value: "2026", icon: "🎓" },
                  { label: "Open to Work", value: "✓ Yes", icon: "💼" },
                ].map(({ label, value, icon }) => (
                  <div key={label} className="card-glow shimmer rounded-2xl p-6 text-center">
                    <div className="text-2xl mb-1">{icon}</div>
                    <p className="text-3xl font-black gradient-text">{value}</p>
                    <p className="text-gray-500 text-xs mt-1">{label}</p>
                  </div>
                ))}
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* ── PROJECTS ── */}
      <section id="projects" className="py-28 px-6 relative z-10">
        <div className="absolute inset-0 dot-bg opacity-30 pointer-events-none" />
        <div className="max-w-6xl mx-auto relative">
          <ScrollReveal>
            <div className="text-center mb-16">
              <h2 className="text-4xl font-black mb-3 section-title">My <span className="gradient-text">Projects</span></h2>
              <p className="text-gray-500 mt-6">Things I've built that I'm proud of</p>
            </div>
          </ScrollReveal>

          <div className="grid md:grid-cols-2 gap-6">
            {projects.map((project, i) => (
              <ScrollReveal key={project.name} delay={(i % 3 + 1) as 1 | 2 | 3}>
                <div className="card-glow rounded-2xl p-7 h-full flex flex-col">
                  {/* Project header */}
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <div className="text-2xl mb-1">
                        {i === 0 ? "🍽️" : i === 1 ? "🤖" : "💡"}
                      </div>
                      <h3 className="font-bold text-lg text-white leading-tight">{project.name}</h3>
                    </div>
                    <div className="flex gap-2 ml-3 flex-shrink-0">
                      {project.live && (
                        <a href={project.live} target="_blank" rel="noopener noreferrer"
                          className="w-9 h-9 rounded-lg bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center text-indigo-400 hover:bg-indigo-500/30 hover:scale-110 transition-all">
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                          </svg>
                        </a>
                      )}
                      {project.github && (
                        <a href={project.github} target="_blank" rel="noopener noreferrer"
                          className="w-9 h-9 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center text-gray-400 hover:bg-white/10 hover:scale-110 transition-all">
                          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0112 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z" />
                          </svg>
                        </a>
                      )}
                    </div>
                  </div>

                  <p className="text-gray-400 text-sm leading-relaxed mb-5">{project.description}</p>

                  <ul className="space-y-2 mb-6 flex-1">
                    {project.highlights.map((h) => (
                      <li key={h} className="text-gray-500 text-xs flex gap-2">
                        <span className="text-indigo-400 mt-0.5 flex-shrink-0">▹</span>
                        {h}
                      </li>
                    ))}
                  </ul>

                  <div className="flex flex-wrap gap-2 mt-auto pt-4 border-t border-white/5">
                    {project.tech.map((t) => (
                      <span key={t} className="skill-badge text-xs">{t}</span>
                    ))}
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── SKILLS ── */}
      <section id="skills" className="py-28 px-6 relative z-10">
        <div className="max-w-5xl mx-auto">
          <ScrollReveal>
            <div className="text-center mb-16">
              <h2 className="text-4xl font-black mb-3 section-title">Tech <span className="gradient-text">Stack</span></h2>
              <p className="text-gray-500 mt-6">Technologies I work with</p>
            </div>
          </ScrollReveal>

          <div className="grid md:grid-cols-2 gap-5">
            {Object.entries(skills).map(([category, items], i) => (
              <ScrollReveal key={category} delay={(i % 4 + 1) as 1 | 2 | 3 | 4}>
                <div className="card-glow rounded-2xl p-6">
                  <h3 className="font-bold text-sm text-indigo-400 uppercase tracking-widest mb-4">
                    {category.replace(/_/g, " ")}
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {(items as string[]).map((skill) => (
                      <span key={skill} className="skill-badge">{skill}</span>
                    ))}
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── EXPERIENCE ── */}
      <section id="experience" className="py-28 px-6 relative z-10">
        <div className="absolute inset-0 dot-bg opacity-20 pointer-events-none" />
        <div className="max-w-4xl mx-auto relative">
          <ScrollReveal>
            <div className="text-center mb-16">
              <h2 className="text-4xl font-black mb-3 section-title">Work <span className="gradient-text">Experience</span></h2>
              <p className="text-gray-500 mt-6">My professional journey</p>
            </div>
          </ScrollReveal>

          <div className="relative">
            <div className="absolute left-8 top-4 bottom-4 w-px bg-gradient-to-b from-indigo-500 via-purple-500 to-transparent hidden md:block" />

            <div className="space-y-8">
              {experience.map((job, i) => (
                <ScrollReveal key={i} delay={(i + 1) as 1 | 2}>
                  <div className="relative md:pl-20">
                    <div className="absolute left-5 top-6 w-6 h-6 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-full border-2 border-[#07070f] hidden md:flex items-center justify-center timeline-dot">
                      <div className="w-2 h-2 bg-white rounded-full" />
                    </div>
                    <div className="card-glow rounded-2xl p-7">
                      <div className="flex flex-wrap items-start justify-between gap-3 mb-4">
                        <div>
                          <h3 className="font-black text-lg text-white">{job.role}</h3>
                          <p className="gradient-text font-semibold">{job.company}</p>
                        </div>
                        <div className="text-right text-sm">
                          <p className="text-gray-400 bg-white/5 px-3 py-1 rounded-full">{job.duration}</p>
                          <p className="text-gray-600 text-xs mt-1">{job.location}</p>
                        </div>
                      </div>
                      <ul className="space-y-2.5">
                        {job.description.map((d, j) => (
                          <li key={j} className="text-gray-400 text-sm flex gap-2.5 leading-relaxed">
                            <span className="text-indigo-400 mt-0.5 flex-shrink-0">▹</span>
                            {d}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </ScrollReveal>
              ))}
            </div>
          </div>

          {/* Education */}
          <ScrollReveal delay={1}>
            <div className="mt-16">
              <h3 className="text-2xl font-black mb-8 text-center">
                <span className="gradient-text">Education</span>
              </h3>
              <div className="space-y-4">
                {education.map((edu, i) => (
                  <div key={i} className="card-glow rounded-2xl p-6 flex flex-wrap items-center justify-between gap-4">
                    <div>
                      <h4 className="font-bold text-white">{edu.degree}</h4>
                      <p className="text-indigo-400 text-sm font-medium">{edu.institution}</p>
                      <p className="text-gray-500 text-xs mt-1">{edu.grade}</p>
                    </div>
                    <span className="bg-indigo-500/10 border border-indigo-500/20 text-indigo-300 text-sm px-4 py-1.5 rounded-full">
                      {edu.duration}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* ── CONTACT ── */}
      <section id="contact" className="py-28 px-6 relative z-10">
        <div className="max-w-2xl mx-auto text-center">
          <ScrollReveal>
            <h2 className="text-4xl font-black mb-4 section-title">
              Let&apos;s <span className="gradient-text">Connect</span>
            </h2>
            <p className="text-gray-400 mt-8 mb-10 leading-relaxed text-lg">
              I&apos;m actively looking for new opportunities. Whether you have a project, a question, or just want to say hi — my inbox is always open!
            </p>
          </ScrollReveal>

          <ScrollReveal delay={1}>
            <a href={`mailto:${email}`}
              className="btn-gradient inline-flex items-center gap-3 px-10 py-4 rounded-2xl font-bold text-lg mb-10">
              <span className="flex items-center gap-3">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                Say Hello 👋
              </span>
            </a>

            <div className="flex flex-wrap gap-4 justify-center">
              {[
                { label: "📧 Email", href: `mailto:${email}` },
                { label: "💻 GitHub", href: links.github },
                { label: "🔗 LinkedIn", href: links.linkedin },
                { label: "🌐 Portfolio", href: links.portfolio },
              ].filter(l => l.href).map((l) => (
                <a key={l.label} href={l.href} target="_blank" rel="noopener noreferrer"
                  className="px-5 py-2.5 rounded-xl bg-white/5 border border-white/10 hover:border-indigo-500/40 hover:bg-indigo-500/10 hover:text-indigo-300 text-gray-400 text-sm transition-all duration-300">
                  {l.label}
                </a>
              ))}
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* ── FOOTER ── */}
      <footer className="py-8 border-t border-white/5 text-center text-gray-600 text-sm relative z-10">
        <p>
          Designed & Built by <span className="gradient-text font-semibold">{name}</span>
        </p>
      </footer>

      {/* ── AI CHATBOT ── */}
      <Chatbot />
    </main>
  );
}
