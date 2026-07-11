import type { Metadata, ResolvingMetadata } from 'next'
import { allServices } from 'content-collections'
import { notFound } from 'next/navigation'
import Mdx from '@/app/components/mdx/mdx'
import { getPath } from '@/app/utils/get-path'
import { SITE_NAME, SITE_URL } from '@/app/lib/constants'
import { generateBreadcrumbSchema } from '@/app/lib/seo'

type PageProps = {
  params: Promise<{
    slug: string
  }>
}

export const generateStaticParams = (): Array<{ slug: string }> => {
  return allServices.map((service) => ({
    slug: service.slug,
  }))
}

export const generateMetadata = async (
  props: PageProps,
  parent: ResolvingMetadata
): Promise<Metadata> => {
  const { slug } = await props.params

  const service = allServices.find((s) => s.slug === slug)

  if (!service) {
    return {}
  }

  const { name, description } = service
  const previousTwitter = (await parent).twitter ?? {}
  const previousOpenGraph = (await parent).openGraph ?? {}
  const fullSlug = `/services/${slug}`
  const url = getPath(fullSlug)

  return {
    title: name,
    description: description,
    alternates: {
      canonical: url,
    },
    openGraph: {
      ...previousOpenGraph,
      url,
      title: name,
      description: description,
    },
    twitter: {
      ...previousTwitter,
      title: name,
      description: description,
    }
  }
}

const Page = async (props: PageProps) => {
  const { slug } = await props.params

  const service = allServices.find((s) => s.slug === slug)
  const url = getPath(`/services/${slug}`)

  if (!service) {
    notFound()
  }

  const { name, code, description } = service

  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: 'Home', href: '/' },
    { name: name }
  ])

  return (
    <>
      <script
        type='application/ld+json'
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <article className='mx-auto max-w-3xl'>
        <div className='my-12 flex flex-col gap-4'>
          <h1 className='text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl'>
            {name}
          </h1>
          <p className='text-muted-foreground text-lg'>
            {description}
          </p>
        </div>
        
        <div className='prose dark:prose-invert max-w-none'>
          <Mdx code={code} />
        </div>
      </article>
    </>
  )
}

export default Page
