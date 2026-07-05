import { useEffect, useLayoutEffect, useRef, useState } from "react";
import type { DemoMeta } from "@/registry";

export const meta: DemoMeta = {
  name: "グーイ・ナビ",
  category: "Awwwards",
  description: "アクティブ項目を液体のように追いかける、グーイなピル型ナビゲーション。",
  align: "full",
  isNew: true,
  tags: ["awwwards", "interaction", "animation"],
};

const items = [
  { ja: "ホーム", en: "Home" },
  { ja: "作品", en: "Work" },
  { ja: "実績", en: "Cases" },
  { ja: "会社", en: "Company" },
  { ja: "連絡", en: "Contact" },
];

export default function GooeyNav() {
  const en = typeof document !== "undefined" && document.documentElement.lang === "en";
  const listRef = useRef<HTMLUListElement | null>(null);
  const [active, setActive] = useState(0);
  const [pill, setPill] = useState({ left: 0, width: 0 });

  // アクティブ項目の位置を測ってピルを移動（offsetWidth が 0 の環境では更新しない）
  useLayoutEffect(() => {
    const list = listRef.current;
    if (!list) return;
    const li = list.querySelectorAll("li")[active] as HTMLElement | undefined;
    if (!li || li.offsetWidth === 0) return;
    setPill((prev) =>
      prev.left === li.offsetLeft && prev.width === li.offsetWidth
        ? prev
        : { left: li.offsetLeft, width: li.offsetWidth }
    );
  }, [active]);

  // リサイズ時に再計測
  useEffect(() => {
    const onResize = () => {
      const list = listRef.current;
      if (!list) return;
      const li = list.querySelectorAll("li")[active] as HTMLElement | undefined;
      if (li && li.offsetWidth > 0)
        setPill({ left: li.offsetLeft, width: li.offsetWidth });
    };
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, [active]);

  return (
    <section className="relative w-full bg-neutral-950 px-6 py-28 text-neutral-50 sm:px-16">
      <nav className="mx-auto w-fit rounded-full border border-neutral-800 bg-neutral-900 p-1.5">
        <ul ref={listRef} className="relative flex">
          <span
            aria-hidden
            className="absolute top-0 h-full rounded-full bg-amber-300 transition-[left,width] duration-500 [transition-timing-function:cubic-bezier(.34,1.56,.64,1)]"
            style={{ left: pill.left, width: pill.width }}
          />
          {items.map((it, i) => (
            <li key={it.en} className="relative z-10">
              <button
                type="button"
                onClick={() => setActive(i)}
                className={
                  "rounded-full px-5 py-2.5 text-sm font-medium transition-colors duration-300 sm:px-7 " +
                  (active === i ? "text-neutral-900" : "text-neutral-300 hover:text-white")
                }
              >
                {en ? it.en : it.ja}
              </button>
            </li>
          ))}
        </ul>
      </nav>
    </section>
  );
}
