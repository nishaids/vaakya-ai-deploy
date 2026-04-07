"use client";

import React from "react";
import { motion } from "framer-motion";
import { Eye, Scale, ShieldAlert, Zap } from "lucide-react";
import { useLanguage } from "@/lib/LanguageContext";

const agents = [
  {
    name: "DRISHTI",
    roleKey: "drishtiRole",
    icon: Eye,
    color: "#0EA5E9",
    badge: "VISION MODEL",
    statKey: "agentDrishtiStat",
    descriptionKey: "agentDrishtiBody",
  },
  {
    name: "NYAYA",
    roleKey: "nyayaRole",
    icon: Scale,
    color: "#F59E0B",
    badge: "LEGAL ENGINE",
    statKey: "agentNyayaStat",
    descriptionKey: "agentNyayaBody",
  },
  {
    name: "SATYA",
    roleKey: "satyaRole",
    icon: ShieldAlert,
    color: "#EF4444",
    badge: "FRAUD DETECTION",
    statKey: "agentSatyaStat",
    descriptionKey: "agentSatyaBody",
  },
  {
    name: "SHAKTI",
    roleKey: "shaktiRole",
    icon: Zap,
    color: "#10B981",
    badge: "ACTION AGENT",
    statKey: "agentShaktiStat",
    descriptionKey: "agentShaktiBody",
  },
];

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.12 },
  },
};

const item = {
  hidden: { opacity: 0, y: 50 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" as const } },
};

export default function AgentCards() {
  const { t } = useLanguage();

  const getAgentDescription = (name: string) => {
    const agent = agents.find(a => a.name === name);
    return agent ? t(agent.descriptionKey) : '';
  };

  const getAgentStat = (name: string) => {
    const agent = agents.find(a => a.name === name);
    return agent ? t(agent.statKey) : '';
  };

  return (
    <section
      id="agents"
      className="relative py-32 bg-bg-primary overflow-hidden"
    >
      <div className="max-w-6xl mx-auto px-6">
        {/* Label */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-[12px] font-semibold tracking-[1.2px] uppercase text-text-secondary font-body text-center mb-6"
        >
          {t("agentsLabel")}
        </motion.p>

        {/* Heading */}
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="font-display text-[36px] sm:text-[44px] md:text-[52px] font-[800] leading-[1.15] text-text-primary text-center mb-16"
        >
          {t("agentsHeading")}
        </motion.h2>

        {/* Agent grid */}
        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-2 gap-6"
        >
          {agents.map((agent) => {
            const Icon = agent.icon;
            return (
              <motion.div
                key={agent.name}
                variants={item}
                className="group relative bg-gradient-to-br from-bg-card to-bg-elevated border border-white/[0.07] rounded-[20px] p-8 hover:border-opacity-40 hover:-translate-y-2 hover:shadow-[0_0_40px_rgba(139,92,246,0.1)] transition-all duration-300 overflow-hidden"
                style={{
                  borderTop: `2px solid ${agent.color}`,
                }}
              >
                {/* Glow effect on hover */}
                <div
                  className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                  style={{
                    background: `radial-gradient(ellipse at top, ${agent.color}10 0%, transparent 70%)`,
                  }}
                />

                <div className="relative z-10">
                  {/* Header */}
                  <div className="flex items-start justify-between mb-5">
                    <div className="flex items-center gap-4">
                      <div
                        className="w-12 h-12 rounded-xl flex items-center justify-center"
                        style={{ backgroundColor: `${agent.color}15` }}
                      >
                        <Icon
                          className="w-6 h-6"
                          style={{ color: agent.color }}
                        />
                      </div>
                      <div>
                        <h3
                          className="font-mono text-[20px] font-medium transition-colors duration-300"
                          style={{
                            color: "#F8F7FF",
                          }}
                        >
                          {agent.name}
                        </h3>
                        <p className="font-body text-[13px] text-text-muted">
                          {t(agent.roleKey)}
                        </p>
                      </div>
                    </div>
                    <span
                      className="text-[10px] font-bold tracking-[1px] uppercase px-2.5 py-1 rounded-full font-body"
                      style={{
                        backgroundColor: `${agent.color}15`,
                        color: agent.color,
                      }}
                    >
                      {agent.badge}
                    </span>
                  </div>

                  {/* Description */}
                  <p className="font-body text-[14px] leading-[1.7] text-text-secondary mb-5">
                    {getAgentDescription(agent.name)}
                  </p>

                  {/* Stat */}
                  <div className="flex flex-col">
                    <span
                      className="font-mono text-[18px] font-medium"
                      style={{ color: agent.color }}
                    >
                      {getAgentStat(agent.name)}
                    </span>
                    {agent.name === "DRISHTI" && (
                      <span className="font-body text-[9px] mt-2" style={{ color: agent.color, backgroundColor: `${agent.color}10`, border: `1px solid ${agent.color}30`, borderRadius: '100px', padding: '3px 10px', display: 'inline-block', width: 'fit-content' }}>
                        Powered by Google Gemini Vision
                      </span>
                    )}
                    {agent.name === "NYAYA" && (
                      <span className="font-body text-[9px] mt-2" style={{ color: agent.color, backgroundColor: `${agent.color}10`, border: `1px solid ${agent.color}30`, borderRadius: '100px', padding: '3px 10px', display: 'inline-block', width: 'fit-content' }}>
                        Powered by Indian Kanoon + LangChain
                      </span>
                    )}
                    {agent.name === "SATYA" && (
                      <span className="font-body text-[9px] mt-2" style={{ color: agent.color, backgroundColor: `${agent.color}10`, border: `1px solid ${agent.color}30`, borderRadius: '100px', padding: '3px 10px', display: 'inline-block', width: 'fit-content' }}>
                        Powered by CrewAI + Python
                      </span>
                    )}
                    {agent.name === "SHAKTI" && (
                      <span className="font-body text-[9px] mt-2" style={{ color: agent.color, backgroundColor: `${agent.color}10`, border: `1px solid ${agent.color}30`, borderRadius: '100px', padding: '3px 10px', display: 'inline-block', width: 'fit-content' }}>
                        Powered by Gemini API + n8n
                      </span>
                    )}
                  </div>
                </div>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
