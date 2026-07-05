import type { DemoMeta } from "@/registry";

export const meta: DemoMeta = {
  name: "グーイボタン",
  category: "ボタン演出",
  description: "SVGフィルターでブロブが溶け合うグーイなホバー演出ボタン。",
  align: "center",
  isNew: true,
  tags: ["button", "animation", "gooey"],
};

export default function GooeyButton() {
  const en = typeof document !== "undefined" && document.documentElement.lang === "en";
  return (
    <div className="py-6">
      <style>{`
        @keyframes ba-gooey-float {
          0%, 100% { transform: translate(0, 0) scale(1); }
          50% { transform: translate(0, -6px) scale(1.08); }
        }
      `}</style>

      {/* SVG goo filter */}
      <svg className="absolute h-0 w-0" aria-hidden="true">
        <defs>
          <filter id="ba-goo">
            <feGaussianBlur in="SourceGraphic" stdDeviation="8" result="blur" />
            <feColorMatrix
              in="blur"
              mode="matrix"
              values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 20 -10"
              result="goo"
            />
            <feBlend in="SourceGraphic" in2="goo" />
          </filter>
        </defs>
      </svg>

      <button className="group relative inline-flex items-center justify-center">
        {/* goo layer */}
        <span
          className="absolute inset-0 flex items-center justify-center"
          style={{ filter: "url(#ba-goo)" }}
        >
          <span className="h-12 w-40 rounded-full bg-violet-600" />
          <span
            className="absolute left-3 h-9 w-9 rounded-full bg-violet-600 opacity-0 transition-all duration-500 group-hover:left-[-6px] group-hover:opacity-100"
            style={{ animation: "ba-gooey-float 2s ease-in-out infinite" }}
          />
          <span
            className="absolute right-3 h-9 w-9 rounded-full bg-violet-600 opacity-0 transition-all duration-500 group-hover:right-[-6px] group-hover:opacity-100"
            style={{ animation: "ba-gooey-float 2.4s ease-in-out 0.3s infinite" }}
          />
        </span>
        <span className="relative z-10 px-10 py-3 text-sm font-semibold text-white">
          {en ? "Hover to melt" : "ホバーで溶ける"}
        </span>
      </button>
    </div>
  );
}
