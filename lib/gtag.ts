declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
    dataLayer?: unknown[];
  }
}

export function trackEvent(eventName: string, eventParams?: Record<string, unknown>): void {
  if (typeof window !== "undefined" && typeof window.gtag === "function") {
    window.gtag("event", eventName, eventParams);
  }
}

export function isGtagAvailable(): boolean {
  return typeof window !== "undefined" && typeof window.gtag === "function";
}