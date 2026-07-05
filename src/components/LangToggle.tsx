import { cn } from "@/lib/utils";
import { LANGS, type Lang } from "@/lib/i18n";

/** 言語切替トグル（JA / EN）。LP・料金では右上固定、スタジオではヘッダー内に置く。 */
export function LangToggle({
  lang,
  setLang,
  className,
}: {
  lang: Lang;
  setLang: (l: Lang) => void;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "flex rounded-full border bg-background/90 p-0.5 backdrop-blur",
        className
      )}
    >
      {LANGS.map((l) => (
        <button
          key={l.id}
          onClick={() => setLang(l.id)}
          aria-pressed={lang === l.id}
          className={cn(
            "rounded-full px-2.5 py-1 text-xs font-semibold transition-colors",
            lang === l.id
              ? "bg-primary text-primary-foreground"
              : "text-muted-foreground hover:text-foreground"
          )}
        >
          {l.short}
        </button>
      ))}
    </div>
  );
}
