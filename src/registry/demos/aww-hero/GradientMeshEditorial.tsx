import type { DemoMeta } from "@/registry";

export const meta: DemoMeta = {
  name: "グラデメッシュ・エディトリアル",
  category: "Awwwards",
  description:
    "複数の放射グラデを溶け合わせたメッシュ背景に、雑誌的なタイポグリッドを重ねたエディトリアル。",
  align: "full",
  isNew: true,
  tags: ["awwwards", "hero", "animation"],
};

export default function GradientMeshEditorial() {
  const en =
    typeof document !== "undefined" &&
    document.documentElement.lang === "en";
  return (
    <section className="aww-gm relative w-full overflow-hidden bg-[#faf7f2] px-5 py-20 text-[#15120e] sm:px-10 sm:py-28">
      <style>{`
        @keyframes aww-gm-drift {
          0%,100% { transform: translate(0,0) scale(1); }
          33% { transform: translate(3%,-2%) scale(1.08); }
          66% { transform: translate(-2%,3%) scale(0.96); }
        }
        @keyframes aww-gm-in { from{opacity:0;transform:translateY(20px);} to{opacity:1;transform:translateY(0);} }
        .aww-gm-mesh{ animation: aww-gm-drift 20s ease-in-out infinite; }
        .aww-gm-in{ animation: aww-gm-in .9s cubic-bezier(.16,1,.3,1) both; }
        @media (prefers-reduced-motion: reduce){ .aww-gm-mesh,.aww-gm-in{animation:none!important;} }
      `}</style>

      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div
          className="aww-gm-mesh absolute -left-1/4 -top-1/4 h-[150%] w-[150%] opacity-70 blur-[40px]"
          style={{
            backgroundImage:
              "radial-gradient(circle at 20% 30%,#fca5a5,transparent 40%),radial-gradient(circle at 75% 25%,#a5b4fc,transparent 42%),radial-gradient(circle at 60% 80%,#fcd34d,transparent 40%),radial-gradient(circle at 30% 75%,#6ee7b7,transparent 40%)",
          }}
        />
      </div>

      <div className="relative mx-auto max-w-[1500px]">
        <div className="aww-gm-in flex flex-wrap items-center justify-between gap-3 border-b border-[#15120e]/15 pb-5 text-[11px] font-semibold uppercase tracking-[0.35em]">
          <span>Mesh Quarterly</span>
          <span>№ 12 — Spring</span>
          <span>¥0 / Free</span>
        </div>

        <div className="mt-10 grid gap-8 lg:grid-cols-12">
          <h1
            className="aww-gm-in col-span-12 font-black leading-[0.86] tracking-[-0.04em] lg:col-span-8"
            style={{ fontSize: "clamp(2.6rem,8vw,7rem)", animationDelay: ".08s" }}
          >
            {en ? (
              <>
                Blending color
                <br />
                gives words their
                <span className="italic"> warmth</span>.
              </>
            ) : (
              <>
                溶け合う色が、
                <br />
                言葉に
                <span className="italic">温度</span>を与える。
              </>
            )}
          </h1>
          <div className="aww-gm-in col-span-12 flex flex-col justify-end lg:col-span-4" style={{ animationDelay: ".18s" }}>
            <p className="text-base leading-relaxed text-[#3b362f]">
              {en
                ? "Just a few radial gradients layered, blurred, and melted together. An organic mesh background built without a single image."
                : "数枚の放射グラデーションを重ね、ぼかして溶かすだけ。画像を一切使わずに有機的なメッシュ背景を構成しています。"}
            </p>
            <button className="mt-6 self-start rounded-full bg-[#15120e] px-7 py-3 text-sm font-semibold text-[#faf7f2] transition-transform hover:-translate-y-0.5">
              {en ? "Read this issue" : "号を読む"}
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
