import type { Metadata, ResolvingMetadata } from 'next'
import type { Blog, WithContext } from 'schema-dts'

import { allPosts } from 'content-collections'
import { SITE_NAME, SITE_URL } from '@/app/lib/constants'
import PageTitle from '@/app/components/page-title'
import FilteredPosts from '@/app/components/filtered-posts'
import { getPath } from '@/app/utils/get-path'
import { generateBreadcrumbSchema } from '@/app/lib/seo'


export const generateMetadata = async (
  parent: ResolvingMetadata
): Promise<Metadata> => {
  const previousOpenGraph = (await parent).openGraph ?? {}
  const previousTwitter = (await parent).twitter ?? {}
  const title = 'Blog'
  const description = 'Explore articles and tutorials by Muhammed Safwan on web development, React, Next.js, TypeScript, and full stack engineering. Insights from a developer based in Bangalore, India.'
  const slug = '/blog'
  const url = getPath(slug);

  return {
    title,
    description,
    alternates: {
      canonical: url,
      languages: {
        'en': url,
        'x-default': url,
      }
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
  const title = "Blog"
  const description = "Explore articles and tutorials by Muhammed Safwan on web development, React, Next.js, TypeScript, and full stack engineering. Insights from a developer based in Bangalore, India."
  const url = getPath('/blog');

  const posts = allPosts
    .toSorted((a, b) => {
      return new Date(b.date).getTime() - new Date(a.date).getTime()
    })

  const jsonLd: WithContext<Blog> = {
    '@context': 'https://schema.org',
    '@type': 'Blog',
    '@id': url,
    name: title,
    description,
    url,
    author: {
      '@type': 'Person',
      name: SITE_NAME,
      url: SITE_URL
    },
    blogPost: allPosts.map((post) => ({
      '@type': 'BlogPosting',
      headline: post.title,
      url: `${url}/${post.slug}`,
      datePublished: post.date,
      dateModified: post.modifiedTime
    }))
  }

  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: 'Home', href: '/' },
    { name: 'Blog' }
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
      <PageTitle title={title} description={description} />
      <FilteredPosts posts={posts} />
    </>
  )
}

export default Page
