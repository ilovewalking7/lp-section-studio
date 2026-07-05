import { Image as ImageIcon } from "lucide-react";
import type { CSSProperties } from "react";
import type { DemoMeta } from "@/registry";

export const meta: DemoMeta = {
  name: "スタックカード",
  category: "カード演出",
  description: "重なったカードがホバーで扇状に広がるスタックエフェクト。",
  align: "center",
  isNew: true,
  tags: ["card", "animation"],
};

const CARDS = [
  { rot: "-14deg", x: "-44px", grad: "from-rose-500 to-orange-500" },
  { rot: "0deg", x: "0px", grad: "from-indigo-500 to-violet-600" },
  { rot: "14deg", x: "44px", grad: "from-emerald-500 to-teal-600" },
];

export default function StackedCards() {
  return (
    <div className="flex w-full max-w-sm items-center justify-center py-12">
      <div className="group relative h-48 w-36">
        {CARDS.map((c, i) => (
          <div
            key={i}
            className={`absolute inset-0 origin-bottom rounded-2xl border border-white/15 bg-gradient-to-br ${c.grad} shadow-xl shadow-black/40 transition-transform duration-500 ease-out group-hover:[transform:rotate(var(--rot))_translateX(var(--x))]`}
            style={
              {
                "--rot": c.rot,
                "--x": c.x,
              } as CSSProperties
            }
          >
            <div className="flex h-full w-full items-center justify-center">
              <ImageIcon className="size-8 text-white/90" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
