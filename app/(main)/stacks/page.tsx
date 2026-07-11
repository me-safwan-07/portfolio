import type { Metadata, ResolvingMetadata } from 'next'
import type { WebPage, WithContext } from 'schema-dts'

import { allPages } from 'content-collections'
import { notFound } from 'next/navigation'
import { SITE_NAME, SITE_URL } from '@/app/lib/constants'
import PageTitle from '@/app/components/page-title'
import Mdx from '@/app/components/mdx/mdx'
import { getPath } from '@/app/utils/get-path'
import { generateBreadcrumbSchema } from '@/app/lib/seo'

export const generateMetadata = async (
  parent: ResolvingMetadata
): Promise<Metadata> => {
  const previousOpenGraph = (await parent).openGraph ?? {}
  const previousTwitter = (await parent).twitter ?? {}
  const title = "Tech Stack"
  const description = "The technologies, frameworks, and tools that Muhammed Safwan uses for full stack web development including React, Next.js, TypeScript, and more."

  const url = getPath('/stacks');

  return {
    title,
    description,
    alternates: {
      canonical: url,
    },
    openGraph: {
      ...previousOpenGraph,
      url,
      title,
      description
    },
    twitter: {
      ...previousTwitter,
      title,
      description
    }
  }
}

const Page = async () => {
  const title = "Tech Stack"
  const description = "The technologies, frameworks, and tools that Muhammed Safwan uses for full stack web development including React, Next.js, TypeScript, and more."
  const url = getPath('/stacks')
  const page = allPages.find((p) => p.slug === 'stacks')

  const jsonLd: WithContext<WebPage> = {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    name: title,
    description,
    url,
    isPartOf: {
      '@type': 'WebSite',
      name: SITE_NAME,
      url: SITE_URL
    }
  }

  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: 'Home', href: '/' },
    { name: 'Tech Stack' }
  ])

  if (!page) {
    return notFound()
  }

  const { code } = page

  return (
    <>
      <script
        type='application/ld+json'
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <script
        type='application/ld+json'
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <PageTitle title={title} description={description} />
      <Mdx code={code} />
    </>
  )
}

export default Page
