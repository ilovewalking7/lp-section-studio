import type { DemoMeta } from "@/registry";

export const meta: DemoMeta = {
  name: "アニメーションロゴクラウド",
  category: "マーケティング",
  description: "導入企業のインラインSVGロゴが、順にフェードイン＆ホバーで色付く信頼バンド。",
  align: "full",
  isNew: true,
  tags: ["social-proof", "testimonial", "animation"],
};

const LOGOS = [
  { name: "Nova", svg: <svg viewBox="0 0 24 24" className="size-6"><path fill="currentColor" d="M12 2L2 19h20L12 2zm0 4.5L17.5 17h-11L12 6.5z" /></svg> },
  { name: "Globe", svg: <svg viewBox="0 0 24 24" className="size-6"><circle cx="12" cy="12" r="9" fill="none" stroke="currentColor" strokeWidth="2" /><path d="M3 12h18M12 3c3 3 3 15 0 18M12 3c-3 3-3 15 0 18" fill="none" stroke="currentColor" strokeWidth="1.5" /></svg> },
  { name: "Bolt", svg: <svg viewBox="0 0 24 24" className="size-6"><path fill="currentColor" d="M13 2L4 14h6l-1 8 9-12h-6l1-8z" /></svg> },
  { name: "Orbit", svg: <svg viewBox="0 0 24 24" className="size-6"><circle cx="12" cy="12" r="3" fill="currentColor" /><ellipse cx="12" cy="12" rx="10" ry="5" fill="none" stroke="currentColor" strokeWidth="1.5" /></svg> },
  { name: "Quartz", svg: <svg viewBox="0 0 24 24" className="size-6"><rect x="5" y="5" width="14" height="14" rx="2" fill="none" stroke="currentColor" strokeWidth="2" /><rect x="9" y="9" width="6" height="6" fill="currentColor" /></svg> },
  { name: "Hive", svg: <svg viewBox="0 0 24 24" className="size-6"><path fill="currentColor" d="M7 3h10l5 9-5 9H7l-5-9 5-9z" opacity=".25" /><path fill="none" stroke="currentColor" strokeWidth="2" d="M7 3h10l5 9-5 9H7l-5-9 5-9z" /></svg> },
];

export default function LogoCloudAnimated() {
  const en =
    typeof document !== "undefined" &&
    document.documentElement.lang === "en";
  return (
    <section className="w-full px-6 py-14">
      <style>{`
        @keyframes social2LogoIn { from{ opacity:0; transform: translateY(8px) } to{ opacity:1; transform:translateY(0) } }
        .logo-item { animation: social2LogoIn .5s ease both }
        @media (prefers-reduced-motion: reduce){ .logo-item{ animation:none } }
      `}</style>
      <div className="mx-auto max-w-5xl text-center">
        <p className="text-sm font-medium uppercase tracking-wider text-muted-foreground">
          {en ? "Trusted by forward-thinking teams worldwide" : "世界中の先進的なチームに信頼されています"}
        </p>
        <div className="mt-8 grid grid-cols-2 items-center gap-x-6 gap-y-8 sm:grid-cols-3 lg:grid-cols-6">
          {LOGOS.map((l, i) => (
            <div
              key={l.name}
              className="logo-item flex items-center justify-center gap-2 text-muted-foreground/60 transition-colors duration-300 hover:text-foreground"
              style={{ animationDelay: `${i * 90}ms` }}
            >
              {l.svg}
              <span className="text-base font-semibold tracking-tight">{l.name}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
