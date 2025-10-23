"use client"

import { useEffect } from "react"
import Link from "next/link"
import { Card } from "@/components/ui/card"
import { Instagram, Twitter, Linkedin, Music2 } from "lucide-react"

export function SocialMediaWidget() {
  useEffect(() => {
    // Load social media embed scripts
    const scripts = [
      { src: "https://www.tiktok.com/embed.js", id: "tiktok-embed" },
      { src: "https://www.instagram.com/embed.js", id: "instagram-embed" },
      { src: "https://platform.twitter.com/widgets.js", id: "twitter-embed" },
    ]

    scripts.forEach(({ src, id }) => {
      if (!document.getElementById(id)) {
        const script = document.createElement("script")
        script.id = id
        script.src = src
        script.async = true
        document.body.appendChild(script)
      }
    })
  }, [])

  const socialLinks = [
    {
      name: "TikTok",
      icon: Music2,
      url: "https://www.tiktok.com/@ianiraya",
      color: "text-black dark:text-white",
    },
    {
      name: "Instagram",
      icon: Instagram,
      url: "https://www.instagram.com/ianiraya",
      color: "text-pink-600",
    },
    {
      name: "Twitter",
      icon: Twitter,
      url: "https://twitter.com/ianiraya",
      color: "text-blue-400",
    },
    {
      name: "LinkedIn",
      icon: Linkedin,
      url: "https://linkedin.com/in/ianiraya",
      color: "text-blue-600",
    },
  ]

  return (
    <Card className="p-6">
      <h3 className="text-lg font-semibold mb-4">Follow Me</h3>
      <div className="flex gap-4 mb-4">
        {socialLinks.map((social) => {
          const Icon = social.icon
          return (
            <a
              key={social.name}
              href={social.url}
              target="_blank"
              rel="noopener noreferrer"
              title={social.name}
              className="hover:opacity-80 transition-opacity"
              onClick={() => {
                if (typeof window !== "undefined" && window.gtag) {
                  window.gtag("event", "social_widget_clicked", {
                    platform: social.name,
                  })
                }
              }}
            >
              <Icon className={`h-6 w-6 ${social.color}`} />
            </a>
          )
        })}
      </div>
      <Link href="/social" className="text-sm text-primary hover:text-accent">
        View all social media →
      </Link>
    </Card>
  )
}
