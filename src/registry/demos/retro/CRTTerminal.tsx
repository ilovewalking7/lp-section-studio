import { useEffect, useState } from "react";
import type { DemoMeta } from "@/registry";

export const meta: DemoMeta = {
  name: "CRTターミナル",
  category: "レトロ・Y2K",
  description: "走査線と点滅カーソル、タイプライター演出を備えたCRT風ターミナル。",
  align: "center",
  isNew: true,
  tags: ["retro", "y2k", "crt", "terminal"],
};

const lines = [
  "> SYSTEM BOOT v2.0.1 ........... OK",
  "> LOADING NEON MODULES ........ OK",
  "> CONNECTING TO MAINFRAME ..... OK",
  "> ACCESS GRANTED. WELCOME BACK.",
];

export default function CRTTerminal() {
  const [shown, setShown] = useState<string[]>([]);

  useEffect(() => {
    let i = 0;
    setShown([]);
    const id = setInterval(() => {
      i += 1;
      setShown(lines.slice(0, i));
      if (i >= lines.length) clearInterval(id);
    }, 700);
    return () => clearInterval(id);
  }, []);

  return (
    <div className="bg-black p-10">
      <div
        className="relative w-[420px] max-w-full overflow-hidden rounded-xl border-2 border-[#22c55e]/40 bg-[#001b00]"
        style={{ boxShadow: "0 0 40px rgba(34,197,94,0.35), inset 0 0 60px rgba(34,197,94,0.15)" }}
      >
        {/* title bar */}
        <div className="flex items-center gap-2 border-b border-[#22c55e]/30 bg-[#002b00] px-3 py-2">
          <span className="size-3 rounded-full bg-[#ff5f56]" />
          <span className="size-3 rounded-full bg-[#ffbd2e]" />
          <span className="size-3 rounded-full bg-[#27c93f]" />
          <span className="ml-2 font-mono text-xs uppercase tracking-widest text-[#4ade80]">
            terminal.exe
          </span>
        </div>

        {/* screen */}
        <div className="relative min-h-[180px] p-5 font-mono text-sm leading-relaxed text-[#4ade80]">
          {shown.map((line, idx) => (
            <p key={idx} style={{ textShadow: "0 0 6px rgba(74,222,128,0.8)" }}>
              {line}
            </p>
          ))}
          <p
            className="inline-flex items-center"
            style={{ textShadow: "0 0 6px rgba(74,222,128,0.8)" }}
          >
            <span className="text-[#bbf7d0]">user@neon</span>:~$&nbsp;
            <span className="inline-block h-4 w-2.5 animate-pulse bg-[#4ade80] align-middle" />
          </p>

          {/* scanlines */}
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0 opacity-25"
            style={{
              backgroundImage:
                "repeating-linear-gradient(0deg, transparent 0 2px, rgba(0,0,0,0.5) 2px 3px)",
            }}
          />
          {/* vignette / glass curve */}
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0"
            style={{
              background:
                "radial-gradient(ellipse at center, transparent 55%, rgba(0,0,0,0.5) 100%)",
            }}
          />
        </div>
      </div>
    </div>
  );
}
