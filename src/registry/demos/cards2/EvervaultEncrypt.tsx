import { useEffect, useRef, useState, type CSSProperties } from "react";
import { Lock } from "lucide-react";
import type { DemoMeta } from "@/registry";

export const meta: DemoMeta = {
  name: "暗号エンクリプト",
  category: "カード演出",
  description: "ホバーで暗号文字が流れ、カーソル付近だけ解読されるカード。",
  align: "center",
  isNew: true,
  tags: ["card", "animation"],
};

const CHARS = "ABCDEF0123456789!@#$%^&*<>/?";

function randStr(len: number) {
  let s = "";
  for (let i = 0; i < len; i++)
    s += CHARS[Math.floor(Math.random() * CHARS.length)];
  return s;
}

export default function EvervaultEncrypt() {
  const en =
    typeof document !== "undefined" &&
    document.documentElement.lang === "en";
  const ref = useRef<HTMLDivElement>(null);
  const [text, setText] = useState(() => randStr(1500));
  const [active, setActive] = useState(false);

  useEffect(() => {
    if (!active) return;
    const id = window.setInterval(() => setText(randStr(1500)), 60);
    return () => window.clearInterval(id);
  }, [active]);

  function onMove(e: React.MouseEvent<HTMLDivElement>) {
    const el = ref.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    el.style.setProperty("--x", `${e.clientX - r.left}px`);
    el.style.setProperty("--y", `${e.clientY - r.top}px`);
  }

  return (
    <div className="w-full max-w-sm">
      <div
        ref={ref}
        onMouseMove={onMove}
        onMouseEnter={() => setActive(true)}
        onMouseLeave={() => setActive(false)}
        className="group relative aspect-square overflow-hidden rounded-2xl border border-white/10 bg-[#070810] shadow-2xl shadow-black/50"
        style={{ "--x": "50%", "--y": "50%" } as CSSProperties}
      >
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 break-all p-3 font-mono text-[10px] leading-[12px] text-emerald-400/70 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
          style={{
            maskImage:
              "radial-gradient(180px circle at var(--x) var(--y), black 0%, transparent 60%)",
            WebkitMaskImage:
              "radial-gradient(180px circle at var(--x) var(--y), black 0%, transparent 60%)",
          }}
        >
          {text}
        </div>
        <div className="relative flex h-full flex-col items-center justify-center gap-3 text-center transition-opacity duration-300 group-hover:opacity-0">
          <div className="flex size-14 items-center justify-center rounded-full bg-emerald-500/15 text-emerald-300">
            <Lock className="size-7" />
          </div>
          <p className="text-base font-semibold text-white">
            {en ? "End-to-end encryption" : "エンドツーエンド暗号化"}
          </p>
          <p className="text-xs text-slate-500">
            {en ? "Hover to decrypt" : "ホバーで解読"}
          </p>
        </div>
      </div>
    </div>
  );
}
