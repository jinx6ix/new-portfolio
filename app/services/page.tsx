import type { Metadata } from "next"
import Link from "next/link"
import Navigation from "@/components/navigation"
import Footer from "@/components/footer"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Code2, Shield, TrendingUp, Zap, ArrowRight, CheckCircle } from "lucide-react"

export const metadata: Metadata = {
  title: "Services | Web Development, Cybersecurity & SEO | Ian Iraya",
  description:
    "Comprehensive digital services including web development, cybersecurity audits, SEO management, and free website hosting. Based in Kenya.",
  openGraph: {
    title: "Services - Ian Iraya",
    description: "Web Development, Cybersecurity, SEO Management, and Web Hosting Services",
    url: "https://ianiraya.com/services",
  },
}

export default function Services() {
  const services = [
    {
      icon: Code2,
      title: "Web Development",
      slug: "web-development",
      description: "Custom web applications built with modern technologies",
      features: [
        "Full-stack development",
        "React & Next.js expertise",
        "Responsive design",
        "Performance optimization",
        "SEO-friendly architecture",
        "Maintenance & support",
      ],
    },
    {
      icon: Shield,
      title: "Cybersecurity",
      slug: "cybersecurity",
      description: "Protect your digital assets with comprehensive security solutions",
      features: [
        "Security audits",
        "Penetration testing",
        "Vulnerability assessments",
        "Threat analysis",
        "Security consulting",
        "Incident response",
      ],
    },
    {
      icon: TrendingUp,
      title: "SEO Management",
      slug: "seo",
      description: "Dominate search rankings and drive organic traffic",
      features: [
        "Technical SEO",
        "Content strategy",
        "Link building",
        "Keyword research",
        "Analytics & reporting",
        "Competitor analysis",
      ],
    },
    {
      icon: Zap,
      title: "Web Hosting",
      slug: "hosting",
      description: "Reliable hosting solutions with free tier available",
      features: [
        "Free hosting tier",
        "Premium options",
        "SSL certificates",
        "99.9% uptime",
        "24/7 support",
        "Easy deployment",
      ],
    },
  ]

  return (
    <main className="min-h-screen bg-background">
      <Navigation />

      {/* Hero Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-primary/10 to-transparent">
        <div className="max-w-4xl mx-auto text-center space-y-6">
          <h1 className="text-5xl font-bold">Services & Solutions</h1>
          <p className="text-xl text-muted-foreground">
            Comprehensive digital services to help your business succeed online
          </p>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-2 gap-8">
            {services.map((service) => {
              const Icon = service.icon
              return (
                <Card key={service.slug} className="p-8 space-y-6 hover:border-primary transition-colors">
                  <Icon className="h-16 w-16 text-primary" />
                  <div className="space-y-2">
                    <h2 className="text-2xl font-bold">{service.title}</h2>
                    <p className="text-muted-foreground">{service.description}</p>
                  </div>
                  <ul className="space-y-3">
                    {service.features.map((feature) => (
                      <li key={feature} className="flex items-center gap-3">
                        <CheckCircle className="h-5 w-5 text-accent flex-shrink-0" />
                        <span className="text-sm">{feature}</span>
                      </li>
                    ))}
                  </ul>
                  <Link href={`/services/${service.slug}`}>
                    <Button className="w-full">
                      Learn More <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </Link>
                </Card>
              )
            })}
          </div>
        </div>
      </section>

      <Footer />
    </main>
  )
}
