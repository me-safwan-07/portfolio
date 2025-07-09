'use client'

import { useInfiniteQuery } from '@tanstack/react-query'
import { useEffect } from 'react'
import { useInView } from 'react-intersection-observer'

import Comment from './comment'
import CommentLoader from './comment-loader'
import { CommentProvider, useCommentStore } from '@/app/stores/comment'
import { useCommentsStore } from '@/app/stores/comments'
import { useCommentParams } from '@/app/hooks/use-comment-params'
import { useTRPC } from '@/packages/trpc/client'

const CommentReplies = () => {
  const { comment, isOpenReplies, setIsOpenReplies } = useCommentStore((state) => ({
    comment: state.comment,
    isOpenReplies: state.isOpenReplies,
    setIsOpenReplies: state.setIsOpenReplies
  }))
  const slug = useCommentsStore((state) => state.slug)
  const [params] = useCommentParams()

  const trpc = useTRPC()
  const { status, data, fetchNextPage, hasNextPage, isFetchingNextPage } = useInfiniteQuery(
    trpc.comments.getInfiniteComments.infiniteQueryOptions(
      {
        slug,
        sort: 'oldest',
        parentId: comment.id,
        type: 'replies',
        highlightedCommentId: params.reply ?? undefined
      },
      {
        getNextPageParam: (lastPage) => lastPage.nextCursor,
        enabled: isOpenReplies
      }
    )
  )

  const { ref, inView } = useInView()

  useEffect(() => {
    if (inView && hasNextPage) fetchNextPage()
  }, [fetchNextPage, hasNextPage, inView])

  useEffect(() => {
    if (params.comment === comment.id) setIsOpenReplies(true)
  }, [comment.id, params.comment, setIsOpenReplies])

  const isSuccess = status === 'success'
  const isError = status === 'error'
  const isLoading = status === 'pending' || isFetchingNextPage

  return (
    <>
      {isOpenReplies && (
        <div className='space-y-8 pl-7'>
          {isSuccess &&
            data.pages.map((page) =>
              page.comments.map((reply) => (
                <CommentProvider key={reply.id} comment={reply} slug={slug}>
                  <Comment />
                </CommentProvider>
              ))
            )}
          {isError && (
            <div className='flex min-h-20 items-center justify-center'>
              <p className='text-muted-foreground text-sm'>
                Failed to load replies. Please refresh the page.
              </p>
            </div>
          )}
          {isLoading && <CommentLoader />}
          <span ref={ref} className='invisible' />
        </div>
      )}
    </>
  )
}

export default CommentReplies
