'use client'


import { RatesProvider } from '@/app/stores/rates'
import CommentList from './comment-list'
import CommentPost from './comment-post'
import { CommentsProvider } from '@/app/stores/comments'

type CommentSectionProps = {
  slug: string
}

const CommentSection = (props: CommentSectionProps) => {
  const { slug } = props

  return (
    <RatesProvider initialCount={0}>
      <CommentsProvider slug={slug} sort='newest'>
        <div className='space-y-6'>
          <CommentPost />
          <CommentList />
        </div>
      </CommentsProvider>
    </RatesProvider>
  )
}

export default CommentSection
