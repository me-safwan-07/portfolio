import fs from 'node:fs/promises'
import path from 'node:path'

import { consola } from 'consola'

import { db } from './db'
import { posts } from './schema'

const main = async () => {
  try {
    const files = await fs.readdir(path.join(process.cwd(), '../content/blog'));

    for (const file of files) {
      const slug = file.replace('.mdx', '')
      await db.insert(posts).values({ slug, views: 0 })
    }

    consola.success('Data inserted successfully!')

    process.exit(0)
  } catch (error) {
    consola.error('Error inserting data:\n', error)
  }
}

main()
