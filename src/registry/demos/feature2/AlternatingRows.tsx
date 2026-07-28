import { useEffect, useRef, useState } from "react";
import { Inbox, CalendarClock, Sparkles, ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";
import type { DemoMeta } from "@/registry";

export const meta: DemoMeta = {
  name: "交互レイアウトの特徴",
  category: "マーケティング",
  description:
    "テキストとビジュアルが左右交互に並び、ビューポートに入ると両側からスライドインする。",
  align: "full",
  isNew: true,
  tags: ["feature", "bento", "animation"],
};

function useReveal<T extends HTMLElement>() {
  const ref = useRef<T>(null);
  const [shown, setShown] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([e]) => e.isIntersecting && (setShown(true), obs.disconnect()),
      { threshold: 0.3 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);
  return { ref, shown };
}

const ROWS = [
  {
    icon: Inbox,
    eyebrow: "受信を整える",
    eyebrowEn: "Tame your inbox",
    title: "散らからない受信トレイ",
    titleEn: "An inbox that never clutters",
    body: "AIが優先度を判定し、重要なメッセージを上に。ノイズは自動で折りたたみます。",
    bodyEn: "AI ranks priority, floats the messages that matter to the top, and folds the noise away.",
    tone: "from-violet-500/25 to-indigo-500/10",
  },
  {
    icon: CalendarClock,
    eyebrow: "時間を取り戻す",
    eyebrowEn: "Win back time",
    title: "予定は自動で最適化",
    titleEn: "Schedules optimize themselves",
    body: "空き時間を見つけて会議を提案。移動時間や集中時間も賢く確保します。",
    bodyEn: "It finds open slots and proposes meetings, smartly reserving travel and focus time.",
    tone: "from-sky-500/25 to-cyan-500/10",
  },
  {
    icon: Sparkles,
    eyebrow: "ひらめきを形に",
    eyebrowEn: "Shape your ideas",
    title: "下書きはお任せ",
    titleEn: "Leave the drafts to us",
    body: "数行のメモから本文を生成。あなたのトーンを学び、文体を合わせます。",
    bodyEn: "Turn a few lines of notes into full copy — it learns your tone and matches your style.",
    tone: "from-emerald-500/25 to-teal-500/10",
  },
];

function Row({ data, reversed }: { data: (typeof ROWS)[number]; reversed: boolean }) {
  const en =
    typeof document !== "undefined" &&
    document.documentElement.lang === "en";
  const { ref, shown } = useReveal<HTMLDivElement>();
  const Icon = data.icon;
  return (
    <div ref={ref} className="grid items-center gap-8 lg:grid-cols-2">
      <div
        className={cn(
          "transition-all duration-700",
          reversed && "lg:order-2",
          shown
            ? "translate-x-0 opacity-100"
            : reversed
              ? "translate-x-8 opacity-0"
              : "-translate-x-8 opacity-0"
        )}
      >
        <span className="text-xs font-semibold uppercase tracking-widest text-primary">
          {en ? data.eyebrowEn : data.eyebrow}
        </span>
        <h3 className="mt-3 text-2xl font-semibold tracking-tight sm:text-3xl">
          {en ? data.titleEn : data.title}
        </h3>
        <p className="mt-3 max-w-md text-pretty text-muted-foreground">
          {en ? data.bodyEn : data.body}
        </p>
        <button className="mt-5 inline-flex items-center gap-1.5 text-sm font-medium text-primary transition-colors hover:text-primary/80">
          {en ? "Learn more" : "詳しく見る"}
          <ArrowRight className="size-4" />
        </button>
      </div>

      <div
        className={cn(
          "transition-all duration-700",
          reversed && "lg:order-1",
          shown
            ? "translate-x-0 opacity-100"
            : reversed
              ? "-translate-x-8 opacity-0"
              : "translate-x-8 opacity-0"
        )}
      >
        <div className="relative flex aspect-[4/3] items-center justify-center overflow-hidden rounded-3xl border bg-card">
          <div
            aria-hidden
            className={cn("absolute inset-0 bg-gradient-to-br", data.tone)}
          />
          <Icon className="relative size-20 text-foreground/80" />
        </div>
      </div>
    </div>
  );
}

export default function AlternatingRows() {
  return (
    <section className="w-full overflow-x-hidden px-6 py-16">
      <div className="mx-auto max-w-5xl space-y-16">
        {ROWS.map((r, i) => (
          <Row key={r.title} data={r} reversed={i % 2 === 1} />
        ))}
      </div>
    </section>
  );
}
