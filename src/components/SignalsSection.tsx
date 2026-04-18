"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Card, CardContent } from "@/components/ui/card";
import {
  AlertTriangle,
  TrendingUp,
  TrendingDown,
  Zap,
  ExternalLink,
  Clock,
  BarChart2,
} from "lucide-react";

type Signal = {
  id: number;
  asset: string;
  type: "bullish" | "bearish" | "neutral";
  title: string;
  summary: string;
  confidence: number;
  timeAgo: string;
  sources: string[];
  detail: string;
};

const liveSignals: Signal[] = [
  {
    id: 1,
    asset: "BTC",
    type: "bullish",
    title: "Whale accumulation cluster detected",
    summary: "Three wallets holding 22K+ BTC each executed coordinated buy orders within a 4-hour window.",
    confidence: 88,
    timeAgo: "3m ago",
    sources: ["Glassnode", "Nansen", "Arkham"],
    detail:
      "On-chain data reveals a significant accumulation pattern: three dormant wallets (inactive for 180+ days) simultaneously transferred a combined 66,200 BTC from cold storage to exchange hot wallets before executing buy orders at the $66,800–$67,400 range. Historical analysis of similar events shows a mean 12.4% price appreciation over the following 14 days.",
  },
  {
    id: 2,
    asset: "ETH",
    type: "bullish",
    title: "ETF inflow surge — 3rd consecutive day",
    summary: "Spot ETH ETF products recorded $420M net inflow today, the highest single-day figure in Q2.",
    confidence: 82,
    timeAgo: "11m ago",
    sources: ["Bloomberg", "SoSoValue", "Reuters"],
    detail:
      "Three major ETH spot ETF products — BlackRock ETHA, Fidelity FETH, and Bitwise ETHW — collectively recorded $420M in net inflows today. This marks the third consecutive positive day and the highest single-day inflow since launch. Institutional demand at this level has historically preceded 8–15% rallies within 7 days based on BTC ETF precedent.",
  },
  {
    id: 3,
    asset: "SOL",
    type: "bearish",
    title: "Validator concentration risk flagged",
    summary: "Top 5 validators now control 43.1% of stake weight — approaching critical centralization threshold.",
    confidence: 74,
    timeAgo: "28m ago",
    sources: ["Solana Beach", "Validators.app"],
    detail:
      "Network health metrics indicate growing validator concentration on the Solana network. The top 5 validators now control 43.1% of total stake weight, up from 38.2% 30 days ago. While not immediately threatening, this trend historically correlates with reduced network confidence and can dampen institutional appetite. Our model assigns a 74% probability of negative price impact within 30 days if trend continues.",
  },
  {
    id: 4,
    asset: "ARB",
    type: "neutral",
    title: "STIP round 2 governance vote live",
    summary: "Community vote on $70M STIP 2.0 allocation opened — outcome shapes ecosystem incentives for Q3.",
    confidence: 61,
    timeAgo: "1h ago",
    sources: ["Arbitrum DAO", "Tally"],
    detail:
      "The Arbitrum DAO has opened voting on the Short-Term Incentive Program (STIP) 2.0, which proposes allocating 70M ARB in liquidity incentives to DeFi protocols. Leading proposals include Uniswap v4 integration grants and GMX v2 trading fee subsidies. Historically, STIP announcements create short-term volatility with mixed directional bias — confidence level is moderate at 61%.",
  },
];

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
  const [selected, setSelected] = useState<Signal | null>(null);

  return (
    <section id="signals" className="py-32 px-6 relative">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[1px] bg-gradient-to-r from-transparent via-accent/40 to-transparent" />

      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="text-sm text-accent font-medium tracking-widest uppercase mb-4 block">
            Live Signal Feed
          </span>
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-5">
            Intelligence,{" "}
            <span className="bg-gradient-to-r from-accent to-primary bg-clip-text text-transparent">
              Delivered Live
            </span>
          </h2>
          <p className="text-muted-foreground text-lg max-w-xl mx-auto">
            Every signal comes with source attribution, confidence scoring, and full reasoning — click any alert to see the full analysis.
          </p>
        </motion.div>

        {/* Signal cards */}
        <div className="flex flex-col gap-4">
          {liveSignals.map((signal, i) => {
            const cfg = typeConfig[signal.type];
            const Icon = cfg.icon;

            return (
              <motion.div
                key={signal.id}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.08 }}
              >
                <Card
                  className={`group bg-card/60 border-border hover:border-opacity-50 backdrop-blur-sm cursor-pointer transition-all duration-300 hover:-translate-y-0.5 hover:shadow-xl`}
                  onClick={() => setSelected(signal)}
                >
                  <CardContent className="p-5">
                    <div className="flex items-start gap-4">
                      {/* Icon */}
                      <div
                        className={`w-9 h-9 rounded-xl ${cfg.bg} border ${cfg.border} flex items-center justify-center shrink-0`}
                      >
                        <Icon className={`w-4 h-4 ${cfg.color}`} strokeWidth={2} />
                      </div>

                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-3 flex-wrap mb-1.5">
                          <span
                            className={`text-xs font-bold font-mono px-2 py-0.5 rounded-md ${cfg.bg} ${cfg.color} border ${cfg.border}`}
                          >
                            {signal.asset}
                          </span>
                          <span
                            className={`text-xs font-medium ${cfg.color}`}
                          >
                            {cfg.label}
                          </span>
                          <span className="flex items-center gap-1 text-xs text-muted-foreground ml-auto">
                            <Clock className="w-3 h-3" />
                            {signal.timeAgo}
                          </span>
                        </div>

                        <p className="text-sm font-semibold text-foreground mb-1">
                          {signal.title}
                        </p>
                        <p className="text-xs text-muted-foreground leading-relaxed line-clamp-2">
                          {signal.summary}
                        </p>

                        {/* Confidence bar */}
                        <div className="mt-3 flex items-center gap-3">
                          <div className="flex-1 h-1 bg-muted rounded-full overflow-hidden">
                            <motion.div
                              className={`h-full rounded-full ${cfg.bar}`}
                              initial={{ width: 0 }}
                              whileInView={{ width: `${signal.confidence}%` }}
                              viewport={{ once: true }}
                              transition={{ duration: 0.8, delay: 0.2 }}
                            />
                          </div>
                          <span className="text-xs font-mono text-muted-foreground shrink-0">
                            {signal.confidence}% confidence
                          </span>
                          <ExternalLink className="w-3.5 h-3.5 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity shrink-0" />
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            );
          })}
        </div>

        {/* View All */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="mt-10 text-center"
        >
          <Button
            variant="outline"
            size="lg"
            className="border-border hover:bg-white/5 text-muted-foreground hover:text-foreground"
          >
            <BarChart2 className="w-4 h-4 mr-2" />
            View All Signals
          </Button>
        </motion.div>
      </div>

      {/* Signal detail dialog */}
      <AnimatePresence>
        {selected && (
          <Dialog open onOpenChange={() => setSelected(null)}>
            <DialogContent className="bg-card border-border max-w-lg">
              <DialogHeader>
                <div className="flex items-center gap-3 mb-2">
                  {(() => {
                    const cfg = typeConfig[selected.type];
                    const Icon = cfg.icon;
                    return (
                      <>
                        <div className={`w-8 h-8 rounded-lg ${cfg.bg} border ${cfg.border} flex items-center justify-center`}>
                          <Icon className={`w-4 h-4 ${cfg.color}`} strokeWidth={2} />
                        </div>
                        <span className={`text-xs font-bold font-mono px-2 py-0.5 rounded ${cfg.bg} ${cfg.color} border ${cfg.border}`}>
                          {selected.asset}
                        </span>
                        <span className={`text-xs font-medium ${cfg.color}`}>{typeConfig[selected.type].label}</span>
                        <span className="text-xs text-muted-foreground ml-auto flex items-center gap-1">
                          <Clock className="w-3 h-3" />
                          {selected.timeAgo}
                        </span>
                      </>
                    );
                  })()}
                </div>
                <DialogTitle className="text-base font-semibold text-foreground">
                  {selected.title}
                </DialogTitle>
                <DialogDescription className="text-muted-foreground text-sm leading-relaxed">
                  {selected.detail}
                </DialogDescription>
              </DialogHeader>
              <div className="mt-4">
                <p className="text-xs text-muted-foreground uppercase tracking-wider mb-2 font-medium">
                  Sources
                </p>
                <div className="flex flex-wrap gap-2">
                  {selected.sources.map((s) => (
                    <span
                      key={s}
                      className="text-xs bg-muted text-muted-foreground px-2.5 py-1 rounded-md border border-border"
                    >
                      {s}
                    </span>
                  ))}
                </div>
                <div className="mt-5 flex items-center gap-3">
                  <div className="flex-1 h-1.5 bg-muted rounded-full overflow-hidden">
                    <div
                      className={`h-full rounded-full ${typeConfig[selected.type].bar}`}
                      style={{ width: `${selected.confidence}%` }}
                    />
                  </div>
                  <span className="text-sm font-mono font-bold text-foreground">
                    {selected.confidence}%
                  </span>
                  <span className="text-xs text-muted-foreground">confidence</span>
                </div>
              </div>
              <div className="mt-5">
                <Button className="w-full bg-primary hover:bg-primary/90 text-primary-foreground glow-violet">
                  <Zap className="w-4 h-4 mr-2" />
                  Act on This Signal
                </Button>
              </div>
            </DialogContent>
          </Dialog>
        )}
      </AnimatePresence>
    </section>
  );
}
