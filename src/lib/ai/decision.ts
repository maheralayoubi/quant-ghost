import { generateObject } from "ai";
import { openai } from "@ai-sdk/openai";
import { z } from "zod";

export const DecisionSchema = z.object({
  sentiment: z.enum(["bullish", "bearish", "neutral"]),
  riskLevel: z.enum(["low", "medium", "high"]),
  confidence: z.number().min(0).max(100),
  keyReasons: z.array(z.string()).max(4),
});

export type FinalDecision = z.infer<typeof DecisionSchema>;

export async function makeFinalDecision(newsSummary: string, marketSummary: string): Promise<FinalDecision | null> {
  const prompt = `You are the lead AI strategist for a crypto hedge fund.

Based on the following two intelligence feeds, output a final structured market decision.

=== NEWS INTELLIGENCE ===
${newsSummary}

=== MARKET INTELLIGENCE ===
${marketSummary}

Instructions:
1. Determine overall market sentiment.
2. Evaluate immediate risk level based on market structure and global events.
3. Assign a realistic confidence score (rarely 100).
4. Provide up to 4 strong, specific bullet points explaining the reasoning. Do not be generic.`;

  try {
    const { object } = await generateObject({
      model: openai("gpt-4o"), // Stronger reasoning model for the final verdict
      schema: DecisionSchema,
      prompt,
    });
    
    return object;
  } catch (error) {
    console.error("Final decision failed", error);
    return null;
  }
}
