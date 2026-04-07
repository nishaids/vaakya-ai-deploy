"use client";

import React from "react";
import { motion } from "framer-motion";
import { Check } from "lucide-react";

interface ProgressRowProps {
  agentName: string;
  task: string;
  isActive: boolean;
  isComplete: boolean;
  delay?: number;
  color?: string;
}

export default function ProgressRow({
  agentName,
  task,
  isActive,
  isComplete,
  delay = 0,
  color = "#8B5CF6",
}: ProgressRowProps) {
  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={
        isActive || isComplete
          ? { opacity: 1, x: 0 }
          : { opacity: 0, x: -20 }
      }
      transition={{ duration: 0.4, delay: delay * 0.001, ease: "easeOut" }}
      className="flex items-center gap-3 py-3 px-4 rounded-xl bg-bg-card/50 border border-white/[0.05]"
    >
      <div
        className="w-2 h-2 rounded-full flex-shrink-0"
        style={{
          backgroundColor: isComplete ? "#10B981" : isActive ? color : "#6B6880",
          boxShadow: isActive ? `0 0 8px ${color}` : "none",
        }}
      />
      <span className="font-mono text-[13px] text-accent-primary font-medium flex-shrink-0">
        {agentName}
      </span>
      <span className="text-text-secondary text-[13px] flex-1">{task}</span>
      {isComplete && (
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: "spring", stiffness: 500, damping: 25 }}
        >
          <Check className="w-4 h-4 text-accent-success" />
        </motion.div>
      )}
      {isActive && !isComplete && (
        <motion.div
          className="w-4 h-4 border-2 border-t-transparent rounded-full"
          style={{ borderColor: color, borderTopColor: "transparent" }}
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
        />
      )}
    </motion.div>
  );
}
