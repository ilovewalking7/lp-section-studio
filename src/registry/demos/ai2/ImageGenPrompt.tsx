import { useState } from "react";
import { Loader2, Sparkles, Wand2 } from "lucide-react";
import { cn } from "@/lib/utils";
import type { DemoMeta } from "@/registry";

export const meta: DemoMeta = {
  name: "画像生成プロンプト",
  category: "AI / チャット",
  description: "アスペクト比とスタイルを選んで画像を生成するUI。",
  align: "center",
  isNew: true,
  tags: ["ai", "chat", "animation"],
};

const RATIOS = ["1:1", "16:9", "3:4"];
const STYLES = [
  { ja: "写実", en: "Realistic" },
  { ja: "アニメ", en: "Anime" },
  { ja: "3D", en: "3D" },
  { ja: "水彩", en: "Watercolor" },
];

export default function ImageGenPrompt() {
  const en =
    typeof document !== "undefined" &&
    document.documentElement.lang === "en";
  const [prompt, setPrompt] = useState(
    en ? "Futuristic city at dusk, neon reflections" : "夕暮れの未来都市、ネオンの反射"
  );
  const [ratio, setRatio] = useState("16:9");
  const [style, setStyle] = useState("写実");
  const [gen, setGen] = useState(false);

  const run = () => {
    if (!prompt.trim() || gen) return;
    setGen(true);
    window.setTimeout(() => setGen(false), 2000);
  };

  return (
    <div className="w-full max-w-[420px] rounded-2xl border bg-card p-4 shadow-sm">
      <div className="mb-3 grid grid-cols-2 gap-2">
        <div
          className={cn(
            "relative aspect-square overflow-hidden rounded-xl bg-gradient-to-br from-violet-500/20 via-fuchsia-500/15 to-sky-500/20",
            gen && "animate-pulse"
          )}
        >
          {gen && (
            <div className="absolute inset-0 flex items-center justify-center">
              <Loader2 className="size-6 animate-spin text-violet-500" />
            </div>
          )}
        </div>
        <div
          className={cn(
            "relative aspect-square overflow-hidden rounded-xl bg-gradient-to-tr from-sky-500/20 via-emerald-500/15 to-violet-500/20",
            gen && "animate-pulse"
          )}
        >
          {gen && (
            <div className="absolute inset-0 flex items-center justify-center">
              <Loader2 className="size-6 animate-spin text-sky-500" />
            </div>
          )}
        </div>
      </div>

      <textarea
        value={prompt}
        onChange={(e) => setPrompt(e.target.value)}
        rows={2}
        placeholder={en ? "Describe the image you want…" : "生成したい画像を説明…"}
        className="w-full resize-none rounded-lg border bg-background px-3 py-2 text-sm outline-none placeholder:text-muted-foreground focus-visible:ring-2 focus-visible:ring-violet-500/40"
      />

      <div className="mt-3 flex flex-wrap items-center gap-2">
        <span className="text-[11px] font-medium text-muted-foreground">{en ? "Ratio" : "比率"}</span>
        {RATIOS.map((r) => (
          <Pill key={r} active={ratio === r} onClick={() => setRatio(r)}>
            {r}
          </Pill>
        ))}
      </div>
      <div className="mt-2 flex flex-wrap items-center gap-2">
        <span className="text-[11px] font-medium text-muted-foreground">{en ? "Style" : "様式"}</span>
        {STYLES.map((s) => (
          <Pill key={s.ja} active={style === s.ja} onClick={() => setStyle(s.ja)}>
            {en ? s.en : s.ja}
          </Pill>
        ))}
      </div>

      <button
        type="button"
        onClick={run}
        disabled={gen}
        className="mt-4 flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-violet-600 to-fuchsia-600 py-2.5 text-sm font-semibold text-white shadow-md transition-all hover:opacity-90 disabled:opacity-60"
      >
        {gen ? (
          <>
            <Loader2 className="size-4 animate-spin" />
            {en ? "Generating…" : "生成中…"}
          </>
        ) : (
          <>
            <Wand2 className="size-4" />
            {en ? "Generate image" : "画像を生成"}
          </>
        )}
      </button>
      <p className="mt-2 flex items-center justify-center gap-1 text-[11px] text-muted-foreground">
        <Sparkles className="size-3" />
        {en ? "Generates 4 images at once" : "4枚を一度に生成します"}
      </p>
    </div>
  );
}

function Pill({
  active,
  onClick,
  children,
}: {
  active: boolean;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        "rounded-md border px-2.5 py-1 text-xs font-medium transition-colors",
        active
          ? "border-violet-500/50 bg-violet-500/10 text-violet-500"
          : "bg-card text-muted-foreground hover:text-foreground"
      )}
    >
      {children}
    </button>
  );
}
