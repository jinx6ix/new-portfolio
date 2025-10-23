"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import Navigation from "@/components/navigation"
import Footer from "@/components/footer"
import { Search, Zap, TrendingUp, BarChart3, ArrowRight } from "lucide-react"

export default function SEOToolsPage() {
  const [activeTab, setActiveTab] = useState("overview")

  const seoFeatures = [
    {
      icon: Search,
      title: "Keyword Research",
      description: "AI-powered keyword analysis to find high-value search terms for your niche",
      details: ["Search volume analysis", "Competition metrics", "Long-tail keyword suggestions", "Seasonal trends"],
    },
    {
      icon: TrendingUp,
      title: "Content Optimization",
      description: "AI suggestions to optimize your content for search engines",
      details: [
        "Readability analysis",
        "Keyword density optimization",
        "Meta tag suggestions",
        "Internal linking recommendations",
      ],
    },
    {
      icon: BarChart3,
      title: "Ranking Tracking",
      description: "Monitor your search engine rankings across keywords",
      details: ["Daily rank tracking", "Competitor analysis", "SERP position history", "Traffic impact analysis"],
    },
    {
      icon: Zap,
      title: "Technical SEO",
      description: "Identify and fix technical SEO issues",
      details: [
        "Site speed optimization",
        "Mobile-friendliness check",
        "Crawlability analysis",
        "Structured data validation",
      ],
    },
  ]

  const aiCapabilities = [
    {
      title: "Content Generation",
      description: "AI-powered content creation optimized for search engines",
      features: ["Blog post generation", "Meta description writing", "Title tag optimization", "FAQ generation"],
    },
    {
      title: "Competitor Analysis",
      description: "Analyze competitor strategies and find opportunities",
      features: [
        "Backlink analysis",
        "Content gap identification",
        "Keyword opportunity mapping",
        "Strategy recommendations",
      ],
    },
    {
      title: "Search Intent Analysis",
      description: "Understand what users are searching for",
      features: ["Intent classification", "User behavior patterns", "Query clustering", "SERP feature analysis"],
    },
    {
      title: "Visibility Optimization",
      description: "Improve your visibility in search results",
      features: [
        "Rich snippet optimization",
        "Featured snippet targeting",
        "Knowledge panel optimization",
        "Local SEO enhancement",
      ],
    },
  ]

  return (
    <main className="min-h-screen bg-background">
      <Navigation />

      {/* Hero Section */}
      <section className="relative pt-20 pb-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto text-center space-y-4">
          <h1 className="text-5xl font-bold text-balance">AI-Powered SEO Tools</h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Leverage artificial intelligence to optimize your content for search engines and improve your online
            visibility.
          </p>
        </div>
      </section>

      {/* SEO Features */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-card/50">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold mb-12 text-center">SEO Features</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {seoFeatures.map((feature) => {
              const Icon = feature.icon
              return (
                <Card key={feature.title} className="p-6 hover:border-primary transition-colors">
                  <Icon className="h-12 w-12 text-primary mb-4" />
                  <h3 className="text-lg font-semibold mb-2">{feature.title}</h3>
                  <p className="text-sm text-muted-foreground mb-4">{feature.description}</p>
                  <ul className="space-y-2">
                    {feature.details.map((detail) => (
                      <li key={detail} className="text-xs text-muted-foreground flex items-start gap-2">
                        <span className="text-accent mt-1">•</span>
                        {detail}
                      </li>
                    ))}
                  </ul>
                </Card>
              )
            })}
          </div>
        </div>
      </section>

      {/* AI Capabilities */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold mb-12 text-center">AI Capabilities</h2>
          <div className="grid md:grid-cols-2 gap-8">
            {aiCapabilities.map((capability) => (
              <Card key={capability.title} className="p-8">
                <h3 className="text-xl font-semibold mb-2">{capability.title}</h3>
                <p className="text-muted-foreground mb-6">{capability.description}</p>
                <ul className="space-y-3">
                  {capability.features.map((feature) => (
                    <li key={feature} className="flex items-center gap-3">
                      <div className="h-2 w-2 bg-accent rounded-full" />
                      <span className="text-sm">{feature}</span>
                    </li>
                  ))}
                </ul>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-card/50">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold mb-12 text-center">How AI Improves Your SEO</h2>
          <div className="space-y-8">
            {[
              {
                step: 1,
                title: "Content Analysis",
                description:
                  "AI analyzes your existing content and identifies optimization opportunities for better search rankings.",
              },
              {
                step: 2,
                title: "Keyword Intelligence",
                description:
                  "Machine learning algorithms identify high-value keywords with lower competition and higher conversion potential.",
              },
              {
                step: 3,
                title: "Competitor Insights",
                description:
                  "AI compares your strategy with competitors to find gaps and opportunities in your market.",
              },
              {
                step: 4,
                title: "Continuous Optimization",
                description:
                  "Real-time monitoring and AI-powered recommendations keep your content optimized as search algorithms evolve.",
              },
            ].map((item) => (
              <div key={item.step} className="flex gap-6">
                <div className="flex-shrink-0">
                  <div className="flex items-center justify-center h-12 w-12 rounded-lg bg-primary text-primary-foreground font-bold">
                    {item.step}
                  </div>
                </div>
                <div>
                  <h3 className="text-lg font-semibold mb-2">{item.title}</h3>
                  <p className="text-muted-foreground">{item.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center space-y-8">
          <div className="space-y-4">
            <h2 className="text-4xl font-bold">Ready to Dominate Search Results?</h2>
            <p className="text-lg text-muted-foreground">
              Let's use AI-powered SEO strategies to boost your online visibility and drive more organic traffic.
            </p>
          </div>
          <Link href="/booking?service=seo-professional">
            <Button size="lg" className="px-8">
              Book SEO Service <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </Link>
        </div>
      </section>

      <Footer />
    </main>
  )
}
