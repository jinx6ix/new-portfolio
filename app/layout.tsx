import type React from "react"
import type { Metadata } from "next"
import { Analytics } from "@vercel/analytics/next"
import { AnalyticsProvider } from "@/components/analytics-provider"
import "./globals.css"


export const metadata: Metadata = {
  title: "Ian Iraya | Web Developer, Cybersecurity Expert & SEO Manager | Kenya",
  description:
    "Professional portfolio of Ian Iraya - Web Developer, Cybersecurity Expert, and SEO Manager based in Kiambu, Kenya. 10+ projects in web development, cybersecurity, and SEO. Free website hosting services available.",
  keywords: "web developer Kenya, cybersecurity expert, SEO manager, website hosting, Kiambu, Githunguri",
  generator: "Next.js",
  metadataBase: new URL("https://ianiraya.com"),
  openGraph: {
    title: "Ian Iraya | Web Developer, Cybersecurity Expert & SEO Manager",
    description:
      "Professional portfolio showcasing 10+ projects in web development, cybersecurity, and SEO. Based in Kenya.",
    url: "https://ianiraya.com",
    siteName: "Ian Iraya Portfolio",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Ian Iraya Portfolio",
      },
    ],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Ian Iraya | Web Developer, Cybersecurity Expert & SEO Manager",
    description: "Professional portfolio with 10+ projects in web development, cybersecurity, and SEO.",
    images: ["/og-image.jpg"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  alternates: {
    canonical: "https://ianiraya.com",
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="theme-color" content="#0f172a" />
        <link rel="icon" href="/favicon.ico" />
        <link rel="canonical" href="https://ianiraya.com" />
        {/* Schema markup for person */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Person",
              name: "Ian Iraya",
              url: "https://ianiraya.com",
              jobTitle: ["Web Developer", "Cybersecurity Expert", "SEO Manager"],
              location: {
                "@type": "Place",
                name: "Kiambu, Githunguri, Kenya",
              },
              sameAs: [
                "https://linkedin.com/in/ianiraya",
                "https://github.com/ianiraya",
                "https://twitter.com/ianiraya",
              ],
            }),
          }}
        />
        <script async src="https://www.googletagmanager.com/gtag/js?id=G-EN1K94FRDB"></script>
        <meta name="google-site-verification" content="hFLRkNLTiWW_pvLuqqXe-gZjop_3rJtLqKtpuxkByMc" />
        <script
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', 'G-EN1K94FRDB', {
                page_path: window.location.pathname,
              });
            `,
          }}
        />
      </head>
      <body className={`font-sans antialiased`}>
        <AnalyticsProvider />
        {children}
        <Analytics />
      </body>
    </html>
  )
}
