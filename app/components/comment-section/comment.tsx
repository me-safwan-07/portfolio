'use client'

import { Badge, Skeleton, Tooltip, TooltipContent, TooltipTrigger } from '@/packages/ui'
import Image from 'next/image'
import { useEffect, useRef } from 'react'

import CommentActions from './comment-actions'
import CommentMenu from './comment-menu'
import CommentReplies from './comment-replies'
import CommentReply from './comment-reply'
import { useCommentStore } from '@/app/stores/comment'
import { useCommentParams } from '@/app/hooks/use-comment-params'
import { useFormattedDate } from '@/app/hooks/use-formatted-date'
import Markdown from '../mdx/markdown'

const Comment = () => {
  const commentRef = useRef<HTMLDivElement>(null)
  const { comment, isReplying } = useCommentStore((state) => ({
    comment: state.comment,
    isReplying: state.isReplying
  }))
  const [params] = useCommentParams()

  const isHighlighted = params.reply ? params.reply === comment.id : params.comment === comment.id

  const {
    id,
    body,
    createdAt,
    isDeleted,
    parentId,
    user: { image, name, role },
    replyCount
  } = comment

  const formattedDate = useFormattedDate(comment.createdAt, {
    relative: true
  })

  useEffect(() => {
    if (isHighlighted && commentRef.current) {
      const top = commentRef.current.getBoundingClientRect().top + window.scrollY - 128

      window.scrollTo({ top, behavior: 'smooth' })
    }
  }, [isHighlighted])

  const hasReplies = !parentId && replyCount > 0

  return (
    <>
      <div ref={commentRef} className='p-2.5' data-testid={`comment-${id}`}>
        {isHighlighted && <Badge className='mb-4'>Highlighted comment</Badge>}
        <div className='flex gap-4'>
          <Image
            src={image}
            alt={name}
            width={32}
            height={32}
            className='z-10 size-8 rounded-full'
          />
          <div className='flex-1 overflow-hidden'>
            <div className='ml-0.5 flex h-8 items-center justify-between'>
              <div className='flex items-center gap-2 text-sm'>
                <div className='font-semibold'>{name}</div>
                <div className='text-muted-foreground'>
                  {formattedDate ? (
                    <Tooltip>
                      <TooltipTrigger>
                        <span>{formattedDate}</span>
                      </TooltipTrigger>
                      <TooltipContent>{new Date(createdAt).toLocaleString()}</TooltipContent>
                    </Tooltip>
                  ) : (
                    <Skeleton className='h-4 w-24' />
                  )}
                </div>
                {role === 'admin' && (
                  <div className='rounded-full border border-red-500/50 bg-red-100/50 px-2 py-0.5 text-sm dark:bg-red-900/50'>
                    Author
                  </div>
                )}
              </div>
              <CommentMenu />
            </div>

            {isDeleted ? (
              <p className='text-muted-foreground my-3 ml-0.5 text-sm'>
                [This comment has been deleted]
              </p>
            ) : (
              <Markdown>{body}</Markdown>
            )}

            {isReplying ? <CommentReply /> : <CommentActions />}
          </div>
        </div>
      </div>
      {hasReplies && <CommentReplies />}
    </>
  )
}

export default Comment
