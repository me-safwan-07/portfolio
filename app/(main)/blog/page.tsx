import type { Metadata, ResolvingMetadata } from 'next'
import type { Blog, WithContext } from 'schema-dts'

import { allPosts } from 'content-collections'
import { SITE_NAME, SITE_URL } from '@/app/lib/constants'
import PageTitle from '@/app/components/page-title'
import FilteredPosts from '@/app/components/filtered-posts'
import { getPath } from '@/app/utils/get-path'


type PageProps = {
  params: Promise<{
    locale: string
  }>
}

export const generateMetadata = async (
  props: PageProps,
  parent: ResolvingMetadata
): Promise<Metadata> => {
  const previousOpenGraph = (await parent).openGraph ?? {}
  const previousTwitter = (await parent).twitter ?? {}
  const title = 'Blog'
  const description = 'My personal website and blog where I share my thoughts on various topics including tutorials, notes, and personal experiences. As a full-stack engineer from Hong Kong, I started learning web development as a hobby in December 2020. I use Next.js for building websites, GitHub for code hosting, and Vercel for deployment. Explore my site to learn more about my Journey and discover some of the web development resources that have inspired me.'
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
  const description = "My personal website and blog where I share my thoughts on various topics including tutorials, notes, and personal experiences. As a full-stack engineer from Hong Kong, I started learning web development as a hobby in December 2020. I use Next.js for building websites, GitHub for code hosting, and Vercel for deployment. Explore my site to learn more about my Journey and discover some of the web development resources that have inspired me."
  const url = `${SITE_URL}+/blog`;

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

  return (
    <>
      <script
        type='application/ld+json'
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <PageTitle title={title} description={description} />
      <FilteredPosts posts={posts} />
    </>
  )
}

export default Page
