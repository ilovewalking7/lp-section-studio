#!/usr/bin/env node
/**
 * LP Section Studio の MCP サーバ。
 *
 * Claude Code や Cursor から、検証済みの UI 部品を「生成せずに」取り出す。
 * 毎回作らせるのではなく、既にある物を返すだけなので、返ってくる結果は
 * 常に同じで、a11y 検査も横スクロール検査も通った状態のものが来る。
 *
 * 収録内容は data/components.json（ビルド時に同梱）。880 個すべてが入っていて、
 * うち 397 個は React も Babel も無しで動く静的 HTML として取り出せる。
 *
 * MIT。https://github.com/ilovewalking7/lp-section-studio
 */
import { readFileSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import { z } from "zod";

const here = dirname(fileURLToPath(import.meta.url));
const data = JSON.parse(
  readFileSync(resolve(here, "../data/components.json"), "utf-8")
);
const items = data.items;
const byId = new Map(items.map((i) => [i.id, i]));

/**
 * 以前は無料版で買い切り版への案内を出していたが、880 個すべてを MIT で公開した
 * ので廃止した。空文字のまま残してあるのは、各ツールの応答末尾に付けている
 * `${UPSELL}` を消し漏らしても壊れないようにするため。
 */
const UPSELL = "";

const server = new McpServer(
  {
    name: "lp-section-studio",
    version: "0.1.0",
    title: "LP Section Studio",
  },
  {
    instructions:
      `LP Section Studio — ランディングページ用の UI コンポーネント ${data.included} 個を、` +
      `生成せずに取り出すためのサーバです。同じ id を指定すれば常に同じ物が返ります。\n\n` +
      `うち ${data.standaloneIncluded} 個は React も Babel も不要で、get_component_html が` +
      `返す静的 HTML をそのまま貼れば動きます（PHP / Rails / Hugo / WordPress でも可）。\n\n` +
      `収録している部品はすべて axe-core・コントラスト・キーボード操作・横スクロール` +
      `（幅375px）の検査を CI で毎回通しています。\n\n` +
      `ライセンス: MIT（商用利用・改変・再配布可）\n` +
      `ソース: https://github.com/ilovewalking7/lp-section-studio\n` +
      `デモ: https://lp-section-studio.pages.dev\n` +
      `作者: Yoggy (https://x.com/yoggydev)`,
  }
);

server.registerTool(
  "search_components",
  {
    title: "UI部品を探す",
    description:
      "収録済みの UI コンポーネントを検索する。生成はせず、既にある物の一覧を返す。" +
      "返る部品はすべて a11y 検査（axe）・コントラスト検査・キーボード操作検査・" +
      "横スクロール検査（幅375px）を通っている。" +
      "React を使わない現場向けには standalone_only を true にすると、" +
      "静的 HTML を貼るだけで動くものだけに絞れる。",
    inputSchema: {
      query: z
        .string()
        .optional()
        .describe("名前・説明・タグに対する部分一致（日本語・英語どちらでも）"),
      category: z.string().optional().describe("カテゴリ名での絞り込み"),
      standalone_only: z
        .boolean()
        .optional()
        .describe("true なら React 不要（静的HTMLで完成する）ものだけ返す"),
      limit: z.number().int().min(1).max(50).optional().describe("最大件数（既定20）"),
    },
  },
  async ({ query, category, standalone_only, limit }) => {
    const q = query?.toLowerCase().trim();
    const hits = items.filter((i) => {
      if (standalone_only && !i.standalone) return false;
      if (category && i.category !== category) return false;
      if (!q) return true;
      const hay = [i.id, i.name, i.description, ...(i.tags ?? [])]
        .join(" ")
        .toLowerCase();
      return hay.includes(q);
    });
    const shown = hits.slice(0, limit ?? 20);
    if (shown.length === 0) {
      return {
        content: [
          {
            type: "text",
            text:
              `一致する部品がありませんでした。` +
              `list_categories でカテゴリ一覧を見るか、query を短くしてみてください。${UPSELL}`,
          },
        ],
      };
    }
    const lines = shown.map(
      (i) =>
        `- ${i.id}\n  ${i.name}（${i.category}）${i.standalone ? " [React不要]" : ""}\n  ${i.description}`
    );
    return {
      content: [
        {
          type: "text",
          text:
            `${hits.length} 件中 ${shown.length} 件を表示:\n\n${lines.join("\n")}\n\n` +
            `ソースは get_component、React 抜きの HTML は get_component_html で取得できます。${UPSELL}`,
        },
      ],
    };
  }
);

server.registerTool(
  "get_component",
  {
    title: "部品のソースを取得",
    description:
      "コンポーネントの React / TypeScript ソースを返す。依存は react・" +
      "lucide-react・cn(clsx+tailwind-merge) と同梱の UI プリミティブのみで、" +
      "外部画像も使っていないため、ファイルを1つ置けば動く。",
    inputSchema: {
      id: z.string().describe("search_components が返した id"),
    },
  },
  async ({ id }) => {
    const item = byId.get(id);
    if (!item) {
      return {
        content: [
          {
            type: "text",
            text: `id「${id}」は見つかりません。search_components で探してください。${UPSELL}`,
          },
        ],
        isError: true,
      };
    }
    return {
      content: [
        {
          type: "text",
          text: `# ${item.name}（${item.category}）\n\n${item.description}\n\n\`\`\`tsx\n${item.source}\n\`\`\``,
        },
      ],
    };
  }
);

server.registerTool(
  "get_component_html",
  {
    title: "React抜きの静的HTMLを取得",
    description:
      "React を使わずにそのまま貼れる HTML を返す。出力に react も babel も含まれず、" +
      "Tailwind を読み込むだけで表示される。PHP・Rails・Hugo・WordPress など、" +
      "React を持ち込めない現場向け。" +
      "なお状態や操作を持つ部品（standalone が false のもの）は、" +
      "静的版では見た目だけになり操作は動かない。",
    inputSchema: {
      id: z.string().describe("search_components が返した id"),
    },
  },
  async ({ id }) => {
    const item = byId.get(id);
    if (!item) {
      return {
        content: [
          {
            type: "text",
            text: `id「${id}」は見つかりません。search_components で探してください。${UPSELL}`,
          },
        ],
        isError: true,
      };
    }
    if (!item.html) {
      return {
        content: [
          { type: "text", text: `「${id}」の静的 HTML は同梱されていません。` },
        ],
        isError: true,
      };
    }
    const caveat = item.standalone
      ? "この部品は状態を持たないので、この HTML だけで完成します。"
      : "この部品は状態や操作を持ちます。静的版は見た目のみで、操作は動きません。";
    return {
      content: [
        {
          type: "text",
          text: `# ${item.name}（${item.category}）\n\n${caveat}\n\n\`\`\`html\n${item.html}\n\`\`\``,
        },
      ],
    };
  }
);

server.registerTool(
  "list_categories",
  {
    title: "カテゴリ一覧",
    description: "収録されているカテゴリと、それぞれの件数を返す。",
    inputSchema: {},
  },
  async () => {
    const counts = new Map();
    for (const i of items) {
      const c = counts.get(i.category) ?? { total: 0, standalone: 0 };
      c.total++;
      if (i.standalone) c.standalone++;
      counts.set(i.category, c);
    }
    const lines = [...counts.entries()]
      .sort((a, b) => b[1].total - a[1].total)
      .map(([name, c]) => `- ${name}: ${c.total} 件（うち React不要 ${c.standalone}）`);
    return {
      content: [
        {
          type: "text",
          text: `収録 ${items.length} 件 / ${counts.size} カテゴリ\n\n${lines.join("\n")}${UPSELL}`,
        },
      ],
    };
  }
);

await server.connect(new StdioServerTransport());
