import type { DemoMeta } from "@/registry";

export const meta: DemoMeta = {
  name: "ゴールド・テスティモニアル",
  category: "ラグジュアリー",
  description: "金の引用符を添えた、洗練された顧客の声。",
  align: "center",
  isNew: true,
  tags: ["luxury", "premium", "gold", "testimonial"],
  principle: "大きな金の引用符と十分な余白が、言葉そのものに重みと権威を与える。",
};

export default function GoldTestimonial() {
  const en =
    typeof document !== "undefined" &&
    document.documentElement.lang === "en";
  return (
    <figure className="relative w-full max-w-2xl overflow-hidden border border-amber-400/20 bg-[#0a0a0a] px-10 py-14 text-center text-stone-100">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(217,179,90,0.08),transparent_60%)]" />

      <span
        aria-hidden="true"
        className="block bg-gradient-to-r from-amber-200 via-yellow-400 to-amber-500 bg-clip-text font-display text-7xl leading-none text-transparent"
      >
        &ldquo;
      </span>

      <blockquote className="relative -mt-4">
        <p className="font-display text-2xl font-light leading-relaxed tracking-tight text-stone-100 sm:text-3xl">
          {en
            ? "The moment it touches you, you feel the weight of the real. This is not adornment — it is a chapter of my own story."
            : "身に纏った瞬間に分かる、本物の重み。これは装飾ではなく、私自身の物語の一部です。"}
        </p>
      </blockquote>

      <div className="mx-auto mt-9 h-px w-12 bg-gradient-to-r from-transparent via-amber-400/60 to-transparent" />

      <figcaption className="mt-6">
        <p className="font-display text-lg tracking-[0.1em] text-amber-200">
          Isabella Moreau
        </p>
        <p className="mt-1 text-[11px] uppercase tracking-[0.3em] text-stone-500">
          Art Collector · Paris
        </p>
      </figcaption>
    </figure>
  );
}
