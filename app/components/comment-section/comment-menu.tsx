import { useMutation } from '@tanstack/react-query'
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
  Button,
  buttonVariants,
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  toast
} from '@/packages/ui'
import { MoreVerticalIcon } from 'lucide-react'
import { useCommentStore } from '@/app/stores/comment'
import { useCommentsStore } from '@/app/stores/comments'
import { useCommentParams } from '@/app/hooks/use-comment-params'
import { useSession } from '@/app/lib/auth-client'
import { useTRPC } from '@/packages/trpc/client'
import { useTRPCInvalidator } from '@/app/lib/trpc-invalidator'
import { useCopyToClipboard } from '@/app/hooks/use-copy-to-clipboard'

const CommentMenu = () => {
  const comment = useCommentStore((state) => state.comment)
  const { slug, sort } = useCommentsStore((state) => ({ slug: state.slug, sort: state.sort }))
  const [params] = useCommentParams()
  const { data: session } = useSession()
  const trpc = useTRPC()
  const invalidator = useTRPCInvalidator()
  const [copy] = useCopyToClipboard()

  const deleteCommentMutation = useMutation(
    trpc.comments.delete.mutationOptions({
      onSuccess: () => {
        toast.success("Deleted a comment")
      },
      onError: (error) => {
        toast.error(error.message)
      },
      onSettled: async () => {
        if (comment.parentId) {
          const mainCommentsParams = {
            slug,
            sort,
            type: 'comments' as const,
            highlightedCommentId: params.comment ?? undefined
          }

          const repliesParams = {
            slug,
            sort: 'oldest' as const,
            parentId: comment.parentId,
            type: 'replies' as const,
            highlightedCommentId: params.reply ?? undefined
          }

          await Promise.all([
            invalidator.comments.invalidateInfiniteComments(mainCommentsParams),
            invalidator.comments.invalidateInfiniteComments(repliesParams),
            invalidator.comments.invalidateCountsBySlug(slug)
          ])
        } else {
          const mainCommentsParams = {
            slug,
            sort,
            type: 'comments' as const,
            highlightedCommentId: params.comment ?? undefined
          }

          await invalidator.comments.invalidateAfterAction({
            slug,
            infiniteCommentsParams: mainCommentsParams
          })
        }
      }
    })
  )

  const {
    isDeleted,
    id,
    user: { id: userId },
    parentId
  } = comment

  const commentQuery = parentId ? `comment=${parentId}&reply=${id}` : `comment=${id}`

  const isAuthor = !isDeleted && session?.user.id === userId

  return (
    <AlertDialog>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant='ghost'
            size='icon'
            className='size-8'
            aria-label={"Open menu"}
            data-testid='comment-menu-button'
          >
            <MoreVerticalIcon className='size-5' />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align='end'>
          <DropdownMenuItem
            onClick={() =>
              void copy({
                text: `${globalThis.location.origin}/blog/${slug}?${commentQuery}`,
                successMessage: "Link copied to clipboard"
              })
            }
          >
            Copy Link
          </DropdownMenuItem>
          <AlertDialogTrigger asChild>
            {isAuthor && (
              <DropdownMenuItem
                disabled={deleteCommentMutation.isPending}
                aria-disabled={deleteCommentMutation.isPending}
                data-testid='comment-delete-button'
                variant='destructive'
              >
                Delete
              </DropdownMenuItem>
            )}
          </AlertDialogTrigger>
        </DropdownMenuContent>
      </DropdownMenu>
      <AlertDialogContent data-testid='comment-dialog'>
        <AlertDialogHeader>
          <AlertDialogTitle>Delete a comment</AlertDialogTitle>
          <AlertDialogDescription>
            Are you sure you want to delete this comment? This action cannot be undone.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction
            onClick={() => deleteCommentMutation.mutate({ id })}
            className={buttonVariants({ variant: 'destructive' })}
            data-testid='comment-dialog-delete-button'
          >
            Delete
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}

export default CommentMenu
