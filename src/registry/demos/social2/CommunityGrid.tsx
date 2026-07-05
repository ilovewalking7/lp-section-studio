import type { DemoMeta } from "@/registry";

export const meta: DemoMeta = {
  name: "コミュニティグリッド",
  category: "マーケティング",
  description: "メンバーのアバタータイルが市松状にふわっと現れる、活気あるコミュニティの壁。",
  align: "full",
  isNew: true,
  tags: ["social-proof", "testimonial", "animation"],
};

const MEMBERS = [
  { i: "美", c: "from-rose-500 to-pink-500" },
  { i: "LC", c: "from-sky-500 to-cyan-500" },
  { i: "健", c: "from-violet-500 to-indigo-500" },
  { i: "AN", c: "from-amber-500 to-orange-500" },
  { i: "葵", c: "from-emerald-500 to-teal-500" },
  { i: "NK", c: "from-fuchsia-500 to-purple-500" },
  { i: "蓮", c: "from-orange-500 to-red-500" },
  { i: "MC", c: "from-teal-500 to-green-500" },
  { i: "樹", c: "from-indigo-500 to-blue-500" },
  { i: "JD", c: "from-lime-500 to-emerald-500" },
  { i: "凛", c: "from-pink-500 to-rose-500" },
  { i: "RS", c: "from-cyan-500 to-sky-500" },
  { i: "翔", c: "from-purple-500 to-fuchsia-500" },
  { i: "AB", c: "from-red-500 to-orange-500" },
  { i: "結", c: "from-blue-500 to-indigo-500" },
  { i: "TK", c: "from-green-500 to-teal-500" },
];

export default function CommunityGrid() {
  const en =
    typeof document !== "undefined" &&
    document.documentElement.lang === "en";
  return (
    <section className="w-full px-6 py-12">
      <style>{`
        @keyframes social2Tile { from{ opacity:0; transform: scale(.6) } to{ opacity:1; transform:scale(1) } }
        .comm-tile { animation: social2Tile .45s cubic-bezier(.2,.8,.2,1) both }
        @media (prefers-reduced-motion: reduce){ .comm-tile{ animation:none } }
      `}</style>
      <div className="mx-auto max-w-4xl text-center">
        <h2 className="text-3xl font-semibold tracking-tight">{en ? "A thriving community" : "活気あるコミュニティ"}</h2>
        <p className="mt-2 text-muted-foreground">{en ? "Members around the world help each other every day." : "世界中のメンバーが日々助け合っています。"}</p>
        <div className="mt-8 grid grid-cols-4 gap-3 sm:grid-cols-8">
          {MEMBERS.map((m, idx) => (
            <div
              key={idx}
              className="comm-tile group relative aspect-square"
              style={{ animationDelay: `${(((idx % 8) + Math.floor(idx / 8)) % 8) * 80}ms` }}
            >
              <div className={`flex size-full items-center justify-center rounded-2xl bg-gradient-to-br ${m.c} text-sm font-bold text-white shadow-sm transition-transform duration-200 group-hover:scale-105`}>
                {m.i}
              </div>
            </div>
          ))}
        </div>
        <p className="mt-6 text-sm font-medium text-muted-foreground">{en ? "9,000+ more members inside" : "他 9,000+ 名が参加中"}</p>
      </div>
    </section>
  );
}
