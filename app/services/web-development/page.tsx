import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import Navigation from "@/components/navigation"
import Footer from "@/components/footer"
import { ArrowRight, Code2, Zap, Shield, Smartphone, Database, GitBranch } from "lucide-react"

export const metadata = {
  title: "Web Development Services | Ian Iraya",
  description:
    "Full-stack web development services using React, Next.js, Node.js, and modern technologies. Custom web applications, e-commerce solutions, and performance optimization.",
  openGraph: {
    title: "Web Development Services | Ian Iraya",
    description: "Professional web development services for custom applications and solutions.",
    url: "https://ianiraya.com/services/web-development",
  },
}

export default function WebDevelopmentPage() {
  const features = [
    {
      icon: Code2,
      title: "Full-Stack Development",
      description: "End-to-end web application development using modern frameworks and technologies.",
    },
    {
      icon: Smartphone,
      title: "Responsive Design",
      description: "Mobile-first approach ensuring perfect functionality across all devices.",
    },
    {
      icon: Zap,
      title: "Performance Optimization",
      description: "Lightning-fast load times and optimized user experience for better conversions.",
    },
    {
      icon: Database,
      title: "Database Design",
      description: "Scalable database architecture with proper indexing and query optimization.",
    },
    {
      icon: Shield,
      title: "Security First",
      description: "Built-in security best practices, encryption, and vulnerability protection.",
    },
    {
      icon: GitBranch,
      title: "Version Control",
      description: "Professional Git workflows and deployment pipelines for reliable releases.",
    },
  ]

  const process = [
    {
      step: "01",
      title: "Discovery & Planning",
      description: "Understanding your requirements, goals, and target audience to create a solid foundation.",
    },
    {
      step: "02",
      title: "Design & Prototyping",
      description: "Creating wireframes and interactive prototypes for your approval before development.",
    },
    {
      step: "03",
      title: "Development",
      description: "Building your application with clean, maintainable code and best practices.",
    },
    {
      step: "04",
      title: "Testing & QA",
      description: "Comprehensive testing to ensure functionality, performance, and security.",
    },
    {
      step: "05",
      title: "Deployment",
      description: "Smooth deployment to production with monitoring and support.",
    },
    {
      step: "06",
      title: "Maintenance & Support",
      description: "Ongoing support, updates, and improvements to keep your application running smoothly.",
    },
  ]

  const technologies = [
    "React",
    "Next.js",
    "TypeScript",
    "Node.js",
    "Express",
    "PostgreSQL",
    "MongoDB",
    "Tailwind CSS",
    "Docker",
    "AWS",
    "Vercel",
    "Git",
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
              <h1 className="text-5xl sm:text-6xl font-bold text-balance leading-tight">Full-Stack Web Development</h1>
              <p className="text-xl text-muted-foreground max-w-3xl leading-relaxed">
                Custom web applications built with modern technologies. From concept to deployment, I create scalable,
                secure, and high-performance solutions tailored to your business needs.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <Link href="/contact">
                <Button size="lg" className="w-full sm:w-auto">
                  Start Your Project <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
              <Link href="/portfolio">
                <Button size="lg" variant="outline" className="w-full sm:w-auto bg-transparent">
                  View Projects
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
            <h2 className="text-4xl font-bold">What I Offer</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Comprehensive web development services covering all aspects of modern application development
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

      {/* Process Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16 space-y-4">
            <h2 className="text-4xl font-bold">My Development Process</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              A structured approach to deliver quality results on time and within budget
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

      {/* Technologies Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-card/50">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16 space-y-4">
            <h2 className="text-4xl font-bold">Technologies & Tools</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              I work with the latest and most reliable technologies in the industry
            </p>
          </div>

          <div className="flex flex-wrap justify-center gap-4">
            {technologies.map((tech) => (
              <div
                key={tech}
                className="px-6 py-3 bg-background border border-border rounded-lg text-sm font-medium hover:border-primary transition-colors"
              >
                {tech}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-primary/10 to-accent/10 border-y border-border">
        <div className="max-w-4xl mx-auto text-center space-y-8">
          <div className="space-y-4">
            <h2 className="text-4xl font-bold">Ready to Build Your Next Project?</h2>
            <p className="text-lg text-muted-foreground">
              Let's discuss your requirements and create a custom solution that drives results.
            </p>
          </div>
          <Link href="/contact">
            <Button size="lg" className="px-8">
              Get Started <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </Link>
        </div>
      </section>

      <Footer />
    </main>
  )
}
