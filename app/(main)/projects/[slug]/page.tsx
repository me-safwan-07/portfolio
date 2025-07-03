import type { Metadata, ResolvingMetadata } from 'next'
import type { SoftwareApplication, WithContext } from 'schema-dts'

import { allProjects } from 'content-collections'
import { notFound } from 'next/navigation'

import Header from './header'
import { BlurImage } from '@/app/components/ui/blur-image'
import Mdx from '@/app/components/mdx/mdx'
import { getPath } from '@/app/utils/get-path'
import { SITE_NAME, SITE_URL } from '@/app/lib/constants'

type PageProps = {
  params: Promise<{
    slug: string
  }>
}

export const generateStaticParams = (): Array<{ slug: string; }> => {
  return allProjects.map((project) => ({
    slug: project.slug,
  }))
}

export const generateMetadata = async (
  props: PageProps,
  parent: ResolvingMetadata
): Promise<Metadata> => {
  const { slug } = await props.params

  const project = allProjects.find((p) => p.slug === slug)

  if (!project) {
    return {}
  }

  const { name, description } = project
  const previousTwitter = (await parent).twitter ?? {}
  const previousOpenGraph = (await parent).openGraph ?? {}
  const fullSlug = `/projects/${slug}`
  const url = getPath(fullSlug);

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
      images: [
        {
          url: `/images/projects/${slug}/cover.png`,
          width: 1280,
          height: 832,
          alt: description,
          type: 'image/png'
        }
      ]
    },
    twitter: {
      ...previousTwitter,
      title: name,
      description: description,
      images: [
        {
          url: `/images/projects/${slug}/cover.png`,
          width: 1280,
          height: 832,
          alt: description
        }
      ]
    }
  }
}

const Page = async (props: PageProps) => {
  const { slug } = await props.params;

  const project = allProjects.find((p) => p.slug === slug)
  const url = getPath(slug)

  if (!project) {
    notFound()
  }

  const { name, code, description, github } = project

  const jsonLd: WithContext<SoftwareApplication> = {
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    name,
    description,
    url,
    applicationCategory: 'WebApplication',
    author: {
      '@type': 'Person',
      name: SITE_NAME,
      url: SITE_URL
    },
    sameAs: [github],
    screenshot: `${SITE_URL}/images/projects/${slug}/cover.png`
  }

  return (
    <>
      <script
        type='application/ld+json'
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <div className='mx-auto max-w-3xl'>
        <Header {...project} />
        <BlurImage
          src={`/images/projects/${slug}/cover.png`}
          width={1280}
          height={832}
          alt={name}
          className='my-12 rounded-lg'
          lazy={false}
        />
        <Mdx code={code} />
      </div>
    </>
  )
}

export default Page
