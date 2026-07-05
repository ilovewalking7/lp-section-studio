import type { DemoMeta } from "@/registry";

export const meta: DemoMeta = {
  name: "筆文字お客様の声",
  category: "和風",
  description: "筆文字見出し風のお客様の声。縦線の引用と朱の落款で締める。",
  align: "center",
  isNew: true,
  tags: ["和風", "japanese", "testimonial", "fude"],
  principle: "筆文字風の大見出しで感情を強調し、縦罫の引用と落款で一通の手紙のような信頼を生む。",
};

function MiniSeal({ label }: { label: string }) {
  return (
    <span className="inline-flex size-11 items-center justify-center rounded-sm border-2 border-[#b7410e] [writing-mode:vertical-rl]">
      <span className="font-mincho text-[10px] font-bold leading-tight tracking-tighter text-[#b7410e]">
        {label}
      </span>
    </span>
  );
}

export default function FudeTestimonial() {
  const en =
    typeof document !== "undefined" &&
    document.documentElement.lang === "en";
  return (
    <figure className="w-full max-w-md bg-[#f5f1e8] p-10 text-stone-800">
      <span className="font-mincho text-5xl leading-none text-[#b7410e]/30">
        “
      </span>

      <blockquote className="-mt-4 border-l-2 border-stone-400 pl-6">
        <p className="font-mincho text-2xl font-medium leading-relaxed tracking-wide text-stone-900">
          {en ? (
            <>
              An unforgettable
              <br />
              stillness.
            </>
          ) : (
            <>
              忘れられぬ、
              <br />
              静けさでした。
            </>
          )}
        </p>
        <p className="mt-5 font-mincho text-sm leading-loose text-stone-600">
          {en
            ? "Morning light through the shoji, the sound of wind crossing the garden. I learned, for the first time, the luxury of doing nothing. Each dish held a season within it — an inn I wholeheartedly long to visit again."
            : "障子越しの朝の光、庭を渡る風の音。何もしない贅沢を、はじめて知りました。料理の一品ごとに季節が宿り、また訪れたいと心から思える宿です。"}
        </p>
      </blockquote>

      <figcaption className="mt-7 flex items-center gap-4">
        <MiniSeal label={en ? "REVIEW" : "客評"} />
        <div>
          <p className="font-mincho text-base text-stone-900">
            {en ? "Ms. Miwa Takase" : "高瀬 美和 様"}
          </p>
          <p className="text-xs text-stone-500">
            {en ? "Tokyo · Multi-night stay" : "東京都 ・ 連泊にてご利用"}
          </p>
        </div>
      </figcaption>
    </figure>
  );
}
