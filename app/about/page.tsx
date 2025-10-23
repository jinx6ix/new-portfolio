import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import Navigation from "@/components/navigation"
import Footer from "@/components/footer"
import { ArrowRight, Award, Briefcase, Code2, Heart, Zap } from "lucide-react"

export const metadata = {
  title: "About Ian Iraya | Web Developer, Cybersecurity Expert & SEO Manager",
  description:
    "Learn about Ian Iraya - a passionate web developer, cybersecurity expert, and SEO manager based in Kiambu, Kenya with 10+ years of experience.",
  openGraph: {
    title: "About Ian Iraya",
    description: "Discover the story behind the expertise and passion for digital solutions.",
    url: "https://ianiraya.com/about",
  },
}

export default function AboutPage() {
  const expertise = [
    {
      icon: Code2,
      title: "Web Development",
      description: "Full-stack development with modern frameworks and best practices.",
    },
    {
      icon: Zap,
      title: "Performance Optimization",
      description: "Creating lightning-fast applications that users love.",
    },
    {
      icon: Award,
      title: "Security First",
      description: "Building secure applications that protect user data.",
    },
  ]

  const timeline = [
    {
      year: "2014",
      title: "Started My Journey",
      description: "Began learning web development and fell in love with creating digital solutions.",
    },
    {
      year: "2016",
      title: "First Major Project",
      description: "Completed my first commercial web development project for a local business.",
    },
    {
      year: "2018",
      title: "Expanded to Cybersecurity",
      description: "Specialized in cybersecurity and started conducting security audits.",
    },
    {
      year: "2020",
      title: "SEO Expertise",
      description: "Added SEO management to my services, helping businesses dominate search rankings.",
    },
    {
      year: "2022",
      title: "30+ Projects Milestone",
      description: "Reached 30+ completed projects with 50+ satisfied clients.",
    },
    {
      year: "2024",
      title: "Industry Recognition",
      description: "Recognized as a leading digital expert in Kenya with 10+ years of experience.",
    },
  ]

  const values = [
    {
      icon: Heart,
      title: "Passion",
      description: "I'm passionate about creating digital solutions that make a real impact.",
    },
    {
      icon: Award,
      title: "Excellence",
      description: "I strive for excellence in every project, no matter the size.",
    },
    {
      icon: Briefcase,
      title: "Professionalism",
      description: "I maintain the highest standards of professionalism and integrity.",
    },
  ]

  const testimonials = [
    {
      name: "Sarah Johnson",
      role: "CEO, Tech Startup",
      content:
        "Ian transformed our website and helped us achieve top rankings. His expertise in both development and SEO is unmatched.",
      image: "/testimonial-1.jpg",
    },
    {
      name: "Michael Chen",
      role: "CTO, Fintech Company",
      content:
        "The security audit Ian conducted was thorough and professional. He identified critical vulnerabilities we didn't know existed.",
      image: "/testimonial-2.jpg",
    },
    {
      name: "Emma Williams",
      role: "Founder, E-Commerce Store",
      content:
        "Working with Ian was a game-changer for our business. Our sales increased 40% after the platform redesign.",
      image: "/testimonial-3.jpg",
    },
  ]

  return (
    <main className="min-h-screen bg-background">
      <Navigation />

      {/* Hero Section */}
      <section className="relative pt-20 pb-16 px-4 sm:px-6 lg:px-8 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-accent/5 pointer-events-none" />

        <div className="relative max-w-6xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <div className="space-y-4">
                <h1 className="text-5xl sm:text-6xl font-bold text-balance leading-tight">Hi, I'm Ian Iraya</h1>
                <p className="text-xl text-muted-foreground leading-relaxed">
                  A passionate web developer, cybersecurity expert, and SEO manager based in Kiambu, Kenya. I help
                  businesses build secure, high-performance digital solutions that drive real results.
                </p>
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                <Link href="/portfolio">
                  <Button size="lg" className="w-full sm:w-auto">
                    View My Work <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
                <Link href="/contact">
                  <Button size="lg" variant="outline" className="w-full sm:w-auto bg-transparent">
                    Get In Touch
                  </Button>
                </Link>
              </div>

              {/* Quick Stats */}
              <div className="grid grid-cols-3 gap-4 pt-8">
                <div className="space-y-1">
                  <p className="text-3xl font-bold text-accent">10+</p>
                  <p className="text-sm text-muted-foreground">Years Experience</p>
                </div>
                <div className="space-y-1">
                  <p className="text-3xl font-bold text-accent">30+</p>
                  <p className="text-sm text-muted-foreground">Projects Done</p>
                </div>
                <div className="space-y-1">
                  <p className="text-3xl font-bold text-accent">50+</p>
                  <p className="text-sm text-muted-foreground">Happy Clients</p>
                </div>
              </div>
            </div>

            {/* Profile Image */}
            <div className="relative h-96 lg:h-full rounded-lg overflow-hidden bg-gradient-to-br from-primary/20 to-accent/20 border border-border flex items-center justify-center">
              <img src="/profile-photo.jpg" alt="Ian Iraya" className="w-full h-full object-cover" />
            </div>
          </div>
        </div>
      </section>

      {/* Story Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-card/50">
        <div className="max-w-6xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="relative h-96 rounded-lg overflow-hidden bg-gradient-to-br from-primary/20 to-accent/20 border border-border flex items-center justify-center">
              <img src="/about-story.jpg" alt="My Story" className="w-full h-full object-cover" />
            </div>

            <div className="space-y-6">
              <div className="space-y-4">
                <h2 className="text-4xl font-bold">My Story</h2>
                <p className="text-lg text-muted-foreground leading-relaxed">
                  I started my journey in web development back in 2014 with a simple goal: to create digital solutions
                  that make a real impact. What began as a passion project quickly evolved into a full-fledged career.
                </p>
              </div>

              <p className="text-muted-foreground leading-relaxed">
                Over the years, I've expanded my expertise to include cybersecurity and SEO management. I've worked with
                startups, small businesses, and enterprises, helping them achieve their digital goals. Every project has
                taught me something new, and I'm committed to continuous learning and improvement.
              </p>

              <p className="text-muted-foreground leading-relaxed">
                Today, I'm proud to have completed 30+ projects for 50+ clients, with a 98% satisfaction rate. But
                numbers don't tell the whole story. What matters most to me is the impact I create for my clients and
                the relationships I build along the way.
              </p>

              <div className="pt-4">
                <Link href="/contact">
                  <Button size="lg">
                    Let's Work Together <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Expertise Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16 space-y-4">
            <h2 className="text-4xl font-bold">My Expertise</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              A unique combination of skills that allows me to deliver comprehensive digital solutions
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {expertise.map((item) => {
              const Icon = item.icon
              return (
                <Card key={item.title} className="p-8 text-center hover:border-primary transition-colors">
                  <Icon className="h-16 w-16 text-primary mx-auto mb-4" />
                  <h3 className="text-xl font-semibold mb-2">{item.title}</h3>
                  <p className="text-muted-foreground">{item.description}</p>
                </Card>
              )
            })}
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-card/50">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16 space-y-4">
            <h2 className="text-4xl font-bold">My Values</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              The principles that guide my work and relationships with clients
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {values.map((value) => {
              const Icon = value.icon
              return (
                <Card key={value.title} className="p-8 hover:border-primary transition-colors">
                  <Icon className="h-12 w-12 text-primary mb-4" />
                  <h3 className="text-xl font-semibold mb-2">{value.title}</h3>
                  <p className="text-muted-foreground">{value.description}</p>
                </Card>
              )
            })}
          </div>
        </div>
      </section>

      {/* Timeline Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16 space-y-4">
            <h2 className="text-4xl font-bold">My Journey</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">Key milestones in my professional career</p>
          </div>

          <div className="space-y-8">
            {timeline.map((item, index) => (
              <div key={item.year} className="flex gap-6">
                <div className="flex flex-col items-center">
                  <div className="w-12 h-12 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold">
                    {index + 1}
                  </div>
                  {index < timeline.length - 1 && <div className="w-1 h-24 bg-border mt-2" />}
                </div>

                <div className="pb-8">
                  <p className="text-sm font-semibold text-primary mb-1">{item.year}</p>
                  <h3 className="text-xl font-semibold mb-2">{item.title}</h3>
                  <p className="text-muted-foreground">{item.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-card/50">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16 space-y-4">
            <h2 className="text-4xl font-bold">What Clients Say</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Real feedback from real clients I've had the pleasure of working with
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {testimonials.map((testimonial) => (
              <Card key={testimonial.name} className="p-8 hover:border-primary transition-colors">
                <div className="flex items-center gap-4 mb-4">
                  <img
                    src={testimonial.image || "/placeholder.svg"}
                    alt={testimonial.name}
                    className="w-12 h-12 rounded-full object-cover"
                  />
                  <div>
                    <p className="font-semibold">{testimonial.name}</p>
                    <p className="text-sm text-muted-foreground">{testimonial.role}</p>
                  </div>
                </div>
                <p className="text-muted-foreground italic">"{testimonial.content}"</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Skills Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16 space-y-4">
            <h2 className="text-4xl font-bold">Technical Skills</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">Technologies and tools I work with</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="space-y-4">
              <h3 className="text-xl font-semibold">Frontend</h3>
              <div className="flex flex-wrap gap-2">
                {["React", "Next.js", "TypeScript", "Tailwind CSS", "HTML/CSS", "JavaScript"].map((skill) => (
                  <span key={skill} className="px-3 py-1 bg-primary/10 text-primary rounded-full text-sm">
                    {skill}
                  </span>
                ))}
              </div>
            </div>

            <div className="space-y-4">
              <h3 className="text-xl font-semibold">Backend</h3>
              <div className="flex flex-wrap gap-2">
                {["Node.js", "Express", "PostgreSQL", "MongoDB", "Supabase", "Docker"].map((skill) => (
                  <span key={skill} className="px-3 py-1 bg-primary/10 text-primary rounded-full text-sm">
                    {skill}
                  </span>
                ))}
              </div>
            </div>

            <div className="space-y-4">
              <h3 className="text-xl font-semibold">Other</h3>
              <div className="flex flex-wrap gap-2">
                {["AWS", "Vercel", "Git", "SEO", "Security", "Analytics"].map((skill) => (
                  <span key={skill} className="px-3 py-1 bg-primary/10 text-primary rounded-full text-sm">
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-primary/10 to-accent/10 border-y border-border">
        <div className="max-w-4xl mx-auto text-center space-y-8">
          <div className="space-y-4">
            <h2 className="text-4xl font-bold">Ready to Work Together?</h2>
            <p className="text-lg text-muted-foreground">
              Let's discuss your project and create something amazing together.
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
