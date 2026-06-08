"use client"

import { useEffect, useRef, useState } from "react"
import Link from "next/link"
import { ArrowLeft, ArrowRight, Shield, AlertTriangle, CheckCircle, XCircle, ExternalLink, Code, Server, Database, Network, Lock, Eye, Scan, FileWarning, Key, Bug, FileSearch, Brain, Layers, ChevronDown, ChevronUp } from "lucide-react"
import Navigation from "@/components/navigation"
import Footer from "@/components/footer"
import { Button } from "@/components/ui/button"

export default function FinancialPentestPage() {
  const [activeSection, setActiveSection] = useState(0)
  const [expandedFaq, setExpandedFaq] = useState<number | null>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext("2d")
    if (!ctx) return

    let animationId: number
    let time = 0
    const nodes: { x: number; y: number; vx: number; vy: number; size: number; alpha: number }[] = []

    function init() {
      if (!canvas || !ctx) return
      canvas.width = canvas.offsetWidth * window.devicePixelRatio
      canvas.height = canvas.offsetHeight * window.devicePixelRatio
      ctx.scale(window.devicePixelRatio, window.devicePixelRatio)

      for (let i = 0; i < 50; i++) {
        nodes.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          vx: (Math.random() - 0.5) * 0.5,
          vy: (Math.random() - 0.5) * 0.5,
          size: Math.random() * 2 + 1,
          alpha: Math.random() * 0.5 + 0.2,
        })
      }
    }

    function animate() {
      if (!canvas || !ctx) return
      const width = canvas.width / window.devicePixelRatio
      const height = canvas.height / window.devicePixelRatio

      ctx.fillStyle = "rgba(10, 10, 20, 0.1)"
      ctx.fillRect(0, 0, width, height)

      nodes.forEach((node, i) => {
        node.x += node.vx
        node.y += node.vy

        if (node.x < 0 || node.x > width) node.vx *= -1
        if (node.y < 0 || node.y > height) node.vy *= -1

        ctx.beginPath()
        ctx.arc(node.x, node.y, node.size, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(139, 92, 246, ${node.alpha})`
        ctx.fill()

        nodes.slice(i + 1).forEach((other) => {
          const dx = node.x - other.x
          const dy = node.y - other.y
          const dist = Math.sqrt(dx * dx + dy * dy)
          if (dist < 100) {
            ctx.beginPath()
            ctx.moveTo(node.x, node.y)
            ctx.lineTo(other.x, other.y)
            ctx.strokeStyle = `rgba(139, 92, 246, ${0.2 * (1 - dist / 100)})`
            ctx.lineWidth = 0.5
            ctx.stroke()
          }
        })
      })

      time++
      animationId = requestAnimationFrame(animate)
    }

    init()
    animate()

    return () => cancelAnimationFrame(animationId)
  }, [])

  const vulnerabilities = [
    {
      severity: "critical",
      title: "SQL Injection in Admin Login",
      description: "Unsanitized input in admin authentication endpoint allows SQL injection attacks",
      impact: "Complete database compromise, unauthorized admin access",
      cvss: "9.8",
      status: "Remediated",
      icon: Database,
    },
    {
      severity: "critical",
      title: "Broken Authentication Session",
      description: "Session tokens predictable due to weak random number generation",
      impact: "Account takeover for any user",
      cvss: "9.1",
      status: "Remediated",
      icon: Lock,
    },
    {
      severity: "high",
      title: "Cross-Site Scripting (XSS)",
      description: "Stored XSS in customer feedback form bypasses input sanitization",
      impact: "Session hijacking, defacement, malware distribution",
      cvss: "8.1",
      status: "Remediated",
      icon: Bug,
    },
    {
      severity: "high",
      title: "Sensitive Data Exposure",
      description: "Customer PII and transaction data stored in plaintext without encryption",
      impact: "GDPR violations, reputational damage",
      cvss: "7.5",
      status: "Remediated",
      icon: Eye,
    },
    {
      severity: "medium",
      title: "CSRF Token Missing",
      description: "Critical actions lack CSRF protection tokens",
      impact: "Forced transactions via social engineering",
      cvss: "6.5",
      status: "Remediated",
      icon: FileWarning,
    },
    {
      severity: "medium",
      title: "Security Misconfiguration",
      description: "Default credentials, unnecessary services, verbose error messages",
      impact: "Information disclosure, easier exploitation",
      cvss: "5.3",
      status: "Remediated",
      icon: Server,
    },
  ]

  const methodology = [
    {
      phase: "1. Reconnaissance",
      icon: Scan,
      tasks: [
        "Passive information gathering (WHOIS, DNS records)",
        "Public code repository analysis",
        "Social media intelligence gathering",
        "Technology fingerprinting",
      ],
      duration: "2 days",
    },
    {
      phase: "2. Threat Modeling",
      icon: Brain,
      tasks: [
        "Attack surface identification",
        "Business logic analysis",
        "Data flow mapping",
        "Threat actor profiling",
      ],
      duration: "1 day",
    },
    {
      phase: "3. Vulnerability Analysis",
      icon: FileSearch,
      tasks: [
        "Automated scanning (Burp Suite, OWASP ZAP, Nmap)",
        "Manual code review",
        "Configuration analysis",
        "Dependency check",
      ],
      duration: "3 days",
    },
    {
      phase: "4. Exploitation",
      icon: Bug,
      tasks: [
        "Proof-of-concept development",
        "Attack chaining for complex scenarios",
        "Business logic abuse testing",
        "Privilege escalation attempts",
      ],
      duration: "2 days",
    },
    {
      phase: "5. Post-Exploitation",
      icon: Network,
      tasks: [
        "Lateral movement assessment",
        "Data exfiltration potential",
        "Persistence mechanism analysis",
        "Impact quantification",
      ],
      duration: "1 day",
    },
    {
      phase: "6. Documentation",
      icon: Layers,
      tasks: [
        "Detailed findings documentation",
        "Risk rating using CVSS 3.1",
        "Remediation guidance",
        "Executive summary preparation",
      ],
      duration: "2 days",
    },
  ]

  const faqs = [
    {
      question: "What is the CVSS score and why does it matter?",
      answer: "CVSS (Common Vulnerability Scoring System) is a standardized way to describe the severity of security vulnerabilities. Scores range from 0 to 10, with 10 being the most severe. For financial institutions, any vulnerability above 7.0 is considered critical and requires immediate attention due to regulatory requirements and potential financial impact.",
    },
    {
      question: "How did you achieve 100% remediation support?",
      answer: "We provided 24/7 support throughout the remediation process, including weekly check-in calls, detailed code reviews for fixes, and verification testing once patches were applied. Our team was available via encrypted channels for urgent issues during the remediation period.",
    },
    {
      question: "What makes financial institution pentesting different?",
      answer: "Financial institutions face unique challenges including regulatory compliance (PCI-DSS, SOX, GLBA), handling of sensitive financial data, real-money transactions, and potential nation-state actors. Our methodology specifically addresses these concerns with tailored attack scenarios and compliance-focused reporting.",
    },
    {
      question: "How often should penetration testing be performed?",
      answer: "For financial institutions, we recommend comprehensive penetration testing at least annually, with quarterly vulnerability assessments in between. Additional testing should occur after significant infrastructure changes, new application launches, or security incidents.",
    },
  ]

  const stats = [
    { value: "15", label: "Vulnerabilities Found", icon: Bug },
    { value: "2 Critical", label: "Immediate Action", icon: AlertTriangle },
    { value: "100%", label: "Remediation Rate", icon: CheckCircle },
    { value: "11 Days", label: "Assessment Duration", icon: Server },
  ]

  const sections = ["Overview", "Methodology", "Findings", "Remediation", "Results"]

  return (
    <main className="min-h-screen bg-background">
      <Navigation />

      {/* Hero Section */}
      <section className="relative pt-20 pb-16 overflow-hidden">
        <canvas ref={canvasRef} className="absolute inset-0 w-full h-full opacity-30" />
        <div className="absolute inset-0 bg-gradient-to-br from-primary/20 via-transparent to-accent/10" />

        <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <Link href="/portfolio" className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground mb-8">
            <ArrowLeft className="h-4 w-4" />
            Back to Portfolio
          </Link>

          <div className="space-y-6">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-red-500/10 border border-red-500/20 rounded-lg">
              <Shield className="h-5 w-5 text-red-500" />
              <span className="text-red-500 font-semibold">Cybersecurity Project</span>
            </div>

            <h1 className="text-4xl sm:text-5xl font-bold leading-tight">
              Financial Institution<br />
              <span className="text-primary">Penetration Testing</span>
            </h1>

            <p className="text-xl text-muted-foreground max-w-3xl">
              Comprehensive security assessment for a major Kenyan financial institution, identifying and remediating critical vulnerabilities to achieve ISO 27001 compliance.
            </p>

            <div className="flex flex-wrap gap-4">
              <a href="#findings" className="inline-flex items-center gap-2 px-6 py-3 bg-primary text-primary-foreground rounded-lg hover:bg-accent transition-colors">
                View Findings
                <ArrowRight className="h-4 w-4" />
              </a>
              <Button variant="outline" className="gap-2">
                <ExternalLink className="h-4 w-4" />
                View Certificate
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-12 px-4 sm:px-6 lg:px-8 bg-card/50">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {stats.map((stat, i) => {
              const Icon = stat.icon
              return (
                <div key={i} className="text-center p-6 bg-background rounded-xl border border-border">
                  <Icon className="h-8 w-8 text-primary mx-auto mb-3" />
                  <p className="text-3xl font-bold text-primary">{stat.value}</p>
                  <p className="text-sm text-muted-foreground">{stat.label}</p>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* Section Navigation */}
      <section className="sticky top-16 z-40 py-4 px-4 sm:px-6 lg:px-8 bg-background/80 backdrop-blur-md border-b border-border">
        <div className="max-w-6xl mx-auto">
          <div className="flex gap-2 overflow-x-auto">
            {sections.map((section, i) => (
              <button
                key={section}
                onClick={() => setActiveSection(i)}
                className={`px-4 py-2 rounded-lg text-sm font-medium whitespace-nowrap transition-colors ${
                  activeSection === i ? "bg-primary text-primary-foreground" : "bg-muted hover:bg-muted/80"
                }`}
              >
                {section}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Project Details */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto space-y-20">
          {/* Client Overview */}
          <div className="grid lg:grid-cols-2 gap-12">
            <div className="space-y-6">
              <h2 className="text-3xl font-bold">Project Overview</h2>
              <div className="space-y-4 text-muted-foreground">
                <p>
                  Our client is a mid-sized Kenyan commercial bank serving over 500,000 customers with assets exceeding KES 50 billion. They were required to undergo annual penetration testing as part of their ISO 27001 certification renewal.
                </p>
                <p>
                  The assessment was conducted over 11 days and included testing of their core banking system, customer portal, mobile banking application, and supporting infrastructure. All testing was performed in accordance with OWASP guidelines and PCI-DSS requirements.
                </p>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="p-4 bg-card rounded-lg border">
                  <p className="text-sm text-muted-foreground">Client</p>
                  <p className="font-semibold">Regional Commercial Bank</p>
                </div>
                <div className="p-4 bg-card rounded-lg border">
                  <p className="text-sm text-muted-foreground">Industry</p>
                  <p className="font-semibold">Financial Services</p>
                </div>
                <div className="p-4 bg-card rounded-lg border">
                  <p className="text-sm text-muted-foreground">Duration</p>
                  <p className="font-semibold">11 Days</p>
                </div>
                <div className="p-4 bg-card rounded-lg border">
                  <p className="text-sm text-muted-foreground">Compliance</p>
                  <p className="font-semibold">ISO 27001, PCI-DSS</p>
                </div>
              </div>
            </div>

            <div className="space-y-6">
              <h2 className="text-3xl font-bold">Scope of Testing</h2>
              <div className="space-y-3">
                {[
                  "Core Banking System (CBS) - Main transaction processing",
                  "Internet Banking Portal - Customer-facing web application",
                  "Mobile Banking Application - iOS and Android",
                  "ATM Network Infrastructure - Payment processing",
                  "Internal Network - Lateral movement assessment",
                  "API Gateway - Third-party integrations",
                ].map((item, i) => (
                  <div key={i} className="flex items-center gap-3 p-3 bg-card rounded-lg border">
                    <CheckCircle className="h-5 w-5 text-green-500 flex-shrink-0" />
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Methodology */}
          <div>
            <h2 className="text-3xl font-bold mb-8">Testing Methodology</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {methodology.map((step, i) => {
                const Icon = step.icon
                return (
                  <div key={i} className="p-6 bg-card rounded-xl border hover:border-primary transition-colors">
                    <div className="flex items-center gap-3 mb-4">
                      <div className="p-2 bg-primary/10 rounded-lg">
                        <Icon className="h-6 w-6 text-primary" />
                      </div>
                      <div>
                        <p className="text-xs text-muted-foreground">{step.duration}</p>
                        <h3 className="font-semibold">{step.phase}</h3>
                      </div>
                    </div>
                    <ul className="space-y-2">
                      {step.tasks.map((task, j) => (
                        <li key={j} className="text-sm text-muted-foreground flex items-start gap-2">
                          <span className="text-primary mt-1">•</span>
                          {task}
                        </li>
                      ))}
                    </ul>
                  </div>
                )
              })}
            </div>
          </div>

          {/* Findings */}
          <div id="findings">
            <h2 className="text-3xl font-bold mb-8">Vulnerability Findings</h2>
            <div className="space-y-4">
              {vulnerabilities.map((vuln, i) => {
                const Icon = vuln.icon
                const isCritical = vuln.severity === "critical"
                const color = isCritical ? "red" : vuln.severity === "high" ? "orange" : "yellow"
                return (
                  <div key={i} className={`p-6 bg-card rounded-xl border-l-4 border-${color}-500`}>
                    <div className="flex items-start gap-4">
                      <div className={`p-3 bg-${color}-500/10 rounded-lg`}>
                        <Icon className={`h-6 w-6 text-${color}-500`} />
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <h3 className="text-lg font-semibold">{vuln.title}</h3>
                          <span className={`px-2 py-1 text-xs font-semibold bg-${color}-500/20 text-${color}-500 rounded`}>
                            {vuln.severity.toUpperCase()}
                          </span>
                          <span className="text-xs text-muted-foreground">CVSS {vuln.cvss}</span>
                        </div>
                        <p className="text-muted-foreground mb-3">{vuln.description}</p>
                        <div className="flex items-center gap-4 text-sm">
                          <span className="text-muted-foreground">
                            <strong>Impact:</strong> {vuln.impact}
                          </span>
                          <span className="flex items-center gap-1 text-green-500">
                            <CheckCircle className="h-4 w-4" />
                            {vuln.status}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>

          {/* Remediation */}
          <div className="bg-gradient-to-br from-primary/10 to-accent/10 rounded-2xl p-8">
            <h2 className="text-3xl font-bold mb-6">Remediation Success</h2>
            <div className="grid md:grid-cols-2 gap-8">
              <div className="space-y-4">
                <h3 className="text-xl font-semibold">How We Supported Remediation</h3>
                <ul className="space-y-3">
                  {[
                    "Weekly progress review meetings with development team",
                    "Detailed remediation instructions with code examples",
                    "Priority-based remediation roadmap",
                    "Verification testing after each fix deployment",
                    "Final security posture assessment",
                  ].map((item, i) => (
                    <li key={i} className="flex items-start gap-3">
                      <CheckCircle className="h-5 w-5 text-green-500 flex-shrink-0 mt-0.5" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="space-y-4">
                <h3 className="text-xl font-semibold">Client Outcomes</h3>
                <div className="grid grid-cols-2 gap-4">
                  <div className="p-4 bg-background rounded-lg text-center">
                    <p className="text-3xl font-bold text-green-500">100%</p>
                    <p className="text-sm text-muted-foreground">Vulnerabilities Fixed</p>
                  </div>
                  <div className="p-4 bg-background rounded-lg text-center">
                    <p className="text-3xl font-bold text-primary">Zero</p>
                    <p className="text-sm text-muted-foreground">Critical Findings Post-Remediation</p>
                  </div>
                  <div className="p-4 bg-background rounded-lg text-center">
                    <p className="text-3xl font-bold text-accent">ISO</p>
                    <p className="text-sm text-muted-foreground">27001 Certification Achieved</p>
                  </div>
                  <div className="p-4 bg-background rounded-lg text-center">
                    <p className="text-3xl font-bold text-primary">100%</p>
                    <p className="text-sm text-muted-foreground">Compliance Score</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* FAQ */}
          <div>
            <h2 className="text-3xl font-bold mb-8">Frequently Asked Questions</h2>
            <div className="space-y-4">
              {faqs.map((faq, i) => (
                <div key={i} className="bg-card rounded-xl border">
                  <button
                    onClick={() => setExpandedFaq(expandedFaq === i ? null : i)}
                    className="w-full p-6 text-left flex items-center justify-between"
                  >
                    <span className="font-semibold">{faq.question}</span>
                    {expandedFaq === i ? <ChevronUp className="h-5 w-5" /> : <ChevronDown className="h-5 w-5" />}
                  </button>
                  {expandedFaq === i && (
                    <div className="px-6 pb-6 text-muted-foreground">
                      {faq.answer}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* CTA */}
          <div className="text-center py-12 space-y-6 bg-card rounded-2xl">
            <h2 className="text-3xl font-bold">Need a Security Assessment?</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Protect your organization with comprehensive penetration testing and security assessments. Let me help you identify and remediate vulnerabilities before they are exploited.
            </p>
            <div className="flex justify-center gap-4">
              <Link href="/contact">
                <Button size="lg" className="gap-2">
                  <Shield className="h-5 w-5" />
                  Get Started
                </Button>
              </Link>
              <Link href="/services/cybersecurity">
                <Button size="lg" variant="outline" className="gap-2">
                  View Services
                  <ArrowRight className="h-5 w-5" />
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  )
}