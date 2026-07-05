import { useState } from "react";
import type { DemoMeta } from "@/registry";

export const meta: DemoMeta = {
  name: "重なりアバター＋ツールチップ",
  category: "マーケティング",
  description: "重なったアバターにホバーすると名前ツールチップがふわっと出て、少し持ち上がる。",
  align: "full",
  isNew: true,
  tags: ["social-proof", "testimonial", "animation"],
};

const PEOPLE = [
  { name: "佐藤 美咲", nameEn: "Misaki Sato", role: "PdM", color: "from-rose-500 to-pink-500" },
  { name: "Liam Carter", nameEn: "Liam Carter", role: "Engineer", color: "from-sky-500 to-cyan-500" },
  { name: "田中 健", nameEn: "Ken Tanaka", role: "Designer", color: "from-violet-500 to-indigo-500" },
  { name: "Aria Novak", nameEn: "Aria Novak", role: "Founder", color: "from-amber-500 to-orange-500" },
  { name: "鈴木 葵", nameEn: "Aoi Suzuki", role: "Marketer", color: "from-emerald-500 to-teal-500" },
  { name: "Noah Kim", nameEn: "Noah Kim", role: "CTO", color: "from-fuchsia-500 to-purple-500" },
];

function initials(name: string) {
  return name.trim().split(/\s+/).map((p) => p[0]).slice(0, 2).join("");
}

export default function AnimatedAvatarTooltip() {
  const en =
    typeof document !== "undefined" &&
    document.documentElement.lang === "en";
  const [active, setActive] = useState<number | null>(null);
  return (
    <section className="w-full px-6 py-16">
      <div className="mx-auto flex max-w-2xl flex-col items-center text-center">
        <div className="flex -space-x-3">
          {PEOPLE.map((p, i) => (
            <div
              key={p.name}
              className="group relative"
              onMouseEnter={() => setActive(i)}
              onMouseLeave={() => setActive((cur) => (cur === i ? null : cur))}
              onFocus={() => setActive(i)}
              onBlur={() => setActive((cur) => (cur === i ? null : cur))}
            >
              <button
                type="button"
                aria-label={`${en ? p.nameEn : p.name}・${p.role}`}
                className={`flex size-12 items-center justify-center rounded-full bg-gradient-to-br ${p.color} text-sm font-bold text-white ring-4 ring-background transition-transform duration-200 hover:z-10 hover:-translate-y-1.5 hover:scale-110 focus:outline-none focus-visible:ring-primary`}
              >
                {initials(en ? p.nameEn : p.name)}
              </button>
              <div
                role="tooltip"
                className={`pointer-events-none absolute bottom-full left-1/2 z-20 mb-3 -translate-x-1/2 whitespace-nowrap rounded-lg bg-foreground px-3 py-1.5 text-xs text-background shadow-lg transition-all duration-200 ${
                  active === i ? "translate-y-0 opacity-100" : "translate-y-1 opacity-0"
                }`}
              >
                <span className="font-semibold">{en ? p.nameEn : p.name}</span>
                <span className="ml-1 opacity-70">{p.role}</span>
                <span className="absolute left-1/2 top-full size-2 -translate-x-1/2 -translate-y-1 rotate-45 bg-foreground" />
              </div>
            </div>
          ))}
          <span className="flex size-12 items-center justify-center rounded-full border border-dashed border-border bg-muted text-xs font-semibold text-muted-foreground ring-4 ring-background">
            +9k
          </span>
        </div>
        <h2 className="mt-6 text-2xl font-semibold tracking-tight">
          {en ? "Trusted by 9,000+ teams" : "9,000+ のチームが利用中"}
        </h2>
        <p className="mt-2 text-muted-foreground">
          {en ? "Hover over an avatar to see who's here." : "アバターにカーソルを合わせてみてください。"}
        </p>
      </div>
    </section>
  );
}
