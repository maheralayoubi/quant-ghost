import { generateText } from "ai";
import { openai } from "@ai-sdk/openai";
import { NewsArticle } from "../api/news";

export async function summarizeNews(articles: NewsArticle[]) {
  if (!articles || articles.length === 0) return "No news available.";

  const feed = articles
    .map((a, i) => `[${i + 1}] Title: ${a.title}\nSource: ${a.source}\nSummary: ${a.description}`)
    .join("\n\n");

  const prompt = `You are an expert crypto intelligence agent.
Summarize the following recent news into:
1. Key global events affecting markets
2. Crypto-relevant signals and regulations
3. Clear Bullish or Bearish indicators

Ignore irrelevant topics. Keep it under 250 words and highly analytical.

NEWS FEED:
${feed}`;

  try {
    const { text } = await generateText({
      model: openai("gpt-4o-mini"),
      prompt,
    });
    return text;
  } catch (error) {
    console.error("News summarization failed", error);
    return "Error generating news summary.";
  }
}
