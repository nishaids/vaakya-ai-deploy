"use client";

import React, { useState, useEffect, useCallback } from "react";
import { createPortal } from "react-dom";
import { ChevronLeft, ChevronRight, X, Presentation } from "lucide-react";

const sectionIds = [
  "hero",
  "problem",
  "howItWorks",
  "demo",
  "agents",
  "useCases",
  "impact",
  "analytics",
  "techStack",
  "footer",
];

const sectionLabels: Record<string, string> = {
  hero: "HOME",
  problem: "THE PROBLEM",
  howItWorks: "HOW IT WORKS",
  demo: "LIVE DEMO",
  agents: "MEET THE AGENTS",
  useCases: "USE CASES",
  impact: "OUR IMPACT",
  analytics: "ANALYTICS",
  techStack: "TECH STACK",
  footer: "FOOTER",
};

export default function ExpoMode() {
  const [isActive, setIsActive] = useState(false);
  const [currentSection, setCurrentSection] = useState(0);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const enterExpo = useCallback(() => {
    document.documentElement.requestFullscreen().catch(() => {});
    setIsActive(true);
    document.body.classList.add("expo-mode");
  }, []);

  const exitExpo = useCallback(() => {
    if (document.fullscreenElement) {
      document.exitFullscreen().catch(() => {});
    }
    setIsActive(false);
    document.body.classList.remove("expo-mode");
  }, []);

  const goToSection = useCallback(
    (index: number) => {
      const clamped = Math.max(0, Math.min(index, sectionIds.length - 1));
      setCurrentSection(clamped);
      const el = document.getElementById(sectionIds[clamped]);
      if (el) el.scrollIntoView({ behavior: "smooth" });
    },
    []
  );

  const nextSection = useCallback(() => goToSection(currentSection + 1), [currentSection, goToSection]);
  const prevSection = useCallback(() => goToSection(currentSection - 1), [currentSection, goToSection]);

  const triggerDemo = useCallback((type: string) => {
    const demoEl = document.getElementById("demo");
    if (demoEl) {
      demoEl.scrollIntoView({ behavior: "smooth" });
      setTimeout(() => {
        const btnId = type === "rental" ? "sample-rental" : type === "insurance" ? "sample-insurance" : "sample-bank";
        const btn = document.getElementById(btnId);
        if (btn) btn.click();
      }, 800);
    }
  }, []);

  useEffect(() => {
    if (!isActive) return;
    const handleKey = (e: KeyboardEvent) => {
      switch (e.key) {
        case "ArrowRight":
        case "ArrowDown":
          e.preventDefault();
          nextSection();
          break;
        case "ArrowLeft":
        case "ArrowUp":
          e.preventDefault();
          prevSection();
          break;
        case "Escape":
          exitExpo();
          break;
        case "d":
        case "D":
          e.preventDefault();
          triggerDemo("rental");
          break;
        case "i":
        case "I":
          e.preventDefault();
          triggerDemo("insurance");
          break;
        case "b":
        case "B":
          e.preventDefault();
          triggerDemo("bank");
          break;
      }
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [isActive, nextSection, prevSection, exitExpo, triggerDemo]);

  useEffect(() => {
    if (!isActive) return;
    const observers: IntersectionObserver[] = [];
    sectionIds.forEach((id, idx) => {
      const el = document.getElementById(id);
      if (!el) return;
      const obs = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) setCurrentSection(idx);
        },
        { threshold: 0.4 }
      );
      obs.observe(el);
      observers.push(obs);
    });
    return () => observers.forEach((o) => o.disconnect());
  }, [isActive]);

  useEffect(() => {
    const handler = () => {
      if (!document.fullscreenElement && isActive) {
        setIsActive(false);
        document.body.classList.remove("expo-mode");
      }
    };
    document.addEventListener("fullscreenchange", handler);
    return () => document.removeEventListener("fullscreenchange", handler);
  }, [isActive]);

  if (!mounted) return null;

  const overlay = isActive ? (
    <div className="fixed inset-0 z-[100] pointer-events-none">
      {/* Top bar */}
      <div className="absolute top-0 left-0 right-0 h-14 flex items-center justify-between px-8 pointer-events-auto">
        {/* Project branding */}
        <div className="flex flex-col">
          <span className="font-display text-[24px] font-[900]" style={{ color: '#8B5CF6' }}>
            VAAKYA AI
          </span>
          <span className="font-body text-[14px] text-gray-400">
            Your Rights. Enforced by AI.
          </span>
        </div>
        
        {/* Section indicator (top right) */}
        <div className="flex items-center gap-4">
          <span className="font-body text-[13px] text-text-secondary bg-bg-card/80 px-3 py-1 rounded-full">
            {sectionLabels[sectionIds[currentSection]] || ""}
          </span>
          <button
            onClick={exitExpo}
            className="text-text-muted hover:text-text-primary transition-colors min-h-[44px] min-w-[44px] flex items-center justify-center"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="absolute bottom-0 left-0 right-0 h-16 flex items-center justify-between px-8 pointer-events-auto">
        {/* Keyboard hints (bottom left) */}
        <div className="font-body text-[10px] text-[#475569]">
          [D] Rental &nbsp;[I] Insurance &nbsp;[B] Bank &nbsp;[←][→] Navigate &nbsp;[ESC] Exit
        </div>

        {/* Navigation arrows */}
        <div className="flex items-center gap-2">
          <button
            onClick={prevSection}
            disabled={currentSection === 0}
            className="w-10 h-10 rounded-full border border-white/[0.1] bg-bg-primary/80 backdrop-blur flex items-center justify-center text-white hover:bg-white/[0.05] transition-colors disabled:opacity-30 min-h-[44px] min-w-[44px]"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          <button
            onClick={nextSection}
            disabled={currentSection === sectionIds.length - 1}
            className="w-10 h-10 rounded-full border border-white/[0.1] bg-bg-primary/80 backdrop-blur flex items-center justify-center text-white hover:bg-white/[0.05] transition-colors disabled:opacity-30 min-h-[44px] min-w-[44px]"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>

        {/* Section dots */}
        <div className="flex items-center gap-2">
          {sectionIds.map((_, idx) => (
            <button
              key={idx}
              onClick={() => goToSection(idx)}
              className="min-h-[44px] min-w-[44px] flex items-center justify-center"
            >
              <div
                className="rounded-full transition-all duration-300"
                style={{
                  width: currentSection === idx ? 20 : 6,
                  height: 6,
                  background:
                    currentSection === idx
                      ? "#8B5CF6"
                      : "rgba(255,255,255,0.2)",
                  borderRadius: 3,
                }}
              />
            </button>
          ))}
        </div>

        {/* Team credit (bottom center) */}
        <span className="font-body text-[11px] text-[#6B7280]">
          VAAKYA AI · National Project Expo 2025
        </span>
      </div>
    </div>
  ) : null;

  return (
    <>
      {/* Expo Mode button — desktop only */}
      <button
        onClick={enterExpo}
        className="hidden lg:flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/[0.04] border border-white/[0.08] text-text-muted hover:text-text-primary hover:bg-white/[0.09] transition-all font-body text-[13px] min-h-[36px]"
      >
        <Presentation className="w-4 h-4" />
        Expo Mode
      </button>

      {mounted && overlay && createPortal(overlay, document.body)}
    </>
  );
}
