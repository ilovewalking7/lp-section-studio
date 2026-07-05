import type { DemoMeta } from "@/registry";
import { Gamepad2 } from "lucide-react";

export const meta: DemoMeta = {
  name: "ピクセル 8bit",
  category: "ボタン",
  description: "段差状のピクセル枠と硬い影で組んだ8bit風ボタン。押すとカチッと沈む。",
  align: "center",
  isNew: true,
  tags: ["button", "fun"],
};

export default function Pixel() {
  return (
    <div className="flex items-center justify-center rounded-2xl bg-[#1a1c2c] p-8">
      <button
        type="button"
        style={{ fontFamily: "ui-monospace, monospace" }}
        className="inline-flex items-center gap-2 bg-[#41a6f6] px-6 py-3 text-sm font-bold uppercase text-white shadow-[0_4px_0_0_#1e6dab,0_8px_0_0_#0b3b66] [clip-path:polygon(0_8px,8px_8px,8px_0,calc(100%-8px)_0,calc(100%-8px)_8px,100%_8px,100%_calc(100%-8px),calc(100%-8px)_calc(100%-8px),calc(100%-8px)_100%,8px_100%,8px_calc(100%-8px),0_calc(100%-8px))] transition-all duration-100 hover:bg-[#5db4ff] active:translate-y-[4px] active:shadow-[0_2px_0_0_#1e6dab,0_4px_0_0_#0b3b66] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
      >
        <Gamepad2 className="size-4" />
        START
      </button>
    </div>
  );
}
