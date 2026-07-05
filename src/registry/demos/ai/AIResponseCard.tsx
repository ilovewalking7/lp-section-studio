import { useState } from "react";
import {
  Check,
  Copy,
  RefreshCw,
  Sparkles,
  ThumbsDown,
  ThumbsUp,
} from "lucide-react";
import { cn } from "@/lib/utils";
import type { DemoMeta } from "@/registry";

export const meta: DemoMeta = {
  name: "AI回答カード",
  category: "AI / チャット",
  description: "モデル名ヘッダーと操作フッター付きの回答カード。",
  align: "center",
};

type Vote = "up" | "down" | null;

export default function AIResponseCard() {
  const en =
    typeof document !== "undefined" &&
    document.documentElement.lang === "en";
  const [copied, setCopied] = useState(false);
  const [vote, setVote] = useState<Vote>(null);

  const handleCopy = () => {
    setCopied(true);
    window.setTimeout(() => setCopied(false), 1400);
  };

  return (
    <div className="w-full max-w-[560px] rounded-xl border bg-card shadow-sm">
      <div className="flex items-center gap-2.5 border-b px-4 py-3">
        <div className="flex size-7 items-center justify-center rounded-full bg-gradient-to-br from-violet-500 to-sky-500 text-white">
          <Sparkles className="size-3.5" />
        </div>
        <div className="leading-tight">
          <p className="text-sm font-semibold text-foreground">Claude 3.5</p>
          <p className="text-xs text-muted-foreground">
            {en ? "Generated in 2.1s · Done thinking" : "2.1秒で生成 · 思考完了"}
          </p>
        </div>
      </div>

      <div className="space-y-3 px-4 py-4 text-sm leading-relaxed text-foreground">
        {en ? (
          <>
            <p>
              Splitting state into three layers — "local UI", "shared client",
              and "server" — makes things much clearer. For things like a
              form's open/closed state, reach for
              <code className="mx-1 rounded bg-muted px-1.5 py-0.5 font-mono text-xs">
                useState
              </code>
              , and keep fetched data in a cache layer.
            </p>
            <p className="text-muted-foreground">
              This localizes the scope of re-renders and prevents duplicated or
              stale data.
            </p>
          </>
        ) : (
          <>
            <p>
              状態を「ローカルUI」「共有クライアント」「サーバー」の3層に分けると
              見通しが良くなります。フォームの開閉などは
              <code className="mx-1 rounded bg-muted px-1.5 py-0.5 font-mono text-xs">
                useState
              </code>
              、取得データはキャッシュ層に置くのがおすすめです。
            </p>
            <p className="text-muted-foreground">
              こうすると再レンダリングの範囲が局所化され、データの重複や陳腐化も
              防げます。
            </p>
          </>
        )}
      </div>

      <div className="flex items-center gap-1 border-t px-3 py-2">
        <button
          type="button"
          onClick={handleCopy}
          className="flex items-center gap-1.5 rounded-md px-2 py-1.5 text-xs font-medium text-muted-foreground transition-colors hover:bg-accent hover:text-foreground"
        >
          {copied ? (
            <Check className="size-3.5 text-emerald-400" />
          ) : (
            <Copy className="size-3.5" />
          )}
          {copied ? (en ? "Copied" : "コピー済み") : en ? "Copy" : "コピー"}
        </button>
        <button
          type="button"
          className="flex items-center gap-1.5 rounded-md px-2 py-1.5 text-xs font-medium text-muted-foreground transition-colors hover:bg-accent hover:text-foreground"
        >
          <RefreshCw className="size-3.5" />
          {en ? "Regenerate" : "再生成"}
        </button>
        <div className="ml-auto flex items-center gap-0.5">
          <button
            type="button"
            aria-label={en ? "Helpful" : "役に立った"}
            onClick={() => setVote((v) => (v === "up" ? null : "up"))}
            className={cn(
              "flex size-7 items-center justify-center rounded-md transition-colors hover:bg-accent",
              vote === "up" ? "text-emerald-400" : "text-muted-foreground"
            )}
          >
            <ThumbsUp className="size-3.5" />
          </button>
          <button
            type="button"
            aria-label={en ? "Not helpful" : "役に立たなかった"}
            onClick={() => setVote((v) => (v === "down" ? null : "down"))}
            className={cn(
              "flex size-7 items-center justify-center rounded-md transition-colors hover:bg-accent",
              vote === "down" ? "text-rose-400" : "text-muted-foreground"
            )}
          >
            <ThumbsDown className="size-3.5" />
          </button>
        </div>
      </div>
    </div>
  );
}
