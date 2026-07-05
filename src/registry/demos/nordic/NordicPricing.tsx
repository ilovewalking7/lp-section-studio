import type { DemoMeta } from "@/registry";

export const meta: DemoMeta = {
  name: "北欧プライシング",
  category: "北欧",
  description: "やわらかくミニマルな料金カード3種。",
  align: "full",
  isNew: true,
  tags: ["nordic", "scandinavian", "hygge"],
  principle: "中央プランを淡く強調し、選択の負担を減らしつつ推奨を伝える。",
};

const plans = [
  {
    nameJa: "そよ風",
    nameEn: "Breeze",
    sub: "Breeze",
    price: "0",
    noteJa: "はじめての方に",
    noteEn: "For newcomers",
    featuresJa: ["基本のコレクション", "季節のニュースレター", "コミュニティ参加"],
    featuresEn: ["Core collection", "Seasonal newsletter", "Community access"],
    accent: "#8a9a7b",
    featured: false,
  },
  {
    nameJa: "暖炉",
    nameEn: "Hearth",
    sub: "Hearth",
    price: "12",
    noteJa: "いちばん人気",
    noteEn: "Most popular",
    featuresJa: ["すべての基本機能", "限定アイテムの先行案内", "ギフトラッピング", "送料無料"],
    featuresEn: ["Everything in Breeze", "Early access to limited items", "Gift wrapping", "Free shipping"],
    accent: "#c08457",
    featured: true,
  },
  {
    nameJa: "森の家",
    nameEn: "Cabin",
    sub: "Cabin",
    price: "29",
    noteJa: "暮らしまるごと",
    noteEn: "The whole home",
    featuresJa: ["すべての暖炉プラン", "専属スタイリスト", "年4回のアトリエ招待"],
    featuresEn: ["Everything in Hearth", "Personal stylist", "Quarterly atelier invites"],
    accent: "#7d92a3",
    featured: false,
  },
];

export default function NordicPricing() {
  const en =
    typeof document !== "undefined" &&
    document.documentElement.lang === "en";
  return (
    <section className="w-full bg-[#f4f1ea] font-sans text-[#3a3a38]">
      <div className="mx-auto max-w-6xl px-6 py-24">
        <div className="mx-auto max-w-xl text-center">
          <h2 className="text-3xl font-medium tracking-tight md:text-4xl">
            {en ? "Just right for the way you live." : "あなたの暮らしに、ちょうどよく。"}
          </h2>
          <p className="mt-4 text-[#3a3a38]/65">
            {en
              ? "Three simple plans to start without pressure — change anytime."
              : "気負わず始められる、シンプルな3つのプラン。いつでも変更できます。"}
          </p>
        </div>

        <div className="mt-16 grid gap-6 md:grid-cols-3">
          {plans.map((p) => (
            <div
              key={p.sub}
              className={
                "flex flex-col rounded-[1.75rem] p-8 transition-shadow " +
                (p.featured
                  ? "bg-[#faf8f3] shadow-[0_30px_70px_-40px_rgba(192,132,87,0.55)] ring-1 ring-[#c08457]/30"
                  : "bg-[#faf8f3]/60 ring-1 ring-[#3a3a38]/[0.06] hover:shadow-[0_24px_60px_-44px_rgba(58,58,56,0.4)]")
              }
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-lg font-medium">{en ? p.nameEn : p.nameJa}</p>
                  <p className="text-[11px] uppercase tracking-[0.2em] text-[#3a3a38]/45">
                    {p.sub}
                  </p>
                </div>
                <span
                  className="rounded-full px-3 py-1 text-[11px] font-medium"
                  style={{ backgroundColor: p.accent + "1a", color: p.accent }}
                >
                  {en ? p.noteEn : p.noteJa}
                </span>
              </div>

              <div className="mt-6 flex items-baseline gap-1">
                <span className="text-5xl font-light tracking-tight">¥{p.price}</span>
                <span className="text-sm text-[#3a3a38]/50">{en ? "/mo" : "/月"}</span>
              </div>

              <ul className="mt-8 space-y-3 text-sm text-[#3a3a38]/75">
                {(en ? p.featuresEn : p.featuresJa).map((f) => (
                  <li key={f} className="flex items-center gap-3">
                    <span
                      className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full"
                      style={{ backgroundColor: p.accent + "22" }}
                    >
                      <svg viewBox="0 0 24 24" className="h-3 w-3" fill="none" stroke={p.accent} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M5 12l5 5L20 7" />
                      </svg>
                    </span>
                    {f}
                  </li>
                ))}
              </ul>

              <button
                className={
                  "mt-9 w-full rounded-full py-3 text-sm font-medium transition-colors " +
                  (p.featured
                    ? "bg-[#3a3a38] text-[#f4f1ea] hover:bg-[#3a3a38]/90"
                    : "bg-transparent text-[#3a3a38] ring-1 ring-[#3a3a38]/15 hover:bg-[#3a3a38]/[0.04]")
                }
              >
                {en ? "Choose this plan" : "このプランを選ぶ"}
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
