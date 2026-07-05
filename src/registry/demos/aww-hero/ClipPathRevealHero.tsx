import type { DemoMeta } from "@/registry";

export const meta: DemoMeta = {
  name: "クリップパス展開ヒーロー",
  category: "Awwwards",
  description:
    "clip-pathの多角形マスクが展開しながら現れる、幾何学的でドラマチックなヒーロー。",
  align: "full",
  isNew: true,
  tags: ["awwwards", "hero", "animation"],
};

export default function ClipPathRevealHero() {
  const en =
    typeof document !== "undefined" &&
    document.documentElement.lang === "en";
  return (
    <section className="aww-cp relative w-full overflow-hidden bg-[#0a0a0a] px-5 py-24 text-white sm:px-10 sm:py-32">
      <style>{`
        @keyframes aww-cp-reveal {
          from { clip-path: polygon(0 0, 0 0, 0 100%, 0 100%); }
          to   { clip-path: polygon(0 0, 100% 0, 100% 100%, 0 100%); }
        }
        @keyframes aww-cp-diag {
          from { clip-path: polygon(0 0, 0 0, 0 0); }
          to   { clip-path: polygon(0 0, 100% 0, 0 100%); }
        }
        @keyframes aww-cp-up { from{opacity:0;transform:translateY(24px);} to{opacity:1;transform:translateY(0);} }
        .aww-cp-reveal{ animation: aww-cp-reveal 1.1s cubic-bezier(.77,0,.18,1) both; }
        .aww-cp-diag{ animation: aww-cp-diag 1.3s cubic-bezier(.77,0,.18,1) .2s both; }
        .aww-cp-up{ animation: aww-cp-up .9s ease .6s both; }
        @media (prefers-reduced-motion: reduce){
          .aww-cp-reveal,.aww-cp-diag,.aww-cp-up{ animation:none!important; clip-path:none!important; opacity:1!important; }
        }
      `}</style>

      <div className="pointer-events-none absolute inset-0">
        <div className="aww-cp-reveal absolute inset-0 bg-[linear-gradient(115deg,#1d4ed8,#7c3aed)]" />
        <div className="aww-cp-diag absolute inset-0 bg-[linear-gradient(115deg,#db2777,#f59e0b)] opacity-90" />
        <div className="absolute inset-0 bg-black/35" />
      </div>

      <div className="relative mx-auto max-w-[1400px]">
        <p className="aww-cp-up mb-8 text-[11px] font-semibold uppercase tracking-[0.5em] text-white/70">
          clip-path / Reveal
        </p>
        <h1
          className="aww-cp-up font-black uppercase leading-[0.82] tracking-[-0.04em]"
          style={{ fontSize: "clamp(3rem,12vw,11rem)" }}
        >
          Cut
          <br />
          The Frame
        </h1>
        <p className="aww-cp-up mt-9 max-w-md text-base leading-relaxed text-white/75">
          {en
            ? "A polygonal mask cuts diagonally open to reveal the background — a transition where the shape itself becomes the motion."
            : "多角形のマスクが斜めに切り開きながら背景を露わにする。形そのものが動きになるトランジション。"}
        </p>
      </div>
    </section>
  );
}
