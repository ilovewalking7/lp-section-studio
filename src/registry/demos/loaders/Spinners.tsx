import type { DemoMeta } from "@/registry";

export const meta: DemoMeta = {
  name: "スピナー集",
  category: "ローダー・マイクロ",
  description: "リング・ドット・バー・オービットなど6種類以上のCSSスピナー。",
  align: "center",
  isNew: true,
  tags: ["loader", "animation", "micro", "spinner"],
};

const styles = `
@keyframes ldr-spin { to { transform: rotate(360deg); } }
@keyframes ldr-dot-bounce { 0%, 80%, 100% { transform: scale(0); } 40% { transform: scale(1); } }
@keyframes ldr-bar-stretch { 0%, 40%, 100% { transform: scaleY(0.4); } 20% { transform: scaleY(1); } }
@keyframes ldr-orbit { 0% { transform: rotate(0); } 100% { transform: rotate(360deg); } }
@keyframes ldr-pulse-ring { 0% { transform: scale(0.5); opacity: 1; } 100% { transform: scale(1.4); opacity: 0; } }
@keyframes ldr-flip { 0% { transform: perspective(120px) rotateX(0) rotateY(0); } 50% { transform: perspective(120px) rotateX(-180deg) rotateY(0); } 100% { transform: perspective(120px) rotateX(-180deg) rotateY(-180deg); } }
@keyframes ldr-dual-rev { to { transform: rotate(-360deg); } }
`;

function Cell({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="flex flex-col items-center justify-end gap-3 rounded-xl border border-border bg-card/60 p-5">
      <div className="flex h-12 items-center justify-center">{children}</div>
      <span className="text-[11px] font-medium uppercase tracking-wide text-muted-foreground">
        {label}
      </span>
    </div>
  );
}

export default function Spinners() {
  return (
    <div className="w-full max-w-xl">
      <style>{styles}</style>
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
        <Cell label="Ring">
          <span
            className="block h-8 w-8 rounded-full border-[3px] border-muted border-t-primary"
            style={{ animation: "ldr-spin 0.7s linear infinite" }}
          />
        </Cell>

        <Cell label="Dual Ring">
          <span className="relative block h-8 w-8">
            <span
              className="absolute inset-0 rounded-full border-[3px] border-transparent border-t-primary border-r-primary"
              style={{ animation: "ldr-spin 0.9s linear infinite" }}
            />
            <span
              className="absolute inset-1 rounded-full border-[3px] border-transparent border-b-foreground border-l-foreground"
              style={{ animation: "ldr-dual-rev 0.6s linear infinite" }}
            />
          </span>
        </Cell>

        <Cell label="Dots">
          <span className="flex items-center gap-1.5">
            {[0, 1, 2].map((i) => (
              <span
                key={i}
                className="block h-2.5 w-2.5 rounded-full bg-primary"
                style={{ animation: `ldr-dot-bounce 1.2s ${i * 0.16}s ease-in-out infinite both` }}
              />
            ))}
          </span>
        </Cell>

        <Cell label="Bars">
          <span className="flex items-end gap-1">
            {[0, 1, 2, 3, 4].map((i) => (
              <span
                key={i}
                className="block h-7 w-1.5 origin-bottom rounded-sm bg-primary"
                style={{ animation: `ldr-bar-stretch 1s ${i * 0.1}s ease-in-out infinite` }}
              />
            ))}
          </span>
        </Cell>

        <Cell label="Orbit">
          <span
            className="relative block h-8 w-8"
            style={{ animation: "ldr-orbit 1.4s linear infinite" }}
          >
            <span className="absolute left-1/2 top-0 h-2 w-2 -translate-x-1/2 rounded-full bg-primary" />
            <span className="absolute bottom-0 left-1/2 h-2 w-2 -translate-x-1/2 rounded-full bg-foreground/60" />
          </span>
        </Cell>

        <Cell label="Pulse">
          <span className="relative flex h-8 w-8 items-center justify-center">
            <span
              className="absolute h-8 w-8 rounded-full border-2 border-primary"
              style={{ animation: "ldr-pulse-ring 1.2s ease-out infinite" }}
            />
            <span
              className="absolute h-8 w-8 rounded-full border-2 border-primary"
              style={{ animation: "ldr-pulse-ring 1.2s 0.6s ease-out infinite" }}
            />
            <span className="h-2 w-2 rounded-full bg-primary" />
          </span>
        </Cell>

        <Cell label="Flip">
          <span
            className="block h-7 w-7 rounded-sm bg-primary"
            style={{ animation: "ldr-flip 1.2s ease-in-out infinite" }}
          />
        </Cell>

        <Cell label="Grid">
          <span className="grid grid-cols-3 gap-1">
            {Array.from({ length: 9 }).map((_, i) => (
              <span
                key={i}
                className="block h-2 w-2 rounded-[2px] bg-primary"
                style={{ animation: `ldr-dot-bounce 1.3s ${(i % 5) * 0.12}s ease-in-out infinite both` }}
              />
            ))}
          </span>
        </Cell>

        <Cell label="Gradient">
          <span
            className="block h-8 w-8 rounded-full p-[3px]"
            style={{
              background: "conic-gradient(from 0deg, transparent, hsl(var(--primary)))",
              animation: "ldr-spin 0.8s linear infinite",
              WebkitMask: "radial-gradient(farthest-side, transparent calc(100% - 3px), #000 0)",
              mask: "radial-gradient(farthest-side, transparent calc(100% - 3px), #000 0)",
            }}
          />
        </Cell>
      </div>
    </div>
  );
}
