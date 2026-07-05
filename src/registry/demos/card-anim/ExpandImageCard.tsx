import { MapPin, ArrowUpRight } from "lucide-react";
import type { DemoMeta } from "@/registry";

export const meta: DemoMeta = {
  name: "拡大イメージカード",
  category: "カード演出",
  description: "グラデーション製の「画像」がホバーでズームし、文字が下から現れる。",
  align: "center",
  isNew: true,
  tags: ["card", "hover", "animation", "image", "zoom"],
};

export default function ExpandImageCard() {
  const en =
    typeof document !== "undefined" &&
    document.documentElement.lang === "en";
  return (
    <div className="group relative h-72 w-full max-w-sm overflow-hidden rounded-2xl border border-white/10 shadow-2xl shadow-black/40">
      {/* gradient "image" */}
      <div className="absolute inset-0 scale-100 bg-[radial-gradient(circle_at_30%_20%,#f97316,transparent_55%),radial-gradient(circle_at_80%_70%,#db2777,transparent_55%),linear-gradient(135deg,#312e81,#0b0d17)] transition-transform duration-700 ease-out group-hover:scale-110" />
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

      <div className="relative flex h-full flex-col justify-end p-6 text-white">
        <span className="inline-flex w-fit items-center gap-1.5 rounded-full bg-white/15 px-2.5 py-1 text-xs backdrop-blur-sm">
          <MapPin className="size-3.5" /> {en ? "Kyoto" : "京都"}
        </span>
        {/* rising overlay text */}
        <div className="translate-y-3 transition-transform duration-500 ease-out group-hover:translate-y-0">
          <h3 className="mt-3 text-xl font-semibold">
            {en ? "Sunset over the old capital" : "古都の夕景"}
          </h3>
          <p className="mt-1 max-h-0 overflow-hidden text-sm leading-relaxed text-white/80 opacity-0 transition-all duration-500 group-hover:max-h-20 group-hover:opacity-100">
            {en
              ? "On hover, the background slowly zooms and the description rises into view."
              : "ホバーで背景がゆっくりズームし、説明文がせり上がって表示されます。"}
          </p>
          <span className="mt-3 inline-flex items-center gap-1 text-sm font-medium text-amber-300">
            {en ? "View itinerary" : "旅程を見る"} <ArrowUpRight className="size-4" />
          </span>
        </div>
      </div>
    </div>
  );
}
