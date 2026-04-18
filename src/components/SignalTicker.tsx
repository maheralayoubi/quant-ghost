"use client";

import { useEffect, useRef } from "react";
import { motion, useAnimationFrame } from "framer-motion";

const signals = [
  { symbol: "BTC", value: "$67,240", change: "+2.4%", up: true },
  { symbol: "ETH", value: "$3,512", change: "+1.8%", up: true },
  { symbol: "SOL", value: "$148.3", change: "-0.9%", up: false },
  { symbol: "AVAX", value: "$38.2", change: "+5.1%", up: true },
  { symbol: "ARB", value: "$1.14", change: "-1.3%", up: false },
  { symbol: "BNB", value: "$580", change: "+0.7%", up: true },
  { symbol: "LINK", value: "$17.5", change: "+3.2%", up: true },
  { symbol: "OP", value: "$2.48", change: "-2.1%", up: false },
  { symbol: "MATIC", value: "$0.87", change: "+1.1%", up: true },
  { symbol: "INJ", value: "$29.4", change: "+7.6%", up: true },
];

const tickerItems = [...signals, ...signals]; // duplicate for seamless loop

export default function SignalTicker() {
  const xRef = useRef(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const SPEED = 0.4;

  useAnimationFrame(() => {
    if (!containerRef.current) return;
    xRef.current -= SPEED;
    const totalWidth = containerRef.current.scrollWidth / 2;
    if (Math.abs(xRef.current) >= totalWidth) {
      xRef.current = 0;
    }
    containerRef.current.style.transform = `translateX(${xRef.current}px)`;
  });

  return (
    <div className="relative w-full overflow-hidden border-y border-border bg-background/60 backdrop-blur-sm py-3">
      {/* Fade edges */}
      <div className="absolute inset-y-0 left-0 w-24 bg-gradient-to-r from-background to-transparent z-10 pointer-events-none" />
      <div className="absolute inset-y-0 right-0 w-24 bg-gradient-to-l from-background to-transparent z-10 pointer-events-none" />

      <div ref={containerRef} className="flex items-center gap-8 w-max">
        {tickerItems.map((item, i) => (
          <div key={i} className="flex items-center gap-2 whitespace-nowrap px-2">
            <span className="text-xs font-mono font-bold text-muted-foreground">
              {item.symbol}
            </span>
            <span className="text-sm font-mono font-semibold text-foreground">
              {item.value}
            </span>
            <span
              className={`text-xs font-mono font-bold px-1.5 py-0.5 rounded ${
                item.up
                  ? "text-[oklch(0.75_0.2_142)] bg-[oklch(0.75_0.2_142/0.1)]"
                  : "text-[oklch(0.65_0.22_25)] bg-[oklch(0.65_0.22_25/0.1)]"
              }`}
            >
              {item.change}
            </span>
            <span className="text-border text-xs">•</span>
          </div>
        ))}
      </div>
    </div>
  );
}
