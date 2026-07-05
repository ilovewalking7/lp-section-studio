import { useState } from "react";
import { Bot, Check, CheckCheck, Sparkles } from "lucide-react";
import { cn } from "@/lib/utils";
import type { DemoMeta } from "@/registry";

export const meta: DemoMeta = {
  name: "モダンチャットスレッド",
  category: "AI / チャット",
  description: "グラデアバターと既読・時刻付きの洗練された会話スレッド。",
  align: "center",
  isNew: true,
  tags: ["ai", "chat", "animation"],
};

type Msg = {
  id: number;
  role: "user" | "assistant";
  ja: string;
  en: string;
  time: string;
};

const THREAD: Msg[] = [
  { id: 1, role: "user", ja: "今週の進捗をまとめてくれる？", en: "Can you sum up this week's progress?", time: "09:41" },
  {
    id: 2,
    role: "assistant",
    ja: "もちろんです。3件のタスクが完了し、2件が進行中です。詳細をリストにしますね。",
    en: "Of course. 3 tasks are done and 2 are in progress. I'll list out the details for you.",
    time: "09:41",
  },
  { id: 3, role: "user", ja: "助かる、優先度も付けて", en: "Thanks — add priorities too", time: "09:42" },
  {
    id: 4,
    role: "assistant",
    ja: "優先度高: リリース準備 / 中: ドキュメント整備 / 低: リファクタ。の順でどうでしょう。",
    en: "High: release prep / Medium: docs cleanup / Low: refactoring. How does that order sound?",
    time: "09:42",
  },
];

function Avatar({ role }: { role: Msg["role"] }) {
  if (role === "assistant") {
    return (
      <div className="relative flex size-9 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-fuchsia-500 via-violet-500 to-sky-500 text-white shadow-lg shadow-violet-500/20">
        <Bot className="size-4" />
        <span className="absolute -bottom-0.5 -right-0.5 flex size-3 items-center justify-center rounded-full bg-emerald-400 ring-2 ring-card" />
      </div>
    );
  }
  return (
    <div className="flex size-9 shrink-0 items-center justify-center rounded-full bg-muted text-xs font-bold text-muted-foreground">
      YK
    </div>
  );
}

export default function ChatThreadModern() {
  const en =
    typeof document !== "undefined" &&
    document.documentElement.lang === "en";
  const [liked, setLiked] = useState<number | null>(null);

  return (
    <div className="w-full max-w-[600px]">
      <div className="flex items-center gap-2.5 rounded-t-2xl border border-b-0 bg-card/80 px-5 py-3 backdrop-blur">
        <div className="flex size-7 items-center justify-center rounded-lg bg-gradient-to-br from-violet-500 to-sky-500 text-white">
          <Sparkles className="size-3.5" />
        </div>
        <div className="flex-1">
          <p className="text-sm font-semibold leading-none">{en ? "Assistant" : "アシスタント"}</p>
          <p className="mt-1 text-[11px] text-emerald-500">{en ? "Online" : "オンライン"}</p>
        </div>
      </div>
      <div className="space-y-5 rounded-b-2xl border bg-gradient-to-b from-card to-muted/30 p-4 sm:p-5">
        {THREAD.map((m) => (
          <div
            key={m.id}
            className={cn("flex gap-2.5", m.role === "user" && "flex-row-reverse")}
          >
            <Avatar role={m.role} />
            <div className={cn("max-w-[78%]", m.role === "user" && "items-end text-right")}>
              <button
                type="button"
                onClick={() => setLiked((p) => (p === m.id ? null : m.id))}
                className={cn(
                  "block rounded-2xl px-4 py-2.5 text-left text-sm leading-relaxed shadow-sm transition-transform active:scale-[0.98]",
                  m.role === "assistant"
                    ? "rounded-tl-md bg-muted text-foreground"
                    : "rounded-tr-md bg-gradient-to-br from-violet-600 to-sky-600 text-white"
                )}
              >
                {en ? m.en : m.ja}
              </button>
              <div
                className={cn(
                  "mt-1 flex items-center gap-1 px-1 text-[10px] text-muted-foreground",
                  m.role === "user" && "justify-end"
                )}
              >
                <span>{m.time}</span>
                {m.role === "user" &&
                  (liked === m.id ? (
                    <CheckCheck className="size-3 text-sky-500" />
                  ) : (
                    <Check className="size-3" />
                  ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
