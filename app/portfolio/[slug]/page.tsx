import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import Navigation from "@/components/navigation"
import Footer from "@/components/footer"
import { ArrowLeft, ArrowRight, ExternalLink, Github } from "lucide-react"

// Sample project details - in a real app, this would come from a database
const projectDetails: Record<
  string,
  {
    title: string
    category: string
    description: string
    fullDescription: string
    image: string
    technologies: string[]
    results: string[]
    challenge: string
    solution: string
    outcome: string
    liveUrl?: string
    githubUrl?: string
  }
> = {
  "ecommerce-platform": {
    title: "E-Commerce Platform",
    category: "Web Development",
    description: "Full-stack e-commerce platform with payment integration, inventory management, and admin dashboard.",
    fullDescription:
      "A complete e-commerce solution built with modern technologies, featuring a responsive storefront, secure payment processing, real-time inventory management, and a comprehensive admin dashboard for business operations.",
    image: "/ecommerce-platform-concept.png",
    technologies: ["Next.js", "React", "Node.js", "PostgreSQL", "Stripe", "Tailwind CSS", "Docker"],
    results: ["40% increase in sales", "50% faster checkout", "99.9% uptime", "10,000+ monthly users"],
    challenge:
      "The client needed a scalable e-commerce platform that could handle high traffic during peak seasons while maintaining fast performance and secure payment processing.",
    solution:
      "Built a modern full-stack application using Next.js for the frontend and Node.js for the backend, with PostgreSQL for data management. Implemented Stripe for secure payments, Redis for caching, and deployed on Vercel for optimal performance.",
    outcome:
      "The platform successfully launched and exceeded expectations with 40% sales increase in the first quarter, 50% faster checkout times, and maintained 99.9% uptime throughout peak seasons.",
    liveUrl: "https://example-ecommerce.com",
    githubUrl: "https://github.com/ianiraya/ecommerce-platform",
  },
  "security-audit": {
    title: "Security Audit Report",
    category: "Cybersecurity",
    description:
      "Comprehensive security audit for a fintech company identifying 25+ vulnerabilities and providing remediation steps.",
    fullDescription:
      "A thorough security assessment of a fintech company's infrastructure, applications, and processes, resulting in a detailed report with 25+ identified vulnerabilities and a comprehensive remediation roadmap.",
    image: "/security-audit.png",
    technologies: ["Penetration Testing", "OWASP", "Security Analysis", "Compliance Auditing"],
    results: [
      "25+ vulnerabilities identified",
      "100% remediation rate",
      "ISO 27001 compliant",
      "Zero breaches post-audit",
    ],
    challenge:
      "The fintech company needed to ensure their systems met regulatory requirements and were protected against modern security threats.",
    solution:
      "Conducted comprehensive penetration testing, vulnerability scanning, and security code review. Provided detailed documentation of findings with prioritized remediation steps and compliance recommendations.",
    outcome:
      "All identified vulnerabilities were remediated, the company achieved ISO 27001 compliance, and implemented ongoing security monitoring to prevent future issues.",
  },
  "saas-application": {
    title: "SaaS Application",
    category: "Web Development",
    description: "Multi-tenant SaaS platform with user authentication, subscription management, and analytics.",
    fullDescription:
      "A scalable SaaS platform designed for businesses to manage their operations with real-time collaboration, advanced analytics, and flexible subscription management.",
    image: "/saas-application.jpg",
    technologies: ["Next.js", "TypeScript", "Supabase", "Stripe", "Vercel", "Tailwind CSS"],
    results: ["500+ active users", "95% retention rate", "$50k MRR", "4.8/5 user rating"],
    challenge:
      "Create a multi-tenant SaaS platform that could scale efficiently while providing a seamless user experience and reliable subscription management.",
    solution:
      "Built with Next.js and TypeScript for type safety, Supabase for backend services, and Stripe for subscription management. Implemented real-time features using WebSockets and optimized for performance.",
    outcome:
      "Successfully launched with 500+ active users, achieved 95% retention rate, and generated $50k in monthly recurring revenue within the first year.",
    liveUrl: "https://example-saas.com",
  },
  "seo-campaign-tech": {
    title: "SEO Campaign - Tech Startup",
    category: "SEO",
    description:
      "Comprehensive SEO strategy resulting in 300% organic traffic increase and top 3 rankings for target keywords.",
    fullDescription:
      "A comprehensive SEO campaign for a tech startup that included keyword research, content strategy, technical SEO optimization, and link building, resulting in significant organic growth.",
    image: "/seo-analytics.jpg",
    technologies: ["Keyword Research", "Content Strategy", "Link Building", "Technical SEO", "Analytics"],
    results: ["300% traffic increase", "Top 3 rankings", "50+ qualified leads/month", "200% ROI"],
    challenge:
      "The startup needed to increase organic visibility and generate qualified leads in a competitive market with limited budget.",
    solution:
      "Developed a comprehensive SEO strategy focusing on high-intent keywords, created valuable content, optimized technical aspects, and built quality backlinks through strategic partnerships.",
    outcome:
      "Achieved 300% organic traffic increase, secured top 3 rankings for 15+ target keywords, and generated 50+ qualified leads monthly with 200% ROI.",
  },
  "mobile-app-security": {
    title: "Mobile App Security",
    category: "Cybersecurity",
    description: "Security assessment and hardening of a mobile banking application with encryption implementation.",
    fullDescription:
      "A comprehensive security assessment and hardening of a mobile banking application, including encryption implementation, API security, and compliance verification.",
    image: "/mobile-security.png",
    technologies: ["Mobile Security", "Encryption", "API Security", "Compliance", "Penetration Testing"],
    results: ["Zero vulnerabilities", "PCI-DSS compliant", "Enhanced user trust", "Reduced security incidents by 100%"],
    challenge:
      "Ensure a mobile banking application met strict security and compliance requirements while maintaining excellent user experience.",
    solution:
      "Conducted thorough security assessment, implemented end-to-end encryption, secured APIs, and ensured PCI-DSS compliance through comprehensive security hardening.",
    outcome:
      "Achieved zero vulnerabilities, obtained PCI-DSS compliance certification, and significantly enhanced user trust and confidence in the application.",
  },
  "corporate-website": {
    title: "Corporate Website Redesign",
    category: "Web Development",
    description: "Complete website redesign with modern UI/UX, improved performance, and SEO optimization.",
    fullDescription:
      "A complete redesign of a corporate website featuring modern UI/UX, significantly improved performance, and comprehensive SEO optimization.",
    image: "/corporate-website.png",
    technologies: ["Next.js", "Tailwind CSS", "Headless CMS", "Analytics", "SEO"],
    results: ["60% faster load time", "3x more leads", "95 Lighthouse score", "50% bounce rate reduction"],
    challenge: "The company's outdated website was slow, not mobile-friendly, and not generating sufficient leads.",
    solution:
      "Redesigned with modern technologies, optimized performance, implemented SEO best practices, and created a mobile-first responsive design.",
    outcome:
      "Achieved 60% faster load times, 3x increase in leads, 95 Lighthouse score, and 50% reduction in bounce rate.",
    liveUrl: "https://example-corporate.com",
  },
  "elearning-seo": {
    title: "E-Learning Platform SEO",
    category: "SEO",
    description: "SEO optimization for online learning platform increasing organic enrollment by 250%.",
    fullDescription:
      "A comprehensive SEO optimization project for an online learning platform that resulted in significant organic growth and enrollment increase.",
    image: "/elearning.jpg",
    technologies: ["Technical SEO", "Content Optimization", "Schema Markup", "Analytics"],
    results: ["250% enrollment increase", "1000+ organic visitors/day", "Top rankings", "5x course sales"],
    challenge:
      "The e-learning platform needed to increase organic visibility and attract more students through search engines.",
    solution:
      "Implemented technical SEO improvements, optimized course content for search, added schema markup, and built quality backlinks.",
    outcome:
      "Achieved 250% enrollment increase, 1000+ organic visitors daily, and 5x increase in course sales within 6 months.",
  },
  "infrastructure-security": {
    title: "Infrastructure Security",
    category: "Cybersecurity",
    description: "Cloud infrastructure security assessment and implementation of security best practices.",
    fullDescription:
      "A comprehensive cloud infrastructure security assessment and hardening project for a large enterprise.",
    image: "/cloud-security-concept.png",
    technologies: ["AWS Security", "Infrastructure Hardening", "Compliance", "Monitoring"],
    results: ["100% compliance", "Zero breaches", "Reduced risk by 80%", "Improved incident response time"],
    challenge:
      "Ensure enterprise cloud infrastructure met compliance requirements and was protected against advanced threats.",
    solution:
      "Conducted security assessment, implemented AWS security best practices, configured monitoring and alerting, and established incident response procedures.",
    outcome:
      "Achieved 100% compliance, eliminated security vulnerabilities, reduced risk by 80%, and improved incident response capabilities.",
  },
}

