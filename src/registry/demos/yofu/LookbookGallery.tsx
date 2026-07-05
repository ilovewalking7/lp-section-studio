import type { DemoMeta } from "@/registry";

export const meta: DemoMeta = {
  name: "ルックブックギャラリー",
  category: "洋風",
  description: "ファッションのルックブック。非対称グリッドとキャプションで誌面感を演出。",
  align: "full",
  isNew: true,
  tags: ["洋風", "lookbook", "fashion", "editorial"],
  principle: "非対称グリッドと番号付きキャプションが『高級ブランドの作品集』の眼差しを誘う。",
};

type Look = {
  no: string;
  title: string;
  caption: string;
  captionEn: string;
  from: string;
  to: string;
  span: string;
  ratio: string;
};

const looks: Look[] = [
  {
    no: "01",
    title: "Soir d'Hiver",
    caption: "ウールギャバジンのロングコート",
    captionEn: "Wool gabardine long coat",
    from: "from-[#1c2b46]",
    to: "to-[#2d3a52]",
    span: "sm:col-span-3 sm:row-span-2",
    ratio: "aspect-[3/4]",
  },
  {
    no: "02",
    title: "Lumière",
    caption: "シルクサテンのブラウス",
    captionEn: "Silk satin blouse",
    from: "from-[#e6dcc6]",
    to: "to-[#d8cbab]",
    span: "sm:col-span-2",
    ratio: "aspect-[4/3]",
  },
  {
    no: "03",
    title: "Terre",
    caption: "ハイウエストのトラウザーズ",
    captionEn: "High-waisted trousers",
    from: "from-[#7b2d3a]",
    to: "to-[#5c2029]",
    span: "sm:col-span-2",
    ratio: "aspect-[4/3]",
  },
];

export default function LookbookGallery() {
  const en =
    typeof document !== "undefined" &&
    document.documentElement.lang === "en";
  return (
    <section className="w-full bg-[#f8f5ef] px-6 py-16 text-stone-800">
      <div className="mx-auto max-w-5xl">
        <div className="mb-10 flex items-end justify-between border-b border-stone-300 pb-5">
          <div>
            <p className="text-[11px] uppercase tracking-[0.4em] text-amber-700">
              Automne / Hiver
            </p>
            <h2 className="mt-2 font-display text-4xl italic text-stone-900">
              The Lookbook
            </h2>
          </div>
          <span className="hidden font-display text-sm italic text-stone-400 sm:block">
            Collection No. 24
          </span>
        </div>

        <div className="grid grid-cols-1 gap-5 sm:grid-cols-5 sm:grid-rows-2">
          {looks.map((look) => (
            <figure key={look.no} className={look.span}>
              <div
                className={`relative w-full overflow-hidden border border-stone-300 bg-gradient-to-br ${look.from} ${look.to} ${look.ratio}`}
              >
                <span className="absolute left-4 top-4 font-display text-2xl italic text-white/80">
                  {look.no}
                </span>
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="font-display text-2xl italic tracking-wide text-white/90">
                    {look.title}
                  </span>
                </div>
              </div>
              <figcaption className="mt-2 flex items-baseline gap-2">
                <span className="text-[10px] uppercase tracking-[0.25em] text-amber-700">
                  Look {look.no}
                </span>
                <span className="text-xs italic text-stone-500">
                  {en ? look.captionEn : look.caption}
                </span>
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}
