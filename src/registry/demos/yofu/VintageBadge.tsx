import type { DemoMeta } from "@/registry";

export const meta: DemoMeta = {
  name: "ヴィンテージエンブレム",
  category: "洋風",
  description: "ヴィンテージの認定シール。円形 SVG にセリフ文字と月桂樹をあしらう。",
  align: "center",
  isNew: true,
  tags: ["洋風", "vintage", "emblem", "badge"],
  principle: "円形・月桂樹・年号の様式が『由緒と権威』を象徴し信頼を喚起する。",
};

export default function VintageBadge() {
  return (
    <div className="flex w-full max-w-md items-center justify-center bg-[#f8f5ef] p-10">
      <div className="relative h-72 w-72 text-[#7b2d3a]">
        <svg viewBox="0 0 240 240" className="h-full w-full" aria-hidden>
          <defs>
            <path
              id="vb-top"
              d="M 40 120 A 80 80 0 0 1 200 120"
              fill="none"
            />
            <path
              id="vb-bottom"
              d="M 44 124 A 76 76 0 0 0 196 124"
              fill="none"
            />
          </defs>

          <circle cx="120" cy="120" r="112" fill="none" stroke="currentColor" strokeWidth="1.5" />
          <circle cx="120" cy="120" r="104" fill="none" stroke="currentColor" strokeWidth="0.75" />
          <circle cx="120" cy="120" r="74" fill="none" stroke="currentColor" strokeWidth="1" />

          <text fontSize="13" letterSpacing="5" fill="currentColor">
            <textPath href="#vb-top" startOffset="50%" textAnchor="middle">
              MAISON · ATELIER
            </textPath>
          </text>
          <text fontSize="11" letterSpacing="4" fill="currentColor">
            <textPath href="#vb-bottom" startOffset="50%" textAnchor="middle">
              EST · MDCCCXCIV
            </textPath>
          </text>

          {/* laurels */}
          <g stroke="currentColor" strokeWidth="1.2" fill="none">
            <path d="M88 150 q-14 -14 -14 -34" />
            <path d="M152 150 q14 -14 14 -34" />
            {[0, 1, 2, 3].map((i) => (
              <g key={`l-${i}`}>
                <path d={`M${82 - i * 1} ${142 - i * 9} q-9 -2 -13 4`} />
                <path d={`M${158 + i * 1} ${142 - i * 9} q9 -2 13 4`} />
              </g>
            ))}
          </g>

          <g stroke="currentColor" strokeWidth="1" fill="none">
            <path d="M120 92 l4 9 10 1 -7 7 2 10 -9 -5 -9 5 2 -10 -7 -7 10 -1z" fill="currentColor" />
          </g>
        </svg>

        <div className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center">
          <span className="font-display text-5xl italic leading-none">A°</span>
          <span className="mt-1 text-[9px] uppercase tracking-[0.3em] text-stone-700">
            Certifié
          </span>
        </div>
      </div>
    </div>
  );
}
