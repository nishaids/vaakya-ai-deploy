"use client";

import React, { useEffect, useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import { useLanguage } from "@/lib/LanguageContext";

interface CountUpProps {
  end: string;
  duration?: number;
}

function CountUp({ end, duration = 2 }: CountUpProps) {
  const [display, setDisplay] = useState("0");
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true });
  const hasAnimated = useRef(false);

  useEffect(() => {
    if (!isInView || hasAnimated.current) return;
    hasAnimated.current = true;

    const numericMatch = end.match(/[\d.]+/);
    if (!numericMatch) {
      setDisplay(end);
      return;
    }

    const numericValue = parseFloat(numericMatch[0]);
    const prefix = end.slice(0, end.indexOf(numericMatch[0]));
    const suffix = end.slice(
      end.indexOf(numericMatch[0]) + numericMatch[0].length
    );
    const isDecimal = numericMatch[0].includes(".");
    const startTime = performance.now();
    const durationMs = duration * 1000;

    function animate(currentTime: number) {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / durationMs, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      const currentValue = numericValue * eased;

      if (isDecimal) {
        setDisplay(`${prefix}${currentValue.toFixed(1)}${suffix}`);
      } else {
        setDisplay(
          `${prefix}${Math.floor(currentValue).toLocaleString("en-IN")}${suffix}`
        );
      }

      if (progress < 1) {
        requestAnimationFrame(animate);
      } else {
        setDisplay(end);
      }
    }

    requestAnimationFrame(animate);
  }, [isInView, end, duration]);

  return <span ref={ref}>{display}</span>;
}

const stats = [
  {
    number: "400%",
    labelKey: "impactStat1Label",
    color: "#8B5CF6",
    sourceKey: "impactStat1Source",
  },
  {
    number: "8.5 Lakh",
    labelKey: "impactStat2Label",
    color: "#0EA5E9",
    sourceKey: "impactStat2Source",
  },
  {
    number: "15s",
    labelKey: "impactStat3Label",
    color: "#10B981",
    sourceKey: "impactStat3Source",
  },
  {
    number: "12",
    labelKey: "impactStat4Label",
    color: "#F59E0B",
    sourceKey: "impactStat4Source",
  },
];

export default function ImpactNumbers() {
  const { t } = useLanguage();

  return (
    <section
      id="impact"
      className="relative py-32 bg-bg-primary overflow-hidden"
    >
      {/* Background glow */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(139,92,246,0.08)_0%,transparent_70%)]" />

      <div className="relative z-10 max-w-6xl mx-auto px-6">
        {/* Label */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-[12px] font-semibold tracking-[1.2px] uppercase text-accent-secondary font-body text-center mb-6"
        >
          {t("impactLabel")}
        </motion.p>

        {/* Heading */}
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="font-display text-[36px] sm:text-[44px] md:text-[52px] font-[800] leading-[1.15] text-text-primary text-center mb-20"
        >
          {t("impactHeading")}
        </motion.h2>

        {/* Stats grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 mb-20">
          {stats.map((stat, idx) => (
            <motion.div
              key={stat.labelKey}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.12 }}
              className="text-center"
            >
              <div className="font-mono text-[36px] sm:text-[44px] md:text-[52px] font-[500]" style={{ color: stat.color }}>
                <CountUp end={stat.number} duration={2} />
              </div>
              <div className="font-body text-[13px] sm:text-[14px] text-text-secondary leading-relaxed mb-2">
                {t(stat.labelKey)}
              </div>
              <div className="font-body text-[9px] text-[#475569] italic">
                {t(stat.sourceKey)}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Quote */}
        <motion.blockquote
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
          className="relative max-w-3xl mx-auto"
        >
          <div className="absolute left-0 top-0 bottom-0 w-[3px] bg-gradient-to-b from-accent-primary to-accent-primary/0 rounded-full" />
          <div className="pl-8">
          <p className="font-body text-[18px] leading-[1.75] text-text-secondary italic mb-4">
            &ldquo;{t("impactQuote")}&rdquo;
          </p>
            <cite className="font-mono text-[13px] text-accent-primary not-italic">
              — Team VAAKYA
            </cite>
          </div>
        </motion.blockquote>
      </div>
    </section>
  );
}
