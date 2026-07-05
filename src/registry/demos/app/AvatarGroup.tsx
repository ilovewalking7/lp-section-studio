import { cn } from "@/lib/utils";
import type { DemoMeta } from "@/registry";

export const meta: DemoMeta = {
  name: "アバターグループ",
  category: "アプリUI",
  description: "重なり合うアバタースタックと「+N」オーバーフロー、オンライン状態ドット、サイズ違い。",
  align: "center",
};

type Person = {
  ja: string;
  en: string;
  color: string;
  online?: boolean;
};

const PEOPLE: Person[] = [
  { ja: "佐藤 太郎", en: "Taro Sato", color: "from-rose-500 to-orange-500", online: true },
  { ja: "Maya Lin", en: "Maya Lin", color: "from-violet-500 to-indigo-500", online: true },
  { ja: "Kenji Ito", en: "Kenji Ito", color: "from-emerald-500 to-teal-500" },
  { ja: "Ava Cole", en: "Ava Cole", color: "from-sky-500 to-blue-500", online: true },
  { ja: "Liam Ono", en: "Liam Ono", color: "from-amber-500 to-yellow-500" },
];

function initials(name: string): string {
  const parts = name.trim().split(/\s+/);
  if (parts.length === 1) return parts[0].slice(0, 2);
  return (parts[0][0] ?? "") + (parts[parts.length - 1][0] ?? "");
}

const SIZES = {
  sm: { wrap: "h-7 w-7 text-[10px]", dot: "h-2 w-2", ring: "ring-2" },
  md: { wrap: "h-9 w-9 text-xs", dot: "h-2.5 w-2.5", ring: "ring-2" },
  lg: { wrap: "h-12 w-12 text-sm", dot: "h-3 w-3", ring: "ring-[3px]" },
} as const;

type SizeKey = keyof typeof SIZES;

function Avatar({
  person,
  size = "md",
  showStatus = true,
}: {
  person: Person;
  size?: SizeKey;
  showStatus?: boolean;
}) {
  const en =
    typeof document !== "undefined" &&
    document.documentElement.lang === "en";
  const s = SIZES[size];
  const name = en ? person.en : person.ja;
  return (
    <span className="relative inline-flex">
      <span
        className={cn(
          "inline-flex items-center justify-center rounded-full bg-gradient-to-br font-semibold text-white ring-background",
          person.color,
          s.wrap,
          s.ring
        )}
        title={name}
      >
        {initials(name)}
      </span>
      {showStatus && person.online && (
        <span
          className={cn(
            "absolute bottom-0 right-0 rounded-full bg-emerald-500 ring-2 ring-background",
            s.dot
          )}
          aria-label={en ? "Online" : "オンライン"}
        />
      )}
    </span>
  );
}

export default function AvatarGroup() {
  const visible = PEOPLE.slice(0, 4);
  const overflow = PEOPLE.length - visible.length + 2;

  return (
    <div className="flex w-full max-w-sm flex-col items-center gap-8">
      {/* 重なりスタック + オーバーフロー */}
      <div className="flex items-center -space-x-2.5">
        {visible.map((p) => (
          <Avatar key={p.en} person={p} />
        ))}
        <span className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-muted text-xs font-semibold text-muted-foreground ring-2 ring-background">
          +{overflow}
        </span>
      </div>

      {/* サイズバリアント */}
      <div className="flex items-end gap-5">
        <Avatar person={PEOPLE[1]} size="sm" />
        <Avatar person={PEOPLE[0]} size="md" />
        <Avatar person={PEOPLE[3]} size="lg" />
      </div>
    </div>
  );
}
