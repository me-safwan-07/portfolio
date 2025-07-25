import type { Metadata, ResolvingMetadata } from 'next'
import type { Article, WithContext } from 'schema-dts'

import { allPosts } from 'content-collections'
import { notFound } from 'next/navigation'
import { Suspense } from 'react'



import Footer from './footer'
import Header from './header'
import LikeButton from './like-button'
import MobileTableOfContents from './mobile-table-of-contents'
import ProgressBar from './progress-bar'
import Providers from './providers'
import TableOfContents from './table-of-contents'
import { SITE_NAME, SITE_URL } from '@/app/lib/constants'
import Mdx from '@/app/components/mdx/mdx'
import { flags } from '@/packages/env'
import CommentSection from '@/app/components/comment-section'
import { getPath } from '@/app/utils/get-path'

type PageProps = {
  params: Promise<{
    slug: string
    locale: string
  }>
}

export const generateStaticParams = (): Array<{ slug: string;}> => {
  return allPosts.map((post) => ({
    slug: post.slug,
  }))
}

export const generateMetadata = async (
  props: PageProps,
  parent: ResolvingMetadata
): Promise<Metadata> => {
  const { slug } = await props.params

  const post = allPosts.find((p) => p.slug === slug)

  if (!post) return {}

  const { date, modifiedTime, title, summary } = post

  const ISOPublishedTime = new Date(date).toISOString()
  const ISOModifiedTime = new Date(modifiedTime).toISOString()
  const previousTwitter = (await parent).twitter ?? {}
  const previousOpenGraph = (await parent).openGraph ?? {}
  const fullSlug = `/blog/${slug}`
  const url = `${SITE_NAME}+${fullSlug}`;

  return {
    title: title,
    description: summary,
    alternates: {
      canonical: url,
      languages: {
          'en': getPath(fullSlug),
        'x-default': getPath(fullSlug)
      }
    },
    openGraph: {
      ...previousOpenGraph,
      url,
      type: 'article',
      title: title,
      description: summary,
      publishedTime: ISOPublishedTime,
      modifiedTime: ISOModifiedTime,
      authors: SITE_URL,
      images: [
        {
          url: `/og/${slug}`,
          width: 1200,
          height: 630,
          alt: title,
          type: 'image/png'
        }
      ]
    },
    twitter: {
      ...previousTwitter,
      title: title,
      description: summary,
      images: [
        {
          url: `/og/${slug}`,
          width: 1200,
          height: 630,
          alt: title
        }
      ]
    }
  }
}

const Page = async (props: PageProps) => {
  const { slug } = await props.params

  const post = allPosts.find((p) => p.slug === slug)
  const url = `${SITE_NAME}+/blog/${slug}`;

  if (!post) {
    notFound()
  }

  const { title, summary, date, modifiedTime, code, toc } = post

  const jsonLd: WithContext<Article> = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: title,
    name: title,
    description: summary,
    url,
    datePublished: date,
    dateModified: modifiedTime,
    image: `${SITE_URL}/og/${slug}`,
    author: {
      '@type': 'Person',
      name: SITE_NAME,
      url: SITE_URL
    },
    publisher: {
      '@type': 'Person',
      name: SITE_NAME,
      url: SITE_URL
    }
  }

  return (
    <>
      <script
        type='application/ld+json'
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <Providers post={post}>
        <Header />

        <div className='mt-8 flex flex-col justify-between lg:flex-row'>
          <article className='w-full lg:w-[670px]'>
            <Mdx code={code} />
          </article>
          <aside className='lg:min-w-[270px] lg:max-w-[270px]'>
            <div className='sticky top-24'>
              {toc.length > 0 && <TableOfContents toc={toc} />} 
              {flags.likeButton && <LikeButton slug={slug} />}
            </div>
          </aside>
        </div>
        <ProgressBar />

        {toc.length > 0 && <MobileTableOfContents toc={toc} />}
        <Footer />
      </Providers>

      {flags.comment && (
        <Suspense>
          <CommentSection slug={slug} />
        </Suspense>
      )}
    </>
  )
}

export default Page
