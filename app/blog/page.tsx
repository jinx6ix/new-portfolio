"use client"

import Link from "next/link"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import Navigation from "@/components/navigation"
import Footer from "@/components/footer"
import { ArrowRight, Search, Calendar } from "lucide-react"

export default function BlogPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [activeCategory, setActiveCategory] = useState("all")

  const posts = [
    {
      id: 1,
      title: "10 Web Development Best Practices for 2024",
      slug: "web-development-best-practices-2024",
      excerpt:
        "Learn the essential best practices that every web developer should follow to build scalable, maintainable, and performant applications.",
      content: "Full article content here...",
      category: "web-development",
      author: "Ian Iraya",
      date: "2024-10-15",
      readTime: "8 min read",
      image: "/blog-web-dev.jpg",
      tags: ["Web Development", "Best Practices", "Performance"],
    },
    {
      id: 2,
      title: "The Complete Guide to Website Security",
      slug: "complete-guide-website-security",
      excerpt:
        "Comprehensive guide to securing your website against common threats and vulnerabilities. Learn practical security measures.",
      content: "Full article content here...",
      category: "cybersecurity",
      author: "Ian Iraya",
      date: "2024-10-10",
      readTime: "12 min read",
      image: "/blog-security.jpg",
      tags: ["Security", "Cybersecurity", "Protection"],
    },
    {
      id: 3,
      title: "SEO Strategies That Actually Work in 2024",
      slug: "seo-strategies-2024",
      excerpt:
        "Discover proven SEO strategies that will help your website rank higher and attract more organic traffic.",
      content: "Full article content here...",
      category: "seo",
      author: "Ian Iraya",
      date: "2024-10-05",
      readTime: "10 min read",
      image: "/blog-seo.jpg",
      tags: ["SEO", "Marketing", "Rankings"],
    },
    {
      id: 4,
      title: "React Performance Optimization Tips",
      slug: "react-performance-optimization",
      excerpt: "Master React performance optimization techniques to build faster, more efficient applications.",
      content: "Full article content here...",
      category: "web-development",
      author: "Ian Iraya",
      date: "2024-09-28",
      readTime: "9 min read",
      image: "/blog-react.jpg",
      tags: ["React", "Performance", "JavaScript"],
    },
    {
      id: 5,
      title: "Common Security Vulnerabilities and How to Fix Them",
      slug: "common-security-vulnerabilities",
      excerpt: "Learn about the most common security vulnerabilities in web applications and how to prevent them.",
      content: "Full article content here...",
      category: "cybersecurity",
      author: "Ian Iraya",
      date: "2024-09-20",
      readTime: "11 min read",
      image: "/blog-vulnerabilities.jpg",
      tags: ["Security", "Vulnerabilities", "OWASP"],
    },
    {
      id: 6,
      title: "Keyword Research: The Foundation of SEO",
      slug: "keyword-research-foundation-seo",
      excerpt:
        "Understand how to conduct effective keyword research to build a strong foundation for your SEO strategy.",
      content: "Full article content here...",
      category: "seo",
      author: "Ian Iraya",
      date: "2024-09-15",
      readTime: "7 min read",
      image: "/blog-keywords.jpg",
      tags: ["SEO", "Keywords", "Research"],
    },
    {
      id: 7,
      title: "Next.js 15: What's New and Why You Should Care",
      slug: "nextjs-15-whats-new",
      excerpt:
        "Explore the latest features and improvements in Next.js 15 and how they can improve your development workflow.",
      content: "Full article content here...",
      category: "web-development",
      author: "Ian Iraya",
      date: "2024-09-10",
      readTime: "8 min read",
      image: "/blog-nextjs.jpg",
      tags: ["Next.js", "Framework", "JavaScript"],
    },
    {
      id: 8,
      title: "Penetration Testing: A Beginner's Guide",
      slug: "penetration-testing-beginners-guide",
      excerpt: "Introduction to penetration testing and how it helps identify security weaknesses in your systems.",
      content: "Full article content here...",
      category: "cybersecurity",
      author: "Ian Iraya",
      date: "2024-09-05",
      readTime: "10 min read",
      image: "/blog-pentest.jpg",
      tags: ["Penetration Testing", "Security", "Testing"],
    },
  ]

  const categories = [
    { id: "all", label: "All Articles" },
    { id: "web-development", label: "Web Development" },
    { id: "cybersecurity", label: "Cybersecurity" },
    { id: "seo", label: "SEO" },
  ]

  const filteredPosts = posts.filter((post) => {
    const matchesCategory = activeCategory === "all" || post.category === activeCategory
    const matchesSearch =
      post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.excerpt.toLowerCase().includes(searchQuery.toLowerCase())
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
              <h1 className="text-5xl sm:text-6xl font-bold text-balance leading-tight">Blog & Resources</h1>
              <p className="text-xl text-muted-foreground max-w-3xl leading-relaxed">
                Articles, guides, and resources on web development, cybersecurity, and SEO. Stay updated with the latest
                trends and best practices.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Search and Filter Section */}
      <section className="py-12 px-4 sm:px-6 lg:px-8 bg-card/50 sticky top-16 z-40">
        <div className="max-w-6xl mx-auto space-y-6">
          {/* Search Bar */}
          <div className="relative">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-muted-foreground" />
            <input
              type="text"
              placeholder="Search articles..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-12 pr-4 py-3 bg-background border border-border rounded-lg focus:outline-none focus:border-primary transition-colors"
            />
          </div>

          {/* Category Filter */}
          <div className="flex flex-wrap gap-3">
            {categories.map((category) => (
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

      {/* Blog Posts Grid */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          {filteredPosts.length > 0 ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredPosts.map((post) => (
                <Link key={post.id} href={`/blog/${post.slug}`}>
                  <Card className="h-full overflow-hidden hover:border-primary transition-all hover:shadow-lg group cursor-pointer">
                    {/* Post Image */}
                    <div className="relative h-48 bg-gradient-to-br from-primary/20 to-accent/20 overflow-hidden">
                      <img
                        src={post.image || "/placeholder.svg"}
                        alt={post.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                    </div>

                    {/* Post Content */}
                    <div className="p-6 space-y-4 flex flex-col h-full">
                      {/* Category Tag */}
                      <div>
                        <span className="text-xs font-semibold text-primary uppercase">
                          {categories.find((c) => c.id === post.category)?.label}
                        </span>
                      </div>

                      {/* Title and Excerpt */}
                      <div className="space-y-2 flex-grow">
                        <h3 className="text-xl font-semibold group-hover:text-primary transition-colors line-clamp-2">
                          {post.title}
                        </h3>
                        <p className="text-sm text-muted-foreground line-clamp-2">{post.excerpt}</p>
                      </div>

                      {/* Meta Information */}
                      <div className="space-y-3 pt-4 border-t border-border">
                        <div className="flex items-center gap-4 text-xs text-muted-foreground">
                          <div className="flex items-center gap-1">
                            <Calendar className="h-4 w-4" />
                            {new Date(post.date).toLocaleDateString()}
                          </div>
                          <div>{post.readTime}</div>
                        </div>

                        {/* Tags */}
                        <div className="flex flex-wrap gap-2">
                          {post.tags.slice(0, 2).map((tag) => (
                            <span key={tag} className="text-xs bg-primary/10 text-primary px-2 py-1 rounded">
                              {tag}
                            </span>
                          ))}
                        </div>
                      </div>

                      {/* Read More Link */}
                      <div className="flex items-center gap-2 text-primary text-sm font-medium group-hover:gap-3 transition-all pt-2">
                        Read Article <ArrowRight className="h-4 w-4" />
                      </div>
                    </div>
                  </Card>
                </Link>
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <p className="text-muted-foreground text-lg">No articles found matching your search.</p>
            </div>
          )}
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-card/50">
        <div className="max-w-2xl mx-auto text-center space-y-6">
          <div className="space-y-4">
            <h2 className="text-4xl font-bold">Stay Updated</h2>
            <p className="text-lg text-muted-foreground">
              Subscribe to get the latest articles and resources delivered to your inbox.
            </p>
          </div>

          <form className="flex flex-col sm:flex-row gap-3">
            <input
              type="email"
              placeholder="Enter your email"
              className="flex-grow px-4 py-3 bg-background border border-border rounded-lg focus:outline-none focus:border-primary transition-colors"
              required
            />
            <Button size="lg" className="sm:w-auto">
              Subscribe
            </Button>
          </form>
        </div>
      </section>

      <Footer />
    </main>
  )
}
