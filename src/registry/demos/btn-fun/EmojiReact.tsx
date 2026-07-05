import type { DemoMeta } from "@/registry";
import { useState } from "react";
import { Smile } from "lucide-react";

export const meta: DemoMeta = {
  name: "絵文字リアクション",
  category: "ボタン",
  description: "押すたびに絵文字が切り替わりぴょこっと跳ねる、反応する絵文字ボタン。",
  align: "center",
  isNew: true,
  tags: ["button", "fun"],
};

const EMOJIS = ["😀", "😍", "🎉", "🔥", "🚀", "👍"];

export default function EmojiReact() {
  const en = typeof document !== "undefined" && document.documentElement.lang === "en";
  const [i, setI] = useState(-1);
  const [bump, setBump] = useState(0);

  return (
    <div className="flex items-center justify-center rounded-2xl bg-amber-50 p-8">
      <style>{`@keyframes btnfun-pop{0%{transform:scale(.4) rotate(-12deg)}60%{transform:scale(1.25) rotate(8deg)}100%{transform:scale(1) rotate(0)}}`}</style>
      <button
        type="button"
        aria-label={en ? "React with emoji" : "絵文字でリアクション"}
        onClick={() => {
          setI((p) => (p + 1) % EMOJIS.length);
          setBump((b) => b + 1);
        }}
        className="inline-flex items-center gap-2 rounded-full border-2 border-amber-300 bg-white px-6 py-3 text-sm font-bold text-amber-700 shadow-[0_8px_18px_-8px_rgba(245,158,11,0.6)] transition-all duration-150 hover:bg-amber-100 active:scale-95 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-amber-300"
      >
        <span
          key={bump}
          className="text-lg leading-none"
          style={{ animation: i >= 0 ? "btnfun-pop .4s ease" : undefined }}
          aria-hidden="true"
        >
          {i >= 0 ? EMOJIS[i] : <Smile className="size-4" />}
        </span>
        {en ? "React" : "リアクション"}
      </button>
    </div>
  );
}
