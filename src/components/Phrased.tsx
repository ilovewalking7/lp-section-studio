import { cn } from "@/lib/utils";

/**
 * 日本語の見出し・リード文を「文節」で折り返すためのテキスト。
 *
 * 日本語は単語の途中でも改行できてしまうため、放っておくと
 * 「ランディングペ／ージは、」のように意味の切れ目を無視した改行が起きる。
 * コピー側では折り返してよい位置に `|` を書き、ここで各文節を inline-block の
 * span に包む。これで改行は文節の境界だけで起きる。
 *
 * `|` を含まない文字列（英語コピーなど）はそのまま＝従来どおり単語単位で折り返る。
 * 文節が枠より広い場合は inline-block 内部で折り返るだけなので、横溢れはしない。
 */
export function Phrased({
  text,
  className,
}: {
  text: string;
  className?: string;
}) {
  const parts = text.split("|");
  if (parts.length === 1 && !className) return <>{text}</>;
  return (
    <>
      {parts.map((part, i) => (
        <span key={`${i}-${part}`} className={cn("inline-block", className)}>
          {part}
        </span>
      ))}
    </>
  );
}
