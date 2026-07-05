import { useEffect, useState } from "react";
import { Quote } from "lucide-react";
import type { DemoMeta } from "@/registry";

export const meta: DemoMeta = {
  name: "引用スポットライト",
  category: "マーケティング",
  description: "大きな引用に、背後をスポットライトが追従。サムネを選ぶと滑らかに切り替わる。",
  align: "full",
  isNew: true,
  tags: ["social-proof", "testimonial", "animation"],
};

const QUOTES = [
  { name: "佐藤 美咲", nameEn: "Misaki Sato", role: "CMO, Nova", color: "from-rose-500 to-pink-500", text: "意思決定の速度が変わりました。データが語りかけてくるようです。", textEn: "Our decision-making speed completely changed. The data almost speaks to you." },
  { name: "Liam Carter", nameEn: "Liam Carter", role: "Head of Eng, Globe", color: "from-sky-500 to-cyan-500", text: "私たちの開発文化そのものを、より良い方向へ書き換えてくれた。", textEn: "It rewrote our engineering culture itself for the better." },
  { name: "Aria Novak", nameEn: "Aria Novak", role: "CEO, Quartz", color: "from-amber-500 to-orange-500", text: "投資対効果がこれほど明確なツールに出会ったのは初めてです。", textEn: "I've never used a tool with such a clear return on investment." },
];

function initials(name: string) {
  return name.trim().split(/\s+/).map((p) => p[0]).slice(0, 2).join("");
}

export default function QuoteSpotlight() {
  const en =
    typeof document !== "undefined" &&
    document.documentElement.lang === "en";
  const [idx, setIdx] = useState(0);

  useEffect(() => {
    const t = setInterval(() => setIdx((i) => (i + 1) % QUOTES.length), 6000);
    return () => clearInterval(t);
  }, []);

  const q = QUOTES[idx];

  return (
    <section className="w-full px-6 py-14">
      <div className="relative mx-auto max-w-3xl overflow-hidden rounded-3xl border border-border bg-card px-6 py-14 text-center shadow-sm sm:px-12">
        <div
          aria-hidden
          className={`pointer-events-none absolute left-1/2 top-0 size-72 -translate-x-1/2 rounded-full bg-gradient-to-br ${q.color} opacity-20 blur-3xl transition-all duration-700`}
        />
        <div className="relative">
          <Quote className="mx-auto size-9 text-primary/30" aria-hidden />
          <blockquote key={idx} className="quote-fade mx-auto mt-5 max-w-2xl text-balance text-2xl font-medium leading-relaxed text-foreground sm:text-3xl">
            “{en ? q.textEn : q.text}”
          </blockquote>
          <figcaption className="mt-7 flex items-center justify-center gap-3">
            <span className={`flex size-11 items-center justify-center rounded-full bg-gradient-to-br ${q.color} text-sm font-bold text-white`}>
              {initials(en ? q.nameEn : q.name)}
            </span>
            <span className="text-left leading-tight">
              <span className="block text-sm font-semibold text-foreground">{en ? q.nameEn : q.name}</span>
              <span className="block text-xs text-muted-foreground">{q.role}</span>
            </span>
          </figcaption>

          <div className="mt-8 flex justify-center gap-3">
            {QUOTES.map((item, i) => (
              <button
                key={item.name}
                type="button"
                aria-label={en ? `Quote from ${item.nameEn}` : `${item.name} の引用`}
                aria-pressed={i === idx}
                onClick={() => setIdx(i)}
                className={`flex size-9 items-center justify-center rounded-full bg-gradient-to-br text-xs font-bold text-white transition-all duration-300 ${item.color} ${
                  i === idx ? "scale-110 ring-2 ring-primary ring-offset-2 ring-offset-card" : "opacity-50 hover:opacity-100"
                }`}
              >
                {initials(en ? item.nameEn : item.name)}
              </button>
            ))}
          </div>
        </div>
      </div>
      <style>{`
        @keyframes social2QuoteFade { from{ opacity:0; transform: translateY(8px) } to{ opacity:1; transform:none } }
        .quote-fade { animation: social2QuoteFade .6s ease both }
        @media (prefers-reduced-motion: reduce){ .quote-fade{ animation:none } }
      `}</style>
    </section>
  );
}
