"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import {
  Newspaper,
  Activity,
  GitBranch,
  BrainCircuit,
  ShieldCheck,
  LineChart,
} from "lucide-react";

const features = [
  {
    icon: Newspaper,
    title: "Global News Intelligence",
    description:
      "Ingests and semantically analyzes millions of news articles per day across 50+ languages, extracting market-moving sentiment in milliseconds.",
    color: "text-[oklch(0.82_0.18_200)]",
    bg: "bg-[oklch(0.82_0.18_200/0.08)]",
    border: "border-[oklch(0.82_0.18_200/0.2)]",
  },
  {
    icon: Activity,
    title: "On-Chain Data Feeds",
    description:
      "Monitors whale wallets, exchange flows, DEX liquidity shifts, and smart contract interactions across 15+ blockchains in real time.",
    color: "text-primary",
    bg: "bg-primary/8",
    border: "border-primary/20",
  },
  {
    icon: BrainCircuit,
    title: "AI Pattern Recognition",
    description:
      "Transformer-based models trained on 10 years of crypto market history identify macro and micro patterns before they become obvious.",
    color: "text-[oklch(0.82_0.16_80)]",
    bg: "bg-[oklch(0.82_0.16_80/0.08)]",
    border: "border-[oklch(0.82_0.16_80/0.2)]",
  },
  {
    icon: LineChart,
    title: "Actionable Signal Alerts",
    description:
      "Receive scored, prioritized signals with full context — not noise. Every alert ships with confidence level, source attribution, and suggested action.",
    color: "text-[oklch(0.75_0.2_142)]",
    bg: "bg-[oklch(0.75_0.2_142/0.08)]",
    border: "border-[oklch(0.75_0.2_142/0.2)]",
  },
  {
    icon: GitBranch,
    title: "Correlation Engine",
    description:
      "Automatically surfaces hidden correlations between macroeconomic events, social sentiment spikes, and on-chain anomalies across assets.",
    color: "text-[oklch(0.82_0.18_200)]",
    bg: "bg-[oklch(0.82_0.18_200/0.08)]",
    border: "border-[oklch(0.82_0.18_200/0.2)]",
  },
  {
    icon: ShieldCheck,
    title: "Risk-First Architecture",
    description:
      "Every insight is stress-tested against historical drawdown scenarios. Know your edge — and its limits — before you act.",
    color: "text-primary",
    bg: "bg-primary/8",
    border: "border-primary/20",
  },
];

const containerVariants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.1 },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] },
  },
};

export default function FeaturesSection() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="features" className="py-32 px-6 relative">
      {/* Section glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[1px] bg-gradient-to-r from-transparent via-primary/50 to-transparent" />

      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-20"
        >
          <span className="text-sm text-primary font-medium tracking-widest uppercase mb-4 block">
            Intelligence Stack
          </span>
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-5">
            Every Signal. Every Source.{" "}
            <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
              One Platform.
            </span>
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            QuantGhost fuses disparate data streams into a unified intelligence layer — no
            dashboards to stitch together, no context to lose.
          </p>
        </motion.div>

        {/* Grid */}
        <motion.div
          ref={ref}
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5"
        >
          {features.map((feature) => (
            <motion.div key={feature.title} variants={cardVariants}>
              <Card
                className={`group relative bg-card/50 border-border hover:border-opacity-40 backdrop-blur-sm overflow-hidden transition-all duration-500 hover:-translate-y-1 hover:shadow-2xl cursor-default`}
              >
                {/* Hover glow */}
                <div
                  className={`absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500`}
                  style={{
                    background: `radial-gradient(ellipse 200px 100px at 50% 0%, oklch(0.62 0.28 290 / 0.06), transparent)`,
                  }}
                />
                <CardHeader>
                  <div
                    className={`w-10 h-10 rounded-xl ${feature.bg} border ${feature.border} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300`}
                  >
                    <feature.icon className={`w-5 h-5 ${feature.color}`} strokeWidth={1.5} />
                  </div>
                  <CardTitle className="text-base font-semibold text-foreground">
                    {feature.title}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-muted-foreground leading-relaxed text-sm">
                    {feature.description}
                  </CardDescription>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
