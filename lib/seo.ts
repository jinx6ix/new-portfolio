import { Metadata } from 'next';

interface SEOMetadataProps {
  title: string;
  description: string;
  keywords?: string[];
  ogImage?: string;
  ogType?: 'website' | 'article';
  canonical?: string;
  noIndex?: boolean;
}

export function generateSEOMetadata({
  title,
  description,
  keywords = [],
  ogImage,
  ogType = 'website',
  canonical,
  noIndex = false,
}: SEOMetadataProps): Metadata {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://yourdomain.com';
  const fullOgImage = ogImage || `${siteUrl}/og-image.png`;
  const pageTitle = `${title} | Your Brand`;
  const fullCanonical = canonical ? `${siteUrl}${canonical}` : undefined;

  return {
    title: pageTitle,
    description,
    keywords: keywords.join(', '),
    authors: [{ name: 'Your Name' }],
    creator: 'Your Name',
    publisher: 'Your Brand',
    robots: noIndex ? { index: false, follow: false } : { index: true, follow: true },

    alternates: {
      canonical: fullCanonical,
    },

    openGraph: {
      title: pageTitle,
      description,
      url: fullCanonical || siteUrl,
      siteName: 'Your Brand',
      images: [
        {
          url: fullOgImage,
          width: 1200,
          height: 630,
          alt: title,
        },
      ],
      locale: 'en_US',
      type: ogType,
    },

    twitter: {
      card: 'summary_large_image',
      title: pageTitle,
      description,
      images: [fullOgImage],
      creator: '@yourtwitterhandle',
    },

    icons: {
      icon: '/favicon.ico',
      apple: '/apple-touch-icon.png',
    },

    metadataBase: new URL(siteUrl),
  };
}

export function generateArticleMetadata({
  title,
  description,
  author,
  publishedAt,
  modifiedAt,
  ogImage,
  tags = [],
}: {
  title: string;
  description: string;
  author: string;
  publishedAt: string;
  modifiedAt?: string;
  ogImage?: string;
  tags?: string[];
}): Metadata {
  return {
    title,
    description,
    authors: [{ name: author }],
    keywords: tags.join(', '),

    openGraph: {
      title,
      description,
      type: 'article',
      publishedTime: publishedAt,
      modifiedTime: modifiedAt,
      authors: [author],
      tags,
    },

    twitter: {
      card: 'summary_large_image',
      title,
      description,
    },
  };
}

export function generateProductMetadata({
  title,
  description,
  price,
  currency = 'USD',
  ogImage,
}: {
  title: string;
  description: string;
  price: number;
  currency?: string;
  ogImage?: string;
}): Metadata {
  const metadata = generateSEOMetadata({
    title,
    description,
    ogType: 'website',
    ogImage,
  });

  return {
    ...metadata,
    openGraph: {
      ...metadata.openGraph,
      price,
      priceCurrency: currency,
    } as unknown as NonNullable<Metadata['openGraph']>,
  };
}

export const siteSchema = {
  '@context': 'https://schema.org',
  '@type': 'Person',
  name: 'Your Name',
  jobTitle: 'Professional Title',
  url: process.env.NEXT_PUBLIC_SITE_URL || 'https://yourdomain.com',
  sameAs: [
    'https://twitter.com/yourtwitterhandle',
    'https://linkedin.com/in/yourlinkedin',
    'https://github.com/yourgithub',
  ],
  knowsAbout: ['Web Development', 'Cybersecurity', 'SEO'],
  alumniOf: 'Your University',
};

export function OrganizationSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'Your Brand',
    url: process.env.NEXT_PUBLIC_SITE_URL || 'https://yourdomain.com',
    logo: `${process.env.NEXT_PUBLIC_SITE_URL || 'https://yourdomain.com'}/logo.png`,
    sameAs: [
      'https://twitter.com/yourtwitterhandle',
      'https://linkedin.com/company/yourcompany',
    ],
    contactPoint: {
      '@type': 'ContactPoint',
      email: 'contact@yourdomain.com',
      contactType: 'customer service',
    },
  };
}

export function WebsiteSchema() {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://yourdomain.com';
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: 'Your Brand',
    url: siteUrl,
    description: 'Professional portfolio and services',
    potentialAction: {
      '@type': 'SearchAction',
      target: `${siteUrl}/search?q={search_term_string}`,
      'query-input': 'required name=search_term_string',
    },
  };
}