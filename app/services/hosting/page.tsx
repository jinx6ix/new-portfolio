import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import Navigation from "@/components/navigation"
import Footer from "@/components/footer"
import { ArrowRight, Server, Zap, Shield, BarChart3, Headphones, CheckCircle } from "lucide-react"

export const metadata = {
  title: "Web Hosting Services | Ian Iraya",
  description:
    "Reliable web hosting solutions with free tier available. Fast, secure, and scalable hosting for your websites and applications.",
  openGraph: {
    title: "Web Hosting Services | Ian Iraya",
    description: "Professional web hosting services with free tier options available.",
    url: "https://ianiraya.com/services/hosting",
  },
}

export default function HostingPage() {
  const features = [
    {
      icon: Zap,
      title: "Lightning Fast",
      description: "High-performance servers with SSD storage and CDN for blazing-fast load times.",
    },
    {
      icon: Shield,
      title: "Secure & Reliable",
      description: "SSL certificates, DDoS protection, and 99.9% uptime guarantee.",
    },
    {
      icon: Server,
      title: "Scalable Infrastructure",
      description: "Easily scale your resources as your website grows and traffic increases.",
    },
    {
      icon: BarChart3,
      title: "Analytics & Monitoring",
      description: "Real-time monitoring and detailed analytics to track your website performance.",
    },
    {
      icon: Headphones,
      title: "24/7 Support",
      description: "Expert support team available round-the-clock to help with any issues.",
    },
    {
      icon: CheckCircle,
      title: "Easy Management",
      description: "User-friendly control panel for managing your hosting and domains.",
    },
  ]

  const plans = [
    {
      name: "Starter",
      price: "Free",
      description: "Perfect for getting started",
      features: ["1 Website", "5 GB Storage", "Unlimited Bandwidth", "Free SSL Certificate", "Email Support"],
    },
    {
      name: "Professional",
      price: "$9.99",
      period: "/month",
      description: "For growing businesses",
      features: [
        "Unlimited Websites",
        "100 GB Storage",
        "Unlimited Bandwidth",
        "Free SSL Certificate",
        "Priority Support",
        "Daily Backups",
      ],
      highlighted: true,
    },
    {
      name: "Enterprise",
      price: "Custom",
      description: "For large-scale operations",
      features: [
        "Unlimited Everything",
        "Dedicated Resources",
        "Advanced Security",
        "24/7 Phone Support",
        "Custom Configuration",
        "SLA Guarantee",
      ],
    },
  ]

  const benefits = [
    "Get your website online quickly and easily",
    "No technical knowledge required",
    "Automatic backups and updates",
    "Free SSL certificates for security",
    "Excellent uptime and reliability",
    "Affordable pricing with free tier option",
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
              <h1 className="text-5xl sm:text-6xl font-bold text-balance leading-tight">Reliable Web Hosting</h1>
              <p className="text-xl text-muted-foreground max-w-3xl leading-relaxed">
                Fast, secure, and scalable hosting solutions for your websites and applications. Start free and upgrade
                as you grow.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <Link href="/contact">
                <Button size="lg" className="w-full sm:w-auto">
                  Get Started Free <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
              <Link href="/portfolio">
                <Button size="lg" variant="outline" className="w-full sm:w-auto bg-transparent">
                  View Hosted Sites
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-card/50">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16 space-y-4">
            <h2 className="text-4xl font-bold">Hosting Features</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Everything you need for a successful online presence
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((feature) => {
              const Icon = feature.icon
              return (
                <Card key={feature.title} className="p-6 hover:border-primary transition-colors">
                  <Icon className="h-12 w-12 text-primary mb-4" />
                  <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                  <p className="text-muted-foreground text-sm leading-relaxed">{feature.description}</p>
                </Card>
              )
            })}
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16 space-y-4">
            <h2 className="text-4xl font-bold">Hosting Plans</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Choose the perfect plan for your needs. Start free and upgrade anytime.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {plans.map((plan) => (
              <Card
                key={plan.name}
                className={`p-8 flex flex-col ${plan.highlighted ? "border-primary border-2 relative" : ""}`}
              >
                {plan.highlighted && (
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 bg-primary text-primary-foreground px-4 py-1 rounded-full text-sm font-semibold">
                    Most Popular
                  </div>
                )}

                <div className="mb-6">
                  <h3 className="text-2xl font-bold mb-2">{plan.name}</h3>
                  <p className="text-muted-foreground text-sm mb-4">{plan.description}</p>
                  <div className="flex items-baseline gap-1">
                    <span className="text-4xl font-bold">{plan.price}</span>
                    {plan.period && <span className="text-muted-foreground">{plan.period}</span>}
                  </div>
                </div>

                <ul className="space-y-3 mb-8 flex-grow">
                  {plan.features.map((feature) => (
                    <li key={feature} className="flex gap-2 items-start">
                      <CheckCircle className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                      <span className="text-sm">{feature}</span>
                    </li>
                  ))}
                </ul>

                <Link href="/contact" className="w-full">
                  <Button className="w-full" variant={plan.highlighted ? "default" : "outline"}>
                    Get Started
                  </Button>
                </Link>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-card/50">
        <div className="max-w-6xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <div className="space-y-4">
                <h2 className="text-4xl font-bold">Why Choose Our Hosting?</h2>
                <p className="text-lg text-muted-foreground leading-relaxed">
                  We provide reliable, affordable hosting with exceptional support and performance.
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
              <Server className="h-32 w-32 text-primary opacity-20" />
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-primary/10 to-accent/10 border-y border-border">
        <div className="max-w-4xl mx-auto text-center space-y-8">
          <div className="space-y-4">
            <h2 className="text-4xl font-bold">Ready to Host Your Website?</h2>
            <p className="text-lg text-muted-foreground">
              Start with our free tier and upgrade as your business grows. No credit card required.
            </p>
          </div>
          <Link href="/contact">
            <Button size="lg" className="px-8">
              Start Free Hosting <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </Link>
        </div>
      </section>

      <Footer />
    </main>
  )
}
