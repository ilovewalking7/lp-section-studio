import type { DemoMeta } from "@/registry";
import { ArrowRight } from "lucide-react";

export const meta: DemoMeta = {
  name: "横スクロールギャラリー",
  category: "Awwwards",
  description:
    "横方向にスナップしながら流れる作品ギャラリー。グラデーションのみで描いたフルブリードのカード群。",
  align: "full",
  isNew: true,
  tags: ["awwwards", "hero", "animation"],
};

const ITEMS = [
  { n: "01", t: "Nebula", bg: "linear-gradient(135deg,#4338ca,#7c3aed,#db2777)" },
  { n: "02", t: "Ember", bg: "linear-gradient(135deg,#b91c1c,#ea580c,#f59e0b)" },
  { n: "03", t: "Lagoon", bg: "linear-gradient(135deg,#0e7490,#06b6d4,#34d399)" },
  { n: "04", t: "Orchid", bg: "linear-gradient(135deg,#7e22ce,#c026d3,#f472b6)" },
  { n: "05", t: "Mono", bg: "linear-gradient(135deg,#111827,#374151,#9ca3af)" },
];

export default function HorizontalScrollGallery() {
  return (
    <section className="aww-hs w-full overflow-hidden bg-[#0b0b10] py-16 text-white">
      <style>{`
        .aww-hs-track::-webkit-scrollbar{ height:0; }
        .aww-hs-track{ scrollbar-width:none; }
      `}</style>
      <div className="mx-auto max-w-[1500px] px-5 sm:px-10">
        <div className="mb-8 flex items-end justify-between">
          <h2
            className="font-black leading-[0.9] tracking-[-0.03em]"
            style={{ fontSize: "clamp(2rem,6vw,4.5rem)" }}
          >
            Selected
            <br />
            <span className="text-white/40">Works ’26</span>
          </h2>
          <span className="hidden items-center gap-2 text-xs font-semibold uppercase tracking-widest text-white/40 sm:flex">
            Drag / Scroll <ArrowRight className="size-4" />
          </span>
        </div>
      </div>

      <div className="aww-hs-track flex snap-x snap-mandatory gap-5 overflow-x-auto px-5 pb-4 sm:px-10">
        {ITEMS.map((it) => (
          <article
            key={it.n}
            className="group relative aspect-[3/4] w-[78vw] flex-none snap-center overflow-hidden rounded-[1.5rem] ring-1 ring-white/10 sm:w-[42vw] lg:w-[30vw]"
            style={{ background: it.bg }}
          >
            <div className="absolute inset-0 bg-black/0 transition-colors duration-500 group-hover:bg-black/20" />
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_120%,transparent,rgba(0,0,0,0.5))]" />
            <div className="absolute left-6 top-6 text-sm font-black tracking-[0.3em] text-white/80">
              {it.n}
            </div>
            <div className="absolute bottom-6 left-6 right-6 flex items-end justify-between">
              <h3 className="text-2xl font-black tracking-tight">{it.t}</h3>
              <span className="translate-y-2 rounded-full bg-white/20 p-2.5 opacity-0 backdrop-blur transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100">
                <ArrowRight className="size-4" />
              </span>
            </div>
          </article>
        ))}
        <div className="w-2 flex-none sm:w-6" aria-hidden="true" />
      </div>
    </section>
  );
}
