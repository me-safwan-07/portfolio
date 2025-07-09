import { Table } from '@/packages/ui'
import { cn } from '@/packages/utils/cn'

type CommentTableProps = React.ComponentProps<'table'>

const CommentTable = (props: CommentTableProps) => {
  const { className, ...rest } = props

  return <Table className={cn('not-prose my-2', className)} {...rest} />
}

export default CommentTable
