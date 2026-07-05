import { useEffect, useRef, useState } from "react";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import type { DemoMeta } from "@/registry";

export const meta: DemoMeta = {
  name: "ミニマル・センター",
  category: "ヒーロー・LP",
  description: "余白を活かした中央寄せ。各要素が下から順にフェードインする。",
  align: "full",
  isNew: true,
  tags: ["hero", "animation"],
};

export default function MinimalCenteredHero() {
  const en =
    typeof document !== "undefined" &&
    document.documentElement.lang === "en";
  const ref = useRef<HTMLDivElement>(null);
  const [show, setShow] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(([e]) => e.isIntersecting && setShow(true), { threshold: 0.25 });
    io.observe(el);
    return () => io.disconnect();
  }, []);

  const item = (i: number) =>
    ({
      transition: "opacity .7s ease, transform .7s ease",
      transitionDelay: `${i * 120}ms`,
      opacity: show ? 1 : 0,
      transform: show ? "translateY(0)" : "translateY(16px)",
    }) as React.CSSProperties;

  return (
    <section ref={ref} className="relative w-full overflow-hidden bg-background py-36 text-foreground">
      <style>{`@media (prefers-reduced-motion: reduce){.mn-i{transition:none!important}}`}</style>
      <div className="relative mx-auto max-w-2xl px-6 text-center">
        <span className="mn-i inline-flex items-center gap-2 rounded-full border border-border bg-muted px-4 py-1.5 text-xs font-medium tracking-wide text-muted-foreground" style={item(0)}>
          {en ? "Simple is best." : "シンプルこそ、最良。"}
        </span>
        <h1 className={cn("mn-i mt-7 text-4xl font-bold tracking-tight sm:text-6xl")} style={item(1)}>
          {en ? (
            <>
              Less, but
              <br />
              better.
            </>
          ) : (
            <>
              少なく、しかし、
              <br />
              より良く。
            </>
          )}
        </h1>
        <p className="mn-i mx-auto mt-5 max-w-md text-lg text-muted-foreground" style={item(2)}>
          {en
            ? "Refine the essentials instead of piling on features. A refined product built by subtraction."
            : "機能を盛り込むより、本質を磨く。引き算でつくる、上質なプロダクト。"}
        </p>
        <div className="mn-i mt-9 flex flex-col items-center justify-center gap-3 sm:flex-row" style={item(3)}>
          <Button size="lg" className="group">
            {en ? "Get started" : "はじめる"}
            <ArrowRight className="size-4 transition-transform group-hover:translate-x-0.5" />
          </Button>
          <Button size="lg" variant="outline">
            {en ? "Learn more" : "詳しく見る"}
          </Button>
        </div>
      </div>
    </section>
  );
}
