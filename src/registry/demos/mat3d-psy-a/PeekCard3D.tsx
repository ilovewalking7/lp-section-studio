import { useState } from "react";
import { Lock, ArrowUpRight, Sparkles } from "lucide-react";
import type { DemoMeta } from "@/registry";

export const meta: DemoMeta = {
  name: "ピーク・カード 3D",
  category: "3Dアニメ",
  description:
    "ホバーで前面がrotateYで開き、中の続きを覗かせる3Dカード。続きを見たい欲求を喚起。",
  align: "center",
  isNew: true,
  level: "advanced",
  tags: ["3d", "psychology", "conversion", "animation"],
  principle:
    "好奇心ギャップ — 一部だけ見せて隠すことで「続きを知りたい」未完の緊張を生み、開封・登録を促す。",
};

export default function PeekCard3D() {
  const en =
    typeof document !== "undefined" && document.documentElement.lang === "en";
  const [open, setOpen] = useState(false);

  return (
    <div className="flex w-full items-center justify-center rounded-3xl bg-[radial-gradient(120%_120%_at_50%_25%,#0c1322_0%,#05070d_72%)] px-6 py-16">
      <div
        className="group relative"
        style={{ perspective: "1300px" }}
        onMouseEnter={() => setOpen(true)}
        onMouseLeave={() => setOpen(false)}
        onFocus={() => setOpen(true)}
        onBlur={() => setOpen(false)}
        tabIndex={0}
        role="button"
        aria-expanded={open}
        aria-label={en ? "Reveal what's inside" : "中身を見る"}
      >
        <div
          className="relative h-[340px] w-[300px]"
          style={{ transformStyle: "preserve-3d" }}
        >
          {/* BACK: the teaser revealed underneath */}
          <div className="absolute inset-0 overflow-hidden rounded-2xl border border-white/10 bg-[linear-gradient(160deg,#1b1840,#0c1430)] p-6">
            <div className="flex items-center gap-2 text-fuchsia-200/90">
              <Sparkles className="h-4 w-4" />
              <span className="text-xs font-semibold uppercase tracking-[0.22em]">
                {en ? "Inside" : "中身"}
              </span>
            </div>
            <h3 className="mt-4 text-2xl font-semibold leading-tight text-white">
              {en ? (
                <>
                  The playbook
                  <br />
                  top teams use
                </>
              ) : (
                <>
                  上位チームだけが
                  <br />
                  使う設計図
                </>
              )}
            </h3>
            <ul className="mt-5 space-y-2 text-sm text-white/55">
              {(en
                ? ["12 conversion templates", "The 3-step launch ritual", "…and one secret"]
                : ["12のCVテンプレート", "立ち上げ3ステップの型", "…そして、ある秘密"]
              ).map((line, i) => (
                <li key={`teaser-${i}`} className="flex items-center gap-2">
                  <span className="h-1.5 w-1.5 rounded-full bg-fuchsia-300" />
                  {line}
                </li>
              ))}
            </ul>
            <div className="absolute bottom-6 left-6 flex items-center gap-1.5 text-sm font-semibold text-fuchsia-200">
              {en ? "Open to read" : "開いて読む"}
              <ArrowUpRight className="h-4 w-4" />
            </div>
            {/* light spilling from the opening edge */}
            <div
              className="pointer-events-none absolute inset-y-0 left-0 w-24 transition-opacity duration-500"
              style={{
                opacity: open ? 1 : 0,
                background:
                  "linear-gradient(90deg, rgba(232,121,249,0.35), transparent)",
              }}
            />
          </div>

          {/* FRONT flap: hinged on the left edge, swings open on rotateY */}
          <div
            className="absolute inset-0 origin-left overflow-hidden rounded-2xl border border-white/12 transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)]"
            style={{
              transformStyle: "preserve-3d",
              transform: open
                ? "rotateY(-118deg) translateZ(2px)"
                : "rotateY(0deg)",
              background:
                "linear-gradient(150deg, rgba(99,102,241,0.32), rgba(20,18,48,0.9))",
              backfaceVisibility: "hidden",
              boxShadow: "0 30px 60px -24px rgba(80,70,200,0.7)",
            }}
          >
            <div className="flex h-full flex-col justify-between p-6">
              <div className="flex items-center justify-between">
                <span className="inline-flex items-center gap-1.5 rounded-full border border-white/15 bg-white/5 px-3 py-1 text-[11px] font-medium text-white/80">
                  <Lock className="h-3 w-3" />
                  {en ? "Members" : "会員限定"}
                </span>
              </div>
              <div>
                <h3 className="text-3xl font-semibold leading-[1.05] tracking-tight text-white">
                  {en ? (
                    <>
                      What the
                      <br />
                      pros won&rsquo;t
                      <br />
                      tell you
                    </>
                  ) : (
                    <>
                      プロが
                      <br />
                      明かさない
                      <br />
                      本当の話
                    </>
                  )}
                </h3>
                <p className="mt-3 text-sm text-white/60">
                  {en ? "Hover to peek inside →" : "ホバーで中を覗く →"}
                </p>
              </div>
            </div>
            {/* specular sheen on the flap */}
            <div
              className="pointer-events-none absolute inset-0"
              style={{
                background:
                  "linear-gradient(120deg, rgba(255,255,255,0.4) 0%, rgba(255,255,255,0) 42%)",
              }}
            />
          </div>
        </div>

        {/* soft ground shadow */}
        <div
          className="mx-auto mt-3 h-4 w-56 rounded-full bg-indigo-500/30 blur-lg transition-all duration-700"
          style={{ width: open ? "13rem" : "14rem", opacity: open ? 0.45 : 0.3 }}
          aria-hidden
        />
      </div>
    </div>
  );
}
