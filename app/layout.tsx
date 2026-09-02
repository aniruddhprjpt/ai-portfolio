import type { Metadata } from "next";
import { JetBrains_Mono, IBM_Plex_Sans } from "next/font/google";
import "./globals.css";
import { portfolioData } from "@/data/portfolio";

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-heading",
});

const ibmPlexSans = IBM_Plex_Sans({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-body",
});

export const metadata: Metadata = {
  title: `${portfolioData.name} — ${portfolioData.title}`,
  description: portfolioData.bio.slice(0, 160),
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className={`${jetbrainsMono.variable} ${ibmPlexSans.variable} font-body bg-gray-950 text-gray-100 antialiased`}>
        {children}
      </body>
    </html>
  );
}
