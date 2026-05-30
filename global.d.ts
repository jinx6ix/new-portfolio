/// <reference types="next" />
/// <reference types="next/image-types/global" />

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
    dataLayer?: unknown[];
  }
}