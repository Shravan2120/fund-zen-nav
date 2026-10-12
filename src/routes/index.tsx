import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import {
  ArrowRight,
  Calculator,
  ChartLine,
  IndianRupee,
  Menu,
  ShieldCheck,
  Star,
  TrendingUp,
  Wallet,
  X,
} from "lucide-react";
import { funds, formatINR, sipFutureValue, sipYearlySeries, type Fund } from "@/lib/funds";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "MyFundSIP — Start Your SIP Journey in Mutual Funds" },
      {
        name: "description",
        content:
          "Plan your wealth with SIPs in top-rated Indian mutual funds. Use our free SIP calculator, explore fund performance, and start investing from ₹100/month.",
      },
      { property: "og:title", content: "MyFundSIP — Start Your SIP Journey in Mutual Funds" },
      {
        property: "og:description",
        content:
          "Plan your wealth with SIPs in top-rated Indian mutual funds. Free SIP calculator, fund explorer, and investing from ₹100/month.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "anonymous" },
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Sora:wght@600;700;800&display=swap",
      },
    ],
  }),
  component: HomePage,
});

const NAV_LINKS = [
  { label: "Funds", href: "#funds" },
  { label: "SIP Calculator", href: "#calculator" },
  { label: "Why SIP", href: "#why-sip" },
  { label: "FAQ", href: "#faq" },
];

function HomePage() {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main>
        <Hero />
        <StatsStrip />
        <FundsSection />
        <CalculatorSection />
        <WhySipSection />
        <FaqSection />
        <CtaSection />
      </main>
      <Footer />
    </div>
  );
}

function Header() {
  const [open, setOpen] = useState(false);
  return (
    <header className="sticky top-0 z-50 border-b bg-background/80 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4">
        <a href="#" className="flex items-center gap-2">
          <span className="flex size-9 items-center justify-center rounded-xl bg-primary text-primary-foreground">
            <TrendingUp className="size-5" />
          </span>
          <span className="text-lg font-bold tracking-tight text-navy">
            MyFund<span className="text-primary">SIP</span>
          </span>
        </a>
        <nav className="hidden items-center gap-8 md:flex">
          {NAV_LINKS.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
            >
              {l.label}
            </a>
          ))}
        </nav>
        <div className="hidden md:block">
          <a
            href="#calculator"
            className="inline-flex items-center gap-2 rounded-full bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground shadow-lg shadow-primary/25 transition-transform hover:scale-[1.03]"
          >
            Start a SIP <ArrowRight className="size-4" />
          </a>
        </div>
        <button
          className="md:hidden text-foreground"
          onClick={() => setOpen(!open)}
          aria-label="Toggle menu"
        >
          {open ? <X className="size-6" /> : <Menu className="size-6" />}
        </button>
      </div>
      {open && (
        <nav className="border-t bg-background px-4 py-4 md:hidden">
          {NAV_LINKS.map((l) => (
            <a
              key={l.href}
              href={l.href}
              onClick={() => setOpen(false)}
              className="block py-2 text-sm font-medium text-muted-foreground"
            >
              {l.label}
            </a>
          ))}
        </nav>
      )}
    </header>
  );
}

function Hero() {
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

function StatsStrip() {
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

function FundsSection() {
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

function CalculatorSection() {
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

function WhySipSection() {
  const items = [
    {
      icon: IndianRupee,
      title: "Start small",
      text: "Begin with just ₹100 a month. No lump sum needed — consistency beats timing.",
    },
    {
      icon: TrendingUp,
      title: "Power of compounding",
      text: "Your returns earn returns. The longer you stay invested, the faster wealth grows.",
    },
    {
      icon: ShieldCheck,
      title: "Rupee cost averaging",
      text: "Buy more units when markets dip and fewer when they rise — automatically.",
    },
    {
      icon: Wallet,
      title: "Disciplined investing",
      text: "Auto-debit every month builds a habit that FDs and gold simply can't match.",
    },
  ];
  return (
    <section id="why-sip" className="mx-auto max-w-6xl scroll-mt-20 px-4 py-20">
      <div className="mx-auto max-w-2xl text-center">
        <p className="text-sm font-semibold uppercase tracking-widest text-primary">Why SIP</p>
        <h2 className="mt-2 text-3xl font-extrabold tracking-tight text-navy md:text-4xl">
          The smartest habit for Indian investors
        </h2>
      </div>
      <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {items.map((item) => (
          <div
            key={item.title}
            className="rounded-2xl border bg-card p-6 text-center shadow-sm transition-all hover:-translate-y-1 hover:shadow-lg hover:shadow-primary/10"
          >
            <span className="mx-auto flex size-12 items-center justify-center rounded-2xl bg-accent text-primary">
              <item.icon className="size-6" />
            </span>
            <h3 className="mt-4 font-bold text-navy">{item.title}</h3>
            <p className="mt-2 text-sm text-muted-foreground">{item.text}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

const FAQS = [
  {
    q: "What is a SIP?",
    a: "A Systematic Investment Plan (SIP) lets you invest a fixed amount in a mutual fund at regular intervals — usually monthly — instead of a one-time lump sum.",
  },
  {
    q: "How much do I need to start?",
    a: "Many funds allow SIPs starting at just ₹100–₹500 per month. There's no upper limit — invest what fits your budget.",
  },
  {
    q: "Can I pause or stop my SIP?",
    a: "Yes. SIPs are completely flexible. You can pause, increase, decrease, or stop them anytime without penalty.",
  },
  {
    q: "Are SIP returns guaranteed?",
    a: "No. Mutual funds are market-linked and returns vary. Historically, diversified equity funds have delivered 10–14% annualized over long periods, but past performance doesn't guarantee future results.",
  },
  {
    q: "Is my money safe?",
    a: "Mutual funds in India are regulated by SEBI and your units are held in your name with the fund house or demat account, not with any app or advisor.",
  },
];

function FaqSection() {
  const [openIdx, setOpenIdx] = useState<number | null>(0);
  return (
    <section id="faq" className="scroll-mt-20 border-t bg-sky-soft">
      <div className="mx-auto max-w-3xl px-4 py-20">
        <div className="text-center">
          <p className="text-sm font-semibold uppercase tracking-widest text-primary">FAQ</p>
          <h2 className="mt-2 text-3xl font-extrabold tracking-tight text-navy md:text-4xl">
            Common questions, answered
          </h2>
        </div>
        <div className="mt-10 space-y-3">
          {FAQS.map((faq, i) => (
            <div key={faq.q} className="rounded-2xl border bg-card shadow-sm">
              <button
                className="flex w-full items-center justify-between px-6 py-4 text-left font-semibold text-navy"
                onClick={() => setOpenIdx(openIdx === i ? null : i)}
              >
                {faq.q}
                <span
                  className={`ml-4 text-primary transition-transform ${openIdx === i ? "rotate-45" : ""}`}
                >
                  +
                </span>
              </button>
              {openIdx === i && (
                <p className="px-6 pb-5 text-sm leading-relaxed text-muted-foreground">{faq.a}</p>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function CtaSection() {
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

function Footer() {
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
