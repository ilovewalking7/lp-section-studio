import { Quote } from "lucide-react";
import type { DemoMeta } from "@/registry";

export const meta: DemoMeta = {
  name: "推薦マーキー二段",
  category: "マーケティング",
  description: "上下が逆方向に流れる二段の推薦コメントマーキー。ホバーで停止。",
  align: "full",
  isNew: true,
  tags: ["social-proof", "testimonial", "animation"],
};

const ROW_A = [
  { name: { ja: "佐藤 美咲", en: "Misaki Sato" }, role: "PdM @ Acme", color: "bg-rose-500", quote: { ja: "導入初日でチームの生産性が跳ね上がりました。", en: "Team productivity jumped on day one." } },
  { name: { ja: "Liam Carter", en: "Liam Carter" }, role: "Engineer", color: "bg-sky-500", quote: { ja: "API が驚くほど素直で、実装がとにかく速い。", en: "The API is wonderfully clean — shipping is fast." } },
  { name: { ja: "田中 健", en: "Ken Tanaka" }, role: "Designer", color: "bg-violet-500", quote: { ja: "細部の作り込みが本当に美しいプロダクト。", en: "A truly beautiful product, down to the details." } },
  { name: { ja: "Aria Novak", en: "Aria Novak" }, role: "Founder", color: "bg-amber-500", quote: { ja: "投資対効果が明確。導入に迷いはなかった。", en: "Clear ROI — adopting it was a no-brainer." } },
];
const ROW_B = [
  { name: { ja: "鈴木 葵", en: "Aoi Suzuki" }, role: "Marketer", color: "bg-emerald-500", quote: { ja: "計測から改善までが一気通貫。数字が伸びた。", en: "Measure to improve, end to end — our numbers grew." } },
  { name: { ja: "Noah Kim", en: "Noah Kim" }, role: "CTO", color: "bg-indigo-500", quote: { ja: "運用コストが半分に。チームが本質に集中できる。", en: "Ops cost halved — the team focuses on what matters." } },
  { name: { ja: "山本 蓮", en: "Ren Yamamoto" }, role: "Sales", color: "bg-orange-500", quote: { ja: "商談化率が目に見えて上がりました。", en: "Our conversion rate visibly improved." } },
  { name: { ja: "Mia Chen", en: "Mia Chen" }, role: "Ops", color: "bg-teal-500", quote: { ja: "もう前のやり方には戻れません。", en: "I can't go back to the old way of working." } },
];

function initials(name: string) {
  return name.trim().split(/\s+/).map((p) => p[0]).slice(0, 2).join("");
}

function Row({ items, reverse }: { items: typeof ROW_A; reverse?: boolean }) {
  const en =
    typeof document !== "undefined" &&
    document.documentElement.lang === "en";
  return (
    <div className="marq-mask group relative overflow-hidden">
      <div className={`flex w-max gap-4 pr-4 ${reverse ? "marq-track-rev" : "marq-track"}`}>
        {[...items, ...items].map((t, i) => (
          <figure
            key={`${t.name.en}-${i}`}
            className="flex w-[20rem] shrink-0 flex-col rounded-2xl border border-border bg-card p-5 shadow-sm"
          >
            <Quote className="size-5 text-primary/40" aria-hidden />
            <blockquote className="mt-2 text-sm leading-relaxed text-foreground">{en ? t.quote.en : t.quote.ja}</blockquote>
            <figcaption className="mt-4 flex items-center gap-3">
              <span className={`flex size-9 items-center justify-center rounded-full text-xs font-bold text-white ${t.color}`}>
                {initials(t.name.en)}
              </span>
              <span className="leading-tight">
                <span className="block text-sm font-semibold text-foreground">{en ? t.name.en : t.name.ja}</span>
                <span className="block text-xs text-muted-foreground">{t.role}</span>
              </span>
            </figcaption>
          </figure>
        ))}
      </div>
    </div>
  );
}

export default function TestimonialMarquee() {
  return (
    <section className="w-full px-6 py-12">
      <style>{`
        @keyframes social2MarqL { from { transform: translateX(0) } to { transform: translateX(-50%) } }
        @keyframes social2MarqR { from { transform: translateX(-50%) } to { transform: translateX(0) } }
        .marq-track { animation: social2MarqL 38s linear infinite }
        .marq-track-rev { animation: social2MarqR 38s linear infinite }
        .marq-mask:hover .marq-track, .marq-mask:hover .marq-track-rev { animation-play-state: paused }
        @media (prefers-reduced-motion: reduce) { .marq-track, .marq-track-rev { animation: none } }
      `}</style>
      <div className="mx-auto max-w-6xl">
        <h2 className="text-center text-3xl font-semibold tracking-tight">利用者の声</h2>
        <p className="mt-2 text-center text-muted-foreground">数千のチームに選ばれています。</p>
        <div
          className="mt-8 space-y-4"
          style={{
            maskImage: "linear-gradient(to right, transparent, black 6%, black 94%, transparent)",
            WebkitMaskImage: "linear-gradient(to right, transparent, black 6%, black 94%, transparent)",
          }}
        >
          <Row items={ROW_A} />
          <Row items={ROW_B} reverse />
        </div>
      </div>
    </section>
  );
}
