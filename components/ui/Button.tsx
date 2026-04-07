"use client";

import React from "react";
import { motion } from "framer-motion";

interface ButtonProps {
  variant?: "primary" | "secondary" | "ghost" | "gold";
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
  type?: "button" | "submit";
  disabled?: boolean;
  size?: "sm" | "md" | "lg";
}

export default function Button({
  variant = "primary",
  children,
  className = "",
  onClick,
  type = "button",
  disabled = false,
  size = "md",
}: ButtonProps) {
  const baseStyles =
    "font-body font-semibold rounded-[10px] transition-all duration-200 ease-in-out inline-flex items-center justify-center gap-2 focus-visible:outline-2 focus-visible:outline-accent-primary focus-visible:outline-offset-2 min-h-[44px] min-w-[44px]";

  const sizeStyles = {
    sm: "text-[13px] px-5 py-2.5",
    md: "text-[15px] px-8 py-4",
    lg: "text-[15px] px-10 py-5",
  };

  const variants = {
    primary:
      "bg-gradient-to-br from-accent-primary to-[#6D28D9] text-white shadow-[0_0_40px_rgba(139,92,246,0.3)] hover:shadow-[0_0_60px_rgba(139,92,246,0.5)] hover:scale-[1.02] active:scale-[0.98]",
    secondary:
      "bg-transparent border border-accent-primary/50 text-accent-primary hover:bg-accent-primary/10 hover:border-accent-primary/90",
    ghost:
      "bg-white/[0.04] border border-white/[0.08] text-text-primary hover:bg-white/[0.09]",
    gold: "bg-gradient-to-br from-accent-secondary to-[#D97706] text-bg-primary font-bold shadow-[0_0_30px_rgba(245,158,11,0.25)] hover:shadow-[0_0_50px_rgba(245,158,11,0.45)]",
  };

  return (
    <motion.button
      whileTap={{ scale: 0.98 }}
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`${baseStyles} ${sizeStyles[size]} ${variants[variant]} ${disabled ? "opacity-50 cursor-not-allowed" : ""} ${className}`}
    >
      {children}
    </motion.button>
  );
}
