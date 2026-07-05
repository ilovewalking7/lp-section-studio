import { useEffect, useRef } from "react";
import type { DemoMeta } from "@/registry";

export const meta: DemoMeta = {
  name: "ドットグリッド・スポット",
  category: "背景アニメ",
  description: "ドット格子をマウスのスポットライトが照らす、ローズ調の背景。",
  align: "full",
  isNew: true,
  tags: ["background", "animation", "spotlight"],
};

export default function DotGridSpotlight() {
  const en =
    typeof document !== "undefined" &&
    document.documentElement.lang === "en";
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const onMove = (e: MouseEvent) => {
      const r = el.getBoundingClientRect();
      el.style.setProperty("--sx", `${e.clientX - r.left}px`);
      el.style.setProperty("--sy", `${e.clientY - r.top}px`);
    };
    el.addEventListener("mousemove", onMove);
    return () => el.removeEventListener("mousemove", onMove);
  }, []);

  return (
    <section
      ref={ref}
      className="relative w-full overflow-hidden bg-[#180a12] py-28 text-white"
      style={{ ["--sx" as string]: "50%", ["--sy" as string]: "30%" }}
    >
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          backgroundImage:
            "radial-gradient(circle, rgba(244,114,182,0.35) 1.2px, transparent 1.3px)",
          backgroundSize: "22px 22px",
        }}
      />
      <div
        className="pointer-events-none absolute inset-0 transition-[background] duration-150"
        style={{
          background:
            "radial-gradient(300px circle at var(--sx) var(--sy), rgba(244,114,182,0.25), transparent 70%)",
        }}
      />
      <div className="relative mx-auto max-w-3xl px-6 text-center">
        <span className="inline-block rounded-full border border-pink-400/20 bg-pink-400/5 px-4 py-1 text-xs font-medium tracking-wide text-pink-200/80">
          Spotlight Grid
        </span>
        <h1 className="mt-6 text-4xl font-bold tracking-tight sm:text-6xl">
          {en ? "Only where the light touches, it glows" : "光が触れた場所だけ、輝く"}
        </h1>
        <p className="mx-auto mt-5 max-w-xl text-lg text-pink-50/70">
          {en
            ? "A spotlight that follows your cursor lights up the quiet dot grid."
            : "カーソルに追従するスポットライトが、静かなドット格子を照らし出します。"}
        </p>
      </div>
    </section>
  );
}
