import type { DemoMeta } from "@/registry";
import { useEffect, useRef, useState } from "react";

export const meta: DemoMeta = {
  name: "進捗ボタン",
  category: "ボタン",
  description: "押すと内部のバーが進み、100%で完了表示になる進捗ボタン。",
  align: "center",
  isNew: true,
  tags: ["button", "icon"],
};

export default function ProgressButton() {
  const [progress, setProgress] = useState(0);
  const [running, setRunning] = useState(false);
  const timer = useRef<number | null>(null);

  useEffect(() => {
    return () => {
      if (timer.current) window.clearInterval(timer.current);
    };
  }, []);

  const handleClick = () => {
    if (running || progress >= 100) {
      setProgress(0);
      return;
    }
    setRunning(true);
    timer.current = window.setInterval(() => {
      setProgress((p) => {
        if (p >= 100) {
          if (timer.current) window.clearInterval(timer.current);
          setRunning(false);
          return 100;
        }
        return p + 4;
      });
    }, 70);
  };

  const done = progress >= 100;
  const en =
    typeof document !== "undefined" &&
    document.documentElement.lang === "en";

  return (
    <div className="flex items-center justify-center rounded-2xl bg-slate-900 p-8">
      <button
        type="button"
        onClick={handleClick}
        className="relative w-52 overflow-hidden rounded-xl bg-slate-700 px-6 py-3 text-sm font-semibold text-white shadow-lg transition-all duration-200 active:scale-[0.98]"
      >
        <span
          className="absolute inset-y-0 left-0 bg-indigo-500 transition-[width] duration-100"
          style={{ width: `${progress}%` }}
        />
        <span className="relative">
          {done
            ? en
              ? "Done ✓ Again"
              : "完了 ✓ もう一度"
            : running
              ? `${progress}%`
              : en
                ? "Start download"
                : "ダウンロード開始"}
        </span>
      </button>
    </div>
  );
}
