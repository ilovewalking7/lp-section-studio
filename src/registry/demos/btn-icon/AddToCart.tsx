import type { DemoMeta } from "@/registry";
import { useState } from "react";
import { ShoppingCart, Check } from "lucide-react";
import { cn } from "@/lib/utils";

export const meta: DemoMeta = {
  name: "カートへ追加",
  category: "ボタン",
  description: "クリックでカートアイコンが飛び込み、追加完了に変わるECボタン。",
  align: "center",
  isNew: true,
  tags: ["button", "icon"],
};

type State = "idle" | "adding" | "added";

export default function AddToCart() {
  const [state, setState] = useState<State>("idle");
  const en =
    typeof document !== "undefined" &&
    document.documentElement.lang === "en";

  const handleClick = () => {
    if (state !== "idle") return;
    setState("adding");
    window.setTimeout(() => setState("added"), 500);
    window.setTimeout(() => setState("idle"), 2400);
  };

  return (
    <div className="flex items-center justify-center rounded-2xl bg-orange-50 p-8">
      <button
        type="button"
        onClick={handleClick}
        disabled={state !== "idle"}
        className={cn(
          "inline-flex min-w-[12rem] items-center justify-center gap-2 overflow-hidden rounded-xl px-6 py-3 text-sm font-semibold text-white shadow-lg transition-all duration-300 active:scale-[0.97]",
          state === "added"
            ? "bg-emerald-600 shadow-emerald-600/30"
            : "bg-orange-500 shadow-orange-500/30 hover:bg-orange-600"
        )}
      >
        {state === "added" ? (
          <>
            <Check className="size-4" />
            {en ? "Added to cart" : "カートに追加しました"}
          </>
        ) : (
          <>
            <ShoppingCart
              className={cn(
                "size-4 transition-all duration-500",
                state === "adding"
                  ? "translate-x-10 -translate-y-6 opacity-0"
                  : "translate-x-0 opacity-100"
              )}
            />
            {en ? "Add to cart" : "カートに入れる"}
          </>
        )}
      </button>
    </div>
  );
}
