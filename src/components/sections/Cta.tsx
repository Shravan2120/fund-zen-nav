/* eslint-disable @typescript-eslint/no-unused-vars */
import { useMemo, useState } from "react";
import { ArrowRight, Calculator, ChartLine, IndianRupee, Menu, ShieldCheck, Star, TrendingUp, Wallet, X } from "lucide-react";
import { funds, formatINR, sipFutureValue, sipYearlySeries, type Fund } from "@/lib/funds";
import { NAV_LINKS } from "@/lib/nav";

export function CtaSection() {
  return (
    <section className="bg-primary">
      <div className="mx-auto max-w-6xl px-4 py-16 text-center">
        <h2 className="text-balance text-3xl font-extrabold text-primary-foreground md:text-4xl">
          The best day to start your SIP was yesterday. The next best is today.
        </h2>
        <p className="mx-auto mt-4 max-w-xl text-primary-foreground/80">
          Run the numbers with our calculator and take the first step towards your financial
          goals.
        </p>
        <a
          href="#calculator"
          className="mt-8 inline-flex items-center gap-2 rounded-full bg-card px-8 py-3.5 text-sm font-bold text-primary shadow-xl transition-transform hover:scale-[1.03]"
        >
          Plan my SIP <ArrowRight className="size-4" />
        </a>
      </div>
    </section>
  );
}
