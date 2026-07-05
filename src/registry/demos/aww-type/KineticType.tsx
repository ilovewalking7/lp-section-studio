import type { DemoMeta } from "@/registry";

export const meta: DemoMeta = {
  name: "キネティックタイプ",
  category: "Awwwards",
  description: "文字ごとに上下へ波打ち、傾きながら踊る動的なキネティック見出し。",
  align: "full",
  isNew: true,
  tags: ["awwwards", "typography", "animation"],
};

const WORD = "KINETIC";

export default function KineticType() {
  return (
    <section className="aww-kt relative flex min-h-[55vh] w-full items-center justify-center overflow-hidden bg-[#0b0b0c] px-6 py-28 text-neutral-50">
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.07]"
        style={{
          backgroundImage:
            "repeating-linear-gradient(90deg,#fff 0 1px,transparent 1px 80px)",
        }}
      />
      <h2
        className="relative flex font-black uppercase leading-none tracking-[-0.02em]"
        style={{ fontSize: "clamp(3rem, 16vw, 14rem)" }}
      >
        {WORD.split("").map((ch, i) => (
          <span
            key={i}
            className="aww-kt-ch inline-block"
            style={{ animationDelay: `${i * 0.12}s` }}
          >
            {ch}
          </span>
        ))}
      </h2>
      <style>{`
        .aww-kt-ch {
          animation: aww-kt-wave 1.8s ease-in-out infinite;
          transform-origin: center bottom;
        }
        @keyframes aww-kt-wave {
          0%, 100% { transform: translateY(0) rotate(0deg); color: #fafafa; }
          50% { transform: translateY(-18%) rotate(-4deg); color: #a3a3ff; }
        }
        @media (prefers-reduced-motion: reduce) {
          .aww-kt-ch { animation: none; }
        }
      `}</style>
    </section>
  );
}
