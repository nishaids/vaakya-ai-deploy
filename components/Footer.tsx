"use client";

import React from "react";
import { useLanguage } from "@/lib/LanguageContext";

const footerLinks = [
  {
    titleKey: "footerProduct",
    linkKeys: ["footerLink1", "footerLink2", "footerLink3", "footerLink4"],
  },
  {
    titleKey: "footerLegal",
    linkKeys: ["footerLink5", "footerLink6", "footerLink7", "footerLink8"],
  },
  {
    titleKey: "footerTech",
    linkKeys: ["footerLink9", "footerLink10", "footerLink11"],
  },
  {
    titleKey: "footerContact",
    linkKeys: ["footerLink12", "footerLink13", "footerLink14"],
  },
];

export default function Footer() {
  const { t } = useLanguage();

  return (
    <footer className="relative bg-bg-primary border-t border-white/[0.06]">
      <div className="max-w-7xl mx-auto px-6 py-16">
        {/* Top section */}
        <div className="grid grid-cols-1 lg:grid-cols-[1.5fr_1fr_1fr_1fr_1fr] gap-10 mb-12">
          {/* Brand */}
          <div>
            <a href="#hero" className="inline-flex items-center gap-1 mb-4">
              <span className="font-display text-[24px] font-[900] text-white">
                VAAKYA
              </span>
              <span className="font-display text-[24px] font-[900] text-accent-primary">
                .AI
              </span>
            </a>
            <p className="font-body text-[14px] text-text-secondary leading-relaxed max-w-[280px]">
              {t("footerTagline")}
            </p>
          </div>

          {/* Link columns */}
          {footerLinks.map((col) => (
            <div key={col.titleKey}>
              <h4 className="font-body text-[12px] font-semibold tracking-[1.2px] uppercase text-text-muted mb-5">
                {t(col.titleKey)}
              </h4>
              <ul className="flex flex-col gap-3">
                {col.linkKeys.map((linkKey) => (
                  <li key={linkKey}>
                    <a
                      href="#"
                      className="font-body text-[14px] text-text-secondary hover:text-text-primary transition-colors duration-200"
                    >
                      {t(linkKey)}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div style={{
          borderTop: '1px solid rgba(139,92,246,0.15)',
          padding: '20px 80px',
          textAlign: 'center',
          fontSize: '12px',
          color: '#475569'
        }}>
          © 2026 VAAKYA AI · Built for India.
        </div>
      </div>
    </footer>
  );
}
