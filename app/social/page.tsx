"use client"

import { useEffect, useState } from "react"
import { Card } from "@/components/ui/card"
import Navigation from "@/components/navigation"
import Footer from "@/components/footer"
import { Instagram, Twitter, Linkedin, Music2, ExternalLink } from "lucide-react"

export default function SocialPage() {
  const [tiktokVideos, setTiktokVideos] = useState<any[]>([])
  const [instagramPosts, setInstagramPosts] = useState<any[]>([])

  useEffect(() => {
    // Load TikTok embed script
    const script = document.createElement("script")
    script.src = "https://www.tiktok.com/embed.js"
    script.async = true
    document.body.appendChild(script)

    // Load Instagram embed script
    const igScript = document.createElement("script")
    igScript.src = "https://www.instagram.com/embed.js"
    igScript.async = true
    document.body.appendChild(igScript)

    return () => {
      document.body.removeChild(script)
      document.body.removeChild(igScript)
    }
  }, [])

  const socialLinks = [
    {
      name: "TikTok",
      icon: Music2,
      url: "https://www.tiktok.com/@ianiraya",
      color: "from-black to-gray-800",
      description: "Follow for quick tech tips and cybersecurity insights",
    },
    {
      name: "Instagram",
      icon: Instagram,
      url: "https://www.instagram.com/ianiraya",
      color: "from-pink-500 to-purple-600",
      description: "Behind-the-scenes and project showcases",
    },
    {
      name: "Twitter/X",
      icon: Twitter,
      url: "https://twitter.com/ianiraya",
      color: "from-black to-gray-700",
      description: "Daily insights on web development and cybersecurity",
    },
    {
      name: "LinkedIn",
      icon: Linkedin,
      url: "https://linkedin.com/in/ianiraya",
      color: "from-blue-600 to-blue-800",
      description: "Professional updates and industry news",
    },
  ]

  return (
    <main className="min-h-screen bg-background">
      <Navigation />

      {/* Hero Section */}
      <section className="relative pt-20 pb-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto text-center space-y-4">
          <h1 className="text-5xl font-bold text-balance">Follow Me On Social Media</h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Stay updated with the latest insights on web development, cybersecurity, and SEO. Follow me across all
            platforms for daily tips and project updates.
          </p>
        </div>
      </section>

      {/* Social Links Grid */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
            {socialLinks.map((social) => {
              const Icon = social.icon
              return (
                <a
                  key={social.name}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => {
                    if (typeof window !== "undefined" && window.gtag) {
                      window.gtag("event", "social_link_clicked", {
                        platform: social.name,
                      })
                    }
                  }}
                >
                  <Card className={`p-6 h-full hover:border-primary transition-all cursor-pointer group`}>
                    <div className={`bg-gradient-to-br ${social.color} p-4 rounded-lg mb-4 w-fit`}>
                      <Icon className="h-8 w-8 text-white" />
                    </div>
                    <h3 className="text-lg font-semibold mb-2">{social.name}</h3>
                    <p className="text-sm text-muted-foreground mb-4">{social.description}</p>
                    <div className="flex items-center gap-2 text-primary group-hover:gap-3 transition-all">
                      <span className="text-sm font-medium">Follow</span>
                      <ExternalLink className="h-4 w-4" />
                    </div>
                  </Card>
                </a>
              )
            })}
          </div>

          {/* TikTok Videos Section */}
          <div className="mb-20">
            <h2 className="text-3xl font-bold mb-8">Latest TikTok Videos</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {/* TikTok embeds - replace with your actual TikTok video URLs */}
              {[
                "https://www.tiktok.com/@ianiraya/video/1234567890",
                "https://www.tiktok.com/@ianiraya/video/1234567891",
                "https://www.tiktok.com/@ianiraya/video/1234567892",
              ].map((url, idx) => (
                <div key={idx} className="bg-card rounded-lg overflow-hidden border border-border">
                  <blockquote
                    className="tiktok-embed"
                    cite={url}
                    data-unique-id={`tiktok-${idx}`}
                    style={{ maxWidth: "100%", minHeight: "400px" }}
                  >
                    <section>
                      <a href={url} target="_blank" rel="noopener noreferrer">
                        View on TikTok
                      </a>
                    </section>
                  </blockquote>
                </div>
              ))}
            </div>
            <p className="text-sm text-muted-foreground mt-4">
              Note: Replace the TikTok video URLs above with your actual TikTok video links
            </p>
          </div>

          {/* Instagram Posts Section */}
          <div className="mb-20">
            <h2 className="text-3xl font-bold mb-8">Latest Instagram Posts</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {/* Instagram embeds - replace with your actual Instagram post URLs */}
              {[
                "https://www.instagram.com/p/XXXXXXXXXX/",
                "https://www.instagram.com/p/XXXXXXXXXX/",
                "https://www.instagram.com/p/XXXXXXXXXX/",
              ].map((url, idx) => (
                <div key={idx} className="bg-card rounded-lg overflow-hidden border border-border">
                  <blockquote
                    className="instagram-media"
                    data-instgrm-permalink={url}
                    data-instgrm-version="14"
                    style={{ maxWidth: "100%", minHeight: "400px" }}
                  >
                    <a href={url} target="_blank" rel="noopener noreferrer">
                      View on Instagram
                    </a>
                  </blockquote>
                </div>
              ))}
            </div>
            <p className="text-sm text-muted-foreground mt-4">
              Note: Replace the Instagram post URLs above with your actual Instagram post links
            </p>
          </div>

          {/* Twitter/X Feed Section */}
          <div className="mb-20">
            <h2 className="text-3xl font-bold mb-8">Latest Tweets</h2>
            <div className="grid md:grid-cols-2 gap-6">
              {/* Twitter embeds - replace with your actual tweet URLs */}
              {["https://twitter.com/ianiraya/status/1234567890", "https://twitter.com/ianiraya/status/1234567891"].map(
                (url, idx) => (
                  <div key={idx} className="bg-card rounded-lg overflow-hidden border border-border p-4">
                    <a href={url} target="_blank" rel="noopener noreferrer" className="text-primary hover:text-accent">
                      View Tweet
                    </a>
                  </div>
                ),
              )}
            </div>
            <p className="text-sm text-muted-foreground mt-4">
              Note: Replace the Twitter URLs above with your actual tweet links
            </p>
          </div>

          {/* LinkedIn Section */}
          <div>
            <h2 className="text-3xl font-bold mb-8">LinkedIn Profile</h2>
            <Card className="p-8 text-center">
              <p className="text-muted-foreground mb-6">
                Connect with me on LinkedIn for professional updates, industry insights, and career opportunities.
              </p>
              <a
                href="https://linkedin.com/in/ianiraya"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors"
                onClick={() => {
                  if (typeof window !== "undefined" && window.gtag) {
                    window.gtag("event", "linkedin_profile_clicked")
                  }
                }}
              >
                <Linkedin className="h-5 w-5" />
                Visit LinkedIn Profile
              </a>
            </Card>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  )
}
