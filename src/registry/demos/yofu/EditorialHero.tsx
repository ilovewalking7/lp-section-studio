import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import type { DemoMeta } from "@/registry";

export const meta: DemoMeta = {
  name: "エディトリアルヒーロー",
  category: "洋風",
  description: "マガジン風のヒーロー。大きな Playfair 見出しにイタリック差し、細い罫線で構成。",
  align: "full",
  isNew: true,
  tags: ["洋風", "editorial", "luxury", "hero"],
  principle: "セリフ大見出しと余白の対比で『高級誌』の格を一瞬で伝える。",
};

export default function EditorialHero() {
  const en =
    typeof document !== "undefined" &&
    document.documentElement.lang === "en";
  return (
    <section className="w-full bg-[#f8f5ef] text-stone-800">
      <div className="mx-auto max-w-6xl px-6 py-16 sm:py-24">
        <div className="flex items-center justify-between border-b border-stone-300 pb-5">
          <span className="font-display text-lg italic tracking-tight text-stone-900">
            La Maison
          </span>
          <div className="hidden items-center gap-8 text-[11px] uppercase tracking-[0.25em] text-stone-500 sm:flex">
            <span>Collection</span>
            <span>Atelier</span>
            <span>Journal</span>
          </div>
          <span className="text-[11px] uppercase tracking-[0.25em] text-amber-700">
            Vol. XII
          </span>
        </div>

        <div className="grid grid-cols-1 items-end gap-12 pt-12 lg:grid-cols-[1.4fr_1fr]">
          <div>
            <p className="mb-6 text-[11px] uppercase tracking-[0.4em] text-amber-700">
              The Spring Editorial
            </p>
            <h1 className="font-display text-5xl leading-[1.05] tracking-tight text-stone-900 sm:text-7xl">
              The Art of{" "}
              <span className="italic text-[#7b2d3a]">Quiet</span>
              <br />
              Luxury &amp; Form
            </h1>
            <div className="mt-8 flex items-center gap-4">
              <span className="h-px w-16 bg-amber-600" />
              <p className="max-w-md text-sm leading-relaxed text-stone-600">
                {en
                  ? "Materials and tailoring loved across the ages. A volume that unfolds a serene, sensual collection where the artisan's hand lives on."
                  : "時を超えて愛される素材と仕立て。職人の手仕事が宿る、静謐で官能的なコレクションを紐解く一冊。"}
              </p>
            </div>
            <div className="mt-10 flex flex-wrap items-center gap-5">
              <Button className="group h-11 rounded-none bg-stone-900 px-8 text-[11px] uppercase tracking-[0.25em] text-[#f8f5ef] hover:bg-stone-800">
                Read the Story
                <ArrowRight className="transition-transform group-hover:translate-x-1" />
              </Button>
              <span className="font-display text-sm italic text-stone-500">
                — Paris · Milano · Kyoto
              </span>
            </div>
          </div>

          <figure className="relative">
            <div className="aspect-[3/4] w-full overflow-hidden border border-stone-300 bg-gradient-to-br from-[#efe7d6] via-[#f3ede1] to-[#e6dcc6]">
              <div className="flex h-full flex-col items-center justify-center gap-6 p-8 text-center">
                <Flourish className="h-8 text-amber-700" />
                <p className="font-display text-3xl italic leading-snug text-stone-700">
                  “Élégance
                  <br />
                  intemporelle”
                </p>
                <Flourish className="h-8 rotate-180 text-amber-700" />
              </div>
            </div>
            <figcaption className="mt-3 text-right text-[10px] uppercase tracking-[0.3em] text-stone-400">
              Photograph No. 04
            </figcaption>
          </figure>
        </div>
      </div>
    </section>
  );
}

function Flourish({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 120 24" fill="none" className={className} aria-hidden>
      <path
        d="M2 12h40M118 12H78M60 4c-6 0-10 4-10 8s4 8 10 8 10-4 10-8-4-8-10-8z"
        stroke="currentColor"
        strokeWidth="1"
      />
      <circle cx="60" cy="12" r="2" fill="currentColor" />
    </svg>
  );
}
