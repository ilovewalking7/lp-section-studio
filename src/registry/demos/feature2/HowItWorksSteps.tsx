import { UserPlus, Settings, Send } from "lucide-react";
import type { DemoMeta } from "@/registry";

export const meta: DemoMeta = {
  name: "使い方3ステップ",
  category: "マーケティング",
  description:
    "番号付きの3ステップを横並びで紹介。点線コネクタが順に流れ、ホバーでカードが浮く。",
  align: "full",
  isNew: true,
  tags: ["feature", "bento", "animation"],
};

const STEPS = [
  {
    icon: UserPlus,
    no: "1",
    title: "アカウントを作る",
    titleEn: "Create an account",
    body: "メールアドレスだけで30秒。クレジットカードは不要です。",
    bodyEn: "Just 30 seconds with your email. No credit card required.",
  },
  {
    icon: Settings,
    no: "2",
    title: "好みに合わせる",
    titleEn: "Make it yours",
    body: "テンプレートを選び、ワークスペースを自分仕様に整えます。",
    bodyEn: "Pick a template and tailor your workspace to fit you.",
  },
  {
    icon: Send,
    no: "3",
    title: "公開して動かす",
    titleEn: "Publish and go live",
    body: "ワンクリックで公開。あとは成果が積み上がるのを待つだけ。",
    bodyEn: "Publish in one click, then watch the results add up.",
  },
];

export default function HowItWorksSteps() {
  const en =
    typeof document !== "undefined" &&
    document.documentElement.lang === "en";
  return (
    <section className="w-full px-6 py-16">
      <style>{`
        @keyframes hiw-dash { to { background-position: 24px 0; } }
      `}</style>
      <div className="mx-auto max-w-5xl">
        <div className="mb-12 text-center">
          <span className="text-xs font-semibold uppercase tracking-widest text-primary">
            {en ? "Three easy steps" : "かんたん3ステップ"}
          </span>
          <h2 className="mt-3 text-3xl font-semibold tracking-tight sm:text-4xl">
            {en ? "Getting started is this simple." : "はじめるのは、こんなに簡単。"}
          </h2>
        </div>

        <div className="relative grid gap-8 sm:grid-cols-3">
          {STEPS.map((s, i) => {
            const Icon = s.icon;
            return (
              <div key={s.no} className="relative">
                {i < STEPS.length - 1 && (
                  <div
                    aria-hidden
                    className="absolute left-[calc(50%+2.5rem)] top-7 hidden h-px w-[calc(100%-5rem)] sm:block"
                    style={{
                      backgroundImage:
                        "linear-gradient(to right, hsl(var(--border)) 50%, transparent 50%)",
                      backgroundSize: "12px 1px",
                      animation: "hiw-dash 1.2s linear infinite",
                    }}
                  />
                )}
                <div className="group relative rounded-2xl border bg-card p-6 text-center transition-all duration-300 hover:-translate-y-1.5 hover:shadow-lg">
                  <span className="relative mx-auto inline-flex size-14 items-center justify-center rounded-2xl bg-primary/10 text-primary transition-transform duration-300 group-hover:scale-110">
                    <Icon className="size-6" />
                    <span className="absolute -right-1 -top-1 inline-flex size-6 items-center justify-center rounded-full bg-primary text-xs font-bold text-primary-foreground">
                      {s.no}
                    </span>
                  </span>
                  <h3 className="mt-4 font-semibold tracking-tight">{en ? s.titleEn : s.title}</h3>
                  <p className="mt-2 text-sm text-muted-foreground">{en ? s.bodyEn : s.body}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
