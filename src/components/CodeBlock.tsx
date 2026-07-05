import { useState } from "react";
import { Check, Copy } from "lucide-react";
import { Button } from "@/components/ui/button";

export function CodeBlock({
  code,
  onBeforeCopy,
}: {
  code: string;
  /** コピー前ゲート。false を返すとコピーを中断（Free 上限など）。 */
  onBeforeCopy?: () => boolean;
}) {
  const [copied, setCopied] = useState(false);

  const copy = async () => {
    if (onBeforeCopy && !onBeforeCopy()) return;
    try {
      await navigator.clipboard.writeText(code);
    } catch {
      // クリップボードが使えない環境向けのフォールバック
      const ta = document.createElement("textarea");
      ta.value = code;
      document.body.appendChild(ta);
      ta.select();
      document.execCommand("copy");
      document.body.removeChild(ta);
    }
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };

  return (
    <div className="relative">
      <Button
        size="sm"
        variant="secondary"
        onClick={copy}
        className="absolute right-3 top-3 z-10"
      >
        {copied ? <Check /> : <Copy />}
        {copied ? "コピー済み" : "コードをコピー"}
      </Button>
      <pre className="max-h-[480px] overflow-auto rounded-lg border bg-muted/40 p-4 text-xs leading-relaxed">
        <code>{code}</code>
      </pre>
    </div>
  );
}
