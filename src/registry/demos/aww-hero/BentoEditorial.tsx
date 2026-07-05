import type { DemoMeta } from "@/registry";
import { ArrowUpRight, Sparkles, Zap, Globe } from "lucide-react";

export const meta: DemoMeta = {
  name: "ベントーエディトリアル",
  category: "Awwwards",
  description:
    "大小のセルを組み合わせたベントーグリッドで、ヒーローとコンテンツを一画面に圧縮した構成。",
  align: "full",
  isNew: true,
  tags: ["awwwards", "hero", "animation"],
};

export default function BentoEditorial() {
  const en =
    typeof document !== "undefined" &&
    document.documentElement.lang === "en";
  return (
    <section className="aww-be w-full bg-[#0b0b10] px-5 py-16 text-white sm:px-10 sm:py-20">
      <style>{`
        @keyframes aww-be-in { from{opacity:0;transform:translateY(22px) scale(.98);} to{opacity:1;transform:translateY(0) scale(1);} }
        .aww-be-cell{ animation: aww-be-in .8s cubic-bezier(.16,1,.3,1) both; transition: transform .35s ease, box-shadow .35s ease; }
        .aww-be-cell:hover{ transform: translateY(-4px); }
        @media (prefers-reduced-motion: reduce){ .aww-be-cell{ animation:none!important; } }
      `}</style>

      <div className="mx-auto grid max-w-[1500px] auto-rows-[minmax(150px,auto)] grid-cols-2 gap-4 lg:grid-cols-4">
        {/* hero cell */}
        <div
          className="aww-be-cell relative col-span-2 row-span-2 flex flex-col justify-between overflow-hidden rounded-[1.5rem] p-7 ring-1 ring-white/10 sm:p-9"
          style={{ background: "linear-gradient(135deg,#4f46e5,#9333ea,#db2777)" }}
        >
          <div className="absolute -right-10 -top-10 h-44 w-44 rounded-full bg-white/20 blur-2xl" />
          <span className="relative text-[11px] font-semibold uppercase tracking-[0.4em] text-white/70">
            Bento Studio
          </span>
          <h1
            className="relative font-black leading-[0.88] tracking-[-0.03em]"
            style={{ fontSize: "clamp(2rem,5vw,4.5rem)" }}
          >
            {en ? (
              <>
                Say it all
                <br />
                on one screen.
              </>
            ) : (
              <>
                一画面で
                <br />
                語り尽くす。
              </>
            )}
          </h1>
        </div>

        <div className="aww-be-cell flex flex-col justify-between rounded-[1.5rem] bg-[#15151d] p-6 ring-1 ring-white/10" style={{ animationDelay: ".08s" }}>
          <Sparkles className="size-6 text-amber-300" />
          <div>
            <div className="text-3xl font-black tracking-tight">260+</div>
            <div className="text-xs text-white/50">Components</div>
          </div>
        </div>

        <div className="aww-be-cell flex flex-col justify-between rounded-[1.5rem] bg-[linear-gradient(135deg,#0891b2,#22d3ee)] p-6 ring-1 ring-white/10 text-[#04222a]" style={{ animationDelay: ".14s" }}>
          <Zap className="size-6" />
          <div>
            <div className="text-3xl font-black tracking-tight">0ms</div>
            <div className="text-xs opacity-70">External calls</div>
          </div>
        </div>

        <div className="aww-be-cell col-span-2 flex items-center justify-between rounded-[1.5rem] bg-[#15151d] p-6 ring-1 ring-white/10" style={{ animationDelay: ".2s" }}>
          <div>
            <div className="flex items-center gap-2 text-sm font-semibold">
              <Globe className="size-4 text-emerald-300" /> Worldwide ready
            </div>
            <p className="mt-2 max-w-xs text-xs text-white/50">
              {en
                ? "Responsive, with dark and light support. It fits in anywhere you place it."
                : "レスポンシブとダーク/ライト両対応。どこに置いても馴染む。"}
            </p>
          </div>
          <button className="group flex size-11 items-center justify-center rounded-full bg-white text-black">
            <ArrowUpRight className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </button>
        </div>
      </div>
    </section>
  );
}
