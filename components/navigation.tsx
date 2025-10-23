"use client"

import Link from "next/link"
import { useState } from "react"
import { Menu, X } from "lucide-react"

export default function Navigation() {
  const [isOpen, setIsOpen] = useState(false)

  const links = [
    { href: "/", label: "Home" },
    { href: "/about", label: "About" },
    { href: "/services", label: "Services" },
    { href: "/portfolio", label: "Portfolio" },
    { href: "/pricing", label: "Pricing" },
    { href: "/blog", label: "Blog" },
    { href: "/faqs", label: "FAQs" },
    { href: "/social", label: "Social" },
    { href: "/seo-tools", label: "SEO Tools" },
    { href: "/contact", label: "Contact" },
  ]

  const handleNavClick = (label: string) => {
    if (typeof window !== "undefined" && window.gtag) {
      window.gtag("event", "navigation_clicked", {
        nav_label: label,
      })
    }
    setIsOpen(false)
  }

  return (
    <nav className="sticky top-0 z-50 bg-background/80 backdrop-blur-md border-b border-border">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Link href="/" className="text-2xl font-bold text-primary" onClick={() => handleNavClick("Home")}>
            Ian Iraya
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-6">
            {links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
                onClick={() => handleNavClick(link.label)}
              >
                {link.label}
              </Link>
            ))}
            <Link
              href="/booking"
              className="px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-accent transition-colors text-sm font-medium"
              onClick={() => handleNavClick("Book Now")}
            >
              Book Now
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button className="md:hidden" onClick={() => setIsOpen(!isOpen)} aria-label="Toggle menu">
            {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <div className="md:hidden pb-4 space-y-2">
            {links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="block px-4 py-2 text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-card rounded transition-colors"
                onClick={() => handleNavClick(link.label)}
              >
                {link.label}
              </Link>
            ))}
            <Link
              href="/booking"
              className="block px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-accent transition-colors text-sm font-medium text-center"
              onClick={() => handleNavClick("Book Now")}
            >
              Book Now
            </Link>
          </div>
        )}
      </div>
    </nav>
  )
}
