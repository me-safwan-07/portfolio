import type { Metadata, ResolvingMetadata } from 'next'
import type { Article, WithContext } from 'schema-dts'

import { allExperiences } from 'content-collections'
import { notFound } from 'next/navigation'

import Header from './header'
import Mdx from '@/app/components/mdx/mdx'
import { getPath } from '@/app/utils/get-path'
import { SITE_NAME, SITE_URL } from '@/app/lib/constants'
import { generateBreadcrumbSchema } from '@/app/lib/seo'

type PageProps = {
  params: Promise<{
    slug: string
  }>
}

export const generateStaticParams = (): Array<{ slug: string; }> => {
  return allExperiences.map((experience) => ({
    slug: experience.slug,
  }))
}

export const generateMetadata = async (
  props: PageProps,
  parent: ResolvingMetadata
): Promise<Metadata> => {
  const { slug } = await props.params

  const experience = allExperiences.find((e) => e.slug === slug)

  if (!experience) {
    return {}
  }

  const { company, description } = experience
  const previousTwitter = (await parent).twitter ?? {}
  const previousOpenGraph = (await parent).openGraph ?? {}
  const fullSlug = `/experience/${slug}`
  const url = getPath(fullSlug);

  return {
    title: company,
    description: description,
    alternates: {
      canonical: url,
    },
    openGraph: {
      ...previousOpenGraph,
      url,
      title: company,
      description: description,
      images: [
        {
          url: `/images/experience/${slug}/cover.png`,
          width: 1280,
          height: 832,
          alt: description,
          type: 'image/png'
        }
      ]
    },
    twitter: {
      ...previousTwitter,
      title: company,
      description: description,
      images: [
        {
          url: `/images/experience/${slug}/cover.png`,
          width: 1280,
          height: 832,
          alt: description
        }
      ]
    }
  }
}

const animation = {
  hide: {
    x: -30,
    opacity: 0
  },
  show: {
    x: 0,
    opacity: 1
  }
}

const Page = async (props: PageProps) => {
  const { slug } = await props.params;

  const experience = allExperiences.find((p) => p.slug === slug)
  const url = getPath(`/experience/${slug}`)

  if (!experience) {
    notFound()
  }

  const { company, code, description } = experience

  const jsonLd: WithContext<Article> = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: company,
    description,
    url,
    author: {
      '@type': 'Person',
      name: SITE_NAME,
      url: SITE_URL
    },
    image: `${SITE_URL}/images/experience/${slug}/cover.png`
  }

  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: 'Home', href: '/' },
    { name: 'Experience', href: '/experience' },
    { name: company }
  ])

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
      <article className='mx-auto max-w-3xl'>
        <Header {...experience} />
        <Mdx code={code} />
      </article>
    </>
  )
}

export default Page
