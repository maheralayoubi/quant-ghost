"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  AlertTriangle,
  TrendingUp,
  TrendingDown,
  Zap,
  Activity,
  ShieldAlert,
  BrainCircuit,
  Loader2,
} from "lucide-react";
import type { FinalDecision } from "@/lib/ai/decision";

const typeConfig = {
  bullish: {
    label: "Bullish",
    icon: TrendingUp,
    color: "text-[oklch(0.75_0.2_142)]",
    bg: "bg-[oklch(0.75_0.2_142/0.1)]",
    border: "border-[oklch(0.75_0.2_142/0.25)]",
    bar: "bg-[oklch(0.75_0.2_142)]",
  },
  bearish: {
    label: "Bearish",
    icon: TrendingDown,
    color: "text-[oklch(0.65_0.22_25)]",
    bg: "bg-[oklch(0.65_0.22_25/0.1)]",
    border: "border-[oklch(0.65_0.22_25/0.25)]",
    bar: "bg-[oklch(0.65_0.22_25)]",
  },
  neutral: {
    label: "Neutral",
    icon: AlertTriangle,
    color: "text-[oklch(0.82_0.16_80)]",
    bg: "bg-[oklch(0.82_0.16_80/0.1)]",
    border: "border-[oklch(0.82_0.16_80/0.25)]",
    bar: "bg-[oklch(0.82_0.16_80)]",
  },
};

export default function SignalsSection() {
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [result, setResult] = useState<FinalDecision | null>(null);
  const [errorMsg, setErrorMsg] = useState("");

  const analyzeNow = async () => {
    try {
      setStatus("loading");
      setErrorMsg("");
      const res = await fetch("/api/analyze");
      const data = await res.json();
      
      if (!res.ok) {
        throw new Error(data.error || "Failed to analyze market");
      }
      
      setResult(data);
      setStatus("success");
    } catch (err: any) {
      setErrorMsg(err.message);
      setStatus("error");
    }
  };

  return (
    <section id="signals" className="py-32 px-6 relative">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[1px] bg-gradient-to-r from-transparent via-accent/40 to-transparent" />

      <div className="max-w-4xl mx-auto">
        {/* Header and Trigger */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <span className="text-sm text-accent font-medium tracking-widest uppercase mb-4 block">
            Real-Time Analysis
          </span>
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-5">
            AI Market{" "}
            <span className="bg-gradient-to-r from-accent to-primary bg-clip-text text-transparent">
              Verdict
            </span>
          </h2>
          <p className="text-muted-foreground text-lg max-w-xl mx-auto mb-8">
            Trigger a real-time sweep of top global news and market data.
            Our multi-agent pipeline compresses the noise into a single structured verdict.
          </p>

          <Button
            onClick={analyzeNow}
            disabled={status === "loading"}
            size="lg"
            className="bg-primary hover:bg-primary/90 text-primary-foreground glow-violet h-14 px-8 text-lg rounded-full"
          >
            {status === "loading" ? (
              <>
                <Loader2 className="w-5 h-5 mr-3 animate-spin" />
                Agents Analyzing Data...
              </>
            ) : (
              <>
                <BrainCircuit className="w-5 h-5 mr-3" />
                Analyze Last 24 Hours
              </>
            )}
          </Button>

          {status === "error" && (
            <p className="mt-4 text-sm text-[oklch(0.65_0.22_25)] bg-[oklch(0.65_0.22_25/0.1)] py-2 px-4 rounded-lg inline-block">
              {errorMsg}
            </p>
          )}
        </motion.div>

        {/* Results Container */}
        {status === "success" && result && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mt-12"
          >
            <Card className="bg-card/40 border-primary/20 shadow-2xl backdrop-blur-md overflow-hidden relative">
              <div
                className="absolute inset-0 opacity-20 pointer-events-none"
                style={{
                  background: `radial-gradient(circle at 50% -20%, var(--color-${result.sentiment === 'bullish' ? 'chart-3' : result.sentiment === 'bearish' ? 'chart-5' : 'chart-4'}), transparent 70%)`
                }}
              />
              
              <CardHeader className="border-b border-border/50 bg-background/50 pb-6">
                <CardTitle className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                  <div className="flex items-center gap-3">
                    <div className={`p-3 rounded-xl ${typeConfig[result.sentiment].bg} border ${typeConfig[result.sentiment].border}`}>
                      {(() => {
                        const Icon = typeConfig[result.sentiment].icon;
                        return <Icon className={`w-6 h-6 ${typeConfig[result.sentiment].color}`} />;
                      })()}
                    </div>
                    <div>
                      <span className="block text-sm text-muted-foreground font-medium mb-1">Market Sentiment</span>
                      <span className={`text-3xl font-bold ${typeConfig[result.sentiment].color}`}>
                        {typeConfig[result.sentiment].label}
                      </span>
                    </div>
                  </div>

                  <div className="flex gap-6">
                    <div className="text-right">
                      <span className="block text-sm text-muted-foreground font-medium mb-1">Risk Level</span>
                      <span className="flex items-center justify-end gap-1.5 text-lg font-bold text-foreground capitalize">
                        <ShieldAlert className="w-4 h-4 text-muted-foreground" />
                        {result.riskLevel}
                      </span>
                    </div>
                    <div className="text-right pl-6 border-l border-border">
                      <span className="block text-sm text-muted-foreground font-medium mb-1">AI Confidence</span>
                      <span className="flexItems-center justify-end gap-1.5 text-lg font-bold text-foreground">
                        <Activity className="w-4 h-4 text-accent" />
                        {result.confidence}%
                      </span>
                    </div>
                  </div>
                </CardTitle>
              </CardHeader>

              <CardContent className="pt-8">
                <h3 className="text-sm font-semibold text-primary uppercase tracking-wider mb-5 flex items-center gap-2">
                  <Zap className="w-4 h-4" /> Final Decision Reasoning
                </h3>
                <ul className="space-y-4">
                  {result.keyReasons.map((reason, i) => (
                    <motion.li
                      key={i}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.3 + (i * 0.1) }}
                      className="flex items-start gap-4 p-4 rounded-lg bg-background/40 border border-border/50"
                    >
                      <span className="flex-shrink-0 w-6 h-6 rounded-full bg-primary/20 text-primary flex items-center justify-center text-xs font-bold font-mono">
                        {i + 1}
                      </span>
                      <p className="text-muted-foreground text-sm leading-relaxed">
                        {reason}
                      </p>
                    </motion.li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          </motion.div>
        )}
      </div>
    </section>
  );
}
