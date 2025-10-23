"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import Navigation from "@/components/navigation"
import Footer from "@/components/footer"
import { ArrowRight, Shield, Code2, TrendingUp, Zap } from "lucide-react"

export default function PageClient() {
  const services = [
    {
      icon: Code2,
      title: "Web Development",
      description: "Full-stack web applications with modern technologies. React, Next.js, Node.js, and more.",
      link: "/services/web-development",
    },
    {
      icon: Shield,
      title: "Cybersecurity",
      description: "Security audits, penetration testing, and vulnerability assessments. Protect your digital assets.",
      link: "/services/cybersecurity",
    },
    {
      icon: TrendingUp,
      title: "SEO Management",
      description: "Comprehensive SEO strategies to improve rankings and drive organic traffic.",
      link: "/services/seo",
    },
    {
      icon: Zap,
      title: "Free Web Hosting",
      description: "Reliable hosting solutions for your projects. Get started with free hosting services.",
      link: "/services/hosting",
    },
  ]

  const stats = [
    { label: "Projects Completed", value: "30+" },
    { label: "Years Experience", value: "10+" },
    { label: "Clients Served", value: "50+" },
    { label: "Success Rate", value: "98%" },
  ]

  return (
    <main className="min-h-screen bg-background">
      <Navigation />

      {/* Hero Section */}
      <section className="relative pt-20 pb-32 px-4 sm:px-6 lg:px-8 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-accent/5 pointer-events-none" />

        <div className="relative max-w-6xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-8">
              <div className="space-y-4">
                <h1 className="text-5xl sm:text-6xl font-bold text-balance leading-tight">
                  Web Developer, Cybersecurity Expert & SEO Manager
                </h1>
                <p className="text-xl text-muted-foreground leading-relaxed">
                  Based in Kiambu, Kenya. I build secure, high-performance web applications and help businesses dominate
                  search rankings. 10+ years of expertise across web development, cybersecurity, and digital marketing.
                </p>
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                <Link href="/portfolio">
                  <Button
                    size="lg"
                    className="w-full sm:w-auto"
                    onClick={() => {
                      if (typeof window !== "undefined" && window.gtag) {
                        window.gtag("event", "homepage_view_work_clicked")
                      }
                    }}
                  >
                    View My Work <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
                <Link href="/booking">
                  <Button
                    size="lg"
                    variant="outline"
                    className="w-full sm:w-auto bg-transparent"
                    onClick={() => {
                      if (typeof window !== "undefined" && window.gtag) {
                        window.gtag("event", "homepage_book_service_clicked")
                      }
                    }}
                  >
                    Book Service
                  </Button>
                </Link>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-2 gap-4 pt-8">
                {stats.map((stat) => (
                  <div key={stat.label} className="space-y-1">
                    <p className="text-3xl font-bold text-accent">{stat.value}</p>
                    <p className="text-sm text-muted-foreground">{stat.label}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Hero Image Placeholder */}
            <div className="relative h-96 lg:h-full rounded-lg overflow-hidden bg-gradient-to-br from-primary/20 to-accent/20 border border-border flex items-center justify-center">
              <div className="text-center space-y-4">
                <Shield className="h-24 w-24 mx-auto text-primary opacity-50" />
                <p className="text-muted-foreground">Professional Portfolio</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-card/50">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16 space-y-4">
            <h2 className="text-4xl font-bold">Services & Expertise</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Comprehensive solutions for web development, cybersecurity, SEO, and hosting
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {services.map((service) => {
              const Icon = service.icon
              return (
                <Link key={service.title} href={service.link}>
                  <Card
                    className="h-full p-6 hover:border-primary transition-colors cursor-pointer group"
                    onClick={() => {
                      if (typeof window !== "undefined" && window.gtag) {
                        window.gtag("event", "service_card_clicked", {
                          service_name: service.title,
                        })
                      }
                    }}
                  >
                    <Icon className="h-12 w-12 text-primary mb-4 group-hover:text-accent transition-colors" />
                    <h3 className="text-xl font-semibold mb-2">{service.title}</h3>
                    <p className="text-muted-foreground text-sm leading-relaxed">{service.description}</p>
                  </Card>
                </Link>
              )
            })}
          </div>
        </div>
      </section>

      {/* Featured Projects Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16 space-y-4">
            <h2 className="text-4xl font-bold">Featured Projects</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Showcase of recent work across web development, cybersecurity, and SEO
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6 mb-8">
            {[1, 2, 3].map((i) => (
              <Card key={i} className="overflow-hidden hover:border-primary transition-colors">
                <div className="h-48 bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center">
                  <Code2 className="h-16 w-16 text-primary opacity-30" />
                </div>
                <div className="p-6 space-y-3">
                  <h3 className="text-lg font-semibold">Project {i}</h3>
                  <p className="text-sm text-muted-foreground">
                    High-impact project demonstrating expertise in web development and optimization.
                  </p>
                  <Link
                    href="/portfolio"
                    className="text-primary hover:text-accent text-sm font-medium"
                    onClick={() => {
                      if (typeof window !== "undefined" && window.gtag) {
                        window.gtag("event", "featured_project_clicked", {
                          project_number: i,
                        })
                      }
                    }}
                  >
                    View Details →
                  </Link>
                </div>
              </Card>
            ))}
          </div>

          <div className="text-center">
            <Link href="/portfolio">
              <Button
                variant="outline"
                size="lg"
                onClick={() => {
                  if (typeof window !== "undefined" && window.gtag) {
                    window.gtag("event", "view_all_projects_clicked")
                  }
                }}
              >
                View All Projects <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* <CHANGE> Added new section highlighting pricing and booking */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-primary/10 to-accent/10 border-y border-border">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-3 gap-8 mb-12">
            <div className="text-center space-y-4">
              <h3 className="text-2xl font-bold">Transparent Pricing</h3>
              <p className="text-muted-foreground">
                Affordable packages for all service types with flexible payment options
              </p>
              <Link href="/pricing">
                <Button
                  variant="outline"
                  onClick={() => {
                    if (typeof window !== "undefined" && window.gtag) {
                      window.gtag("event", "homepage_pricing_clicked")
                    }
                  }}
                >
                  View Pricing
                </Button>
              </Link>
            </div>
            <div className="text-center space-y-4">
              <h3 className="text-2xl font-bold">Easy Booking</h3>
              <p className="text-muted-foreground">
                Book your service in minutes. Receive confirmation via email and WhatsApp
              </p>
              <Link href="/booking">
                <Button
                  onClick={() => {
                    if (typeof window !== "undefined" && window.gtag) {
                      window.gtag("event", "homepage_booking_cta_clicked")
                    }
                  }}
                >
                  Book Now
                </Button>
              </Link>
            </div>
            <div className="text-center space-y-4">
              <h3 className="text-2xl font-bold">AI-Powered SEO</h3>
              <p className="text-muted-foreground">
                Leverage AI tools to optimize your content and dominate search results
              </p>
              <Link href="/seo-tools">
                <Button
                  variant="outline"
                  onClick={() => {
                    if (typeof window !== "undefined" && window.gtag) {
                      window.gtag("event", "homepage_seo_tools_clicked")
                    }
                  }}
                >
                  Explore Tools
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center space-y-8">
          <div className="space-y-4">
            <h2 className="text-4xl font-bold">Ready to Transform Your Digital Presence?</h2>
            <p className="text-lg text-muted-foreground">
              Whether you need a new website, security audit, or SEO strategy, I'm here to help.
            </p>
          </div>
          <Link href="/booking">
            <Button
              size="lg"
              className="px-8"
              onClick={() => {
                if (typeof window !== "undefined" && window.gtag) {
                  window.gtag("event", "homepage_final_cta_clicked")
                }
              }}
            >
              Start Your Project <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </Link>
        </div>
      </section>

      <Footer />
    </main>
  )
}
