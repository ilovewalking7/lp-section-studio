import { useState } from "react";
import { Star, Send } from "lucide-react";
import { cn } from "@/lib/utils";
import type { DemoMeta } from "@/registry";

export const meta: DemoMeta = {
  name: "フィードバックフォーム",
  category: "フォーム",
  description: "星評価＋絵文字の感想フォーム。ホバーで星が満ちる。",
  align: "center",
  isNew: true,
  tags: ["form", "auth", "animation"],
};

const MOODS = ["😡", "🙁", "😐", "🙂", "🤩"];

export default function FeedbackForm() {
  const en = typeof document !== "undefined" && document.documentElement.lang === "en";
  const [rating, setRating] = useState(0);
  const [hover, setHover] = useState(0);
  const [text, setText] = useState("");

  const shown = hover || rating;

  return (
    <div className="w-full max-w-md rounded-2xl border border-slate-200 bg-white p-7 text-center shadow-xl dark:border-slate-800 dark:bg-slate-900">
      <style>{`@keyframes fb-pop{0%{transform:scale(.6)}60%{transform:scale(1.25)}100%{transform:scale(1)}}`}</style>
      <h2 className="mb-1 text-xl font-semibold text-slate-900 dark:text-white">{en ? "How was your experience?" : "体験はいかがでしたか？"}</h2>
      <p className="mb-6 text-sm text-slate-500 dark:text-slate-400">{en ? "We'd love to hear your thoughts." : "ご感想をお聞かせください。"}</p>

      <div className="mb-2 text-4xl" style={shown ? { animation: "fb-pop .3s ease-out" } : undefined} key={shown}>
        {shown ? MOODS[shown - 1] : "🙂"}
      </div>

      <div className="mb-6 flex justify-center gap-1.5">
        {[1, 2, 3, 4, 5].map((n) => (
          <button
            key={n}
            type="button"
            aria-label={en ? `${n} star${n > 1 ? "s" : ""}` : `${n} つ星`}
            onMouseEnter={() => setHover(n)}
            onMouseLeave={() => setHover(0)}
            onClick={() => setRating(n)}
            className="transition-transform hover:scale-125"
          >
            <Star className={cn("h-8 w-8 transition-colors", n <= shown ? "fill-amber-400 text-amber-400" : "fill-transparent text-slate-300 dark:text-slate-600")} />
          </button>
        ))}
      </div>

      <textarea value={text} onChange={(e) => setText(e.target.value)} rows={3} placeholder="さらに詳しく教えてください…"
        className="mb-4 w-full resize-none rounded-lg border border-slate-300 bg-transparent px-3 py-2.5 text-left text-sm outline-none transition focus:border-amber-500 focus:ring-2 focus:ring-amber-500/25 dark:border-slate-700 dark:text-white" />

      <button type="button" disabled={!rating}
        className="inline-flex w-full items-center justify-center gap-2 rounded-lg bg-amber-500 py-2.5 text-sm font-semibold text-white shadow-lg shadow-amber-500/30 transition hover:bg-amber-600 active:scale-95 disabled:cursor-not-allowed disabled:opacity-40">
        <Send className="h-4 w-4" /> 送信する
      </button>
    </div>
  );
}
