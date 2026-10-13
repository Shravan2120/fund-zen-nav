import { useState, type FormEvent } from "react";
import { CheckCircle2 } from "lucide-react";
import { SectionHeading } from "./SectionHeading";

const input =
  "w-full rounded-xl border bg-background px-4 py-3 text-sm text-foreground outline-none focus:border-primary focus:ring-2 focus:ring-primary/20";

export function ContactSection() {
  const [sent, setSent] = useState(false);
  const onSubmit = (e: FormEvent) => {
    e.preventDefault();
    setSent(true);
  };
  return (
    <section id="contact" className="relative scroll-mt-20">
      <div className="absolute inset-x-0 top-0 h-72 bg-primary [background-image:radial-gradient(circle,rgb(255_255_255/0.15)_2px,transparent_2px)] [background-size:28px_28px]" />
      <div className="relative mx-auto max-w-3xl px-4 py-20">
        <div className="rounded-3xl border bg-card p-8 shadow-xl md:p-12">
          <SectionHeading eyebrow="Contact" title="Request a call-back" />
          {sent ? (
            <div className="mt-10 flex flex-col items-center text-center">
              <CheckCircle2 className="size-12 text-primary" />
              <p className="mt-4 font-semibold text-navy">Thanks! We'll call you back shortly.</p>
            </div>
          ) : (
            <form onSubmit={onSubmit} className="mt-10 grid gap-4 sm:grid-cols-2">
              <input required placeholder="Your Name *" className={input} />
              <input required type="email" placeholder="Your Email *" className={input} />
              <input required type="tel" pattern="[0-9+ ]{10,14}" placeholder="Your Mobile *" className={input} />
              <input required placeholder="Subject *" className={input} />
              <textarea required rows={4} placeholder="Message *" className={`${input} sm:col-span-2`} />
              <button className="rounded-xl bg-primary py-3.5 text-sm font-semibold text-primary-foreground shadow-lg shadow-primary/25 transition-transform hover:scale-[1.01] sm:col-span-2">
                Submit Now
              </button>
            </form>
          )}
        </div>
      </div>
    </section>
  );
}
