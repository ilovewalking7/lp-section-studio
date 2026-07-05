import type { DemoMeta } from "@/registry";

export const meta: DemoMeta = {
  name: "浮遊シェイプ",
  category: "背景アニメ",
  description: "三角・円・四角のアウトラインがゆっくり浮遊回転する、紫紺の背景。",
  align: "full",
  isNew: true,
  tags: ["background", "animation", "shapes"],
};

export default function FloatingShapes() {
  const en =
    typeof document !== "undefined" &&
    document.documentElement.lang === "en";
  const shapes = [
    { type: "circle", x: "12%", y: "24%", s: 80, c: "#a78bfa", dur: "14s", d: "0s" },
    { type: "tri", x: "78%", y: "18%", s: 70, c: "#22d3ee", dur: "18s", d: "1s" },
    { type: "square", x: "66%", y: "68%", s: 64, c: "#f472b6", dur: "16s", d: "2s" },
    { type: "circle", x: "24%", y: "72%", s: 54, c: "#818cf8", dur: "20s", d: "0.5s" },
    { type: "tri", x: "44%", y: "40%", s: 90, c: "#34d399", dur: "22s", d: "1.5s" },
  ];
  return (
    <section className="relative w-full overflow-hidden bg-[#0c0a1a] py-28 text-white">
      <style>{`
        @keyframes bg2-float {
          0%,100% { transform: translateY(0) rotate(0deg); }
          50% { transform: translateY(-26px) rotate(180deg); }
        }
        @media (prefers-reduced-motion: reduce) {
          .bg2-shape { animation: none !important; }
        }
      `}</style>
      <div className="pointer-events-none absolute inset-0">
        {shapes.map((sh, i) => (
          <div
            key={i}
            className="bg2-shape absolute"
            style={{
              left: sh.x,
              top: sh.y,
              width: sh.s,
              height: sh.s,
              animation: `bg2-float ${sh.dur} ease-in-out ${sh.d} infinite`,
            }}
          >
            {sh.type === "circle" && (
              <div
                className="h-full w-full rounded-full border-2"
                style={{ borderColor: sh.c, opacity: 0.5 }}
              />
            )}
            {sh.type === "square" && (
              <div
                className="h-full w-full rounded-md border-2"
                style={{ borderColor: sh.c, opacity: 0.5 }}
              />
            )}
            {sh.type === "tri" && (
              <svg viewBox="0 0 100 100" className="h-full w-full" aria-hidden="true">
                <polygon
                  points="50,8 92,90 8,90"
                  fill="none"
                  stroke={sh.c}
                  strokeWidth="4"
                  opacity="0.5"
                />
              </svg>
            )}
          </div>
        ))}
      </div>
      <div className="relative mx-auto max-w-3xl px-6 text-center">
        <span className="inline-block rounded-full border border-violet-400/20 bg-violet-400/5 px-4 py-1 text-xs font-medium tracking-wide text-violet-200/80">
          Floating Shapes
        </span>
        <h1 className="mt-6 text-4xl font-bold tracking-tight sm:text-6xl">
          {en ? "Geometric fragments, gently adrift" : "ふわり漂う、幾何学のかけら"}
        </h1>
        <p className="mx-auto mt-5 max-w-xl text-lg text-violet-50/70">
          {en
            ? "Outlined shapes drift up and down, filling the space as they slowly rotate."
            : "線画のシェイプが上下に浮き、ゆっくり回転しながら空間を埋めます。"}
        </p>
      </div>
    </section>
  );
}
