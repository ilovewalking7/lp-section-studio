import { useEffect, useRef, useState } from "react";
import { Github, Twitter, Youtube, Instagram } from "lucide-react";
import type { DemoMeta } from "@/registry";

export const meta: DemoMeta = {
  name: "フォロワー数カウントアップ",
  category: "マーケティング",
  description: "各SNSのフォロワー数が画面到達時に数えあがるソーシャルフォロワーバンド。",
  align: "full",
  isNew: true,
  tags: ["social-proof", "testimonial", "animation"],
};

const CHANNELS = [
  { icon: Twitter, label: "X (Twitter)", value: 128400, color: "from-sky-400 to-blue-500" },
  { icon: Github, label: "GitHub Stars", value: 42100, color: "from-zinc-600 to-zinc-800" },
  { icon: Youtube, label: "YouTube", value: 89600, color: "from-rose-500 to-red-600" },
  { icon: Instagram, label: "Instagram", value: 215000, color: "from-fuchsia-500 to-pink-600" },
];

function fmt(n: number) {
  if (n >= 1000) return (n / 1000).toFixed(n >= 100000 ? 0 : 1).replace(/\.0$/, "") + "K";
  return String(Math.round(n));
}

function useInView<T extends HTMLElement>() {
  const ref = useRef<T>(null);
  const [seen, setSeen] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el || seen) return;
    const io = new IntersectionObserver(([e]) => e.isIntersecting && (setSeen(true), io.disconnect()), { threshold: 0.4 });
    io.observe(el);
    return () => io.disconnect();
  }, [seen]);
  return { ref, seen };
}

function Count({ value, run }: { value: number; run: boolean }) {
  const [n, setN] = useState(0);
  useEffect(() => {
    if (!run) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setN(value);
      return;
    }
    let raf = 0;
    const start = performance.now();
    const tick = (t: number) => {
      const p = Math.min((t - start) / 1500, 1);
      setN(value * (1 - Math.pow(1 - p, 3)));
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [run, value]);
  return <>{fmt(n)}</>;
}

export default function FollowerCountUp() {
  const en =
    typeof document !== "undefined" &&
    document.documentElement.lang === "en";
  const { ref, seen } = useInView<HTMLDivElement>();
  return (
    <section className="w-full px-6 py-12">
      <div ref={ref} className="mx-auto max-w-5xl">
        <h2 className="text-center text-3xl font-semibold tracking-tight">{en ? "Join a thriving community" : "大きなコミュニティの一員に"}</h2>
        <div className="mt-8 grid grid-cols-2 gap-4 lg:grid-cols-4">
          {CHANNELS.map((c) => (
            <div key={c.label} className="rounded-2xl border border-border bg-card p-6 text-center shadow-sm">
              <span className={`mx-auto flex size-11 items-center justify-center rounded-xl bg-gradient-to-br ${c.color} text-white`}>
                <c.icon className="size-5" />
              </span>
              <div className="mt-3 text-3xl font-bold tabular-nums tracking-tight text-foreground">
                <Count value={c.value} run={seen} />
              </div>
              <div className="mt-1 text-sm text-muted-foreground">{c.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
