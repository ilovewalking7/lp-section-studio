import { Mountain } from "lucide-react";
import type { DemoMeta } from "@/registry";

export const meta: DemoMeta = {
  name: "イメージズーム",
  category: "カード演出",
  description: "ホバーで疑似画像（CSSグラデ）がゆっくり拡大するカード。",
  align: "center",
  isNew: true,
  tags: ["card", "animation"],
};

export default function ImageZoomCard() {
  const en =
    typeof document !== "undefined" &&
    document.documentElement.lang === "en";
  return (
    <div className="w-full max-w-sm">
      <div className="group overflow-hidden rounded-2xl border border-white/10 bg-[#0b0d17] shadow-2xl shadow-black/40">
        <div className="relative h-44 overflow-hidden">
          <div
            className="absolute inset-0 transition-transform duration-700 ease-out group-hover:scale-110"
            style={{
              background:
                "radial-gradient(120% 120% at 20% 10%, #f59e0b 0%, transparent 45%), radial-gradient(100% 100% at 90% 30%, #ec4899 0%, transparent 50%), linear-gradient(160deg, #4338ca, #0b0d17)",
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0b0d17] via-transparent to-transparent" />
          <div className="absolute left-5 top-5 flex size-10 items-center justify-center rounded-lg bg-black/30 text-white backdrop-blur">
            <Mountain className="size-5" />
          </div>
        </div>
        <div className="p-5">
          <h3 className="text-lg font-semibold text-white">
            {en ? "Sunset Ridge" : "サンセット・リッジ"}
          </h3>
          <p className="mt-1.5 text-sm leading-relaxed text-slate-400">
            {en
              ? "On hover, the gradient background image gently zooms in, adding depth and a sense of presence."
              : "ホバーで背景のグラデーション画像が静かにズームし、奥行きと臨場感を加えます。"}
          </p>
        </div>
      </div>
    </div>
  );
}
