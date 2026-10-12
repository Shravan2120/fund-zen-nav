/* eslint-disable @typescript-eslint/no-unused-vars */
import { useMemo, useState } from "react";
import { ArrowRight, Calculator, ChartLine, IndianRupee, Menu, ShieldCheck, Star, TrendingUp, Wallet, X } from "lucide-react";
import { funds, formatINR, sipFutureValue, sipYearlySeries, type Fund } from "@/lib/funds";
import { NAV_LINKS } from "@/lib/nav";

function Slider({
  label,
  value,
  min,
  max,
  step,
  format,
  onChange,
}: {
  label: string;
  value: number;
  min: number;
  max: number;
  step: number;
  format: (v: number) => string;
  onChange: (v: number) => void;
}) {
  return (
    <div>
      <div className="flex items-center justify-between">
        <label className="text-sm font-medium text-foreground">{label}</label>
        <span className="rounded-lg bg-accent px-3 py-1 text-sm font-bold text-accent-foreground">
          {format(value)}
        </span>
      </div>
      <input
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        className="mt-3 w-full accent-[var(--color-primary)]"
      />
      <div className="mt-1 flex justify-between text-xs text-muted-foreground">
        <span>{format(min)}</span>
        <span>{format(max)}</span>
      </div>
    </div>
  );
}

export function CalculatorSection() {
  const [monthly, setMonthly] = useState(10000);
  const [rate, setRate] = useState(12);
  const [years, setYears] = useState(15);

  const { invested, fv, gains } = useMemo(
    () => sipFutureValue(monthly, rate, years),
    [monthly, rate, years],
  );
  const series = useMemo(() => sipYearlySeries(monthly, rate, years), [monthly, rate, years]);

  const maxVal = series[series.length - 1]!.value;
  const valuePoints = series
    .map((p, i) => `${(i / (series.length - 1)) * 100},${100 - (p.value / maxVal) * 88 - 4}`)
    .join(" ");
  const investedPoints = series
    .map((p, i) => `${(i / (series.length - 1)) * 100},${100 - (p.invested / maxVal) * 88 - 4}`)
    .join(" ");
  const investedPct = (invested / fv) * 100;

  return (
    <section id="calculator" className="scroll-mt-20 border-y bg-sky-soft">
      <div className="mx-auto max-w-6xl px-4 py-20">
        <div className="max-w-2xl">
          <p className="text-sm font-semibold uppercase tracking-widest text-primary">
            SIP calculator
          </p>
          <h2 className="mt-2 text-3xl font-extrabold tracking-tight text-navy md:text-4xl">
            See what your SIP could become
          </h2>
          <p className="mt-3 text-muted-foreground">
            Adjust the sliders to estimate your wealth. Assumes monthly compounding at a fixed
            annual return.
          </p>
        </div>
        <div className="mt-10 grid gap-8 lg:grid-cols-2">
          <div className="rounded-3xl border bg-card p-8 shadow-xl shadow-primary/5">
            <div className="space-y-8">
              <Slider
                label="Monthly investment"
                value={monthly}
                min={500}
                max={100000}
                step={500}
                format={(v) => `₹${v.toLocaleString("en-IN")}`}
                onChange={setMonthly}
              />
              <Slider
                label="Expected annual return"
                value={rate}
                min={4}
                max={20}
                step={0.5}
                format={(v) => `${v}%`}
                onChange={setRate}
              />
              <Slider
                label="Time period"
                value={years}
                min={1}
                max={30}
                step={1}
                format={(v) => `${v} yrs`}
                onChange={setYears}
              />
            </div>
            <div className="mt-8">
              <div className="flex h-4 overflow-hidden rounded-full">
                <div className="bg-primary" style={{ width: `${investedPct}%` }} />
                <div className="bg-gain" style={{ width: `${100 - investedPct}%` }} />
              </div>
              <div className="mt-3 flex flex-wrap gap-6 text-sm">
                <span className="flex items-center gap-2">
                  <span className="size-3 rounded-full bg-primary" /> Invested
                </span>
                <span className="flex items-center gap-2">
                  <span className="size-3 rounded-full bg-gain" /> Est. gains
                </span>
              </div>
            </div>
          </div>
          <div className="rounded-3xl border bg-card p-8 shadow-xl shadow-primary/5">
            <div className="grid grid-cols-3 gap-4 text-center">
              <div className="rounded-2xl bg-sky-soft p-4">
                <p className="text-xs text-muted-foreground">Invested</p>
                <p className="mt-1 text-lg font-extrabold text-navy">{formatINR(invested)}</p>
              </div>
              <div className="rounded-2xl bg-sky-soft p-4">
                <p className="text-xs text-muted-foreground">Est. gains</p>
                <p className="mt-1 text-lg font-extrabold text-gain">+{formatINR(gains)}</p>
              </div>
              <div className="rounded-2xl bg-primary p-4">
                <p className="text-xs text-primary-foreground/80">Total value</p>
                <p className="mt-1 text-lg font-extrabold text-primary-foreground">
                  {formatINR(fv)}
                </p>
              </div>
            </div>
            <svg viewBox="0 0 100 100" preserveAspectRatio="none" className="mt-6 h-56 w-full">
              <defs>
                <linearGradient id="calcFill" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="var(--color-gain)" stopOpacity="0.3" />
                  <stop offset="100%" stopColor="var(--color-gain)" stopOpacity="0" />
                </linearGradient>
              </defs>
              <polygon points={`0,100 ${valuePoints} 100,100`} fill="url(#calcFill)" />
              <polyline
                points={investedPoints}
                fill="none"
                stroke="var(--color-primary)"
                strokeWidth="2"
                strokeDasharray="4 3"
                vectorEffect="non-scaling-stroke"
              />
              <polyline
                points={valuePoints}
                fill="none"
                stroke="var(--color-gain)"
                strokeWidth="2.5"
                vectorEffect="non-scaling-stroke"
              />
            </svg>
            <div className="mt-2 flex justify-between text-xs text-muted-foreground">
              <span>Year 1</span>
              <span>Year {years}</span>
            </div>
            <p className="mt-4 text-center text-xs text-muted-foreground">
              Illustration only. Mutual fund investments are subject to market risks.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
