import { ArrowRight, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import type { DemoMeta } from "@/registry";

export const meta: DemoMeta = {
  name: "社会的証明付きCTA",
  category: "マーケティング",
  description:
    "見出し・ボタンに、アバター列と星評価の社会的証明を添えた最終CTAセクション。",
  align: "full",
  isNew: true,
  level: "advanced",
  tags: ["marketing", "cta", "social-proof"],
  principle:
    "決断の直前にアバター列と高評価を見せることで『みんな使っている』という安心感を与え、行動の最後のひと押しにする。",
};

const AVATARS = [
  { initials: "AM", tone: "from-violet-500 to-indigo-500" },
  { initials: "RK", tone: "from-sky-500 to-cyan-500" },
  { initials: "佐", tone: "from-rose-500 to-orange-500" },
  { initials: "JD", tone: "from-emerald-500 to-teal-500" },
  { initials: "田", tone: "from-amber-500 to-orange-600" },
];

export default function CTAWithProof() {
  const en =
    typeof document !== "undefined" &&
    document.documentElement.lang === "en";
  return (
    <section className="w-full px-6 py-12">
      <div className="relative mx-auto max-w-4xl overflow-hidden rounded-3xl border bg-card px-6 py-16 text-center sm:px-12">
        <div
          aria-hidden
          className="pointer-events-none absolute left-1/2 top-0 size-80 -translate-x-1/2 rounded-full bg-primary/15 blur-3xl"
        />

        <div className="relative">
          <h2 className="mx-auto max-w-xl text-balance text-3xl font-semibold tracking-tight sm:text-4xl">
            {en
              ? "Start building results today."
              : "今日から、成果の出る仕組みを。"}
          </h2>
          <p className="mx-auto mt-4 max-w-md text-pretty text-muted-foreground">
            {en
              ? "14-day free trial. No credit card required, cancel anytime."
              : "14日間の無料トライアル。クレジットカードは不要、いつでも解約できます。"}
          </p>

          <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <Button size="lg" className="group h-11 px-7">
              {en ? "Start for free" : "無料で始める"}
              <ArrowRight className="transition-transform group-hover:translate-x-0.5" />
            </Button>
            <Button variant="outline" size="lg" className="h-11 px-7">
              {en ? "Book a demo" : "デモを予約する"}
            </Button>
          </div>

          <div className="mt-9 flex flex-col items-center justify-center gap-4 sm:flex-row sm:gap-5">
            <div className="flex -space-x-2.5">
              {AVATARS.map((a) => (
                <span
                  key={a.initials}
                  className={cn(
                    "flex size-9 items-center justify-center rounded-full bg-gradient-to-br text-xs font-semibold text-white ring-2 ring-card",
                    a.tone
                  )}
                >
                  {a.initials}
                </span>
              ))}
            </div>

            <div className="text-left">
              <div className="flex items-center gap-1">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star
                    key={i}
                    className="size-4 fill-amber-400 text-amber-400"
                  />
                ))}
                <span className="ml-1.5 text-sm font-semibold">4.9 / 5.0</span>
              </div>
              <p className="text-xs text-muted-foreground">
                {en ? "Based on 2,400+ reviews" : "2,400件以上のレビューに基づく"}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
