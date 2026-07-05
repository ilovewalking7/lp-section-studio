import type { DemoMeta } from "@/registry";

export const meta: DemoMeta = {
  name: "縦書き紹介",
  category: "和風",
  description: "縦書きの紹介セクション。円相(enso)のSVGを背に、宿の心を綴る。",
  align: "full",
  isNew: true,
  tags: ["和風", "japanese", "vertical", "enso"],
  principle: "縦書きは時間をかけて読ませ余韻を生む。円相は一筆の不完全さで侘び寂びを象徴する。",
};

function Enso() {
  return (
    <svg viewBox="0 0 200 200" className="h-full w-full" aria-hidden>
      <path
        d="M150 45
           a 70 70 0 1 0 18 60"
        fill="none"
        stroke="#2b2b2b"
        strokeWidth="11"
        strokeLinecap="round"
        opacity="0.9"
      />
      <path
        d="M150 45
           a 70 70 0 1 0 18 60"
        fill="none"
        stroke="#2b2b2b"
        strokeWidth="4"
        strokeLinecap="round"
        opacity="0.25"
        transform="translate(3 3)"
      />
    </svg>
  );
}

export default function VerticalSection() {
  const en =
    typeof document !== "undefined" &&
    document.documentElement.lang === "en";
  return (
    <section className="w-full bg-[#efe9da] px-6 py-24 text-stone-800">
      <div className="relative mx-auto flex max-w-4xl justify-center">
        {/* 円相 背景 */}
        <div className="pointer-events-none absolute -top-6 right-8 h-64 w-64 opacity-30 sm:right-24">
          <Enso />
        </div>

        {en ? (
          <div className="relative flex max-w-xl flex-col gap-8 text-center">
            <h2 className="font-mincho text-3xl font-medium leading-[1.5] tracking-[0.1em] text-stone-900">
              Hospitality of
              <br />
              a once-in-a-lifetime meeting
            </h2>

            <p className="font-mincho text-base leading-[1.9] tracking-wide text-stone-700">
              We cherish each encounter as if it were the only one, and make it
              our calling to stay close to the hearts of those who visit. A dish
              that mirrors the bounty of the mountains, a bath surface swaying in
              the moonlight, a garden wrapped in morning mist. We hope you will
              find a quiet beauty within the gentle passing of unremarkable
              hours.
            </p>

            <p className="font-mincho text-sm tracking-[0.2em] text-[#b7410e]">
              Proprietress · Yoshino Okuyama
            </p>
          </div>
        ) : (
          <div className="relative flex justify-center gap-12 [writing-mode:vertical-rl]">
            <h2 className="font-mincho text-3xl font-medium leading-[1.9] tracking-[0.3em] text-stone-900">
              一期一会の
              <br />
              おもてなし
            </h2>

            <p className="max-h-[26rem] font-mincho text-base leading-[2.2] tracking-[0.15em] text-stone-700">
              一度きりの出会いを大切に、訪れる方の心に寄り添うことを身上としております。山の恵みを映した一皿、月明かりに揺れる湯面、朝靄に包まれる庭。何気ない時の流れのなかに、ささやかな美しさを見いだしていただければ幸いです。
            </p>

            <p className="self-end font-mincho text-sm tracking-[0.2em] text-[#b7410e]">
              女将 ・ 奥山 佳乃
            </p>
          </div>
        )}
      </div>
    </section>
  );
}
