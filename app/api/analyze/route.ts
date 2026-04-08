import { NextRequest, NextResponse } from "next/server";

const GEMINI_MODELS = [
  "gemini-2.0-flash",
  "gemini-2.0-flash-001",
  "gemini-2.0-flash-lite",
];

const SYSTEM_PROMPT = `You are an expert Indian consumer rights and legal document analyzer. 
Analyze this document carefully and return ONLY valid JSON — absolutely no markdown, 
no backticks, no explanation, just raw JSON starting with { and ending with }:

{
  "summary": {
    "type": "string describing document type",
    "parties": ["Party 1 name", "Party 2 name"],
    "date": "document date or Not specified",
    "duration": "duration or Not applicable"
  },
  "violations": [
    {
      "severity": "ILLEGAL",
      "title": "Short title of violation",
      "description": "Clear description of the problem",
      "law": "Exact Indian law section",
      "amount_recoverable": "Amount or type of relief"
    }
  ],
  "rights": [
    {
      "title": "Right name",
      "description": "What this right means",
      "law": "Exact law reference"
    }
  ],
  "legal_actions": [
    {
      "title": "Action name",
      "type": "Download",
      "description": "What this action does"
    }
  ]
}

Find ALL violations. Cite Consumer Protection Act 2019, RERA, IRDA, 
RBI Master Circulars, IPC, Model Tenancy Act 2021, Rent Control Act.
Be specific. Return minimum 2 violations if any exist.
If the document is in Tamil or Hindi, still return JSON in English.`;

async function callGeminiWithRetry(
  apiKey: string,
  base64Data: string,
  mimeType: string
): Promise<Response> {
  for (const model of GEMINI_MODELS) {
    for (let attempt = 0; attempt < 3; attempt++) {
      const url = `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${apiKey}`;

      console.log(`[VAAKYA API] Trying model=${model}, attempt=${attempt + 1}`);

      const response = await fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          contents: [
            {
              parts: [
                {
                  inline_data: {
                    mime_type: mimeType,
                    data: base64Data,
                  },
                },
                { text: SYSTEM_PROMPT },
              ],
            },
          ],
          generationConfig: {
            maxOutputTokens: 2048,
            temperature: 0.1,
          },
        }),
      });

      console.log(`[VAAKYA API] model=${model} attempt=${attempt + 1} status=${response.status}`);

      if (response.ok) {
        return response;
      }

      if (response.status === 429) {
        // Rate limited — wait with exponential backoff then retry
        const waitMs = Math.min(1000 * Math.pow(2, attempt), 8000);
        console.log(`[VAAKYA API] Rate limited. Waiting ${waitMs}ms before retry...`);
        await new Promise((resolve) => setTimeout(resolve, waitMs));
        continue;
      }

      if (response.status === 404) {
        // Model not found — skip to next model
        console.log(`[VAAKYA API] Model ${model} not found, trying next...`);
        break;
      }

      // Other error — return it
      return response;
    }
  }

  // If all models/retries exhausted, return a synthetic error
  return new Response(
    JSON.stringify({ error: "All Gemini models exhausted after retries" }),
    { status: 503, headers: { "Content-Type": "application/json" } }
  );
}

function parseGeminiJson(rawText: string): Record<string, unknown> {
  let cleanText = rawText.trim();
  cleanText = cleanText.replace(/```json/g, "").replace(/```/g, "").trim();
  const jsonStart = cleanText.indexOf("{");
  const jsonEnd = cleanText.lastIndexOf("}");
  if (jsonStart === -1 || jsonEnd === -1) {
    throw new Error("No JSON found in response");
  }
  cleanText = cleanText.substring(jsonStart, jsonEnd + 1);
  return JSON.parse(cleanText);
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { base64Data, mimeType } = body;

    if (!base64Data || !mimeType) {
      return NextResponse.json(
        { error: "Missing base64Data or mimeType" },
        { status: 400 }
      );
    }

    // Use server-side env var (no NEXT_PUBLIC_ prefix needed on server)
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

    console.log("[VAAKYA API] Starting document analysis...");

    const response = await callGeminiWithRetry(apiKey, base64Data, mimeType);

    if (!response.ok) {
      const errorText = await response.text();
      console.error("[VAAKYA API] Final error:", response.status, errorText);
      return NextResponse.json(
        { error: `Gemini API error: ${response.status}`, details: errorText },
        { status: response.status }
      );
    }

    const data = await response.json();
    const rawText = data?.candidates?.[0]?.content?.parts?.[0]?.text;

    if (!rawText) {
      console.error("[VAAKYA API] No text in response:", JSON.stringify(data).substring(0, 300));
      return NextResponse.json(
        { error: "Empty response from Gemini" },
        { status: 502 }
      );
    }

    console.log("[VAAKYA API] Raw response (first 300 chars):", rawText.substring(0, 300));

    const parsed = parseGeminiJson(rawText);

    console.log("[VAAKYA API] ✅ Successfully parsed Gemini response");

    return NextResponse.json(parsed);
  } catch (error) {
    console.error("[VAAKYA API] Server error:", error);
    return NextResponse.json(
      { error: "Internal server error", message: String(error) },
      { status: 500 }
    );
  }
}
