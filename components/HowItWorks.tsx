"use client";

import React from "react";
import { motion } from "framer-motion";
import { Eye, Scale, Search, Zap, Upload, CheckCircle, User } from "lucide-react";
import { useLanguage } from "@/lib/LanguageContext";

const steps = [
  {
    agent: "DRISHTI",
    role: "OCR Agent",
    icon: Eye,
    color: "#0EA5E9",
    tag: "VISION AI",
    description:
      "Upload any document — handwritten or printed. DRISHTI reads every word using Gemini Vision with 97% accuracy across 12 Indian languages.",
    step: "01",
  },
  {
    agent: "NYAYA",
    role: "Rights Analyzer Agent",
    icon: Scale,
    color: "#F59E0B",
    tag: "LEGAL DATABASE",
    description:
      "Every clause cross-checked against Consumer Protection Act 2019, RERA, IRDA Regulations, RBI Master Circulars, and IPC.",
    step: "02",
  },
  {
    agent: "SATYA",
    role: "Fraud Detector Agent",
    icon: Search,
    color: "#EF4444",
    tag: "FRAUD DETECTION",
    description:
      "Hidden charges, illegal clauses, forged seals, and rights violations flagged with exact legal references and penalty amounts.",
    step: "03",
  },
  {
    agent: "SHAKTI",
    role: "Legal Action Agent",
    icon: Zap,
    color: "#10B981",
    tag: "AUTO-DRAFT",
    description:
      "Auto-drafts legal notice, consumer court complaint, RTI application, and eDaakhil pre-filled form — ready to send in one click.",
    step: "04",
  },
];

