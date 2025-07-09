
import NumberFlow, { NumberFlowGroup } from '@number-flow/react'
import { useQuery } from '@tanstack/react-query'
import {
  Button,
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuTrigger
} from '@/packages/ui'
import { ListFilterIcon } from 'lucide-react'
import { useCommentsStore } from '@/app/stores/comments'
import { useTRPC } from '@/packages/trpc/client'
import { GetInfiniteCommentsInput } from '@/packages/trpc/routers/comments'

const CommentHeader = () => {
  const { slug, sort, setSort } = useCommentsStore((state) => ({
    slug: state.slug,
    sort: state.sort,
    setSort: state.setSort
  }))
  const trpc = useTRPC()

  const commentCountQuery = useQuery(trpc.comments.getCommentCount.queryOptions({ slug }))
  const replyCountQuery = useQuery(trpc.comments.getReplyCount.queryOptions({ slug }))

  return (
    <div className='flex items-center justify-between px-1'>
      <NumberFlowGroup>
        <div>
          {commentCountQuery.status === 'pending' &&
            `0 comment`}
          {commentCountQuery.status === 'error' && "Error"}
          {commentCountQuery.status === 'success' && (
            <NumberFlow
              value={commentCountQuery.data.comments}
              suffix={`${commentCountQuery.data.comments } comments`}
              data-testid='blog-comment-count'
            />
          )}
          {' · '}
          {replyCountQuery.status === 'pending' && `0 replie`}
          {replyCountQuery.status === 'error' && "Error"}
          {replyCountQuery.status === 'success' && (
            <NumberFlow
              value={replyCountQuery.data.replies}
              suffix={` ${replyCountQuery.data.replies } replies`}
              data-testid='reply-count'
            />
          )}
        </div>
      </NumberFlowGroup>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant='outline' size='sm' className='h-7 gap-1 text-sm'>
            <ListFilterIcon className='size-3.5' />
            <span>Sort by</span>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align='end'>
          <DropdownMenuRadioGroup
            value={sort}
            onValueChange={(value) => {
              setSort(value as GetInfiniteCommentsInput['sort'])
            }}
          >
            <DropdownMenuRadioItem value='newest'>
              Newest
            </DropdownMenuRadioItem>
            <DropdownMenuRadioItem value='oldest'>
              Oldest
            </DropdownMenuRadioItem>
          </DropdownMenuRadioGroup>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  )
}

export default CommentHeader
