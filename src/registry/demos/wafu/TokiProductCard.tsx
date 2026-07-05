import * as React from "react";
import { ShoppingBag, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import type { DemoMeta } from "@/registry";

export const meta: DemoMeta = {
  name: "陶器商品カード",
  category: "和風",
  description: "陶器・工芸品の商品カード。器をSVGで描き、価格とカート追加を備える。",
  align: "center",
  isNew: true,
  tags: ["和風", "japanese", "commerce", "toki", "pottery"],
  principle: "器の佇まいをSVGで丁寧に見せ、産地と作家名で工芸品としての価値を裏づける。",
};

function Chawan() {
  return (
    <svg viewBox="0 0 160 120" className="h-32 w-44" aria-hidden>
      <defs>
        <linearGradient id="toki-glaze" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#3d5a73" />
          <stop offset="55%" stopColor="#1f3a5f" />
          <stop offset="100%" stopColor="#142840" />
        </linearGradient>
      </defs>
      {/* 影 */}
      <ellipse cx="80" cy="108" rx="46" ry="7" fill="#000" opacity="0.12" />
      {/* 高台 */}
      <path d="M58 100 L102 100 L96 108 L64 108 Z" fill="#142840" />
      {/* 椀本体 */}
      <path
        d="M30 52
           a 50 50 0 0 0 100 0
           Z"
        fill="url(#toki-glaze)"
      />
      {/* 口縁 */}
      <ellipse cx="80" cy="52" rx="50" ry="13" fill="#3d5a73" />
      <ellipse cx="80" cy="52" rx="42" ry="9.5" fill="#0e1f33" />
      {/* 釉だれ */}
      <path
        d="M55 60 q 4 22 0 30"
        stroke="#9fc0d6"
        strokeWidth="3"
        fill="none"
        opacity="0.55"
        strokeLinecap="round"
      />
      <path
        d="M98 62 q -3 18 0 24"
        stroke="#9fc0d6"
        strokeWidth="2.5"
        fill="none"
        opacity="0.4"
        strokeLinecap="round"
      />
    </svg>
  );
}

export default function TokiProductCard() {
  const [added, setAdded] = React.useState(false);
  const en =
    typeof document !== "undefined" &&
    document.documentElement.lang === "en";

  return (
    <Card className="w-full max-w-xs overflow-hidden rounded-sm border-stone-300 bg-[#f5f1e8] text-stone-800 shadow-md">
      <div className="flex items-center justify-center bg-[#efe9da] py-7">
        <Chawan />
      </div>

      <CardContent className="pt-5">
        <p className="font-mincho text-[11px] tracking-[0.3em] text-[#6b7a3a]">
          {en ? "MINO WARE · HANDMADE" : "美濃焼 ・ 手づくり"}
        </p>
        <h3 className="mt-1.5 font-mincho text-xl font-medium tracking-wide text-stone-900">
          {en ? "Lapis-glaze matcha bowl" : "瑠璃釉 抹茶碗"}
        </h3>
        <p className="mt-2 text-xs leading-relaxed text-stone-500">
          {en
            ? "A deep indigo glaze where kiln-born scenery settles into each bowl. By artisan Ikko Nakamura."
            : "深い藍の釉に、窯変の景色が一碗ごとに宿ります。作家 中村 一光 作。"}
        </p>
      </CardContent>

      <CardFooter className="flex items-center justify-between">
        <span className="font-mincho text-xl text-stone-900">
          ￥8,800
          <span className="ml-1 text-[11px] text-stone-500">
            {en ? "tax incl." : "税込"}
          </span>
        </span>
        <Button
          onClick={() => setAdded(true)}
          className="rounded-sm bg-[#1f3a5f] px-4 font-mincho tracking-wider text-[#f5f1e8] shadow-none hover:bg-[#162a45]"
        >
          {added ? (
            <>
              <Check />
              {en ? "Added" : "追加済"}
            </>
          ) : (
            <>
              <ShoppingBag />
              {en ? "Add to cart" : "買い物籠へ"}
            </>
          )}
        </Button>
      </CardFooter>
    </Card>
  );
}
