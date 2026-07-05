import { ArrowRight, MessageSquare, Sparkles, Star } from "lucide-react";
import type { DemoMeta } from "@/registry";

export const meta: DemoMeta = {
  name: "アシスタント紹介カード",
  category: "AI / チャット",
  description: "AIアシスタントのプロフィールと得意分野を示すカード。",
  align: "center",
  isNew: true,
  tags: ["ai", "chat", "animation"],
};

const SKILLS = [
  { ja: "コード生成", en: "Code generation" },
  { ja: "要約", en: "Summarization" },
  { ja: "翻訳", en: "Translation" },
  { ja: "データ分析", en: "Data analysis" },
];

export default function AssistantCard() {
  const en =
    typeof document !== "undefined" &&
    document.documentElement.lang === "en";
  return (
    <div className="w-full max-w-[360px]">
      <div className="group relative overflow-hidden rounded-2xl border bg-card p-6 shadow-sm transition-shadow hover:shadow-lg">
        <div
          aria-hidden
          className="pointer-events-none absolute -right-16 -top-16 size-40 rounded-full bg-violet-500/15 blur-3xl transition-transform duration-500 group-hover:scale-125"
        />

        <div className="relative flex items-center gap-4">
          <div className="relative">
            <div className="flex size-14 items-center justify-center rounded-2xl bg-gradient-to-br from-fuchsia-500 via-violet-500 to-sky-500 text-white shadow-lg shadow-violet-500/30">
              <Sparkles className="size-7" />
            </div>
            <span className="absolute -bottom-1 -right-1 flex size-4 items-center justify-center rounded-full bg-emerald-400 ring-2 ring-card" />
          </div>
          <div>
            <h3 className="text-lg font-bold leading-tight">{en ? "Assistant Pro" : "アシスタント Pro"}</h3>
            <div className="mt-1 flex items-center gap-1 text-xs text-muted-foreground">
              <Star className="size-3 fill-amber-400 text-amber-400" />
              <span className="font-semibold text-foreground">4.9</span>
              <span>{en ? "· 12k chats" : "· 12k 会話"}</span>
            </div>
          </div>
        </div>

        <p className="relative mt-4 text-sm leading-relaxed text-muted-foreground">
          {en
            ? "A versatile assistant that handles a wide range of tasks with high accuracy — from long-form reading to code generation."
            : "長文の読解からコード生成まで、幅広いタスクを高精度でこなす汎用アシスタントです。"}
        </p>

        <div className="relative mt-4 flex flex-wrap gap-1.5">
          {SKILLS.map((s) => (
            <span
              key={s.ja}
              className="rounded-full bg-muted px-2.5 py-1 text-[11px] font-medium text-muted-foreground"
            >
              {en ? s.en : s.ja}
            </span>
          ))}
        </div>

        <button
          type="button"
          className="relative mt-5 flex w-full items-center justify-center gap-2 rounded-xl bg-foreground py-2.5 text-sm font-semibold text-background transition-transform active:scale-[0.98]"
        >
          <MessageSquare className="size-4" />
          {en ? "Start a chat" : "会話を始める"}
          <ArrowRight className="size-4 transition-transform group-hover:translate-x-0.5" />
        </button>
      </div>
    </div>
  );
}
