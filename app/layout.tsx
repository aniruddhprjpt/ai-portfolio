import type { Metadata } from "next";
import { Bricolage_Grotesque } from "next/font/google";
import { GeistSans } from "geist/font/sans";
import { GeistMono } from "geist/font/mono";
import "./globals.css";
import { portfolioData } from "@/data/portfolio";

const bricolage = Bricolage_Grotesque({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  variable: "--font-display",
  display: "swap",
});

export const metadata: Metadata = {
  title: `${portfolioData.name} — ${portfolioData.title}`,
  description: portfolioData.bio.slice(0, 160),
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="scroll-smooth">
      <body
        className={`
          ${bricolage.variable}
          ${GeistSans.variable}
          ${GeistMono.variable}
          font-body bg-[--color-bg] text-[--color-ink] antialiased
        `}
      >
        {children}
      </body>
    </html>
  );
}
