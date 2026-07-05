import { useState } from "react";
import { Plus, Camera, Image, Mic, Video, FileText } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import type { DemoMeta } from "@/registry";

export const meta: DemoMeta = {
  name: "放射ファンメニュー",
  category: "3Dカルーセル",
  description: "タップで扇状に展開する3D傾斜のファン型メニュー。",
  align: "full",
  isNew: true,
  tags: ["carousel", "3d", "gallery"],
};

const ACTIONS: { Icon: LucideIcon; grad: string }[] = [
  { Icon: Camera, grad: "from-rose-500 to-pink-600" },
  { Icon: Image, grad: "from-amber-500 to-orange-600" },
  { Icon: Mic, grad: "from-emerald-500 to-teal-600" },
  { Icon: Video, grad: "from-sky-500 to-blue-600" },
  { Icon: FileText, grad: "from-violet-500 to-purple-600" },
];

export default function RadialFanMenu() {
  const en =
    typeof document !== "undefined" && document.documentElement.lang === "en";
  const [open, setOpen] = useState(false);
  const count = ACTIONS.length;
  const spread = 150;
  const start = -spread / 2;
  const stepAng = spread / (count - 1);

  return (
    <div className="flex w-full justify-center py-12">
      <div
        className="relative"
        style={{ width: 240, height: 240, perspective: "800px" }}
      >
        <div
          className="absolute bottom-0 left-1/2 -translate-x-1/2"
          style={{ transformStyle: "preserve-3d", transform: "rotateX(35deg)" }}
        >
          {ACTIONS.map(({ Icon, grad }, i) => {
            const ang = start + i * stepAng;
            return (
              <div
                key={i}
                className={cn(
                  "absolute bottom-0 left-1/2 flex h-12 w-12 -translate-x-1/2 items-center justify-center rounded-full bg-gradient-to-br text-white shadow-lg transition-all duration-500 ease-out",
                  grad
                )}
                style={{
                  transform: open
                    ? `rotate(${ang}deg) translateY(-130px) rotate(${-ang}deg)`
                    : "translateY(0)",
                  opacity: open ? 1 : 0,
                }}
              >
                <Icon className="h-5 w-5" />
              </div>
            );
          })}
        </div>
        <button
          type="button"
          onClick={() => setOpen((o) => !o)}
          aria-label={en ? "Menu" : "メニュー"}
          className="absolute bottom-0 left-1/2 flex h-14 w-14 -translate-x-1/2 items-center justify-center rounded-full bg-primary text-primary-foreground shadow-xl transition-transform"
          style={{ transform: `translateX(-50%) rotate(${open ? 45 : 0}deg)` }}
        >
          <Plus className="h-6 w-6" />
        </button>
      </div>
    </div>
  );
}
