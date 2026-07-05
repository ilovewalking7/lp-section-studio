import { ArrowUpRight } from "lucide-react";
import type { DemoMeta } from "@/registry";

export const meta: DemoMeta = {
  name: "ブランドストーリー",
  category: "ラグジュアリー",
  description: "エディトリアルな二分割のブランドストーリーセクション。",
  align: "full",
  isNew: true,
  tags: ["luxury", "premium", "gold", "story"],
  principle: "雑誌的な左右分割と縦書き風の見出しが、ブランドを語る編集物としての格を与える。",
};

export default function BrandStory() {
  const en =
    typeof document !== "undefined" &&
    document.documentElement.lang === "en";
  return (
    <section className="w-full bg-[#0a0a0a] px-6 py-24 text-stone-100">
      <div className="mx-auto grid max-w-5xl items-center gap-12 lg:grid-cols-2">
        {/* ビジュアル（CSS のみ） */}
        <div className="relative aspect-[4/5] overflow-hidden border border-amber-400/20 bg-gradient-to-br from-[#161310] via-[#0c0c0c] to-[#080808]">
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_30%_20%,rgba(217,179,90,0.18),transparent_60%)]" />
          <div className="pointer-events-none absolute inset-0 opacity-[0.06] [background-image:linear-gradient(115deg,transparent_46%,#d4af37_50%,transparent_54%)] [background-size:24px_24px]" />
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="bg-gradient-to-r from-amber-200 via-yellow-400 to-amber-500 bg-clip-text font-display text-9xl font-light text-transparent">
              1924
            </span>
          </div>
          <span className="absolute bottom-6 left-6 text-[10px] uppercase tracking-[0.3em] text-stone-500">
            Maison Founded
          </span>
        </div>

        {/* テキスト */}
        <div>
          <p className="text-[11px] uppercase tracking-[0.4em] text-amber-300/80">
            Our Heritage
          </p>
          <h2 className="mt-6 font-display text-4xl font-light leading-tight tracking-tight sm:text-5xl">
            {en ? (
              <>
                A story born of
                <br />
                a single philosophy
              </>
            ) : (
              <>
                ひとつの哲学から
                <br />
                始まった物語
              </>
            )}
          </h2>

          <div className="mt-8 h-px w-16 bg-gradient-to-r from-amber-400/60 to-transparent" />

          <div className="mt-8 space-y-5 text-sm leading-relaxed text-stone-400">
            <p>
              {en
                ? "In a small Parisian atelier, our founder held to a single conviction: that beauty never yields to time. More than a century on, that spirit endures, passed down unchanged."
                : "パリの小さなアトリエで、創業者は一つの信念を掲げました。「美は、時に屈しない」と。その精神は一世紀を超えて、今も変わることなく受け継がれています。"}
            </p>
            <p>
              {en
                ? "The warmth of the human hand, which no machine can ever replicate. We have always chosen the eternal over the efficient."
                : "機械では決して生み出せない、人の手の温度。私たちは効率ではなく、永遠を選び続けてきました。"}
            </p>
          </div>

          <a
            href="#"
            className="mt-10 inline-flex items-center gap-2 text-[11px] uppercase tracking-[0.3em] text-amber-200 transition-colors hover:text-amber-100"
          >
            {en ? "Read the Maison's history" : "メゾンの歴史を読む"}
            <ArrowUpRight className="h-3.5 w-3.5" />
          </a>
        </div>
      </div>
    </section>
  );
}
