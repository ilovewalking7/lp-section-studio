import type { DemoMeta } from "@/registry";

export const meta: DemoMeta = {
  name: "凝った下線リンク",
  category: "Awwwards",
  description: "ホバーで多彩にアニメーションする、凝ったアンダーラインのリンク集。",
  align: "full",
  isNew: true,
  tags: ["awwwards", "interaction", "animation"],
};

export default function LinkUnderlineFancy() {
  const en = typeof document !== "undefined" && document.documentElement.lang === "en";
  return (
    <section className="aww-ul relative w-full bg-neutral-950 px-6 py-28 text-neutral-50 sm:px-16">
      <div className="mx-auto flex max-w-[900px] flex-col gap-10 text-2xl font-medium tracking-tight sm:text-3xl">
        <a href="#" onClick={(e) => e.preventDefault()} className="ul-wipe self-start">
          {en ? "Wipe Slide" : "ワイプ・スライド"}
        </a>
        <a href="#" onClick={(e) => e.preventDefault()} className="ul-center self-start">
          {en ? "Expand From Center" : "中央から広がる"}
        </a>
        <a href="#" onClick={(e) => e.preventDefault()} className="ul-fold self-start">
          {en ? "Fold Up" : "上下に折り返す"}
        </a>
        <a href="#" onClick={(e) => e.preventDefault()} className="ul-glow self-start">
          {en ? "With Glow" : "グロー付き"}
        </a>
      </div>

      <style>{`
        .aww-ul a {
          position: relative;
          color: #f5f5f5;
          text-decoration: none;
          padding-bottom: 4px;
        }
        .aww-ul a::after {
          content: "";
          position: absolute;
          left: 0; bottom: 0;
          height: 2px; width: 100%;
          background: #fcd34d;
        }
        .ul-wipe::after { transform: scaleX(0); transform-origin: right; transition: transform .4s cubic-bezier(.16,1,.3,1); }
        .ul-wipe:hover::after { transform: scaleX(1); transform-origin: left; }
        .ul-center::after { transform: scaleX(0); transform-origin: center; transition: transform .4s cubic-bezier(.16,1,.3,1); }
        .ul-center:hover::after { transform: scaleX(1); }
        .ul-fold { overflow: hidden; }
        .ul-fold::after { transform: translateY(6px); opacity: 0; transition: transform .35s ease, opacity .35s ease; }
        .ul-fold:hover::after { transform: translateY(0); opacity: 1; }
        .ul-glow::after { transform: scaleX(0); transform-origin: left; transition: transform .45s cubic-bezier(.16,1,.3,1), box-shadow .45s ease; }
        .ul-glow:hover::after { transform: scaleX(1); box-shadow: 0 0 12px 1px rgba(252,211,77,.7); }
        @media (prefers-reduced-motion: reduce) {
          .aww-ul a::after { transition: none; }
        }
      `}</style>
    </section>
  );
}
