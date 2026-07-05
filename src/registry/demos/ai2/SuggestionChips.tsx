import { useState } from "react";
import {
  Code2,
  Image as ImageIcon,
  Languages,
  Lightbulb,
  PenLine,
  Sparkles,
} from "lucide-react";
import { cn } from "@/lib/utils";
import type { DemoMeta } from "@/registry";

export const meta: DemoMeta = {
  name: "サジェストチップ",
  category: "AI / チャット",
  description: "アイコン付きのプロンプト候補チップ。選択で強調。",
  align: "center",
  isNew: true,
  tags: ["ai", "chat", "animation"],
};

const CHIPS = [
  { id: "write", icon: PenLine, ja: "文章を書く", en: "Write text", color: "text-violet-500" },
  { id: "code", icon: Code2, ja: "コード生成", en: "Generate code", color: "text-sky-500" },
  { id: "idea", icon: Lightbulb, ja: "アイデア出し", en: "Brainstorm ideas", color: "text-amber-500" },
  { id: "translate", icon: Languages, ja: "翻訳する", en: "Translate", color: "text-emerald-500" },
  { id: "image", icon: ImageIcon, ja: "画像を作る", en: "Create an image", color: "text-fuchsia-500" },
  { id: "summary", icon: Sparkles, ja: "要約する", en: "Summarize", color: "text-rose-500" },
];

export default function SuggestionChips() {
  const en =
    typeof document !== "undefined" &&
    document.documentElement.lang === "en";
  const [selected, setSelected] = useState<string[]>(["write"]);

  const toggle = (id: string) =>
    setSelected((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
    );

  return (
    <div className="w-full max-w-[480px]">
      <p className="mb-3 text-sm text-muted-foreground">
        {en ? "What can I help you with?" : "何をお手伝いしましょうか？"}
      </p>
      <div className="flex flex-wrap gap-2">
        {CHIPS.map((c) => {
          const active = selected.includes(c.id);
          return (
            <button
              key={c.id}
              type="button"
              onClick={() => toggle(c.id)}
              className={cn(
                "group flex items-center gap-2 rounded-full border px-3.5 py-2 text-sm font-medium transition-all active:scale-95",
                active
                  ? "border-violet-500/50 bg-violet-500/10 text-foreground shadow-sm"
                  : "bg-card text-muted-foreground hover:border-foreground/20 hover:text-foreground"
              )}
            >
              <c.icon
                className={cn(
                  "size-4 transition-transform group-hover:scale-110",
                  active ? c.color : "text-muted-foreground"
                )}
              />
              {en ? c.en : c.ja}
            </button>
          );
        })}
      </div>
    </div>
  );
}
