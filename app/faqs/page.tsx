"use client"

import Link from "next/link"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import Navigation from "@/components/navigation"
import Footer from "@/components/footer"
import { ArrowRight, Search, HelpCircle } from "lucide-react"

export default function FAQsPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [activeCategory, setActiveCategory] = useState("all")

  const faqCategories = [
    { id: "all", label: "All Questions" },
    { id: "general", label: "General" },
    { id: "web-development", label: "Web Development" },
    { id: "cybersecurity", label: "Cybersecurity" },
    { id: "seo", label: "SEO" },
    { id: "hosting", label: "Hosting" },
  ]

  const faqs = [
    {
      category: "general",
      question: "What services do you offer?",
      answer:
        "I offer comprehensive digital services including web development, cybersecurity consulting, SEO management, and web hosting. Each service is tailored to meet your specific business needs.",
    },
    {
      category: "general",
      question: "How long have you been in business?",
      answer:
        "I have over 10 years of experience in web development, cybersecurity, and digital marketing. I've successfully completed 30+ projects for 50+ clients with a 98% satisfaction rate.",
    },
    {
      category: "general",
      question: "What is your pricing model?",
      answer:
        "Pricing varies based on project scope and complexity. I offer flexible pricing models including fixed-price projects, hourly rates, and retainer agreements. Contact me for a custom quote.",
    },
    {
      category: "general",
      question: "Do you offer free consultations?",
      answer:
        "Yes, I offer free initial consultations to discuss your project requirements and provide recommendations. Contact me to schedule a consultation.",
    },
    {
      category: "general",
      question: "What is your typical project timeline?",
      answer:
        "Project timelines vary based on scope and complexity. Small projects typically take 2-4 weeks, while larger projects may take 2-3 months. I'll provide a detailed timeline during the consultation.",
    },
    {
      category: "general",
      question: "Do you provide ongoing support after project completion?",
      answer:
        "Yes, I offer ongoing support and maintenance packages. I can help with updates, bug fixes, performance optimization, and feature additions.",
    },
    {
      category: "web-development",
      question: "What technologies do you use for web development?",
      answer:
        "I primarily work with modern technologies including React, Next.js, TypeScript, Node.js, PostgreSQL, and MongoDB. I choose the best technology stack based on your project requirements.",
    },
    {
      category: "web-development",
      question: "Do you build mobile applications?",
      answer:
        "I specialize in web development and responsive web applications that work seamlessly on mobile devices. For native mobile apps, I can recommend trusted partners.",
    },
    {
      category: "web-development",
      question: "Can you help with website redesigns?",
      answer:
        "I can help redesign your existing website to improve user experience, performance, and SEO. I'll ensure a smooth transition with minimal downtime.",
    },
    {
      category: "web-development",
      question: "Do you provide website hosting?",
      answer:
        "Yes, I offer reliable web hosting services with free tier options available. I can host your website on secure, high-performance servers with 99.9% uptime guarantee.",
    },
    {
      category: "web-development",
      question: "How do you ensure website performance?",
      answer:
        "I implement performance optimization techniques including code splitting, lazy loading, caching, CDN integration, and database optimization. I regularly monitor and optimize performance.",
    },
    {
      category: "cybersecurity",
      question: "What is a security audit?",
      answer:
        "A security audit is a comprehensive review of your systems, applications, and infrastructure to identify vulnerabilities and security weaknesses. I provide detailed reports with remediation recommendations.",
    },
    {
      category: "cybersecurity",
      question: "What is penetration testing?",
      answer:
        "Penetration testing is a simulated attack on your systems to identify security vulnerabilities before attackers do. It helps you understand your security posture and improve defenses.",
    },
    {
      category: "cybersecurity",
      question: "How often should I conduct security audits?",
      answer:
        "I recommend conducting security audits at least annually, or whenever you make significant changes to your systems. High-risk environments may require more frequent audits.",
    },
    {
      category: "cybersecurity",
      question: "What compliance standards do you work with?",
      answer:
        "I have experience with various compliance standards including GDPR, HIPAA, PCI-DSS, ISO 27001, and SOC 2. I can help ensure your systems meet regulatory requirements.",
    },
    {
      category: "cybersecurity",
      question: "Can you help with incident response?",
      answer:
        "Yes, I provide incident response services to help you quickly identify, contain, and recover from security incidents. I also help implement preventive measures to avoid future incidents.",
    },
    {
      category: "seo",
      question: "How long does it take to see SEO results?",
      answer:
        "SEO is a long-term strategy. You may see initial improvements within 3-6 months, but significant results typically take 6-12 months. Results depend on competition and current website state.",
    },
    {
      category: "seo",
      question: "What is included in your SEO services?",
      answer:
        "My SEO services include keyword research, on-page optimization, technical SEO, content strategy, link building, and performance monitoring. I provide detailed monthly reports.",
    },
    {
      category: "seo",
      question: "Do you guarantee top rankings?",
      answer:
        "No one can guarantee top rankings. However, I use proven strategies and best practices to improve your rankings. I focus on sustainable, long-term growth rather than quick fixes.",
    },
    {
      category: "seo",
      question: "How do you measure SEO success?",
      answer:
        "I track key metrics including search rankings, organic traffic, click-through rates, conversion rates, and ROI. I provide detailed monthly reports with actionable insights.",
    },
    {
      category: "seo",
      question: "Can you help with local SEO?",
      answer:
        "Yes, I specialize in local SEO to help businesses improve visibility in local search results. This includes Google My Business optimization, local citations, and location-based content.",
    },
    {
      category: "hosting",
      question: "What hosting options do you offer?",
      answer:
        "I offer flexible hosting options including a free tier for getting started, professional plans for growing businesses, and enterprise solutions for large-scale operations.",
    },
    {
      category: "hosting",
      question: "Is your hosting secure?",
      answer:
        "Yes, security is a priority. I provide SSL certificates, DDoS protection, regular backups, and security monitoring. All hosting includes industry-standard security measures.",
    },
    {
      category: "hosting",
      question: "Can I upgrade my hosting plan later?",
      answer:
        "You can upgrade your hosting plan anytime as your website grows. There's no long-term contract, and you can scale resources as needed.",
    },
    {
      category: "hosting",
      question: "What is your uptime guarantee?",
      answer:
        "I guarantee 99.9% uptime for all hosting plans. If uptime falls below this, you'll receive service credits. I maintain redundant systems to ensure reliability.",
    },
    {
      category: "hosting",
      question: "Do you provide email hosting?",
      answer:
        "Yes, professional email hosting is included with most hosting plans. You can create custom email addresses using your domain name.",
    },
  ]

  const filteredFaqs = faqs.filter((faq) => {
    const matchesCategory = activeCategory === "all" || faq.category === activeCategory
    const matchesSearch =
      faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
      faq.answer.toLowerCase().includes(searchQuery.toLowerCase())
    return matchesCategory && matchesSearch
  })

  return (
    <main className="min-h-screen bg-background">
      <Navigation />

      {/* Hero Section */}
      <section className="relative pt-20 pb-16 px-4 sm:px-6 lg:px-8 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-accent/5 pointer-events-none" />

        <div className="relative max-w-6xl mx-auto">
          <div className="space-y-6">
            <div className="space-y-4">
              <h1 className="text-5xl sm:text-6xl font-bold text-balance leading-tight">Frequently Asked Questions</h1>
              <p className="text-xl text-muted-foreground max-w-3xl leading-relaxed">
                Find answers to common questions about my services, pricing, and processes. Can't find what you're
                looking for? Feel free to contact me directly.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Search Section */}
      <section className="py-12 px-4 sm:px-6 lg:px-8 bg-card/50 sticky top-16 z-40">
        <div className="max-w-6xl mx-auto space-y-6">
          {/* Search Bar */}
          <div className="relative">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-muted-foreground" />
            <input
              type="text"
              placeholder="Search FAQs..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-12 pr-4 py-3 bg-background border border-border rounded-lg focus:outline-none focus:border-primary transition-colors"
            />
          </div>

          {/* Category Filter */}
          <div className="flex flex-wrap gap-3">
            {faqCategories.map((category) => (
              <button
                key={category.id}
                onClick={() => setActiveCategory(category.id)}
                className={`px-6 py-2 rounded-lg font-medium transition-all ${
                  activeCategory === category.id
                    ? "bg-primary text-primary-foreground"
                    : "bg-background border border-border text-muted-foreground hover:border-primary"
                }`}
              >
                {category.label}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* FAQs Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          {filteredFaqs.length > 0 ? (
            <Accordion type="single" collapsible className="space-y-4">
              {filteredFaqs.map((faq, index) => (
                <Card key={index} className="border">
                  <AccordionItem value={`item-${index}`} className="border-0">
                    <AccordionTrigger className="px-6 py-4 hover:no-underline hover:bg-card/50 transition-colors">
                      <div className="flex items-start gap-4 text-left">
                        <HelpCircle className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                        <span className="font-semibold text-lg">{faq.question}</span>
                      </div>
                    </AccordionTrigger>
                    <AccordionContent className="px-6 pb-4 pt-0">
                      <div className="ml-9 text-muted-foreground leading-relaxed">{faq.answer}</div>
                    </AccordionContent>
                  </AccordionItem>
                </Card>
              ))}
            </Accordion>
          ) : (
            <div className="text-center py-12">
              <p className="text-muted-foreground text-lg">No FAQs found matching your search.</p>
            </div>
          )}
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-card/50">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-3 gap-8 text-center">
            <div className="space-y-2">
              <p className="text-4xl font-bold text-primary">25+</p>
              <p className="text-muted-foreground">Common Questions Answered</p>
            </div>
            <div className="space-y-2">
              <p className="text-4xl font-bold text-primary">98%</p>
              <p className="text-muted-foreground">Client Satisfaction Rate</p>
            </div>
            <div className="space-y-2">
              <p className="text-4xl font-bold text-primary">24/7</p>
              <p className="text-muted-foreground">Support Available</p>
            </div>
          </div>
        </div>
      </section>

      {/* Still Have Questions Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <Card className="p-8 sm:p-12 border-primary/20 bg-gradient-to-br from-primary/5 to-accent/5">
            <div className="space-y-6 text-center">
              <div className="space-y-4">
                <h2 className="text-4xl font-bold">Still Have Questions?</h2>
                <p className="text-lg text-muted-foreground">
                  Can't find the answer you're looking for? I'm here to help. Reach out and I'll get back to you as soon
                  as possible.
                </p>
              </div>

              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link href="/contact">
                  <Button size="lg" className="px-8">
                    Contact Me <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
                <a href="mailto:ian@ianiraya.com">
                  <Button size="lg" variant="outline" className="px-8 bg-transparent">
                    Email Me
                  </Button>
                </a>
              </div>
            </div>
          </Card>
        </div>
      </section>

      {/* Related Resources Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-card/50">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12 space-y-4">
            <h2 className="text-4xl font-bold">Related Resources</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Explore more information about my services and expertise
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            <Link href="/services">
              <Card className="p-6 hover:border-primary transition-colors cursor-pointer h-full">
                <h3 className="text-xl font-semibold mb-2">Services</h3>
                <p className="text-muted-foreground text-sm mb-4">
                  Learn more about web development, cybersecurity, SEO, and hosting services.
                </p>
                <div className="flex items-center gap-2 text-primary text-sm font-medium">
                  Explore Services <ArrowRight className="h-4 w-4" />
                </div>
              </Card>
            </Link>

            <Link href="/blog">
              <Card className="p-6 hover:border-primary transition-colors cursor-pointer h-full">
                <h3 className="text-xl font-semibold mb-2">Blog</h3>
                <p className="text-muted-foreground text-sm mb-4">
                  Read articles and guides on web development, security, and SEO best practices.
                </p>
                <div className="flex items-center gap-2 text-primary text-sm font-medium">
                  Read Articles <ArrowRight className="h-4 w-4" />
                </div>
              </Card>
            </Link>

            <Link href="/portfolio">
              <Card className="p-6 hover:border-primary transition-colors cursor-pointer h-full">
                <h3 className="text-xl font-semibold mb-2">Portfolio</h3>
                <p className="text-muted-foreground text-sm mb-4">
                  View case studies and examples of projects I've completed for clients.
                </p>
                <div className="flex items-center gap-2 text-primary text-sm font-medium">
                  View Projects <ArrowRight className="h-4 w-4" />
                </div>
              </Card>
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  )
}
