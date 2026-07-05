import { useId, useState } from "react";
import { Bookmark, Heart, Share2 } from "lucide-react";
import { cn } from "@/lib/utils";
import type { DemoMeta } from "@/registry";

export const meta: DemoMeta = {
  name: "ツールチップ",
  category: "アプリUI",
  description: "ホバー・フォーカスで表示されるツールチップ。ターゲットの上下に配置、ライブラリ不使用。",
  align: "center",
};

type Side = "top" | "bottom";

function Tooltip({
  label,
  side = "top",
  children,
}: {
  label: string;
  side?: Side;
  children: React.ReactNode;
}) {
  const [open, setOpen] = useState(false);
  const id = useId();

  return (
    <span
      className="relative inline-flex"
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}
      onFocus={() => setOpen(true)}
      onBlur={() => setOpen(false)}
    >
      <span aria-describedby={open ? id : undefined}>{children}</span>
      <span
        role="tooltip"
        id={id}
        className={cn(
          "pointer-events-none absolute left-1/2 z-30 -translate-x-1/2 whitespace-nowrap rounded-md bg-foreground px-2 py-1 text-xs font-medium text-background shadow-md transition-all duration-150",
          side === "top" ? "bottom-full mb-2" : "top-full mt-2",
          open
            ? "translate-y-0 opacity-100"
            : side === "top"
              ? "translate-y-1 opacity-0"
              : "-translate-y-1 opacity-0"
        )}
      >
        {label}
        <span
          aria-hidden
          className={cn(
            "absolute left-1/2 h-2 w-2 -translate-x-1/2 rotate-45 bg-foreground",
            side === "top" ? "top-full -mt-1" : "bottom-full -mb-1"
          )}
        />
      </span>
    </span>
  );
}

function IconButton({ children }: { children: React.ReactNode }) {
  return (
    <button
      type="button"
      className="flex h-10 w-10 items-center justify-center rounded-full border border-input bg-background text-muted-foreground shadow-sm transition-colors hover:bg-accent hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring [&_svg]:h-[18px] [&_svg]:w-[18px]"
    >
      {children}
    </button>
  );
}

export default function TooltipDemo() {
  const en =
    typeof document !== "undefined" &&
    document.documentElement.lang === "en";
  return (
    <div className="flex w-full max-w-sm flex-col items-center gap-10 py-8">
      <div className="flex items-center gap-4">
        <Tooltip label={en ? "Like" : "いいね"} side="top">
          <IconButton>
            <Heart />
          </IconButton>
        </Tooltip>
        <Tooltip label={en ? "Save" : "保存する"} side="top">
          <IconButton>
            <Bookmark />
          </IconButton>
        </Tooltip>
        <Tooltip label={en ? "Share" : "共有"} side="top">
          <IconButton>
            <Share2 />
          </IconButton>
        </Tooltip>
      </div>

      <Tooltip
        label={en ? "Tooltip shown below" : "下に表示されるツールチップ"}
        side="bottom"
      >
        <span className="cursor-default rounded-md border border-dashed border-input px-4 py-2 text-sm text-muted-foreground">
          {en ? "Hover here" : "ここにホバー"}
        </span>
      </Tooltip>
    </div>
  );
}
