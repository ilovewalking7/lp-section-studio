import type { DemoMeta } from "@/registry";
import { Palette } from "lucide-react";

export const meta: DemoMeta = {
  name: "メッシュ・グラデーション",
  category: "ボタン",
  description: "複数の放射グラデーションが重なるメッシュ・グラデのリッチなボタン。",
  align: "center",
  isNew: true,
  tags: ["button", "gradient"],
};

export default function MeshButton() {
  const en =
    typeof document !== "undefined" &&
    document.documentElement.lang === "en";
  return (
    <div className="flex items-center justify-center rounded-2xl bg-[#0b0b12] p-8">
      <style>{`
        @keyframes mesh-drift { 0%,100%{background-position:0% 0%,100% 0%,50% 100%} 50%{background-position:100% 50%,0% 50%,50% 0%} }
      `}</style>
      <button
        type="button"
        className="group inline-flex items-center gap-2 rounded-xl px-7 py-3.5 text-sm font-semibold text-white shadow-[0_8px_30px_-8px_rgba(168,85,247,0.6)] transition-transform duration-300 hover:scale-[1.03] active:scale-[0.98]"
        style={{
          backgroundColor: "#7c3aed",
          backgroundImage:
            "radial-gradient(at 0% 0%,#f0abfc 0,transparent 50%),radial-gradient(at 100% 0%,#38bdf8 0,transparent 50%),radial-gradient(at 50% 100%,#fb7185 0,transparent 50%)",
          backgroundSize: "200% 200%",
          animation: "mesh-drift 8s ease infinite",
        }}
      >
        <Palette className="size-4" />
        {en ? "Mesh" : "メッシュ"}
      </button>
    </div>
  );
}
