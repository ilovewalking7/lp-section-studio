import type { DemoMeta } from "@/registry";

export const meta: DemoMeta = {
  name: "パルスドット",
  category: "ローダー・マイクロ",
  description: "タイピング/読み込みドットとパルスするプレゼンス表示。",
  align: "center",
  isNew: true,
  tags: ["loader", "animation", "micro", "dots"],
};

const styles = `
@keyframes ldr-typing { 0%, 60%, 100% { transform: translateY(0); opacity: 0.4; } 30% { transform: translateY(-5px); opacity: 1; } }
@keyframes ldr-presence { 0% { transform: scale(0.8); opacity: 0.8; } 70%, 100% { transform: scale(2.2); opacity: 0; } }
@keyframes ldr-wave { 0%, 100% { transform: scaleY(0.3); } 50% { transform: scaleY(1); } }
`;

export default function PulseDots() {
  const en = typeof document !== "undefined" && document.documentElement.lang === "en";
  return (
    <div className="w-full max-w-sm space-y-5">
      <style>{styles}</style>

      {/* Typing bubble */}
      <div className="flex items-center gap-3">
        <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-primary text-xs font-semibold text-primary-foreground">
          AI
        </div>
        <div className="flex items-center gap-1.5 rounded-2xl rounded-tl-sm bg-muted px-4 py-3">
          {[0, 1, 2].map((i) => (
            <span
              key={i}
              className="block h-2 w-2 rounded-full bg-muted-foreground"
              style={{ animation: `ldr-typing 1.3s ${i * 0.18}s ease-in-out infinite` }}
            />
          ))}
        </div>
      </div>

      {/* Presence indicators */}
      <div className="flex items-center gap-6 rounded-xl border border-border bg-card p-4">
        {[
          { label: "オンライン", labelEn: "Online", color: "bg-emerald-500" },
          { label: "取込中", labelEn: "Away", color: "bg-amber-500" },
          { label: "通話中", labelEn: "On a call", color: "bg-sky-500" },
        ].map((s) => (
          <div key={s.color} className="flex items-center gap-2">
            <span className="relative flex h-3 w-3">
              <span
                className={`absolute inline-flex h-full w-full rounded-full ${s.color}`}
                style={{ animation: "ldr-presence 1.6s ease-out infinite" }}
              />
              <span className={`relative inline-flex h-3 w-3 rounded-full ${s.color}`} />
            </span>
            <span className="text-xs text-foreground">{en ? s.labelEn : s.label}</span>
          </div>
        ))}
      </div>

      {/* Audio wave */}
      <div className="flex items-center justify-center gap-1 rounded-xl border border-border bg-card p-4">
        {[0, 1, 2, 3, 4, 5, 6].map((i) => (
          <span
            key={i}
            className="block h-6 w-1 origin-center rounded-full bg-primary"
            style={{ animation: `ldr-wave 0.9s ${i * 0.1}s ease-in-out infinite` }}
          />
        ))}
      </div>
    </div>
  );
}
