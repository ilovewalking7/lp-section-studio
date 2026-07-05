import { useRef, useState } from "react";
import { Delete, LockKeyhole } from "lucide-react";
import { cn } from "@/lib/utils";
import type { DemoMeta } from "@/registry";

export const meta: DemoMeta = {
  name: "PINコードキーパッド",
  category: "フォーム",
  description: "4桁PINのテンキー入力。タップでドットが満ちる。",
  align: "center",
  isNew: true,
  tags: ["form", "auth", "animation"],
};

export default function PinCodeForm() {
  const en =
    typeof document !== "undefined" &&
    document.documentElement.lang === "en";
  const LEN = 4;
  const [pin, setPin] = useState("");
  const [shake, setShake] = useState(false);
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const press = (d: string) => {
    setPin((prev) => {
      if (prev.length >= LEN) return prev;
      const next = prev + d;
      if (next.length === LEN && next !== "1234") {
        setShake(true);
        if (timer.current) clearTimeout(timer.current);
        timer.current = setTimeout(() => { setShake(false); setPin(""); }, 500);
      }
      return next;
    });
  };
  const back = () => setPin((p) => p.slice(0, -1));

  const keys = ["1", "2", "3", "4", "5", "6", "7", "8", "9"];

  return (
    <div className="w-full max-w-xs rounded-2xl border border-slate-200 bg-white p-7 text-center shadow-xl dark:border-slate-800 dark:bg-slate-900">
      <style>{`@keyframes pc-shake{0%,100%{transform:translateX(0)}20%,60%{transform:translateX(-8px)}40%,80%{transform:translateX(8px)}}@keyframes pc-fill{from{transform:scale(.4)}to{transform:scale(1)}}`}</style>

      <div className="mx-auto mb-4 flex h-11 w-11 items-center justify-center rounded-xl bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-200">
        <LockKeyhole className="h-5 w-5" />
      </div>
      <h2 className="mb-1 text-lg font-semibold text-slate-900 dark:text-white">{en ? "Enter your PIN" : "PINを入力"}</h2>
      <p className="mb-5 text-xs text-slate-400">{en ? "Hint: 1234" : "ヒント: 1234"}</p>

      <div className="mb-6 flex justify-center gap-3" style={shake ? { animation: "pc-shake .5s ease" } : undefined}>
        {Array.from({ length: LEN }).map((_, i) => {
          const filled = i < pin.length;
          return (
            <span
              key={i}
              className={cn("h-3.5 w-3.5 rounded-full border-2 transition-colors", filled ? "border-indigo-500 bg-indigo-500" : "border-slate-300 dark:border-slate-600")}
              style={filled ? { animation: "pc-fill .2s ease-out" } : undefined}
            />
          );
        })}
      </div>

      <div className="grid grid-cols-3 gap-2.5">
        {keys.map((k) => (
          <button key={k} type="button" onClick={() => press(k)}
            className="flex h-14 items-center justify-center rounded-xl bg-slate-100 text-lg font-semibold text-slate-700 transition-all hover:bg-slate-200 active:scale-90 dark:bg-slate-800 dark:text-slate-100 dark:hover:bg-slate-700">
            {k}
          </button>
        ))}
        <span />
        <button type="button" onClick={() => press("0")}
          className="flex h-14 items-center justify-center rounded-xl bg-slate-100 text-lg font-semibold text-slate-700 transition-all hover:bg-slate-200 active:scale-90 dark:bg-slate-800 dark:text-slate-100 dark:hover:bg-slate-700">
          0
        </button>
        <button type="button" onClick={back} aria-label={en ? "Delete" : "削除"}
          className="flex h-14 items-center justify-center rounded-xl text-slate-500 transition-all hover:bg-slate-100 active:scale-90 dark:hover:bg-slate-800">
          <Delete className="h-5 w-5" />
        </button>
      </div>
    </div>
  );
}
