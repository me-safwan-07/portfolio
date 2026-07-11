import type { MetadataRoute } from 'next'
import { allPages, allPosts, allProjects } from 'content-collections'
import { allExperiences } from '@/.content-collections/generated'
import { SITE_URL } from './lib/constants'

const sitemap = (): MetadataRoute.Sitemap => {
  const routes: MetadataRoute.Sitemap = [
    {
      url: SITE_URL,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 1.0
    },
    {
      url: `${SITE_URL}/about`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.8
    },
    {
      url: `${SITE_URL}/projects`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.9
    },
    {
      url: `${SITE_URL}/experience`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.8
    },
    {
      url: `${SITE_URL}/blog`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.9
    },
    {
      url: `${SITE_URL}/stacks`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.5
    },
    ...allProjects.map((project) => ({
      url: `${SITE_URL}/projects/${project.slug}`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.7
    })),
    ...allPosts.map((post) => ({
      url: `${SITE_URL}/blog/${post.slug}`,
      lastModified: new Date(post.modifiedTime),
      changeFrequency: 'monthly' as const,
      priority: 0.7
    })),
    ...allExperiences.map((exp) => ({
      url: `${SITE_URL}/experience/${exp.slug}`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.6
    }))
  ]

  return routes
}

export default sitemap
