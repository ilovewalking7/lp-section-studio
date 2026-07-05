import { Star } from "lucide-react";
import type { DemoMeta } from "@/registry";

export const meta: DemoMeta = {
  name: "推薦メイソンリーウォール",
  category: "マーケティング",
  description: "高さの異なる推薦カードを段組みで敷き詰めるメイソンリー。ホバーで浮き上がる。",
  align: "full",
  isNew: true,
  tags: ["social-proof", "testimonial", "animation"],
};

const ITEMS = [
  { name: "佐藤 美咲", nameEn: "Misaki Sato", role: "PdM", color: "bg-rose-500", stars: 5, quote: "導入初日から生産性が上がりました。サポートも迅速で安心感があります。", quoteEn: "Productivity jumped from day one, and the support is fast and reassuring." },
  { name: "Liam Carter", nameEn: "Liam Carter", role: "Engineer", color: "bg-sky-500", stars: 5, quote: "APIが素直で実装が速い。", quoteEn: "The API is intuitive and quick to implement." },
  { name: "田中 健", nameEn: "Ken Tanaka", role: "Designer", color: "bg-violet-500", stars: 4, quote: "細部の作り込みが美しく、毎日触っていて楽しいプロダクトです。デザイナー目線でも文句なし。", quoteEn: "The attention to detail is beautiful—a joy to use every day. No complaints from a designer's eye." },
  { name: "Aria Novak", nameEn: "Aria Novak", role: "Founder", color: "bg-amber-500", stars: 5, quote: "ROIが明確でした。", quoteEn: "The ROI was crystal clear." },
  { name: "鈴木 葵", nameEn: "Aoi Suzuki", role: "Marketer", color: "bg-emerald-500", stars: 5, quote: "計測から改善まで一気通貫。チーム全体の数字が素直に伸びていきました。", quoteEn: "From measurement to improvement, all in one flow. The whole team's numbers climbed steadily." },
  { name: "Noah Kim", nameEn: "Noah Kim", role: "CTO", color: "bg-indigo-500", stars: 4, quote: "運用コストが半分に。", quoteEn: "Our operating costs were cut in half." },
  { name: "山本 蓮", nameEn: "Ren Yamamoto", role: "Sales", color: "bg-orange-500", stars: 5, quote: "商談化率が目に見えて上がり、現場の士気も高まりました。", quoteEn: "Our deal conversion visibly improved, and team morale rose with it." },
  { name: "Mia Chen", nameEn: "Mia Chen", role: "Ops", color: "bg-teal-500", stars: 5, quote: "もう前のやり方には戻れません。", quoteEn: "There's no going back to the old way." },
  { name: "高橋 樹", nameEn: "Itsuki Takahashi", role: "Data", color: "bg-fuchsia-500", stars: 5, quote: "ダッシュボードが秀逸で意思決定が速くなりました。", quoteEn: "The dashboards are excellent and have sped up our decisions." },
];

function initials(name: string) {
  return name.trim().split(/\s+/).map((p) => p[0]).slice(0, 2).join("");
}

export default function MasonryWall() {
  const en =
    typeof document !== "undefined" &&
    document.documentElement.lang === "en";
  return (
    <section className="w-full px-6 py-12">
      <style>{`
        @keyframes social2Rise { from { opacity:0; transform: translateY(14px) } to { opacity:1; transform: translateY(0) } }
        .masonry-card { animation: social2Rise .5s ease both }
        @media (prefers-reduced-motion: reduce) { .masonry-card { animation: none } }
      `}</style>
      <div className="mx-auto max-w-5xl">
        <h2 className="text-center text-3xl font-semibold tracking-tight">{en ? "A wall of voices" : "声の壁"}</h2>
        <p className="mt-2 text-center text-muted-foreground">{en ? "Real results, from every kind of role." : "あらゆる職種から、たしかな手応え。"}</p>
        <div className="mt-8 columns-1 gap-4 sm:columns-2 lg:columns-3 [&>*]:mb-4">
          {ITEMS.map((t, i) => (
            <figure
              key={i}
              className="masonry-card break-inside-avoid rounded-2xl border border-border bg-card p-5 shadow-sm transition-transform duration-200 hover:-translate-y-1 hover:shadow-md"
              style={{ animationDelay: `${i * 60}ms` }}
            >
              <div className="flex gap-0.5 text-amber-400">
                {Array.from({ length: 5 }).map((_, s) => (
                  <Star key={s} className={`size-4 ${s < t.stars ? "fill-amber-400" : "fill-transparent text-muted-foreground/40"}`} />
                ))}
              </div>
              <blockquote className="mt-3 text-sm leading-relaxed text-foreground">{en ? t.quoteEn : t.quote}</blockquote>
              <figcaption className="mt-4 flex items-center gap-3">
                <span className={`flex size-9 items-center justify-center rounded-full text-xs font-bold text-white ${t.color}`}>
                  {initials(en ? t.nameEn : t.name)}
                </span>
                <span className="leading-tight">
                  <span className="block text-sm font-semibold text-foreground">{en ? t.nameEn : t.name}</span>
                  <span className="block text-xs text-muted-foreground">{t.role}</span>
                </span>
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}
