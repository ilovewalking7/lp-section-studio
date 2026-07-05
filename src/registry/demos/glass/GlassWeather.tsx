import { Cloud, CloudRain, Droplets, Sun, Wind } from "lucide-react";
import type { DemoMeta } from "@/registry";

export const meta: DemoMeta = {
  name: "グラス・天気ウィジェット",
  category: "グラスモーフィズム",
  description: "夕暮れの空のグラデーション上に浮かぶ、フロステッドな天気ウィジェット。",
  align: "center",
  isNew: true,
  tags: ["glass", "frosted", "weather"],
};

const forecast = [
  { id: "mon", dayJa: "月", dayEn: "Mon", icon: Sun, temp: "28°" },
  { id: "tue", dayJa: "火", dayEn: "Tue", icon: Cloud, temp: "24°" },
  { id: "wed", dayJa: "水", dayEn: "Wed", icon: CloudRain, temp: "21°" },
  { id: "thu", dayJa: "木", dayEn: "Thu", icon: Sun, temp: "27°" },
  { id: "fri", dayJa: "金", dayEn: "Fri", icon: Cloud, temp: "23°" },
];

export default function GlassWeather() {
  const en =
    typeof document !== "undefined" &&
    document.documentElement.lang === "en";
  return (
    <div className="relative isolate flex w-full max-w-xl items-center justify-center overflow-hidden rounded-3xl bg-gradient-to-br from-amber-400 via-orange-500 to-rose-600 p-10">
      <div
        aria-hidden
        className="pointer-events-none absolute -left-12 -top-10 size-64 rounded-full bg-yellow-200/60 blur-3xl"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute -bottom-14 -right-10 size-72 rounded-full bg-fuchsia-500/40 blur-3xl"
      />

      <div className="relative w-full max-w-sm rounded-2xl border border-white/20 bg-white/10 p-7 shadow-2xl backdrop-blur-xl">
        <div className="flex items-start justify-between">
          <div>
            <p className="text-sm font-medium text-white/80">{en ? "Tokyo" : "東京"}</p>
            <p className="mt-1 text-5xl font-bold text-white">28°</p>
            <p className="mt-1 text-sm text-white/75">
              {en ? "Partly cloudy" : "晴れときどき曇り"}
            </p>
          </div>
          <Sun className="size-16 text-yellow-100 drop-shadow" />
        </div>

        <div className="mt-6 grid grid-cols-2 gap-3">
          <div className="flex items-center gap-2 rounded-xl border border-white/20 bg-white/10 px-3 py-2 backdrop-blur">
            <Droplets className="size-4 text-white/80" />
            <span className="text-sm text-white/90">{en ? "Humidity 62%" : "湿度 62%"}</span>
          </div>
          <div className="flex items-center gap-2 rounded-xl border border-white/20 bg-white/10 px-3 py-2 backdrop-blur">
            <Wind className="size-4 text-white/80" />
            <span className="text-sm text-white/90">{en ? "Wind 12km/h" : "風 12km/h"}</span>
          </div>
        </div>

        <div className="mt-6 flex justify-between border-t border-white/15 pt-5">
          {forecast.map((f) => (
            <div key={f.id} className="flex flex-col items-center gap-2">
              <span className="text-xs text-white/70">{en ? f.dayEn : f.dayJa}</span>
              <f.icon className="size-5 text-white" />
              <span className="text-sm font-medium text-white">{f.temp}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
