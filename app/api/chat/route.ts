import { NextRequest, NextResponse } from "next/server";

const GEMINI_MODELS = [
  "gemini-2.0-flash",
  "gemini-2.0-flash-001",
  "gemini-2.0-flash-lite",
];

const SYSTEM_INSTRUCTION = `You are VAAKYA Assistant, an expert AI legal rights advisor for India.
                 
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
- For very complex cases, recommend uploading to VAAKYA for precise analysis`;

interface ChatMessage {
  role: string;
  parts: { text: string }[];
}

async function callGeminiChat(
  apiKey: string,
  conversationHistory: ChatMessage[]
): Promise<Response> {
  for (const model of GEMINI_MODELS) {
    for (let attempt = 0; attempt < 3; attempt++) {
      const url = `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${apiKey}`;

      console.log(`[VAAKYA CHAT] Trying model=${model}, attempt=${attempt + 1}`);

      const response = await fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          system_instruction: {
            parts: [{ text: SYSTEM_INSTRUCTION }],
          },
          contents: conversationHistory,
          generationConfig: {
            maxOutputTokens: 300,
            temperature: 0.7,
          },
        }),
      });

      console.log(`[VAAKYA CHAT] model=${model} attempt=${attempt + 1} status=${response.status}`);

      if (response.ok) {
        return response;
      }

      if (response.status === 429) {
        const waitMs = Math.min(1000 * Math.pow(2, attempt), 8000);
        console.log(`[VAAKYA CHAT] Rate limited. Waiting ${waitMs}ms...`);
        await new Promise((resolve) => setTimeout(resolve, waitMs));
        continue;
      }

      if (response.status === 404) {
        console.log(`[VAAKYA CHAT] Model ${model} not found, trying next...`);
        break;
      }

      return response;
    }
  }

  return new Response(
    JSON.stringify({ error: "All Gemini models exhausted" }),
    { status: 503, headers: { "Content-Type": "application/json" } }
  );
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { messages } = body;

    if (!messages || !Array.isArray(messages)) {
      return NextResponse.json(
        { error: "Missing messages array" },
        { status: 400 }
      );
    }

    const apiKey =
      process.env.GEMINI_API_KEY ||
      process.env.NEXT_PUBLIC_GEMINI_API_KEY ||
      "AIzaSyCa14JdI-EdUgFu4SiXnkxw0-FJCK0ySek";

    if (!apiKey) {
      return NextResponse.json(
        { error: "API key not configured" },
        { status: 500 }
      );
    }

    console.log("[VAAKYA CHAT] Processing chat request...");

    const response = await callGeminiChat(apiKey, messages);

    if (!response.ok) {
      const errorText = await response.text();
      console.error("[VAAKYA CHAT] Final error:", response.status, errorText);
      return NextResponse.json(
        { error: `Chat API error: ${response.status}` },
        { status: response.status }
      );
    }

    const data = await response.json();
    const reply = data?.candidates?.[0]?.content?.parts?.[0]?.text;

    if (!reply) {
      console.error("[VAAKYA CHAT] No text in response");
      return NextResponse.json(
        { error: "Empty response" },
        { status: 502 }
      );
    }

    console.log("[VAAKYA CHAT] ✅ Got reply:", reply.substring(0, 100));

    return NextResponse.json({ reply });
  } catch (error) {
    console.error("[VAAKYA CHAT] Server error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
