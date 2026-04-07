"use client";

import React from "react";
import { motion } from "framer-motion";

interface CardProps {
  variant?:
    | "agent"
    | "violation"
    | "safe"
    | "warning"
    | "action"
    | "stat"
    | "elevated";
  children: React.ReactNode;
  className?: string;
  accentColor?: string;
  hover?: boolean;
}

export default function Card({
  variant = "elevated",
  children,
  className = "",
  accentColor,
  hover = true,
}: CardProps) {
  const baseStyles = "rounded-[20px] relative overflow-hidden";

  const variants: Record<string, string> = {
    agent:
      "bg-gradient-to-br from-bg-card to-bg-elevated border border-white/[0.07] p-8 gradient-border-top",
    violation:
      "bg-accent-danger/[0.07] border border-accent-danger/25 border-l-4 border-l-accent-danger rounded-[14px] p-5 px-6",
    safe: "bg-accent-success/[0.07] border border-accent-success/25 border-l-4 border-l-accent-success rounded-[14px] p-5 px-6",
    warning:
      "bg-accent-secondary/[0.07] border border-accent-secondary/25 border-l-4 border-l-accent-secondary rounded-[14px] p-5 px-6",
    action:
      "bg-accent-primary/[0.08] border border-accent-primary/30 rounded-[16px] p-6",
    stat:
      "bg-bg-secondary border border-white/[0.05] rounded-[16px] p-8 text-center",
    elevated:
      "bg-bg-elevated border border-white/[0.06] rounded-[16px] p-6",
  };

  const hoverStyles = hover
    ? {
        agent:
          "hover:border-accent-primary/40 hover:-translate-y-1.5 hover:shadow-[0_0_40px_rgba(139,92,246,0.15)]",
        violation: "hover:border-accent-danger/40",
        safe: "hover:border-accent-success/40",
        warning: "hover:border-accent-secondary/40",
        action: "hover:border-accent-primary/50 hover:-translate-y-1",
        stat: "hover:border-white/[0.12] hover:-translate-y-1",
        elevated: "hover:border-white/[0.15] hover:-translate-y-1",
      }
    : {};

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className={`${baseStyles} ${variants[variant]} ${hoverStyles[variant] || ""} transition-all duration-300 ${className}`}
      style={
        variant === "agent" && accentColor
          ? {
              borderTop: `2px solid ${accentColor}`,
            }
          : undefined
      }
    >
      {children}
    </motion.div>
  );
}
