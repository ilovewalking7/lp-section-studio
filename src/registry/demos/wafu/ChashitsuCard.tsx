import { Clock, Leaf, Users } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import type { DemoMeta } from "@/registry";

export const meta: DemoMeta = {
  name: "茶室体験カード",
  category: "和風",
  description: "茶道体験の案内カード。落ち着いた抹茶系の色合いと参加CTA。",
  align: "center",
  isNew: true,
  tags: ["和風", "japanese", "card", "chashitsu", "tea"],
  principle: "抹茶の緑と和紙地で静寂を表現。所要・人数・季節を簡潔に示し参加の不安を減らす。",
};

function Asanoha() {
  return (
    <svg aria-hidden className="absolute inset-0 h-full w-full">
      <defs>
        <pattern
          id="cha-asanoha"
          width="40"
          height="46"
          patternUnits="userSpaceOnUse"
        >
          <g stroke="#6b7a3a" strokeWidth="1" fill="none" strokeOpacity="0.4">
            <path d="M20 0 L20 23 M0 11.5 L20 23 L40 11.5 M0 34.5 L20 23 L40 34.5 M20 23 L20 46" />
          </g>
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill="url(#cha-asanoha)" />
    </svg>
  );
}

export default function ChashitsuCard() {
  const en =
    typeof document !== "undefined" &&
    document.documentElement.lang === "en";
  return (
    <Card className="w-full max-w-sm overflow-hidden rounded-sm border-[#6b7a3a]/40 bg-[#f5f1e8] text-stone-800 shadow-md">
      <div className="relative h-28 bg-[#6b7a3a]/15">
        <div className="absolute inset-0 opacity-50">
          <Asanoha />
        </div>
        <div className="relative flex h-full items-center justify-center">
          <span className="flex size-14 items-center justify-center rounded-full border border-[#6b7a3a]/50 bg-[#f5f1e8]">
            <Leaf className="size-6 text-[#6b7a3a]" />
          </span>
        </div>
      </div>

      <CardHeader className="pb-3">
        <p className="font-mincho text-xs tracking-[0.3em] text-[#6b7a3a]">
          {en ? "TEA CEREMONY" : "茶道体験"}
        </p>
        <h3 className="mt-1 font-mincho text-2xl font-medium tracking-wide text-stone-900">
          {en ? "Whisk a bowl of tea" : "一服の茶を点てる"}
        </h3>
      </CardHeader>

      <CardContent className="space-y-4">
        <p className="font-mincho text-sm leading-relaxed text-stone-600">
          {en
            ? "Step through the low entrance and savor a single bowl of matcha in stillness. Follow the host's quiet gestures — a serene moment, even for first-timers."
            : "躙口をくぐり、静けさのなかで一碗の抹茶を。亭主の所作にならい、はじめての方も心安らぐひとときを。"}
        </p>
        <div className="flex flex-wrap gap-x-5 gap-y-2 text-xs text-stone-500">
          <span className="inline-flex items-center gap-1.5">
            <Clock className="size-3.5 text-[#6b7a3a]" />
            {en ? "About 45 min" : "約45分"}
          </span>
          <span className="inline-flex items-center gap-1.5">
            <Users className="size-3.5 text-[#6b7a3a]" />
            {en ? "Four seatings a day" : "一日 四席限定"}
          </span>
        </div>
      </CardContent>

      <CardFooter className="flex items-center justify-between">
        <span className="font-mincho text-lg text-stone-900">
          ￥3,300
          <span className="ml-1 text-[11px] text-stone-500">
            {en ? "tax incl." : "税込"}
          </span>
        </span>
        <Button className="rounded-sm bg-[#6b7a3a] px-5 font-mincho tracking-wider text-[#f5f1e8] shadow-none hover:bg-[#5a672f]">
          {en ? "Reserve a seat" : "席を予約する"}
        </Button>
      </CardFooter>
    </Card>
  );
}
