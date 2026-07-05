import { MapPin, Moon, Phone } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import type { DemoMeta } from "@/registry";

export const meta: DemoMeta = {
  name: "旅館予約ヒーロー",
  category: "和風",
  description: "縦書きの宿名と横組みのサブコピー、和紙地に青海波を敷いた予約ヒーロー。",
  align: "full",
  isNew: true,
  tags: ["和風", "japanese", "wabi-sabi", "hero", "ryokan"],
  principle: "縦書きの宿名で格式を、余白(間)で静けさを演出し、朱のCTAだけを際立たせる。",
};

function Seigaiha() {
  return (
    <svg
      aria-hidden
      className="absolute inset-0 h-full w-full"
      width="100%"
      height="100%"
    >
      <defs>
        <pattern
          id="ryokan-seigaiha"
          x="0"
          y="0"
          width="56"
          height="28"
          patternUnits="userSpaceOnUse"
        >
          {[0, 28].map((cx) => (
            <g key={cx} transform={`translate(${cx - 28}, 0)`}>
              {[20, 14, 8].map((r, i) => (
                <circle
                  key={r}
                  cx="28"
                  cy="28"
                  r={r}
                  fill="none"
                  stroke="#1f3a5f"
                  strokeWidth={i === 0 ? 2 : 1.5}
                  strokeOpacity="0.5"
                />
              ))}
            </g>
          ))}
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill="url(#ryokan-seigaiha)" />
    </svg>
  );
}

export default function RyokanHero() {
  const en =
    typeof document !== "undefined" &&
    document.documentElement.lang === "en";
  return (
    <section className="relative w-full overflow-hidden bg-[#f5f1e8] px-6 py-20 text-stone-800 sm:py-28">
      <div className="pointer-events-none absolute inset-x-0 top-0 h-40 opacity-[0.18]">
        <Seigaiha />
      </div>

      <div className="relative mx-auto grid max-w-6xl items-center gap-12 lg:grid-cols-[auto_1fr]">
        {/* 縦書きの宿名 */}
        <div className="flex items-start gap-6">
          <div className="flex flex-col items-center gap-3">
            <span className="inline-block size-3 rounded-full border border-[#b7410e]" />
            <span className="h-24 w-px bg-stone-400" />
          </div>
          {en ? (
            <h1 className="font-mincho text-4xl font-medium leading-[1.3] tracking-[0.1em] text-stone-900 sm:text-5xl">
              The Moonlit Inn
              <span className="mt-2 block text-2xl text-stone-500">
                Okuyama Onsen
              </span>
            </h1>
          ) : (
            <h1
              className="font-mincho text-5xl font-medium leading-[1.4] tracking-[0.25em] text-stone-900 [writing-mode:vertical-rl] sm:text-6xl"
              style={{ textOrientation: "upright" }}
            >
              月白の宿
              <span className="text-3xl text-stone-500">　奥山温泉</span>
            </h1>
          )}
        </div>

        {/* 横組みサブ + CTA */}
        <div className="max-w-md">
          <Badge className="rounded-sm border border-[#b7410e]/30 bg-transparent px-3 py-1 font-mincho text-[#b7410e] hover:bg-transparent">
            {en ? "Established 1909" : "創業 明治四十二年"}
          </Badge>
          <p className="mt-6 font-mincho text-xl leading-relaxed text-stone-700">
            {en ? (
              <>
                A quiet inn of just twelve rooms, nestled in the mountains.
                <br />
                Free-flowing hot-spring water and kaiseki that mirrors the
                season.
              </>
            ) : (
              <>
                山あいに佇む、十二室だけの静かな宿。
                <br />
                源泉かけ流しの湯と、旬を映す会席を。
              </>
            )}
          </p>
          <p className="mt-4 text-sm leading-relaxed text-stone-500">
            {en
              ? "Spend a moment of stillness as the seasons turn. Every room faces the garden, and at night only the twinkling stars and the murmur of the river mark the passing time."
              : "季節のうつろいとともに、ひとときの静寂をお過ごしください。客室はすべて庭に面し、夜は星のまたたきと川のせせらぎだけが時を刻みます。"}
          </p>

          <div className="mt-8 flex flex-wrap items-center gap-4">
            <Button className="rounded-sm bg-[#b7410e] px-7 font-mincho text-base tracking-wider text-[#f5f1e8] shadow-none hover:bg-[#9c360b]">
              {en ? "Make a reservation" : "ご予約を承る"}
            </Button>
            <button className="inline-flex items-center gap-2 font-mincho text-sm text-stone-600 underline-offset-4 hover:text-stone-900 hover:underline">
              <Phone className="size-4" />
              {en ? "Check availability by phone" : "空室を電話で確認"}
            </button>
          </div>

          <div className="mt-10 flex flex-wrap gap-x-8 gap-y-3 text-xs text-stone-500">
            <span className="inline-flex items-center gap-1.5">
              <MapPin className="size-3.5 text-[#6b7a3a]" />
              {en ? "Shinshu · Okuyama village" : "信州・奥山郷"}
            </span>
            <span className="inline-flex items-center gap-1.5">
              <Moon className="size-3.5 text-[#6b7a3a]" />
              {en ? "Every room with an open-air bath" : "全室 露天風呂付"}
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
