"use client";

import React from "react";
import { motion } from "framer-motion";
import { useLanguage } from "@/lib/LanguageContext";

const stats = [
  {
    number: "99%",
    label: "stat1Label",
    color: "#8B5CF6",
    source: "Survey: LocalCircles Consumer Survey 2023",
  },
  {
    number: "₹35,000 Cr",
    label: "stat2Label",
    color: "#F59E0B",
    source: "Ministry of Consumer Affairs Annual Report 2023",
  },
  {
    number: "3%",
    label: "stat3Label",
    color: "#EF4444",
    source: "NCDRC Annual Report 2022-23",
  },
];

const docTypes = [
  { icon: "📋", labelKey: "docType1" },
  { icon: "🏥", labelKey: "docType2" },
  { icon: "🏦", labelKey: "docType3" },
  { icon: "💼", labelKey: "docType4" },
  { icon: "⚡", labelKey: "docType5" },
];

export default function ProblemSection() {
  const { t } = useLanguage();

  return (
    <section
      id="problem"
      className="relative py-32 bg-bg-secondary overflow-hidden"
    >
      <div className="max-w-6xl mx-auto px-6">
        {/* Label */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-[12px] font-semibold tracking-[1.2px] uppercase text-accent-secondary font-body text-center mb-6"
        >
          {t("problemLabel")}
        </motion.p>

        {/* Heading */}
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="font-display text-[36px] sm:text-[44px] md:text-[52px] font-[800] leading-[1.15] text-text-primary text-center mb-6"
        >
          {t("problemHeading")}
        </motion.h2>

        {/* Body */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="font-body text-[18px] leading-[1.75] text-text-secondary max-w-[640px] mx-auto text-center mb-16"
        >
          {t("problemBody")}
        </motion.p>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
          {stats.map((stat, idx) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.12, duration: 0.5 }}
              className="bg-bg-secondary border border-white/[0.05] rounded-[16px] p-8 text-center hover:border-white/[0.12] hover:-translate-y-1 transition-all duration-300"
            >
              <div
                className="font-mono text-[44px] sm:text-[52px] font-[500] mb-3"
                style={{ color: stat.color }}
              >
                {stat.number}
              </div>
              <div className="font-body text-[12px] font-semibold tracking-[0.5px] uppercase text-text-muted leading-relaxed mb-2">
                {t(stat.label)}
              </div>
              <div className="font-body text-[9px] text-[#475569] italic">
                {stat.source}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Sources bar */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4 }}
          className="flex items-center justify-center gap-6 flex-wrap"
          style={{
            background: "rgba(255,255,255,0.02)",
            border: "1px solid rgba(255,255,255,0.05)",
            borderRadius: "8px",
            padding: "10px 20px",
            marginTop: "24px",
          }}
        >
          <span className="text-[10px] text-[#475569] italic">
            📚 Sources: Ministry of Consumer Affairs Annual Report 2023 · National Consumer Helpline Data 2022-23 · IRDA Annual Report 2022-23 · LocalCircles Consumer Survey 2023 · NCDRC Annual Report 2022-23
          </span>
        </motion.div>

        {/* Document type pills */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
          className="flex flex-wrap items-center justify-center gap-3 mt-12"
        >
          {docTypes.map((doc) => (
            <div
              key={doc.labelKey}
              className="flex items-center gap-2 px-5 py-3 rounded-full bg-bg-card/60 border border-white/[0.06] hover:border-accent-primary/30 hover:bg-accent-primary/[0.05] hover:-translate-y-0.5 hover:shadow-[0_0_20px_rgba(139,92,246,0.1)] transition-all duration-300 cursor-default"
            >
              <span className="text-[16px]">{doc.icon}</span>
              <span className="font-body text-[14px] font-medium text-text-secondary hover:text-text-primary">
                {t(doc.labelKey)}
              </span>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
