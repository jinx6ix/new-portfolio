"use client"

import { useEffect, useRef, Suspense } from "react"
import { usePathname, useSearchParams } from "next/navigation"

function generateSessionId(): string {
  return `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
}

function getDeviceType(): "desktop" | "mobile" | "tablet" {
  if (typeof window === "undefined") return "desktop";
  const ua = navigator.userAgent;
  if (/tablet|ipad|playbook|silk/i.test(ua)) return "tablet";
  if (/mobile|iphone|ipod|android|blackberry|opera mini|iemobile/i.test(ua)) return "mobile";
  return "desktop";
}

function AnalyticsTracker({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const sessionIdRef = useRef<string>("");
  const lastPageRef = useRef<string>("");

  useEffect(() => {
    if (!sessionIdRef.current) {
      sessionIdRef.current = sessionStorage.getItem("session_id") || generateSessionId();
      sessionStorage.setItem("session_id", sessionIdRef.current);
    }
  }, []);

  useEffect(() => {
    const page = pathname + (searchParams.toString() ? `?${searchParams.toString()}` : "");

    if (page === lastPageRef.current) return;
    lastPageRef.current = page;

    const utmSource = searchParams.get("utm_source") || undefined;
    const utmMedium = searchParams.get("utm_medium") || undefined;
    const utmCampaign = searchParams.get("utm_campaign") || undefined;

    fetch("/api/analytics/track", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        sessionId: sessionIdRef.current,
        type: "pageview",
        page,
        referrer: document.referrer || undefined,
        utmSource,
        utmMedium,
        utmCampaign,
        deviceType: getDeviceType(),
        userAgent: navigator.userAgent,
        screenSize: `${window.innerWidth}x${window.innerHeight}`,
      }),
    }).catch(console.error);

    const handleScroll = () => {
      const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
      const scrollPercent = Math.round((window.scrollY / scrollHeight) * 100);

      if (scrollPercent > 90 && Math.random() > 0.9) {
        fetch("/api/analytics/track", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            sessionId: sessionIdRef.current,
            type: "scroll",
            page,
            deviceType: getDeviceType(),
            userAgent: navigator.userAgent,
            metadata: { scrollPercent: scrollPercent.toString() },
          }),
        }).catch(console.error);
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [pathname, searchParams]);

  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const link = target.closest("a");

      if (link) {
        const url = new URL(link.href);
        const isExternal = url.origin !== window.location.origin;
        const isSocialShare = link.dataset.socialShare === "true";

        if (isSocialShare) {
          fetch("/api/analytics/track", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              sessionId: sessionIdRef.current,
              type: "social_share",
              page: pathname,
              deviceType: getDeviceType(),
              userAgent: navigator.userAgent,
              metadata: {
                platform: link.dataset.platform || "unknown",
                url: url.href,
              },
            }),
          }).catch(console.error);
        } else if (isExternal) {
          fetch("/api/analytics/track", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              sessionId: sessionIdRef.current,
              type: "external_link",
              page: pathname,
              deviceType: getDeviceType(),
              userAgent: navigator.userAgent,
              metadata: { url: url.href },
            }),
          }).catch(console.error);
        }
      }
    };

    document.addEventListener("click", handleClick);
    return () => document.removeEventListener("click", handleClick);
  }, [pathname]);

  return <>{children}</>;
}

function AnalyticsInner({ children }: { children: React.ReactNode }) {
  return (
    <Suspense fallback={null}>
      <AnalyticsTracker>{children}</AnalyticsTracker>
    </Suspense>
  );
}

export default function AnalyticsProvider({ children }: { children: React.ReactNode }) {
  return (
    <AnalyticsInner>{children}</AnalyticsInner>
  );
}

export function trackEvent(type: string, metadata?: Record<string, string>) {
  const sessionId = sessionStorage.getItem("session_id") || generateSessionId();
  sessionStorage.setItem("session_id", sessionId);

  fetch("/api/analytics/track", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      sessionId,
      type,
      page: window.location.pathname,
      deviceType: getDeviceType(),
      userAgent: navigator.userAgent,
      metadata,
    }),
  }).catch(console.error);
}