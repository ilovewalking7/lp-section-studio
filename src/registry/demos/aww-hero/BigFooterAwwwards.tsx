import type { DemoMeta } from "@/registry";
import { ArrowUpRight } from "lucide-react";

export const meta: DemoMeta = {
  name: "特大フッター（Awwwards風）",
  category: "Awwwards",
  description:
    "画面を埋め尽くす特大ロゴタイポとリンク群で構成した、受賞サイト風の巨大フッター。",
  align: "full",
  isNew: true,
  tags: ["awwwards", "hero", "animation"],
};

const COLS = [
  { h: "Sitemap", links: ["Work", "Studio", "Journal", "Contact"] },
  { h: "Social", links: ["Instagram", "Twitter / X", "Dribbble", "LinkedIn"] },
  { h: "Legal", links: ["Privacy", "Terms", "Cookies", "Imprint"] },
];

export default function BigFooterAwwwards() {
  const en =
    typeof document !== "undefined" &&
    document.documentElement.lang === "en";
  return (
    <footer className="aww-bf relative w-full overflow-hidden bg-[#070707] px-5 pt-20 text-white sm:px-10 sm:pt-28">
      <style>{`
        @keyframes aww-bf-glow { 0%,100%{ opacity:.5; transform: translateX(-3%);} 50%{ opacity:.85; transform: translateX(3%);} }
        .aww-bf-glow{ animation: aww-bf-glow 9s ease-in-out infinite; }
        .aww-bf-link{ transition: color .25s ease, padding-left .25s ease; }
        .aww-bf-link:hover{ color:#fff; padding-left:.4rem; }
        @media (prefers-reduced-motion: reduce){ .aww-bf-glow{ animation:none!important; } }
      `}</style>

      <div
        className="aww-bf-glow pointer-events-none absolute -bottom-1/3 left-1/2 h-[60%] w-[80%] -translate-x-1/2 rounded-full opacity-60 blur-[80px]"
        style={{ background: "radial-gradient(circle,#6d28d9,#db2777 60%,transparent)" }}
      />

      <div className="relative mx-auto max-w-[1500px]">
        <div className="grid gap-12 pb-16 lg:grid-cols-[1.4fr_1fr]">
          <div>
            <p className="text-[11px] font-semibold uppercase tracking-[0.5em] text-white/40">
              Let’s build something
            </p>
            <h2
              className="mt-5 font-black leading-[0.92] tracking-[-0.03em]"
              style={{ fontSize: "clamp(2rem,5vw,4rem)" }}
            >
              {en ? (
                <>
                  Let’s create
                  <br />
                  unseen experiences.
                </>
              ) : (
                <>
                  一緒に、まだ見ぬ
                  <br />
                  体験をつくろう。
                </>
              )}
            </h2>
            <a
              href="#"
              onClick={(e) => e.preventDefault()}
              className="group mt-8 inline-flex items-center gap-3 rounded-full bg-white px-8 py-4 text-sm font-semibold text-black transition-transform hover:-translate-y-0.5"
            >
              {en ? "Discuss a project" : "プロジェクトを相談する"}
              <ArrowUpRight className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </a>
          </div>

          <div className="grid grid-cols-3 gap-6">
            {COLS.map((col) => (
              <nav key={col.h}>
                <h3 className="mb-4 text-[11px] font-semibold uppercase tracking-[0.25em] text-white/35">
                  {col.h}
                </h3>
                <ul className="space-y-3 text-sm text-white/60">
                  {col.links.map((l) => (
                    <li key={l}>
                      <a
                        href="#"
                        onClick={(e) => e.preventDefault()}
                        className="aww-bf-link block"
                      >
                        {l}
                      </a>
                    </li>
                  ))}
                </ul>
              </nav>
            ))}
          </div>
        </div>

        <div className="flex items-center justify-between border-t border-white/10 pt-6 text-[11px] uppercase tracking-[0.3em] text-white/40">
          <span>© 2026 Studio</span>
          <span>Tokyo — Worldwide</span>
        </div>

        {/* oversized logotype */}
        <div className="relative -mb-[6vw] select-none pt-6">
          <div
            className="bg-gradient-to-b from-white/15 to-white/0 bg-clip-text text-center font-black leading-none tracking-[-0.05em] text-transparent"
            style={{ fontSize: "clamp(4rem,22vw,20rem)" }}
          >
            STUDIO
          </div>
        </div>
      </div>
    </footer>
  );
}
