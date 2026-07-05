import { Quote, Star } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import type { DemoMeta } from "@/registry";

export const meta: DemoMeta = {
  name: "お客様の声カード",
  category: "マーケティング",
  description: "イニシャルアバターと所属を備えた上質な引用カード。",
  align: "center",
};

export default function TestimonialCard() {
  const en =
    typeof document !== "undefined" &&
    document.documentElement.lang === "en";
  return (
    <Card className="w-full max-w-md overflow-hidden">
      <CardContent className="p-7">
        <div className="flex items-center justify-between">
          <Quote className="size-7 text-primary/30" aria-hidden />
          <div className="flex items-center gap-0.5 text-amber-500">
            {Array.from({ length: 5 }).map((_, i) => (
              <Star key={i} className="size-4 fill-current" />
            ))}
          </div>
        </div>

        <blockquote className="mt-5 text-pretty text-lg font-medium leading-relaxed tracking-tight">
          {en
            ? "“Within a week of adopting it, our weekly standups were cut in half. When everything lives in one place, the meetings just stop being necessary.”"
            : "「導入から一週間で、毎週の定例が半分に減りました。情報が一か所に集まると、会議そのものが要らなくなるんですね。」"}
        </blockquote>

        <div className="mt-7 flex items-center gap-3 border-t pt-5">
          <span className="grid size-11 shrink-0 place-items-center rounded-full bg-gradient-to-br from-sky-500/20 to-violet-500/20 text-sm font-semibold text-foreground ring-1 ring-border">
            HN
          </span>
          <div className="min-w-0">
            <p className="truncate text-sm font-semibold">
              {en ? "Haruka Nakamura" : "中村 はるか"}
            </p>
            <p className="truncate text-sm text-muted-foreground">
              {en ? "Head of Product · Lumen Inc." : "プロダクト責任者 · Lumen Inc."}
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
