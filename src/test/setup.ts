// jsdom に不足するブラウザAPIを補完（コンポーネントが描画/効果で参照しても落ちないように）
import { vi } from "vitest";

if (!window.matchMedia) {
  window.matchMedia = (query: string) =>
    ({
      matches: false,
      media: query,
      onchange: null,
      addListener: vi.fn(),
      removeListener: vi.fn(),
      addEventListener: vi.fn(),
      removeEventListener: vi.fn(),
      dispatchEvent: vi.fn(),
    }) as unknown as MediaQueryList;
}

class MockObserver {
  observe() {}
  unobserve() {}
  disconnect() {}
  takeRecords() {
    return [];
  }
}

// @ts-expect-error テスト用の簡易ポリフィル
globalThis.IntersectionObserver = MockObserver;
// @ts-expect-error テスト用の簡易ポリフィル
globalThis.ResizeObserver = MockObserver;

if (!Element.prototype.scrollIntoView) {
  Element.prototype.scrollIntoView = vi.fn();
}

// jsdom は canvas 2D を未実装で console.error を出すため、no-op スタブを返す
// （実ブラウザでは正しく描画される。ここはテスト環境専用の補完）
if (typeof HTMLCanvasElement !== "undefined") {
  HTMLCanvasElement.prototype.getContext = () => {
    const stub: Record<string, unknown> = {
      getImageData: () => ({ data: new Uint8ClampedArray(4) }),
      createImageData: () => ({ data: new Uint8ClampedArray(4) }),
      putImageData: () => {},
      measureText: () => ({ width: 0 }),
      createLinearGradient: () => ({ addColorStop: () => {} }),
      createRadialGradient: () => ({ addColorStop: () => {} }),
      createPattern: () => null,
    };
    return new Proxy(stub, {
      get: (target, prop) =>
        prop in target
          ? (target as Record<string | symbol, unknown>)[prop]
          : () => {},
    }) as unknown as CanvasRenderingContext2D;
  };
}
if (!HTMLElement.prototype.animate) {
  // @ts-expect-error テスト用の簡易ポリフィル
  HTMLElement.prototype.animate = () => ({ cancel() {}, finished: Promise.resolve() });
}
