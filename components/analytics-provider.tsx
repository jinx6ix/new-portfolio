"use client"

import { useEffect } from "react"
import { usePathname } from "next/navigation"

declare global {
  interface Window {
    gtag: (command: string, id: string, config?: Record<string, any>) => void
  }
}

export function AnalyticsProvider() {
  const pathname = usePathname()

  useEffect(() => {
    // Track page views
    if (typeof window !== "undefined" && window.gtag) {
      window.gtag("config", "G-EN1K94FRDB", {
        page_path: pathname,
      })
    }
  }, [pathname])

  useEffect(() => {
    // Track scroll depth
    let maxScroll = 0

    const handleScroll = () => {
      const scrollPercentage = (window.scrollY / (document.documentElement.scrollHeight - window.innerHeight)) * 100

      if (scrollPercentage > maxScroll) {
        maxScroll = scrollPercentage

        // Track at 25%, 50%, 75%, 100%
        if (maxScroll >= 25 && maxScroll < 50) {
          if (typeof window !== "undefined" && window.gtag) {
            window.gtag("event", "scroll_depth", { scroll_percentage: 25 })
          }
        } else if (maxScroll >= 50 && maxScroll < 75) {
          if (typeof window !== "undefined" && window.gtag) {
            window.gtag("event", "scroll_depth", { scroll_percentage: 50 })
          }
        } else if (maxScroll >= 75 && maxScroll < 100) {
          if (typeof window !== "undefined" && window.gtag) {
            window.gtag("event", "scroll_depth", { scroll_percentage: 75 })
          }
        } else if (maxScroll >= 100) {
          if (typeof window !== "undefined" && window.gtag) {
            window.gtag("event", "scroll_depth", { scroll_percentage: 100 })
          }
        }
      }
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  useEffect(() => {
    // Track button clicks
    const handleButtonClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement
      if (target.tagName === "BUTTON" || target.closest("button")) {
        const button = target.tagName === "BUTTON" ? target : target.closest("button")
        if (button) {
          const buttonText = button.textContent || "Unknown"
          if (typeof window !== "undefined" && window.gtag) {
            window.gtag("event", "button_click", {
              button_text: buttonText,
              button_location: window.location.pathname,
            })
          }
        }
      }
    }

    document.addEventListener("click", handleButtonClick)
    return () => document.removeEventListener("click", handleButtonClick)
  }, [])

  return null
}
