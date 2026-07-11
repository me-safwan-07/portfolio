'use client'

import { useQuery } from '@tanstack/react-query'
import { buttonVariants } from '@/packages/ui'
import { allPosts, type Post } from 'content-collections'
import { ArrowUpRightIcon, PencilIcon } from 'lucide-react'
import { motion, useInView } from 'motion/react'
import { useRef } from 'react'
import { cn } from '@/packages/utils/cn'
import Link from 'next/link'
import { BlurImage } from '../ui/blur-image'
import { useFormattedDate } from '@/app/hooks/use-formatted-date'

const variants = {
  initial: {
    y: 40,
    opacity: 0
  },
  animate: {
    y: 0,
    opacity: 1
  }
}

const LatestArticles = () => {
  const projectsRef = useRef<HTMLDivElement>(null)
  const isInView = useInView(projectsRef, { once: true, margin: '-100px' })
  const filteredPosts = allPosts
    .toSorted((a, b) => {
      return new Date(b.date).getTime() - new Date(a.date).getTime()
    })
    .slice(0, 2)

  return (
    <motion.section
      aria-labelledby="articles-heading"
      initial='initial'
      animate={isInView ? 'animate' : 'initial'}
      variants={variants}
      ref={projectsRef}
      transition={{
        duration: 0.5
      }}
      className='my-24'
    >
      <motion.h2
        id="articles-heading"
        className='text-center text-3xl font-semibold'
        initial={{
          y: 30,
          opacity: 0
        }}
        animate={{
          y: 0,
          opacity: 1
        }}
        transition={{
          duration: 0.3
        }}
      >
        Latest Articles
      </motion.h2>
      <motion.div
        className='mt-12 grid gap-4 md:grid-cols-2'
        initial={{
          y: 40,
          opacity: 0
        }}
        animate={{
          y: 0,
          opacity: 1
        }}
        transition={{
          duration: 0.3
        }}
      >
        {filteredPosts.map((post) => (
          <Card key={post.slug} post={post} />
        ))}
      </motion.div>
      <div className='my-8 flex items-center justify-center'>
        <Link
          href='/blog'
          className={cn(
            buttonVariants({
              variant: 'outline'
            }),
            'rounded-xl'
          )}
        >
          See all articles
        </Link>
      </div>
    </motion.section>
  )
}

type CardProps = {
  post: Post
}

const Card = (props: CardProps) => {
  const { post } = props
  const { slug, title, summary, date } = post
  const formattedDate = useFormattedDate(date)

  return (
    <Link href={`/blog/${slug}`} className='shadow-feature-card group relative rounded-xl p-2'>
      <article className="h-full w-full">
        <div className='flex items-center justify-between p-4'>
          <div className='flex items-center gap-3'>
            <PencilIcon className='size-[18px]' />
            <span className="font-medium">Article</span>
          </div>
          <ArrowUpRightIcon className='size-[18px] opacity-0 transition-opacity group-hover:opacity-100' />
        </div>
        <BlurImage
          width={1200}
          height={630}
          src={`/images/blog/${slug}/cover.png`}
          alt={title}
          className='rounded-lg'
        />
        <div className='flex items-center justify-between gap-2 px-2 pt-4 text-sm text-foreground'>
          {formattedDate}
        </div>
        <div className='flex flex-col px-2 py-4 transition-transform ease-out group-hover:translate-x-0.5'>
          <h3 className='text-2xl font-semibold'>{title}</h3>
          <p className='text-muted-foreground mt-2'>{summary}</p>
        </div>
      </article>
    </Link>
  )
}

export default LatestArticles
