import { useRef } from "react";
import { ArrowUpRight } from "lucide-react";
import type { DemoMeta } from "@/registry";

export const meta: DemoMeta = {
  name: "マグネティック・リンク",
  category: "Awwwards",
  description: "カーソルに引き寄せられるように動く、磁力風のマグネティックリンク群。",
  align: "full",
  isNew: true,
  tags: ["awwwards", "interaction", "animation"],
};

const items = [
  { ja: "作品集", en: "Work" },
  { ja: "スタジオ", en: "Studio" },
  { ja: "ジャーナル", en: "Journal" },
  { ja: "問い合わせ", en: "Contact" },
];

function Magnetic({ label }: { label: string }) {
  const ref = useRef<HTMLAnchorElement>(null);

  function move(e: React.MouseEvent<HTMLAnchorElement>) {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    el.style.transform = `translate(${x * 0.35}px, ${y * 0.45}px)`;
  }

  function reset() {
    if (ref.current) ref.current.style.transform = "translate(0,0)";
  }

  return (
    <a
      ref={ref}
      href="#"
      onClick={(e) => e.preventDefault()}
      onMouseMove={move}
      onMouseLeave={reset}
      className="group inline-flex items-center gap-3 rounded-full border border-neutral-700 px-8 py-5 text-xl font-medium tracking-tight text-neutral-100 transition-[transform,border-color,background-color] duration-300 ease-out will-change-transform hover:border-amber-300/60 hover:bg-neutral-900 sm:text-2xl"
    >
      {label}
      <ArrowUpRight className="h-5 w-5 text-amber-300 transition-transform duration-300 group-hover:rotate-45" />
    </a>
  );
}

export default function MagneticLinks() {
  const en = typeof document !== "undefined" && document.documentElement.lang === "en";
  return (
    <section className="relative w-full overflow-hidden bg-neutral-950 px-6 py-28 text-neutral-50 sm:px-16">
      <p className="mb-12 text-xs uppercase tracking-[0.4em] text-neutral-500">
        {en ? "Menu" : "メニュー"}
      </p>
      <div className="flex flex-wrap gap-6">
        {items.map((it) => (
          <Magnetic key={it.en} label={en ? it.en : it.ja} />
        ))}
      </div>
    </section>
  );
}
