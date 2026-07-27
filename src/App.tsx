import { Suspense, lazy, useEffect, useState } from "react";
import { LangToggle } from "@/components/LangToggle";
import Landing from "@/pages/Landing";
import Pricing from "@/pages/Pricing";
import { getStats } from "@/lib/stats";
import { usePlan } from "@/lib/plan";
import { useLang } from "@/lib/i18n";

// スタジオ（レジストリ全体・プレビュー・バニラ書き出し等の重い依存）は
// 初期表示に不要なため、別チャンクに分けて遅延ロードする（Core Web Vitals 対策）。
const Studio = lazy(() => import("@/Studio"));
// ミセテLP（ウィザードUI）も同様に重いため遅延ロードする。
const LpBuilder = lazy(() => import("@/lp/LpBuilder"));

export type Route = "home" | "studio" | "pricing" | "lp";

export function routeFromPath(pathname: string): Route {
  const p = pathname.replace(/\/+$/, "") || "/";
  if (p === "/studio") return "studio";
  if (p === "/pricing") return "pricing";
  if (p === "/lp") return "lp";
  return "home";
}

/** パス優先・ハッシュ後方互換でルートを解決（SSR セーフ）。 */
function currentRoute(): Route {
  if (typeof window === "undefined") return "home";
  const byPath = routeFromPath(window.location.pathname);
  if (byPath !== "home") return byPath;
  // 旧ハッシュリンク（#/pricing 等）からの後方互換
  const h = window.location.hash.replace(/^#\/?/, "");
  if (h === "studio") return "studio";
  if (h === "pricing") return "pricing";
  return "home";
}

function RouteFallback() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background">
      <div
        className="h-8 w-8 animate-spin rounded-full border-2 border-muted border-t-foreground motion-reduce:animate-none"
        role="status"
        aria-label="Loading"
      />
    </div>
  );
}

export default function App({ ssrRoute }: { ssrRoute?: Route } = {}) {
  const [route, setRoute] = useState<Route>(() => ssrRoute ?? currentRoute());
  const { plan, setPlan } = usePlan();
  const { lang, setLang } = useLang();

  useEffect(() => {
    const sync = () => setRoute(currentRoute());
    window.addEventListener("popstate", sync);
    window.addEventListener("hashchange", sync); // 後方互換
    return () => {
      window.removeEventListener("popstate", sync);
      window.removeEventListener("hashchange", sync);
    };
  }, []);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [route]);

  const go = (r: Route) => {
    const path = r === "home" ? "/" : `/${r}`;
    if (typeof window !== "undefined" && window.location.pathname !== path) {
      window.history.pushState({}, "", path);
    }
    setRoute(r);
  };

  const stats = getStats();

  const page =
    route === "studio" ? (
      <Suspense fallback={<RouteFallback />}>
        <Studio
          plan={plan}
          lang={lang}
          setLang={setLang}
          onHome={() => go("home")}
          onPricing={() => go("pricing")}
        />
      </Suspense>
    ) : route === "lp" ? (
      <Suspense fallback={<RouteFallback />}>
        {/* ミセテLPは自前の料金プラン（lp:plan）を持つため、Studio の /pricing へは繋がない */}
        <LpBuilder onHome={() => go("home")} />
      </Suspense>
    ) : route === "pricing" ? (
      <Pricing
        currentPlan={plan}
        lang={lang}
        onChoosePlan={setPlan}
        onOpenStudio={() => go("studio")}
      />
    ) : (
      <Landing
        stats={stats}
        lang={lang}
        onOpenStudio={() => go("studio")}
        onOpenPricing={() => go("pricing")}
      />
    );

  return (
    <>
      {page}
      {/* スタジオはヘッダー内に言語切替を持つ。ミセテLPは日本語固定のため非表示。料金は右上に固定表示。 */}
      {route !== "studio" && route !== "lp" && (
        <LangToggle
          lang={lang}
          setLang={setLang}
          className="fixed right-3 top-3 z-50 shadow-lg"
        />
      )}
    </>
  );
}
