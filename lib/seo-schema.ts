export const generateOrganizationSchema = () => {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "Ian Iraya",
    url: "https://ianiraya.com",
    logo: "https://ianiraya.com/logo.png",
    description: "Web Developer, Cybersecurity Expert & SEO Manager based in Kenya",
    address: {
      "@type": "PostalAddress",
      streetAddress: "Githunguri",
      addressLocality: "Kiambu",
      addressRegion: "Kenya",
      postalCode: "00100",
      addressCountry: "KE",
    },
    contactPoint: {
      "@type": "ContactPoint",
      contactType: "Customer Service",
      telephone: "+254-756-256-34",
      email: "jinxed435@gmail.com",
    },
    sameAs: [
      "https://linkedin.com/in/ianiraya",
      "https://github.com/ianiraya",
      "https://twitter.com/ianiraya",
      "https://www.tiktok.com/@ianiraya",
      "https://www.instagram.com/ianiraya",
    ],
  }
}

export const generateServiceSchema = (serviceName: string, description: string, price?: number) => {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    name: serviceName,
    description: description,
    provider: {
      "@type": "Organization",
      name: "Ian Iraya",
      url: "https://ianiraya.com",
    },
    ...(price && {
      offers: {
        "@type": "Offer",
        price: price,
        priceCurrency: "KES",
      },
    }),
  }
}

export const generateBreadcrumbSchema = (items: Array<{ name: string; url: string }>) => {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: item.url,
    })),
  }
}

export const generateFAQSchema = (faqs: Array<{ question: string; answer: string }>) => {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
  }
}

export const generateArticleSchema = (
  title: string,
  description: string,
  image: string,
  datePublished: string,
  dateModified: string,
  author = "Ian Iraya",
) => {
  return {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: title,
    description: description,
    image: image,
    datePublished: datePublished,
    dateModified: dateModified,
    author: {
      "@type": "Person",
      name: author,
      url: "https://ianiraya.com",
    },
    publisher: {
      "@type": "Organization",
      name: "Ian Iraya",
      logo: {
        "@type": "ImageObject",
        url: "https://ianiraya.com/logo.png",
      },
    },
  }
}

export const generateLocalBusinessSchema = () => {
  return {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    name: "Ian Iraya - Web Developer & Cybersecurity Expert",
    image: "https://ianiraya.com/logo.png",
    description: "Professional web development, cybersecurity, and SEO services in Kenya",
    address: {
      "@type": "PostalAddress",
      streetAddress: "Githunguri",
      addressLocality: "Kiambu",
      addressRegion: "Kenya",
      postalCode: "00100",
      addressCountry: "KE",
    },
    telephone: "+254-756-256-34",
    email: "jinxed435@gmail.com",
    url: "https://ianiraya.com",
    priceRange: "KES 12,000 - KES 100,000",
    areaServed: "KE",
    serviceType: ["Web Development", "Cybersecurity", "SEO Management", "Web Hosting"],
  }
}
