"use client"

import Link from "next/link"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import Navigation from "@/components/navigation"
import Footer from "@/components/footer"
import { ArrowRight, ExternalLink, Code2, Shield, TrendingUp } from "lucide-react"

export default function PortfolioPage() {
  const [activeCategory, setActiveCategory] = useState("all")

  const projects = [
    {
      id: 1,
      title: "E-Commerce Platform",
      category: "web-development",
      description:
        "Full-stack e-commerce platform with payment integration, inventory management, and admin dashboard.",
      image: "/ecommerce-dashboard.png",
      technologies: ["Next.js", "React", "Node.js", "PostgreSQL", "Stripe"],
      results: ["40% increase in sales", "50% faster checkout", "99.9% uptime"],
      link: "/portfolio/ecommerce-platform",
    },
    {
      id: 2,
      title: "Security Audit Report",
      category: "cybersecurity",
      description:
        "Comprehensive security audit for a fintech company identifying 25+ vulnerabilities and providing remediation steps.",
      image: "/security-audit-report-dashboard.jpg",
      technologies: ["Penetration Testing", "OWASP", "Security Analysis"],
      results: ["25+ vulnerabilities identified", "100% remediation rate", "ISO 27001 compliant"],
      link: "/portfolio/security-audit",
    },
    {
      id: 3,
      title: "SaaS Application",
      category: "web-development",
      description: "Multi-tenant SaaS platform with user authentication, subscription management, and analytics.",
      image: "/saas-application-interface.jpg",
      technologies: ["Next.js", "TypeScript", "Supabase", "Stripe", "Vercel"],
      results: ["500+ active users", "95% retention rate", "$50k MRR"],
      link: "/portfolio/saas-application",
    },
    {
      id: 4,
      title: "SEO Campaign - Tech Startup",
      category: "seo",
      description:
        "Comprehensive SEO strategy resulting in 300% organic traffic increase and top 3 rankings for target keywords.",
      image: "/seo-analytics-growth-chart.jpg",
      technologies: ["Keyword Research", "Content Strategy", "Link Building", "Technical SEO"],
      results: ["300% traffic increase", "Top 3 rankings", "50+ qualified leads/month"],
      link: "/portfolio/seo-campaign-tech",
    },
    {
      id: 5,
      title: "Mobile App Security",
      category: "cybersecurity",
      description: "Security assessment and hardening of a mobile banking application with encryption implementation.",
      image: "/mobile-app-security.png",
      technologies: ["Mobile Security", "Encryption", "API Security", "Compliance"],
      results: ["Zero vulnerabilities", "PCI-DSS compliant", "Enhanced user trust"],
      link: "/portfolio/mobile-app-security",
    },
    {
      id: 6,
      title: "Corporate Website Redesign",
      category: "web-development",
      description: "Complete website redesign with modern UI/UX, improved performance, and SEO optimization.",
      image: "/corporate-website-design.png",
      technologies: ["Next.js", "Tailwind CSS", "Headless CMS", "Analytics"],
      results: ["60% faster load time", "3x more leads", "95 Lighthouse score"],
      link: "/portfolio/corporate-website",
    },
    {
      id: 7,
      title: "E-Learning Platform SEO",
      category: "seo",
      description: "SEO optimization for online learning platform increasing organic enrollment by 250%.",
      image: "/elearning-platform.png",
      technologies: ["Technical SEO", "Content Optimization", "Schema Markup"],
      results: ["250% enrollment increase", "1000+ organic visitors/day", "Top rankings"],
      link: "/portfolio/elearning-seo",
    },
    {
      id: 8,
      title: "Infrastructure Security",
      category: "cybersecurity",
      description: "Cloud infrastructure security assessment and implementation of security best practices.",
      image: "/cloud-infrastructure-security.jpg",
      technologies: ["AWS Security", "Infrastructure Hardening", "Compliance"],
      results: ["100% compliance", "Zero breaches", "Reduced risk by 80%"],
      link: "/portfolio/infrastructure-security",
    },
  ]

  const categories = [
    { id: "all", label: "All Projects" },
    { id: "web-development", label: "Web Development", icon: Code2 },
    { id: "cybersecurity", label: "Cybersecurity", icon: Shield },
    { id: "seo", label: "SEO", icon: TrendingUp },
  ]

  const filteredProjects = activeCategory === "all" ? projects : projects.filter((p) => p.category === activeCategory)

  return (
    <main className="min-h-screen bg-background">
      <Navigation />

      {/* Hero Section */}
      <section className="relative pt-20 pb-16 px-4 sm:px-6 lg:px-8 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-accent/5 pointer-events-none" />

        <div className="relative max-w-6xl mx-auto">
          <div className="space-y-6">
            <div className="space-y-4">
              <h1 className="text-5xl sm:text-6xl font-bold text-balance leading-tight">Portfolio & Projects</h1>
              <p className="text-xl text-muted-foreground max-w-3xl leading-relaxed">
                Showcase of successful projects across web development, cybersecurity, and SEO. See how I've helped
                businesses achieve their goals.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Filter Section */}
      <section className="py-12 px-4 sm:px-6 lg:px-8 bg-card/50 sticky top-16 z-40">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-wrap gap-3 justify-center">
            {categories.map((category) => {
              const Icon = category.icon
              return (
                <button
                  key={category.id}
                  onClick={() => setActiveCategory(category.id)}
                  className={`px-6 py-2 rounded-lg font-medium transition-all flex items-center gap-2 ${
                    activeCategory === category.id
                      ? "bg-primary text-primary-foreground"
                      : "bg-background border border-border text-muted-foreground hover:border-primary"
                  }`}
                >
                  {Icon && <Icon className="h-4 w-4" />}
                  {category.label}
                </button>
              )
            })}
          </div>
        </div>
      </section>

      {/* Projects Grid */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredProjects.map((project) => (
              <Link key={project.id} href={project.link}>
                <Card className="h-full overflow-hidden hover:border-primary transition-all hover:shadow-lg group cursor-pointer">
                  {/* Project Image */}
                  <div className="relative h-48 bg-gradient-to-br from-primary/20 to-accent/20 overflow-hidden">
                    <img
                      src={project.image || "/placeholder.svg"}
                      alt={project.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>

                  {/* Project Content */}
                  <div className="p-6 space-y-4">
                    <div className="space-y-2">
                      <h3 className="text-xl font-semibold group-hover:text-primary transition-colors">
                        {project.title}
                      </h3>
                      <p className="text-sm text-muted-foreground leading-relaxed">{project.description}</p>
                    </div>

                    {/* Technologies */}
                    <div className="flex flex-wrap gap-2">
                      {project.technologies.slice(0, 3).map((tech) => (
                        <span key={tech} className="text-xs bg-primary/10 text-primary px-2 py-1 rounded">
                          {tech}
                        </span>
                      ))}
                      {project.technologies.length > 3 && (
                        <span className="text-xs bg-primary/10 text-primary px-2 py-1 rounded">
                          +{project.technologies.length - 3}
                        </span>
                      )}
                    </div>

                    {/* Results */}
                    <div className="space-y-2 pt-2 border-t border-border">
                      <p className="text-xs font-semibold text-muted-foreground">Key Results:</p>
                      <ul className="space-y-1">
                        {project.results.slice(0, 2).map((result) => (
                          <li key={result} className="text-xs text-muted-foreground flex items-start gap-2">
                            <span className="text-primary mt-1">•</span>
                            {result}
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* View Details Link */}
                    <div className="flex items-center gap-2 text-primary text-sm font-medium group-hover:gap-3 transition-all">
                      View Details <ExternalLink className="h-4 w-4" />
                    </div>
                  </div>
                </Card>
              </Link>
            ))}
          </div>

          {filteredProjects.length === 0 && (
            <div className="text-center py-12">
              <p className="text-muted-foreground text-lg">No projects found in this category.</p>
            </div>
          )}
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-card/50">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-4 gap-8 text-center">
            <div className="space-y-2">
              <p className="text-4xl font-bold text-primary">30+</p>
              <p className="text-muted-foreground">Projects Completed</p>
            </div>
            <div className="space-y-2">
              <p className="text-4xl font-bold text-primary">50+</p>
              <p className="text-muted-foreground">Clients Served</p>
            </div>
            <div className="space-y-2">
              <p className="text-4xl font-bold text-primary">10+</p>
              <p className="text-muted-foreground">Years Experience</p>
            </div>
            <div className="space-y-2">
              <p className="text-4xl font-bold text-primary">98%</p>
              <p className="text-muted-foreground">Client Satisfaction</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-primary/10 to-accent/10 border-y border-border">
        <div className="max-w-4xl mx-auto text-center space-y-8">
          <div className="space-y-4">
            <h2 className="text-4xl font-bold">Ready to Start Your Project?</h2>
            <p className="text-lg text-muted-foreground">
              Let's discuss your requirements and create something amazing together.
            </p>
          </div>
          <Link href="/contact">
            <Button size="lg" className="px-8">
              Get In Touch <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </Link>
        </div>
      </section>

      <Footer />
    </main>
  )
}
