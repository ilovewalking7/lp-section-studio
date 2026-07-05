import { useEffect, useRef, useState } from "react";
import { ArrowRight, MoveDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import type { DemoMeta } from "@/registry";

export const meta: DemoMeta = {
  name: "スクロールリビール・ヒーロー",
  category: "ヒーロー・LP",
  description: "要素が表示領域に入ると順番にフェード＆スライドアップで現れる。",
  align: "full",
  isNew: true,
  tags: ["hero", "animation", "reveal", "scroll"],
};

export default function ScrollRevealHero() {
  const en =
    typeof document !== "undefined" &&
    document.documentElement.lang === "en";
  const ref = useRef<HTMLDivElement>(null);
  const [shown, setShown] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) {
            setShown(true);
            io.disconnect();
          }
        }
      },
      { threshold: 0.25 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  const revealCls = (active: boolean) =>
    cn(
      "transition-all duration-700 ease-out",
      active ? "translate-y-0 opacity-100" : "translate-y-6 opacity-0"
    );
  const revealStyle = (i: number) => ({ transitionDelay: `${i * 110}ms` });

  return (
    <section
      ref={ref}
      className="relative w-full overflow-hidden bg-[#070708] py-32 text-white"
    >
      <div
        className="pointer-events-none absolute left-1/2 top-0 h-[50vh] w-[60vw] -translate-x-1/2 rounded-full opacity-50 blur-[120px]"
        style={{
          background:
            "radial-gradient(circle, rgba(99,102,241,0.45), transparent 70%)",
        }}
      />

      <div className="relative mx-auto max-w-3xl px-6 text-center">
        <span
          style={revealStyle(0)}
          className={cn(
            "inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-4 py-1.5 text-xs font-medium tracking-wide text-white/70 backdrop-blur",
            revealCls(shown)
          )}
        >
          <MoveDown className="size-3.5 text-indigo-300" />
          {en ? "Revealed as you scroll" : "スクロールで現れる"}
        </span>
        <h1
          style={revealStyle(1)}
          className={cn(
            "mt-7 bg-gradient-to-b from-white to-white/55 bg-clip-text text-4xl font-bold tracking-tight text-transparent sm:text-6xl",
            revealCls(shown)
          )}
        >
          {en ? (
            <>
              A refined first view,
              <br />
              that rises quietly
            </>
          ) : (
            <>
              静かに立ち上がる、
              <br />
              洗練されたファーストビュー
            </>
          )}
        </h1>
        <p
          style={revealStyle(2)}
          className={cn(
            "mx-auto mt-5 max-w-xl text-lg text-white/55",
            revealCls(shown)
          )}
        >
          {en
            ? "The moment content enters view, each element glides smoothly into place."
            : "コンテンツが視界に入った瞬間、要素が一つずつ滑らかに姿を現します。"}
        </p>
        <div
          style={revealStyle(3)}
          className={cn(
            "mt-9 flex flex-col items-center justify-center gap-3 sm:flex-row",
            revealCls(shown)
          )}
        >
          <Button
            size="lg"
            className="group bg-white text-black hover:bg-white/90"
          >
            {en ? "Experience it" : "体験する"}
            <ArrowRight className="size-4 transition-transform group-hover:translate-x-0.5" />
          </Button>
          <Button
            size="lg"
            variant="outline"
            className="border-white/20 bg-white/5 text-white hover:bg-white/10 hover:text-white"
          >
            {en ? "Learn more" : "詳しく"}
          </Button>
        </div>
      </div>
    </section>
  );
}
