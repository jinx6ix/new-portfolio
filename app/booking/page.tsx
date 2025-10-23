"use client"

import type React from "react"

import { useState, Suspense } from "react"
import { useSearchParams } from "next/navigation"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import Navigation from "@/components/navigation"
import Footer from "@/components/footer"
import { ArrowLeft, Mail, MessageCircle, Loader2 } from "lucide-react"

function BookingContent() {
  const searchParams = useSearchParams()
  const serviceId = searchParams.get("service")

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    company: "",
    projectDescription: "",
    budget: "",
    timeline: "",
    serviceType: serviceId || "",
  })

  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState<"idle" | "success" | "error">("idle")
  const [errorMessage, setErrorMessage] = useState("")

  const services = {
    "web-dev-starter": "Web Development - Starter",
    "web-dev-professional": "Web Development - Professional",
    "web-dev-enterprise": "Web Development - Enterprise",
    "cybersecurity-audit": "Cybersecurity - Security Audit",
    "cybersecurity-advanced": "Cybersecurity - Advanced Protection",
    "seo-starter": "SEO - Starter Package",
    "seo-professional": "SEO - Professional Package",
    "hosting-basic": "Free Web Hosting - Basic",
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setSubmitStatus("idle")

    try {
      if (typeof window !== "undefined" && window.gtag) {
        window.gtag("event", "booking_form_submitted", {
          service_type: formData.serviceType,
          budget: formData.budget,
        })
      }

      const response = await fetch("/api/booking", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      })

      if (!response.ok) {
        throw new Error("Failed to submit booking")
      }

      setSubmitStatus("success")
      setFormData({
        name: "",
        email: "",
        phone: "",
        company: "",
        projectDescription: "",
        budget: "",
        timeline: "",
        serviceType: "",
      })

      if (typeof window !== "undefined" && window.gtag) {
        window.gtag("event", "booking_success", {
          service_type: formData.serviceType,
        })
      }
    } catch (error) {
      setSubmitStatus("error")
      setErrorMessage(error instanceof Error ? error.message : "An error occurred")

      if (typeof window !== "undefined" && window.gtag) {
        window.gtag("event", "booking_error", {
          error_message: error instanceof Error ? error.message : "Unknown error",
        })
      }
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <main className="min-h-screen bg-background">
      <Navigation />

      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl mx-auto">
          <Link href="/pricing" className="inline-flex items-center gap-2 text-primary hover:text-accent mb-8">
            <ArrowLeft className="h-4 w-4" />
            Back to Pricing
          </Link>

          <Card className="p-8">
            <h1 className="text-3xl font-bold mb-2">Book Your Service</h1>
            <p className="text-muted-foreground mb-8">
              Fill out the form below and we'll get back to you within 24 hours.
            </p>

            {submitStatus === "success" && (
              <div className="mb-6 p-4 bg-green-500/10 border border-green-500/20 rounded-lg">
                <p className="text-green-600 font-semibold">
                  Booking submitted successfully! Check your email and WhatsApp for confirmation.
                </p>
              </div>
            )}

            {submitStatus === "error" && (
              <div className="mb-6 p-4 bg-red-500/10 border border-red-500/20 rounded-lg">
                <p className="text-red-600 font-semibold">Error: {errorMessage}</p>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-2">Full Name *</label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-2 bg-input border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                    placeholder="Your name"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Email *</label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-2 bg-input border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                    placeholder="your@email.com"
                  />
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-2">Phone Number *</label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-2 bg-input border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                    placeholder="+254..."
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Company</label>
                  <input
                    type="text"
                    name="company"
                    value={formData.company}
                    onChange={handleChange}
                    className="w-full px-4 py-2 bg-input border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                    placeholder="Your company"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Service Type *</label>
                <select
                  name="serviceType"
                  value={formData.serviceType}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-2 bg-input border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                >
                  <option value="">Select a service</option>
                  {Object.entries(services).map(([key, value]) => (
                    <option key={key} value={key}>
                      {value}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Project Description *</label>
                <textarea
                  name="projectDescription"
                  value={formData.projectDescription}
                  onChange={handleChange}
                  required
                  rows={4}
                  className="w-full px-4 py-2 bg-input border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary resize-none"
                  placeholder="Tell me about your project..."
                />
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-2">Budget</label>
                  <select
                    name="budget"
                    value={formData.budget}
                    onChange={handleChange}
                    className="w-full px-4 py-2 bg-input border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                  >
                    <option value="">Select budget range</option>
                    <option value="under-10k">Under 10,000 KES</option>
                    <option value="10k-50k">10,000 - 50,000 KES</option>
                    <option value="50k-100k">50,000 - 100,000 KES</option>
                    <option value="100k-plus">100,000+ KES</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Timeline</label>
                  <select
                    name="timeline"
                    value={formData.timeline}
                    onChange={handleChange}
                    className="w-full px-4 py-2 bg-input border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                  >
                    <option value="">Select timeline</option>
                    <option value="urgent">Urgent (1-2 weeks)</option>
                    <option value="soon">Soon (2-4 weeks)</option>
                    <option value="flexible">Flexible (1-3 months)</option>
                    <option value="planning">Still planning</option>
                  </select>
                </div>
              </div>

              <Button type="submit" disabled={isSubmitting} className="w-full">
                {isSubmitting ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Submitting...
                  </>
                ) : (
                  "Submit Booking"
                )}
              </Button>
            </form>

            {/* Contact Methods */}
            <div className="mt-12 pt-8 border-t border-border">
              <h3 className="font-semibold mb-4">Or contact me directly:</h3>
              <div className="flex flex-col sm:flex-row gap-4">
                <a
                  href="mailto:jinxed435@gmail.com"
                  className="flex items-center gap-2 px-4 py-2 bg-primary/10 hover:bg-primary/20 rounded-lg transition-colors"
                  onClick={() => {
                    if (typeof window !== "undefined" && window.gtag) {
                      window.gtag("event", "contact_email_clicked")
                    }
                  }}
                >
                  <Mail className="h-4 w-4" />
                  Email
                </a>
                <a
                  href="https://wa.me/25475625634"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 px-4 py-2 bg-green-500/10 hover:bg-green-500/20 rounded-lg transition-colors"
                  onClick={() => {
                    if (typeof window !== "undefined" && window.gtag) {
                      window.gtag("event", "contact_whatsapp_clicked")
                    }
                  }}
                >
                  <MessageCircle className="h-4 w-4" />
                  WhatsApp
                </a>
              </div>
            </div>
          </Card>
        </div>
      </section>

      <Footer />
    </main>
  )
}

export default function BookingPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <BookingContent />
    </Suspense>
  )
}
