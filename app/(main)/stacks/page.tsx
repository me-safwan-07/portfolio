import type { Metadata, ResolvingMetadata } from 'next'
import type { WebPage, WithContext } from 'schema-dts'

import { allPages } from 'content-collections'
import { notFound } from 'next/navigation'
import { SITE_NAME, SITE_URL } from '@/app/lib/constants'
import PageTitle from '@/app/components/page-title'
import Mdx from '@/app/components/mdx/mdx'

export const generateMetadata = async (
  parent: ResolvingMetadata
): Promise<Metadata> => {
  const previousOpenGraph = (await parent).openGraph ?? {}
  const previousTwitter = (await parent).twitter ?? {}
  const title = "Uses"
  const description = "This is the equipment I currently use for gaming, programming, making videos, and every day."

  const slug = '/uses'
  const url = `${SITE_NAME}${slug}`;

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
  const title = "Skills"
  const description = "This is the equipment I currently use for gaming, programming, making videos, and every day."
  const url = `${SITE_NAME}/stacks`
  const page = allPages.find((p) => p.slug === 'stacks')

  const jsonLd: WithContext<WebPage> = {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    name: title,
    description,
    url,
    isPartOf: {
      '@type': 'WebSite',
      name: 'Muhammed Safwan - A Full Stack Developer',
      url: SITE_URL
    }
  }

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
      <PageTitle title={title} description={description} />
      <Mdx code={code} />
    </>
  )
}

export default Page
