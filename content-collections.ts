import { type Context, defineCollection, defineConfig, type Meta } from '@content-collections/core'
import { compileMDX } from '@content-collections/mdx'
import { getTOC, rehypePlugins, remarkPlugins } from '@/packages/mdx-plugins'
import { z } from 'zod'

type BaseDoc = {
  _meta: Meta
  content: string
}

const transform = async <D extends BaseDoc>(document: D, context: Context) => {
  const code = await compileMDX(context, document, {
    remarkPlugins,
    rehypePlugins
  })
  const [path] = document._meta.path.split(/[/\\]/)

  if (!path) {
    throw new Error(`Invalid path: ${document._meta.path}`)
  }

  return {
    ...document,
    code,
    slug: path,
    toc: await getTOC(document.content)
  }
}

const posts = defineCollection({
  name: 'Post',
  directory: 'content/blog',
  include: '**/*.mdx',
  schema: z.object({
    title: z.string(),
    date: z.string(),
    modifiedTime: z.string(),
    summary: z.string()
  }),
  transform
})

const projects = defineCollection({
  name: 'Project',
  directory: 'content/projects',
  include: '**/*.mdx',
  schema: z.object({
    name: z.string(),
    description: z.string(),
    homepage: z.string().optional(),
    github: z.string(),
    techstack: z.array(z.string()),
    selected: z.boolean().optional().default(false)
  }),
  transform
})

const pages = defineCollection({
  name: 'Page',
  directory: 'content/pages',
  include: '**/*.mdx',
  schema: z.object({}),
  transform
})

export default defineConfig({
  collections: [posts, projects, pages]
})
