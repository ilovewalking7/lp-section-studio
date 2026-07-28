import { cn } from "@/lib/utils";
import { LANGS, type Lang } from "@/lib/i18n";

/** 言語切替トグル（JA / EN）。各画面のヘッダー内に置く（重なりを避けるため固定配置はしない）。 */
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
        "flex shrink-0 rounded-full border bg-background/90 p-0.5 backdrop-blur",
        className
      )}
    >
      {LANGS.map((l) => (
        <button
          key={l.id}
          onClick={() => setLang(l.id)}
          aria-pressed={lang === l.id}
          className={cn(
            // 狭い画面ではヘッダーの他要素と競合するので一段小さくする
            "rounded-full px-2 py-0.5 text-[11px] font-semibold transition-colors sm:px-2.5 sm:py-1 sm:text-xs",
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
