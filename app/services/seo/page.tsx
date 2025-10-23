import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import Navigation from "@/components/navigation"
import Footer from "@/components/footer"
import { ArrowRight, TrendingUp, Search, Zap, BarChart3, Link2, Lightbulb } from "lucide-react"

export const metadata = {
  title: "SEO Services | Ian Iraya",
  description:
    "Professional SEO services to improve search rankings and drive organic traffic. On-page optimization, technical SEO, link building, and content strategy.",
  openGraph: {
    title: "SEO Services | Ian Iraya",
    description: "Boost your search rankings and drive organic traffic with professional SEO services.",
    url: "https://ianiraya.com/services/seo",
  },
}

export default function SEOPage() {
  const services = [
    {
      icon: Search,
      title: "Keyword Research",
      description: "In-depth analysis to identify high-value keywords your target audience is searching for.",
    },
    {
      icon: Zap,
      title: "On-Page Optimization",
      description: "Optimize your content, meta tags, headings, and structure for better search visibility.",
    },
    {
      icon: BarChart3,
      title: "Technical SEO",
      description: "Fix crawl errors, improve site speed, and ensure proper indexing by search engines.",
    },
    {
      icon: Link2,
      title: "Link Building",
      description: "Strategic backlink acquisition to improve domain authority and search rankings.",
    },
    {
      icon: Lightbulb,
      title: "Content Strategy",
      description: "Create and optimize content that ranks well and converts visitors into customers.",
    },
    {
      icon: TrendingUp,
      title: "Analytics & Reporting",
      description: "Track performance with detailed reports and actionable insights for continuous improvement.",
    },
  ]

  const benefits = [
    "Increased organic traffic and visibility",
    "Higher search rankings for target keywords",
    "Better user experience and engagement",
    "Improved conversion rates",
    "Long-term sustainable growth",
    "Competitive advantage in your industry",
  ]

  const process = [
    {
      step: "01",
      title: "Audit & Analysis",
      description: "Comprehensive SEO audit to identify opportunities and issues.",
    },
    {
      step: "02",
      title: "Strategy Development",
      description: "Create a customized SEO strategy based on your goals and competition.",
    },
    {
      step: "03",
      title: "Implementation",
      description: "Execute on-page, technical, and content optimizations.",
    },
    {
      step: "04",
      title: "Link Building",
      description: "Acquire high-quality backlinks to improve authority.",
    },
    {
      step: "05",
      title: "Monitoring",
      description: "Track rankings, traffic, and performance metrics.",
    },
    {
      step: "06",
      title: "Optimization",
      description: "Continuously refine strategy based on data and results.",
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
              <h1 className="text-5xl sm:text-6xl font-bold text-balance leading-tight">SEO Management & Strategy</h1>
              <p className="text-xl text-muted-foreground max-w-3xl leading-relaxed">
                Dominate search rankings and drive organic traffic with comprehensive SEO strategies. From keyword
                research to link building, I'll help your business get found online.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <Link href="/contact">
                <Button size="lg" className="w-full sm:w-auto">
                  Get SEO Audit <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
              <Link href="/portfolio">
                <Button size="lg" variant="outline" className="w-full sm:w-auto bg-transparent">
                  View Results
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
            <h2 className="text-4xl font-bold">SEO Services</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Comprehensive SEO solutions to improve your search visibility and drive results
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
            <div className="relative h-96 rounded-lg overflow-hidden bg-gradient-to-br from-primary/20 to-accent/20 border border-border flex items-center justify-center">
              <TrendingUp className="h-32 w-32 text-primary opacity-20" />
            </div>

            <div className="space-y-6">
              <div className="space-y-4">
                <h2 className="text-4xl font-bold">Why SEO Matters</h2>
                <p className="text-lg text-muted-foreground leading-relaxed">
                  SEO is the foundation of digital marketing. Get found by customers actively searching for your
                  products and services.
                </p>
              </div>

              <ul className="space-y-4">
                {benefits.map((benefit) => (
                  <li key={benefit} className="flex gap-3 items-start">
                    <TrendingUp className="h-6 w-6 text-primary flex-shrink-0 mt-0.5" />
                    <span className="text-muted-foreground">{benefit}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-card/50">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16 space-y-4">
            <h2 className="text-4xl font-bold">Our SEO Process</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              A data-driven approach to improving your search rankings and organic traffic
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
            <h2 className="text-4xl font-bold">Ready to Dominate Search Rankings?</h2>
            <p className="text-lg text-muted-foreground">
              Let's create an SEO strategy that drives organic traffic and grows your business.
            </p>
          </div>
          <Link href="/contact">
            <Button size="lg" className="px-8">
              Start SEO Strategy <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </Link>
        </div>
      </section>

      <Footer />
    </main>
  )
}
