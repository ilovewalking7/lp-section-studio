import { useEffect, useRef, useState } from "react";
import { Aperture, Box, Cloud, Command, Hexagon, Layers, Orbit, Triangle } from "lucide-react";
import { cn } from "@/lib/utils";
import type { DemoMeta } from "@/registry";

export const meta: DemoMeta = {
  name: "アニメ・ロゴクラウド",
  category: "マーケティング",
  description: "ロゴが時間差でフェード&スケールイン、その後ふわりと浮遊するロゴクラウド。",
  align: "full",
  isNew: true,
  tags: ["marketing", "animation", "section"],
};

const LOGOS = [
  { icon: Hexagon, name: "Hexly" },
  { icon: Orbit, name: "Orbital" },
  { icon: Triangle, name: "Prism" },
  { icon: Cloud, name: "Nimbus" },
  { icon: Command, name: "Cmd" },
  { icon: Box, name: "Crate" },
  { icon: Layers, name: "Stack" },
  { icon: Aperture, name: "Lens" },
];

export default function LogoCloudAnimated() {
  const en =
    typeof document !== "undefined" &&
    document.documentElement.lang === "en";
  const ref = useRef<HTMLDivElement>(null);
  const [shown, setShown] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      (entries) => {
        if (entries.some((e) => e.isIntersecting)) {
          setShown(true);
          io.disconnect();
        }
      },
      { threshold: 0.3 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <section className="w-full bg-neutral-950 px-4 py-20 text-white sm:px-8">
      <style>{`
        @keyframes logo-float { 0%,100% { transform: translateY(0); } 50% { transform: translateY(-6px); } }
      `}</style>
      <div ref={ref} className="mx-auto max-w-5xl text-center">
        <p className="mb-10 text-sm font-medium uppercase tracking-widest text-white/40">
          {en ? "Trusted by leading teams worldwide" : "世界の先進チームが採用"}
        </p>
        <div className="grid grid-cols-2 gap-px overflow-hidden rounded-2xl border border-white/10 bg-white/5 sm:grid-cols-4">
          {LOGOS.map((l, i) => {
            const Icon = l.icon;
            return (
              <div
                key={l.name}
                className={cn(
                  "group flex items-center justify-center gap-2.5 bg-neutral-950 px-6 py-8 transition-all duration-700 ease-out hover:bg-white/[0.04]",
                  shown ? "scale-100 opacity-100" : "scale-90 opacity-0",
                )}
                style={{ transitionDelay: `${i * 90}ms` }}
              >
                <span style={{ animation: shown ? `logo-float 4s ease-in-out ${i * 0.25}s infinite` : "none" }}>
                  <Icon className="h-6 w-6 text-white/50 transition-colors group-hover:text-indigo-300" />
                </span>
                <span className="text-base font-semibold text-white/55 transition-colors group-hover:text-white">
                  {l.name}
                </span>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
