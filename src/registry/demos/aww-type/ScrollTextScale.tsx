import { useEffect, useRef, useState } from "react";
import type { DemoMeta } from "@/registry";

export const meta: DemoMeta = {
  name: "スクロールスケール文字",
  category: "Awwwards",
  description: "ビューポート内の位置に応じて見出しが拡大・鮮明化するスクロール演出。",
  align: "full",
  isNew: true,
  tags: ["awwwards", "typography", "animation"],
};

export default function ScrollTextScale() {
  const ref = useRef<HTMLDivElement | null>(null);
  const [p, setP] = useState(0);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const reduce = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    if (reduce) {
      setP(1);
      return;
    }
    let raf = 0;
    const onScroll = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        const r = el.getBoundingClientRect();
        const vh = window.innerHeight || 1;
        const prog = 1 - Math.min(Math.max(r.top / vh, 0), 1);
        setP(prog);
      });
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      cancelAnimationFrame(raf);
    };
  }, []);

  const scale = 0.7 + p * 0.6;

  return (
    <section
      ref={ref}
      className="flex min-h-[90vh] w-full items-center justify-center overflow-hidden bg-[#101014] px-6 py-28 text-neutral-50"
    >
      <h2
        className="text-center font-black uppercase leading-[0.85] tracking-[-0.03em] will-change-transform"
        style={{
          fontSize: "clamp(2.5rem, 13vw, 12rem)",
          transform: `scale(${scale})`,
          opacity: 0.3 + p * 0.7,
          filter: `blur(${(1 - p) * 10}px)`,
        }}
      >
        SCROLL
        <br />
        TO ZOOM
      </h2>
    </section>
  );
}
