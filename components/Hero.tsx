"use client";

import React from "react";
import { motion } from "framer-motion";
import { Scale, FileText, Gavel, Eye } from "lucide-react";
import Button from "./ui/Button";
import Badge from "./ui/Badge";
import { useLanguage } from "@/lib/LanguageContext";

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.2,
    },
  },
};

const item = {
  hidden: { opacity: 0, y: 30 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: "easeOut" as const },
  },
};

const resultBadges = [
  { text: "⚠ Illegal Clause Found", bg: "rgba(239,68,68,0.15)", border: "rgba(239,68,68,0.3)", color: "#EF4444", delay: 0.5 },
  { text: "₹18,000 Recoverable", bg: "rgba(245,158,11,0.15)", border: "rgba(245,158,11,0.3)", color: "#F59E0B", delay: 1 },
  { text: "✅ Legal Action Ready", bg: "rgba(16,185,129,0.15)", border: "rgba(16,185,129,0.3)", color: "#10B981", delay: 1.5 },
];

export default function Hero() {
  const { t, lang } = useLanguage();

  const liveFeedItems = lang === 'ta' 
    ? [
        t('ticker1'),
        t('ticker2'),
        t('ticker3'),
        t('ticker4'),
        t('ticker5'),
      ]
    : lang === 'hi'
    ? [
        "NCH को 2022-23 में 8.5 लाख शिकायतें मिलीं · consumerhelpline.gov.in",
        "बीमा गलत अस्वीकृति 34% बढ़ी — IRDA वार्षिक रिपोर्ट 2022",
        "RBI ने 2012 से फ्लोटिंग दर ऋण पर फोरक्लोजर प्रतिबंध लगाया",
        "उपभोक्ता शिकायतें 2018 से 2023 में 400% बढ़ीं — MCA रिपोर्ट",
        "मॉडल टेनेंसी एक्ट 2021 जमा सीमा 2 महीने रखता है",
      ]
    : [
        "NCH received 8.5 lakh complaints in 2022-23 · consumerhelpline.gov.in",
        "Insurance wrongful rejections up 34% — IRDA Annual Report 2022",
        "RBI banned foreclosure penalty on floating rate loans since 2012",
        "Consumer complaints grew 400% from 2018 to 2023 — MCA Report",
        "Model Tenancy Act 2021 limits security deposit to 2 months rent",
        "eDaakhil portal: file consumer complaints free at edaakhil.nic.in",
      ];

  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
    >
      {/* Background effects */}
      <div className="absolute inset-0 grid-bg" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(139,92,246,0.12)_0%,transparent_70%)]" />

      {/* Floating legal icons */}
      <motion.div
        className="absolute top-[15%] left-[10%] text-accent-primary/[0.04]"
        animate={{ rotate: 360 }}
        transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
      >
        <Gavel className="w-32 h-32" />
      </motion.div>
      <motion.div
        className="absolute top-[25%] right-[12%] text-accent-secondary/[0.04]"
        animate={{ rotate: -360 }}
        transition={{ duration: 80, repeat: Infinity, ease: "linear" }}
      >
        <Scale className="w-40 h-40" />
      </motion.div>
      <motion.div
        className="absolute bottom-[20%] left-[15%] text-accent-primary/[0.03]"
        animate={{ y: [-15, 15, -15] }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
      >
        <FileText className="w-28 h-28" />
      </motion.div>
      <motion.div
        className="absolute bottom-[25%] right-[18%] text-accent-success/[0.04]"
        animate={{ y: [-10, 10, -10] }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
      >
        <Scale className="w-24 h-24" />
      </motion.div>

      {/* Main content area — left aligned on desktop */}
      <div className="relative z-10 w-full max-w-7xl mx-auto px-6 flex flex-col lg:flex-row items-center justify-between pt-24 pb-[100px]">
        {/* Left content */}
        <motion.div
          variants={container}
          initial="hidden"
          animate="show"
          className="lg:max-w-[600px] w-full text-center lg:text-left"
        >
          {/* Badge */}
          <motion.div variants={item} className="mb-8 flex justify-center lg:justify-start">
            <Badge color="gold">
              ⚖️ {t("heroBadge")}
            </Badge>
          </motion.div>

          {/* Hero heading */}
          <motion.h1
            variants={item}
            className="font-display text-[52px] sm:text-[64px] md:text-[76px] font-[900] leading-tight tracking-[-2.5px] text-text-primary mb-2 break-words whitespace-normal"
          >
            {t("heroLine1")}
          </motion.h1>
          <motion.h1
            variants={item}
            className="font-display text-[52px] sm:text-[64px] md:text-[76px] font-[900] leading-tight tracking-[-2.5px] mb-6 break-words whitespace-normal h-auto"
            style={{
              background: 'linear-gradient(135deg, #8B5CF6 0%, #F59E0B 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
            }}
          >
            {t("heroLine2")}
          </motion.h1>

          {/* Divider */}
          <motion.div
            variants={item}
            className="w-[60px] h-[2px] bg-accent-primary mb-8 lg:mx-0 mx-auto"
          />

          {/* Subtext */}
          <motion.p
            variants={item}
            className="font-body text-[18px] leading-relaxed text-text-secondary max-w-[580px] mb-10 lg:mx-0 mx-auto break-words whitespace-normal"
          >
            {t("heroSub")}
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            variants={item}
            className="flex flex-col sm:flex-row items-center lg:items-start gap-4 mb-10"
          >
            <Button variant="primary" size="lg" onClick={() => document.getElementById('demo')?.scrollIntoView({ behavior: 'smooth' })}>
              {t("heroCTA1")}
            </Button>
            <Button variant="gold" size="lg" onClick={() => document.getElementById('demo')?.scrollIntoView({ behavior: 'smooth' })}>
              {t("heroCTA2")}
            </Button>
          </motion.div>

          {/* Trust pills */}
          <motion.div
            variants={item}
            className="flex flex-wrap items-center justify-center lg:justify-start gap-3 mb-6"
          >
            {[
              { text: "heroTrust1", icon: "⚖️" },
              { text: "heroTrust2", icon: "🔒" },
              { text: "heroTrust3", icon: "🇮🇳" },
            ].map((trust, idx) => (
              <React.Fragment key={trust.text}>
                {idx > 0 && (
                  <span className="text-text-muted text-[10px]">·</span>
                )}
                <span className="text-text-muted text-[13px] font-medium font-body">
                  {trust.icon} {t(trust.text)}
                </span>
              </React.Fragment>
            ))}
          </motion.div>
        </motion.div>

        {/* Right side — Floating mock scan card (desktop only) */}
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.8, duration: 0.8 }}
          className="hidden lg:block relative flex-shrink-0"
        >
          <div
            className="w-[320px] rounded-[20px] p-6 relative overflow-hidden"
            style={{
              background: "#12111E",
              border: "1px solid rgba(139,92,246,0.3)",
              boxShadow: "0 0 60px rgba(139,92,246,0.15)",
            }}
          >
            {/* Header */}
            <div className="flex items-center gap-3 mb-5">
              <div className="w-8 h-8 rounded-lg bg-accent-primary/15 flex items-center justify-center">
                <Eye className="w-4 h-4 text-accent-primary" />
              </div>
              <span className="font-mono text-[11px] text-accent-primary tracking-wide">
                DRISHTI SCANNING
              </span>
              <motion.div
                className="w-2 h-2 rounded-full bg-accent-success ml-auto"
                animate={{ opacity: [1, 0.4, 1] }}
                transition={{ duration: 1.5, repeat: Infinity }}
              />
            </div>

            {/* Realistic document text */}
            <div className="flex flex-col gap-[6px] mb-5 relative font-mono text-[11px]">
              <div className="text-white font-bold">RENTAL AGREEMENT</div>
              <div className="text-gray-500">Party A: Ramesh Kumar (Landlord)</div>
              <div className="text-gray-500">Party B: Priya Venkatesh (Tenant)</div>
              <div className="text-gray-500">Date: January 2026 · Duration: 11 months</div>
              <div className="h-3"></div>
              <div className="text-red-400">Clause 3: Security ₹45,000 — ⚠ ILLEGAL</div>
              <div className="text-green-400">Clause 5: Rent ₹15,000/mo — ✓ VALID</div>
              <div className="text-red-400">Clause 8: Entry w/o notice — ⚠ ILLEGAL</div>
              <div className="text-amber-400">Clause 14: Rent hike any % — ⚠ SUSPICIOUS</div>
              {/* Scanning line */}
              <motion.div
                className="absolute left-0 right-0 h-[2px]"
                style={{
                  background:
                    "linear-gradient(90deg, transparent, #00FFA3, transparent)",
                  boxShadow: "0 0 12px #00FFA3",
                }}
                animate={{ top: ["10%", "85%", "10%"] }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              />
            </div>

            {/* Divider */}
            <div className="h-[1px] bg-white/[0.06] mb-4" />

            {/* Result badges with staggered animation */}
            <div className="flex flex-col gap-2">
              {resultBadges.map((badge, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: badge.delay + 0.8, duration: 0.4 }}
                  className="px-[14px] py-2 rounded-lg text-[13px] font-semibold font-body flex items-center gap-2"
                  style={{
                    background: badge.bg,
                    border: `1px solid ${badge.border}`,
                    color: badge.color,
                  }}
                >
                  {badge.text}
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>

      {/* Live feed ticker */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1, duration: 0.6 }}
        className="absolute bottom-0 left-0 right-0 w-full bg-bg-secondary/80 border-t border-b border-white/[0.04] py-3 overflow-hidden"
      >
        <div className="flex items-center gap-6">
          <span className="text-accent-primary text-[11px] font-bold tracking-[1px] uppercase font-body flex-shrink-0 pl-6">
            {t("liveDetections")}
          </span>
          <div className="overflow-hidden flex-1">
            <div className="ticker-scroll inline-flex gap-16 whitespace-nowrap">
              {[...liveFeedItems, ...liveFeedItems].map((feedItem, idx) => (
                <span
                  key={idx}
                  className="text-text-muted text-[13px] font-mono"
                >
                  {feedItem}
                </span>
              ))}
            </div>
          </div>
        </div>
      </motion.div>
    </section>
  );
}
