import type { DemoMeta } from "@/registry";

export const meta: DemoMeta = {
  name: "北欧ギャラリー",
  category: "北欧",
  description: "キャプション付きのやわらかなインテリアギャラリー。",
  align: "full",
  isNew: true,
  tags: ["nordic", "scandinavian", "hygge"],
  principle: "落ち着いた色面のグリッドとキャプションで、世界観を一貫して見せる。",
};

type Scene = "window" | "shelf" | "plant" | "lamp" | "rug" | "chair";

const items: { scene: Scene; ja: string; en: string; place: string; bg: string; ink: string; span: string }[] = [
  { scene: "window", ja: "朝の光", en: "Morning light", place: "Living Room", bg: "#eae5d8", ink: "#c08457", span: "sm:col-span-2 sm:row-span-2" },
  { scene: "plant", ja: "緑のある角", en: "A green corner", place: "Corner", bg: "#e3e7dd", ink: "#8a9a7b", span: "" },
  { scene: "lamp", ja: "やわらかな灯り", en: "Soft glow", place: "Reading Nook", bg: "#e7e3da", ink: "#c08457", span: "" },
  { scene: "shelf", ja: "余白の棚", en: "Open shelving", place: "Hallway", bg: "#e1e6e9", ink: "#7d92a3", span: "" },
  { scene: "rug", ja: "編みのラグ", en: "Woven rug", place: "Bedroom", bg: "#eae5d8", ink: "#8a9a7b", span: "" },
];

export default function NordicGallery() {
  const en =
    typeof document !== "undefined" &&
    document.documentElement.lang === "en";
  return (
    <section className="w-full bg-[#f4f1ea] font-sans text-[#3a3a38]">
      <div className="mx-auto max-w-6xl px-6 py-24">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <span className="text-[11px] font-medium uppercase tracking-[0.2em] text-[#8a9a7b]">
              Interiors
            </span>
            <h2 className="mt-3 text-3xl font-medium tracking-tight md:text-4xl">
              {en ? "Scenes of everyday life" : "暮らしの一場面"}
            </h2>
          </div>
          <button className="text-sm font-medium text-[#3a3a38]/70 underline-offset-4 hover:text-[#3a3a38] hover:underline">
            {en ? "View all" : "すべて見る"}
          </button>
        </div>

        <div className="mt-12 grid auto-rows-[180px] grid-cols-2 gap-4 sm:grid-cols-3">
          {items.map((it) => (
            <figure
              key={it.scene}
              className={
                "group relative overflow-hidden rounded-[1.5rem] " + it.span
              }
              style={{ backgroundColor: it.bg }}
            >
              <SceneArt scene={it.scene} ink={it.ink} />
              <figcaption className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-[#3a3a38]/30 to-transparent p-5">
                <p className="text-[11px] uppercase tracking-[0.15em] text-[#faf8f3]/85">
                  {it.place}
                </p>
                <p className="text-sm font-medium text-[#faf8f3]">
                  {en ? it.en : it.ja}
                </p>
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}

function SceneArt({ scene, ink }: { scene: Scene; ink: string }) {
  const p = {
    className: "absolute inset-0 h-full w-full p-8",
    fill: "none",
    stroke: ink,
    strokeWidth: 2,
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
    viewBox: "0 0 120 120",
    preserveAspectRatio: "xMidYMid meet",
  };
  switch (scene) {
    case "window":
      return (
        <svg {...p}>
          <rect x="30" y="20" width="60" height="70" rx="4" />
          <path d="M60 20v70M30 55h60" />
          <circle cx="48" cy="38" r="6" />
        </svg>
      );
    case "plant":
      return (
        <svg {...p}>
          <path d="M50 95h20l-3-25H53z" />
          <path d="M60 70c0-15-8-22-18-24 2 12 8 20 18 24zM60 70c0-15 8-22 18-24-2 12-8 20-18 24z" />
        </svg>
      );
    case "lamp":
      return (
        <svg {...p}>
          <path d="M45 35h30l8 25H37z" />
          <path d="M60 60v30M48 90h24" />
        </svg>
      );
    case "shelf":
      return (
        <svg {...p}>
          <path d="M30 45h60M30 70h60" />
          <rect x="38" y="33" width="10" height="12" />
          <circle cx="70" cy="39" r="6" />
          <rect x="50" y="58" width="14" height="12" />
        </svg>
      );
    case "rug":
      return (
        <svg {...p}>
          <rect x="28" y="40" width="64" height="40" rx="4" />
          <path d="M28 53h64M28 67h64M44 40v40M76 40v40" opacity="0.6" />
        </svg>
      );
    case "chair":
      return (
        <svg {...p}>
          <path d="M45 35v30M75 35v30M45 35q15-6 30 0M40 65h40l-6 25M40 65l6 25" />
        </svg>
      );
  }
}
