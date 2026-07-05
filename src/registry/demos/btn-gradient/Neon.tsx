import type { DemoMeta } from "@/registry";
import { Power } from "lucide-react";

export const meta: DemoMeta = {
  name: "ネオン",
  category: "ボタン",
  description: "発光する枠線と文字のネオンサイン風ボタン。サイバーパンクな夜に映える。",
  align: "center",
  isNew: true,
  tags: ["button", "gradient"],
};

export default function Neon() {
  return (
    <div className="flex items-center justify-center rounded-2xl bg-[#06060a] p-8">
      <button
        type="button"
        className="group inline-flex items-center gap-2 rounded-xl border border-cyan-400/70 bg-cyan-400/5 px-7 py-3.5 text-sm font-bold uppercase tracking-widest text-cyan-300 transition-all duration-300 hover:bg-cyan-400/15"
        style={{
          textShadow: "0 0 8px rgba(34,211,238,0.9)",
          boxShadow:
            "0 0 6px rgba(34,211,238,0.6), inset 0 0 6px rgba(34,211,238,0.35), 0 0 22px -4px rgba(34,211,238,0.7)",
        }}
      >
        <Power className="size-4" />
        Neon
      </button>
    </div>
  );
}
