"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { Button } from "@/components/ui/button";
import { ArrowRight, Zap, TrendingUp, Shield } from "lucide-react";

const floatingOrbs = [
  { size: 320, x: "10%", y: "20%", color: "oklch(0.62 0.28 290 / 0.15)", delay: 0 },
  { size: 240, x: "70%", y: "10%", color: "oklch(0.82 0.18 200 / 0.12)", delay: 0.5 },
  { size: 180, x: "85%", y: "60%", color: "oklch(0.62 0.28 290 / 0.1)", delay: 1 },
  { size: 200, x: "5%", y: "70%", color: "oklch(0.82 0.18 200 / 0.08)", delay: 1.5 },
];

const stats = [
  { label: "Data Sources", value: "2.4M+", icon: TrendingUp },
  { label: "Signals per Day", value: "180K", icon: Zap },
  { label: "Accuracy Rate", value: "94.7%", icon: Shield },
];

const stagger = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12 } },
};

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] },
  },
};

export default function HeroSection() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "25%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.7], [1, 0]);

  return (
    <section
      ref={ref}
      className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden grid-bg"
    >
      {/* Animated background orbs */}
      {floatingOrbs.map((orb, i) => (
        <motion.div
          key={i}
          className="absolute rounded-full blur-3xl pointer-events-none"
          style={{
            width: orb.size,
            height: orb.size,
            left: orb.x,
            top: orb.y,
            background: orb.color,
          }}
          animate={{
            scale: [1, 1.15, 1],
            opacity: [0.6, 1, 0.6],
          }}
          transition={{
            duration: 6 + i * 1.5,
            repeat: Infinity,
            delay: orb.delay,
            ease: "easeInOut",
          }}
        />
      ))}

      <motion.div
        style={{ y, opacity }}
        className="relative z-10 max-w-5xl mx-auto px-6 text-center"
      >
        <motion.div
          variants={stagger}
          initial="hidden"
          animate="visible"
          className="flex flex-col items-center"
        >
          {/* Badge */}
          <motion.div variants={fadeUp} className="mb-8">
            <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-primary/30 bg-primary/10 text-primary text-sm font-medium">
              <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
              AI Market Intelligence · Live Now
            </span>
          </motion.div>

          {/* Headline */}
          <motion.h1
            variants={fadeUp}
            className="text-5xl md:text-7xl lg:text-8xl font-bold tracking-tight leading-[1.05] mb-6"
          >
            <span className="text-foreground">The Market</span>
            <br />
            <span className="text-glow-violet bg-gradient-to-r from-primary via-[oklch(0.72_0.24_270)] to-accent bg-clip-text text-transparent">
              Sees Everything.
            </span>
            <br />
            <span className="text-foreground">Do You?</span>
          </motion.h1>

          {/* Sub */}
          <motion.p
            variants={fadeUp}
            className="text-lg md:text-xl text-muted-foreground max-w-2xl mb-10 leading-relaxed"
          >
            QuantGhost is an AI-powered market intelligence system that scans global news,
            on-chain data, and market signals in real time surfacing hidden patterns and
            actionable insights for smarter crypto decisions.
          </motion.p>

          {/* CTAs */}
          <motion.div variants={fadeUp} className="flex flex-col sm:flex-row items-center gap-4">
            <Button
              size="lg"
              className="bg-primary hover:bg-primary/90 text-primary-foreground glow-violet px-8 h-12 text-base hover:scale-105 transition-all duration-300 group"
            >
              <Zap className="w-4 h-4 mr-2 group-hover:animate-bounce" />
              Start Free Trial
              <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="border-border bg-transparent hover:bg-white/5 h-12 px-8 text-base text-muted-foreground hover:text-foreground transition-all duration-300"
            >
              Watch Demo
            </Button>
          </motion.div>

          {/* Stats */}
          <motion.div
            variants={fadeUp}
            className="mt-20 grid grid-cols-3 gap-8 max-w-lg w-full"
          >
            {stats.map((stat) => (
              <div key={stat.label} className="flex flex-col items-center gap-1">
                <stat.icon className="w-4 h-4 text-primary mb-1 opacity-70" />
                <span className="text-2xl md:text-3xl font-bold text-foreground">
                  {stat.value}
                </span>
                <span className="text-xs text-muted-foreground text-center">{stat.label}</span>
              </div>
            ))}
          </motion.div>
        </motion.div>
      </motion.div>

      {/* Bottom gradient merge */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-background to-transparent pointer-events-none" />
    </section>
  );
}
