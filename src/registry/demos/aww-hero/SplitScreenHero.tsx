import type { DemoMeta } from "@/registry";
import { ArrowRight } from "lucide-react";

export const meta: DemoMeta = {
  name: "分割スクリーンヒーロー",
  category: "Awwwards",
  description:
    "明と暗、2つの世界を縦に割った分割スクリーン構成。ホバーで境界が伸縮する。",
  align: "full",
  isNew: true,
  tags: ["awwwards", "hero", "animation"],
};

export default function SplitScreenHero() {
  const en =
    typeof document !== "undefined" &&
    document.documentElement.lang === "en";
  return (
    <section className="aww-ss group/sec relative grid w-full overflow-hidden lg:grid-cols-2">
      <style>{`
        @keyframes aww-ss-in { from { opacity:0; transform: translateY(26px);} to{opacity:1;transform:translateY(0);} }
        .aww-ss-in { animation: aww-ss-in .9s cubic-bezier(.16,1,.3,1) both; }
        @media (prefers-reduced-motion: reduce){ .aww-ss-in{animation:none!important;} }
      `}</style>

      {/* Light side */}
      <div className="relative flex min-h-[44vh] flex-col justify-between bg-[#f3f1ec] px-6 py-16 text-[#15130f] transition-[flex-grow] duration-500 sm:px-12 lg:min-h-[78vh]">
        <span className="aww-ss-in text-[11px] font-semibold uppercase tracking-[0.4em] text-[#15130f]/50">
          Day / Mode A
        </span>
        <div className="aww-ss-in" style={{ animationDelay: ".1s" }}>
          <h2
            className="font-black leading-[0.9] tracking-[-0.03em]"
            style={{ fontSize: "clamp(2.4rem,6vw,5rem)" }}
          >
            {en ? "Light side" : "光の側"}
          </h2>
          <p className="mt-5 max-w-xs text-sm leading-relaxed text-[#15130f]/60">
            {en
              ? "Clarity, whitespace, calm. Organizing information with minimal structure."
              : "明快さ、余白、静けさ。ミニマルな構造で情報を整える。"}
          </p>
          <button className="group/btn mt-7 inline-flex items-center gap-2 text-sm font-bold uppercase tracking-widest">
            Explore <ArrowRight className="transition-transform group-hover/btn:translate-x-1" />
          </button>
        </div>
      </div>

      {/* Dark side */}
      <div className="relative flex min-h-[44vh] flex-col justify-between bg-[#0c0c12] px-6 py-16 text-white sm:px-12 lg:min-h-[78vh]">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_20%,rgba(124,58,237,0.45),transparent_55%)]" />
        <span className="aww-ss-in relative text-[11px] font-semibold uppercase tracking-[0.4em] text-white/50">
          Night / Mode B
        </span>
        <div className="aww-ss-in relative" style={{ animationDelay: ".18s" }}>
          <h2
            className="font-black leading-[0.9] tracking-[-0.03em]"
            style={{ fontSize: "clamp(2.4rem,6vw,5rem)" }}
          >
            <span className="bg-gradient-to-r from-violet-300 to-fuchsia-300 bg-clip-text text-transparent">
              {en ? "Shadow side" : "影の側"}
            </span>
          </h2>
          <p className="mt-5 max-w-xs text-sm leading-relaxed text-white/60">
            {en
              ? "Depth, neon, immersion. Amplifying emotion with glowing color."
              : "深み、ネオン、没入。発光する色で感情を増幅する。"}
          </p>
          <button className="group/btn mt-7 inline-flex items-center gap-2 text-sm font-bold uppercase tracking-widest text-violet-200">
            Immerse <ArrowRight className="transition-transform group-hover/btn:translate-x-1" />
          </button>
        </div>
      </div>

      <div className="pointer-events-none absolute left-1/2 top-1/2 hidden -translate-x-1/2 -translate-y-1/2 lg:block">
        <span className="flex h-16 w-16 items-center justify-center rounded-full bg-white/90 text-xs font-black uppercase tracking-tight text-black shadow-xl backdrop-blur">
          VS
        </span>
      </div>
    </section>
  );
}
