import type { DemoMeta } from "@/registry";
import { useState } from "react";
import { Heart } from "lucide-react";
import { cn } from "@/lib/utils";

export const meta: DemoMeta = {
  name: "いいねハート",
  category: "ボタン",
  description: "クリックでハートが赤く弾み、カウントが増減するいいねボタン。",
  align: "center",
  isNew: true,
  tags: ["button", "icon"],
};

export default function LikeHeart() {
  const [liked, setLiked] = useState(false);
  const [count, setCount] = useState(128);

  const toggle = () => {
    setLiked((prev) => {
      setCount((c) => c + (prev ? -1 : 1));
      return !prev;
    });
  };

  return (
    <div className="flex items-center justify-center rounded-2xl bg-rose-50 p-8">
      <button
        type="button"
        onClick={toggle}
        aria-pressed={liked}
        className={cn(
          "inline-flex items-center gap-2 rounded-full border px-5 py-2.5 text-sm font-semibold transition-all duration-200 active:scale-[0.94]",
          liked
            ? "border-rose-200 bg-white text-rose-600"
            : "border-slate-200 bg-white text-slate-600 hover:border-rose-200"
        )}
      >
        <Heart
          className={cn(
            "size-4 transition-transform duration-200",
            liked ? "scale-110 fill-rose-500 text-rose-500" : "scale-100"
          )}
        />
        <span className="tabular-nums">{count}</span>
      </button>
    </div>
  );
}
