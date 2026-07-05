import type { DemoMeta } from "@/registry";
import { cn } from "@/lib/utils";

export const meta: DemoMeta = {
  name: "メンフィス・ギャラリー",
  category: "メンフィス",
  description: "シェイプで縁取った非対称ギャラリーカード。",
  align: "full",
  isNew: true,
  tags: ["memphis", "geometric", "80s"],
};

type Item = {
  title: string;
  titleEn: string;
  tag: string;
  tagEn: string;
  bg: string;
  rotate: string;
  shadow: string;
  span?: string;
};

const items: Item[] = [
  { title: "ジグザグ・シリーズ", titleEn: "Zigzag Series", tag: "パターン", tagEn: "Pattern", bg: "#ff5c8a", rotate: "-rotate-1", shadow: "#000", span: "sm:col-span-2" },
  { title: "サークル・ポップ", titleEn: "Circle Pop", tag: "シェイプ", tagEn: "Shape", bg: "#1fb6c1", rotate: "rotate-1", shadow: "#000" },
  { title: "トライアングル", titleEn: "Triangle", tag: "シェイプ", tagEn: "Shape", bg: "#ffd23f", rotate: "rotate-1", shadow: "#000" },
  { title: "波線コレクション", titleEn: "Wave Collection", tag: "ライン", tagEn: "Line", bg: "#7b5cff", rotate: "-rotate-1", shadow: "#000", span: "sm:col-span-2" },
];

function GalleryArt({ index }: { index: number }) {
  // 各カードに異なるシェイプ構成
  return (
    <div className="pointer-events-none absolute inset-0">
      {index === 0 && (
        <>
          <svg viewBox="0 0 200 30" className="absolute left-6 top-8 w-40" fill="none" aria-hidden>
            <path d="M2 24L22 6l20 18L62 6l20 18L102 6l20 18L142 6l20 18L182 6l16 14" stroke="#fff" strokeWidth={5} strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          <div className="absolute bottom-5 right-6 h-12 w-12 rounded-full border-[4px] border-black bg-[#ffd23f]" />
        </>
      )}
      {index === 1 && (
        <>
          <div className="absolute left-1/2 top-1/2 h-16 w-16 -translate-x-1/2 -translate-y-1/2 rounded-full border-[5px] border-black bg-white" />
          <div className="absolute left-6 bottom-5 h-7 w-7 rounded-full border-[3px] border-black bg-[#ff5c8a]" />
          <div className="absolute right-6 top-5 h-5 w-5 rounded-full border-[3px] border-black bg-[#ffd23f]" />
        </>
      )}
      {index === 2 && (
        <>
          <div
            className="absolute left-1/2 top-1/2 h-16 w-16 -translate-x-1/2 -translate-y-1/2 border-[5px] border-black bg-[#7b5cff]"
            style={{ clipPath: "polygon(50% 0, 100% 100%, 0 100%)" }}
          />
          <div className="absolute right-5 bottom-5 h-6 w-6 rotate-12 border-[3px] border-black bg-white" />
        </>
      )}
      {index === 3 && (
        <>
          <svg viewBox="0 0 200 40" className="absolute left-6 top-1/2 w-44 -translate-y-1/2" fill="none" aria-hidden>
            <path d="M2 20c14-26 30 26 44 0s30-26 44 0 30 26 44 0 30-26 44 0" stroke="#ffd23f" strokeWidth={6} strokeLinecap="round" />
          </svg>
          <div className="absolute right-6 top-6 h-8 w-8 rounded-full border-[4px] border-black bg-[#ff5c8a]" />
        </>
      )}
    </div>
  );
}

export default function MemphisGallery() {
  const en =
    typeof document !== "undefined" &&
    document.documentElement.lang === "en";
  return (
    <section className="w-full bg-[#fdf6e3] px-6 py-20">
      <div className="mx-auto max-w-5xl">
        <h2 className="text-4xl font-black tracking-tight text-black sm:text-5xl">
          {en ? (
            <>
              Shape
              <span className="ml-2 inline-block rotate-1 bg-[#1fb6c1] px-2 text-white">Gallery</span>
            </>
          ) : (
            <>
              シェイプ
              <span className="ml-2 inline-block rotate-1 bg-[#1fb6c1] px-2 text-white">ギャラリー</span>
            </>
          )}
        </h2>
        <p className="mt-3 max-w-md text-lg font-semibold text-black/60">
          {en
            ? "An asymmetric collection of visuals that pop."
            : "非対称に並ぶ、弾けるビジュアルのコレクション。"}
        </p>

        <div className="mt-10 grid auto-rows-[200px] grid-cols-1 gap-6 sm:grid-cols-3">
          {items.map((it, i) => (
            <article
              key={it.titleEn}
              className={cn(
                "group relative overflow-hidden rounded-2xl border-[3px] border-black transition-transform hover:-translate-y-1.5 hover:rotate-0",
                it.rotate,
                it.span
              )}
              style={{ backgroundColor: it.bg, boxShadow: `7px 7px 0 0 ${it.shadow}` }}
            >
              <GalleryArt index={i} />
              <div className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-2 p-5">
                <h3 className="text-lg font-black leading-tight text-white drop-shadow-[2px_2px_0_rgba(0,0,0,0.4)]">
                  {en ? it.titleEn : it.title}
                </h3>
                <span className="shrink-0 rounded-full border-2 border-black bg-white px-2.5 py-0.5 text-xs font-black uppercase text-black">
                  {en ? it.tagEn : it.tag}
                </span>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
