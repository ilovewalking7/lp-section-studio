import type { DemoMeta } from "@/registry";
import { useState } from "react";
import { Bell, BellRing, Check } from "lucide-react";
import { cn } from "@/lib/utils";

export const meta: DemoMeta = {
  name: "購読トグル",
  category: "ボタン",
  description: "未購読・購読中の2状態を切り替える、チャンネル登録ボタン。",
  align: "center",
  isNew: true,
  tags: ["button", "icon"],
};

export default function SubscribeBtn() {
  const [subscribed, setSubscribed] = useState(false);
  const en =
    typeof document !== "undefined" &&
    document.documentElement.lang === "en";

  return (
    <div className="flex items-center justify-center rounded-2xl bg-slate-100 p-8">
      <button
        type="button"
        onClick={() => setSubscribed((s) => !s)}
        aria-pressed={subscribed}
        className={cn(
          "inline-flex min-w-[11rem] items-center justify-center gap-2 rounded-full px-6 py-3 text-sm font-semibold transition-all duration-300 active:scale-[0.97]",
          subscribed
            ? "border border-slate-200 bg-slate-100 text-slate-700 hover:bg-slate-200"
            : "bg-red-600 text-white shadow-lg shadow-red-600/30 hover:bg-red-700"
        )}
      >
        {subscribed ? (
          <>
            <Check className="size-4" />
            {en ? "Subscribed" : "登録済み"}
            <BellRing className="size-4" />
          </>
        ) : (
          <>
            <Bell className="size-4" />
            {en ? "Subscribe" : "チャンネル登録"}
          </>
        )}
      </button>
    </div>
  );
}
