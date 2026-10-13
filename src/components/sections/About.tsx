import { useState } from "react";
import { UserRound, Users } from "lucide-react";
import { SectionHeading } from "./SectionHeading";

const TABS = {
  Story:
    "We started MyFundSIP to help more families take a simple, disciplined approach to building wealth through mutual funds.",
  Mission:
    "To make investing easy to understand and accessible to everyone, with honest guidance at every step.",
  Vision:
    "Simplify investing, empower financial freedom. We educate, guide and support individuals in achieving their financial goals through our platform and expert guidance.",
} as const;
type Tab = keyof typeof TABS;

export function AboutSection() {
  const [tab, setTab] = useState<Tab>("Story");
  return (
    <section id="about" className="mx-auto max-w-6xl scroll-mt-20 px-4 py-20">
      <SectionHeading eyebrow="About Us" title="Your partner in mutual fund investing" />
      <div className="mt-12 grid items-stretch gap-10 lg:grid-cols-2">
        {/* Founder photo placeholder — replace with the real photo */}
        <div className="flex min-h-80 flex-col items-center justify-center rounded-3xl border bg-sky-soft text-primary">
          <span className="flex size-32 items-center justify-center rounded-full bg-accent">
            <UserRound className="size-16" />
          </span>
          <p className="mt-4 text-sm font-medium text-muted-foreground">Founder photo</p>
        </div>
        <div className="flex flex-col gap-6">
          <p className="leading-relaxed text-muted-foreground">
            MyFundSIP provides personalised guidance and the best features available in mutual
            funds. We help you take a better approach towards your financial goals, and we're on a
            journey to bring more people closer to financial freedom.
          </p>
          <p className="text-right text-sm text-muted-foreground">
            Our Founder — <span className="font-bold text-navy">Founder Name</span>
          </p>
          <div className="rounded-2xl border bg-card shadow-sm">
            <div className="flex gap-1 border-b p-2">
              {(Object.keys(TABS) as Tab[]).map((t) => (
                <button
                  key={t}
                  onClick={() => setTab(t)}
                  className={`rounded-full px-4 py-2 text-sm font-semibold transition-colors ${
                    tab === t ? "bg-primary text-primary-foreground" : "text-primary hover:bg-accent"
                  }`}
                >
                  {t}
                </button>
              ))}
            </div>
            <p className="p-5 text-sm leading-relaxed text-muted-foreground">{TABS[tab]}</p>
          </div>
          <div className="flex gap-4 rounded-2xl border bg-card p-5 shadow-sm">
            <span className="flex size-12 shrink-0 items-center justify-center rounded-full bg-primary text-primary-foreground">
              <Users className="size-6" />
            </span>
            <div>
              <h3 className="font-bold text-navy">Dedicated Team</h3>
              <p className="mt-1 text-sm leading-relaxed text-muted-foreground">
                Our team is committed to exceptional service and support, making sure your needs
                are met with professionalism and care at every step.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
