import type { Metadata } from 'next'
import { allExperiences } from '@/.content-collections/generated'
import PageTitle from '@/app/components/page-title'
import { Timeline } from '@/app/components/experience-timeline'
import { SITE_NAME } from '@/app/lib/constants'
import { generateBreadcrumbSchema } from '@/app/lib/seo'
import { getPath } from '@/app/utils/get-path'

export const generateMetadata = async (): Promise<Metadata> => {
  const title = 'Experience'
  const description = `Professional experience and career timeline of ${SITE_NAME}, a Full Stack Developer based in Bangalore, India.`
  const url = getPath('/experience')

  return {
    title,
    description,
    alternates: { canonical: url },
    openGraph: { url, title, description },
    twitter: { title, description }
  }
}

const Page = async () => {
  const title = 'Experience'
  const description = 'A timeline of my hands-on experience, projects, and the technologies I have worked with as a Full Stack Developer.'

  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: 'Home', href: '/' },
    { name: 'Experience' }
  ])

  const sortedExperiences = allExperiences.toSorted((a, b) => 
    new Date(b.startDate).getTime() - new Date(a.startDate).getTime()
  )

  return (
    <>
      <script
        type='application/ld+json'
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <PageTitle title={title} description={description} />
      <Timeline items={sortedExperiences} />
    </>
  )
}

export default Page