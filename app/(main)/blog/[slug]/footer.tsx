'use client'

import Link from 'next/link'
import { useFormattedDate } from '@/app/hooks/use-formatted-date'
import { linkVariants } from '@/packages/ui'
import { usePostStore } from '@/app/stores/post'

const Footer = () => {
  const { slug, modifiedTime } = usePostStore((state) => state.post)

  const editURL = `https://github.com/me-safwan-07/portfolio/blob/main/apps/web/src/content/blog/${slug}.mdx?plain=1`

  const formattedDate = useFormattedDate(modifiedTime)

  return (
    <div className='my-8 flex w-full items-center justify-between py-4 text-sm'>
      <Link href={editURL} className={linkVariants({ variant: 'muted' })}>
        Edit on Github
      </Link>
      <div className='text-muted-foreground'>
        Last updated: {formattedDate}
      </div>
    </div>
  )
}

export default Footer
