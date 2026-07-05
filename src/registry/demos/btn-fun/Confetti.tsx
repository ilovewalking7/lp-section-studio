import type { DemoMeta } from "@/registry";
import { useState } from "react";
import { PartyPopper } from "lucide-react";

export const meta: DemoMeta = {
  name: "コンフェッティ",
  category: "ボタン",
  description: "クリックすると紙吹雪が弾けて舞う、お祝いムードのコンフェッティ・ボタン。",
  align: "center",
  isNew: true,
  tags: ["button", "fun"],
};

const PIECES = Array.from({ length: 12 }, (_, i) => ({
  id: i,
  x: (i % 6) * 18 - 45 + (i % 2 ? 6 : -6),
  color: ["#f43f5e", "#fbbf24", "#34d399", "#60a5fa", "#a78bfa", "#f472b6"][i % 6],
  delay: (i % 4) * 30,
}));

export default function Confetti() {
  const en = typeof document !== "undefined" && document.documentElement.lang === "en";
  const [burst, setBurst] = useState(0);

  return (
    <div className="flex items-center justify-center rounded-2xl bg-indigo-50 p-8">
      <style>{`@keyframes btnfun-confetti{0%{opacity:1;transform:translate(0,0) rotate(0)}100%{opacity:0;transform:translate(var(--cx),-60px) rotate(320deg)}}`}</style>
      <div className="relative">
        {burst > 0 &&
          PIECES.map((p) => (
            <span
              key={`${burst}-${p.id}`}
              className="pointer-events-none absolute left-1/2 top-0 size-2 rounded-[1px]"
              style={{
                background: p.color,
                ["--cx" as string]: `${p.x}px`,
                animation: `btnfun-confetti .8s ease-out ${p.delay}ms forwards`,
              }}
            />
          ))}
        <button
          type="button"
          onClick={() => setBurst((b) => b + 1)}
          className="relative inline-flex items-center gap-2 rounded-full bg-indigo-600 px-7 py-3.5 text-sm font-bold text-white shadow-[0_8px_20px_-6px_rgba(79,70,229,0.7)] transition-all duration-150 hover:bg-indigo-500 active:scale-95 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-indigo-300"
        >
          <PartyPopper className="size-4" />
          {en ? "Celebrate" : "おめでとう"}
        </button>
      </div>
    </div>
  );
}
