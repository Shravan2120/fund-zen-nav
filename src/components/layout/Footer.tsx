/* eslint-disable @typescript-eslint/no-unused-vars */
import { useMemo, useState } from "react";
import { ArrowRight, Calculator, ChartLine, IndianRupee, Menu, ShieldCheck, Star, TrendingUp, Wallet, X } from "lucide-react";
import { funds, formatINR, sipFutureValue, sipYearlySeries, type Fund } from "@/lib/funds";
import { NAV_LINKS } from "@/lib/nav";

export function Footer() {
  return (
    <footer className="border-t bg-navy">
      <div className="mx-auto max-w-6xl px-4 py-12">
        <div className="flex flex-col items-start justify-between gap-8 md:flex-row md:items-center">
          <div className="flex items-center gap-2">
            <span className="flex size-9 items-center justify-center rounded-xl bg-primary text-primary-foreground">
              <TrendingUp className="size-5" />
            </span>
            <span className="text-lg font-bold text-primary-foreground">
              MyFund<span className="text-chart-2">SIP</span>
            </span>
          </div>
          <nav className="flex flex-wrap gap-6">
            {NAV_LINKS.map((l) => (
              <a
                key={l.href}
                href={l.href}
                className="text-sm text-primary-foreground/70 transition-colors hover:text-primary-foreground"
              >
                {l.label}
              </a>
            ))}
          </nav>
        </div>
        <p className="mt-8 border-t border-primary-foreground/10 pt-6 text-xs leading-relaxed text-primary-foreground/50">
          Mutual fund investments are subject to market risks. Read all scheme-related documents
          carefully before investing. Past performance is not indicative of future returns. This
          website is for information and illustration only and is not investment advice.
        </p>
      </div>
    </footer>
  );
}
