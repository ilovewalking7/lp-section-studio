import type { DemoMeta } from "@/registry";

export const meta: DemoMeta = {
  name: "スティッキー重なりセクション",
  category: "Awwwards",
  description:
    "スクロールするとカードが順に固定され重なっていく、position:stickyによる積層スクロール演出。",
  align: "full",
  isNew: true,
  tags: ["awwwards", "hero", "animation"],
};

const PANELS = [
  { t: "01", h: "発見", hEn: "Discover", d: "ユーザーの文脈を深く観察し、本質的な課題を見極める。", dEn: "Observe the user's context deeply to pinpoint the essential problem.", bg: "linear-gradient(135deg,#0f172a,#1e293b)", ac: "#38bdf8" },
  { t: "02", h: "設計", hEn: "Design", d: "情報の階層と動きを定義し、体験の骨格を組み立てる。", dEn: "Define information hierarchy and motion to frame the experience.", bg: "linear-gradient(135deg,#1e1b4b,#4c1d95)", ac: "#c084fc" },
  { t: "03", h: "構築", hEn: "Build", d: "ピクセル単位で磨き上げ、滑らかな実装へ落とし込む。", dEn: "Polish to the pixel and translate it into a smooth implementation.", bg: "linear-gradient(135deg,#3b0764,#831843)", ac: "#f472b6" },
  { t: "04", h: "公開", hEn: "Launch", d: "計測し、学び、磨き続ける。プロダクトは終わらない。", dEn: "Measure, learn, and keep refining. A product is never finished.", bg: "linear-gradient(135deg,#7c2d12,#b45309)", ac: "#fbbf24" },
];

export default function StickyOverlapSections() {
  const en =
    typeof document !== "undefined" &&
    document.documentElement.lang === "en";
  return (
    <section className="aww-st w-full bg-[#08070c]">
      <div className="mx-auto max-w-[1100px] px-5 py-16 sm:px-10">
        <p className="mb-10 text-center text-[11px] font-semibold uppercase tracking-[0.5em] text-white/40">
          Scroll — Sticky Stack
        </p>
        <div className="space-y-6">
          {PANELS.map((p, i) => (
            <div
              key={p.t}
              className="sticky overflow-hidden rounded-[1.75rem] p-8 text-white shadow-2xl ring-1 ring-white/10 sm:p-12"
              style={{ top: `${4 + i * 1.5}rem`, background: p.bg }}
            >
              <div
                className="absolute -right-16 -top-16 h-56 w-56 rounded-full opacity-50 blur-2xl"
                style={{ background: p.ac }}
              />
              <div className="relative flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
                <div>
                  <span
                    className="text-sm font-black uppercase tracking-[0.3em]"
                    style={{ color: p.ac }}
                  >
                    {p.t}
                  </span>
                  <h3
                    className="mt-3 font-black leading-none tracking-[-0.03em]"
                    style={{ fontSize: "clamp(2.2rem,6vw,4.5rem)" }}
                  >
                    {en ? p.hEn : p.h}
                  </h3>
                </div>
                <p className="max-w-sm text-sm leading-relaxed text-white/70">
                  {en ? p.dEn : p.d}
                </p>
              </div>
            </div>
          ))}
        </div>
        <p className="py-16 text-center text-sm text-white/30">
          {en
            ? "Each panel pins in turn and naturally stacks on top."
            : "各パネルが順に固定され、自然に重なっていきます。"}
        </p>
      </div>
    </section>
  );
}
