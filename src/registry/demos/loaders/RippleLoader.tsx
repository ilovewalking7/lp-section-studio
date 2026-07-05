import type { DemoMeta } from "@/registry";

export const meta: DemoMeta = {
  name: "リップルローダー",
  category: "ローダー・マイクロ",
  description: "広がる波紋・パルスリングのローダー。",
  align: "center",
  isNew: true,
  tags: ["loader", "animation", "micro", "ripple"],
};

const styles = `
@keyframes ldr-ripple {
  0% { transform: scale(0); opacity: 0.7; }
  100% { transform: scale(1); opacity: 0; }
}
@keyframes ldr-ripple-core { 0%, 100% { transform: scale(1); } 50% { transform: scale(0.8); } }
@keyframes ldr-radar { 0% { transform: scale(0.2); opacity: 0.8; } 100% { transform: scale(1); opacity: 0; } }
`;

export default function RippleLoader() {
  return (
    <div className="flex items-center gap-12">
      <style>{styles}</style>

      {/* Expanding rings */}
      <div className="flex flex-col items-center gap-4">
        <div className="relative flex h-24 w-24 items-center justify-center">
          {[0, 1, 2].map((i) => (
            <span
              key={i}
              className="absolute h-24 w-24 rounded-full border-2 border-primary"
              style={{ animation: `ldr-ripple 1.8s ${i * 0.6}s cubic-bezier(0,0.2,0.8,1) infinite` }}
            />
          ))}
          <span
            className="h-4 w-4 rounded-full bg-primary"
            style={{ animation: "ldr-ripple-core 1.8s ease-in-out infinite" }}
          />
        </div>
        <span className="text-[11px] font-medium uppercase tracking-wide text-muted-foreground">
          Ripple
        </span>
      </div>

      {/* Radar fill */}
      <div className="flex flex-col items-center gap-4">
        <div className="relative flex h-24 w-24 items-center justify-center">
          {[0, 1, 2, 3].map((i) => (
            <span
              key={i}
              className="absolute h-24 w-24 rounded-full bg-primary/30"
              style={{ animation: `ldr-radar 2s ${i * 0.5}s ease-out infinite` }}
            />
          ))}
          <span className="relative h-3 w-3 rounded-full bg-primary" />
        </div>
        <span className="text-[11px] font-medium uppercase tracking-wide text-muted-foreground">
          Radar
        </span>
      </div>
    </div>
  );
}
