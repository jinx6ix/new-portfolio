import type React from "react"
import type { Metadata } from "next"
import { Analytics } from "@vercel/analytics/next"
import { getSettings } from "@/lib/db"
import AnalyticsProvider from "@/components/analytics-provider"
import SiteWrapper from "@/components/site-wrapper"
import "./globals.css"

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://ianiraya.com';

export const metadata: Metadata = {
  title: "Ian Iraya | Web Developer, Cybersecurity Expert & SEO Manager | Kenya",
  description:
    "Professional portfolio of Ian Iraya - Web Developer, Cybersecurity Expert, and SEO Manager based in Kiambu, Kenya. 10+ projects in web development, cybersecurity, and SEO. Free website hosting services available.",
  keywords: "web developer Kenya, cybersecurity expert, SEO manager, website hosting, Kiambu, Githunguri, web development services, IT security, search engine optimization",
  authors: [{ name: "Ian Iraya" }],
  creator: "Ian Iraya",
  publisher: "Ian Iraya Portfolio",
  generator: "Next.js",
  metadataBase: new URL(siteUrl),
  alternates: {
    canonical: siteUrl,
  },
  openGraph: {
    title: "Ian Iraya | Web Developer, Cybersecurity Expert & SEO Manager",
    description:
      "Professional portfolio showcasing 10+ projects in web development, cybersecurity, and SEO. Based in Kenya.",
    url: siteUrl,
    siteName: "Ian Iraya Portfolio",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Ian Iraya Portfolio",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Ian Iraya | Web Developer, Cybersecurity Expert & SEO Manager",
    description: "Professional portfolio with 10+ projects in web development, cybersecurity, and SEO.",
    images: ["/og-image.jpg"],
    creator: "@ianiraya",
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
  icons: {
    icon: "/favicon.ico",
    apple: "/apple-touch-icon.png",
  },
}

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  const settings = await getSettings();

  if (settings.maintenanceMode && settings.maintenanceMessage) {
    return (
      <html lang="en">
        <head>
          <meta charSet="utf-8" />
          <meta name="viewport" content="width=device-width, initial-scale=1" />
          <meta name="theme-color" content="#0f172a" />
          <link rel="icon" href="/favicon.ico" />
        </head>
        <body className="font-sans antialiased">
          <div className="min-h-screen flex items-center justify-center bg-background">
            <div className="text-center space-y-6 p-8 max-w-md">
              <div className="w-24 h-24 mx-auto bg-yellow-500/20 rounded-full flex items-center justify-center">
                <svg className="w-12 h-12 text-yellow-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v4" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 17h.01" />
                </svg>
              </div>
              <h1 className="text-3xl font-bold text-foreground">Site Under Maintenance</h1>
              <p className="text-muted-foreground">
                {settings.maintenanceMessage}
              </p>
              <div className="animate-pulse mt-8">
                <div className="flex justify-center gap-1">
                  <span className="w-2 h-2 bg-primary rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                  <span className="w-2 h-2 bg-primary rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                  <span className="w-2 h-2 bg-primary rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                </div>
              </div>
            </div>
          </div>
        </body>
      </html>
    );
  }

  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="theme-color" content="#0f172a" />
        <link rel="icon" href="/favicon.ico" />
        <link rel="canonical" href={siteUrl} />
        <meta name="google-adsense-account" content="ca-pub-7196326660809754" />
        <meta name="google-site-verification" content="hFLRkNLTiWW_pvLuqqXe-gZjop_3rJtLqKtpuxkByMc" />

        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Person",
              name: "Ian Iraya",
              url: siteUrl,
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
              knowsAbout: ["Web Development", "Cybersecurity", "SEO"],
            }),
          }}
        />

        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "WebSite",
              name: "Ian Iraya Portfolio",
              url: siteUrl,
              potentialAction: {
                "@type": "SearchAction",
                target: `${siteUrl}/search?q={search_term_string}`,
                "query-input": "required name=search_term_string",
              },
            }),
          }}
        />

        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "ProfessionalService",
              name: "Ian Iraya Portfolio",
              description: "Web Development, Cybersecurity, and SEO Services",
              url: siteUrl,
              telephone: "+254700000000",
              address: {
                "@type": "PostalAddress",
                addressLocality: "Githunguri",
                addressRegion: "Kiambu",
                addressCountry: "KE",
              },
              geo: {
                "@type": "GeoCoordinates",
                latitude: "-1.2",
                longitude: "37.0",
              },
              openingHoursSpecification: {
                "@type": "OpeningHoursSpecification",
                dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
                opens: "09:00",
                closes: "18:00",
              },
              sameAs: [
                "https://twitter.com/ianiraya",
                "https://linkedin.com/in/ianiraya",
              ],
            }),
          }}
        />

        <script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-7196326660809754" crossOrigin="anonymous" />
        <script async src="https://www.googletagmanager.com/gtag/js?id=G-EN1K94FRDB"></script>
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
      <body className="font-sans antialiased">
        <AnalyticsProvider />
        {children}
        <Analytics />
      </body>
    </html>
  )
}