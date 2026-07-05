import { ArrowRight, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import type { DemoMeta } from "@/registry";

export const meta: DemoMeta = {
  name: "スプリット・プロダクト",
  category: "ヒーロー・LP",
  description: "左にコピー、右にCSS製プロダクトカードを並べた分割ヒーロー。",
  align: "full",
  isNew: true,
  tags: ["hero", "animation"],
};

export default function SplitProductHero() {
  const en =
    typeof document !== "undefined" &&
    document.documentElement.lang === "en";
  return (
    <section className="relative w-full overflow-hidden bg-[#0a0a0f] py-24 text-white">
      <style>{`
        @keyframes sp-card{0%,100%{transform:translateY(0) rotate(-3deg)}50%{transform:translateY(-12px) rotate(-3deg)}}
        @keyframes sp-card2{0%,100%{transform:translateY(0) rotate(4deg)}50%{transform:translateY(-8px) rotate(4deg)}}
        @media (prefers-reduced-motion: reduce){.sp-c{animation:none!important}}
      `}</style>
      <div className="relative mx-auto grid max-w-6xl items-center gap-12 px-6 lg:grid-cols-2">
        <div>
          <div className="flex items-center gap-1 text-amber-300">
            {[0, 1, 2, 3, 4].map((i) => (
              <Star key={i} className="size-4 fill-current" />
            ))}
            <span className="ml-2 text-sm text-white/50">{en ? "4,800+ reviews" : "4,800+ レビュー"}</span>
          </div>
          <h1 className="mt-5 text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl">
            {en ? (
              <>
                Make money,
                <br />
                <span className="bg-gradient-to-r from-emerald-300 to-teal-300 bg-clip-text text-transparent">
                  more free.
                </span>
              </>
            ) : (
              <>
                お金を、
                <br />
                <span className="bg-gradient-to-r from-emerald-300 to-teal-300 bg-clip-text text-transparent">
                  もっと自由に。
                </span>
              </>
            )}
          </h1>
          <p className="mt-5 max-w-md text-lg text-white/55">
            {en
              ? "Spending, saving, and investing in one app. Zero fees, withdraw anytime."
              : "支出も貯蓄も投資も、ひとつのアプリで。手数料ゼロ、いつでも引き出し可能。"}
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Button size="lg" className="group bg-white text-black hover:bg-white/90">
              {en ? "Open an account" : "口座を開設"}
              <ArrowRight className="size-4 transition-transform group-hover:translate-x-0.5" />
            </Button>
            <Button size="lg" variant="outline" className="border-white/20 bg-white/5 text-white hover:bg-white/10 hover:text-white">
              {en ? "See pricing" : "料金を見る"}
            </Button>
          </div>
        </div>
        <div className="relative h-80">
          <div
            className="sp-c absolute left-4 top-6 w-64 rounded-2xl bg-gradient-to-br from-emerald-500 to-teal-600 p-5 shadow-2xl"
            style={{ animation: "sp-card 7s ease-in-out infinite" }}
          >
            <p className="text-xs text-white/70">{en ? "Balance" : "残高"}</p>
            <p className="mt-1 text-3xl font-bold">¥1,284,500</p>
            <div className="mt-6 flex items-center justify-between text-xs text-white/80">
              <span>•••• 4821</span>
              <span>09/28</span>
            </div>
          </div>
          <div
            className="sp-c absolute right-2 top-24 w-56 rounded-2xl border border-white/10 bg-white/[0.06] p-5 shadow-2xl backdrop-blur"
            style={{ animation: "sp-card2 8s ease-in-out infinite 1s" }}
          >
            <p className="text-xs text-white/50">{en ? "Saved this month" : "今月の貯蓄"}</p>
            <p className="mt-1 text-2xl font-bold text-emerald-300">+12.4%</p>
            <div className="mt-4 flex h-12 items-end gap-1">
              {[30, 50, 40, 70, 55, 90].map((h, i) => (
                <div key={i} className="flex-1 rounded-t bg-emerald-400/70" style={{ height: `${h}%` }} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
