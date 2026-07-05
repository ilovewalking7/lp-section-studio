import { useEffect, useRef, useState } from "react";
import type { DemoMeta } from "@/registry";

export const meta: DemoMeta = {
  name: "ナンバーLEDセクション",
  category: "Awwwards",
  description: "巨大な数字を主役にした、実績指標の編集的なビッグナンバー・セクション。",
  align: "full",
  isNew: true,
  tags: ["awwwards", "typography", "animation"],
};

type Stat = { n: number; suffix: string; label: string };

const STATS: Stat[] = [
  { n: 248, suffix: "+", label: "Projects shipped" },
  { n: 19, suffix: "", label: "Awwwards honors" },
  { n: 100, suffix: "%", label: "Crafted in-house" },
];

function easeOutExpo(t: number) {
  return t === 1 ? 1 : 1 - Math.pow(2, -10 * t);
}

function Counter({ target }: { target: number }) {
  const ref = useRef<HTMLSpanElement | null>(null);
  const [val, setVal] = useState(0);
  const raf = useRef<number | null>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const reduce = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    if (reduce) {
      setVal(target);
      return;
    }
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (!e.isIntersecting) return;
          io.disconnect();
          const start = performance.now();
          const tick = (now: number) => {
            const t = Math.min((now - start) / 1500, 1);
            setVal(Math.round(easeOutExpo(t) * target));
            if (t < 1) raf.current = requestAnimationFrame(tick);
          };
          raf.current = requestAnimationFrame(tick);
        });
      },
      { threshold: 0.4 }
    );
    io.observe(el);
    return () => {
      io.disconnect();
      if (raf.current) cancelAnimationFrame(raf.current);
    };
  }, [target]);

  return (
    <span ref={ref} className="tabular-nums">
      {val}
    </span>
  );
}

export default function NumberLedSection() {
  return (
    <section className="w-full bg-neutral-950 px-6 py-28 text-neutral-50 sm:px-12">
      <div className="mx-auto max-w-[1400px]">
        <p className="mb-16 text-xs uppercase tracking-[0.5em] text-neutral-500">
          By the numbers — 2026
        </p>
        <div className="grid gap-12 sm:grid-cols-3">
          {STATS.map((s) => (
            <div
              key={s.label}
              className="border-t border-neutral-800 pt-6"
            >
              <div
                className="font-black leading-none tracking-[-0.05em]"
                style={{ fontSize: "clamp(4rem, 12vw, 11rem)" }}
              >
                <Counter target={s.n} />
                <span className="text-neutral-600">{s.suffix}</span>
              </div>
              <p className="mt-4 text-sm uppercase tracking-[0.25em] text-neutral-400">
                {s.label}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
