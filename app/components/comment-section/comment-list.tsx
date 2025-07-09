'use client'

import { keepPreviousData, useInfiniteQuery } from '@tanstack/react-query'
import { useEffect } from 'react'
import { useInView } from 'react-intersection-observer'
import { getSingletonHighlighterCore } from 'shiki'
import { createOnigurumaEngine } from 'shiki/engine/oniguruma'
import githubDarkDefault from 'shiki/themes/github-dark-default.mjs'
import githubLightDefault from 'shiki/themes/github-light-default.mjs';

import Comment from './comment'
import CommentHeader from './comment-header'
import CommentLoader from './comment-loader'
import { useCommentsStore } from '@/app/stores/comments'
import { useCommentParams } from '@/app/hooks/use-comment-params'
import { useHighlighterStore } from '@/app/stores/highlighter'
import { useTRPC } from '@/packages/trpc/client'
import { CommentProvider } from '@/app/stores/comment'

const CommentList = () => {
  const { slug, sort } = useCommentsStore((state) => ({ slug: state.slug, sort: state.sort }))
  const [params] = useCommentParams()
  const { highlighter, setHighlighter } = useHighlighterStore()

  const trpc = useTRPC()
  const { status, data, fetchNextPage, hasNextPage, isFetchingNextPage } = useInfiniteQuery(
    trpc.comments.getInfiniteComments.infiniteQueryOptions(
      {
        slug,
        sort,
        type: 'comments',
        highlightedCommentId: params.comment ?? undefined
      },
      {
        getNextPageParam: (lastPage) => lastPage.nextCursor,
        placeholderData: keepPreviousData
      }
    )
  )

  const { ref, inView } = useInView()

  useEffect(() => {
    if (inView && hasNextPage) fetchNextPage()
  }, [fetchNextPage, hasNextPage, inView])

  useEffect(() => {
    if (highlighter) return

    getSingletonHighlighterCore({
      themes: [githubLightDefault, githubDarkDefault],
      engine: createOnigurumaEngine(import('shiki/wasm'))
    }).then((instance) => {
      setHighlighter(instance)
    })
    // eslint-disable-next-line react-hooks/exhaustive-deps -- only run once
  }, [])

  const isSuccess = status === 'success'
  const isError = status === 'error'
  const isLoading = status === 'pending' || isFetchingNextPage
  const noComments = status === 'success' && data.pages[0]?.comments.length === 0

  return (
    <>
      <CommentHeader />
      <div className='space-y-8 py-2' data-testid='comments-list'>
        {isSuccess &&
          data.pages.map((page) =>
            page.comments.map((comment) => (
              <CommentProvider key={comment.id} comment={comment} slug={slug}>
                <Comment />
              </CommentProvider>
            ))
          )}
        {noComments && (
          <div className='flex min-h-20 items-center justify-center'>
            <p className='text-muted-foreground text-sm'>No comments</p>
          </div>
        )}
        {isError && (
          <div className='flex min-h-20 items-center justify-center'>
            <p className='text-muted-foreground text-sm'>
              Failed to load comments. Please refresh the page.
            </p>
          </div>
        )}
        {isLoading && <CommentLoader />}
        <span ref={ref} className='invisible' />
      </div>
    </>
  )
}

export default CommentList
