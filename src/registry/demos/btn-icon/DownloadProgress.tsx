import type { DemoMeta } from "@/registry";
import { useEffect, useRef, useState } from "react";
import { Download, Check } from "lucide-react";

export const meta: DemoMeta = {
  name: "ダウンロード進捗",
  category: "ボタン",
  description: "円形の進捗リングでダウンロード状況を示し、完了でチェックに変わるボタン。",
  align: "center",
  isNew: true,
  tags: ["button", "icon"],
};

export default function DownloadProgress() {
  const [progress, setProgress] = useState(0);
  const [active, setActive] = useState(false);
  const timer = useRef<number | null>(null);
  const R = 16;
  const C = 2 * Math.PI * R;

  useEffect(() => {
    return () => {
      if (timer.current) window.clearInterval(timer.current);
    };
  }, []);

  const start = () => {
    if (active) return;
    if (progress >= 100) {
      setProgress(0);
      return;
    }
    setActive(true);
    timer.current = window.setInterval(() => {
      setProgress((p) => {
        if (p >= 100) {
          if (timer.current) window.clearInterval(timer.current);
          setActive(false);
          return 100;
        }
        return p + 5;
      });
    }, 90);
  };

  const done = progress >= 100;
  const en =
    typeof document !== "undefined" &&
    document.documentElement.lang === "en";

  return (
    <div className="flex items-center justify-center rounded-2xl bg-sky-50 p-8">
      <button
        type="button"
        onClick={start}
        aria-label={
          done
            ? en
              ? "Download complete"
              : "ダウンロード完了"
            : en
              ? "Download file"
              : "ファイルをダウンロード"
        }
        className="grid size-16 place-items-center rounded-full bg-white text-sky-600 shadow-lg shadow-sky-600/10 transition-all duration-200 hover:shadow-sky-600/20 active:scale-[0.95]"
      >
        <span className="relative grid place-items-center">
          <svg className="absolute -rotate-90" width="44" height="44" viewBox="0 0 44 44">
            <circle cx="22" cy="22" r={R} fill="none" stroke="currentColor" strokeOpacity="0.15" strokeWidth="3" />
            <circle
              cx="22"
              cy="22"
              r={R}
              fill="none"
              stroke="currentColor"
              strokeWidth="3"
              strokeLinecap="round"
              strokeDasharray={C}
              strokeDashoffset={C - (progress / 100) * C}
              className="transition-[stroke-dashoffset] duration-100"
            />
          </svg>
          {done ? <Check className="size-5" /> : <Download className="size-5" />}
        </span>
      </button>
    </div>
  );
}
