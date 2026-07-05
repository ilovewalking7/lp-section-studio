import { useEffect, useRef, useState } from "react";
import { Rocket, Settings, UserPlus } from "lucide-react";
import { cn } from "@/lib/utils";
import type { DemoMeta } from "@/registry";

export const meta: DemoMeta = {
  name: "アニメ・手順ステップ",
  category: "マーケティング",
  description: "接続線が描かれていく「使い方」3ステップ。ビューインで順番に出現。",
  align: "full",
  isNew: true,
  tags: ["marketing", "animation", "section"],
};

const STEPS = [
  {
    icon: <UserPlus className="h-6 w-6" />,
    titleJa: "アカウント作成",
    titleEn: "Create an account",
    bodyJa: "メールアドレスだけで30秒で開始。カード登録は不要です。",
    bodyEn: "Start in 30 seconds with just an email. No card required.",
  },
  {
    icon: <Settings className="h-6 w-6" />,
    titleJa: "ワークスペース設定",
    titleEn: "Set up your workspace",
    bodyJa: "テンプレートから選ぶか、ゼロから自由に構築できます。",
    bodyEn: "Pick a template, or build freely from scratch.",
  },
  {
    icon: <Rocket className="h-6 w-6" />,
    titleJa: "公開・運用",
    titleEn: "Publish and run",
    bodyJa: "ワンクリックで公開。リアルタイムに改善を続けましょう。",
    bodyEn: "Publish in one click. Keep improving in real time.",
  },
];

export default function ProcessSteps() {
  const en =
    typeof document !== "undefined" &&
    document.documentElement.lang === "en";
  const ref = useRef<HTMLDivElement>(null);
  const [shown, setShown] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      (entries) => {
        if (entries.some((e) => e.isIntersecting)) {
          setShown(true);
          io.disconnect();
        }
      },
      { threshold: 0.4 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <section className="w-full bg-neutral-950 px-4 py-20 text-white sm:px-8">
      <div ref={ref} className="mx-auto max-w-5xl">
        <div className="mb-14 text-center">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
            {en ? "Get started in 3 steps" : "3ステップで始める"}
          </h2>
          <p className="mt-3 text-sm text-white/60">
            {en ? "No complicated setup at all." : "難しい設定は一切ありません。"}
          </p>
        </div>

        <div className="relative grid grid-cols-1 gap-12 sm:grid-cols-3 sm:gap-6">
          {/* drawing connector line (desktop) */}
          <div className="pointer-events-none absolute left-0 right-0 top-7 hidden h-px sm:block">
            <div className="mx-auto h-px max-w-[66%] overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-indigo-500 via-fuchsia-500 to-emerald-500 transition-transform duration-[1400ms] ease-out"
                style={{
                  transformOrigin: "left",
                  transform: shown ? "scaleX(1)" : "scaleX(0)",
                }}
              />
            </div>
          </div>

          {STEPS.map((s, i) => (
            <div
              key={s.titleJa}
              className={cn(
                "relative text-center transition-all duration-700 ease-out",
                shown ? "translate-y-0 opacity-100" : "translate-y-6 opacity-0",
              )}
              style={{ transitionDelay: `${i * 220}ms` }}
            >
              <div className="relative z-10 mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-neutral-950 text-indigo-300 ring-1 ring-white/15">
                {s.icon}
                <span className="absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full bg-indigo-500 text-[11px] font-bold text-white">
                  {i + 1}
                </span>
              </div>
              <h3 className="mt-5 text-lg font-semibold">
                {en ? s.titleEn : s.titleJa}
              </h3>
              <p className="mx-auto mt-2 max-w-xs text-sm leading-relaxed text-white/60">
                {en ? s.bodyEn : s.bodyJa}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
