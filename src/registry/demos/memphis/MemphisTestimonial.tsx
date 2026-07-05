import type { DemoMeta } from "@/registry";
import { Quote } from "lucide-react";

export const meta: DemoMeta = {
  name: "メンフィス・推薦の声",
  category: "メンフィス",
  description: "波線のアンダーラインが映える引用カード。",
  align: "center",
  isNew: true,
  tags: ["memphis", "geometric", "80s"],
};

export default function MemphisTestimonial() {
  const en =
    typeof document !== "undefined" &&
    document.documentElement.lang === "en";
  return (
    <div className="relative w-full max-w-lg">
      <div className="pointer-events-none absolute -left-4 -top-5 z-10 flex size-14 items-center justify-center rotate-[-8deg] rounded-2xl border-[3px] border-black bg-[#ffd23f] shadow-[3px_3px_0_0_#000]">
        <Quote className="size-7 text-black" strokeWidth={2.5} />
      </div>
      <div className="pointer-events-none absolute -right-4 top-8 z-10 h-8 w-8 rounded-full border-[3px] border-black bg-[#1fb6c1]" />
      <div
        className="pointer-events-none absolute -bottom-4 right-12 z-10 h-9 w-9 border-[3px] border-black bg-[#7b5cff]"
        style={{ clipPath: "polygon(50% 0, 100% 100%, 0 100%)" }}
      />

      <figure className="relative rounded-2xl border-[3px] border-black bg-white p-8 pt-10 shadow-[7px_7px_0_0_#000]">
        <blockquote className="text-xl font-extrabold leading-snug text-black">
          {en ? (
            <>
              Thanks to this component set, our dull landing page instantly turned into{" "}
              <span className="relative mx-1 inline-block">
                <span className="relative z-10">pure personality</span>
                {/* 波線アンダーライン */}
                <svg
                  viewBox="0 0 120 12"
                  className="absolute -bottom-2 left-0 w-full"
                  fill="none"
                  preserveAspectRatio="none"
                  aria-hidden
                >
                  <path d="M2 8c10-8 20 8 30 0s20-8 30 0 20 8 28 0" stroke="#ff5c8a" strokeWidth={4} strokeLinecap="round" />
                </svg>
              </span>
              .
            </>
          ) : (
            <>
              このコンポーネント集のおかげで、退屈だったLPが一気に
              <span className="relative mx-1 inline-block">
                <span className="relative z-10">弾ける個性</span>
                {/* 波線アンダーライン */}
                <svg
                  viewBox="0 0 120 12"
                  className="absolute -bottom-2 left-0 w-full"
                  fill="none"
                  preserveAspectRatio="none"
                  aria-hidden
                >
                  <path d="M2 8c10-8 20 8 30 0s20-8 30 0 20 8 28 0" stroke="#ff5c8a" strokeWidth={4} strokeLinecap="round" />
                </svg>
              </span>
              に変わりました。
            </>
          )}
        </blockquote>

        <figcaption className="mt-7 flex items-center gap-3.5">
          <div className="flex size-12 items-center justify-center rounded-full border-[3px] border-black bg-[#ff8c42] text-lg font-black text-white">
            {en ? "K" : "ミ"}
          </div>
          <div>
            <div className="text-sm font-black text-black">{en ? "Kaede Minami" : "ミナミ・カエデ"}</div>
            <div className="text-xs font-bold text-black/55">
              {en ? "Product Designer @ Studio Pop" : "プロダクトデザイナー @ Studio Pop"}
            </div>
          </div>
        </figcaption>
      </figure>
    </div>
  );
}
