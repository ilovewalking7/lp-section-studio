import type { DemoMeta } from "@/registry";

export const meta: DemoMeta = {
  name: "北欧コンテンツカード",
  category: "北欧",
  description: "ぬくもりのあるコンテンツカード。",
  align: "center",
  isNew: true,
  tags: ["nordic", "scandinavian", "hygge"],
  principle: "やわらかな角丸と淡い影が安心感を与え、読み進めを促す。",
};

export default function NordicCard() {
  const en =
    typeof document !== "undefined" &&
    document.documentElement.lang === "en";
  return (
    <article className="w-full max-w-sm overflow-hidden rounded-[1.75rem] bg-[#faf8f3] font-sans text-[#3a3a38] shadow-[0_30px_70px_-46px_rgba(58,58,56,0.45)]">
      {/* line-art landscape header */}
      <div className="relative h-44 bg-[#eae5d8]">
        <svg viewBox="0 0 400 180" className="absolute inset-0 h-full w-full" fill="none" preserveAspectRatio="xMidYMid slice">
          <circle cx="300" cy="55" r="30" stroke="#c08457" strokeWidth="2" />
          <path d="M0 150 L90 80 L150 130 L230 60 L310 130 L400 90 L400 180 L0 180 Z" fill="#8a9a7b" fillOpacity="0.18" stroke="#8a9a7b" strokeWidth="1.5" />
          <path d="M0 170 L120 120 L220 165 L340 115 L400 150" stroke="#7d92a3" strokeWidth="1.5" opacity="0.5" />
        </svg>
        <span className="absolute left-5 top-5 rounded-full bg-[#faf8f3]/85 px-3 py-1 text-[11px] font-medium uppercase tracking-[0.15em] text-[#8a9a7b] backdrop-blur">
          Journal
        </span>
      </div>

      <div className="p-6">
        <p className="text-xs text-[#3a3a38]/45">
          {en ? "June 2026 · 4 min read" : "2026年6月 · 読了 4分"}
        </p>
        <h3 className="mt-2 text-xl font-medium leading-snug">
          {en
            ? "Light and space: making winter feel warm"
            : "冬を心地よく過ごす、灯りと余白の整え方"}
        </h3>
        <p className="mt-3 text-sm leading-relaxed text-[#3a3a38]/65">
          {en
            ? "In the dark season, cherish the rhythm of daily life. With candlelight and roomy, unhurried spaces, here are small ways to welcome hygge into the home."
            : "暗い季節こそ、暮らしのリズムを大切に。キャンドルの灯りとゆったりとした間取りで、家のなかにhyggeを招き入れる小さな工夫を。"}
        </p>

        <div className="mt-6 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span className="flex h-9 w-9 items-center justify-center rounded-full bg-[#c08457]/15 text-sm font-medium text-[#c08457]">
              A
            </span>
            <div className="text-sm">
              <p className="font-medium">{en ? "Astrid" : "アストリッド"}</p>
              <p className="text-xs text-[#3a3a38]/45">
                {en ? "Editorial" : "編集部"}
              </p>
            </div>
          </div>
          <button className="flex items-center gap-1.5 text-sm font-medium text-[#3a3a38]/70 transition-colors hover:text-[#3a3a38]">
            {en ? "Read more" : "続きを読む"}
            <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M5 12h14M13 6l6 6-6 6" />
            </svg>
          </button>
        </div>
      </div>
    </article>
  );
}
