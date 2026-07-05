import { Star } from "lucide-react";
import type { DemoMeta } from "@/registry";

export const meta: DemoMeta = {
  name: "レトロ・マーキー",
  category: "レトロ・Y2K",
  description: "90年代Web風の無限スクロールするネオン・マーキーバナー。",
  align: "full",
  isNew: true,
  tags: ["retro", "y2k", "marquee", "90s"],
};

const items = [
  "★ WELCOME TO THE NET ★",
  "NEON DREAMS 24/7",
  "SIGN MY GUESTBOOK",
  "BEST VIEWED IN 800x600",
  "UNDER CONSTRUCTION",
];

export default function RetroMarquee() {
  // duplicate content for a seamless loop
  const loop = [...items, ...items];

  return (
    <div className="w-full bg-[#0d0221] py-10">
      <style>{`
        @keyframes retro-marquee {
          from { transform: translateX(0); }
          to { transform: translateX(-50%); }
        }
      `}</style>

      <div
        className="relative overflow-hidden border-y-2 border-[#ff2e97] bg-gradient-to-r from-[#1a0b2e] via-[#2a0b4e] to-[#1a0b2e] py-3"
        style={{ boxShadow: "0 0 24px rgba(255,46,151,0.4)" }}
      >
        <div
          className="flex w-max gap-10 whitespace-nowrap"
          style={{ animation: "retro-marquee 18s linear infinite" }}
        >
          {loop.map((text, i) => (
            <span
              key={i}
              className="flex items-center gap-3 font-mono text-lg font-black uppercase italic tracking-wider text-[#05d9e8]"
              style={{ textShadow: "0 0 12px rgba(5,217,232,0.9)" }}
            >
              <Star
                className="size-4 fill-[#fde047] text-[#fde047]"
                style={{ filter: "drop-shadow(0 0 5px rgba(253,224,71,0.9))" }}
              />
              {text}
            </span>
          ))}
        </div>

        {/* edge fades */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-y-0 left-0 w-16 bg-gradient-to-r from-[#1a0b2e] to-transparent"
        />
        <div
          aria-hidden
          className="pointer-events-none absolute inset-y-0 right-0 w-16 bg-gradient-to-l from-[#1a0b2e] to-transparent"
        />
      </div>
    </div>
  );
}
