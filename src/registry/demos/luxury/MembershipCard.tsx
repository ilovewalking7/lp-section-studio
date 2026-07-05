import type { DemoMeta } from "@/registry";

export const meta: DemoMeta = {
  name: "メンバーシップ・カード",
  category: "ラグジュアリー",
  description: "金のチップ SVG を備えた、黒×金の VIP メンバーシップカード。",
  align: "center",
  isNew: true,
  tags: ["luxury", "premium", "gold", "membership"],
  principle: "金属質の質感と刻印風タイポが、手にする者の地位と帰属感を物理的に感じさせる。",
};

export default function MembershipCard() {
  return (
    <div className="w-full max-w-sm p-4">
      <div className="group relative aspect-[1.586] w-full overflow-hidden rounded-2xl border border-amber-400/30 bg-[#0c0c0c] p-6 shadow-[0_20px_60px_-15px_rgba(0,0,0,0.8)]">
        {/* 金の斜めシャイン */}
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top_left,rgba(217,179,90,0.16),transparent_55%)]" />
        <div className="pointer-events-none absolute -inset-x-1/2 -top-1/2 h-[200%] w-[200%] -translate-x-full rotate-12 bg-gradient-to-r from-transparent via-amber-200/15 to-transparent transition-transform duration-1000 group-hover:translate-x-0" />

        <div className="relative flex h-full flex-col justify-between text-stone-100">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-[9px] uppercase tracking-[0.4em] text-amber-300/80">
                Private Member
              </p>
              <p className="mt-1 bg-gradient-to-r from-amber-200 via-yellow-400 to-amber-500 bg-clip-text font-display text-xl tracking-[0.2em] text-transparent">
                AURÉL
              </p>
            </div>
            <Chip className="h-9 w-12" />
          </div>

          <div>
            <p className="font-display text-lg tracking-[0.25em] text-stone-200">
              5412 · 8830 · 4471
            </p>
          </div>

          <div className="flex items-end justify-between">
            <div>
              <p className="text-[8px] uppercase tracking-[0.3em] text-stone-500">
                Member
              </p>
              <p className="mt-0.5 text-sm tracking-[0.15em] text-stone-200">
                YUKI TANAKA
              </p>
            </div>
            <div className="text-right">
              <p className="text-[8px] uppercase tracking-[0.3em] text-stone-500">
                Since
              </p>
              <p className="mt-0.5 text-sm tracking-[0.15em] text-amber-200">
                2019
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function Chip({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 48 36" className={className} aria-hidden="true">
      <defs>
        <linearGradient id="mc-chip" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#fde68a" />
          <stop offset="50%" stopColor="#d4af37" />
          <stop offset="100%" stopColor="#92610a" />
        </linearGradient>
      </defs>
      <rect x="1" y="1" width="46" height="34" rx="5" fill="url(#mc-chip)" />
      <g stroke="#6b4708" strokeWidth="1" opacity="0.7" fill="none">
        <line x1="16" y1="1" x2="16" y2="35" />
        <line x1="32" y1="1" x2="32" y2="35" />
        <line x1="1" y1="13" x2="47" y2="13" />
        <line x1="1" y1="23" x2="47" y2="23" />
        <rect x="16" y="13" width="16" height="10" />
      </g>
    </svg>
  );
}
