import { useState } from "react";
import { ChevronRight, CircleCheck, Wrench } from "lucide-react";
import { cn } from "@/lib/utils";
import type { DemoMeta } from "@/registry";

export const meta: DemoMeta = {
  name: "ツール呼び出しカード",
  category: "AI / チャット",
  description: "関数呼び出しの引数と戻り値を展開できるカード。",
  align: "center",
  isNew: true,
  tags: ["ai", "chat", "animation"],
};

export default function ToolCallCard() {
  const en =
    typeof document !== "undefined" &&
    document.documentElement.lang === "en";
  const [open, setOpen] = useState(true);

  return (
    <div className="w-full max-w-[480px]">
      <div className="overflow-hidden rounded-xl border bg-card shadow-sm">
        <button
          type="button"
          onClick={() => setOpen((o) => !o)}
          className="flex w-full items-center gap-3 px-4 py-3 text-left transition-colors hover:bg-accent/50"
        >
          <div className="flex size-8 shrink-0 items-center justify-center rounded-lg bg-amber-500/10 text-amber-500">
            <Wrench className="size-4" />
          </div>
          <div className="min-w-0 flex-1">
            <p className="flex items-center gap-2 text-sm font-medium">
              <code className="font-mono text-foreground">get_weather</code>
              <span className="flex items-center gap-1 rounded-full bg-emerald-500/10 px-1.5 py-0.5 text-[10px] font-semibold text-emerald-500">
                <CircleCheck className="size-3" />
                {en ? "Success" : "成功"}
              </span>
            </p>
            <p className="mt-0.5 text-[11px] text-muted-foreground">
              {en ? "Function executed · 142ms" : "関数を実行 · 142ms"}
            </p>
          </div>
          <ChevronRight
            className={cn(
              "size-4 shrink-0 text-muted-foreground transition-transform",
              open && "rotate-90"
            )}
          />
        </button>

        {open && (
          <div className="space-y-3 border-t bg-muted/30 px-4 py-3">
            <div>
              <p className="mb-1.5 text-[11px] font-semibold uppercase tracking-wide text-muted-foreground">
                {en ? "Arguments" : "引数"}
              </p>
              <pre className="overflow-x-auto rounded-lg border bg-card p-3 text-xs leading-relaxed">
                <code className="font-mono">
                  {"{\n  "}
                  <span className="text-sky-500">"city"</span>
                  {": "}
                  <span className="text-emerald-500">"Tokyo"</span>
                  {",\n  "}
                  <span className="text-sky-500">"unit"</span>
                  {": "}
                  <span className="text-emerald-500">"celsius"</span>
                  {"\n}"}
                </code>
              </pre>
            </div>
            <div>
              <p className="mb-1.5 text-[11px] font-semibold uppercase tracking-wide text-muted-foreground">
                {en ? "Return value" : "戻り値"}
              </p>
              <pre className="overflow-x-auto rounded-lg border bg-card p-3 text-xs leading-relaxed">
                <code className="font-mono">
                  {"{\n  "}
                  <span className="text-sky-500">"temp"</span>
                  {": "}
                  <span className="text-violet-500">22</span>
                  {",\n  "}
                  <span className="text-sky-500">"condition"</span>
                  {": "}
                  <span className="text-emerald-500">{en ? '"Sunny"' : '"晴れ"'}</span>
                  {"\n}"}
                </code>
              </pre>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
