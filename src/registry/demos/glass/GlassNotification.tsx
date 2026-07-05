import { CheckCircle2, X } from "lucide-react";
import type { DemoMeta } from "@/registry";

export const meta: DemoMeta = {
  name: "グラス・通知",
  category: "グラスモーフィズム",
  description: "鮮やかな背景の上に浮かぶフロステッドなトースト通知。",
  align: "center",
  isNew: true,
  tags: ["glass", "frosted", "notification", "toast"],
};

export default function GlassNotification() {
  const en =
    typeof document !== "undefined" &&
    document.documentElement.lang === "en";
  return (
    <div className="relative isolate flex w-full max-w-xl items-center justify-center overflow-hidden rounded-3xl bg-gradient-to-br from-fuchsia-600 via-rose-500 to-amber-400 p-12">
      <div
        aria-hidden
        className="pointer-events-none absolute -left-12 -top-12 size-64 rounded-full bg-pink-300/50 blur-3xl"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute -bottom-14 -right-10 size-72 rounded-full bg-violet-500/40 blur-3xl"
      />

      <div className="relative flex w-full max-w-sm items-start gap-3 rounded-2xl border border-white/20 bg-white/10 p-4 shadow-2xl backdrop-blur-xl">
        <div className="flex size-10 shrink-0 items-center justify-center rounded-xl border border-white/25 bg-emerald-400/30 text-emerald-100 backdrop-blur">
          <CheckCircle2 className="size-5" />
        </div>

        <div className="min-w-0 flex-1">
          <p className="text-sm font-semibold text-white">
            {en ? "Payment complete" : "支払いが完了しました"}
          </p>
          <p className="mt-0.5 text-sm text-white/75">
            {en
              ? "Your upgrade to the Pro plan is now active."
              : "プロプランへのアップグレードが反映されました。"}
          </p>
          <div className="mt-3 flex gap-2">
            <button className="rounded-lg bg-white/20 px-3 py-1 text-xs font-medium text-white backdrop-blur transition hover:bg-white/30">
              {en ? "View receipt" : "領収書を見る"}
            </button>
            <button className="rounded-lg px-3 py-1 text-xs font-medium text-white/70 transition hover:text-white">
              {en ? "Dismiss" : "閉じる"}
            </button>
          </div>
        </div>

        <button
          aria-label={en ? "Close" : "閉じる"}
          className="-mr-1 -mt-1 inline-flex size-7 shrink-0 items-center justify-center rounded-lg text-white/60 transition hover:bg-white/10 hover:text-white"
        >
          <X className="size-4" />
        </button>
      </div>
    </div>
  );
}
