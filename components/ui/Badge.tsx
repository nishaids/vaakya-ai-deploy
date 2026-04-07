"use client";

import React from "react";

interface BadgeProps {
  children: React.ReactNode;
  color?: "violet" | "gold" | "green" | "red" | "blue";
  className?: string;
}

export default function Badge({
  children,
  color = "violet",
  className = "",
}: BadgeProps) {
  const colorStyles = {
    violet: "bg-accent-primary/10 border-accent-primary/30 text-accent-primary",
    gold: "bg-accent-secondary/10 border-accent-secondary/30 text-accent-secondary",
    green: "bg-accent-success/10 border-accent-success/30 text-accent-success",
    red: "bg-accent-danger/10 border-accent-danger/30 text-accent-danger",
    blue: "bg-accent-info/10 border-accent-info/30 text-accent-info",
  };

  return (
    <span
      className={`inline-flex items-center px-3 py-1.5 rounded-full text-[11px] font-bold tracking-[1px] uppercase border font-body ${colorStyles[color]} ${className}`}
    >
      {children}
    </span>
  );
}
