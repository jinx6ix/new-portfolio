"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import Navigation from "@/components/navigation"
import Footer from "@/components/footer"
import { Check, ArrowRight } from "lucide-react"

export default function PricingPage() {
  const [selectedService, setSelectedService] = useState<string | null>(null)

  const services = [
    {
      id: "web-dev-starter",
      name: "Web Development - Starter",
      price: 15000,
      currency: "KES",
      description: "Perfect for small projects and landing pages",
      features: [
        "Responsive website design",
        "Up to 5 pages",
        "Mobile optimization",
        "Basic SEO setup",
        "Contact form integration",
        "1 month support",
      ],
      popular: false,
    },
    {
      id: "web-dev-professional",
      name: "Web Development - Professional",
      price: 45000,
      currency: "KES",
      description: "Full-featured web applications",
      features: [
        "Custom web application",
        "Database integration",
        "User authentication",
        "Advanced SEO optimization",
        "Payment gateway integration",
        "3 months support",
        "Performance optimization",
      ],
      popular: true,
    },
    {
      id: "web-dev-enterprise",
      name: "Web Development - Enterprise",
      price: 100000,
      currency: "KES",
      description: "Large-scale enterprise solutions",
      features: [
        "Complex web applications",
        "Multi-database architecture",
        "Advanced security features",
        "API development",
        "Third-party integrations",
        "6 months support",
        "Dedicated account manager",
      ],
      popular: false,
    },
    {
      id: "cybersecurity-audit",
      name: "Cybersecurity - Security Audit",
      price: 25000,
      currency: "KES",
      description: "Comprehensive security assessment",
      features: [
        "Full security audit",
        "Vulnerability assessment",
        "Penetration testing",
        "Security report",
        "Recommendations",
        "1 month follow-up",
      ],
      popular: false,
    },
    {
      id: "cybersecurity-advanced",
      name: "Cybersecurity - Advanced Protection",
      price: 60000,
      currency: "KES",
      description: "Complete security implementation",
      features: [
        "Security audit & testing",
        "Firewall configuration",
        "SSL/TLS implementation",
        "Data encryption setup",
        "Security monitoring",
        "3 months support",
        "Incident response plan",
      ],
      popular: true,
    },
    {
      id: "seo-starter",
      name: "SEO - Starter Package",
      price: 12000,
      currency: "KES",
      description: "Basic SEO optimization",
      features: [
        "Keyword research",
        "On-page optimization",
        "Meta tags optimization",
        "Basic link building",
        "Monthly report",
        "3 months engagement",
      ],
      popular: false,
    },
    {
      id: "seo-professional",
      name: "SEO - Professional Package",
      price: 35000,
      currency: "KES",
      description: "Comprehensive SEO strategy",
      features: [
        "Advanced keyword research",
        "Complete on-page optimization",
        "Technical SEO audit",
        "Content strategy",
        "Link building campaign",
        "Monthly analytics report",
        "6 months engagement",
      ],
      popular: true,
    },
    {
      id: "hosting-basic",
      name: "Free Web Hosting - Basic",
      price: 0,
      currency: "KES",
      description: "Free hosting for small projects",
      features: [
        "Up to 5GB storage",
        "Unlimited bandwidth",
        "Free SSL certificate",
        "Email support",
        "Basic uptime monitoring",
        "Community support",
      ],
      popular: false,
    },
  ]

  return (
    <main className="min-h-screen bg-background">
      <Navigation />

      {/* Hero Section */}
      <section className="relative pt-20 pb-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto text-center space-y-4">
          <h1 className="text-5xl font-bold text-balance">Simple, Transparent Pricing</h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Affordable packages for web development, cybersecurity, SEO, and hosting. Choose the perfect plan for your
            needs.
          </p>
        </div>
      </section>

      {/* Pricing Cards */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {services.map((service) => (
              <Card
                key={service.id}
                className={`relative p-6 flex flex-col h-full transition-all ${
                  service.popular ? "ring-2 ring-primary lg:scale-105" : ""
                }`}
              >
                {service.popular && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-primary text-primary-foreground px-3 py-1 rounded-full text-sm font-semibold">
                    Most Popular
                  </div>
                )}

                <div className="space-y-4 flex-1">
                  <div>
                    <h3 className="text-lg font-semibold">{service.name}</h3>
                    <p className="text-sm text-muted-foreground mt-1">{service.description}</p>
                  </div>

                  <div className="space-y-1">
                    <div className="flex items-baseline gap-1">
                      <span className="text-3xl font-bold">{service.price.toLocaleString()}</span>
                      <span className="text-muted-foreground">{service.currency}</span>
                    </div>
                    {service.price === 0 && <p className="text-sm text-accent font-semibold">Forever Free</p>}
                  </div>

                  <ul className="space-y-2">
                    {service.features.map((feature, idx) => (
                      <li key={idx} className="flex items-start gap-2 text-sm">
                        <Check className="h-4 w-4 text-accent mt-0.5 flex-shrink-0" />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <Link href={`/booking?service=${service.id}`}>
                  <Button
                    className="w-full mt-6"
                    variant={service.popular ? "default" : "outline"}
                    onClick={() => {
                      setSelectedService(service.id)
                      if (typeof window !== "undefined" && window.gtag) {
                        window.gtag("event", "pricing_service_selected", {
                          service_id: service.id,
                          service_name: service.name,
                          price: service.price,
                        })
                      }
                    }}
                  >
                    Book Now <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-card/50">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12">Pricing FAQ</h2>
          <div className="space-y-6">
            {[
              {
                q: "Can I customize a package?",
                a: "Yes! All packages can be customized based on your specific needs. Contact me for a custom quote.",
              },
              {
                q: "Do you offer payment plans?",
                a: "Yes, we offer flexible payment plans for larger projects. Discuss options during the booking process.",
              },
              {
                q: "What's included in the support?",
                a: "Support includes bug fixes, minor updates, and technical assistance during the specified period.",
              },
              {
                q: "Can I upgrade my package later?",
                a: "You can upgrade your package at any time. We'll adjust the pricing accordingly.",
              },
            ].map((item, idx) => (
              <div key={idx} className="space-y-2">
                <h3 className="font-semibold text-lg">{item.q}</h3>
                <p className="text-muted-foreground">{item.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </main>
  )
}
