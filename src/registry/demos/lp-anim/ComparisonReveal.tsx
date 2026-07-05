import { useEffect, useRef, useState } from "react";
import { Check, X } from "lucide-react";
import { cn } from "@/lib/utils";
import type { DemoMeta } from "@/registry";

export const meta: DemoMeta = {
  name: "アニメ・比較表",
  category: "マーケティング",
  description: "各行のチェックが時間差で入る us-vs-them 比較セクション（IO）。",
  align: "full",
  isNew: true,
  tags: ["marketing", "animation", "section"],
};

const ROWS: {
  labelJa: string;
  labelEn: string;
  us: boolean | { ja: string; en: string };
  them: boolean | { ja: string; en: string };
}[] = [
  {
    labelJa: "セットアップ時間",
    labelEn: "Setup time",
    us: { ja: "5分", en: "5 min" },
    them: { ja: "数日", en: "Days" },
  },
  { labelJa: "従量課金の上限", labelEn: "Usage cap", us: true, them: false },
  { labelJa: "リアルタイム同期", labelEn: "Real-time sync", us: true, them: false },
  { labelJa: "24時間サポート", labelEn: "24/7 support", us: true, them: false },
  { labelJa: "ベンダーロックイン", labelEn: "Vendor lock-in", us: false, them: true },
  { labelJa: "オープンAPI", labelEn: "Open API", us: true, them: false },
];

function Cell({
  value,
  good,
}: {
  value: boolean | { ja: string; en: string };
  good: boolean;
}) {
  const en =
    typeof document !== "undefined" &&
    document.documentElement.lang === "en";
  if (typeof value === "object") {
    return (
      <span className={cn("text-sm font-medium", good ? "text-white" : "text-white/40")}>
        {en ? value.en : value.ja}
      </span>
    );
  }
  return value ? (
    <Check className={cn("mx-auto h-5 w-5", good ? "text-emerald-400" : "text-white/30")} />
  ) : (
    <X className="mx-auto h-5 w-5 text-white/25" />
  );
}

export default function ComparisonReveal() {
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
        if (entries.some((e) => e.isIntersecting)) {
          setShown(true);
          io.disconnect();
        }
      },
      { threshold: 0.3 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <section className="w-full bg-neutral-950 px-4 py-20 text-white sm:px-8">
      <div ref={ref} className="mx-auto max-w-3xl">
        <div className="mb-12 text-center">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
            {en ? "The difference, at a glance." : "違いは、ひと目で。"}
          </h2>
          <p className="mt-3 text-sm text-white/60">
            {en ? "Compare us with the rest." : "他社と比べてください。"}
          </p>
        </div>

        <div className="overflow-hidden rounded-2xl border border-white/10">
          <div className="grid grid-cols-[1.4fr_1fr_1fr] bg-white/[0.04] text-sm font-semibold">
            <div className="px-5 py-4 text-white/60">
              {en ? "Feature" : "比較項目"}
            </div>
            <div className="px-5 py-4 text-center text-indigo-300">
              {en ? "Us" : "私たち"}
            </div>
            <div className="px-5 py-4 text-center text-white/50">
              {en ? "Others" : "他社"}
            </div>
          </div>
          {ROWS.map((r, i) => (
            <div
              key={r.labelJa}
              className={cn(
                "grid grid-cols-[1.4fr_1fr_1fr] items-center border-t border-white/5 transition-all duration-500 ease-out hover:bg-white/[0.02]",
                shown ? "translate-x-0 opacity-100" : "translate-x-4 opacity-0",
              )}
              style={{ transitionDelay: `${i * 110}ms` }}
            >
              <div className="px-5 py-4 text-sm text-white/75">
                {en ? r.labelEn : r.labelJa}
              </div>
              <div className="px-5 py-4 text-center">
                <Cell value={r.us} good />
              </div>
              <div className="px-5 py-4 text-center">
                <Cell value={r.them} good={false} />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
