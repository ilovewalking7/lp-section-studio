import { ArrowRight } from "lucide-react";
import type { DemoMeta } from "@/registry";

export const meta: DemoMeta = {
  name: "ポップCTAバンド",
  category: "プレイフル",
  description: "紙吹雪SVG付きの陽気なCTAバンド。",
  align: "full",
  isNew: true,
  tags: ["playful", "rounded", "cta"],
};

const confetti = [
  { x: 8, y: 20, r: 8, c: "#ffd166", rot: 20 },
  { x: 20, y: 70, r: 6, c: "#06d6a0", rot: -15 },
  { x: 34, y: 30, r: 5, c: "#fff", rot: 40 },
  { x: 50, y: 80, r: 7, c: "#b388ff", rot: 0 },
  { x: 66, y: 25, r: 6, c: "#fff", rot: -30 },
  { x: 80, y: 65, r: 8, c: "#ffd166", rot: 15 },
  { x: 92, y: 35, r: 5, c: "#06d6a0", rot: -45 },
  { x: 14, y: 50, r: 5, c: "#fff", rot: 30 },
  { x: 74, y: 18, r: 6, c: "#b388ff", rot: -20 },
];

export default function PlayfulCTA() {
  const en =
    typeof document !== "undefined" &&
    document.documentElement.lang === "en";
  return (
    <section
      className="font-rounded relative w-full overflow-hidden rounded-3xl px-6 py-16 text-center sm:px-12"
      style={{ background: "linear-gradient(120deg,#ff8fab 0%,#b388ff 100%)" }}
    >
      {/* confetti */}
      <svg
        viewBox="0 0 100 100"
        preserveAspectRatio="none"
        className="pointer-events-none absolute inset-0 h-full w-full opacity-80"
        aria-hidden
      >
        {confetti.map((c, i) => (
          <rect
            key={i}
            x={c.x}
            y={c.y}
            width={c.r}
            height={c.r}
            rx={c.r / 3}
            fill={c.c}
            transform={`rotate(${c.rot} ${c.x + c.r / 2} ${c.y + c.r / 2})`}
          />
        ))}
      </svg>

      <div className="relative z-10 mx-auto max-w-2xl">
        <h2 className="text-3xl font-extrabold leading-tight tracking-tight text-white sm:text-5xl">
          {en ? "Let's get started!" : "さあ、はじめよう！"}
        </h2>
        <p className="mx-auto mt-4 max-w-md text-base text-white/90 sm:text-lg">
          {en
            ? "No credit card needed. Your studio is up and running in 30 seconds."
            : "クレジットカードは不要。30秒であなたのスタジオが立ち上がります。"}
        </p>
        <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <button className="group inline-flex items-center gap-2 rounded-full bg-white px-8 py-3.5 text-base font-extrabold text-slate-800 shadow-[0_8px_0_rgba(0,0,0,0.15)] transition-all duration-150 hover:-translate-y-0.5 active:translate-y-1">
            {en ? "Start for free" : "無料ではじめる"}
            <ArrowRight className="size-5 transition-transform group-hover:translate-x-1" />
          </button>
          <button className="rounded-full border-2 border-white/70 px-8 py-3.5 text-base font-extrabold text-white transition-all hover:bg-white/15">
            {en ? "See the deck" : "資料をみる"}
          </button>
        </div>
      </div>
    </section>
  );
}
