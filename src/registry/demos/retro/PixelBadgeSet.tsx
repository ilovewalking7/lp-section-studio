import type { DemoMeta } from "@/registry";

export const meta: DemoMeta = {
  name: "ピクセル・バッジ",
  category: "レトロ・Y2K",
  description: "8ビット風のバッジと小さなピクセルアートSVGを集めたセット。",
  align: "center",
  isNew: true,
  tags: ["retro", "y2k", "pixel", "8bit"],
};

const pixelFont = "'Courier New', ui-monospace, monospace";

function PixelHeart() {
  // 11x10 grid pixel-art heart
  const rows = [
    "01100110",
    "11111111",
    "11111111",
    "11111111",
    "01111110",
    "00111100",
    "00011000",
  ];
  const size = 7;
  return (
    <svg
      width={8 * size}
      height={rows.length * size}
      viewBox={`0 0 ${8 * size} ${rows.length * size}`}
      shapeRendering="crispEdges"
      aria-hidden
    >
      {rows.map((row, y) =>
        row.split("").map((c, x) =>
          c === "1" ? (
            <rect
              key={`${x}-${y}`}
              x={x * size}
              y={y * size}
              width={size}
              height={size}
              fill="#ff2e97"
            />
          ) : null
        )
      )}
    </svg>
  );
}

function PixelStar() {
  const rows = [
    "00010000",
    "00010000",
    "01111110",
    "00111100",
    "00111100",
    "01100110",
    "01000010",
  ];
  const size = 7;
  return (
    <svg
      width={8 * size}
      height={rows.length * size}
      viewBox={`0 0 ${8 * size} ${rows.length * size}`}
      shapeRendering="crispEdges"
      aria-hidden
    >
      {rows.map((row, y) =>
        row.split("").map((c, x) =>
          c === "1" ? (
            <rect
              key={`${x}-${y}`}
              x={x * size}
              y={y * size}
              width={size}
              height={size}
              fill="#fde047"
            />
          ) : null
        )
      )}
    </svg>
  );
}

const badges = [
  { label: "LEVEL UP", bg: "#ff2e97", fg: "#0d0221" },
  { label: "1UP", bg: "#bef264", fg: "#0d0221" },
  { label: "GAME OVER", bg: "#05d9e8", fg: "#0d0221" },
  { label: "★ BONUS ★", bg: "#c084fc", fg: "#0d0221" },
];

export default function PixelBadgeSet() {
  return (
    <div className="grid place-items-center bg-[#0d0221] p-10">
      <div className="flex w-[360px] flex-col items-center gap-8">
        {/* pixel art */}
        <div className="flex items-end gap-6">
          <div
            style={{ filter: "drop-shadow(0 0 8px rgba(255,46,151,0.7))" }}
            className="animate-pulse"
          >
            <PixelHeart />
          </div>
          <div style={{ filter: "drop-shadow(0 0 8px rgba(253,224,71,0.7))" }}>
            <PixelStar />
          </div>
          <div
            style={{ filter: "drop-shadow(0 0 8px rgba(255,46,151,0.7))" }}
            className="animate-pulse"
          >
            <PixelHeart />
          </div>
        </div>

        {/* 8-bit badges with hard pixel shadow */}
        <div className="flex flex-wrap items-center justify-center gap-3">
          {badges.map(({ label, bg, fg }) => (
            <span
              key={label}
              className="px-3 py-2 text-xs font-bold uppercase tracking-wider"
              style={{
                fontFamily: pixelFont,
                background: bg,
                color: fg,
                boxShadow: `4px 4px 0 #000, inset 0 0 0 2px ${fg}33`,
                imageRendering: "pixelated",
              }}
            >
              {label}
            </span>
          ))}
        </div>

        {/* score strip */}
        <div
          className="w-full border-2 border-[#05d9e8] bg-black px-4 py-3 text-center"
          style={{
            fontFamily: pixelFont,
            boxShadow: "0 0 18px rgba(5,217,232,0.5)",
          }}
        >
          <span className="text-sm font-bold uppercase tracking-widest text-[#05d9e8]">
            HI-SCORE&nbsp;&nbsp;
          </span>
          <span
            className="text-sm font-bold text-[#fde047]"
            style={{ textShadow: "0 0 8px rgba(253,224,71,0.8)" }}
          >
            00 999 950
          </span>
        </div>
      </div>
    </div>
  );
}
