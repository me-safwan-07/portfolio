'use client'

import { keepPreviousData, useQuery } from '@tanstack/react-query'
import { useTRPC } from '@/packages/trpc/client'
import AdminPageHeader from '@/app/components/admin/admin-page-header'
import { DataTableSkeleton } from '@/app/components/data-table'
import CommentsTable from '@/app/components/admin/comments-table'
import { useAdminCommentsParams } from '@/app/hooks/use-admin-comments-params'

const Page = () => {
  const [params] = useAdminCommentsParams()
  const trpc = useTRPC()
  const { data, isLoading, isError } = useQuery(
    trpc.comments.getComments.queryOptions(
      { ...params },
      {
        placeholderData: keepPreviousData
      }
    )
  )

  const isInitialLoading = isLoading && !data

  return (
    <div className='space-y-6'>
      <AdminPageHeader
        title="Comments"
        description={"Manage comments from users"}
      />
      {isLoading && <DataTableSkeleton columnCount={4} rowCount={10} filterCount={3} />}
      {isError && <div>Failed to fetch comments data. Please refresh the page.</div>}
      {!isInitialLoading && data && (
        <CommentsTable
          data={data.comments}
          pageCount={data.pageCount}
          typeCounts={data.typeCounts}
        />
      )}
    </div>
  )
}

export default Page
