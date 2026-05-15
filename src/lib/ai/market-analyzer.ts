import { generateText } from "ai";
import { openai } from "@ai-sdk/openai";
import { MarketData } from "../api/market";

export async function analyzeMarketData(data: MarketData[]) {
  if (!data || data.length === 0) return "No market data available.";

  const feed = data
    .map((d) => `- ${d.symbol}: $${d.priceUsd} (24h Change: ${d.change24h.toFixed(2)}%)`)
    .join("\n");

  const prompt = `You are a quantitative crypto analyst.
Analyze this current top-asset market data snapshot:

${feed}

Tasks:
1. Identify the current macro trend (bullish, bearish, or neutral).
2. Detect any unusual volatility or divergence (e.g., BTC up but ETH down).
3. Conclude with a single sentence summarizing market risk.

Keep it concise, under 150 words.`;

  try {
    const { text } = await generateText({
      model: openai("gpt-4o-mini"),
      prompt,
    });
    return text;
  } catch (error) {
    console.error("Market analysis failed", error);
    return "Error generating market analysis.";
  }
}
