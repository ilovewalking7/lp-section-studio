import { Menu, Search } from "lucide-react";
import type { DemoMeta } from "@/registry";

export const meta: DemoMeta = {
  name: "ロイヤルヘッダー",
  category: "洋風",
  description: "紋章(heraldic)風の格式あるヘッダー／ナビゲーション。",
  align: "full",
  isNew: true,
  tags: ["洋風", "header", "heraldic", "navigation"],
  principle: "中央に紋章を据えた左右対称ナビが『王室御用達』級の格式と信頼を即座に伝える。",
};

const left = ["Collection", "Atelier", "Histoire"];
const right = ["Journal", "Boutiques", "Contact"];

export default function RoyalHeader() {
  return (
    <header className="w-full bg-[#1c2b46] text-[#f3ede1]">
      <div className="border-b border-white/10 px-6 py-2 text-center text-[10px] uppercase tracking-[0.35em] text-amber-300/80">
        Livraison offerte · Fournisseur depuis 1894
      </div>

      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-6">
        <nav className="hidden flex-1 items-center gap-7 text-[11px] uppercase tracking-[0.22em] text-[#f3ede1]/80 lg:flex">
          {left.map((item) => (
            <a key={item} href="#" className="transition-colors hover:text-amber-300">
              {item}
            </a>
          ))}
        </nav>

        <Menu className="size-5 text-[#f3ede1] lg:hidden" />

        <div className="flex flex-col items-center">
          <Crest className="h-10 text-amber-300" />
          <span className="mt-1 font-display text-2xl italic tracking-wide text-[#f3ede1]">
            Beauregard
          </span>
          <span className="text-[9px] uppercase tracking-[0.4em] text-amber-300/70">
            Paris
          </span>
        </div>

        <nav className="hidden flex-1 items-center justify-end gap-7 text-[11px] uppercase tracking-[0.22em] text-[#f3ede1]/80 lg:flex">
          {right.map((item) => (
            <a key={item} href="#" className="transition-colors hover:text-amber-300">
              {item}
            </a>
          ))}
          <Search className="size-4" />
        </nav>

        <Search className="size-5 text-[#f3ede1] lg:hidden" />
      </div>
    </header>
  );
}

function Crest({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 48 56" fill="none" className={className} aria-hidden>
      <path
        d="M24 2l20 6v18c0 14-10 22-20 28C14 48 4 40 4 26V8l20-6z"
        stroke="currentColor"
        strokeWidth="1.5"
      />
      <path d="M24 2v52M4 26h40" stroke="currentColor" strokeWidth="0.75" opacity="0.6" />
      <path
        d="M24 14l3 6 3-6M24 14l-3 6-3-6M24 30l3 6 3-6M24 30l-3 6-3-6"
        stroke="currentColor"
        strokeWidth="1.2"
      />
      <circle cx="24" cy="22" r="2.5" fill="currentColor" />
    </svg>
  );
}
