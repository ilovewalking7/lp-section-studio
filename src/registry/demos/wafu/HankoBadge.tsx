import type { DemoMeta } from "@/registry";

export const meta: DemoMeta = {
  name: "印鑑バッジ",
  category: "和風",
  description: "朱の印鑑・認定シール。円形SVGに篆書風の縦テキストを配した落款モチーフ。",
  align: "center",
  isNew: true,
  tags: ["和風", "japanese", "badge", "hanko", "seal"],
  principle: "朱の落款は本物の証。手押しの不揃いと篆書の格式が信頼と権威を一目で伝える。",
};

function SealRing() {
  return (
    <svg viewBox="0 0 200 200" className="absolute inset-0 h-full w-full" aria-hidden>
      <circle
        cx="100"
        cy="100"
        r="92"
        fill="none"
        stroke="#b7410e"
        strokeWidth="7"
      />
      <circle
        cx="100"
        cy="100"
        r="80"
        fill="none"
        stroke="#b7410e"
        strokeWidth="2"
        strokeDasharray="2 6"
        opacity="0.7"
      />
      {/* 中央の十字仕切り（篆刻風） */}
      <line x1="100" y1="22" x2="100" y2="178" stroke="#b7410e" strokeWidth="2" opacity="0.45" />
    </svg>
  );
}

export default function HankoBadge() {
  const en =
    typeof document !== "undefined" &&
    document.documentElement.lang === "en";
  return (
    <div className="flex flex-col items-center gap-6 bg-[#f5f1e8] p-10">
      <div className="relative size-44 select-none">
        <SealRing />
        {/* 篆書風の縦書き二行 */}
        <div className="absolute inset-0 flex items-center justify-center gap-3 [writing-mode:vertical-rl]">
          {en ? (
            <span className="font-mincho text-2xl font-bold tracking-[0.25em] text-[#b7410e]">
              SEAL OF OKUYAMA
            </span>
          ) : (
            <>
              <span className="font-mincho text-3xl font-bold tracking-[0.35em] text-[#b7410e]">
                奥山
              </span>
              <span className="font-mincho text-3xl font-bold tracking-[0.35em] text-[#b7410e]">
                之印
              </span>
            </>
          )}
        </div>
      </div>

      <p className="font-mincho text-sm tracking-[0.3em] text-stone-600">
        {en
          ? "CERTIFIED HERITAGE · ESTABLISHED OVER 110 YEARS AGO"
          : "老舗 認定 ・ 創業百十余年"}
      </p>
    </div>
  );
}
