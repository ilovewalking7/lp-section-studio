import { ArrowRight, Leaf, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import type { DemoMeta } from "@/registry";

export const meta: DemoMeta = {
  name: "ボタニカル・ヒーロー",
  category: "ボタニカル",
  description: "葉のSVG装飾と柔らかなCTAを備えたオーガニックなヒーロー。",
  align: "full",
  isNew: true,
  tags: ["botanical", "organic", "wellness"],
};

function LeafSpray({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 200 260" fill="none" className={className} aria-hidden>
      <path
        d="M100 250 C100 180 100 90 100 20"
        stroke="#5e6b4f"
        strokeWidth="2"
        strokeLinecap="round"
      />
      {[40, 80, 120, 160, 200].map((y, i) => {
        const dir = i % 2 === 0 ? 1 : -1;
        return (
          <g key={y}>
            <path
              d={`M100 ${y} C${100 + dir * 30} ${y - 20} ${100 + dir * 55} ${
                y - 10
              } ${100 + dir * 60} ${y + 14} C${100 + dir * 35} ${y + 18} ${
                100 + dir * 18
              } ${y + 10} 100 ${y}Z`}
              fill="#86a06d"
              fillOpacity={0.55 + i * 0.06}
            />
            <path
              d={`M100 ${y} C${100 + dir * 26} ${y - 8} ${100 + dir * 44} ${y} ${
                100 + dir * 60
              } ${y + 14}`}
              stroke="#3f4a35"
              strokeWidth="1"
              strokeOpacity="0.5"
            />
          </g>
        );
      })}
    </svg>
  );
}

export default function BotanicalHero() {
  const en =
    typeof document !== "undefined" &&
    document.documentElement.lang === "en";
  return (
    <section className="relative w-full overflow-hidden bg-[#f3f1e7] text-[#3f4a35]">
      <div className="pointer-events-none absolute -left-10 top-0 hidden opacity-70 md:block">
        <LeafSpray className="h-[420px] w-[280px] -rotate-12" />
      </div>
      <div className="pointer-events-none absolute -right-12 bottom-0 hidden opacity-60 lg:block">
        <LeafSpray className="h-[460px] w-[300px] rotate-[200deg]" />
      </div>

      <div className="relative mx-auto flex max-w-3xl flex-col items-center px-6 py-24 text-center sm:py-32">
        <span className="mb-6 inline-flex items-center gap-2 rounded-full border border-[#5e6b4f]/30 bg-white/50 px-4 py-1.5 text-xs font-medium tracking-[0.2em] text-[#5e6b4f]">
          <Leaf className="size-3.5" />
          NATURE-DERIVED CARE
        </span>
        <h1 className="font-serif text-5xl font-medium leading-[1.05] tracking-tight text-[#3f4a35] sm:text-6xl">
          {en ? (
            <>
              Botanical gentleness,
              <br />
              for skin and spirit.
            </>
          ) : (
            <>
              肌と心に、
              <br />
              植物のやさしさを。
            </>
          )}
        </h1>
        <p className="mt-6 max-w-lg text-pretty text-base leading-relaxed text-[#5e6b4f]">
          {en
            ? "A 100% nature-derived formula born from the field. With soft scents and the power of plants, turn daily skincare into a quiet wellness ritual."
            : "畑から生まれた100%自然由来の処方。穏やかな香りと植物の力で、毎日のスキンケアを静かなウェルネスの時間へ。"}
        </p>
        <div className="mt-9 flex flex-col items-center gap-3 sm:flex-row">
          <Button className="h-12 rounded-full bg-[#5e6b4f] px-7 text-sm tracking-wide text-[#f3f1e7] hover:bg-[#4b563f]">
            {en ? "View the collection" : "コレクションを見る"}
            <ArrowRight className="size-4" />
          </Button>
          <Button
            variant="ghost"
            className="h-12 rounded-full px-6 text-sm tracking-wide text-[#5e6b4f] hover:bg-[#5e6b4f]/10"
          >
            <Sparkles className="size-4" />
            {en ? "Our philosophy" : "私たちの哲学"}
          </Button>
        </div>
        <p className="mt-10 text-xs tracking-wide text-[#5e6b4f]/70">
          {en
            ? "Vegan certified · Cruelty-free · 100% recycled packaging"
            : "ヴィーガン認証 · 動物実験フリー · 100% リサイクル容器"}
        </p>
      </div>
    </section>
  );
}
