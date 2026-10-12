/* eslint-disable @typescript-eslint/no-unused-vars */
import { useMemo, useState } from "react";
import { ArrowRight, Calculator, ChartLine, IndianRupee, Menu, ShieldCheck, Star, TrendingUp, Wallet, X } from "lucide-react";
import { funds, formatINR, sipFutureValue, sipYearlySeries, type Fund } from "@/lib/funds";
import { NAV_LINKS } from "@/lib/nav";

function Sparkline({ data }: { data: number[] }) {
  const min = Math.min(...data);
  const max = Math.max(...data);
  const range = max - min || 1;
  const points = data
    .map((v, i) => `${(i / (data.length - 1)) * 100},${30 - ((v - min) / range) * 26 - 2}`)
    .join(" ");
  return (
    <svg viewBox="0 0 100 30" preserveAspectRatio="none" className="h-8 w-24">
      <polyline
        points={points}
        fill="none"
        stroke="var(--color-gain)"
        strokeWidth="2"
        vectorEffect="non-scaling-stroke"
      />
    </svg>
  );
}

function riskClasses(risk: Fund["risk"]) {
  switch (risk) {
    case "Low":
      return "bg-accent text-accent-foreground";
    case "Moderate":
      return "bg-secondary text-secondary-foreground";
    case "High":
      return "bg-primary/10 text-primary";
  }
}

export function FundsSection() {
  return (
    <section id="funds" className="mx-auto max-w-6xl scroll-mt-20 px-4 py-20">
      <div className="max-w-2xl">
        <p className="text-sm font-semibold uppercase tracking-widest text-primary">
          Fund explorer
        </p>
        <h2 className="mt-2 text-3xl font-extrabold tracking-tight text-navy md:text-4xl">
          Top-rated funds for your SIP
        </h2>
        <p className="mt-3 text-muted-foreground">
          Hand-picked funds across categories. Past performance is illustrative and not a
          guarantee of future returns.
        </p>
      </div>
      <div className="mt-10 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
        {funds.map((fund) => (
          <article
            key={fund.name}
            className="group rounded-2xl border bg-card p-6 shadow-sm transition-all hover:-translate-y-1 hover:shadow-xl hover:shadow-primary/10"
          >
            <div className="flex items-start justify-between gap-3">
              <div>
                <span className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                  {fund.category}
                </span>
                <h3 className="mt-1 text-lg font-bold text-navy">{fund.name}</h3>
              </div>
              <span
                className={`rounded-full px-2.5 py-1 text-xs font-semibold ${riskClasses(fund.risk)}`}
              >
                {fund.risk} risk
              </span>
            </div>
            <div className="mt-3 flex items-center gap-1">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star
                  key={i}
                  className={`size-4 ${i < fund.rating ? "fill-primary text-primary" : "text-border"}`}
                />
              ))}
            </div>
            <div className="mt-4 flex items-end justify-between">
              <div>
                <p className="text-xs text-muted-foreground">NAV</p>
                <p className="font-bold text-navy">₹{fund.nav.toFixed(2)}</p>
              </div>
              <Sparkline data={fund.sparkline} />
            </div>
            <div className="mt-4 grid grid-cols-3 gap-2 rounded-xl bg-sky-soft p-3 text-center">
              {[
                { label: "1Y", value: fund.returns1y },
                { label: "3Y", value: fund.returns3y },
                { label: "5Y", value: fund.returns5y },
              ].map((r) => (
                <div key={r.label}>
                  <p className="text-xs text-muted-foreground">{r.label}</p>
                  <p className="text-sm font-bold text-gain">+{r.value}%</p>
                </div>
              ))}
            </div>
            <div className="mt-4 flex items-center justify-between">
              <p className="text-xs text-muted-foreground">
                Min SIP <span className="font-semibold text-foreground">₹{fund.minSip}</span>
              </p>
              <a
                href="#calculator"
                className="inline-flex items-center gap-1 text-sm font-semibold text-primary transition-transform group-hover:translate-x-0.5"
              >
                Start SIP <ArrowRight className="size-3.5" />
              </a>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
