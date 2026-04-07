"use client";

import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MessageCircle, ChevronDown, Trash2, SendHorizontal, Scale } from "lucide-react";
import { useLanguage } from "@/lib/LanguageContext";

interface Message {
  id: string;
  role: "user" | "assistant";
  content: string;
  timestamp: Date;
}

const quickSuggestions = [
  "quick1",
  "quick2",
  "quick3",
  "quick4",
];

const quickActions = [
  "action1",
  "action2",
  "action3",
];

const getFallbackResponse = (text: string): string => {
  const lower = text.toLowerCase();
  if (lower.includes('deposit') || lower.includes('security'))
    return "Under Model Tenancy Act 2021, maximum security deposit is 2 months rent. If overcharged, upload your agreement to VAAKYA AI for instant analysis and legal notice generation!";
  if (lower.includes('insurance') || lower.includes('claim') || lower.includes('rejected'))
    return "IRDA mandates insurers provide rejection reasons and allow 30-day appeal. Upload your rejection letter to VAAKYA AI — we'll identify violations and file your complaint!";
  if (lower.includes('foreclosure') || lower.includes('prepayment'))
    return "RBI banned foreclosure penalties on floating rate home loans since 2012. Upload your bank statement to recover this amount through RBI Banking Ombudsman!";
  if (lower.includes('how') || lower.includes('work') || lower.includes('use'))
    return "VAAKYA AI: 1) Upload document 2) DRISHTI reads it 3) NYAYA checks Indian law 4) SATYA finds violations 5) SHAKTI drafts legal notice — all in 15 seconds. Try the sample documents!";
  if (lower.includes('complaint') || lower.includes('court') || lower.includes('file'))
    return "File free at edaakhil.nic.in — VAAKYA pre-fills this form automatically! No lawyer needed for claims under ₹50 lakhs. Click any sample to see Legal Actions Ready.";
  return "Great question! Upload your document to VAAKYA AI — our 4 AI agents will analyze it with exact Indian law citations in 15 seconds. What type of document do you have?";
};

