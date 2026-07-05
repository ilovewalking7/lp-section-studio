import { useRef } from "react";
import { MousePointer2, ArrowRight } from "lucide-react";
import type { DemoMeta } from "@/registry";

export const meta: DemoMeta = {
  name: "マグネティックカード",
  category: "カード演出",
  description: "カードとCTAボタンがカーソルへ磁石のように引き寄せられる。",
  align: "center",
  isNew: true,
  tags: ["card", "hover", "animation", "magnetic"],
};

export default function MagneticCard() {
  const en =
    typeof document !== "undefined" &&
    document.documentElement.lang === "en";
  const cardRef = useRef<HTMLDivElement>(null);
  const btnRef = useRef<HTMLButtonElement>(null);

  function onMove(e: React.MouseEvent<HTMLDivElement>) {
    const card = cardRef.current;
    if (!card) return;
    const r = card.getBoundingClientRect();
    const dx = (e.clientX - (r.left + r.width / 2)) / r.width;
    const dy = (e.clientY - (r.top + r.height / 2)) / r.height;
    card.style.transform = `translate(${dx * 14}px, ${dy * 14}px)`;
    if (btnRef.current) {
      btnRef.current.style.transform = `translate(${dx * 26}px, ${dy * 26}px)`;
    }
  }

  function onLeave() {
    if (cardRef.current) cardRef.current.style.transform = "translate(0,0)";
    if (btnRef.current) btnRef.current.style.transform = "translate(0,0)";
  }

  return (
    <div
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      className="grid w-full max-w-sm place-items-center p-6"
    >
      <div
        ref={cardRef}
        className="relative w-full overflow-hidden rounded-2xl border border-white/10 bg-[#0b0d17] p-7 text-slate-200 shadow-2xl shadow-black/40 transition-transform duration-200 ease-out"
      >
        <span className="inline-flex size-11 items-center justify-center rounded-xl border border-white/10 bg-white/5">
          <MousePointer2 className="size-5 text-violet-300" />
        </span>
        <h3 className="mt-5 text-lg font-semibold text-white">{en ? "Magnetic" : "マグネティック"}</h3>
        <p className="mt-2 text-sm leading-relaxed text-slate-400">
          {en
            ? "The card drifts gently toward your cursor, and the button reacts even more strongly."
            : "カーソルに合わせてカードがわずかに引き寄せられ、ボタンはさらに強く反応します。"}
        </p>
        <button
          ref={btnRef}
          type="button"
          className="mt-6 inline-flex items-center gap-1.5 rounded-full bg-violet-500 px-5 py-2.5 text-sm font-medium text-white shadow-lg shadow-violet-500/30 transition-transform duration-200 ease-out hover:bg-violet-400"
        >
          {en ? "Get started" : "始める"} <ArrowRight className="size-4" />
        </button>
      </div>
    </div>
  );
}
