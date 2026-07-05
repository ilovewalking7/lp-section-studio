import { useRef } from "react";
import { ArrowRight } from "lucide-react";
import type { DemoMeta } from "@/registry";

export const meta: DemoMeta = {
  name: "スポットライト・リスト",
  category: "Awwwards",
  description: "ホバーした行にカーソル追従のスポットライトが灯る、光る一覧。",
  align: "full",
  isNew: true,
  tags: ["awwwards", "interaction", "animation"],
};

const rows = [
  { ja: "ブランド戦略", en: "Brand Strategy", y: "2024" },
  { ja: "プロダクト設計", en: "Product Design", y: "2024" },
  { ja: "モーション制作", en: "Motion Production", y: "2025" },
  { ja: "サイト構築", en: "Site Build", y: "2025" },
];

function Row({ t, y }: { t: string; y: string }) {
  const ref = useRef<HTMLLIElement>(null);

  function move(e: React.MouseEvent<HTMLLIElement>) {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    el.style.setProperty("--mx", `${e.clientX - rect.left}px`);
    el.style.setProperty("--my", `${e.clientY - rect.top}px`);
  }

  return (
    <li
      ref={ref}
      onMouseMove={move}
      className="group relative cursor-pointer overflow-hidden"
    >
      <span
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
        style={{
          background:
            "radial-gradient(220px circle at var(--mx) var(--my), rgba(252,211,77,.14), transparent 70%)",
        }}
      />
      <div className="relative flex items-center justify-between px-6 py-7 sm:px-8">
        <span className="text-2xl font-medium tracking-tight text-neutral-200 transition-colors group-hover:text-white sm:text-3xl">
          {t}
        </span>
        <span className="flex items-center gap-4 text-xs uppercase tracking-[0.3em] text-neutral-500">
          {y}
          <ArrowRight className="h-4 w-4 -translate-x-2 text-amber-300 opacity-0 transition-all duration-300 group-hover:translate-x-0 group-hover:opacity-100" />
        </span>
      </div>
    </li>
  );
}

export default function SpotlightList() {
  const en = typeof document !== "undefined" && document.documentElement.lang === "en";
  return (
    <section className="relative w-full bg-neutral-950 px-6 py-24 text-neutral-50 sm:px-16">
      <ul className="mx-auto max-w-[1000px] divide-y divide-neutral-800 overflow-hidden rounded-2xl border border-neutral-800 bg-neutral-900">
        {rows.map((r) => (
          <Row key={r.en} t={en ? r.en : r.ja} y={r.y} />
        ))}
      </ul>
    </section>
  );
}
