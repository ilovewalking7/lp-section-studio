// このファイルは scripts/build-vanilla-head.mjs により自動生成されます。直接編集しないでください。
// 元データ: tailwind.config.js（darkMode / theme.extend）と src/index.css（:root / .dark）

/**
 * **動的版**バニラHTML書き出しの <head> に差し込むデザイントークン定義。
 * 素の Tailwind に無い bg-card / text-muted-foreground などを Play CDN でも
 * 解決させるための設定（Play CDN 公式の方法）。
 * Tailwind CDN の <script> より**後ろ**に置くこと。
 * 静的版は実CSSを埋め込むので、こちらは使わない。
 */
export const HEAD_TOKEN_INJECTION = `    <!-- このコンポーネント集のデザイントークン。
         bg-card / text-muted-foreground などは素の Tailwind には無いので、
         CDN に設定を渡して定義する（Play CDN 公式の方法）。 -->
    <script>
      tailwind.config = {
        "darkMode": "class",
        "theme": {
          "extend": {
            "fontFamily": {
              "mincho": [
                "\\"Shippori Mincho\\"",
                "\\"Noto Serif JP\\"",
                "serif"
              ],
              "display": [
                "\\"Playfair Display\\"",
                "ui-serif",
                "Georgia",
                "serif"
              ],
              "rounded": [
                "\\"M PLUS Rounded 1c\\"",
                "ui-rounded",
                "\\"Hiragino Maru Gothic ProN\\"",
                "sans-serif"
              ]
            },
            "colors": {
              "border": "hsl(var(--border))",
              "input": "hsl(var(--input))",
              "ring": "hsl(var(--ring))",
              "background": "hsl(var(--background))",
              "foreground": "hsl(var(--foreground))",
              "primary": {
                "DEFAULT": "hsl(var(--primary))",
                "foreground": "hsl(var(--primary-foreground))"
              },
              "secondary": {
                "DEFAULT": "hsl(var(--secondary))",
                "foreground": "hsl(var(--secondary-foreground))"
              },
              "destructive": {
                "DEFAULT": "hsl(var(--destructive))",
                "foreground": "hsl(var(--destructive-foreground))"
              },
              "muted": {
                "DEFAULT": "hsl(var(--muted))",
                "foreground": "hsl(var(--muted-foreground))"
              },
              "accent": {
                "DEFAULT": "hsl(var(--accent))",
                "foreground": "hsl(var(--accent-foreground))"
              },
              "card": {
                "DEFAULT": "hsl(var(--card))",
                "foreground": "hsl(var(--card-foreground))"
              }
            },
            "borderRadius": {
              "lg": "var(--radius)",
              "md": "calc(var(--radius) - 2px)",
              "sm": "calc(var(--radius) - 4px)"
            }
          }
        }
      };
    </script>
    <style>
      :root {
        --background: 0 0% 100%;
        --foreground: 240 10% 3.9%;
        --card: 0 0% 100%;
        --card-foreground: 240 10% 3.9%;
        --primary: 243 75% 59%;
        --primary-foreground: 0 0% 98%;
        --secondary: 240 4.8% 95.9%;
        --secondary-foreground: 240 5.9% 10%;
        --muted: 240 4.8% 95.9%;
        --muted-foreground: 240 3.8% 46.1%;
        --accent: 240 4.8% 95.9%;
        --accent-foreground: 240 5.9% 10%;
        --destructive: 0 84.2% 48.9%;
        --destructive-foreground: 0 0% 98%;
        --border: 240 5.9% 90%;
        --input: 240 5.9% 60.3%;
        --ring: 243 75% 59%;
        --radius: 0.6rem;
      }
      .dark {
        --background: 240 10% 3.9%;
        --foreground: 0 0% 98%;
        --card: 240 8% 6%;
        --card-foreground: 0 0% 98%;
        --primary: 243 75% 66.5%;
        --primary-foreground: 240 10% 3.9%;
        --secondary: 240 3.7% 15.9%;
        --secondary-foreground: 0 0% 98%;
        --muted: 240 3.7% 13%;
        --muted-foreground: 240 5% 64.9%;
        --accent: 240 3.7% 15.9%;
        --accent-foreground: 0 0% 98%;
        --destructive: 0 62.8% 56.3%;
        --destructive-foreground: 0 60% 7.3%;
        --border: 240 3.7% 17%;
        --input: 240 3.7% 38.4%;
        --ring: 243 75% 65%;
      }
      * { border-color: hsl(var(--border)); }
      body { background-color: hsl(var(--background)); color: hsl(var(--foreground)); }
    </style>
`;
