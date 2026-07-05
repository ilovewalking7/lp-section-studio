import type { DemoMeta } from "@/registry";
import { useState } from "react";
import { Loader2 } from "lucide-react";

export const meta: DemoMeta = {
  name: "ローディング",
  category: "ボタン",
  description: "クリックするとスピナーが回り、数秒後に戻る読み込みボタン。",
  align: "center",
  isNew: true,
  tags: ["button", "icon"],
};

export default function LoadingSpinner() {
  const [loading, setLoading] = useState(false);
  const en =
    typeof document !== "undefined" &&
    document.documentElement.lang === "en";

  const handleClick = () => {
    if (loading) return;
    setLoading(true);
    window.setTimeout(() => setLoading(false), 1800);
  };

  return (
    <div className="flex items-center justify-center rounded-2xl bg-slate-100 p-8">
      <button
        type="button"
        onClick={handleClick}
        aria-busy={loading}
        className="inline-flex min-w-[10rem] items-center justify-center gap-2 rounded-xl bg-slate-900 px-6 py-3 text-sm font-semibold text-white shadow-lg transition-all duration-200 hover:bg-slate-800 active:scale-[0.97] disabled:opacity-90"
        disabled={loading}
      >
        {loading ? (
          <>
            <Loader2 className="size-4 animate-spin" />
            {en ? "Loading…" : "読み込み中…"}
          </>
        ) : (
          en ? "Save" : "保存する"
        )}
      </button>
    </div>
  );
}
