import { useEffect, useRef, useState } from "react";
import { ArrowRight, Zap, Shield, Cpu, BarChart3 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import type { DemoMeta } from "@/registry";

export const meta: DemoMeta = {
  name: "ベント・ヒーロー",
  category: "ヒーロー・LP",
  description: "見出しと機能カードをベントグリッドで配置し順に出現させるヒーロー。",
  align: "full",
  isNew: true,
  tags: ["hero", "animation"],
};

const cards = [
  { icon: Zap, title: "高速", titleEn: "Fast", desc: "起動0.1秒。待たせない。", descEn: "0.1s startup. No waiting.", cls: "sm:col-span-2" },
  { icon: Shield, title: "安全", titleEn: "Secure", desc: "ゼロトラスト設計。", descEn: "Zero-trust by design.", cls: "" },
  { icon: Cpu, title: "省電力", titleEn: "Efficient", desc: "ネイティブ最適化。", descEn: "Natively optimized.", cls: "" },
  { icon: BarChart3, title: "分析", titleEn: "Analytics", desc: "リアルタイム指標。", descEn: "Real-time metrics.", cls: "sm:col-span-2" },
];

export default function BentoHero() {
  const ref = useRef<HTMLDivElement>(null);
  const [shown, setShown] = useState(false);
  const en =
    typeof document !== "undefined" &&
    document.documentElement.lang === "en";
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([e]) => e.isIntersecting && setShown(true),
      { threshold: 0.2 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <section ref={ref} className="relative w-full overflow-hidden bg-[#08080b] py-24 text-white">
      <style>{`@media (prefers-reduced-motion: reduce){.bn-rise{transition:none!important}}`}</style>
      <div className="relative mx-auto max-w-5xl px-6">
        <div className="text-center">
          <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">
            {en ? "Everything, on one screen." : "すべてが、ひとつの画面に。"}
          </h1>
          <p className="mx-auto mt-4 max-w-xl text-lg text-white/55">
            {en
              ? "The features you need, exactly as much as you need. An organized experience."
              : "必要な機能を、必要なだけ。整理された体験を。"}
          </p>
          <Button size="lg" className="group mt-7 bg-white text-black hover:bg-white/90">
            {en ? "Start for free" : "無料で始める"}
            <ArrowRight className="size-4 transition-transform group-hover:translate-x-0.5" />
          </Button>
        </div>
        <div className="mt-12 grid grid-cols-1 gap-4 sm:grid-cols-3">
          {cards.map((c, i) => (
            <div
              key={c.title}
              className={cn(
                "bn-rise rounded-2xl border border-white/10 bg-gradient-to-br from-white/[0.07] to-white/[0.02] p-6 backdrop-blur",
                c.cls
              )}
              style={{
                transition: "opacity .6s ease, transform .6s ease",
                transitionDelay: `${i * 90}ms`,
                opacity: shown ? 1 : 0,
                transform: shown ? "translateY(0)" : "translateY(20px)",
              }}
            >
              <c.icon className="size-6 text-indigo-300" />
              <h3 className="mt-3 text-lg font-semibold">{en ? c.titleEn : c.title}</h3>
              <p className="mt-1 text-sm text-white/55">{en ? c.descEn : c.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
