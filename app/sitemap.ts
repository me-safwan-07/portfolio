import type { MetadataRoute } from 'next'

import { allPages, allPosts, allProjects } from 'content-collections'
import { SITE_URL } from './lib/constants'


const sitemap = (): MetadataRoute.Sitemap => {
  const routes = [
    '',
    '/blog',
    // '/guestbook',
    '/projects',
    // '/dashboard',
    ...new Set(allPages.map((page) => `/${page.slug}`)),
    ...new Set(allProjects.map((project) => `/projects/${project.slug}`)),
    ...new Set(allPosts.map((post) => `/blog/${post.slug}`))
  ]

    return routes.map((route) => ({
      url: `${SITE_URL}${route}`,
      lastModified: new Date()
    }))
}

export default sitemap
