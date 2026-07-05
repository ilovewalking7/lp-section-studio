import { useRef, useState } from "react";
import type { DemoMeta } from "@/registry";

export const meta: DemoMeta = {
  name: "金継ぎ チルトカード",
  category: "3Dアニメ",
  description:
    "暗い陶器面に金で継いだ亀裂が光る金継ぎカード。ポインタで3D傾斜し金筋が光を拾う。",
  align: "center",
  isNew: true,
  level: "advanced",
  tags: ["3d", "wafu", "japanese", "materials", "animation"],
  principle:
    "傷を金で繋ぐ金継ぎは“欠けてなお美しい”という物語性で唯一無二の価値を生む。",
};

export default function KintsugiTiltCard() {
  const en =
    typeof document !== "undefined" && document.documentElement.lang === "en";

  const ref = useRef<HTMLDivElement>(null);
  const [tilt, setTilt] = useState({ rx: 0, ry: 0, gx: 50, gy: 30 });

  const onMove = (e: React.PointerEvent<HTMLDivElement>) => {
    const el = ref.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    const px = (e.clientX - r.left) / r.width;
    const py = (e.clientY - r.top) / r.height;
    setTilt({
      rx: (0.5 - py) * 16,
      ry: (px - 0.5) * 18,
      gx: px * 100,
      gy: py * 100,
    });
  };
  const onLeave = () => setTilt({ rx: 0, ry: 0, gx: 50, gy: 30 });

  return (
    <div className="flex w-full items-center justify-center rounded-3xl bg-[radial-gradient(120%_120%_at_50%_12%,#171312_0%,#070605_72%)] py-16">
      <style>{`
        @keyframes ktc-glow { 0%,100% { opacity: .6; } 50% { opacity: 1; } }
        @media (prefers-reduced-motion: reduce) {
          .ktc-crack { animation: none !important; opacity: .9 !important; }
        }
      `}</style>

      <div
        ref={ref}
        onPointerMove={onMove}
        onPointerLeave={onLeave}
        className="relative h-[320px] w-[260px] select-none"
        style={{ perspective: "900px" }}
        role="img"
        aria-label={en ? "Kintsugi repaired vessel card" : "金継ぎの器カード"}
      >
        <div
          className="relative h-full w-full rounded-[20px] transition-transform duration-200 ease-out"
          style={{
            transformStyle: "preserve-3d",
            transform: `rotateX(${tilt.rx}deg) rotateY(${tilt.ry}deg)`,
            background:
              "radial-gradient(120% 100% at 30% 20%, #2a2422 0%, #1a1614 45%, #0d0a09 100%)",
            boxShadow:
              "0 30px 60px rgba(0,0,0,0.6), inset 0 1px 0 rgba(255,255,255,0.06)",
          }}
        >
          {/* ceramic glaze sheen that tracks pointer */}
          <div
            className="pointer-events-none absolute inset-0 rounded-[20px]"
            style={{
              background: `radial-gradient(40% 36% at ${tilt.gx}% ${tilt.gy}%, rgba(255,245,230,0.16) 0%, rgba(255,245,230,0) 60%)`,
            }}
          />

          {/* gold kintsugi cracks */}
          <svg
            className="pointer-events-none absolute inset-0 h-full w-full"
            viewBox="0 0 260 320"
            aria-hidden="true"
          >
            <defs>
              <linearGradient id="ktc-gold" x1="0" y1="0" x2="1" y2="1">
                <stop offset="0%" stopColor="#fff3c4" />
                <stop offset="40%" stopColor="#e8b84b" />
                <stop offset="70%" stopColor="#f8d77a" />
                <stop offset="100%" stopColor="#a9741a" />
              </linearGradient>
              <filter id="ktc-soft" x="-20%" y="-20%" width="140%" height="140%">
                <feGaussianBlur stdDeviation="2.4" />
              </filter>
            </defs>

            {/* glow underlay (tracks pointer brightness via animation) */}
            <g
              className="ktc-crack"
              filter="url(#ktc-soft)"
              stroke="#ffdf8c"
              strokeWidth="5"
              fill="none"
              strokeLinecap="round"
              opacity="0.7"
              style={{ animation: "ktc-glow 3.4s ease-in-out infinite" }}
            >
              <path d="M40 8 L88 70 L66 132 L120 176 L96 250 L150 312" />
              <path d="M88 70 L150 92 L196 60" />
              <path d="M120 176 L186 158 L228 196" />
              <path d="M66 132 L18 158" />
              <path d="M96 250 L40 268" />
            </g>
            {/* crisp gold seams on top */}
            <g
              stroke="url(#ktc-gold)"
              strokeWidth="2.4"
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M40 8 L88 70 L66 132 L120 176 L96 250 L150 312" />
              <path d="M88 70 L150 92 L196 60" />
              <path d="M120 176 L186 158 L228 196" />
              <path d="M66 132 L18 158" />
              <path d="M96 250 L40 268" />
            </g>
            {/* small gold joins */}
            {[
              [88, 70],
              [66, 132],
              [120, 176],
              [96, 250],
            ].map(([cx, cy]) => (
              <circle
                key={`${cx}-${cy}`}
                cx={cx}
                cy={cy}
                r="3"
                fill="#fff3c4"
                opacity="0.95"
              />
            ))}
          </svg>

          {/* caption */}
          <div
            className="absolute inset-x-0 bottom-0 rounded-b-[20px] px-5 py-4"
            style={{
              transform: "translateZ(20px)",
              background:
                "linear-gradient(0deg, rgba(8,6,5,0.85) 0%, rgba(8,6,5,0) 100%)",
            }}
          >
            <p className="text-sm font-bold tracking-wide text-amber-100">
              {en ? "金継ぎ · Kintsugi" : "金継ぎ"}
            </p>
            <p className="mt-1 text-[11px] leading-relaxed text-amber-100/55">
              {en
                ? "Broken, then made more beautiful."
                : "壊れたからこそ、より美しく。"}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
