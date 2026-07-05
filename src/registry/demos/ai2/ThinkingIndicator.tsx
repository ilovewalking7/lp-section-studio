import { Bot } from "lucide-react";
import type { DemoMeta } from "@/registry";

export const meta: DemoMeta = {
  name: "思考中インジケーター",
  category: "AI / チャット",
  description: "3つの点が脈打つ「考え中…」のタイピング表示。",
  align: "center",
  isNew: true,
  tags: ["ai", "chat", "animation"],
};

export default function ThinkingIndicator() {
  const en =
    typeof document !== "undefined" &&
    document.documentElement.lang === "en";
  return (
    <div className="w-full max-w-[420px] space-y-3">
      <style>{`
        @keyframes ai2-think-dot {
          0%, 80%, 100% { transform: translateY(0); opacity: 0.4; }
          40% { transform: translateY(-4px); opacity: 1; }
        }
      `}</style>

      <div className="flex items-center gap-3">
        <div className="flex size-8 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-violet-500 to-sky-500 text-white shadow-md shadow-violet-500/20">
          <Bot className="size-4" />
        </div>
        <div className="flex items-center gap-1.5 rounded-2xl rounded-tl-md bg-muted px-4 py-3">
          {[0, 0.16, 0.32].map((d) => (
            <span
              key={d}
              className="size-2 rounded-full bg-violet-500"
              style={{ animation: `ai2-think-dot 1.2s ease-in-out ${d}s infinite` }}
            />
          ))}
        </div>
      </div>

      <div className="flex items-center gap-3">
        <div className="size-8 shrink-0" />
        <div className="inline-flex items-center gap-2 rounded-full border bg-card px-3 py-1.5 text-xs text-muted-foreground">
          <span className="relative flex size-2">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-violet-500/60" />
            <span className="relative inline-flex size-2 rounded-full bg-violet-500" />
          </span>
          {en ? "Thinking about a reply…" : "回答を考えています…"}
        </div>
      </div>
    </div>
  );
}
