import { Droplet, Sun, Thermometer } from "lucide-react";
import type { DemoMeta } from "@/registry";

export const meta: DemoMeta = {
  name: "植物ケアガイド",
  category: "ボタニカル",
  description: "光・水・温度を示すSVG植物入りの植物ケアガイドカード。",
  align: "center",
  isNew: true,
  tags: ["botanical", "organic", "wellness"],
};

function PottedPlant() {
  return (
    <svg viewBox="0 0 120 130" fill="none" className="h-32 w-auto" aria-hidden>
      <path d="M60 78 C60 60 60 44 60 30" stroke="#5e6b4f" strokeWidth="2.4" />
      <path
        d="M60 56 C42 50 30 54 26 60 C40 70 54 66 60 56Z"
        fill="#86a06d"
      />
      <path
        d="M60 44 C78 36 90 40 94 46 C80 56 66 52 60 44Z"
        fill="#5e6b4f"
      />
      <path
        d="M60 34 C50 24 50 16 54 10 C64 16 66 26 60 34Z"
        fill="#86a06d"
      />
      <path
        d="M40 80 H80 L74 116 C73 122 68 126 62 126 H58 C52 126 47 122 46 116 Z"
        fill="#b3753f"
      />
      <rect x="36" y="74" width="48" height="10" rx="3" fill="#a8683a" />
    </svg>
  );
}

const care = [
  {
    icon: Sun,
    label: "日光",
    labelEn: "Light",
    value: "明るい間接光",
    valueEn: "Bright, indirect",
    tint: "bg-[#e6c97a]/25 text-[#9a7b2e]",
  },
  {
    icon: Droplet,
    label: "水やり",
    labelEn: "Water",
    value: "週に1回",
    valueEn: "Once a week",
    tint: "bg-[#9dc3d6]/25 text-[#3f6c82]",
  },
  {
    icon: Thermometer,
    label: "温度",
    labelEn: "Temp",
    value: "18〜24°C",
    valueEn: "18–24°C",
    tint: "bg-[#cf9a78]/25 text-[#9a5a32]",
  },
];

export default function PlantCareCard() {
  const en =
    typeof document !== "undefined" &&
    document.documentElement.lang === "en";
  return (
    <div className="w-full max-w-sm overflow-hidden rounded-3xl border border-[#5e6b4f]/20 bg-[#f3f1e7] text-[#3f4a35] shadow-[0_12px_40px_-20px_rgba(63,74,53,0.5)]">
      <div className="flex items-center justify-center bg-gradient-to-b from-[#dfe3cf] to-[#cdd4b6] pt-6">
        <PottedPlant />
      </div>
      <div className="p-7">
        <p className="text-xs tracking-[0.2em] text-[#5e6b4f]/70">
          {en ? "EASY CARE · For beginners" : "EASY CARE · ビギナー向け"}
        </p>
        <h3 className="mt-1.5 font-serif text-2xl font-medium tracking-tight">
          {en ? "Monstera Deliciosa" : "モンステラ・デリシオサ"}
        </h3>
        <p className="mt-2 text-sm leading-relaxed text-[#5e6b4f]">
          {en
            ? "A popular houseplant with beautifully split leaves. Hardy, easy to grow, and great at purifying the air."
            : "切れ込みの入った葉が美しい人気の観葉植物。丈夫で育てやすく、空気を清浄に保ちます。"}
        </p>

        <div className="mt-6 grid grid-cols-3 gap-3">
          {care.map(({ icon: Icon, label, labelEn, value, valueEn, tint }) => (
            <div
              key={labelEn}
              className="rounded-2xl border border-[#5e6b4f]/15 bg-white/40 p-3 text-center"
            >
              <span
                className={`mx-auto flex size-9 items-center justify-center rounded-full ${tint}`}
              >
                <Icon className="size-4" />
              </span>
              <p className="mt-2 text-[10px] tracking-wide text-[#5e6b4f]/70">
                {en ? labelEn : label}
              </p>
              <p className="mt-0.5 text-xs font-medium leading-tight">
                {en ? valueEn : value}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
