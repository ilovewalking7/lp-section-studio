import { useState } from "react";
import { Pause, Play, Quote } from "lucide-react";
import type { DemoMeta } from "@/registry";

export const meta: DemoMeta = {
  name: "動画風推薦カード",
  category: "マーケティング",
  description: "CSSだけで作った動画サムネ風カード。再生ボタンのパルスと擬似再生バー付き。",
  align: "full",
  isNew: true,
  tags: ["social-proof", "testimonial", "animation"],
};

const CARDS = [
  { name: "佐藤 美咲", nameEn: "Misaki Sato", role: "PdM @ Acme", grad: "from-rose-500 via-fuchsia-500 to-indigo-500", quote: "数字で成果を語れるようになりました。", quoteEn: "Now we can tell our success story in numbers." },
  { name: "Liam Carter", nameEn: "Liam Carter", role: "Engineer", grad: "from-sky-500 via-cyan-500 to-emerald-500", quote: "実装速度が体感で2倍になった。", quoteEn: "It felt like our implementation speed doubled." },
  { name: "Aria Novak", nameEn: "Aria Novak", role: "Founder", grad: "from-amber-500 via-orange-500 to-rose-500", quote: "導入は最良の経営判断でした。", quoteEn: "Adopting it was the best business decision we made." },
];

function initials(name: string) {
  return name.trim().split(/\s+/).map((p) => p[0]).slice(0, 2).join("");
}

export default function VideoTestimonialCard() {
  const en =
    typeof document !== "undefined" &&
    document.documentElement.lang === "en";
  const [playing, setPlaying] = useState<number | null>(null);
  return (
    <section className="w-full px-6 py-12">
      <style>{`
        @keyframes social2Pulse { 0%{ transform:scale(1); opacity:.7 } 70%{ transform:scale(1.9); opacity:0 } 100%{ opacity:0 } }
        .vt-ping { animation: social2Pulse 1.8s ease-out infinite }
        @keyframes social2Prog { from{ width:0 } to{ width:100% } }
        .vt-bar { animation: social2Prog 8s linear forwards }
        @media (prefers-reduced-motion: reduce){ .vt-ping{ animation:none } .vt-bar{ width:40% } }
      `}</style>
      <div className="mx-auto grid max-w-5xl gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {CARDS.map((c, i) => {
          const isPlaying = playing === i;
          return (
            <figure key={c.name} className="overflow-hidden rounded-2xl border border-border bg-card shadow-sm">
              <div className={`relative aspect-video bg-gradient-to-br ${c.grad}`}>
                <div className="absolute inset-0 bg-black/20" />
                <span className="absolute left-3 top-3 flex items-center gap-1.5 rounded-full bg-black/40 px-2 py-1 text-[11px] font-medium text-white backdrop-blur">
                  <Quote className="size-3" /> {en ? "Customer story" : "お客様の声"}
                </span>
                <button
                  type="button"
                  aria-label={isPlaying ? (en ? "Pause" : "停止") : (en ? "Play" : "再生")}
                  onClick={() => setPlaying(isPlaying ? null : i)}
                  className="absolute inset-0 grid place-items-center"
                >
                  <span className="relative grid size-14 place-items-center rounded-full bg-white/90 text-foreground shadow-lg transition-transform hover:scale-105">
                    {!isPlaying && <span className="vt-ping absolute inset-0 rounded-full bg-white/60" />}
                    {isPlaying ? <Pause className="size-6 fill-current" /> : <Play className="size-6 translate-x-0.5 fill-current" />}
                  </span>
                </button>
                <div className="absolute inset-x-0 bottom-0 h-1 bg-white/25">
                  {isPlaying && <div className="vt-bar h-full bg-white" />}
                </div>
              </div>
              <figcaption className="flex items-center gap-3 p-4">
                <span className={`flex size-9 items-center justify-center rounded-full bg-gradient-to-br ${c.grad} text-xs font-bold text-white`}>
                  {initials(en ? c.nameEn : c.name)}
                </span>
                <span className="leading-tight">
                  <span className="block text-sm font-semibold text-foreground">{en ? c.nameEn : c.name}</span>
                  <span className="block text-xs text-muted-foreground">{c.role}</span>
                </span>
              </figcaption>
              <p className="px-4 pb-4 text-sm text-muted-foreground">“{en ? c.quoteEn : c.quote}”</p>
            </figure>
          );
        })}
      </div>
    </section>
  );
}
