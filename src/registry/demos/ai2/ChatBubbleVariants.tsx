import { AlertTriangle, Bot, Check, Info } from "lucide-react";
import { cn } from "@/lib/utils";
import type { DemoMeta } from "@/registry";

export const meta: DemoMeta = {
  name: "チャットバブル種別",
  category: "AI / チャット",
  description: "ユーザー・アシスタント・通知・警告の各バブル見本。",
  align: "center",
  isNew: true,
  tags: ["ai", "chat", "animation"],
};

export default function ChatBubbleVariants() {
  const en =
    typeof document !== "undefined" &&
    document.documentElement.lang === "en";
  return (
    <div className="w-full max-w-[560px] space-y-4 rounded-2xl border bg-card p-5">
      {/* user */}
      <div className="flex flex-row-reverse gap-3">
        <div className="flex size-8 shrink-0 items-center justify-center rounded-full bg-muted text-xs font-bold text-muted-foreground">
          YK
        </div>
        <div className="max-w-[75%] rounded-2xl rounded-tr-md bg-gradient-to-br from-violet-600 to-sky-600 px-4 py-2.5 text-sm text-white shadow-sm">
          {en ? "How do I use this component?" : "このコンポーネントの使い方を教えて"}
        </div>
      </div>

      {/* assistant */}
      <div className="flex gap-3">
        <div className="flex size-8 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-violet-500 to-sky-500 text-white">
          <Bot className="size-4" />
        </div>
        <div className="max-w-[75%] rounded-2xl rounded-tl-md bg-muted px-4 py-2.5 text-sm leading-relaxed text-foreground shadow-sm">
          {en
            ? "These variants use different colors for each state. Let me walk you through the details next."
            : "こちらのバリアントは状態ごとに配色を変えています。続けて詳細を説明しますね。"}
        </div>
      </div>

      {/* system / notice */}
      <div className="flex items-center justify-center">
        <div className="inline-flex items-center gap-1.5 rounded-full bg-sky-500/10 px-3 py-1 text-[11px] font-medium text-sky-500">
          <Info className="size-3" />
          {en ? "Switched to a new model" : "新しいモデルに切り替わりました"}
        </div>
      </div>

      {/* success inline */}
      <Notice
        icon={Check}
        tone="emerald"
        title={en ? "Saved" : "保存しました"}
        body={en ? "Your conversation was saved to history." : "会話の内容を履歴に保存しました。"}
      />

      {/* warning */}
      <Notice
        icon={AlertTriangle}
        tone="amber"
        title={en ? "Approaching the token limit" : "トークン上限に近づいています"}
        body={en ? "Long conversations may be summarized." : "長い会話は要約されることがあります。"}
      />
    </div>
  );
}

function Notice({
  icon: Icon,
  tone,
  title,
  body,
}: {
  icon: typeof Info;
  tone: "emerald" | "amber";
  title: string;
  body: string;
}) {
  const tones = {
    emerald: "border-emerald-500/30 bg-emerald-500/5 text-emerald-500",
    amber: "border-amber-500/30 bg-amber-500/5 text-amber-500",
  };
  return (
    <div className={cn("flex gap-3 rounded-xl border p-3", tones[tone])}>
      <Icon className="mt-0.5 size-4 shrink-0" />
      <div className="text-foreground">
        <p className="text-sm font-medium">{title}</p>
        <p className="mt-0.5 text-xs text-muted-foreground">{body}</p>
      </div>
    </div>
  );
}
