import type { DemoMeta } from "@/registry";

export const meta: DemoMeta = {
  name: "エレガントフッター",
  category: "洋風",
  description: "上品なフッター。装飾区切り、リンク列、著作権を端正に配置。",
  align: "full",
  isNew: true,
  tags: ["洋風", "footer", "elegant", "luxury"],
  principle: "中央の屋号と装飾区切りで締めることで、ページ全体に一貫した格を与える。",
};

const columns: { title: string; links: string[] }[] = [
  { title: "Maison", links: ["Histoire", "Atelier", "Savoir-faire", "Presse"] },
  { title: "Boutique", links: ["Collection", "Nouveautés", "Sur-mesure", "Cadeaux"] },
  { title: "Service", links: ["Contact", "Livraison", "Retours", "FAQ"] },
];

export default function EleganceFooter() {
  return (
    <footer className="w-full bg-[#1c2b46] px-6 py-14 text-[#f3ede1]">
      <div className="mx-auto max-w-5xl">
        <div className="text-center">
          <span className="font-display text-3xl italic tracking-wide">
            Beauregard
          </span>
          <Divider className="mx-auto mt-5 h-5 text-amber-300/70" />
        </div>

        <div className="mt-12 grid grid-cols-2 gap-8 sm:grid-cols-3">
          {columns.map((col) => (
            <div key={col.title}>
              <h4 className="text-[11px] uppercase tracking-[0.3em] text-amber-300/80">
                {col.title}
              </h4>
              <ul className="mt-4 space-y-2.5 text-sm text-[#f3ede1]/70">
                {col.links.map((link) => (
                  <li key={link}>
                    <a href="#" className="transition-colors hover:text-amber-200">
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-12 flex flex-col items-center gap-3 border-t border-white/10 pt-6 text-[11px] text-[#f3ede1]/50 sm:flex-row sm:justify-between">
          <p className="uppercase tracking-[0.2em]">
            © {new Date().getFullYear()} Maison Beauregard
          </p>
          <div className="flex gap-6 uppercase tracking-[0.2em]">
            <a href="#" className="hover:text-amber-200">
              Confidentialité
            </a>
            <a href="#" className="hover:text-amber-200">
              Conditions
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}

function Divider({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 180 20" fill="none" className={className} aria-hidden>
      <path d="M10 10h62M170 10h-62" stroke="currentColor" strokeWidth="1" />
      <path
        d="M90 2c-5 3-8 5-8 8s3 5 8 8c5-3 8-5 8-8s-3-5-8-8z"
        stroke="currentColor"
        strokeWidth="1"
      />
      <circle cx="90" cy="10" r="1.5" fill="currentColor" />
    </svg>
  );
}
