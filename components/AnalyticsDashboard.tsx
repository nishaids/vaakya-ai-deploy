"use client";

import React from "react";
import { motion } from "framer-motion";
import { useLanguage } from "@/lib/LanguageContext";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  PieChart,
  Pie,
  Cell,
  LineChart,
  Line,
  Area,
  ResponsiveContainer,
} from "recharts";

const violationData = [
  { name: "Rental", value: 342 },
  { name: "Insurance", value: 289 },
  { name: "Banking", value: 198 },
  { name: "Employment", value: 156 },
  { name: "Utility", value: 98 },
];

const docTypeData = [
  { name: "Rental", value: 35, color: "#8B5CF6" },
  { name: "Insurance", value: 28, color: "#F59E0B" },
  { name: "Banking", value: 20, color: "#0EA5E9" },
  { name: "Employment", value: 10, color: "#10B981" },
  { name: "Other", value: 7, color: "#EF4444" },
];

const weeklyData = [
  { day: "Mon", count: 45 },
  { day: "Tue", count: 67 },
  { day: "Wed", count: 52 },
  { day: "Thu", count: 89 },
  { day: "Fri", count: 73 },
  { day: "Sat", count: 91 },
  { day: "Sun", count: 108 },
];

const stateData = [
  { state: "Maharashtra", count: 1243, bar: 85 },
  { state: "Tamil Nadu", count: 987, bar: 72 },
  { state: "Delhi", count: 876, bar: 65 },
  { state: "Karnataka", count: 654, bar: 52 },
  { state: "West Bengal", count: 432, bar: 38 },
];

const chartTooltipStyle = {
  contentStyle: {
    background: "#1A1830",
    border: "1px solid rgba(139,92,246,0.3)",
    borderRadius: 12,
    fontSize: 12,
    fontFamily: "var(--font-jakarta)",
  },
  labelStyle: { color: "#A09DB8" },
  itemStyle: { color: "#F8F7FF" },
};

export default function AnalyticsDashboard() {
  const { t } = useLanguage();

  return (
    <section
      id="analytics"
      className="relative py-32 bg-bg-secondary overflow-hidden"
    >
      <div className="max-w-6xl mx-auto px-6">
          <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-[12px] font-semibold tracking-[1.2px] uppercase text-accent-secondary font-body text-center mb-6"
        >
          {t("analyticsLabel")}
        </motion.p>

        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="font-display text-[36px] sm:text-[44px] md:text-[52px] font-[800] leading-[1.15] text-text-primary text-center mb-4"
        >
          {t("analyticsHeading")}
        </motion.h2>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="flex justify-center mb-16"
        >
          <span className="inline-flex items-center px-3 py-1.5 rounded-full text-[11px] font-bold tracking-[1px] uppercase border font-body bg-accent-secondary/10 border-accent-secondary/30 text-accent-secondary">
            {t("analyticsBadge")}
          </span>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Chart 1 — Top Violation Types */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="bg-bg-card border border-white/[0.07] rounded-[16px] p-6"
          >
            <h4 className="font-body text-[14px] text-text-secondary mb-6">
              {t("analyticsChart1")}
            </h4>
            <ResponsiveContainer width="100%" height={220}>
              <BarChart data={violationData}>
                <XAxis
                  dataKey="name"
                  tick={{ fill: "#6B6880", fontSize: 12 }}
                  axisLine={false}
                  tickLine={false}
                />
                <YAxis
                  tick={{ fill: "#6B6880", fontSize: 12 }}
                  axisLine={false}
                  tickLine={false}
                />
                <Tooltip {...chartTooltipStyle} />
                <Bar
                  dataKey="value"
                  fill="#8B5CF6"
                  radius={[4, 4, 0, 0]}
                  maxBarSize={40}
                />
              </BarChart>
            </ResponsiveContainer>
          </motion.div>

          {/* Chart 2 — Document Types Pie */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="bg-bg-card border border-white/[0.07] rounded-[16px] p-6"
          >
            <h4 className="font-body text-[14px] text-text-secondary mb-6">
              {t("analyticsChart2")}
            </h4>
            <div className="flex items-center gap-6">
              <ResponsiveContainer width="50%" height={180}>
                <PieChart>
                  <Pie
                    data={docTypeData}
                    cx="50%"
                    cy="50%"
                    innerRadius={45}
                    outerRadius={75}
                    dataKey="value"
                    stroke="none"
                  >
                    {docTypeData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                </PieChart>
              </ResponsiveContainer>
              <div className="flex flex-col gap-2">
                {docTypeData.map((d) => (
                  <div key={d.name} className="flex items-center gap-2">
                    <div
                      className="w-2.5 h-2.5 rounded-full"
                      style={{ backgroundColor: d.color }}
                    />
                    <span className="font-body text-[12px] text-text-secondary">
                      {d.name}
                    </span>
                    <span className="font-mono text-[12px] text-text-primary ml-auto">
                      {d.value}%
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Chart 3 — Daily Detections Line */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="bg-bg-card border border-white/[0.07] rounded-[16px] p-6"
          >
            <h4 className="font-body text-[14px] text-text-secondary mb-6">
              {t("analyticsChart3")}
            </h4>
            <ResponsiveContainer width="100%" height={220}>
              <LineChart data={weeklyData}>
                <XAxis
                  dataKey="day"
                  tick={{ fill: "#6B6880", fontSize: 12 }}
                  axisLine={false}
                  tickLine={false}
                />
                <YAxis
                  tick={{ fill: "#6B6880", fontSize: 12 }}
                  axisLine={false}
                  tickLine={false}
                />
                <Tooltip {...chartTooltipStyle} />
                <Area
                  type="monotone"
                  dataKey="count"
                  stroke="none"
                  fill="rgba(139,92,246,0.1)"
                />
                <Line
                  type="monotone"
                  dataKey="count"
                  stroke="#8B5CF6"
                  strokeWidth={2}
                  dot={{ fill: "#8B5CF6", r: 4 }}
                  activeDot={{ r: 6 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </motion.div>

          {/* Chart 4 — State Stats */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
            className="bg-bg-card border border-white/[0.07] rounded-[16px] p-6"
          >
            <h4 className="font-body text-[14px] text-text-secondary mb-6">
              {t("analyticsChart4")}
            </h4>
            <div className="flex flex-col gap-4">
              {stateData.map((s) => (
                <div key={s.state}>
                  <div className="flex items-center justify-between mb-1.5">
                    <span className="font-body text-[13px] text-text-primary">
                      {s.state}
                    </span>
                    <span className="font-mono text-[13px] text-accent-primary font-medium">
                      {s.count.toLocaleString("en-IN")}
                    </span>
                  </div>
                  <div
                    className="h-1 rounded-full"
                    style={{ background: "rgba(139,92,246,0.2)" }}
                  >
                    <motion.div
                      className="h-full rounded-full bg-accent-primary"
                      initial={{ width: 0 }}
                      whileInView={{ width: `${s.bar}%` }}
                      viewport={{ once: true }}
                      transition={{ duration: 1, delay: 0.3 }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
