import type { DemoMeta } from "@/registry";

export const meta: DemoMeta = {
  name: "モーフィングローダー",
  category: "ローダー・マイクロ",
  description: "四角↔円↔三角形へ変形する形状モーフローダー（clip-path/transform）。",
  align: "center",
  isNew: true,
  tags: ["loader", "animation", "micro", "morph"],
};

const styles = `
@keyframes ldr-morph {
  0%, 100% {
    border-radius: 12%;
    clip-path: polygon(0 0, 100% 0, 100% 100%, 0 100%);
    transform: rotate(0deg);
  }
  33% {
    border-radius: 50%;
    clip-path: polygon(0 0, 100% 0, 100% 100%, 0 100%);
    transform: rotate(120deg);
  }
  66% {
    border-radius: 8%;
    clip-path: polygon(50% 0, 100% 100%, 0 100%, 0 100%);
    transform: rotate(240deg);
  }
}
@keyframes ldr-morph-shadow {
  0%, 100% { transform: scaleX(1); opacity: 0.35; }
  50% { transform: scaleX(0.6); opacity: 0.15; }
}
@keyframes ldr-morph-hue {
  0%, 100% { background: hsl(var(--primary)); }
  50% { background: hsl(var(--primary) / 0.6); }
}
`;

export default function MorphingLoader() {
  const en =
    typeof document !== "undefined" &&
    document.documentElement.lang === "en";
  return (
    <div className="flex flex-col items-center gap-8">
      <style>{styles}</style>

      <div className="flex h-24 flex-col items-center justify-center">
        <div
          className="h-12 w-12"
          style={{
            animation:
              "ldr-morph 2.4s cubic-bezier(0.65,0,0.35,1) infinite, ldr-morph-hue 2.4s ease-in-out infinite",
          }}
        />
        <div
          className="mt-2 h-1.5 w-12 rounded-full bg-foreground"
          style={{ animation: "ldr-morph-shadow 2.4s ease-in-out infinite" }}
        />
      </div>

      <p className="text-xs font-medium text-muted-foreground">{en ? "Morphing…" : "変形中…"}</p>
    </div>
  );
}
