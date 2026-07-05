import type { DemoMeta } from "@/registry";

export const meta: DemoMeta = {
  name: "北欧フィーチャー",
  category: "北欧",
  description: "ラインアイコンを添えた穏やかな機能セクション。",
  align: "full",
  isNew: true,
  tags: ["nordic", "scandinavian", "hygge"],
  principle: "細線アイコンと均等な間隔が、価値の並列を静かに整理して伝える。",
};

type IconKey = "leaf" | "mountain" | "sun" | "weave";

const features: { icon: IconKey; ja: string; en: string; bodyJa: string; bodyEn: string; tint: string }[] = [
  {
    icon: "leaf",
    ja: "自然由来の素材",
    en: "Natural materials",
    bodyJa: "持続可能な森から届く木材とリネン。手に触れるたび温もりを感じます。",
    bodyEn: "Wood and linen from sustainable forests — warmth you feel with every touch.",
    tint: "#8a9a7b",
  },
  {
    icon: "sun",
    ja: "やわらかな光設計",
    en: "Soft lighting",
    bodyJa: "北欧の長い夜に寄り添う、目にやさしい灯りの色味を追求しました。",
    bodyEn: "A gentle light tone crafted to ease the long Nordic nights.",
    tint: "#c08457",
  },
  {
    icon: "mountain",
    ja: "長く使える堅牢さ",
    en: "Built to last",
    bodyJa: "飽きのこない形と確かな作り。世代を越えて受け継げる道具です。",
    bodyEn: "Timeless forms and solid craft — tools to pass down through generations.",
    tint: "#7d92a3",
  },
  {
    icon: "weave",
    ja: "職人の手仕事",
    en: "Artisan handcraft",
    bodyJa: "小さな工房で一つひとつ丁寧に。folkの模様に物語を編み込みます。",
    bodyEn: "Made one by one in a small workshop, weaving stories into folk patterns.",
    tint: "#c08457",
  },
];

export default function NordicFeature() {
  const en =
    typeof document !== "undefined" &&
    document.documentElement.lang === "en";
  return (
    <section className="w-full bg-[#faf8f3] font-sans text-[#3a3a38]">
      <div className="mx-auto max-w-6xl px-6 py-24">
        <div className="max-w-xl">
          <span className="text-[11px] font-medium uppercase tracking-[0.2em] text-[#8a9a7b]">
            Our Philosophy
          </span>
          <h2 className="mt-4 text-3xl font-medium tracking-tight md:text-4xl">
            {en
              ? "True comfort, found within simplicity."
              : "シンプルさのなかに、確かな心地よさを。"}
          </h2>
        </div>

        <div className="mt-16 grid gap-x-10 gap-y-12 sm:grid-cols-2 lg:grid-cols-4">
          {features.map((f) => (
            <div key={f.icon}>
              <div
                className="flex h-14 w-14 items-center justify-center rounded-2xl"
                style={{ backgroundColor: f.tint + "1f", color: f.tint }}
              >
                <LineIcon name={f.icon} />
              </div>
              <h3 className="mt-5 text-lg font-medium">{en ? f.en : f.ja}</h3>
              <p className="mt-2 text-sm leading-relaxed text-[#3a3a38]/65">
                {en ? f.bodyEn : f.bodyJa}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function LineIcon({ name }: { name: IconKey }) {
  const common = {
    className: "h-7 w-7",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: 1.8,
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
    viewBox: "0 0 24 24",
  };
  switch (name) {
    case "leaf":
      return (
        <svg {...common}>
          <path d="M5 21c0-9 6-15 14-15 0 9-6 14-14 14z" />
          <path d="M5 21C9 16 13 13 17 11" />
        </svg>
      );
    case "mountain":
      return (
        <svg {...common}>
          <path d="M3 19l6-11 4 6 2-3 6 8z" />
          <path d="M8 8l1.5 2.5" />
        </svg>
      );
    case "sun":
      return (
        <svg {...common}>
          <circle cx="12" cy="12" r="4" />
          <path d="M12 3v2M12 19v2M3 12h2M19 12h2M5.6 5.6l1.4 1.4M17 17l1.4 1.4M18.4 5.6L17 7M7 17l-1.4 1.4" />
        </svg>
      );
    case "weave":
      return (
        <svg {...common}>
          <path d="M4 8c4 0 4 8 8 8s4-8 8-8M4 16c4 0 4-8 8-8s4 8 8 8" />
        </svg>
      );
  }
}
