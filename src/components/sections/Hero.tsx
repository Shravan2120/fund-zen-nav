/* eslint-disable @typescript-eslint/no-unused-vars */
import { useMemo, useState } from "react";
import { ArrowRight, Calculator, ChartLine, IndianRupee, Menu, ShieldCheck, Star, TrendingUp, Wallet, X } from "lucide-react";
import { funds, formatINR, sipFutureValue, sipYearlySeries, type Fund } from "@/lib/funds";
import { NAV_LINKS } from "@/lib/nav";

export function Hero() {
  return (
    <section className="hero-grid-bg relative overflow-hidden">
      <div className="pointer-events-none absolute -top-32 right-0 size-[480px] rounded-full bg-primary/10 blur-3xl" />
      <div className="mx-auto grid max-w-6xl items-center gap-12 px-4 py-20 md:grid-cols-2 md:py-28">
        <div>
          <span className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-accent px-4 py-1.5 text-xs font-semibold text-accent-foreground">
            <ShieldCheck className="size-3.5" /> Trusted by 50,000+ Indian investors
          </span>
          <h1 className="mt-6 text-balance text-4xl font-extrabold leading-tight tracking-tight text-navy md:text-5xl lg:text-6xl">
            Grow your wealth, one <span className="text-primary">SIP</span> at a time
          </h1>
          <p className="mt-5 max-w-lg text-lg text-muted-foreground">
            Start investing in India's top-rated mutual funds with as little as ₹100 a month.
            Plan with our free SIP calculator and watch compounding work for you.
          </p>
          <div className="mt-8 flex flex-wrap gap-4">
            <a
              href="#calculator"
              className="inline-flex items-center gap-2 rounded-full bg-primary px-7 py-3.5 text-sm font-semibold text-primary-foreground shadow-xl shadow-primary/30 transition-transform hover:scale-[1.03]"
            >
              <Calculator className="size-4" /> Calculate your SIP
            </a>
            <a
              href="#funds"
              className="inline-flex items-center gap-2 rounded-full border border-primary/30 bg-card px-7 py-3.5 text-sm font-semibold text-primary transition-colors hover:bg-accent"
            >
              Explore funds
            </a>
          </div>
        </div>
        <HeroCard />
      </div>
    </section>
  );
}

function HeroCard() {
  const { fv } = sipFutureValue(10000, 12, 15);
  const series = sipYearlySeries(10000, 12, 15);
  const max = series[series.length - 1]!.value;
  const points = series
    .map((p, i) => `${(i / (series.length - 1)) * 100},${100 - (p.value / max) * 90}`)
    .join(" ");
  return (
    <div className="relative">
      <div className="rounded-3xl border bg-card p-6 shadow-2xl shadow-primary/10">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
              ₹10,000/month for 15 yrs @ 12%
            </p>
            <p className="mt-1 text-3xl font-extrabold text-navy">{formatINR(fv)}</p>
          </div>
          <span className="flex size-11 items-center justify-center rounded-2xl bg-accent text-primary">
            <ChartLine className="size-5" />
          </span>
        </div>
        <svg viewBox="0 0 100 100" preserveAspectRatio="none" className="mt-4 h-40 w-full">
          <defs>
            <linearGradient id="heroFill" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="var(--color-primary)" stopOpacity="0.35" />
              <stop offset="100%" stopColor="var(--color-primary)" stopOpacity="0" />
            </linearGradient>
          </defs>
          <polygon points={`0,100 ${points} 100,100`} fill="url(#heroFill)" />
          <polyline
            points={points}
            fill="none"
            stroke="var(--color-primary)"
            strokeWidth="2"
            vectorEffect="non-scaling-stroke"
          />
        </svg>
        <div className="mt-2 flex justify-between text-xs text-muted-foreground">
          <span>Year 1</span>
          <span>Year 15</span>
        </div>
      </div>
      <div className="absolute -bottom-5 -left-5 rounded-2xl border bg-card px-5 py-3 shadow-xl shadow-primary/10">
        <p className="text-xs text-muted-foreground">Invested</p>
        <p className="text-lg font-bold text-navy">₹18.00 L</p>
      </div>
      <div className="absolute -right-4 -top-5 rounded-2xl border bg-card px-5 py-3 shadow-xl shadow-primary/10">
        <p className="text-xs text-muted-foreground">Est. gains</p>
        <p className="text-lg font-bold text-gain">+{formatINR(fv - 1800000)}</p>
      </div>
    </div>
  );
}

export function StatsStrip() {
  const stats = [
    { value: "₹100", label: "Minimum SIP" },
    { value: "500+", label: "Funds to explore" },
    { value: "0%", label: "Commission on direct plans" },
    { value: "50K+", label: "Happy investors" },
  ];
  return (
    <section className="border-y bg-sky-soft">
      <div className="mx-auto grid max-w-6xl grid-cols-2 gap-6 px-4 py-10 md:grid-cols-4">
        {stats.map((s) => (
          <div key={s.label} className="text-center">
            <p className="text-3xl font-extrabold text-primary">{s.value}</p>
            <p className="mt-1 text-sm text-muted-foreground">{s.label}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
