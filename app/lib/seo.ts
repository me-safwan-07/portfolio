import { SITE_GITHUB_URL, SITE_INSTAGRAM_URL, SITE_LINKEDIN_URL, SITE_NAME, SITE_URL, SITE_X_URL, SITE_YOUTUBE_URL, SITE_EMAIL } from './constants'

/**
 * Generates a BreadcrumbList JSON-LD schema for any page.
 * @param items - Array of breadcrumb items with name and optional href
 */
export function generateBreadcrumbSchema(items: Array<{ name: string; href?: string }>) {
  return {
    '@context': 'https://schema.org' as const,
    '@type': 'BreadcrumbList' as const,
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem' as const,
      position: index + 1,
      name: item.name,
      ...(item.href ? { item: item.href.startsWith('http') ? item.href : `${SITE_URL}${item.href}` } : {})
    }))
  }
}

/**
 * Generates a comprehensive Person JSON-LD schema for Muhammed Safwan.
 */
export function generatePersonSchema() {
  return {
    '@context': 'https://schema.org' as const,
    '@type': 'Person' as const,
    '@id': `${SITE_URL}/#person`,
    name: SITE_NAME,
    givenName: 'Muhammed',
    familyName: 'Safwan',
    url: SITE_URL,
    image: `${SITE_URL}/images/me.jpg`,
    email: `mailto:${SITE_EMAIL}`,
    jobTitle: 'Full Stack Developer',
    description: 'Full Stack Developer specializing in React, Next.js, TypeScript, and MERN Stack development, based in Bangalore, India.',
    address: {
      '@type': 'PostalAddress' as const,
      addressLocality: 'Bengaluru',
      addressRegion: 'Karnataka',
      addressCountry: 'IN'
    },
    sameAs: [
      SITE_GITHUB_URL,
      SITE_LINKEDIN_URL,
      SITE_INSTAGRAM_URL,
      SITE_X_URL,
      SITE_YOUTUBE_URL
    ],
    knowsAbout: [
      'Full Stack Development',
      'Web Development',
      'React',
      'Next.js',
      'TypeScript',
      'JavaScript',
      'Node.js',
      'PostgreSQL',
      'MongoDB',
      'MERN Stack',
      'Tailwind CSS',
      'Prisma',
      'REST APIs',
      'SaaS Development',
      'Frontend Development',
      'Backend Development'
    ],
    knowsLanguage: ['English', 'Hindi'],
    nationality: {
      '@type': 'Country' as const,
      name: 'India'
    }
  }
}

/**
 * Generates a ProfessionalService JSON-LD schema.
 */
export function generateProfessionalServiceSchema() {
  return {
    '@context': 'https://schema.org' as const,
    '@type': 'ProfessionalService' as const,
    '@id': `${SITE_URL}/#professional-service`,
    name: `${SITE_NAME} — Full Stack Development Services`,
    url: SITE_URL,
    description: 'Professional web development services including Full Stack Development, SaaS platforms, business websites, landing pages, e-commerce, and API development.',
    provider: {
      '@type': 'Person' as const,
      '@id': `${SITE_URL}/#person`,
      name: SITE_NAME
    },
    areaServed: {
      '@type': 'Country' as const,
      name: 'India'
    },
    serviceType: [
      'Full Stack Development',
      'Web Development',
      'Frontend Development',
      'Backend Development',
      'API Development',
      'SaaS Development',
      'Business Websites',
      'Landing Pages',
      'Portfolio Websites',
      'E-commerce Development',
      'Website Maintenance'
    ],
    address: {
      '@type': 'PostalAddress' as const,
      addressLocality: 'Bengaluru',
      addressRegion: 'Karnataka',
      addressCountry: 'IN'
    }
  }
}

/**
 * Generates a FAQ JSON-LD schema.
 */
export function generateFAQSchema(faqs: Array<{ question: string; answer: string }>) {
  return {
    '@context': 'https://schema.org' as const,
    '@type': 'FAQPage' as const,
    mainEntity: faqs.map((faq) => ({
      '@type': 'Question' as const,
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer' as const,
        text: faq.answer
      }
    }))
  }
}

/**
 * Generates an enhanced WebSite JSON-LD schema with SearchAction.
 */
export function generateWebSiteSchema() {
  return {
    '@context': 'https://schema.org' as const,
    '@type': 'WebSite' as const,
    '@id': `${SITE_URL}/#website`,
    name: `${SITE_NAME} — Full Stack Developer`,
    description: 'Portfolio and blog of Muhammed Safwan, a Full Stack Developer based in Bangalore, India specializing in React, Next.js, and MERN Stack.',
    url: SITE_URL,
    author: {
      '@type': 'Person' as const,
      '@id': `${SITE_URL}/#person`,
      name: SITE_NAME
    },
    publisher: {
      '@type': 'Person' as const,
      '@id': `${SITE_URL}/#person`,
      name: SITE_NAME
    },
    inLanguage: 'en',
    copyrightYear: new Date().getFullYear(),
    dateCreated: '2024-01-01',
    dateModified: new Date().toISOString()
  }
}
