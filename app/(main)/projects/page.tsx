import type { Metadata } from 'next'
import { allProjects } from '@/.content-collections/generated'
import PageTitle from '@/app/components/page-title'
import ProjectCards from '@/app/components/project-cards'
import { SITE_NAME } from '@/app/lib/constants'
import { generateBreadcrumbSchema } from '@/app/lib/seo'
import { getPath } from '@/app/utils/get-path'

export const generateMetadata = async (): Promise<Metadata> => {
  const title = 'Projects'
  const description = `Explore the web development projects built by ${SITE_NAME}. Full stack applications, SaaS platforms, and modern websites using React, Next.js, and TypeScript.`
  const url = getPath('/projects')

  return {
    title,
    description,
    alternates: { canonical: url },
    openGraph: { url, title, description },
    twitter: { title, description }
  }
}

const Page = async () => {
  const title = 'Projects'
  const description = `Explore the web development projects built by ${SITE_NAME} — full stack applications, SaaS platforms, and modern websites crafted with passion.`

  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: 'Home', href: '/' },
    { name: 'Projects' }
  ])

  return (
    <>
      <script
        type='application/ld+json'
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <PageTitle title={title} description={description} />
      <ProjectCards projects={allProjects} />
    </>
  )
}

export default Page