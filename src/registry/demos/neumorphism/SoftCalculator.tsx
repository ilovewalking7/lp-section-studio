import { useState } from "react";
import { cn } from "@/lib/utils";
import type { DemoMeta } from "@/registry";

export const meta: DemoMeta = {
  name: "ソフト電卓",
  category: "ニューモーフィズム",
  description: "押し込み式ディスプレイと柔らかなキーパッドを備えた動作する電卓。",
  align: "center",
  isNew: true,
  tags: ["neumorphism", "soft-ui", "calculator"],
};

const RAISED = "shadow-[5px_5px_10px_#a3b1c6,-5px_-5px_10px_#ffffff]";
const INSET = "shadow-[inset_5px_5px_10px_#a3b1c6,inset_-5px_-5px_10px_#ffffff]";

const keys = ["C", "±", "%", "÷", "7", "8", "9", "×", "4", "5", "6", "−", "1", "2", "3", "+", "0", ".", "="];
const ops: Record<string, string> = { "÷": "/", "×": "*", "−": "-", "+": "+" };

export default function SoftCalculator() {
  const [display, setDisplay] = useState("0");
  const [prev, setPrev] = useState<number | null>(null);
  const [op, setOp] = useState<string | null>(null);
  const [fresh, setFresh] = useState(true);

  function compute(a: number, b: number, o: string): number {
    switch (o) {
      case "+": return a + b;
      case "-": return a - b;
      case "*": return a * b;
      case "/": return b === 0 ? 0 : a / b;
      default: return b;
    }
  }

  function press(k: string) {
    if (k === "C") {
      setDisplay("0"); setPrev(null); setOp(null); setFresh(true); return;
    }
    if (k === "±") {
      setDisplay((d) => (parseFloat(d) * -1).toString()); return;
    }
    if (k === "%") {
      setDisplay((d) => (parseFloat(d) / 100).toString()); return;
    }
    if (k in ops) {
      const cur = parseFloat(display);
      if (prev !== null && op && !fresh) {
        const r = compute(prev, cur, op);
        setPrev(r); setDisplay(String(r));
      } else {
        setPrev(cur);
      }
      setOp(ops[k]); setFresh(true); return;
    }
    if (k === "=") {
      if (prev !== null && op) {
        const r = compute(prev, parseFloat(display), op);
        setDisplay(String(r)); setPrev(null); setOp(null); setFresh(true);
      }
      return;
    }
    // digit or "."
    if (k === "." && display.includes(".") && !fresh) return;
    if (fresh) {
      setDisplay(k === "." ? "0." : k); setFresh(false);
    } else {
      setDisplay((d) => (d === "0" && k !== "." ? k : d + k));
    }
  }

  return (
    <div className={cn("w-full max-w-xs rounded-3xl bg-[#e0e5ec] p-6 text-slate-600", RAISED)}>
      <div className={cn("mb-5 flex h-20 items-end justify-end rounded-2xl bg-[#e0e5ec] px-5 pb-4", INSET)}>
        <span className="truncate text-4xl font-light tracking-tight text-slate-700">{display}</span>
      </div>

      <div className="grid grid-cols-4 gap-3">
        {keys.map((k) => {
          const isOp = k in ops || k === "=";
          const isFn = k === "C" || k === "±" || k === "%";
          return (
            <button
              key={k}
              onClick={() => press(k)}
              className={cn(
                "grid h-14 place-items-center rounded-2xl bg-[#e0e5ec] text-lg font-medium transition active:scale-95",
                RAISED,
                k === "0" && "col-span-2",
                isOp ? "text-indigo-500" : isFn ? "text-slate-500" : "text-slate-700",
                k === "=" && "active:shadow-[inset_5px_5px_10px_#a3b1c6,inset_-5px_-5px_10px_#ffffff]",
              )}
            >
              {k}
            </button>
          );
        })}
      </div>
    </div>
  );
}
