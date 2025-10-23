import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import Navigation from "@/components/navigation"
import Footer from "@/components/footer"
import { ArrowRight, Shield, Lock, AlertTriangle, Eye, Zap, CheckCircle } from "lucide-react"

export const metadata = {
  title: "Cybersecurity Services | Ian Iraya",
  description:
    "Professional cybersecurity services including security audits, penetration testing, vulnerability assessments, and compliance consulting.",
  openGraph: {
    title: "Cybersecurity Services | Ian Iraya",
    description: "Protect your digital assets with professional cybersecurity services.",
    url: "https://ianiraya.com/services/cybersecurity",
  },
}

export default function CybersecurityPage() {
  const services = [
    {
      icon: Eye,
      title: "Security Audits",
      description:
        "Comprehensive review of your systems, applications, and infrastructure to identify vulnerabilities.",
    },
    {
      icon: AlertTriangle,
      title: "Penetration Testing",
      description: "Simulated attacks to test your defenses and identify security weaknesses before attackers do.",
    },
    {
      icon: Lock,
      title: "Vulnerability Assessment",
      description: "Detailed analysis of your systems to find and prioritize security vulnerabilities.",
    },
    {
      icon: Shield,
      title: "Security Hardening",
      description: "Implementation of security best practices and configurations to strengthen your infrastructure.",
    },
    {
      icon: Zap,
      title: "Incident Response",
      description: "Rapid response and recovery from security incidents to minimize damage and downtime.",
    },
    {
      icon: CheckCircle,
      title: "Compliance Consulting",
      description: "Guidance on meeting industry standards and regulations like GDPR, HIPAA, and PCI-DSS.",
    },
  ]

  const benefits = [
    "Identify and fix vulnerabilities before attackers exploit them",
    "Protect sensitive customer and business data",
    "Reduce risk of costly security breaches",
    "Meet compliance and regulatory requirements",
    "Build customer trust and confidence",
    "Minimize downtime and business disruption",
  ]

  const process = [
    {
      step: "01",
      title: "Assessment",
      description: "Initial evaluation of your current security posture and risk profile.",
    },
    {
      step: "02",
      title: "Testing",
      description: "Comprehensive security testing and vulnerability scanning.",
    },
    {
      step: "03",
      title: "Analysis",
      description: "Detailed analysis of findings and risk prioritization.",
    },
    {
      step: "04",
      title: "Reporting",
      description: "Detailed report with findings, recommendations, and remediation steps.",
    },
    {
      step: "05",
      title: "Remediation",
      description: "Implementation of security improvements and fixes.",
    },
    {
      step: "06",
      title: "Verification",
      description: "Follow-up testing to verify that vulnerabilities have been resolved.",
    },
  ]

  return (
    <main className="min-h-screen bg-background">
      <Navigation />

      {/* Hero Section */}
      <section className="relative pt-20 pb-16 px-4 sm:px-6 lg:px-8 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-accent/5 pointer-events-none" />

        <div className="relative max-w-6xl mx-auto">
          <div className="space-y-6">
            <div className="space-y-4">
              <h1 className="text-5xl sm:text-6xl font-bold text-balance leading-tight">Cybersecurity Services</h1>
              <p className="text-xl text-muted-foreground max-w-3xl leading-relaxed">
                Protect your digital assets with comprehensive security audits, penetration testing, and vulnerability
                assessments. Identify and fix security weaknesses before attackers exploit them.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <Link href="/contact">
                <Button size="lg" className="w-full sm:w-auto">
                  Schedule Audit <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
              <Link href="/portfolio">
                <Button size="lg" variant="outline" className="w-full sm:w-auto bg-transparent">
                  View Case Studies
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-card/50">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16 space-y-4">
            <h2 className="text-4xl font-bold">Security Services</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Comprehensive cybersecurity solutions tailored to your organization's needs
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.map((service) => {
              const Icon = service.icon
              return (
                <Card key={service.title} className="p-6 hover:border-primary transition-colors">
                  <Icon className="h-12 w-12 text-primary mb-4" />
                  <h3 className="text-xl font-semibold mb-2">{service.title}</h3>
                  <p className="text-muted-foreground text-sm leading-relaxed">{service.description}</p>
                </Card>
              )
            })}
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <div className="space-y-4">
                <h2 className="text-4xl font-bold">Why Security Matters</h2>
                <p className="text-lg text-muted-foreground leading-relaxed">
                  In today's threat landscape, proactive security is essential. Protect your business, customers, and
                  reputation.
                </p>
              </div>

              <ul className="space-y-4">
                {benefits.map((benefit) => (
                  <li key={benefit} className="flex gap-3 items-start">
                    <CheckCircle className="h-6 w-6 text-primary flex-shrink-0 mt-0.5" />
                    <span className="text-muted-foreground">{benefit}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="relative h-96 rounded-lg overflow-hidden bg-gradient-to-br from-primary/20 to-accent/20 border border-border flex items-center justify-center">
              <Shield className="h-32 w-32 text-primary opacity-20" />
            </div>
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-card/50">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16 space-y-4">
            <h2 className="text-4xl font-bold">Our Security Process</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              A systematic approach to identifying and eliminating security risks
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {process.map((item) => (
              <div key={item.step} className="space-y-4">
                <div className="text-5xl font-bold text-primary/20">{item.step}</div>
                <div className="space-y-2">
                  <h3 className="text-xl font-semibold">{item.title}</h3>
                  <p className="text-muted-foreground leading-relaxed">{item.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-primary/10 to-accent/10 border-y border-border">
        <div className="max-w-4xl mx-auto text-center space-y-8">
          <div className="space-y-4">
            <h2 className="text-4xl font-bold">Secure Your Digital Assets Today</h2>
            <p className="text-lg text-muted-foreground">
              Don't wait for a breach. Get a comprehensive security assessment and protect your business.
            </p>
          </div>
          <Link href="/contact">
            <Button size="lg" className="px-8">
              Request Security Audit <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </Link>
        </div>
      </section>

      <Footer />
    </main>
  )
}
