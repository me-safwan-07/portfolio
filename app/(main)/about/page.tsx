import type { Metadata } from 'next'
import Mdx from '@/app/components/mdx/mdx'
import PageTitle from '@/app/components/page-title'
import { allPages } from 'content-collections'
import { notFound } from 'next/navigation'
import { SITE_NAME, SITE_URL } from '@/app/lib/constants'
import { generateBreadcrumbSchema, generatePersonSchema } from '@/app/lib/seo'
import { getPath } from '@/app/utils/get-path'

export const generateMetadata = async (): Promise<Metadata> => {
  const title = 'About'
  const description = `Learn more about ${SITE_NAME}, a Full Stack Developer based in Bangalore, India. Specializing in React, Next.js, TypeScript, and modern web development.`
  const url = getPath('/about')

  return {
    title,
    description,
    alternates: { canonical: url },
    openGraph: {
      url,
      title,
      description,
      type: 'profile',
    },
    twitter: {
      title,
      description,
    }
  }
}

const Page = async () => {
  const title = 'About'
  const description = `Learn more about ${SITE_NAME} — a Full Stack Developer based in Bangalore, India, specializing in React, Next.js, TypeScript, and modern web technologies.`
  const page = allPages.find((p) => p.slug === 'about')

  if (!page) {
    return notFound()
  }

  const { code } = page

  const personSchema = generatePersonSchema()
  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: 'Home', href: '/' },
    { name: 'About' }
  ])

  return (
    <>
      <script
        type='application/ld+json'
        dangerouslySetInnerHTML={{ __html: JSON.stringify(personSchema) }}
      />
      <script
        type='application/ld+json'
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <article>
        <PageTitle title={title} description={description} />
        <Mdx code={code} />
      </article>
    </>
  )
}

export default Page