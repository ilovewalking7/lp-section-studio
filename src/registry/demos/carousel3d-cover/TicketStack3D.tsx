import { useState } from "react";
import { Ticket, ChevronRight } from "lucide-react";
import type { DemoMeta } from "@/registry";
import { cn } from "@/lib/utils";

export const meta: DemoMeta = {
  name: "3Dチケットスタック",
  category: "3Dカルーセル",
  description: "斜めに積まれたチケットを引き抜くように送る3Dカルーセル。",
  align: "full",
  isNew: true,
  tags: ["carousel", "3d", "coverflow"],
};

const TICKETS = [
  { event: "Jazz Night", date: "07.04", seat: "A-12", from: "#7c3aed", to: "#4c1d95" },
  { event: "Indie Fest", date: "07.18", seat: "B-08", from: "#0891b2", to: "#155e75" },
  { event: "Synth Wave", date: "08.02", seat: "C-21", from: "#db2777", to: "#831843" },
  { event: "Acoustic", date: "08.20", seat: "D-05", from: "#16a34a", to: "#14532d" },
];

export default function TicketStack3D() {
  const en =
    typeof document !== "undefined" &&
    document.documentElement.lang === "en";
  const [active, setActive] = useState(0);

  return (
    <div className="w-full bg-background py-12">
      <div
        className="relative mx-auto flex h-64 max-w-md items-center justify-center"
        style={{ perspective: "1100px" }}
      >
        <div className="relative h-40 w-80" style={{ transformStyle: "preserve-3d" }}>
          {TICKETS.map((t, i) => {
            const depth = (i - active + TICKETS.length) % TICKETS.length;
            return (
              <div
                key={t.event}
                className="absolute inset-0 flex items-center overflow-hidden rounded-xl text-white shadow-xl transition-all duration-500"
                style={{
                  transform: `translateZ(${-depth * 50}px) translateX(${depth * 18}px) rotateY(${depth * -8}deg)`,
                  zIndex: TICKETS.length - depth,
                  opacity: depth > 2 ? 0 : 1,
                  background: `linear-gradient(100deg, ${t.from}, ${t.to})`,
                }}
              >
                <div className="flex h-full w-20 flex-col items-center justify-center border-r-2 border-dashed border-white/40">
                  <Ticket className="h-7 w-7" />
                </div>
                <div className="flex flex-1 items-center justify-between px-5">
                  <div>
                    <p className="text-lg font-bold">{t.event}</p>
                    <p className="text-xs opacity-75">SEAT {t.seat}</p>
                  </div>
                  <span className="text-2xl font-extrabold tracking-tight">{t.date}</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <div className="mt-6 flex items-center justify-center gap-4">
        <div className="flex gap-1.5">
          {TICKETS.map((t, i) => (
            <span
              key={t.event}
              className={cn(
                "h-2 w-2 rounded-full transition",
                i === active ? "bg-primary" : "bg-muted-foreground/30"
              )}
            />
          ))}
        </div>
        <button
          onClick={() => setActive((a) => (a + 1) % TICKETS.length)}
          className="flex items-center gap-1 rounded-full bg-primary px-5 py-2 text-sm font-semibold text-primary-foreground transition hover:opacity-90"
        >
          {en ? "Next ticket" : "次のチケット"} <ChevronRight className="h-4 w-4" />
        </button>
      </div>
    </div>
  );
}
