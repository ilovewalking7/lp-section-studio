import type { DemoMeta } from "@/registry";
import { ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";

export const meta: DemoMeta = {
  name: "メンフィス・CTA",
  category: "メンフィス",
  description: "紙吹雪シェイプが弾けるエネルギッシュなCTAバンド。",
  align: "full",
  isNew: true,
  tags: ["memphis", "geometric", "80s"],
};

/** 紙吹雪シェイプ一片 */
function Confetti({
  className,
  color,
  shape = "square",
}: {
  className?: string;
  color: string;
  shape?: "square" | "circle" | "triangle";
}) {
  if (shape === "circle") {
    return <span className={cn("absolute rounded-full border-2 border-black", className)} style={{ backgroundColor: color }} />;
  }
  if (shape === "triangle") {
    return (
      <span
        className={cn("absolute border-2 border-black", className)}
        style={{ backgroundColor: color, clipPath: "polygon(50% 0, 100% 100%, 0 100%)" }}
      />
    );
  }
  return <span className={cn("absolute border-2 border-black", className)} style={{ backgroundColor: color }} />;
}

export default function MemphisCTA() {
  const en =
    typeof document !== "undefined" &&
    document.documentElement.lang === "en";
  return (
    <section className="w-full bg-[#fdf6e3] px-6 py-16">
      <div className="relative mx-auto max-w-4xl overflow-hidden rounded-3xl border-[3px] border-black bg-[#7b5cff] px-8 py-16 text-center shadow-[10px_10px_0_0_#000]">
        {/* 紙吹雪 */}
        <Confetti className="left-[8%] top-[14%] h-7 w-7 rotate-12" color="#ffd23f" />
        <Confetti className="left-[20%] top-[60%] h-5 w-5" color="#ff5c8a" shape="circle" />
        <Confetti className="left-[12%] top-[78%] h-6 w-6" color="#1fb6c1" shape="triangle" />
        <Confetti className="right-[10%] top-[18%] h-6 w-6 -rotate-12" color="#ff8c42" />
        <Confetti className="right-[18%] top-[62%] h-7 w-7" color="#ffd23f" shape="circle" />
        <Confetti className="right-[8%] top-[80%] h-5 w-5" color="#ff5c8a" shape="triangle" />
        <svg viewBox="0 0 120 40" className="absolute left-1/2 top-3 w-32 -translate-x-1/2" fill="none" aria-hidden>
          <path d="M2 20c10-22 24 22 34 0s24-22 34 0 24 22 34 0" stroke="#ffd23f" strokeWidth={5} strokeLinecap="round" />
        </svg>

        <div className="relative">
          <h2 className="mx-auto max-w-2xl text-4xl font-black leading-tight text-white sm:text-5xl">
            {en ? (
              <>
                Make your design{" "}
                <span className="ml-2 inline-block -rotate-2 bg-[#ffd23f] px-2 text-black">pop today.</span>
              </>
            ) : (
              <>
                今日から、デザインを
                <span className="ml-2 inline-block -rotate-2 bg-[#ffd23f] px-2 text-black">弾けさせよう。</span>
              </>
            )}
          </h2>
          <p className="mx-auto mt-5 max-w-md text-lg font-semibold text-white/85">
            {en
              ? "Start free, upgrade anytime. No credit card needed."
              : "無料で始めて、いつでもアップグレード。クレジットカード不要。"}
          </p>
          <div className="mt-9 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <button className="group inline-flex items-center gap-2 rounded-xl border-[3px] border-black bg-white px-8 py-3.5 text-base font-extrabold text-black shadow-[5px_5px_0_0_#000] transition-transform hover:-translate-y-0.5 active:translate-y-0.5">
              {en ? "Start free" : "無料で始める"}
              <ArrowRight className="size-5 transition-transform group-hover:translate-x-1" />
            </button>
            <button className="rounded-xl border-[3px] border-black bg-[#ff5c8a] px-8 py-3.5 text-base font-extrabold text-white shadow-[5px_5px_0_0_#000] transition-transform hover:-translate-y-0.5 active:translate-y-0.5">
              {en ? "See pricing" : "料金を見る"}
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
