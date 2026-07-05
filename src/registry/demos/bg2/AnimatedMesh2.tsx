import type { DemoMeta } from "@/registry";

export const meta: DemoMeta = {
  name: "メッシュグラデ2",
  category: "背景アニメ",
  description: "複数のカラーブロブが漂って混ざり合う、ライム×インディゴのメッシュ。",
  align: "full",
  isNew: true,
  tags: ["background", "animation", "mesh", "gradient"],
};

export default function AnimatedMesh2() {
  const en =
    typeof document !== "undefined" &&
    document.documentElement.lang === "en";
  const blobs = [
    { c: "#84cc16", x: "18%", y: "28%", dur: "16s", d: "0s" },
    { c: "#6366f1", x: "72%", y: "22%", dur: "20s", d: "2s" },
    { c: "#06b6d4", x: "62%", y: "70%", dur: "18s", d: "1s" },
    { c: "#f472b6", x: "28%", y: "72%", dur: "22s", d: "3s" },
  ];
  return (
    <section className="relative w-full overflow-hidden bg-[#070a12] py-28 text-white">
      <style>{`
        @keyframes bg2-mesh-drift {
          0%,100% { transform: translate(0,0) scale(1); }
          33% { transform: translate(8%,-6%) scale(1.12); }
          66% { transform: translate(-7%,5%) scale(0.92); }
        }
        @media (prefers-reduced-motion: reduce) {
          .bg2-mesh-blob { animation: none !important; }
        }
      `}</style>
      <div className="pointer-events-none absolute inset-0">
        {blobs.map((b, i) => (
          <div
            key={i}
            className="bg2-mesh-blob absolute h-[46vw] w-[46vw] rounded-full opacity-50 blur-[80px]"
            style={{
              left: b.x,
              top: b.y,
              background: b.c,
              transform: "translate(-50%,-50%)",
              animation: `bg2-mesh-drift ${b.dur} ease-in-out ${b.d} infinite`,
            }}
          />
        ))}
      </div>
      <div className="pointer-events-none absolute inset-0 bg-[#070a12]/30" />
      <div className="relative mx-auto max-w-3xl px-6 text-center">
        <span className="inline-block rounded-full border border-white/15 bg-white/5 px-4 py-1 text-xs font-medium tracking-wide text-white/70">
          Mesh Gradient
        </span>
        <h1 className="mt-6 text-4xl font-bold tracking-tight sm:text-6xl">
          {en ? "A mesh of melting color" : "溶け合う、色彩のメッシュ"}
        </h1>
        <p className="mx-auto mt-5 max-w-xl text-lg text-white/70">
          {en
            ? "Lime, indigo, and cyan blobs drift and blend, creating new palettes moment by moment."
            : "ライム・インディゴ・シアンのブロブが漂い、刻々と新しい配色を生みます。"}
        </p>
      </div>
    </section>
  );
}
