import { Bot } from "lucide-react";
import { cn } from "@/lib/utils";
import type { DemoMeta } from "@/registry";

export const meta: DemoMeta = {
  name: "チャットスレッド",
  category: "AI / チャット",
  description: "ユーザーとアシスタントが交互に並ぶ会話スレッド。",
  align: "center",
};

type Message = {
  id: number;
  role: "user" | "assistant";
  content: React.ReactNode;
};

const getMessages = (en: boolean): Message[] => [
  {
    id: 1,
    role: "user",
    content: en
      ? "Can you write a debounce hook for React?"
      : "Reactでデバウンス用のフックを書いてくれる？",
  },
  {
    id: 2,
    role: "assistant",
    content: (
      <div className="space-y-3">
        <p>
          {en
            ? "Of course. Here's a simple `useDebounce` hook example."
            : "もちろんです。シンプルな `useDebounce` フックの例です。"}
        </p>
        <pre className="overflow-x-auto rounded-lg border bg-background/60 p-3 text-xs leading-relaxed">
          <code className="font-mono text-foreground">
            <span className="text-violet-400">function</span>{" "}
            <span className="text-sky-400">useDebounce</span>(value, delay) {"{"}
            {"\n"}  <span className="text-violet-400">const</span> [v, setV] ={" "}
            <span className="text-sky-400">useState</span>(value);{"\n"}{"  "}
            <span className="text-sky-400">useEffect</span>(() ={">"} {"{"}
            {"\n"}    <span className="text-violet-400">const</span> id ={" "}
            setTimeout(() ={">"} setV(value), delay);{"\n"}    {" "}
            <span className="text-violet-400">return</span> () ={">"}{" "}
            clearTimeout(id);{"\n"}  {"}"}, [value, delay]);{"\n"}{"  "}
            <span className="text-violet-400">return</span> v;{"\n"}
            {"}"}
          </code>
        </pre>
      </div>
    ),
  },
  {
    id: 3,
    role: "user",
    content: en
      ? "Thanks! Anything to watch out for when using it?"
      : "ありがとう！使うときの注意点はある？",
  },
  {
    id: 4,
    role: "assistant",
    content: (
      <div className="space-y-2">
        <p>{en ? "A few things to keep in mind." : "いくつかポイントがあります。"}</p>
        <ul className="space-y-1.5 text-muted-foreground">
          <li className="flex gap-2">
            <span className="text-violet-400">•</span>
            <span>
              {en
                ? "The debounced value lags by a beat, so it's not ideal for work that needs to be instant."
                : "遅延値は1テンポ遅れるので即時性が必要な処理には不向き。"}
            </span>
          </li>
          <li className="flex gap-2">
            <span className="text-violet-400">•</span>
            <span>
              {en
                ? "It's perfect for throttling rapid updates like search or autocomplete."
                : "検索や入力補完など連続更新の抑制に最適です。"}
            </span>
          </li>
          <li className="flex gap-2">
            <span className="text-violet-400">•</span>
            <span>
              {en
                ? "A delay around 200–400ms feels natural in practice."
                : "delay は 200〜400ms あたりが体感的に自然です。"}
            </span>
          </li>
        </ul>
      </div>
    ),
  },
];

function Avatar({ role }: { role: Message["role"] }) {
  if (role === "assistant") {
    return (
      <div className="flex size-8 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-violet-500 to-sky-500 text-white shadow-sm">
        <Bot className="size-4" />
      </div>
    );
  }
  return (
    <div className="flex size-8 shrink-0 items-center justify-center rounded-full bg-muted text-xs font-semibold text-muted-foreground">
      YK
    </div>
  );
}

export default function ChatThread() {
  const en =
    typeof document !== "undefined" &&
    document.documentElement.lang === "en";
  const messages = getMessages(en);
  return (
    <div className="w-full max-w-[640px] space-y-6 rounded-xl border bg-card p-4 sm:p-6">
      {messages.map((m) => (
        <div
          key={m.id}
          className={cn(
            "flex gap-3",
            m.role === "user" && "flex-row-reverse"
          )}
        >
          <Avatar role={m.role} />
          <div
            className={cn(
              "max-w-[78%] rounded-2xl px-4 py-2.5 text-sm leading-relaxed",
              m.role === "assistant"
                ? "rounded-tl-sm bg-muted text-foreground"
                : "rounded-tr-sm bg-primary text-primary-foreground"
            )}
          >
            {m.content}
          </div>
        </div>
      ))}
    </div>
  );
}
