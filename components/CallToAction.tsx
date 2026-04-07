"use client";

import React from "react";
import { motion } from "framer-motion";
import { useLanguage } from "@/lib/LanguageContext";
import Button from "./ui/Button";

export default function CallToAction() {
  const { t } = useLanguage();

  const handlePrimaryClick = () => {
    document.getElementById("demo")?.scrollIntoView({ behavior: "smooth" });
    setTimeout(() => {
      document.getElementById("sample-rental")?.click();
    }, 800);
  };

  return (
    <section className="relative py-20 bg-bg-primary overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#0D0B1A] to-[#12111E]" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(139,92,246,0.08)_0%,transparent_70%)]" />

      {/* Border top */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[rgba(139,92,246,0.1)] to-transparent" />

      <div className="relative z-10 max-w-4xl mx-auto px-6 text-center">
        {/* Label */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-[11px] font-semibold tracking-[1.5px] uppercase text-accent-primary font-body mb-6"
        >
          {t("ctaLabel")}
        </motion.p>

        {/* Heading */}
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="font-display text-[36px] sm:text-[44px] md:text-[48px] font-[800] leading-[1.15] text-text-primary text-center mb-6"
        >
          {t("ctaHeading")}
        </motion.h2>

        {/* Subtext */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="font-body text-[16px] text-[#94A3B8] leading-relaxed mb-10 max-w-[580px] mx-auto"
        >
          {t("ctaSubtext")}
        </motion.p>

        {/* Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12"
        >
          <Button variant="primary" size="lg" onClick={handlePrimaryClick}>
            {t("ctaPrimary")}
          </Button>
          <Button variant="ghost" size="lg" onClick={() => {
            const chatbot = document.querySelector('[aria-label="Open Chat"]');
            if (chatbot) {
              (chatbot as HTMLButtonElement).click();
            }
          }}>
            {t("ctaSecondary")}
          </Button>
        </motion.div>

        {/* Reassurance pills */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4 }}
          className="flex flex-wrap items-center justify-center gap-4"
        >
          <span className="text-[13px] text-[#6B7280] px-4 py-2 rounded-full bg-[rgba(255,255,255,0.03)] border border-[rgba(255,255,255,0.06)]">
            {t("ctaPill1")}
          </span>
          <span className="text-[13px] text-[#6B7280] px-4 py-2 rounded-full bg-[rgba(255,255,255,0.03)] border border-[rgba(255,255,255,0.06)]">
            {t("ctaPill2")}
          </span>
          <span className="text-[13px] text-[#6B7280] px-4 py-2 rounded-full bg-[rgba(255,255,255,0.03)] border border-[rgba(255,255,255,0.06)]">
            {t("ctaPill3")}
          </span>
        </motion.div>
      </div>
    </section>
  );
}
