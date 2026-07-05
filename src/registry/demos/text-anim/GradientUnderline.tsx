import type { DemoMeta } from "@/registry";

export const meta: DemoMeta = {
  name: "グラデ下線見出し",
  category: "テキストアニメ",
  description: "マウント時に描かれ、ホバーで再生するアニメ・グラデ下線。",
  align: "center",
  isNew: true,
  tags: ["text", "animation", "underline"],
};

export default function GradientUnderline() {
  const en =
    typeof document !== "undefined" &&
    document.documentElement.lang === "en";
  return (
    <div className="flex min-h-[260px] w-full max-w-2xl flex-col items-center justify-center gap-6 rounded-2xl bg-background px-8 py-14 text-center">
      <h2 className="group text-3xl font-bold tracking-tight text-foreground sm:text-5xl">
        <span className="relative inline-block pb-2">
          {en ? "The underline draws in" : "下線が描かれる"}
          <span className="pointer-events-none absolute bottom-0 left-0 h-[5px] w-full origin-left scale-x-0 rounded-full bg-[linear-gradient(90deg,#ec4899,#8b5cf6,#3b82f6)] [animation:gu-draw_1.1s_cubic-bezier(0.22,1,0.36,1)_0.3s_forwards] group-hover:[animation:gu-draw_0.6s_cubic-bezier(0.22,1,0.36,1)_forwards]" />
        </span>
      </h2>
      <p className="text-sm text-muted-foreground">
        {en
          ? "Hover to redraw the underline."
          : "ホバーすると下線が描き直されます。"}
      </p>
      <style>{`
        @keyframes gu-draw {
          0% { transform: scaleX(0); }
          100% { transform: scaleX(1); }
        }
      `}</style>
    </div>
  );
}
