"use client";

import React, { useRef, useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
  Home,
  Heart,
  CreditCard,
  Briefcase,
  Zap,
  ShoppingBag,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { useLanguage } from "@/lib/LanguageContext";

const useCases = [
  {
    titleKey: "useCase1Title",
    descKey: "useCase1Desc",
    icon: Home,
    color: "#8B5CF6",
    recovery: "₹18,000",
  },
  {
    titleKey: "useCase2Title",
    descKey: "useCase2Desc",
    icon: Heart,
    color: "#EF4444",
    recovery: "₹85,000",
  },
  {
    titleKey: "useCase3Title",
    descKey: "useCase3Desc",
    icon: CreditCard,
    color: "#0EA5E9",
    recovery: "₹12,000",
  },
  {
    titleKey: "useCase4Title",
    descKey: "useCase4Desc",
    icon: Briefcase,
    color: "#F59E0B",
    recovery: "Legal protection",
  },
  {
    titleKey: "useCase5Title",
    descKey: "useCase5Desc",
    icon: Zap,
    color: "#10B981",
    recovery: "₹4,000",
  },
  {
    titleKey: "useCase6Title",
    descKey: "useCase6Desc",
    icon: ShoppingBag,
    color: "#EC4899",
    recovery: "Full refund",
  },
];

export default function UseCases() {
  const { t } = useLanguage();
  const scrollRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  const scrollTo = (direction: "left" | "right") => {
    if (!scrollRef.current) return;
    const amount = 320;
    scrollRef.current.scrollBy({
      left: direction === "left" ? -amount : amount,
      behavior: "smooth",
    });
  };

  useEffect(() => {
    const container = scrollRef.current;
    if (!container) return;
    const handleScroll = () => {
      const scrollLeft = container.scrollLeft;
      const cardWidth = 340 + 20;
      const idx = Math.round(scrollLeft / cardWidth);
      setActiveIndex(Math.min(idx, useCases.length - 1));
    };
    container.addEventListener("scroll", handleScroll);
    return () => container.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <section
      id="use-cases"
      className="relative py-32 bg-bg-secondary overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-6">
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-[12px] font-semibold tracking-[1.2px] uppercase text-text-secondary font-body text-center mb-6"
        >
          {t("useCasesLabel")}
        </motion.p>

        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="font-display text-[36px] sm:text-[44px] md:text-[52px] font-[800] leading-[1.15] text-text-primary text-center mb-8"
        >
          {t("useCasesHeading")}
        </motion.h2>

        {/* Arrow controls */}
        <div className="flex justify-end gap-2 mb-6">
          <button
            onClick={() => scrollTo("left")}
            className="w-10 h-10 rounded-full border border-white/[0.1] bg-transparent flex items-center justify-center text-white hover:bg-white/[0.05] transition-colors min-h-[44px] min-w-[44px]"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          <button
            onClick={() => scrollTo("right")}
            className="w-10 h-10 rounded-full border border-white/[0.1] bg-transparent flex items-center justify-center text-white hover:bg-white/[0.05] transition-colors min-h-[44px] min-w-[44px]"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>

        {/* Horizontal scroll cards */}
        <div
          ref={scrollRef}
          className="flex gap-5 overflow-x-auto pb-4"
          style={{
            scrollSnapType: "x mandatory",
            scrollbarWidth: "none",
            msOverflowStyle: "none",
          }}
        >
          {useCases.map((uc, idx) => {
            const Icon = uc.icon;
            return (
              <motion.div
                key={uc.titleKey}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.08 }}
                className="flex-shrink-0 min-w-[300px] w-[340px] bg-bg-card/50 border border-white/[0.06] rounded-[20px] p-6 hover:border-white/[0.15] hover:-translate-y-1 transition-all duration-300 group flex flex-col"
                style={{ scrollSnapAlign: "start" }}
              >
                <div
                  className="w-12 h-12 rounded-xl flex items-center justify-center mb-5"
                  style={{ backgroundColor: `${uc.color}15` }}
                >
                  <Icon className="w-6 h-6" style={{ color: uc.color }} />
                </div>

                <h3 className="font-display text-[20px] font-bold text-text-primary mb-3">
                  {t(uc.titleKey)}
                </h3>

                <p className="font-body text-[14px] leading-[1.7] text-text-secondary flex-1 mb-6">
                  {t(uc.descKey)}
                </p>

                <div className="flex items-center justify-between pt-4 border-t border-white/[0.06]">
                  <span className="font-body text-[12px] font-semibold uppercase tracking-[0.5px] text-text-muted">
                    {t("avgRecovery")}
                  </span>
                  <span className="font-mono text-[16px] font-medium text-accent-secondary">
                    {uc.recovery}
                  </span>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Scroll indicator dots */}
        <div className="flex items-center justify-center gap-2 mt-6">
          {useCases.map((_, idx) => (
            <div
              key={idx}
              className="rounded-full transition-all duration-300"
              style={{
                width: activeIndex === idx ? 24 : 8,
                height: 8,
                background:
                  activeIndex === idx
                    ? "#8B5CF6"
                    : "rgba(255,255,255,0.2)",
                borderRadius: 4,
              }}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
