import { useEffect, useState } from "react";
import {
  Hexagon,
  Triangle,
  Circle,
  Square,
  Diamond,
  Aperture,
  Command,
  Boxes,
  Gem,
  Sparkle,
  Zap,
  Star,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";
import type { DemoMeta } from "@/registry";

export const meta: DemoMeta = {
  name: "ロゴ・オーブ スフィア",
  category: "3Dアニメ",
  description:
    "顧客ロゴが3D球面に並びゆっくり自転。多数の利用ブランドを一望させる社会的証明ヒーロー。",
  align: "full",
  isNew: true,
  level: "advanced",
  tags: ["3d", "psychology", "conversion", "animation"],
  principle:
    "社会的証明 — 多数のブランドが球面に密集して見えることで「みんな使っている」という安心と同調を生む。",
};

type Brand = { icon: LucideIcon; mark: string; hue: number };

const BRANDS: Brand[] = [
  { icon: Hexagon, mark: "Nexa", hue: 265 },
  { icon: Triangle, mark: "Vora", hue: 200 },
  { icon: Circle, mark: "Orbit", hue: 320 },
  { icon: Square, mark: "Quad", hue: 175 },
  { icon: Diamond, mark: "Prism", hue: 35 },
  { icon: Aperture, mark: "Lens", hue: 245 },
  { icon: Command, mark: "Cmd", hue: 290 },
  { icon: Boxes, mark: "Stak", hue: 160 },
  { icon: Gem, mark: "Gemi", hue: 210 },
  { icon: Sparkle, mark: "Glow", hue: 50 },
  { icon: Zap, mark: "Volt", hue: 280 },
  { icon: Star, mark: "Nova", hue: 190 },
];

// 球面に均等配置（フィボナッチ格子）— レイアウト計算は描画前に固定値で行う
const RADIUS = 168;
const NODES = BRANDS.flatMap((b, i) => [b, BRANDS[(i + 6) % BRANDS.length]]).map(
  (brand, i, arr) => {
    const n = arr.length;
    const y = 1 - (i / (n - 1)) * 2; // 1 .. -1
    const r = Math.sqrt(Math.max(0, 1 - y * y));
    const theta = i * 2.399963229728653; // golden angle
    return {
      brand,
      x: Math.cos(theta) * r * RADIUS,
      y: y * RADIUS,
      z: Math.sin(theta) * r * RADIUS,
    };
  }
);

export default function LogoOrbSphere() {
  const en =
    typeof document !== "undefined" && document.documentElement.lang === "en";
  const [spin, setSpin] = useState(0);

  useEffect(() => {
    const reduce =
      typeof window !== "undefined" &&
      typeof window.matchMedia === "function" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) return;
    let raf = 0;
    let start = 0;
    const loop = (now: number) => {
      if (!start) start = now;
      setSpin((((now - start) / 1000) * 9) % 360);
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);
    return () => {
      if (raf) cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <section
      className="relative w-full overflow-hidden bg-[#06060e] py-20 text-white"
      style={{ perspective: "1200px" }}
    >
      {/* ambient glow */}
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_42%,rgba(120,90,255,0.18),transparent_55%),radial-gradient(circle_at_18%_82%,rgba(45,212,191,0.12),transparent_50%)]" />

      <div className="relative mx-auto grid max-w-6xl items-center gap-10 px-6 lg:grid-cols-[1.05fr_1fr]">
        {/* copy */}
        <div className="text-center lg:text-left">
          <p className="mb-5 text-xs font-medium uppercase tracking-[0.32em] text-indigo-200/70">
            {en ? "Trusted worldwide" : "世界で選ばれています"}
          </p>
          <h2 className="text-balance text-5xl font-semibold leading-[1.04] tracking-tight sm:text-6xl">
            <span className="bg-gradient-to-r from-teal-200 via-indigo-200 to-fuchsia-200 bg-clip-text text-transparent">
              1,200+
            </span>{" "}
            {en ? (
              <>
                teams
                <br />
                already build on it
              </>
            ) : (
              <>
                チームが
                <br />
                すでに利用中
              </>
            )}
          </h2>
          <p className="mx-auto mt-6 max-w-md text-pretty text-base text-white/55 lg:mx-0 sm:text-lg">
            {en
              ? "From seed startups to public companies — the names you know ship faster with us."
              : "スタートアップから上場企業まで。あなたが知るブランドが、これで速く届けています。"}
          </p>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-x-8 gap-y-3 lg:justify-start">
            {[
              { v: "98%", l: en ? "Renewal" : "継続率" },
              { v: "4.9★", l: en ? "Avg. rating" : "平均評価" },
              { v: "60+", l: en ? "Countries" : "カ国" },
            ].map((s) => (
              <div key={s.l} className="text-center lg:text-left">
                <div className="text-2xl font-semibold tracking-tight text-white">
                  {s.v}
                </div>
                <div className="text-[11px] uppercase tracking-wider text-white/45">
                  {s.l}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* 3D logo sphere */}
        <div
          className="relative mx-auto h-[420px] w-full max-w-[420px]"
          style={{ perspective: "1200px" }}
          role="img"
          aria-label={
            en ? "Customer logos on a rotating sphere" : "回転する球面に並ぶ顧客ロゴ"
          }
        >
          <div
            className="absolute left-1/2 top-1/2"
            style={{
              transformStyle: "preserve-3d",
              transform: `translate(-50%,-50%) rotateX(-12deg) rotateY(${spin}deg)`,
            }}
          >
            {NODES.map((node, i) => {
              const { brand } = node;
              const Icon = brand.icon;
              return (
                <div
                  key={`logo-${i}`}
                  className="absolute left-0 top-0 -ml-9 -mt-9 flex h-[72px] w-[72px] flex-col items-center justify-center gap-1 rounded-2xl border border-white/12 backdrop-blur-sm"
                  style={{
                    transform: `translate3d(${node.x}px, ${node.y}px, ${node.z}px) rotateY(${-spin}deg) rotateX(12deg)`,
                    background: `linear-gradient(150deg, hsla(${brand.hue},85%,72%,0.22), hsla(${brand.hue},80%,52%,0.05))`,
                    boxShadow: `inset 0 1px 0 rgba(255,255,255,0.35), 0 14px 30px -16px hsla(${brand.hue},80%,45%,0.6)`,
                  }}
                >
                  <Icon
                    className="h-5 w-5"
                    style={{ color: `hsl(${brand.hue},90%,82%)` }}
                    strokeWidth={2.2}
                  />
                  <span className="text-[11px] font-semibold tracking-tight text-white/85">
                    {brand.mark}
                  </span>
                </div>
              );
            })}
          </div>

          {/* soft core glow behind sphere */}
          <div className="pointer-events-none absolute left-1/2 top-1/2 h-40 w-40 -translate-x-1/2 -translate-y-1/2 rounded-full bg-indigo-500/20 blur-3xl" />
        </div>
      </div>
    </section>
  );
}
