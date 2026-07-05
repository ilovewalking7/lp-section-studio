import { BadgeCheck, Star } from "lucide-react";
import { cn } from "@/lib/utils";
import type { DemoMeta } from "@/registry";

export const meta: DemoMeta = {
  name: "推薦ウォール",
  category: "コンバージョン",
  description:
    "アバター・評価・認証マーク付きの短い推薦を敷き詰めたグリッドウォール。",
  align: "full",
  level: "advanced",
  isNew: true,
  tags: ["social-proof", "testimonials", "reviews"],
  principle:
    "肯定的な声を「量」で見せる社会的証明が、一件あたりの説得力を超えて『これだけの人が満足している』という規模の安心を生み、懐疑を打ち消す。",
};

type Review = {
  name: string;
  roleJa: string;
  roleEn: string;
  textJa: string;
  textEn: string;
  hue: string;
  rating: number;
};

const REVIEWS: Review[] = [
  { name: "中村 由美", roleJa: "プロダクトデザイナー", roleEn: "Product Designer", textJa: "導入初週でリリース速度が体感2倍。チームの空気まで変わった。", textEn: "Our release speed felt 2x in the first week. It even changed the team's mood.", hue: "from-rose-500 to-pink-500", rating: 5 },
  { name: "James K.", roleJa: "エンジニアリード", roleEn: "Eng. Lead", textJa: "オンボーディングが驚くほどスムーズ。今年いちばんのツール選定だった。", textEn: "The onboarding was effortless. Best tool decision we made this year.", hue: "from-sky-500 to-indigo-500", rating: 5 },
  { name: "高橋 蓮", roleJa: "スタートアップ創業者", roleEn: "Startup Founder", textJa: "解約しようとしたサービスを全部これに置き換えた。コスパが異常。", textEn: "I replaced every tool I was about to cancel with this. The value is unreal.", hue: "from-emerald-500 to-teal-500", rating: 5 },
  { name: "Sofia M.", roleJa: "グロースPM", roleEn: "Growth PM", textJa: "導入後、料金ページのコンバージョンが18%向上した。", textEn: "Conversion on our pricing page jumped 18% after we shipped it.", hue: "from-amber-500 to-orange-500", rating: 5 },
  { name: "小林 彩", roleJa: "マーケター", roleEn: "Marketer", textJa: "サポートの返信が早すぎて逆に申し訳ない。安心して任せられる。", textEn: "Support replies so fast I almost feel guilty. I can rely on them completely.", hue: "from-violet-500 to-fuchsia-500", rating: 4 },
  { name: "Liam T.", roleJa: "インディーハッカー", roleEn: "Indie Hacker", textJa: "3つのツールを1つに統合できた。週末が自分のものに戻った。", textEn: "Replaced three tools with one. My weekends are mine again.", hue: "from-cyan-500 to-blue-500", rating: 5 },
];

function initials(name: string) {
  const p = name.trim().split(/\s+/);
  return (p[0]?.[0] ?? "") + (p[1]?.[0] ?? "");
}

export default function TestimonialWall() {
  const en =
    typeof document !== "undefined" &&
    document.documentElement.lang === "en";
  return (
    <section className="w-full px-6 py-10">
      <div className="mx-auto max-w-5xl">
        <div className="mb-7 flex flex-col items-center gap-2 text-center">
          <div className="flex items-center gap-1 text-amber-400">
            {Array.from({ length: 5 }).map((_, i) => (
              <Star key={i} className="size-4 fill-current" />
            ))}
          </div>
          <h2 className="text-balance text-2xl font-semibold tracking-tight">
            {en ? "2,800+ five-star reviews" : "2,800件以上の高評価レビュー"}
          </h2>
          <p className="text-sm text-muted-foreground">
            {en
              ? "Hear from the teams who use it every day."
              : "実際に使っているチームの声をご覧ください。"}
          </p>
        </div>

        <div className="columns-1 gap-4 sm:columns-2 lg:columns-3 [&>*]:mb-4">
          {REVIEWS.map((r) => (
            <figure
              key={r.name}
              className="break-inside-avoid rounded-2xl border bg-card p-4 shadow-sm transition-colors hover:bg-muted/30"
            >
              <div className="mb-2 flex items-center gap-1 text-amber-400">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star
                    key={i}
                    className={cn(
                      "size-3.5",
                      i < r.rating ? "fill-current" : "text-muted-foreground/30"
                    )}
                  />
                ))}
              </div>
              <blockquote className="text-sm leading-relaxed text-foreground/90">
                {en ? r.textEn : r.textJa}
              </blockquote>
              <figcaption className="mt-4 flex items-center gap-2.5">
                <span
                  className={cn(
                    "grid size-9 shrink-0 place-items-center rounded-full bg-gradient-to-br text-xs font-semibold text-white",
                    r.hue
                  )}
                >
                  {initials(r.name)}
                </span>
                <div className="min-w-0">
                  <p className="flex items-center gap-1 text-sm font-medium">
                    <span className="truncate">{r.name}</span>
                    <BadgeCheck className="size-3.5 shrink-0 text-sky-500" />
                  </p>
                  <p className="truncate text-xs text-muted-foreground">
                    {en ? r.roleEn : r.roleJa}
                  </p>
                </div>
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}
