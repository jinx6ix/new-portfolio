import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import Navigation from "@/components/navigation"
import Footer from "@/components/footer"
import { ArrowLeft, Calendar, User, Clock, Share2, ArrowRight } from "lucide-react"

// Sample blog posts data - in a real app, this would come from a database or CMS
const blogPosts: Record<
  string,
  {
    title: string
    author: string
    date: string
    readTime: string
    category: string
    image: string
    content: string
    tags: string[]
    relatedPosts: Array<{ title: string; slug: string }>
  }
> = {
  "web-development-best-practices-2024": {
    title: "10 Web Development Best Practices for 2024",
    author: "Ian Iraya",
    date: "2024-10-15",
    readTime: "8 min read",
    category: "Web Development",
    image: "/blog-web-dev.jpg",
    tags: ["Web Development", "Best Practices", "Performance"],
    content: `
      <h2>Introduction</h2>
      <p>Web development is constantly evolving, and staying up-to-date with best practices is crucial for building scalable, maintainable, and performant applications. In this article, we'll explore 10 essential best practices that every web developer should follow in 2024.</p>

      <h2>1. Use TypeScript for Type Safety</h2>
      <p>TypeScript has become the standard for large-scale web applications. It provides type safety, better IDE support, and catches errors at compile time rather than runtime.</p>

      <h2>2. Implement Proper Error Handling</h2>
      <p>Error handling is often overlooked but is critical for building robust applications. Always implement proper error handling and logging mechanisms.</p>

      <h2>3. Optimize for Performance</h2>
      <p>Performance is a key factor in user experience. Use tools like Lighthouse to measure performance and implement optimizations like code splitting, lazy loading, and caching.</p>

      <h2>4. Security First Approach</h2>
      <p>Security should be a priority from the start. Implement HTTPS, validate user input, use secure authentication methods, and keep dependencies updated.</p>

      <h2>5. Write Clean, Maintainable Code</h2>
      <p>Write code that is easy to understand and maintain. Use meaningful variable names, follow consistent formatting, and write comments where necessary.</p>

      <h2>6. Test Your Code</h2>
      <p>Testing is essential for ensuring code quality. Write unit tests, integration tests, and end-to-end tests to catch bugs early.</p>

      <h2>7. Use Version Control</h2>
      <p>Always use version control systems like Git. It helps track changes, collaborate with team members, and maintain code history.</p>

      <h2>8. Implement Responsive Design</h2>
      <p>With mobile devices accounting for a significant portion of web traffic, responsive design is no longer optional. Design for mobile first.</p>

      <h2>9. Monitor and Log</h2>
      <p>Implement proper monitoring and logging to track application performance and identify issues in production.</p>

      <h2>10. Keep Learning</h2>
      <p>The web development landscape is constantly changing. Stay updated with new technologies, frameworks, and best practices.</p>

      <h2>Conclusion</h2>
      <p>Following these best practices will help you build better web applications that are scalable, maintainable, and performant. Remember, best practices are not set in stone and should be adapted based on your specific project requirements.</p>
    `,
    relatedPosts: [
      { title: "React Performance Optimization Tips", slug: "react-performance-optimization" },
      { title: "Next.js 15: What's New and Why You Should Care", slug: "nextjs-15-whats-new" },
    ],
  },
  "complete-guide-website-security": {
    title: "The Complete Guide to Website Security",
    author: "Ian Iraya",
    date: "2024-10-10",
    readTime: "12 min read",
    category: "Cybersecurity",
    image: "/blog-security.jpg",
    tags: ["Security", "Cybersecurity", "Protection"],
    content: `
      <h2>Introduction</h2>
      <p>Website security is more important than ever. With cyber attacks becoming increasingly sophisticated, it's crucial to implement comprehensive security measures to protect your website and users.</p>

      <h2>HTTPS and SSL Certificates</h2>
      <p>Always use HTTPS to encrypt data in transit. Obtain an SSL certificate from a trusted certificate authority.</p>

      <h2>Input Validation</h2>
      <p>Validate all user input on both client and server side. This prevents injection attacks and other malicious inputs.</p>

      <h2>Authentication and Authorization</h2>
      <p>Implement strong authentication mechanisms and proper authorization controls to ensure only authorized users can access sensitive data.</p>

      <h2>Keep Software Updated</h2>
      <p>Regularly update your software, frameworks, and dependencies to patch security vulnerabilities.</p>

      <h2>Conclusion</h2>
      <p>Website security is an ongoing process. Implement these measures and regularly review your security posture.</p>
    `,
    relatedPosts: [
      { title: "Common Security Vulnerabilities and How to Fix Them", slug: "common-security-vulnerabilities" },
      { title: "Penetration Testing: A Beginner's Guide", slug: "penetration-testing-beginners-guide" },
    ],
  },
  "seo-strategies-2024": {
    title: "SEO Strategies That Actually Work in 2024",
    author: "Ian Iraya",
    date: "2024-10-05",
    readTime: "10 min read",
    category: "SEO",
    image: "/blog-seo.jpg",
    tags: ["SEO", "Marketing", "Rankings"],
    content: `
      <h2>Introduction</h2>
      <p>SEO continues to evolve, and what worked in the past may not work today. In this guide, we'll explore proven SEO strategies that work in 2024.</p>

      <h2>Focus on User Intent</h2>
      <p>Search engines are increasingly focused on understanding user intent. Create content that matches what users are actually searching for.</p>

      <h2>Technical SEO</h2>
      <p>Ensure your website is technically sound. Optimize site speed, fix crawl errors, and implement proper schema markup.</p>

      <h2>Quality Content</h2>
      <p>Create high-quality, original content that provides value to your audience. Focus on depth and comprehensiveness.</p>

      <h2>Link Building</h2>
      <p>Build quality backlinks from authoritative websites. Focus on relevance and quality over quantity.</p>

      <h2>Conclusion</h2>
      <p>SEO is a long-term strategy. Implement these strategies consistently and monitor your results.</p>
    `,
    relatedPosts: [{ title: "Keyword Research: The Foundation of SEO", slug: "keyword-research-foundation-seo" }],
  },
  "react-performance-optimization": {
    title: "React Performance Optimization Tips",
    author: "Ian Iraya",
    date: "2024-09-28",
    readTime: "9 min read",
    category: "Web Development",
    image: "/blog-react.jpg",
    tags: ["React", "Performance", "JavaScript"],
    content: `
      <h2>Introduction</h2>
      <p>React is a powerful library, but poorly optimized React applications can suffer from performance issues. Let's explore key optimization techniques.</p>

      <h2>Memoization</h2>
      <p>Use React.memo and useMemo to prevent unnecessary re-renders and computations.</p>

      <h2>Code Splitting</h2>
      <p>Split your code into smaller chunks and load them on demand to reduce initial bundle size.</p>

      <h2>Lazy Loading</h2>
      <p>Implement lazy loading for components and images to improve initial page load time.</p>

      <h2>Conclusion</h2>
      <p>Performance optimization is an ongoing process. Monitor your application and implement optimizations based on real data.</p>
    `,
    relatedPosts: [
      { title: "10 Web Development Best Practices for 2024", slug: "web-development-best-practices-2024" },
      { title: "Next.js 15: What's New and Why You Should Care", slug: "nextjs-15-whats-new" },
    ],
  },
  "common-security-vulnerabilities": {
    title: "Common Security Vulnerabilities and How to Fix Them",
    author: "Ian Iraya",
    date: "2024-09-20",
    readTime: "11 min read",
    category: "Cybersecurity",
    image: "/blog-vulnerabilities.jpg",
    tags: ["Security", "Vulnerabilities", "OWASP"],
    content: `
      <h2>Introduction</h2>
      <p>Understanding common security vulnerabilities is the first step to preventing them. Let's explore the most common vulnerabilities and how to fix them.</p>

      <h2>SQL Injection</h2>
      <p>Use parameterized queries and prepared statements to prevent SQL injection attacks.</p>

      <h2>Cross-Site Scripting (XSS)</h2>
      <p>Validate and sanitize all user input to prevent XSS attacks.</p>

      <h2>Cross-Site Request Forgery (CSRF)</h2>
      <p>Implement CSRF tokens to protect against CSRF attacks.</p>

      <h2>Conclusion</h2>
      <p>Stay vigilant and keep learning about new vulnerabilities and attack vectors.</p>
    `,
    relatedPosts: [
      { title: "The Complete Guide to Website Security", slug: "complete-guide-website-security" },
      { title: "Penetration Testing: A Beginner's Guide", slug: "penetration-testing-beginners-guide" },
    ],
  },
  "keyword-research-foundation-seo": {
    title: "Keyword Research: The Foundation of SEO",
    author: "Ian Iraya",
    date: "2024-09-15",
    readTime: "7 min read",
    category: "SEO",
    image: "/blog-keywords.jpg",
    tags: ["SEO", "Keywords", "Research"],
    content: `
      <h2>Introduction</h2>
      <p>Keyword research is the foundation of any successful SEO strategy. Let's explore how to conduct effective keyword research.</p>

      <h2>Understanding Search Intent</h2>
      <p>Understand what users are actually looking for when they search for a keyword.</p>

      <h2>Using Keyword Research Tools</h2>
      <p>Use tools like Google Keyword Planner, SEMrush, and Ahrefs to find relevant keywords.</p>

      <h2>Analyzing Competition</h2>
      <p>Analyze what keywords your competitors are targeting and identify opportunities.</p>

      <h2>Conclusion</h2>
      <p>Keyword research is an ongoing process. Regularly review and update your keyword strategy.</p>
    `,
    relatedPosts: [{ title: "SEO Strategies That Actually Work in 2024", slug: "seo-strategies-2024" }],
  },
  "nextjs-15-whats-new": {
    title: "Next.js 15: What's New and Why You Should Care",
    author: "Ian Iraya",
    date: "2024-09-10",
    readTime: "8 min read",
    category: "Web Development",
    image: "/blog-nextjs.jpg",
    tags: ["Next.js", "Framework", "JavaScript"],
    content: `
      <h2>Introduction</h2>
      <p>Next.js 15 brings exciting new features and improvements. Let's explore what's new and why you should care.</p>

      <h2>Performance Improvements</h2>
      <p>Next.js 15 includes significant performance improvements and optimizations.</p>

      <h2>New Features</h2>
      <p>Explore the new features and APIs introduced in Next.js 15.</p>

      <h2>Migration Guide</h2>
      <p>Learn how to migrate your existing Next.js projects to version 15.</p>

      <h2>Conclusion</h2>
      <p>Next.js 15 is a solid release with many improvements. Consider upgrading your projects.</p>
    `,
    relatedPosts: [
      { title: "10 Web Development Best Practices for 2024", slug: "web-development-best-practices-2024" },
      { title: "React Performance Optimization Tips", slug: "react-performance-optimization" },
    ],
  },
  "penetration-testing-beginners-guide": {
    title: "Penetration Testing: A Beginner's Guide",
    author: "Ian Iraya",
    date: "2024-09-05",
    readTime: "10 min read",
    category: "Cybersecurity",
    image: "/blog-pentest.jpg",
    tags: ["Penetration Testing", "Security", "Testing"],
    content: `
      <h2>Introduction</h2>
      <p>Penetration testing is a critical part of security assessment. Let's explore what it is and how to get started.</p>

      <h2>What is Penetration Testing?</h2>
      <p>Penetration testing is a simulated attack on your systems to identify vulnerabilities.</p>

      <h2>Types of Penetration Testing</h2>
      <p>Explore different types of penetration testing and when to use each one.</p>

      <h2>Getting Started</h2>
      <p>Learn the basics of penetration testing and how to conduct your first assessment.</p>

      <h2>Conclusion</h2>
      <p>Penetration testing is an essential part of a comprehensive security program.</p>
    `,
    relatedPosts: [
      { title: "The Complete Guide to Website Security", slug: "complete-guide-website-security" },
      { title: "Common Security Vulnerabilities and How to Fix Them", slug: "common-security-vulnerabilities" },
    ],
  },
}

