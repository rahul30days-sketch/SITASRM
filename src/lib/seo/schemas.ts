export function organizationSchema(siteSettings: {
  siteName: string
  phone?: string[]
  email?: string[]
  address?: string
  socialLinks?: Record<string, string>
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'EducationalOrganization',
    name: siteSettings.siteName,
    url: process.env.NEXT_PUBLIC_SERVER_URL,
    logo: `${process.env.NEXT_PUBLIC_SERVER_URL}/logo.png`,
    telephone: siteSettings.phone?.[0],
    email: siteSettings.email?.[0],
    address: siteSettings.address
      ? {
          '@type': 'PostalAddress',
          streetAddress: siteSettings.address,
          addressCountry: 'IN',
        }
      : undefined,
    sameAs: siteSettings.socialLinks
      ? Object.values(siteSettings.socialLinks).filter(Boolean)
      : undefined,
  }
}

export function courseSchema(program: {
  name: string
  shortDescription?: string
  duration?: string
  fees?: { tuitionFee?: number }
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Course',
    name: program.name,
    description: program.shortDescription,
    provider: {
      '@type': 'EducationalOrganization',
      name: 'SERI - SITASRM Engineering & Research Institute',
      url: process.env.NEXT_PUBLIC_SERVER_URL,
    },
    timeRequired: program.duration,
    offers: program.fees?.tuitionFee
      ? {
          '@type': 'Offer',
          price: program.fees.tuitionFee,
          priceCurrency: 'INR',
        }
      : undefined,
  }
}

export function articleSchema(article: {
  title: string
  content?: string
  publishedAt?: string
  author?: { name: string }
  featuredImage?: { url: string }
  slug: string
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: article.title,
    datePublished: article.publishedAt,
    author: article.author
      ? { '@type': 'Person', name: article.author.name }
      : undefined,
    image: article.featuredImage?.url,
    url: `${process.env.NEXT_PUBLIC_SERVER_URL}/news/${article.slug}`,
    publisher: {
      '@type': 'EducationalOrganization',
      name: 'SERI',
    },
  }
}

export function eventSchema(event: {
  title: string
  startDate: string
  endDate?: string
  venue?: string
  shortDescription?: string
  slug: string
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Event',
    name: event.title,
    startDate: event.startDate,
    endDate: event.endDate,
    location: event.venue
      ? { '@type': 'Place', name: event.venue }
      : undefined,
    description: event.shortDescription,
    url: `${process.env.NEXT_PUBLIC_SERVER_URL}/events/${event.slug}`,
  }
}

export function faqSchema(faqs: { question: string; answer: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((faq) => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer,
      },
    })),
  }
}

export function breadcrumbSchema(items: { label: string; href: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.label,
      item: `${process.env.NEXT_PUBLIC_SERVER_URL}${item.href}`,
    })),
  }
}