export default function ProjectDetailPage({ params }: { params: { slug: string } }) {
  const project = projectDetails[params.slug]

  if (!project) {
    return (
      <main className="min-h-screen bg-background">
        <Navigation />
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-20 text-center">
          <h1 className="text-4xl font-bold mb-4">Project Not Found</h1>
          <p className="text-muted-foreground mb-8">The project you're looking for doesn't exist.</p>
          <Link href="/portfolio">
            <Button>Back to Portfolio</Button>
          </Link>
        </div>
        <Footer />
      </main>
    )
  }

  return (
    <main className="min-h-screen bg-background">
      <Navigation />

      {/* Hero Section */}
      <section className="relative pt-20 pb-16 px-4 sm:px-6 lg:px-8 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-accent/5 pointer-events-none" />

        <div className="relative max-w-6xl mx-auto">
          <Link href="/portfolio" className="inline-flex items-center gap-2 text-primary hover:text-accent mb-6">
            <ArrowLeft className="h-4 w-4" />
            Back to Portfolio
          </Link>

          <div className="space-y-6">
            <div className="space-y-4">
              <p className="text-sm font-semibold text-primary uppercase">{project.category}</p>
              <h1 className="text-5xl sm:text-6xl font-bold text-balance leading-tight">{project.title}</h1>
              <p className="text-xl text-muted-foreground max-w-3xl leading-relaxed">{project.fullDescription}</p>
            </div>

            <div className="flex flex-wrap gap-3">
              {project.liveUrl && (
                <a href={project.liveUrl} target="_blank" rel="noopener noreferrer">
                  <Button size="lg" className="gap-2">
                    View Live <ExternalLink className="h-4 w-4" />
                  </Button>
                </a>
              )}
              {project.githubUrl && (
                <a href={project.githubUrl} target="_blank" rel="noopener noreferrer">
                  <Button size="lg" variant="outline" className="gap-2 bg-transparent">
                    View Code <Github className="h-4 w-4" />
                  </Button>
                </a>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Project Image */}
      <section className="px-4 sm:px-6 lg:px-8 pb-20">
        <div className="max-w-6xl mx-auto">
          <div className="relative h-96 sm:h-[500px] rounded-lg overflow-hidden bg-gradient-to-br from-primary/20 to-accent/20 border border-border">
            <img src={project.image || "/placeholder.svg"} alt={project.title} className="w-full h-full object-cover" />
          </div>
        </div>
      </section>

      {/* Project Details */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-card/50">
        <div className="max-w-6xl mx-auto">
          <div className="grid lg:grid-cols-3 gap-12">
            {/* Main Content */}
            <div className="lg:col-span-2 space-y-12">
              {/* Challenge */}
              <div className="space-y-4">
                <h2 className="text-3xl font-bold">The Challenge</h2>
                <p className="text-muted-foreground leading-relaxed">{project.challenge}</p>
              </div>

              {/* Solution */}
              <div className="space-y-4">
                <h2 className="text-3xl font-bold">The Solution</h2>
                <p className="text-muted-foreground leading-relaxed">{project.solution}</p>
              </div>

              {/* Outcome */}
              <div className="space-y-4">
                <h2 className="text-3xl font-bold">The Outcome</h2>
                <p className="text-muted-foreground leading-relaxed">{project.outcome}</p>
              </div>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Technologies */}
              <Card className="p-6">
                <h3 className="text-lg font-semibold mb-4">Technologies Used</h3>
                <div className="flex flex-wrap gap-2">
                  {project.technologies.map((tech) => (
                    <span key={tech} className="text-xs bg-primary/10 text-primary px-3 py-1 rounded-full">
                      {tech}
                    </span>
                  ))}
                </div>
              </Card>

              {/* Results */}
              <Card className="p-6">
                <h3 className="text-lg font-semibold mb-4">Key Results</h3>
                <ul className="space-y-3">
                  {project.results.map((result) => (
                    <li key={result} className="flex gap-3 items-start">
                      <span className="text-primary font-bold mt-1">✓</span>
                      <span className="text-sm text-muted-foreground">{result}</span>
                    </li>
                  ))}
                </ul>
              </Card>
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
              Let's discuss how I can help achieve similar results for your business.
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