export default function BlogPostPage({ params }: { params: { slug: string } }) {
  const post = blogPosts[params.slug]

  if (!post) {
    return (
      <main className="min-h-screen bg-background">
        <Navigation />
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-20 text-center">
          <h1 className="text-4xl font-bold mb-4">Article Not Found</h1>
          <p className="text-muted-foreground mb-8">The article you're looking for doesn't exist.</p>
          <Link href="/blog">
            <Button>Back to Blog</Button>
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

        <div className="relative max-w-4xl mx-auto">
          <Link href="/blog" className="inline-flex items-center gap-2 text-primary hover:text-accent mb-6">
            <ArrowLeft className="h-4 w-4" />
            Back to Blog
          </Link>

          <div className="space-y-6">
            <div className="space-y-4">
              <p className="text-sm font-semibold text-primary uppercase">{post.category}</p>
              <h1 className="text-5xl sm:text-6xl font-bold text-balance leading-tight">{post.title}</h1>

              {/* Meta Information */}
              <div className="flex flex-wrap gap-6 text-sm text-muted-foreground pt-4">
                <div className="flex items-center gap-2">
                  <User className="h-4 w-4" />
                  {post.author}
                </div>
                <div className="flex items-center gap-2">
                  <Calendar className="h-4 w-4" />
                  {new Date(post.date).toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="h-4 w-4" />
                  {post.readTime}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Image */}
      <section className="px-4 sm:px-6 lg:px-8 pb-20">
        <div className="max-w-4xl mx-auto">
          <div className="relative h-96 sm:h-[500px] rounded-lg overflow-hidden bg-gradient-to-br from-primary/20 to-accent/20 border border-border">
            <img src={post.image || "/placeholder.svg"} alt={post.title} className="w-full h-full object-cover" />
          </div>
        </div>
      </section>

      {/* Article Content */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <div className="grid lg:grid-cols-3 gap-12">
            {/* Main Content */}
            <div className="lg:col-span-2">
              <article className="prose prose-invert max-w-none" dangerouslySetInnerHTML={{ __html: post.content }} />
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Share */}
              <Card className="p-6">
                <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                  <Share2 className="h-5 w-5" />
                  Share
                </h3>
                <div className="space-y-2">
                  <Button variant="outline" className="w-full justify-start bg-transparent">
                    Twitter
                  </Button>
                  <Button variant="outline" className="w-full justify-start bg-transparent">
                    LinkedIn
                  </Button>
                  <Button variant="outline" className="w-full justify-start bg-transparent">
                    Facebook
                  </Button>
                </div>
              </Card>

              {/* Tags */}
              <Card className="p-6">
                <h3 className="text-lg font-semibold mb-4">Tags</h3>
                <div className="flex flex-wrap gap-2">
                  {post.tags.map((tag) => (
                    <span key={tag} className="text-xs bg-primary/10 text-primary px-3 py-1 rounded-full">
                      {tag}
                    </span>
                  ))}
                </div>
              </Card>

              {/* Author */}
              <Card className="p-6">
                <h3 className="text-lg font-semibold mb-4">About Author</h3>
                <div className="space-y-4">
                  <p className="text-sm text-muted-foreground">
                    {post.author} is a web developer, cybersecurity expert, and SEO manager with 10+ years of
                    experience.
                  </p>
                  <Link href="/about">
                    <Button variant="outline" className="w-full bg-transparent">
                      View Profile
                    </Button>
                  </Link>
                </div>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Related Posts */}
      {post.relatedPosts.length > 0 && (
        <section className="py-20 px-4 sm:px-6 lg:px-8 bg-card/50">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-4xl font-bold mb-12">Related Articles</h2>

            <div className="grid md:grid-cols-2 gap-6">
              {post.relatedPosts.map((relatedPost) => (
                <Link key={relatedPost.slug} href={`/blog/${relatedPost.slug}`}>
                  <Card className="p-6 hover:border-primary transition-colors cursor-pointer h-full">
                    <h3 className="text-xl font-semibold mb-2 group-hover:text-primary transition-colors">
                      {relatedPost.title}
                    </h3>
                    <div className="flex items-center gap-2 text-primary text-sm font-medium">
                      Read Article <ArrowRight className="h-4 w-4" />
                    </div>
                  </Card>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* CTA Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-primary/10 to-accent/10 border-y border-border">
        <div className="max-w-4xl mx-auto text-center space-y-8">
          <div className="space-y-4">
            <h2 className="text-4xl font-bold">Ready to Get Started?</h2>
            <p className="text-lg text-muted-foreground">
              Let's discuss how I can help with your web development, cybersecurity, or SEO needs.
            </p>
          </div>
          <Link href="/contact">
            <Button size="lg" className="px-8">
              Get In Touch
            </Button>
          </Link>
        </div>
      </section>

      <Footer />
    </main>
  )
}
