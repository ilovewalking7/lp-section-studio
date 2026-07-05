import type { DemoMeta } from "@/registry";

export const meta: DemoMeta = {
  name: "ロゴクラウド",
  category: "マーケティング",
  description: "架空ブランドのワードマークで構成した「信頼の証」ロゴ列。",
  align: "full",
};

function Wordmark({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex items-center gap-2 text-muted-foreground/80 transition-colors hover:text-foreground">
      {children}
    </div>
  );
}

export default function LogoCloud() {
  const en =
    typeof document !== "undefined" &&
    document.documentElement.lang === "en";
  return (
    <section className="w-full px-6 py-16">
      <div className="mx-auto max-w-5xl">
        <p className="text-center text-sm font-medium uppercase tracking-widest text-muted-foreground">
          {en
            ? "Trusted by forward-thinking teams worldwide"
            : "世界中の先進的なチームに採用されています"}
        </p>

        <div className="mt-9 grid grid-cols-2 items-center justify-items-center gap-x-6 gap-y-8 sm:grid-cols-3 lg:grid-cols-6">
          <Wordmark>
            <svg viewBox="0 0 24 24" className="size-6" fill="none" aria-hidden>
              <path
                d="M4 18 12 4l8 14H4Z"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinejoin="round"
              />
            </svg>
            <span className="text-lg font-bold tracking-tight">Apex</span>
          </Wordmark>

          <Wordmark>
            <svg viewBox="0 0 24 24" className="size-6" fill="currentColor" aria-hidden>
              <circle cx="8" cy="12" r="5" />
              <circle cx="16" cy="12" r="5" fillOpacity="0.4" />
            </svg>
            <span className="text-lg font-semibold tracking-tight">Nimbus</span>
          </Wordmark>

          <Wordmark>
            <span className="text-xl font-black italic tracking-tighter">
              Volt
            </span>
            <span className="-ml-1 text-xl font-light tracking-tighter">flow</span>
          </Wordmark>

          <Wordmark>
            <svg viewBox="0 0 24 24" className="size-6" fill="none" aria-hidden>
              <rect
                x="4"
                y="4"
                width="16"
                height="16"
                rx="5"
                stroke="currentColor"
                strokeWidth="2"
              />
              <path d="M9 12h6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
            </svg>
            <span className="text-lg font-semibold tracking-tight">Quartz</span>
          </Wordmark>

          <Wordmark>
            <span className="grid size-6 place-items-center rounded-md bg-current text-background">
              <span className="text-xs font-black text-background">H</span>
            </span>
            <span className="text-lg font-semibold tracking-wide">HELIX</span>
          </Wordmark>

          <Wordmark>
            <svg viewBox="0 0 24 24" className="size-6" fill="none" aria-hidden>
              <path
                d="M6 12a6 6 0 0 1 12 0M6 12a6 6 0 0 0 12 0"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
              />
            </svg>
            <span className="font-mono text-lg font-medium tracking-tight">
              northwind
            </span>
          </Wordmark>
        </div>
      </div>
    </section>
  );
}