export default function VaakyaChatbot() {
  const { t } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputValue, setInputValue] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isOpen && messages.length === 0) {
      const greetingMessage: Message = {
        id: "greeting",
        role: "assistant",
        content: t("chatbotGreeting"),
        timestamp: new Date(),
      };
      setMessages([greetingMessage]);
    }
  }, [isOpen, messages.length, t]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isTyping]);

  useEffect(() => {
    if (isOpen) {
      inputRef.current?.focus();
    }
  }, [isOpen]);

  const sendMessage = async (userText: string) => {
    if (!userText.trim()) return;
    
    setMessages(prev => [...prev, {
      id: Date.now().toString(),
      role: 'user',
      content: userText,
      timestamp: new Date()
    }]);
    setInputValue("");
    setIsTyping(true);
    
    const apiKey = process.env.NEXT_PUBLIC_GEMINI_API_KEY;
    
    if (!apiKey) {
      setTimeout(() => {
        setIsTyping(false);
        const fallback = getFallbackResponse(userText);
        setMessages(prev => [...prev, {
          id: (Date.now() + 1).toString(),
          role: 'assistant',
          content: fallback,
          timestamp: new Date()
        }]);
      }, 1500);
      return;
    }
    
    try {
      const conversationHistory = messages.slice(-8).map(m => ({
        role: m.role === 'user' ? 'user' : 'model',
        parts: [{ text: m.content }]
      }));
      
      conversationHistory.push({
        role: 'user',
        parts: [{ text: userText }]
      });
      
      const response = await fetch(
        `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`,
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            system_instruction: {
              parts: [{
                text: `You are VAAKYA Assistant, an expert AI legal rights advisor for India.
                
VAAKYA AI facts:
- Analyzes: rental agreements, insurance rejections, bank statements, job offers, utility bills
- 4 agents: DRISHTI (OCR), NYAYA (Rights Analyzer), SATYA (Fraud Detector), SHAKTI (Action)
- Laws: Consumer Protection Act 2019, RERA, IRDA, RBI Circulars, IPC, Model Tenancy Act 2021
- Generates legal notices, pre-fills eDaakhil forms
- Free, 15 seconds, 12 Indian languages

Rules:
- Answer ANY question the user asks, whether about VAAKYA or Indian law
- Be helpful, accurate, and cite specific law sections
- Keep answers under 5 sentences for simple questions
- For complex questions, give detailed step-by-step answers
- IMPORTANT: Detect the user's language from their message and respond in the SAME language
- If user writes in Tamil, respond in Tamil
- If user writes in Hindi, respond in Hindi  
- If user writes in English, respond in English
- Always end with an actionable next step or suggestion
- Never refuse to answer legal rights questions
- For very complex cases, recommend uploading to VAAKYA for precise analysis`
              }]
            },
            contents: conversationHistory,
            generationConfig: {
              maxOutputTokens: 300,
              temperature: 0.7
            }
          })
        }
      );
      
      if (!response.ok) throw new Error('API failed');
      
      const data = await response.json();
      const reply = data.candidates?.[0]?.content?.parts?.[0]?.text || 
                    getFallbackResponse(userText);
      
      setIsTyping(false);
      setMessages(prev => [...prev, {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: reply,
        timestamp: new Date()
      }]);
      
    } catch {
      setIsTyping(false);
      setMessages(prev => [...prev, {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: getFallbackResponse(userText),
        timestamp: new Date()
      }]);
    }
  };

  const handleSend = async () => {
    if (!inputValue.trim() || isTyping) return;
    await sendMessage(inputValue.trim());
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const handleQuickSuggestion = async (suggestion: string) => {
    await sendMessage(suggestion);
  };

  const handleQuickAction = async (action: string) => {
    await sendMessage(action);
  };

  const handleClear = () => {
    setMessages([]);
  };

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
  };

  return (
    <>
      {/* Chat Trigger Button */}
      <motion.div
        className="fixed bottom-6 right-6 z-50 md:bottom-24 md:right-6"
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ delay: 1 }}
      >
        {/* Tooltip */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileHover={{ opacity: 1, y: 0 }}
          className="absolute bottom-[70px] right-0 bg-[#12111E] text-[12px] font-body font-semibold px-3 py-1.5 rounded-full whitespace-nowrap border border-[rgba(139,92,246,0.3)] text-white mb-2"
        >
          {t("chatbotTooltip")}
        </motion.div>

        {/* Notification dot */}
        <div className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-[#8B5CF6] flex items-center justify-center">
          <div className="absolute w-full h-full rounded-full bg-[#8B5CF6] animate-ping opacity-75" />
        </div>

        <button
          onClick={() => setIsOpen(true)}
          className="w-14 h-14 rounded-full bg-gradient-to-br from-[#8B5CF6] to-[#6D28D9] shadow-[0_8px_32px_rgba(139,92,246,0.4)] flex items-center justify-center text-white hover:shadow-[0_8px_40px_rgba(139,92,246,0.6)] active:scale-95 transition-all duration-200"
          aria-label="Open Chat"
        >
          <MessageCircle className="w-6 h-6" />
        </button>
      </motion.div>

      {/* Chat Panel */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            transition={{ duration: 0.25, ease: "easeOut" }}
            className="fixed bottom-4 right-4 md:bottom-6 md:right-6 z-[60] w-[calc(100vw-32px)] md:w-[380px] h-[520px] bg-[#04030A] border border-[rgba(139,92,246,0.3)] rounded-[20px] shadow-[0_24px_80px_rgba(0,0,0,0.6),0_0_40px_rgba(139,92,246,0.1)] overflow-hidden flex flex-col"
            style={{ maxWidth: "380px" }}
          >
            {/* Header */}
            <div className="flex-shrink-0 bg-gradient-to-r from-[#12111E] to-[#1A1830] border-b border-[rgba(139,92,246,0.2)] px-5 py-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-full bg-[#8B5CF6] flex items-center justify-center">
                    <Scale className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <p className="text-white font-semibold text-sm">{t("chatbotTitle")}</p>
                    <p className="text-[#94A3B8] text-[11px]">{t("chatbotSubtitle")}</p>
                  </div>
                  <div className="w-2 h-2 rounded-full bg-green-500 ml-1">
                    <div className="w-full h-full rounded-full bg-green-500 animate-pulse" />
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    onClick={handleClear}
                    className="p-2 rounded-lg hover:bg-white/5 text-[#6B6880] hover:text-white transition-colors"
                    aria-label="Clear chat"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => setIsOpen(false)}
                    className="p-2 rounded-lg hover:bg-white/5 text-[#6B6880] hover:text-white transition-colors"
                    aria-label="Minimize"
                  >
                    <ChevronDown className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-3 scrollbar-thin">
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={`flex ${message.role === "user" ? "justify-end" : "justify-start"}`}
                >
                  {message.role === "assistant" && (
                    <div className="w-6 h-6 rounded-full bg-[#8B5CF6] flex items-center justify-center flex-shrink-0 mr-2 mt-1">
                      <Scale className="w-3 h-3 text-white" />
                    </div>
                  )}
                  <div
                    className={`max-w-[80%] px-4 py-3 rounded-2xl text-[13px] ${
                      message.role === "user"
                        ? "bg-gradient-to-br from-[#8B5CF6] to-[#6D28D9] text-white rounded-br-4"
                        : "bg-[#12111E] border border-[rgba(139,92,246,0.15)] text-[#E2E8F0] rounded-bl-4"
                    }`}
                  >
                    <p>{message.content}</p>
                    <p className="text-[#475569] text-[11px] mt-1">{formatTime(message.timestamp)}</p>
                  </div>
                </div>
              ))}

              {isTyping && (
                <div className="flex justify-start">
                  <div className="w-6 h-6 rounded-full bg-[#8B5CF6] flex items-center justify-center flex-shrink-0 mr-2 mt-1">
                    <Scale className="w-3 h-3 text-white" />
                  </div>
                  <div className="bg-[#12111E] border border-[rgba(139,92,246,0.15)] px-4 py-3 rounded-2xl rounded-bl-4">
                    <div className="flex gap-1">
                      <div className="w-2 h-2 rounded-full bg-[#8B5CF6] animate-bounce" />
                      <div className="w-2 h-2 rounded-full bg-[#8B5CF6] animate-bounce" style={{ animationDelay: "0.1s" }} />
                      <div className="w-2 h-2 rounded-full bg-[#8B5CF6] animate-bounce" style={{ animationDelay: "0.2s" }} />
                    </div>
                  </div>
                </div>
              )}

              {messages.length === 1 && !isTyping && (
                <div className="flex flex-wrap gap-2 mt-2">
                  {quickSuggestions.map((suggestion) => (
                    <button
                      key={suggestion}
                      onClick={() => handleQuickSuggestion(t(suggestion))}
                      className="px-3 py-1.5 rounded-full text-[11px] border border-[rgba(139,92,246,0.3)] text-[#A09DB8] hover:bg-[rgba(139,92,246,0.1)] hover:text-[#8B5CF6] transition-colors"
                    >
                      {t(suggestion)}
                    </button>
                  ))}
                </div>
              )}

              <div ref={messagesEndRef} />
            </div>

            {/* Quick Actions */}
            <div className="flex-shrink-0 px-4 py-2 border-t border-[rgba(255,255,255,0.06)]">
              <div className="flex gap-2 overflow-x-auto pb-1">
                {quickActions.map((action) => (
                  <button
                    key={action}
                    onClick={() => handleQuickAction(t(action))}
                    className="px-3 py-1.5 rounded-full text-[10px] border border-[rgba(139,92,246,0.3)] text-[#A09DB8] hover:bg-[rgba(139,92,246,0.1)] hover:text-[#8B5CF6] transition-colors whitespace-nowrap"
                  >
                    {t(action)}
                  </button>
                ))}
              </div>
            </div>

            {/* Input */}
            <div className="flex-shrink-0 bg-[#0C0B15] border-t border-[rgba(255,255,255,0.06)] px-4 py-3">
              <div className="flex gap-2">
                <input
                  ref={inputRef}
                  type="text"
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder={t("chatbotPlaceholder")}
                  className="flex-1 bg-[rgba(255,255,255,0.04)] border border-[rgba(255,255,255,0.1)] rounded-xl px-4 py-2.5 text-[13px] text-[#E2E8F0] placeholder-[#475569] focus:border-[rgba(139,92,246,0.5)] focus:outline-none transition-colors"
                />
                <button
                  onClick={handleSend}
                  disabled={!inputValue.trim() || isTyping}
                  className="w-10 h-10 rounded-full bg-[#8B5CF6] flex items-center justify-center text-white hover:bg-[#7C3AED] hover:scale-105 disabled:opacity-40 disabled:hover:scale-100 transition-all"
                >
                  <SendHorizontal className="w-4 h-4" />
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
