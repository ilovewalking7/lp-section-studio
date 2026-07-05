import { useState } from "react";
import { Heart } from "lucide-react";
import { cn } from "@/lib/utils";
import type { DemoMeta } from "@/registry";

export const meta: DemoMeta = {
  name: "ジュエリー・カード",
  category: "ラグジュアリー",
  description: "SVG の宝石を据えた、金の価格表示を持つジュエリー商品カード。",
  align: "center",
  isNew: true,
  tags: ["luxury", "premium", "gold", "jewelry"],
  principle: "黒の余白に一粒の輝きを置くことで、宝石そのものへ視線と価値を集中させる。",
};

export default function JewelryCard() {
  const en =
    typeof document !== "undefined" &&
    document.documentElement.lang === "en";
  const [liked, setLiked] = useState(false);

  return (
    <div className="w-full max-w-xs bg-[#0a0a0a] p-5 text-stone-100">
      <div className="border border-amber-400/20">
        <div className="relative flex aspect-square items-center justify-center overflow-hidden bg-gradient-to-b from-[#161616] to-[#0c0c0c]">
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(217,179,90,0.16),transparent_65%)]" />
          <span className="absolute left-4 top-4 text-[10px] uppercase tracking-[0.3em] text-amber-300/80">
            Solitaire
          </span>
          <button
            onClick={() => setLiked((v) => !v)}
            aria-label={en ? "Add to favorites" : "お気に入り"}
            className="absolute right-3 top-3 flex h-8 w-8 items-center justify-center rounded-full border border-stone-700 text-stone-400 transition-colors hover:border-amber-400/40 hover:text-amber-300"
          >
            <Heart className={cn("h-4 w-4", liked && "fill-amber-400 text-amber-400")} />
          </button>

          <Gem className="relative h-40 w-40 drop-shadow-[0_0_20px_rgba(217,179,90,0.35)]" />
        </div>

        <div className="space-y-4 p-6 text-center">
          <p className="text-[10px] uppercase tracking-[0.35em] text-stone-500">
            18K Gold · 1.2ct
          </p>
          <h3 className="font-display text-2xl tracking-tight text-stone-100">
            Étoile Ring
          </h3>

          <div className="flex items-center justify-center gap-3">
            <span className="h-px w-8 bg-amber-400/40" />
            <span className="text-[11px] tracking-[0.2em] text-stone-500">
              VVS1
            </span>
            <span className="h-px w-8 bg-amber-400/40" />
          </div>

          <p className="bg-gradient-to-r from-amber-200 via-yellow-400 to-amber-500 bg-clip-text font-display text-3xl text-transparent">
            ¥1,480,000
          </p>

          <button className="group relative w-full overflow-hidden border border-amber-400/40 py-3 text-[11px] uppercase tracking-[0.3em] text-amber-200 transition-colors hover:text-[#0a0a0a]">
            <span className="absolute inset-0 -translate-x-full bg-gradient-to-r from-amber-200 via-yellow-400 to-amber-500 transition-transform duration-500 group-hover:translate-x-0" />
            <span className="relative">{en ? "Enquire" : "問い合わせる"}</span>
          </button>
        </div>
      </div>
    </div>
  );
}

function Gem({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 100 100" className={className} aria-hidden="true">
      <defs>
        <linearGradient id="jc-gem" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#fef3c7" />
          <stop offset="45%" stopColor="#facc15" />
          <stop offset="100%" stopColor="#b45309" />
        </linearGradient>
      </defs>
      <g
        fill="none"
        stroke="url(#jc-gem)"
        strokeWidth="1.4"
        strokeLinejoin="round"
      >
        {/* テーブル */}
        <polygon points="50,18 68,32 50,42 32,32" fill="url(#jc-gem)" opacity="0.55" />
        {/* クラウン */}
        <polygon points="32,32 68,32 78,44 22,44" />
        {/* パビリオン */}
        <polygon points="22,44 78,44 50,86" fill="url(#jc-gem)" opacity="0.18" />
        {/* ファセット */}
        <line x1="50" y1="42" x2="22" y2="44" />
        <line x1="50" y1="42" x2="78" y2="44" />
        <line x1="50" y1="42" x2="50" y2="86" />
        <line x1="32" y1="32" x2="50" y2="42" />
        <line x1="68" y1="32" x2="50" y2="42" />
        <line x1="22" y1="44" x2="40" y2="62" />
        <line x1="78" y1="44" x2="60" y2="62" />
      </g>
    </svg>
  );
}
