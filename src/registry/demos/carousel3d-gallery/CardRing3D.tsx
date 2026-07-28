import { useState } from "react";
import { Quote } from "lucide-react";
import { cn } from "@/lib/utils";
import type { DemoMeta } from "@/registry";

export const meta: DemoMeta = {
  name: "3Dカードリング",
  category: "3Dカルーセル",
  description: "証言カードを輪状に並べ前面を順に見せるリング。",
  align: "full",
  isNew: true,
  tags: ["carousel", "3d", "gallery"],
};

const CARDS = [
  {
    id: "sato",
    nameJa: "佐藤",
    nameEn: "Sato",
    textJa: "操作がとても直感的でした。",
    textEn: "The interface felt incredibly intuitive.",
    grad: "from-rose-100 to-rose-50",
  },
  {
    id: "maya",
    nameJa: "Maya",
    nameEn: "Maya",
    textJa: "導入後すぐ成果が出た。",
    textEn: "We saw results right after adopting it.",
    grad: "from-sky-100 to-sky-50",
  },
  {
    id: "kenji",
    nameJa: "Kenji",
    nameEn: "Kenji",
    textJa: "サポートが手厚い。",
    textEn: "The support is exceptional.",
    grad: "from-emerald-100 to-emerald-50",
  },
  {
    id: "ava",
    nameJa: "Ava",
    nameEn: "Ava",
    textJa: "デザインが美しい。",
    textEn: "The design is beautiful.",
    grad: "from-amber-100 to-amber-50",
  },
  {
    id: "liam",
    nameJa: "Liam",
    nameEn: "Liam",
    textJa: "毎日使っています。",
    textEn: "I use it every single day.",
    grad: "from-violet-100 to-violet-50",
  },
];

export default function CardRing3D() {
  const en =
    typeof document !== "undefined" &&
    document.documentElement.lang === "en";
  const [active, setActive] = useState(0);
  const count = CARDS.length;
  const step = 360 / count;

  return (
    <div className="flex w-full flex-col items-center gap-6 py-8 overflow-x-hidden">
      <div
        className="relative"
        style={{ width: 240, height: 200, perspective: "1200px" }}
      >
        <div
          className="relative h-full w-full transition-transform duration-700 ease-out"
          style={{
            transformStyle: "preserve-3d",
            transform: `rotateY(${-active * step}deg)`,
          }}
        >
          {CARDS.map((c, i) => (
            <div
              key={c.id}
              className={cn(
                "absolute inset-0 flex flex-col justify-between rounded-2xl bg-gradient-to-br p-5 text-slate-800 shadow-xl ring-1 ring-black/5",
                c.grad
              )}
              style={{ transform: `rotateY(${i * step}deg) translateZ(260px)` }}
            >
              <Quote className="h-6 w-6 text-slate-400" />
              <p className="text-sm">{en ? c.textEn : c.textJa}</p>
              <span className="text-xs font-semibold">
                — {en ? c.nameEn : c.nameJa}
              </span>
            </div>
          ))}
        </div>
      </div>
      <div className="flex gap-2">
        {CARDS.map((c, i) => (
          <button
            type="button"
            key={c.id}
            onClick={() => setActive(i)}
            aria-label={en ? `Card ${i + 1}` : `${i + 1}番目`}
            className={cn(
              "h-2.5 w-2.5 rounded-full transition-colors",
              i === active ? "bg-primary" : "bg-muted-foreground/30"
            )}
          />
        ))}
      </div>
    </div>
  );
}
