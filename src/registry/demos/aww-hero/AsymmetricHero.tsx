import type { DemoMeta } from "@/registry";
import { ArrowDownRight } from "lucide-react";

export const meta: DemoMeta = {
  name: "非対称グリッドヒーロー",
  category: "Awwwards",
  description:
    "崩したグリッドと余白の偏りで緊張感を作る、非対称レイアウトのエディトリアルヒーロー。",
  align: "full",
  isNew: true,
  tags: ["awwwards", "hero", "animation"],
};

export default function AsymmetricHero() {
  const en =
    typeof document !== "undefined" &&
    document.documentElement.lang === "en";
  return (
    <section className="aww-as relative w-full overflow-hidden bg-[#f4f1ea] px-5 py-20 text-[#16130f] sm:px-10 sm:py-24">
      <style>{`
        @keyframes aww-as-in {
          from { opacity:0; transform: translateY(30px) rotate(-1deg); }
          to { opacity:1; transform: translateY(0) rotate(0); }
        }
        .aww-as-in { animation: aww-as-in .9s cubic-bezier(.16,1,.3,1) both; }
        @media (prefers-reduced-motion: reduce) { .aww-as-in { animation: none !important; } }
      `}</style>

      <div className="relative mx-auto grid max-w-[1500px] grid-cols-12 gap-4">
        <div className="aww-as-in col-span-12 lg:col-span-7 lg:col-start-1">
          <span className="inline-block rounded-full bg-[#16130f] px-4 py-1.5 text-[11px] font-semibold uppercase tracking-[0.3em] text-[#f4f1ea]">
            Editorial 26
          </span>
          <h1
            className="mt-8 font-black leading-[0.86] tracking-[-0.04em]"
            style={{ fontSize: "clamp(2.8rem,10vw,8.5rem)" }}
          >
            {en ? (
              <>
                Space is
                <span className="ml-[12vw] block text-[#e0532e]">the</span>
                <span className="block">language of silence.</span>
              </>
            ) : (
              <>
                余白は
                <span className="ml-[12vw] block text-[#e0532e]">沈黙</span>
                <span className="block">の言語。</span>
              </>
            )}
          </h1>
        </div>

        <div
          className="aww-as-in col-span-12 mt-6 lg:col-span-3 lg:col-start-9 lg:mt-32"
          style={{ animationDelay: ".15s" }}
        >
          <p className="text-base leading-relaxed text-[#4a443c]">
            {en
              ? "Deliberately breaking an orderly grid. Creating steps in the flow of the eye gives the screen breath and rhythm."
              : "整然としたグリッドをあえて崩す。視線の流れに段差を作ることで、画面に呼吸とリズムが生まれる。"}
          </p>
          <button className="group mt-7 inline-flex items-center gap-2 text-sm font-bold uppercase tracking-widest">
            <span className="border-b-2 border-[#16130f] pb-0.5">Scroll</span>
            <ArrowDownRight className="transition-transform group-hover:translate-x-1 group-hover:translate-y-1" />
          </button>
        </div>

        <div
          className="aww-as-in col-span-7 mt-10 aspect-[16/7] rounded-2xl bg-[linear-gradient(120deg,#e0532e,#f4a261)] lg:col-span-4 lg:col-start-2"
          style={{ animationDelay: ".25s" }}
        />
        <div
          className="aww-as-in col-span-5 mt-10 aspect-[16/7] rounded-2xl border-2 border-[#16130f] lg:col-span-3 lg:col-start-10"
          style={{ animationDelay: ".32s" }}
        >
          <div className="flex h-full items-center justify-center text-[clamp(2rem,5vw,4rem)] font-black tracking-tighter">
            ’26
          </div>
        </div>
      </div>
    </section>
  );
}
