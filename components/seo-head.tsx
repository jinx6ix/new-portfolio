import type { ReactNode } from "react"

interface SEOHeadProps {
  title: string
  description: string
  image?: string
  url?: string
  type?: "website" | "article" | "profile"
  children?: ReactNode
}

export function SEOHead({
  title,
  description,
  image = "https://ianiraya.com/og-image.jpg",
  url = "https://ianiraya.com",
  type = "website",
}: SEOHeadProps) {
  return (
    <>
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={image} />
      <meta property="og:url" content={url} />
      <meta property="og:type" content={type} />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={image} />
      <link rel="canonical" href={url} />
    </>
  )
}
