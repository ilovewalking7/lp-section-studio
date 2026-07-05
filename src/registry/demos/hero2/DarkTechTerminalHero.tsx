import { useEffect, useState } from "react";
import { ArrowRight, Terminal } from "lucide-react";
import { Button } from "@/components/ui/button";
import type { DemoMeta } from "@/registry";

export const meta: DemoMeta = {
  name: "ターミナル・ヒーロー",
  category: "ヒーロー・LP",
  description: "コマンドが順に流れるダークなターミナルウィンドウ付きヒーロー。",
  align: "full",
  isNew: true,
  tags: ["hero", "animation"],
};

const linesJa = [
  "$ npm i @acme/cli",
  "✓ 依存関係を解決しました",
  "$ acme init my-app",
  "✓ プロジェクトを作成しました",
  "$ acme deploy",
  "✓ https://my-app.acme.dev に公開完了",
];

const linesEn = [
  "$ npm i @acme/cli",
  "✓ Resolved dependencies",
  "$ acme init my-app",
  "✓ Created project",
  "$ acme deploy",
  "✓ Deployed to https://my-app.acme.dev",
];

export default function DarkTechTerminalHero() {
  const en =
    typeof document !== "undefined" &&
    document.documentElement.lang === "en";
  const lines = en ? linesEn : linesJa;
  const [n, setN] = useState(0);
  useEffect(() => {
    const reduce =
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) {
      setN(lines.length);
      return;
    }
    const id = setInterval(() => {
      setN((p) => (p >= lines.length ? p : p + 1));
    }, 700);
    return () => clearInterval(id);
  }, []);

  return (
    <section className="relative w-full overflow-hidden bg-[#04060a] py-24 text-white">
      <style>{`
        @keyframes tm-blink{0%,49%{opacity:1}50%,100%{opacity:0}}
        @media (prefers-reduced-motion: reduce){.tm-cur{animation:none!important}}
      `}</style>
      <div
        className="absolute inset-0 opacity-[0.1]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(0,255,170,.4) 1px,transparent 1px),linear-gradient(90deg,rgba(0,255,170,.4) 1px,transparent 1px)",
          backgroundSize: "40px 40px",
          maskImage: "radial-gradient(ellipse 70% 70% at 50% 50%, #000 30%, transparent 85%)",
          WebkitMaskImage: "radial-gradient(ellipse 70% 70% at 50% 50%, #000 30%, transparent 85%)",
        }}
      />
      <div className="relative mx-auto grid max-w-5xl items-center gap-10 px-6 lg:grid-cols-2">
        <div className="text-center lg:text-left">
          <span className="inline-flex items-center gap-2 rounded-full border border-emerald-400/20 bg-emerald-400/5 px-4 py-1.5 text-xs font-medium tracking-wide text-emerald-300">
            <Terminal className="size-3.5" />
            {en ? "Developer first" : "開発者ファースト"}
          </span>
          <h1 className="mt-6 font-mono text-4xl font-bold tracking-tight sm:text-5xl">
            {en ? (
              <>
                From the terminal,
                <br />
                to production.
              </>
            ) : (
              <>
                ターミナルから、
                <br />
                本番環境まで。
              </>
            )}
          </h1>
          <p className="mt-4 max-w-md text-lg text-white/55 lg:mx-0">
            {en
              ? "Deploy in three commands. No more CI/CD setup."
              : "3つのコマンドでデプロイ完了。CI/CDの設定はもう要らない。"}
          </p>
          <Button size="lg" className="group mt-7 bg-emerald-400 text-black hover:bg-emerald-300">
            {en ? "Read the docs" : "ドキュメントを読む"}
            <ArrowRight className="size-4 transition-transform group-hover:translate-x-0.5" />
          </Button>
        </div>
        <div className="overflow-hidden rounded-xl border border-white/10 bg-[#0a0e12] font-mono text-sm shadow-2xl">
          <div className="flex items-center gap-2 border-b border-white/10 px-4 py-3">
            <span className="size-3 rounded-full bg-red-400/80" />
            <span className="size-3 rounded-full bg-yellow-400/80" />
            <span className="size-3 rounded-full bg-green-400/80" />
            <span className="ml-2 text-xs text-white/30">bash — 80×24</span>
          </div>
          <div className="min-h-[200px] space-y-1 p-4">
            {lines.slice(0, n).map((l, i) => (
              <div key={i} className={l.startsWith("✓") ? "text-emerald-400" : "text-white/80"}>
                {l}
              </div>
            ))}
            <span className="tm-cur inline-block h-4 w-2 bg-emerald-400 align-middle" style={{ animation: "tm-blink 1s step-end infinite" }} />
          </div>
        </div>
      </div>
    </section>
  );
}
