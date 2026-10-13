import { useState } from "react";
import { Baby, Check, Coins, PiggyBank, Receipt, Rocket, TrendingUp, type LucideIcon } from "lucide-react";
import { SectionHeading } from "./SectionHeading";

const SERVICES: { name: string; icon: LucideIcon; points: string[] }[] = [
  { name: "Mutual Funds Investment", icon: TrendingUp, points: ["SIP & lump sum options", "Handpicked top-rated funds", "Regular portfolio reviews"] },
  { name: "Tax Saving Plan", icon: Receipt, points: ["ELSS funds under Section 80C", "Shortest 3-year lock-in", "Save tax while growing wealth"] },
  { name: "NFOs", icon: Rocket, points: ["Early access to new fund offers", "Research-backed recommendations", "Invest at launch price"] },
  { name: "Retirement Funds", icon: PiggyBank, points: ["Build a steady retirement corpus", "Plan monthly income for later", "Low-cost long-term growth"] },
  { name: "Child Plans", icon: Baby, points: ["Plan for education & milestones", "Goal-based SIPs", "Start small, grow with time"] },
  { name: "Gold Investment", icon: Coins, points: ["Invest through mutual funds", "No risk of theft", "Hedge against inflation"] },
];

export function ServicesSection() {
  const [active, setActive] = useState(0);
  const s = SERVICES[active]!;
  return (
    <section id="services" className="scroll-mt-20 border-y bg-sky-soft">
      <div className="mx-auto max-w-6xl px-4 py-20">
        <SectionHeading eyebrow="Services" title="Explore our products" />
        <div className="mt-12 grid gap-8 lg:grid-cols-[320px_1fr]">
          <div className="space-y-3">
            {SERVICES.map((item, i) => (
              <button
                key={item.name}
                onClick={() => setActive(i)}
                className={`flex w-full items-center gap-3 rounded-xl border px-4 py-3 text-left font-semibold transition-colors ${
                  i === active ? "border-primary bg-primary text-primary-foreground" : "bg-card text-navy hover:border-primary"
                }`}
              >
                <item.icon className="size-5" />
                {item.name}
              </button>
            ))}
          </div>
          <div className="grid items-center gap-8 rounded-3xl border bg-card p-8 shadow-sm md:grid-cols-2">
            <div className="flex aspect-square items-center justify-center rounded-3xl bg-accent">
              <s.icon className="size-28 text-primary" strokeWidth={1.25} />
            </div>
            <div>
              <h3 className="text-2xl font-extrabold text-navy">{s.name}</h3>
              <ul className="mt-6 space-y-4">
                {s.points.map((p) => (
                  <li key={p} className="flex items-center gap-3 text-muted-foreground">
                    <Check className="size-5 text-primary" /> {p}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
