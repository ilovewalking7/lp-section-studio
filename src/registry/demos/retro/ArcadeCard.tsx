import { Gamepad2, Star, Trophy } from "lucide-react";
import type { DemoMeta } from "@/registry";

export const meta: DemoMeta = {
  name: "アーケード・カード",
  category: "レトロ・Y2K",
  description: "ゲーム筐体風のスコア表示とネオングローを持つアーケードカード。",
  align: "center",
  isNew: true,
  tags: ["retro", "y2k", "neon", "arcade"],
};

export default function ArcadeCard() {
  const en =
    typeof document !== "undefined" &&
    document.documentElement.lang === "en";
  return (
    <div className="bg-[#0d0221] p-5 sm:p-10">
      <div
        className="relative w-full max-w-[340px] overflow-hidden rounded-2xl border-2 border-[#ff2e97] bg-gradient-to-b from-[#1a0b2e] to-[#0d0221] p-6"
        style={{ boxShadow: "0 0 30px rgba(255,46,151,0.5), inset 0 0 30px rgba(124,58,237,0.2)" }}
      >
        {/* scanline overlay */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 opacity-20"
          style={{
            backgroundImage:
              "repeating-linear-gradient(0deg, transparent 0 2px, rgba(0,0,0,0.6) 2px 4px)",
          }}
        />

        <div className="relative flex items-center justify-between">
          <span className="inline-flex items-center gap-1.5 rounded bg-[#05d9e8]/15 px-2 py-1 font-mono text-[10px] font-bold uppercase tracking-widest text-[#05d9e8]">
            <Gamepad2 className="size-3" />
            Stage 4
          </span>
          <div className="flex gap-0.5">
            {[0, 1, 2].map((i) => (
              <Star
                key={i}
                className="size-4 fill-[#fde047] text-[#fde047]"
                style={{ filter: "drop-shadow(0 0 4px rgba(253,224,71,0.9))" }}
              />
            ))}
          </div>
        </div>

        <div
          className="relative mx-auto my-6 grid size-24 place-items-center rounded-xl border border-[#05d9e8]/40 bg-[#0d0221]"
          style={{ boxShadow: "inset 0 0 20px rgba(5,217,232,0.3)" }}
        >
          <Trophy
            className="size-12 text-[#fde047]"
            style={{ filter: "drop-shadow(0 0 10px rgba(253,224,71,0.8))" }}
          />
        </div>

        <h3
          className="relative text-center font-mono text-xl font-black uppercase tracking-wide text-white"
          style={{ textShadow: "0 0 10px rgba(5,217,232,0.8)" }}
        >
          {en ? "High Score!" : "ハイスコア達成"}
        </h3>

        <div className="relative mt-4 rounded-lg border border-[#ff2e97]/40 bg-black/40 p-4 text-center font-mono">
          <p className="text-[10px] uppercase tracking-[0.3em] text-[#d8b4fe]">Score</p>
          <p
            className="text-3xl font-black text-[#ff2e97]"
            style={{ textShadow: "0 0 14px rgba(255,46,151,0.9)" }}
          >
            999,950
          </p>
        </div>

        <button className="relative mt-5 w-full rounded-md bg-[#ff2e97] py-2.5 font-mono text-sm font-bold uppercase tracking-widest text-white shadow-[0_0_20px_rgba(255,46,151,0.6)] transition-all hover:shadow-[0_0_32px_rgba(255,46,151,0.9)]">
          Press Start
        </button>
      </div>
    </div>
  );
}
