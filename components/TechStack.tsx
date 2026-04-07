"use client";

import React from "react";
import { motion } from "framer-motion";
import Marquee from "./ui/Marquee";
import { useLanguage } from "@/lib/LanguageContext";

const row1Items = [
  "Gemini API",
  "CrewAI",
  "FastAPI",
  "Next.js",
  "Supabase",
  "LangChain",
  "Indian Kanoon API",
  "n8n",
];

const row2Items = [
  "Python",
  "Tailwind CSS",
  "PostgreSQL",
  "Power BI",
  "Vercel",
  "Docker",
  "Framer Motion",
  "IBM Plex",
];

export default function TechStack() {
  const { t } = useLanguage();

  return (
    <section className="relative py-32 bg-bg-primary overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        {/* Heading */}
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="font-display text-[36px] sm:text-[44px] md:text-[52px] font-[800] leading-[1.15] text-text-primary text-center mb-16"
        >
          {t("techHeading")}
        </motion.h2>

        {/* Marquee rows */}
        <div className="space-y-6">
          <Marquee items={row1Items} direction="left" speed={35} />
          <Marquee items={row2Items} direction="right" speed={30} />
        </div>
      </div>
    </section>
  );
}
