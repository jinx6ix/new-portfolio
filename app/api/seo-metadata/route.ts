import { type NextRequest, NextResponse } from "next/server"
import {
  generateOrganizationSchema,
  generateServiceSchema,
  generateBreadcrumbSchema,
  generateFAQSchema,
  generateArticleSchema,
  generateLocalBusinessSchema,
} from "@/lib/seo-schema"

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url)
  const type = searchParams.get("type")

  try {
    let schema

    switch (type) {
      case "organization":
        schema = generateOrganizationSchema()
        break
      case "service":
        const serviceName = searchParams.get("name") || "Service"
        const description = searchParams.get("description") || ""
        const price = searchParams.get("price") ? Number.parseInt(searchParams.get("price")!) : undefined
        schema = generateServiceSchema(serviceName, description, price)
        break
      case "breadcrumb":
        const items = JSON.parse(searchParams.get("items") || "[]")
        schema = generateBreadcrumbSchema(items)
        break
      case "faq":
        const faqs = JSON.parse(searchParams.get("faqs") || "[]")
        schema = generateFAQSchema(faqs)
        break
      case "article":
        const title = searchParams.get("title") || ""
        const articleDescription = searchParams.get("description") || ""
        const image = searchParams.get("image") || ""
        const datePublished = searchParams.get("datePublished") || new Date().toISOString()
        const dateModified = searchParams.get("dateModified") || new Date().toISOString()
        schema = generateArticleSchema(title, articleDescription, image, datePublished, dateModified)
        break
      case "local-business":
        schema = generateLocalBusinessSchema()
        break
      default:
        return NextResponse.json({ error: "Invalid schema type" }, { status: 400 })
    }

    return NextResponse.json(schema)
  } catch (error) {
    console.error("SEO metadata error:", error)
    return NextResponse.json({ error: "Failed to generate schema" }, { status: 500 })
  }
}
