'use client'

import type { Post } from 'content-collections'

import { useQuery } from '@tanstack/react-query'
import { useFormattedDate } from '../hooks/use-formatted-date'
import { useTRPC } from '@/packages/trpc/client'
import Link from 'next/link'
import { BlurImage } from './ui/blur-image'




type PostCardsProps = {
  posts: Post[]
}

type PostCardProps = Post

const PostCards = (props: PostCardsProps) => {
  const { posts } = props

  return (
    <div className='grid gap-4 md:grid-cols-2'>
      {posts.map((post) => (
        <PostCard key={post.slug} {...post} />
      ))}
    </div>
  )
}

const PostCard = (props: PostCardProps) => {
  const { slug, title, summary, date } = props
  const formattedDate = useFormattedDate(date);
  const trpc = useTRPC();

  const viewsQuery = useQuery(trpc.views.get.queryOptions({ slug }))
  const likesQuery = useQuery(trpc.likes.get.queryOptions({ slug }))

  return (
    <Link href={`/blog/${slug}`} className='shadow-feature-card group rounded-xl px-2 py-4'>
      <BlurImage
        src={`/images/blog/${slug}/cover.png`}
        className='rounded-lg'
        width={1200}
        height={630}
        imageClassName='transition-transform group-hover:scale-105'
        alt={title}
      />
      <div className='flex items-center justify-between gap-2 px-2 pt-4 text-sm text-zinc-500'>
        {formattedDate}
        <div className='flex gap-2'>
          {likesQuery.status === 'pending' && '--'}
          {likesQuery.status === 'error' && "Error"}
          {likesQuery.status === 'success' && (
            <div>{likesQuery.data.likes} likes</div>
          )}
          <div>&middot;</div>
          {viewsQuery.status === 'pending' && '--'}
          {viewsQuery.status === 'error' && "Error"}
          {viewsQuery.status === 'success' && (
            <div>{viewsQuery.data.views} views</div>
          )}
        </div>
      </div>
      <div className='flex flex-col px-2 py-4'>
        <h3 className='text-2xl font-semibold'>{title}</h3>
        <p className='text-muted-foreground mt-2'>{summary}</p>
      </div>
    </Link>
  )
}

export default PostCards