export default function HowItWorks() {
  const { t } = useLanguage();

  const getStepDescription = (agent: string) => {
    const bodyKeys: Record<string, string> = {
      DRISHTI: 'drishtiBody',
      NYAYA: 'nyayaBody',
      SATYA: 'satyaBody',
      SHAKTI: 'shaktiBody',
    };
    return t(bodyKeys[agent] || '');
  };

  return (
    <section
      id="how-it-works"
      className="relative py-32 bg-bg-primary overflow-hidden"
    >
      <div className="max-w-6xl mx-auto px-6">
        {/* Label */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-[12px] font-semibold tracking-[1.2px] uppercase text-text-secondary font-body text-center mb-6"
        >
          {t("howLabel")}
        </motion.p>

        {/* Heading */}
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="font-display text-[36px] sm:text-[44px] md:text-[52px] font-[800] leading-[1.15] text-text-primary text-center mb-8"
        >
          {t("howHeading")}
        </motion.h2>

        {/* Architecture Flow Diagram */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex items-center justify-center gap-2 md:gap-4 mb-16 flex-wrap"
        >
          <div className="flex items-center gap-2 px-3 py-2 rounded-lg bg-[#1A1830] border border-[rgba(255,255,255,0.1)]">
            <User className="w-4 h-4 text-[#6B6880]" />
            <span className="text-[11px] text-[#A09DB8]">{t("flowUser")}</span>
          </div>
          <span className="text-[#475569]">→</span>
          <div className="flex items-center gap-2 px-3 py-2 rounded-lg bg-[#1A1830] border border-[rgba(255,255,255,0.1)]">
            <Upload className="w-4 h-4 text-[#6B6880]" />
            <span className="text-[11px] text-[#A09DB8]">{t("flowUpload")}</span>
          </div>
          <span className="text-[#475569]">→</span>
          <div className="flex items-center gap-2 px-3 py-2 rounded-lg bg-[#0EA5E9]/10 border border-[rgba(14,165,233,0.3)]">
            <Eye className="w-4 h-4 text-[#0EA5E9]" />
            <span className="text-[11px] text-[#0EA5E9] font-medium">{t("flowDrishti")}</span>
          </div>
          <span className="text-[#475569]">→</span>
          <div className="flex items-center gap-2 px-3 py-2 rounded-lg bg-[#F59E0B]/10 border border-[rgba(245,158,11,0.3)]">
            <Scale className="w-4 h-4 text-[#F59E0B]" />
            <span className="text-[11px] text-[#F59E0B] font-medium">{t("flowNyaya")}</span>
          </div>
          <span className="text-[#475569]">→</span>
          <div className="flex items-center gap-2 px-3 py-2 rounded-lg bg-[#EF4444]/10 border border-[rgba(239,68,68,0.3)]">
            <Search className="w-4 h-4 text-[#EF4444]" />
            <span className="text-[11px] text-[#EF4444] font-medium">{t("flowSatya")}</span>
          </div>
          <span className="text-[#475569]">→</span>
          <div className="flex items-center gap-2 px-3 py-2 rounded-lg bg-[#10B981]/10 border border-[rgba(16,185,129,0.3)]">
            <Zap className="w-4 h-4 text-[#10B981]" />
            <span className="text-[11px] text-[#10B981] font-medium">{t("flowShakti")}</span>
          </div>
          <span className="text-[#475569]">→</span>
          <div className="flex items-center gap-2 px-3 py-2 rounded-lg bg-[#8B5CF6] border border-[#8B5CF6]">
            <CheckCircle className="w-4 h-4 text-white" />
            <span className="text-[11px] text-white font-medium">{t("flowOutput")}</span>
          </div>
        </motion.div>

        {/* Labels below diagram */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="flex items-center justify-center gap-8 md:gap-16 mb-16 flex-wrap"
        >
          <div className="text-center">
            <span className="text-[10px] text-[#0EA5E9]">{t("flowDrishtiLabel")}</span>
          </div>
          <div className="text-center">
            <span className="text-[10px] text-[#F59E0B]">{t("flowNyayaLabel")}</span>
          </div>
          <div className="text-center">
            <span className="text-[10px] text-[#EF4444]">{t("flowSatyaLabel")}</span>
          </div>
          <div className="text-center">
            <span className="text-[10px] text-[#10B981]">{t("flowShaktiLabel")}</span>
          </div>
        </motion.div>

        {/* Timeline */}
        <div className="relative flex flex-col gap-[40px]">
          {/* Vertical line */}
          <div className="hidden lg:block absolute left-1/2 top-0 w-[2px] bg-white/[0.06] -translate-x-1/2" style={{ height: '100%' }}>
            <motion.div
              className="absolute top-0 left-0 w-full bg-gradient-to-b from-accent-primary to-accent-primary/0"
              initial={{ height: 0 }}
              whileInView={{ height: "100%" }}
              viewport={{ once: true }}
              transition={{ duration: 2, ease: "easeOut" }}
            />
          </div>

          <div className="flex flex-col">
            {steps.map((step, idx) => {
              const Icon = step.icon;
              const isEven = idx % 2 === 0;

              return (
                <motion.div
                  key={step.agent}
                  initial={{ opacity: 0, y: 40, x: isEven ? -30 : 30 }}
                  whileInView={{ opacity: 1, y: 0, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.15, duration: 0.5 }}
                  className={`relative flex flex-col lg:flex-row items-center gap-6 ${
                    isEven ? "lg:flex-row" : "lg:flex-row-reverse"
                  }`}
                >
                  {/* Step card */}
                  <div
                    className="flex-1 text-left"
                  >
                    <div
                      className="relative bg-bg-card/40 border border-white/[0.06] rounded-[16px] p-8 hover:border-opacity-30 transition-all duration-300 group overflow-hidden"
                      style={{
                        borderLeftColor: step.color,
                        borderLeftWidth: "3px",
                      }}
                    >
                      {/* Step number ghost */}
                      <div
                        className={`absolute -top-4 ${isEven ? "-right-2" : "-left-2"} font-display text-[120px] font-[900] leading-none text-white/[0.02] select-none pointer-events-none`}
                      >
                        {step.step}
                      </div>

                      <div
                        className="flex items-start gap-4"
                      >
                        <div
                          className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0"
                          style={{
                            backgroundColor: `${step.color}15`,
                          }}
                        >
                          <Icon
                            className="w-6 h-6"
                            style={{ color: step.color }}
                          />
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center gap-3 mb-2 flex-wrap">
                            <span className="font-mono text-[16px] font-medium text-text-primary">
                              {step.agent}
                            </span>
                            <span
                              className="text-[10px] font-bold tracking-[1px] uppercase px-2.5 py-1 rounded-full font-body"
                              style={{
                                backgroundColor: `${step.color}15`,
                                color: step.color,
                              }}
                            >
                              {step.tag}
                            </span>
                          </div>
                          <p className="font-body text-[14px] text-text-secondary leading-relaxed">
                            {getStepDescription(step.agent)}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Center dot */}
                  <div className="hidden lg:flex w-4 h-4 rounded-full border-2 border-bg-primary z-10 flex-shrink-0" style={{ backgroundColor: step.color }} />

                  {/* Spacer for opposite side */}
                  <div className="hidden lg:block flex-1" />
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
