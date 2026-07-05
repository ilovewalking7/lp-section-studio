import { useEffect, useRef, useState } from "react";
import { Mic, Square } from "lucide-react";
import { cn } from "@/lib/utils";
import type { DemoMeta } from "@/registry";

export const meta: DemoMeta = {
  name: "音声入力パルス",
  category: "AI / チャット",
  description: "録音中に波形が脈打つ音声入力ボタン。",
  align: "center",
  isNew: true,
  tags: ["ai", "chat", "animation"],
};

const BAR_DELAYS = [0, 0.15, 0.3, 0.1, 0.25, 0.05, 0.2, 0.35, 0.12];

export default function VoiceInputPulse() {
  const en =
    typeof document !== "undefined" &&
    document.documentElement.lang === "en";
  const [recording, setRecording] = useState(false);
  const [seconds, setSeconds] = useState(0);
  const timer = useRef<number | null>(null);

  useEffect(() => {
    if (recording) {
      setSeconds(0);
      timer.current = window.setInterval(() => setSeconds((s) => s + 1), 1000);
    } else if (timer.current) {
      window.clearInterval(timer.current);
    }
    return () => {
      if (timer.current) window.clearInterval(timer.current);
    };
  }, [recording]);

  const mm = String(Math.floor(seconds / 60)).padStart(2, "0");
  const ss = String(seconds % 60).padStart(2, "0");

  return (
    <div className="flex w-full max-w-[360px] flex-col items-center gap-5">
      <style>{`
        @keyframes ai2-voicebar {
          0%, 100% { transform: scaleY(0.3); }
          50% { transform: scaleY(1); }
        }
      `}</style>

      <div className="flex h-16 items-center gap-1.5">
        {BAR_DELAYS.map((d, i) => (
          <span
            key={i}
            className={cn(
              "w-1.5 rounded-full bg-gradient-to-t from-violet-500 to-sky-400",
              recording ? "h-12 origin-center" : "h-2 opacity-30"
            )}
            style={
              recording
                ? { animation: `ai2-voicebar 0.9s ease-in-out ${d}s infinite` }
                : undefined
            }
          />
        ))}
      </div>

      <button
        type="button"
        onClick={() => setRecording((r) => !r)}
        className={cn(
          "relative flex size-16 items-center justify-center rounded-full text-white shadow-lg transition-all active:scale-95",
          recording
            ? "bg-rose-500 shadow-rose-500/30"
            : "bg-gradient-to-br from-violet-600 to-sky-600 shadow-violet-500/30"
        )}
      >
        {recording && (
          <span className="absolute inset-0 animate-ping rounded-full bg-rose-500/40" />
        )}
        {recording ? (
          <Square className="size-5 fill-current" />
        ) : (
          <Mic className="size-6" />
        )}
      </button>

      <p
        className={cn(
          "text-sm font-medium tabular-nums",
          recording ? "text-rose-500" : "text-muted-foreground"
        )}
      >
        {recording
          ? en
            ? `Recording ${mm}:${ss}`
            : `録音中 ${mm}:${ss}`
          : en
            ? "Tap to speak"
            : "タップして話す"}
      </p>
    </div>
  );
}
