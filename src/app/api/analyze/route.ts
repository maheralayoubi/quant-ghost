import { NextResponse } from "next/server";
import { getMarketData } from "@/lib/api/market";
import { getNewsData } from "@/lib/api/news";
import { analyzeMarketData } from "@/lib/ai/market-analyzer";
import { summarizeNews } from "@/lib/ai/summarizer";
import { makeFinalDecision, FinalDecision } from "@/lib/ai/decision";

// Super simple in-memory cache for MVP
// In production, MUST use Redis (Upstash) to prevent local server restarts from clearing this
let cachedResult: { timestamp: number; data: FinalDecision } | null = null;
const CACHE_DURATION_MS = 1000 * 60 * 60; // 1 hour

export async function GET() {
  if (!process.env.OPENAI_API_KEY) {
    return NextResponse.json(
      { error: "Missing OPENAI_API_KEY environment variable. Please add it to .env.local" },
      { status: 500 }
    );
  }

  // 1. Check local cache
  if (cachedResult && Date.now() - cachedResult.timestamp < CACHE_DURATION_MS) {
    console.log("Serving analysis from CACHE");
    return NextResponse.json({ ...cachedResult.data, fromCache: true });
  }

  try {
    console.log("Starting fresh analysis pipeline...");

    // 2. Fetch all raw data concurrently
    const [marketData, newsData] = await Promise.all([
      getMarketData(),
      getNewsData(),
    ]);

    // 3. Run individual agent summarization and compression concurrently
    const [marketSummary, newsSummary] = await Promise.all([
      analyzeMarketData(marketData),
      summarizeNews(newsData),
    ]);

    // 4. Feed compressed intelligence to the Final Decision Model
    const finalDecision = await makeFinalDecision(newsSummary, marketSummary);

    if (!finalDecision) {
      throw new Error("Final decision format was invalid or prompt failed.");
    }

    // 5. Update cache and return
    cachedResult = {
      timestamp: Date.now(),
      data: finalDecision,
    };

    return NextResponse.json({ ...finalDecision, fromCache: false });
  } catch (error) {
    console.error("Critical failure in Analyze API:", error);
    return NextResponse.json(
      { error: "Internal server error during analysis pipeline." },
      { status: 500 }
    );
  }
}
