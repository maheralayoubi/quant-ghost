"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Ghost, X, GitFork, ArrowRight } from "lucide-react";

export default function Footer() {
  return (
    <footer className="relative border-t border-border/50 pt-20 pb-10 px-6">
      {/* CTA band */}
      <div className="max-w-5xl mx-auto mb-20">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="relative rounded-2xl overflow-hidden border border-primary/20 glow-violet bg-gradient-to-br from-primary/10 via-card to-card p-12 text-center"
        >
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_400px_300px_at_50%_-50%,oklch(0.62_0.28_290/0.15),transparent)] pointer-events-none" />
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4 relative">
            Ready to see what the market{" "}
            <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
              already knows?
            </span>
          </h2>
          <p className="text-muted-foreground mb-8 max-w-lg mx-auto relative">
            Join 4,200+ traders and analysts using QuantGhost to stay ahead of the signal curve.
          </p>
          <Button
            size="lg"
            className="bg-primary hover:bg-primary/90 text-primary-foreground glow-violet px-10 h-12 text-base hover:scale-105 transition-all duration-300 group relative"
          >
            Get Early Access — Free
            <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
          </Button>
        </motion.div>
      </div>

      {/* Footer links */}
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="flex items-center gap-2">
          <Ghost className="w-5 h-5 text-primary" strokeWidth={1.5} />
          <span className="font-semibold text-sm">
            Quant<span className="text-primary">Ghost</span>
          </span>
          <span className="text-muted-foreground text-xs ml-2">© 2025</span>
        </div>
        <div className="flex items-center gap-6 text-xs text-muted-foreground">
          <a href="#" className="hover:text-foreground transition-colors">Privacy</a>
          <a href="#" className="hover:text-foreground transition-colors">Terms</a>
          <a href="#" className="hover:text-foreground transition-colors">Docs</a>
          <a href="#" className="hover:text-foreground transition-colors">Blog</a>
        </div>
        <div className="flex items-center gap-3">
          <Button variant="ghost" size="icon" className="w-8 h-8 text-muted-foreground hover:text-foreground">
            <X className="w-4 h-4" />
          </Button>
          <Button variant="ghost" size="icon" className="w-8 h-8 text-muted-foreground hover:text-foreground">
            <GitFork className="w-4 h-4" />
          </Button>
        </div>
      </div>
    </footer>
  );
}
