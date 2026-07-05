import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import type { DemoMeta } from "@/registry";

export const meta: DemoMeta = {
  name: "祭り告知バナー",
  category: "和風",
  description: "季節の祭り・催事告知バナー。提灯モチーフのSVGを連ねて賑わいを演出。",
  align: "full",
  isNew: true,
  tags: ["和風", "japanese", "banner", "matsuri", "festival"],
  principle: "提灯の連なりで祝祭の高揚を視覚化。会期と内容を即提示し、来訪の動機を後押しする。",
};

function Chochin({ tone = "#b7410e" }: { tone?: string }) {
  return (
    <svg viewBox="0 0 40 56" className="h-14 w-10" aria-hidden>
      {/* 紐 */}
      <line x1="20" y1="0" x2="20" y2="6" stroke="#3a3a3a" strokeWidth="2" />
      {/* 上下の口輪 */}
      <rect x="13" y="6" width="14" height="3" rx="1" fill="#3a3a3a" />
      <rect x="13" y="47" width="14" height="3" rx="1" fill="#3a3a3a" />
      {/* 提灯本体 */}
      <ellipse cx="20" cy="28" rx="14" ry="20" fill={tone} />
      {/* 骨 */}
      {[14, 20, 26, 32, 38].map((y) => (
        <ellipse
          key={y}
          cx="20"
          cy="28"
          rx={Math.sqrt(Math.max(0, 196 - ((y - 28) * 14) ** 2 / 400))}
          ry="20"
          fill="none"
          stroke="#f5f1e8"
          strokeWidth="0.8"
          strokeOpacity="0.5"
        />
      ))}
      {/* 横帯 */}
      <line x1="6" y1="28" x2="34" y2="28" stroke="#f5f1e8" strokeWidth="1.5" strokeOpacity="0.6" />
      <line x1="3" y1="50" x2="37" y2="50" stroke="#3a3a3a" strokeWidth="1" />
      {/* 房 */}
      <line x1="20" y1="50" x2="20" y2="55" stroke="#e3b341" strokeWidth="2" />
    </svg>
  );
}

export default function MatsuriBanner() {
  const en =
    typeof document !== "undefined" &&
    document.documentElement.lang === "en";
  const tones = ["#b7410e", "#1f3a5f", "#6b7a3a", "#b7410e", "#1f3a5f"];
  return (
    <section className="relative w-full overflow-hidden bg-[#1c1a17] px-6 py-12 text-[#f5f1e8]">
      {/* 提灯の連なり */}
      <div className="pointer-events-none absolute inset-x-0 top-0 flex justify-around opacity-90">
        {tones.map((t, i) => (
          <div key={i} className={i % 2 ? "translate-y-1" : ""}>
            <Chochin tone={t} />
          </div>
        ))}
      </div>

      <div className="relative mx-auto mt-12 flex max-w-4xl flex-col items-center gap-5 text-center sm:flex-row sm:justify-between sm:text-left">
        <div>
          <p className="font-mincho text-xs tracking-[0.4em] text-[#e3b341]">
            {en ? "SUMMER EVENT" : "夏の催し"}
          </p>
          <h2 className="mt-2 font-mincho text-3xl font-medium tracking-[0.15em]">
            {en ? "Okuyama Lantern Festival" : "奥山 灯籠まつり"}
          </h2>
          <p className="mt-2 font-mincho text-sm text-[#f5f1e8]/70">
            {en
              ? "July 20 – August 15 · Garden illuminations and night market"
              : "七月二十日 〜 八月十五日 ・ 庭園ライトアップと夜市"}
          </p>
        </div>
        <Button className="group rounded-sm bg-[#b7410e] px-6 font-mincho tracking-wider text-[#f5f1e8] shadow-none hover:bg-[#9c360b]">
          {en ? "View the event" : "催しを見る"}
          <ArrowRight className="transition-transform group-hover:translate-x-0.5" />
        </Button>
      </div>
    </section>
  );
}
