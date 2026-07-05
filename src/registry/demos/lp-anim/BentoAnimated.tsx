import { useRef, useState } from "react";
import { Activity, Cpu, Globe, Shield, Sparkles, Zap } from "lucide-react";
import { cn } from "@/lib/utils";
import type { DemoMeta } from "@/registry";

export const meta: DemoMeta = {
  name: "アニメ・ベント機能",
  category: "マーケティング",
  description: "スポットライト追従とホバー浮き上がり、ライブ風ミニアニメ入りのベント機能グリッド。",
  align: "full",
  isNew: true,
  tags: ["marketing", "animation", "section"],
};

function SpotlightTile({
  className,
  children,
}: {
  className?: string;
  children: React.ReactNode;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [pos, setPos] = useState({ x: 50, y: 50, on: false });

  function onMove(e: React.MouseEvent<HTMLDivElement>) {
    const el = ref.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    setPos({
      x: ((e.clientX - r.left) / r.width) * 100,
      y: ((e.clientY - r.top) / r.height) * 100,
      on: true,
    });
  }

  return (
    <div
      ref={ref}
      onMouseMove={onMove}
      onMouseLeave={() => setPos((p) => ({ ...p, on: false }))}
      className={cn(
        "group relative overflow-hidden rounded-2xl border border-white/10 bg-white/[0.03] p-6 transition-all duration-300 hover:-translate-y-1 hover:border-white/20",
        className,
      )}
    >
      <div
        className="pointer-events-none absolute -inset-px opacity-0 transition-opacity duration-300 group-hover:opacity-100"
        style={{
          background: `radial-gradient(280px circle at ${pos.x}% ${pos.y}%, rgba(99,102,241,0.18), transparent 70%)`,
          opacity: pos.on ? 1 : 0,
        }}
      />
      <div className="relative z-10">{children}</div>
    </div>
  );
}

export default function BentoAnimated() {
  const en =
    typeof document !== "undefined" &&
    document.documentElement.lang === "en";
  const bars = [38, 64, 49, 82, 71, 95];
  return (
    <section className="w-full bg-neutral-950 px-4 py-20 text-white sm:px-8">
      <style>{`
        @keyframes bento-bar { 0%,100% { transform: scaleY(0.55); } 50% { transform: scaleY(1); } }
        @keyframes bento-orbit { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
      `}</style>
      <div className="mx-auto max-w-6xl">
        <div className="mb-12 max-w-xl">
          <span className="inline-flex items-center gap-1.5 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs font-medium text-indigo-300">
            <Sparkles className="h-3.5 w-3.5" /> Platform
          </span>
          <h2 className="mt-4 text-3xl font-bold tracking-tight sm:text-4xl">
            {en ? "Everything on one platform." : "一つの基盤に、すべてを。"}
          </h2>
          <p className="mt-3 text-sm text-white/60">
            {en
              ? "Fast, secure, and global. Every piece your product needs, unified."
              : "高速・安全・グローバル。プロダクトに必要な要素を統合しました。"}
          </p>
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-3 sm:grid-rows-2">
          <SpotlightTile className="sm:col-span-2">
            <div className="mb-4 flex items-center gap-2 text-indigo-300">
              <Activity className="h-5 w-5" />
              <span className="text-sm font-semibold">
                {en ? "Real-time analytics" : "リアルタイム解析"}
              </span>
            </div>
            <p className="mb-5 max-w-md text-sm text-white/60">
              {en
                ? "Visualize traffic instantly. Metrics update with zero lag."
                : "トラフィックを即座に可視化。遅延なしでメトリクスが更新されます。"}
            </p>
            <div className="flex h-24 items-end gap-2">
              {bars.map((h, i) => (
                <div
                  key={i}
                  className="flex-1 origin-bottom rounded-t bg-gradient-to-t from-indigo-600 to-fuchsia-400"
                  style={{
                    height: `${h}%`,
                    animation: `bento-bar 2.4s ease-in-out ${i * 0.18}s infinite`,
                  }}
                />
              ))}
            </div>
          </SpotlightTile>

          <SpotlightTile>
            <div className="relative mx-auto flex h-full min-h-[140px] items-center justify-center">
              <div
                className="absolute h-28 w-28 rounded-full border border-dashed border-white/15"
                style={{ animation: "bento-orbit 12s linear infinite" }}
              >
                <Globe className="absolute -top-2 left-1/2 h-4 w-4 -translate-x-1/2 text-fuchsia-300" />
              </div>
              <Globe className="h-9 w-9 text-indigo-300" />
            </div>
          </SpotlightTile>

          <SpotlightTile>
            <Zap className="mb-3 h-5 w-5 text-amber-300" />
            <h3 className="text-sm font-semibold">
              {en ? "Edge delivery" : "エッジ配信"}
            </h3>
            <p className="mt-1 text-xs text-white/55">
              {en
                ? "Shortest path from 300+ locations."
                : "300+拠点から最短経路で。"}
            </p>
          </SpotlightTile>

          <SpotlightTile>
            <Shield className="mb-3 h-5 w-5 text-emerald-300" />
            <h3 className="text-sm font-semibold">
              {en ? "Zero trust" : "ゼロトラスト"}
            </h3>
            <p className="mt-1 text-xs text-white/55">
              {en
                ? "Encrypted by default, always audited."
                : "既定で暗号化、常時監査。"}
            </p>
          </SpotlightTile>

          <SpotlightTile>
            <Cpu className="mb-3 h-5 w-5 text-sky-300" />
            <h3 className="text-sm font-semibold">
              {en ? "Auto-scaling" : "自動スケール"}
            </h3>
            <p className="mt-1 text-xs text-white/55">
              {en
                ? "Expands instantly with demand."
                : "負荷に応じて瞬時に拡張。"}
            </p>
          </SpotlightTile>
        </div>
      </div>
    </section>
  );
}
