import type { DemoMeta } from "@/registry";

export const meta: DemoMeta = {
  name: "北欧テスティモニアル",
  category: "北欧",
  description: "やさしい引用カード。",
  align: "center",
  isNew: true,
  tags: ["nordic", "scandinavian", "hygge"],
  principle: "大きな引用符と余白が言葉を主役にし、信頼を穏やかに醸成する。",
};

export default function NordicTestimonial() {
  const en =
    typeof document !== "undefined" &&
    document.documentElement.lang === "en";
  return (
    <figure className="w-full max-w-md rounded-[1.75rem] bg-[#faf8f3] p-9 font-sans text-[#3a3a38] shadow-[0_30px_70px_-48px_rgba(58,58,56,0.4)]">
      <svg viewBox="0 0 48 36" className="h-9 w-9 text-[#c08457]/40" fill="currentColor" aria-hidden>
        <path d="M0 36V20C0 9 7 1 19 0l2 6C13 8 9 12 9 18h8v18H0zm27 0V20C27 9 34 1 46 0l2 6c-8 2-12 6-12 12h8v18H27z" />
      </svg>

      <blockquote className="mt-5 text-lg font-light leading-relaxed text-[#3a3a38]/85">
        {en
          ? "“It isn’t flashy, but sitting in this chair each morning has become a small joy. It quietly fits into the background of daily life — just right.”"
          : "「派手さはないけれど、毎朝この椅子に座るのが小さな楽しみになりました。暮らしの背景にそっと馴染む、ちょうどいい存在です。」"}
      </blockquote>

      <div className="mt-7 flex items-center gap-2 text-[#c08457]">
        {Array.from({ length: 5 }).map((_, i) => (
          <svg key={i} viewBox="0 0 24 24" className="h-4 w-4" fill="currentColor" aria-hidden>
            <path d="M12 2l2.9 6 6.6.6-5 4.3 1.5 6.5L12 17l-6 3.4L7.5 13l-5-4.3 6.6-.6z" />
          </svg>
        ))}
      </div>

      <figcaption className="mt-6 flex items-center gap-3 border-t border-[#3a3a38]/10 pt-6">
        <span className="flex h-11 w-11 items-center justify-center rounded-full bg-[#8a9a7b]/20 text-sm font-medium text-[#8a9a7b]">
          M
        </span>
        <div className="text-sm">
          <p className="font-medium">{en ? "Matti Lahtinen" : "マッティ・ラハティネン"}</p>
          <p className="text-xs text-[#3a3a38]/50">
            {en ? "Helsinki · Architect" : "ヘルシンキ · 建築家"}
          </p>
        </div>
      </figcaption>
    </figure>
  );
}
