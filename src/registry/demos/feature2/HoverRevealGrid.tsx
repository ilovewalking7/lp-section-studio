import { ArrowUpRight } from "lucide-react";
import type { DemoMeta } from "@/registry";

export const meta: DemoMeta = {
  name: "ホバー解説リビールグリッド",
  category: "マーケティング",
  description:
    "通常はタイトルのみ。ホバーで詳細テキストとボタンが下からせり出すギャラリー型グリッド。",
  align: "full",
  isNew: true,
  tags: ["feature", "bento", "animation"],
};

const ITEMS = [
  {
    no: "01",
    titleJa: "デザインシステム",
    titleEn: "Design system",
    bodyJa: "一貫したUIを保つトークンとコンポーネント群。",
    bodyEn: "Tokens and components that keep your UI consistent.",
    tone: "from-violet-600 to-indigo-600",
  },
  {
    no: "02",
    titleJa: "オートメーション",
    titleEn: "Automation",
    bodyJa: "繰り返し作業をワークフローに置き換える。",
    bodyEn: "Turn repetitive tasks into workflows.",
    tone: "from-rose-600 to-orange-500",
  },
  {
    no: "03",
    titleJa: "アナリティクス",
    titleEn: "Analytics",
    bodyJa: "意思決定を支えるリアルタイムの指標。",
    bodyEn: "Real-time metrics to back your decisions.",
    tone: "from-sky-600 to-cyan-500",
  },
  {
    no: "04",
    titleJa: "コラボレーション",
    titleEn: "Collaboration",
    bodyJa: "チームの会話とタスクを一箇所に集約。",
    bodyEn: "Bring team chat and tasks into one place.",
    tone: "from-emerald-600 to-teal-500",
  },
];

export default function HoverRevealGrid() {
  const en =
    typeof document !== "undefined" &&
    document.documentElement.lang === "en";
  return (
    <section className="w-full px-6 py-16">
      <div className="mx-auto max-w-5xl">
        <div className="mb-10">
          <h2 className="text-3xl font-semibold tracking-tight sm:text-4xl">
            {en ? "Hover to discover." : "触れて、知る。"}
          </h2>
          <p className="mt-3 max-w-md text-pretty text-muted-foreground">
            {en
              ? "Hover over a card to reveal the feature details."
              : "カードにカーソルを乗せると、機能の詳細が現れます。"}
          </p>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {ITEMS.map((it) => (
            <div
              key={it.no}
              className="group relative aspect-[3/4] cursor-pointer overflow-hidden rounded-2xl border"
            >
              <div
                aria-hidden
                className={`absolute inset-0 bg-gradient-to-br ${it.tone} opacity-90 transition-transform duration-500 group-hover:scale-105`}
              />
              <div
                aria-hidden
                className="absolute inset-0 bg-black/20 transition-opacity duration-500 group-hover:bg-black/40"
              />
              <div className="relative flex h-full flex-col justify-between p-5 text-white">
                <span className="text-sm font-mono opacity-80">{it.no}</span>
                <div>
                  <h3 className="text-lg font-semibold tracking-tight">
                    {en ? it.titleEn : it.titleJa}
                  </h3>
                  <div className="grid grid-rows-[0fr] opacity-0 transition-all duration-500 group-hover:grid-rows-[1fr] group-hover:opacity-100">
                    <div className="overflow-hidden">
                      <p className="pt-2 text-sm text-white/85">
                        {en ? it.bodyEn : it.bodyJa}
                      </p>
                    </div>
                  </div>
                  <span className="mt-3 inline-flex items-center gap-1 text-sm font-medium opacity-0 transition-all duration-500 group-hover:opacity-100">
                    {en ? "Learn more" : "詳しく"}
                    <ArrowUpRight className="size-4" />
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
