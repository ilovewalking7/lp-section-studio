import type { DemoMeta } from "@/registry";
import { Sparkles, Flame, Star, Tag } from "lucide-react";

export const meta: DemoMeta = {
  name: "メンフィス・バッジ集",
  category: "メンフィス",
  description: "幾何学バッジ・タグとパターンスウォッチのセット。",
  align: "center",
  isNew: true,
  tags: ["memphis", "geometric", "80s"],
};

/** パターンスウォッチ（背景パターンの見本タイル） */
function Swatch({ children, label }: { children: React.ReactNode; label: string }) {
  return (
    <div className="flex flex-col items-center gap-1.5">
      <div className="relative h-16 w-16 overflow-hidden rounded-xl border-[3px] border-black bg-white shadow-[3px_3px_0_0_#000]">
        {children}
      </div>
      <span className="text-[10px] font-black uppercase tracking-wide text-black/60">{label}</span>
    </div>
  );
}

export default function MemphisBadgeSet() {
  const en =
    typeof document !== "undefined" &&
    document.documentElement.lang === "en";
  return (
    <div className="w-full max-w-md rounded-2xl border-[3px] border-black bg-[#fdf6e3] p-8 shadow-[7px_7px_0_0_#000]">
      {/* バッジ・タグ */}
      <h3 className="mb-4 text-xs font-black uppercase tracking-widest text-black/50">{en ? "Badges & Tags" : "バッジ & タグ"}</h3>
      <div className="flex flex-wrap gap-2.5">
        <span className="inline-flex items-center gap-1 rounded-full border-[3px] border-black bg-[#ff5c8a] px-3 py-1 text-xs font-black uppercase text-white shadow-[2px_2px_0_0_#000]">
          <Flame className="size-3.5" strokeWidth={3} />
          {en ? "Hot" : "話題"}
        </span>
        <span className="inline-flex items-center gap-1 -rotate-2 rounded-md border-[3px] border-black bg-[#ffd23f] px-3 py-1 text-xs font-black uppercase shadow-[2px_2px_0_0_#000]">
          <Star className="size-3.5" strokeWidth={3} />
          {en ? "Pick" : "おすすめ"}
        </span>
        <span className="inline-flex items-center gap-1 rounded-full border-[3px] border-black bg-[#1fb6c1] px-3 py-1 text-xs font-black uppercase text-white shadow-[2px_2px_0_0_#000]">
          <Sparkles className="size-3.5" strokeWidth={3} />
          {en ? "New" : "新着"}
        </span>
        <span className="inline-flex items-center gap-1 rotate-2 rounded-md border-[3px] border-black bg-[#7b5cff] px-3 py-1 text-xs font-black uppercase text-white shadow-[2px_2px_0_0_#000]">
          <Tag className="size-3.5" strokeWidth={3} />
          ¥980
        </span>
        <span className="inline-flex items-center rounded-full border-[3px] border-black bg-white px-3 py-1 text-xs font-black uppercase text-black shadow-[2px_2px_0_0_#ff8c42]">
          {en ? "Limited" : "限定"}
        </span>
      </div>

      {/* ステータスドット */}
      <div className="mt-6 flex flex-wrap items-center gap-3">
        {[
          { c: "#1fb6c1", t: "稼働中", en: "Active" },
          { c: "#ffd23f", t: "保留", en: "Pending" },
          { c: "#ff5c8a", t: "停止", en: "Down" },
        ].map((s) => (
          <span key={s.en} className="inline-flex items-center gap-1.5 text-xs font-bold text-black/70">
            <span className="size-3 rounded-full border-2 border-black" style={{ backgroundColor: s.c }} />
            {en ? s.en : s.t}
          </span>
        ))}
      </div>

      {/* パターンスウォッチセット */}
      <h3 className="mb-4 mt-7 text-xs font-black uppercase tracking-widest text-black/50">{en ? "Patterns" : "パターン"}</h3>
      <div className="flex flex-wrap gap-4">
        <Swatch label={en ? "Dots" : "ドット"}>
          <svg viewBox="0 0 64 64" className="h-full w-full" aria-hidden>
            {[0, 1, 2, 3].map((r) =>
              [0, 1, 2, 3].map((c) => (
                <circle key={`${r}-${c}`} cx={10 + c * 15} cy={10 + r * 15} r={3.5} fill="#ff5c8a" />
              ))
            )}
          </svg>
        </Swatch>
        <Swatch label={en ? "Zigzag" : "ジグザグ"}>
          <svg viewBox="0 0 64 64" className="h-full w-full" aria-hidden>
            {[14, 34, 54].map((y) => (
              <path key={y} d={`M2 ${y}L16 ${y - 10}L30 ${y}L44 ${y - 10}L58 ${y}`} stroke="#1fb6c1" strokeWidth={3} fill="none" strokeLinecap="round" strokeLinejoin="round" />
            ))}
          </svg>
        </Swatch>
        <Swatch label={en ? "Stripes" : "ストライプ"}>
          <div className="flex h-full w-full">
            {["#7b5cff", "#fff", "#ffd23f", "#fff", "#ff8c42", "#fff"].map((c, i) => (
              <div key={i} className="flex-1" style={{ backgroundColor: c }} />
            ))}
          </div>
        </Swatch>
        <Swatch label={en ? "Tris" : "トライ"}>
          <svg viewBox="0 0 64 64" className="h-full w-full" aria-hidden>
            {[8, 32, 56].map((x) =>
              [20, 44].map((y) => (
                <path key={`${x}-${y}`} d={`M${x} ${y - 8}L${x + 8} ${y + 6}L${x - 8} ${y + 6}Z`} fill="#ff8c42" stroke="#000" strokeWidth={1.5} />
              ))
            )}
          </svg>
        </Swatch>
      </div>
    </div>
  );
}
