import type { DemoMeta } from "@/registry";
import { Blend } from "lucide-react";

export const meta: DemoMeta = {
  name: "グーイ",
  category: "ボタン",
  description: "SVGフィルターで粘性のあるグー（goo）表現。ホバーで雫が溶け合う。",
  align: "center",
  isNew: true,
  tags: ["button", "fun"],
};

export default function Gooey() {
  const en = typeof document !== "undefined" && document.documentElement.lang === "en";
  return (
    <div className="flex items-center justify-center rounded-2xl bg-fuchsia-100 p-8">
      <svg width="0" height="0" className="absolute" aria-hidden="true">
        <defs>
          <filter id="btnfun-goo">
            <feGaussianBlur in="SourceGraphic" stdDeviation="6" result="blur" />
            <feColorMatrix
              in="blur"
              mode="matrix"
              values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 20 -9"
            />
          </filter>
        </defs>
      </svg>
      <button
        type="button"
        className="group relative inline-flex items-center justify-center px-2 py-2"
        style={{ filter: "url(#btnfun-goo)" }}
        aria-label={en ? "Gooey button" : "グーイボタン"}
      >
        <span className="absolute size-12 rounded-full bg-fuchsia-600 transition-all duration-500 group-hover:-translate-x-7" />
        <span className="absolute size-12 rounded-full bg-fuchsia-600 transition-all duration-500 group-hover:translate-x-7" />
        <span className="relative z-10 inline-flex items-center gap-2 rounded-full bg-fuchsia-600 px-6 py-3 text-sm font-bold text-white">
          <Blend className="size-4" />
          {en ? "Gooey" : "とろり"}
        </span>
      </button>
    </div>
  );
}
