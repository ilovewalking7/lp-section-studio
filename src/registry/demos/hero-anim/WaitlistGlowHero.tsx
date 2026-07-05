import { useState } from "react";
import { ArrowRight, Check, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import type { DemoMeta } from "@/registry";

export const meta: DemoMeta = {
  name: "ウェイトリスト発光ヒーロー",
  category: "ヒーロー・LP",
  description: "脈打つ発光とアバター列を備えた、メール登録のウェイトリストヒーロー。",
  align: "full",
  isNew: true,
  tags: ["hero", "animation", "waitlist", "glow"],
};

const avatars = [
  "from-rose-400 to-orange-400",
  "from-sky-400 to-indigo-400",
  "from-emerald-400 to-teal-400",
  "from-fuchsia-400 to-purple-400",
  "from-amber-400 to-yellow-400",
];

export default function WaitlistGlowHero() {
  const en =
    typeof document !== "undefined" &&
    document.documentElement.lang === "en";
  const [email, setEmail] = useState("");
  const [joined, setJoined] = useState(false);

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email.trim()) setJoined(true);
  };

  return (
    <section className="relative w-full overflow-hidden bg-[#05060c] py-32 text-white">
      <style>{`
        @keyframes wl-pulse { 0%,100%{opacity:.4;transform:translate(-50%,-50%) scale(0.9)} 50%{opacity:.9;transform:translate(-50%,-50%) scale(1.15)} }
        @media (prefers-reduced-motion: reduce){ .wl-glow{animation:none !important} }
      `}</style>

      <div
        className="wl-glow pointer-events-none absolute left-1/2 top-[38%] h-[46vh] w-[46vh] -translate-x-1/2 -translate-y-1/2 rounded-full blur-[110px]"
        style={{
          background:
            "radial-gradient(circle, rgba(124,58,237,0.6), rgba(56,189,248,0.25), transparent 72%)",
          animation: "wl-pulse 5s ease-in-out infinite",
        }}
      />
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.1]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.5) 1px, transparent 1px)",
          backgroundSize: "46px 46px",
          maskImage:
            "radial-gradient(ellipse 55% 45% at 50% 42%, #000 35%, transparent 100%)",
          WebkitMaskImage:
            "radial-gradient(ellipse 55% 45% at 50% 42%, #000 35%, transparent 100%)",
        }}
      />

      <div className="relative mx-auto max-w-2xl px-6 text-center">
        <span className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-4 py-1.5 text-xs font-medium tracking-wide text-white/70 backdrop-blur">
          <Sparkles className="size-3.5 text-violet-300" />
          {en ? "Limited preview open" : "限定プレビュー受付中"}
        </span>
        <h1 className="mt-7 bg-gradient-to-b from-white to-white/55 bg-clip-text text-4xl font-bold tracking-tight text-transparent sm:text-6xl">
          {en ? (
            <>
              Be the first
              <br />
              to get it
            </>
          ) : (
            <>
              いちばん最初に、
              <br />
              手に入れる
            </>
          )}
        </h1>
        <p className="mx-auto mt-5 max-w-md text-lg text-white/55">
          {en
            ? "Join the waitlist for priority access the moment we launch."
            : "ウェイトリストに登録して、ローンチの瞬間に優先アクセスを。"}
        </p>

        <form
          onSubmit={onSubmit}
          className="mx-auto mt-9 flex max-w-md flex-col gap-3 sm:flex-row"
        >
          <Input
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="you@example.com"
            aria-label={en ? "Email address" : "メールアドレス"}
            disabled={joined}
            className="h-11 border-white/15 bg-white/5 text-white placeholder:text-white/40 focus-visible:ring-violet-400"
          />
          <Button
            type="submit"
            size="lg"
            disabled={joined}
            className="group h-11 shrink-0 bg-white text-black hover:bg-white/90"
          >
            {joined ? (
              <>
                <Check className="size-4" />
                {en ? "You're in" : "登録完了"}
              </>
            ) : (
              <>
                {en ? "Join" : "参加する"}
                <ArrowRight className="size-4 transition-transform group-hover:translate-x-0.5" />
              </>
            )}
          </Button>
        </form>

        <div className="mt-8 flex items-center justify-center gap-3">
          <div className="flex -space-x-2">
            {avatars.map((g, i) => (
              <span
                key={i}
                className={`inline-block size-8 rounded-full border-2 border-[#05060c] bg-gradient-to-br ${g}`}
                aria-hidden="true"
              />
            ))}
          </div>
          <p className="text-sm text-white/55">
            {en ? (
              <>
                <span className="font-semibold text-white/85">2,400</span> on
                the waitlist
              </>
            ) : (
              <>
                <span className="font-semibold text-white/85">2,400人</span>
                が順番待ち
              </>
            )}
          </p>
        </div>
      </div>
    </section>
  );
}
