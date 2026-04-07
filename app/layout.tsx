import type { Metadata } from "next";
import { Playfair_Display, Plus_Jakarta_Sans, IBM_Plex_Mono } from "next/font/google";
import { LanguageProvider } from "@/lib/LanguageContext";
import "./globals.css";

const playfair = Playfair_Display({
  subsets: ["latin"],
  weight: ["700", "800", "900"],
  variable: "--font-playfair",
  display: "swap",
});

const jakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-jakarta",
  display: "swap",
});

const ibmPlex = IBM_Plex_Mono({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-ibm-plex",
  display: "swap",
});

export const metadata: Metadata = {
  title: "VAAKYA AI — Autonomous Legal Rights & Consumer Protection",
  description:
    "Upload any contract, insurance rejection, bank statement, or rental agreement. VAAKYA AI reads every clause, flags every violation, and drafts your legal action — in 15 seconds.",
  keywords: [
    "legal AI",
    "consumer protection",
    "contract analysis",
    "Indian law",
    "legal rights",
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body
        className={`${playfair.variable} ${jakarta.variable} ${ibmPlex.variable} font-body antialiased bg-bg-primary text-text-primary`}
      >
        <LanguageProvider>
          {children}
        </LanguageProvider>
      </body>
    </html>
  );
}
