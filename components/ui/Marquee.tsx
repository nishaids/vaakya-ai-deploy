"use client";

import React from "react";

interface MarqueeProps {
  items: string[];
  direction?: "left" | "right";
  speed?: number;
  className?: string;
}

export default function Marquee({
  items,
  direction = "left",
  speed = 30,
  className = "",
}: MarqueeProps) {
  const animationClass =
    direction === "left" ? "animate-marquee-left" : "animate-marquee-right";

  const colors = [
    "#8B5CF6",
    "#F59E0B",
    "#10B981",
    "#EF4444",
    "#0EA5E9",
    "#EC4899",
    "#8B5CF6",
    "#F59E0B",
  ];

  return (
    <div
      className={`overflow-hidden whitespace-nowrap group ${className}`}
      style={{ animationDuration: `${speed}s` }}
    >
      <div className={`inline-flex gap-12 items-center ${animationClass}`}>
        {[...items, ...items].map((item, idx) => (
          <div
            key={idx}
            className="inline-flex items-center gap-3 text-text-muted hover:text-text-primary transition-colors duration-300 cursor-default font-body text-[14px] font-medium"
          >
            <span
              className="w-2 h-2 rounded-full flex-shrink-0"
              style={{ backgroundColor: colors[idx % colors.length] }}
            />
            {item}
          </div>
        ))}
      </div>
    </div>
  );
}
