import type { DemoMeta } from "@/registry";
import { useState } from "react";
import { Bell } from "lucide-react";
import { cn } from "@/lib/utils";

export const meta: DemoMeta = {
  name: "通知ベル",
  category: "ボタン",
  description: "クリックでベルが揺れ、未読バッジが付く通知ボタン。",
  align: "center",
  isNew: true,
  tags: ["button", "icon"],
};

export default function NotificationBell() {
  const [ring, setRing] = useState(false);
  const [count, setCount] = useState(3);
  const en =
    typeof document !== "undefined" &&
    document.documentElement.lang === "en";

  const handleClick = () => {
    setRing(true);
    setCount((c) => c + 1);
    window.setTimeout(() => setRing(false), 700);
  };

  return (
    <div className="flex items-center justify-center rounded-2xl bg-slate-100 p-8">
      <style>{`
        @keyframes btnicon-bell-swing {
          0%,100% { transform: rotate(0); }
          20% { transform: rotate(16deg); }
          40% { transform: rotate(-12deg); }
          60% { transform: rotate(8deg); }
          80% { transform: rotate(-4deg); }
        }
      `}</style>
      <button
        type="button"
        onClick={handleClick}
        aria-label={en ? `${count} notifications` : `通知 ${count}件`}
        className="relative grid size-12 place-items-center rounded-full border border-slate-200 bg-white text-slate-700 shadow-sm transition-all duration-200 hover:bg-slate-50 active:scale-[0.95]"
      >
        <Bell
          className="size-5 origin-top"
          style={ring ? { animation: "btnicon-bell-swing 0.7s ease" } : undefined}
        />
        {count > 0 && (
          <span
            className={cn(
              "absolute -right-0.5 -top-0.5 grid min-w-5 place-items-center rounded-full bg-rose-500 px-1 text-[10px] font-bold text-white ring-2 ring-white transition-transform duration-200",
              ring ? "scale-110" : "scale-100"
            )}
          >
            {count}
          </span>
        )}
      </button>
    </div>
  );
}
