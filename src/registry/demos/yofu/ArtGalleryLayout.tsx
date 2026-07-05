import type { DemoMeta } from "@/registry";

export const meta: DemoMeta = {
  name: "アートギャラリー展示",
  category: "洋風",
  description: "美術館／ギャラリーの展示レイアウト。作品とミュージアムラベルを併置。",
  align: "full",
  isNew: true,
  tags: ["洋風", "gallery", "museum", "art"],
  principle: "額装と作品ラベルの様式が『鑑賞すべき価値ある対象』という文脈を与える。",
};

type Work = {
  title: string;
  artist: string;
  year: string;
  medium: string;
  mediumEn: string;
  from: string;
  to: string;
};

const works: Work[] = [
  {
    title: "Nocturne en Bleu",
    artist: "É. Moreau",
    year: "1897",
    medium: "Huile sur toile · 油彩",
    mediumEn: "Huile sur toile · Oil",
    from: "from-[#1c2b46]",
    to: "to-[#33425e]",
  },
  {
    title: "Champs Dorés",
    artist: "M. Vasseur",
    year: "1902",
    medium: "Huile sur toile · 油彩",
    mediumEn: "Huile sur toile · Oil",
    from: "from-[#caa45a]",
    to: "to-[#9c7a34]",
  },
  {
    title: "Étude en Rouge",
    artist: "A. Beaumont",
    year: "1889",
    medium: "Pastel sur papier · パステル",
    mediumEn: "Pastel sur papier · Pastel",
    from: "from-[#7b2d3a]",
    to: "to-[#5c2029]",
  },
];

export default function ArtGalleryLayout() {
  const en =
    typeof document !== "undefined" &&
    document.documentElement.lang === "en";
  return (
    <section className="w-full bg-[#f8f5ef] px-6 py-16 text-stone-800">
      <div className="mx-auto max-w-5xl">
        <div className="mb-12 text-center">
          <p className="text-[11px] uppercase tracking-[0.4em] text-amber-700">
            Exposition
          </p>
          <h2 className="mt-3 font-display text-4xl italic text-stone-900 sm:text-5xl">
            Galerie des Maîtres
          </h2>
          <p className="mt-3 text-sm italic text-stone-500">
            19 Juin — 30 Septembre · Salle II
          </p>
        </div>

        <div className="grid grid-cols-1 gap-10 sm:grid-cols-3">
          {works.map((work) => (
            <figure key={work.title} className="flex flex-col items-center">
              <div className="w-full border-[6px] border-[#e6dcc6] bg-[#f3ede1] p-3 shadow-[0_18px_40px_-24px_rgba(28,43,70,0.5)]">
                <div
                  className={`flex aspect-[4/5] items-center justify-center bg-gradient-to-br ${work.from} ${work.to}`}
                >
                  <span className="font-display text-xl italic text-white/40">
                    {work.year}
                  </span>
                </div>
              </div>

              <figcaption className="mt-5 w-full max-w-[16rem] border-t border-stone-300 pt-3 text-left">
                <p className="font-display text-lg italic text-stone-900">
                  {work.title}
                </p>
                <p className="mt-1 text-xs text-stone-600">
                  {work.artist}, {work.year}
                </p>
                <p className="mt-0.5 text-[11px] text-stone-400">
                  {en ? work.mediumEn : work.medium}
                </p>
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}
