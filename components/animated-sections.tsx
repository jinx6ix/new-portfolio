"use client"

import { useEffect, useRef, useState, ReactNode } from "react"

interface AnimatedSectionProps {
  children: ReactNode
  className?: string
  animation?: "fade-up" | "fade-in" | "slide-left" | "slide-right" | "scale" | "bounce"
  delay?: number
}

export function AnimatedSection({ children, className = "", animation = "fade-up", delay = 0 }: AnimatedSectionProps) {
  const [isVisible, setIsVisible] = useState(false)
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
        }
      },
      { threshold: 0.1, rootMargin: "0px 0px -50px 0px" }
    )

    if (ref.current) {
      observer.observe(ref.current)
    }

    return () => observer.disconnect()
  }, [])

  const animations = {
    "fade-up": `opacity: 0; transform: translateY(40px); transition: all 0.8s cubic-bezier(0.4, 0, 0.2, 1) ${delay}ms;`,
    "fade-in": `opacity: 0; transition: all 0.8s ease ${delay}ms;`,
    "slide-left": `opacity: 0; transform: translateX(60px); transition: all 0.8s cubic-bezier(0.4, 0, 0.2, 1) ${delay}ms;`,
    "slide-right": `opacity: 0; transform: translateX(-60px); transition: all 0.8s cubic-bezier(0.4, 0, 0.2, 1) ${delay}ms;`,
    "scale": `opacity: 0; transform: scale(0.8); transition: all 0.8s cubic-bezier(0.4, 0, 0.2, 1) ${delay}ms;`,
    "bounce": `opacity: 0; transform: translateY(20px); transition: all 0.6s cubic-bezier(0.68, -0.55, 0.265, 1.55) ${delay}ms;`,
  }

  const visibleAnimations = {
    "fade-up": "opacity: 1; transform: translateY(0);",
    "fade-in": "opacity: 1;",
    "slide-left": "opacity: 1; transform: translateX(0);",
    "slide-right": "opacity: 1; transform: translateX(0);",
    "scale": "opacity: 1; transform: scale(1);",
    "bounce": "opacity: 1; transform: translateY(0);",
  }

  return (
    <div
      ref={ref}
      className={className}
      style={{
        ...(isVisible ? { } : { opacity: 0, transform: "translateY(40px)" }),
        transition: `all 0.8s cubic-bezier(0.4, 0, 0.2, 1) ${delay}ms`,
      }}
    >
      {children}
    </div>
  )
}

interface AnimatedCardProps {
  children: ReactNode
  className?: string
  delay?: number
}

export function AnimatedCard({ children, className = "", delay = 0 }: AnimatedCardProps) {
  const [isVisible, setIsVisible] = useState(false)
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
        }
      },
      { threshold: 0.1 }
    )

    if (ref.current) {
      observer.observe(ref.current)
    }

    return () => observer.disconnect()
  }, [])

  return (
    <div
      ref={ref}
      className={`transition-all duration-700 ${className}`}
      style={{
        opacity: isVisible ? 1 : 0,
        transform: isVisible ? "translateY(0) scale(1)" : "translateY(30px) scale(0.95)",
        transitionDelay: `${delay}ms`,
      }}
    >
      {children}
    </div>
  )
}

interface AnimatedTextProps {
  children: ReactNode
  className?: string
  delay?: number
  stagger?: number
}

export function AnimatedText({ children, className = "", delay = 0, stagger = 50 }: AnimatedTextProps) {
  const ref = useRef<HTMLDivElement>(null)
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
        }
      },
      { threshold: 0.1 }
    )

    if (ref.current) {
      observer.observe(ref.current)
    }

    return () => observer.disconnect()
  }, [])

  return (
    <div
      ref={ref}
      className={`overflow-hidden ${className}`}
    >
      <div
        style={{
          opacity: isVisible ? 1 : 0,
          transform: isVisible ? "translateY(0)" : "translateY(100%)",
          transition: `all 0.8s cubic-bezier(0.4, 0, 0.2, 1) ${delay}ms`,
        }}
      >
        {children}
      </div>
    </div>
  )
}

export function TypewriterText({ text, className = "", delay = 0 }: { text: string; className?: string; delay?: number }) {
  const [displayText, setDisplayText] = useState("")
  const [isVisible, setIsVisible] = useState(false)
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !isVisible) {
          setIsVisible(true)
        }
      },
      { threshold: 0.1 }
    )

    if (ref.current) {
      observer.observe(ref.current)
    }

    return () => observer.disconnect()
  }, [isVisible])

  useEffect(() => {
    if (!isVisible) return

    let currentIndex = 0
    const interval = setInterval(() => {
      if (currentIndex <= text.length) {
        setDisplayText(text.slice(0, currentIndex))
        currentIndex++
      } else {
        clearInterval(interval)
      }
    }, 50)

    return () => clearInterval(interval)
  }, [isVisible, text])

  return (
    <div ref={ref} className={className}>
      <span>{displayText}</span>
      <span className="animate-pulse">|</span>
    </div>
  )
}