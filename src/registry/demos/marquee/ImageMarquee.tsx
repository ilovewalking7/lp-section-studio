import type { DemoMeta } from "@/registry";

export const meta: DemoMeta = {
  name: "イメージマーキー",
  category: "マーキー",
  description: "グラデーション/SVGの画像タイルが流れるギャラリー風。",
  align: "full",
  isNew: true,
  tags: ["marquee", "animation", "infinite", "gallery"],
};

const TILES = [
  { from: "#f472b6", to: "#7c3aed", label: "Aurora" },
  { from: "#22d3ee", to: "#2563eb", label: "Tidal" },
  { from: "#fbbf24", to: "#ef4444", label: "Ember" },
  { from: "#34d399", to: "#059669", label: "Forest" },
  { from: "#a78bfa", to: "#6366f1", label: "Nebula" },
  { from: "#fb7185", to: "#f59e0b", label: "Sunset" },
];

export default function ImageMarquee() {
  return (
    <div className="w-full py-8">
      <style>{`
        @keyframes imageMarqueeScroll {
          from { transform: translateX(0); }
          to { transform: translateX(-50%); }
        }
        .image-track { animation: imageMarqueeScroll 34s linear infinite; }
        .image-mask:hover .image-track { animation-play-state: paused; }
      `}</style>
      <div
        className="image-mask group relative overflow-hidden"
        style={{
          maskImage:
            "linear-gradient(to right, transparent, black 8%, black 92%, transparent)",
          WebkitMaskImage:
            "linear-gradient(to right, transparent, black 8%, black 92%, transparent)",
        }}
      >
        <div className="image-track flex w-max items-center gap-5 pr-5">
          {[...TILES, ...TILES].map((t, i) => (
            <div
              key={`${t.label}-${i}`}
              className="relative h-44 w-64 shrink-0 overflow-hidden rounded-2xl shadow-md ring-1 ring-black/10"
              style={{ background: `linear-gradient(135deg, ${t.from}, ${t.to})` }}
            >
              <svg
                aria-hidden
                className="absolute inset-0 size-full opacity-30 mix-blend-overlay"
                viewBox="0 0 100 100"
                preserveAspectRatio="none"
              >
                <circle cx="20" cy="25" r="28" fill="white" />
                <circle cx="78" cy="72" r="34" fill="black" />
              </svg>
              <span className="absolute bottom-3 left-3 rounded-md bg-black/30 px-2 py-1 text-xs font-semibold text-white backdrop-blur-sm">
                {t.label}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
