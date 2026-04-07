"use client";

import React, { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";
import Button from "./ui/Button";
import ExpoMode from "./ExpoMode";
import { useLanguage } from "@/lib/LanguageContext";
import { Language } from "@/lib/translations";

const navLinks = [
  { label: "navHome", href: "#hero" },
  { label: "navHow", href: "#how-it-works" },
  { label: "navAgents", href: "#agents" },
  { label: "navDemo", href: "#demo" },
  { label: "navAbout", href: "#impact" },
];

const languages: { code: Language; label: string }[] = [
  { code: "en", label: "EN" },
  { code: "hi", label: "हिंदी" },
  { code: "ta", label: "தமிழ்" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const { lang, setLang, t } = useLanguage();

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 60) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleAnalyzeClick = useCallback(() => {
    document.getElementById("demo")?.scrollIntoView({ behavior: "smooth" });
    setTimeout(() => {
      const rentalBtn = document.getElementById("sample-rental");
      if (rentalBtn) {
        rentalBtn.click();
      }
    }, 800);
  }, []);

  return (
    <>
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled
            ? "backdrop-blur-xl bg-[#04030A]/90 border-b border-white/[0.06]"
            : "bg-transparent"
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          {/* Logo */}
          <a href="#hero" className="flex items-center gap-2">
            <span className="font-display text-[24px] font-[900] text-white tracking-tight">
              VAAKYA
            </span>
            <span className="font-display text-[24px] font-[900] text-accent-primary">
              .AI
            </span>
            <motion.div
              className="w-2 h-2 rounded-full bg-accent-primary ml-1"
              animate={{
                boxShadow: [
                  "0 0 4px #8B5CF6",
                  "0 0 12px #8B5CF6",
                  "0 0 4px #8B5CF6",
                ],
              }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            />
          </a>

          {/* Desktop Nav */}
          <div className="hidden lg:flex items-center gap-8">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="font-body text-[14px] font-medium text-text-secondary hover:text-text-primary transition-colors duration-200"
              >
                {t(link.label)}
              </a>
            ))}
          </div>

          {/* Right side */}
          <div className="hidden lg:flex items-center gap-4">
            {/* Language switcher */}
            <div className="flex items-center bg-bg-card/60 rounded-full border border-white/[0.06] p-0.5">
              {languages.map((langOption) => (
                <button
                  key={langOption.code}
                  onClick={() => setLang(langOption.code)}
                  className={`px-3 py-1.5 rounded-full text-[12px] font-medium font-body transition-all duration-200 min-h-[36px] min-w-[44px] ${
                    lang === langOption.code
                      ? "bg-accent-primary text-white"
                      : "text-text-muted hover:text-text-secondary"
                  }`}
                >
                  {langOption.label}
                </button>
              ))}
            </div>
            <ExpoMode />
            <Button variant="primary" size="sm" onClick={handleAnalyzeClick}>
              {t("navCTA")}
            </Button>
          </div>

          {/* Mobile hamburger */}
          <button
            onClick={() => setMobileOpen(true)}
            className="lg:hidden text-text-secondary hover:text-text-primary transition-colors min-h-[44px] min-w-[44px] flex items-center justify-center"
          >
            <Menu className="w-6 h-6" />
          </button>
        </div>
      </motion.nav>

      {/* Mobile overlay */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-bg-primary/98 backdrop-blur-xl flex flex-col"
          >
            <div className="flex items-center justify-between px-6 h-16">
              <span className="font-display text-[24px] font-[900] text-white">
                VAAKYA<span className="text-accent-primary">.AI</span>
              </span>
              <button
                onClick={() => setMobileOpen(false)}
                className="text-text-secondary hover:text-text-primary min-h-[44px] min-w-[44px] flex items-center justify-center"
              >
                <X className="w-6 h-6" />
              </button>
            </div>
            <div className="flex flex-col items-center justify-center flex-1 gap-8">
              {navLinks.map((link, idx) => (
                <motion.a
                  key={link.label}
                  href={link.href}
                  onClick={() => setMobileOpen(false)}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: idx * 0.08 }}
                  className="font-display text-[28px] font-bold text-text-secondary hover:text-text-primary transition-colors"
                >
                  {t(link.label)}
                </motion.a>
              ))}
              <div className="flex items-center gap-2 mt-4">
                {languages.map((langOption) => (
                  <button
                    key={langOption.code}
                    onClick={() => {
                      setLang(langOption.code);
                      setMobileOpen(false);
                    }}
                    className={`px-3 py-1.5 rounded-full text-[12px] font-medium transition-all min-h-[44px] min-w-[44px] ${
                      lang === langOption.code
                        ? "bg-accent-primary text-white"
                        : "bg-bg-card text-text-muted"
                    }`}
                  >
                    {langOption.label}
                  </button>
                ))}
              </div>
              <Button variant="primary" size="md" className="mt-4" onClick={() => {
                handleAnalyzeClick();
                setMobileOpen(false);
              }}>
                {t("navCTA")}
              </Button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
