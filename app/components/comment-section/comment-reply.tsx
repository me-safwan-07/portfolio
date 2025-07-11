'use client'

import { useMutation, useQueryClient } from '@tanstack/react-query'
import { Button, toast } from '@/packages/ui'
import { useState } from 'react'
import CommentEditor from './comment-editor'
import UnauthorizedOverlay from './unauthorized-overlay'
import { useSession } from '@/app/lib/auth-client'
import { useCommentStore } from '@/app/stores/comment'
import { useCommentsStore } from '@/app/stores/comments'
import { useCommentParams } from '@/app/hooks/use-comment-params'
import { useTRPC } from '@/packages/trpc/client'
import { useTRPCInvalidator } from '@/app/lib/trpc-invalidator'
import { createTRPCQueryKeys } from '@/app/lib/trpc-query-helpers'

const CommentReply = () => {
  const [content, setContent] = useState('')
  const { data: session } = useSession()
  const { comment, setIsReplying } = useCommentStore((state) => ({
    comment: state.comment,
    setIsReplying: state.setIsReplying
  }))
  const { slug, sort } = useCommentsStore((state) => ({ slug: state.slug, sort: state.sort }))
  const [params] = useCommentParams()
  const trpc = useTRPC()
  const queryClient = useQueryClient()
  const invalidator = useTRPCInvalidator()

  const queryKeys = createTRPCQueryKeys(trpc)
  const infiniteCommentsParams = {
    slug,
    sort,
    type: 'comments' as const,
    highlightedCommentId: params.comment ?? undefined
  }

  const commentsMutation = useMutation(
    trpc.comments.post.mutationOptions({
      onMutate: async () => {
        const queryKey = queryKeys.comments.infiniteComments(infiniteCommentsParams)

        await queryClient.cancelQueries({ queryKey })
        const previousData = queryClient.getQueryData(queryKey)

        queryClient.setQueryData(queryKey, (oldData) => {
          if (!oldData) return { pages: [], pageParams: [] }

          return {
            ...oldData,
            pages: oldData.pages.map((page) => ({
              ...page,
              comments: page.comments.map((c) =>
                c.id === comment.id ? { ...c, replyCount: c.replyCount + 1 } : c
              )
            }))
          }
        })

        return { previousData }
      },

      onSuccess: () => {
        setIsReplying(false)
        toast.success("Reply posted")
      },

      onError: (error, _, ctx) => {
        if (ctx?.previousData) {
          queryClient.setQueryData(
            queryKeys.comments.infiniteComments(infiniteCommentsParams),
            ctx.previousData
          )
        }
        toast.error(error.message)
      },

      onSettled: async () => {
        await invalidator.comments.invalidateAfterReply({
          slug,
          parentCommentId: comment.id,
          mainCommentsParams: infiniteCommentsParams,
          replyHighlightedId: params.reply ?? undefined
        })
      }
    })
  )

  const submitCommentReply = (e?: React.FormEvent<HTMLFormElement>) => {
    e?.preventDefault()

    if (!content) {
      toast.error("Reply cannot be empty")
      return
    }

    commentsMutation.mutate({
      slug,
      content,
      parentId: comment.id,
      date: new Date().toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      })
    })
  }

  const isAuthenticated = session !== null
  const disabled = !isAuthenticated || commentsMutation.isPending

  return (
    <form onSubmit={submitCommentReply}>
      <div className='relative'>
        <CommentEditor
          onChange={(e) => setContent(e.target.value)}
          onModEnter={submitCommentReply}
          onEscape={() => setIsReplying(false)}
          placeholder={"Reply to comment"}
          disabled={disabled}
          autoFocus
          data-testid='comment-textarea-reply'
        />
        {isAuthenticated ? null : <UnauthorizedOverlay />}
      </div>
      <div className='mt-2 space-x-1'>
        <Button
          variant='secondary'
          className='h-8 px-2 text-xs font-medium'
          type='submit'
          disabled={disabled || !content}
          aria-disabled={disabled || !content}
          data-testid='comment-submit-reply-button'
        >
          Reply
        </Button>
        <Button
          variant='secondary'
          className='h-8 px-2 text-xs font-medium'
          onClick={() => setIsReplying(false)}
        >
          Cancel
        </Button>
      </div>
    </form>
  )
}

export default CommentReply
