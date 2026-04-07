"use client";

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { FileText } from "lucide-react";

export default function FAB() {
  const [showTooltip, setShowTooltip] = useState(false);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const checkVisibility = () => {
      setVisible(window.innerWidth < 768);
    };
    checkVisibility();
    window.addEventListener("resize", checkVisibility);
    return () => window.removeEventListener("resize", checkVisibility);
  }, []);

  if (!visible) return null;

  const handleClick = () => {
    document.getElementById("demo")?.scrollIntoView({ behavior: "smooth" });
    setTimeout(() => {
      const insuranceBtn = document.getElementById("sample-insurance");
      if (insuranceBtn) {
        insuranceBtn.click();
      }
    }, 800);
  };

  return (
    <div className="fixed bottom-6 right-6 z-50">
      {/* Tooltip */}
      {showTooltip && (
        <motion.div
          initial={{ opacity: 0, y: 5 }}
          animate={{ opacity: 1, y: 0 }}
          className="absolute bottom-[70px] right-0 bg-white text-bg-primary text-[12px] font-body font-semibold px-3 py-1.5 rounded-full whitespace-nowrap shadow-lg"
        >
          Try Demo
        </motion.div>
      )}

      {/* Notification dot */}
      <div className="absolute -top-1 -right-1 w-5 h-5 rounded-full bg-[#EF4444] flex items-center justify-center text-[9px] font-bold text-white z-10">
        3
      </div>

      {/* Pulse ring */}
      <div className="absolute inset-0 rounded-full animate-ping border-2 border-accent-primary/50" />

      {/* Main button */}
      <button
        onClick={handleClick}
        onMouseEnter={() => setShowTooltip(true)}
        onMouseLeave={() => setShowTooltip(false)}
        className="relative w-[60px] h-[60px] rounded-full bg-gradient-to-br from-accent-primary to-[#6D28D9] shadow-[0_8px_32px_rgba(139,92,246,0.4)] flex items-center justify-center text-white hover:shadow-[0_8px_40px_rgba(139,92,246,0.6)] active:scale-95 transition-all duration-200"
        aria-label="Analyze Document"
      >
        <motion.div
          animate={{ 
            scale: [1, 1.1, 1],
          }}
          transition={{ 
            duration: 1.5,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        >
          <FileText className="w-6 h-6" />
        </motion.div>
      </button>
    </div>
  );
}
