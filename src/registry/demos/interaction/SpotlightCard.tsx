import { useRef, useState, type MouseEvent } from "react";
import { Wand2 } from "lucide-react";
import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import type { DemoMeta } from "@/registry";

export const meta: DemoMeta = {
  name: "スポットライトカード",
  category: "インタラクション",
  description: "カーソルに追従する放射状スポットライトのカード。",
  align: "center",
  isNew: true,
  tags: ["animation", "micro-interaction", "hover"],
  principle:
    "光がカーソルを追うことで、面が立体的・物理的に感じられアフォーダンスが高まる。CSS変数で更新するため軽快。",
};

export default function SpotlightCard() {
  const en =
    typeof document !== "undefined" &&
    document.documentElement.lang === "en";
  const ref = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(false);

  const onMove = (e: MouseEvent<HTMLDivElement>) => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    el.style.setProperty("--x", `${e.clientX - rect.left}px`);
    el.style.setProperty("--y", `${e.clientY - rect.top}px`);
  };

  return (
    <Card
      ref={ref}
      onMouseMove={onMove}
      onMouseEnter={() => setActive(true)}
      onMouseLeave={() => setActive(false)}
      className="group relative w-full max-w-sm overflow-hidden border-border/60 p-8"
    >
      <div
        className={cn(
          "pointer-events-none absolute inset-0 transition-opacity duration-300",
          active ? "opacity-100" : "opacity-0"
        )}
        style={{
          background:
            "radial-gradient(280px circle at var(--x) var(--y), hsl(var(--primary) / 0.18), transparent 65%)",
        }}
      />
      <div className="relative space-y-3">
        <div className="flex size-11 items-center justify-center rounded-xl border bg-background text-primary shadow-sm transition-transform duration-300 group-hover:scale-105">
          <Wand2 className="size-5" />
        </div>
        <h3 className="text-lg font-semibold">
          {en ? "A magical feel" : "魔法のような操作感"}
        </h3>
        <p className="text-sm leading-relaxed text-muted-foreground">
          {en
            ? "Move your cursor over the card. The light gently follows, giving the surface a sense of depth."
            : "カードの上でカーソルを動かしてみてください。光がそっと追いかけてきて、面が立体的に感じられます。"}
        </p>
      </div>
    </Card>
  );
}
