'use client'

import { useMutation } from '@tanstack/react-query'
import { Button, toast } from '@/packages/ui'
import { SendIcon } from 'lucide-react'
import { useEffect, useState } from 'react'
import CommentEditor from './comment-editor'
import UnauthorizedOverlay from './unauthorized-overlay'
import { useCommentsStore } from '@/app/stores/comments'
import { useCommentParams } from '@/app/hooks/use-comment-params'
import { useSession } from '@/app/lib/auth-client'
import { useTRPC } from '@/packages/trpc/client'
import { useTRPCInvalidator } from '@/app/lib/trpc-invalidator'

const CommentPost = () => {
  const { slug, sort } = useCommentsStore((state) => ({ slug: state.slug, sort: state.sort }))
  const [params] = useCommentParams()
  const [content, setContent] = useState('')
  const [isMounted, setIsMounted] = useState(false)
  const { data: session, isPending } = useSession()
  const trpc = useTRPC()
  const invalidator = useTRPCInvalidator()

  const infiniteCommentsParams = {
    slug,
    sort,
    type: 'comments' as const,
    highlightedCommentId: params.comment ?? undefined
  }

  const commentsMutation = useMutation(
    trpc.comments.post.mutationOptions({
      onSuccess: () => {
        setContent('')
        toast.success("Comment posted")
      },
      onError: (error) => {
        toast.error(error.message)
      },
      onSettled: async () => {
        await invalidator.comments.invalidateAfterAction({
          slug,
          infiniteCommentsParams
        })
      }
    })
  )

  const submitComment = (e?: React.FormEvent<HTMLFormElement>) => {
    e?.preventDefault()

    if (!content) {
      toast.error("Comment cannot be empty")
      return
    }

    commentsMutation.mutate({
      slug,
      content,
      date: new Date().toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      })
    })
  }

  useEffect(() => {
    setIsMounted(true)
  }, [])

  if (!isMounted) {
    return null
  }

  const isAuthenticated = session !== null && !isPending
  const disabled = !isAuthenticated || commentsMutation.isPending

  return (
    <form onSubmit={submitComment}>
      <div className='relative'>
        <CommentEditor
          value={content}
          onChange={(e) => setContent(e.target.value)}
          onModEnter={submitComment}
          placeholder={"Leave a comment"}
          disabled={disabled}
          data-testid='comment-textarea-post'
        />
        <Button
          variant='ghost'
          size='icon'
          className='absolute bottom-1.5 right-2 size-7'
          type='submit'
          disabled={disabled || !content}
          aria-label={"Send comment"}
          aria-disabled={disabled || !content}
          data-testid='comment-submit-button'
        >
          <SendIcon />
        </Button>
        {isAuthenticated ? null : <UnauthorizedOverlay />}
      </div>
    </form>
  )
}

export default CommentPost
