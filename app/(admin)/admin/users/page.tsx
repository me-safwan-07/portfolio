'use client'

import AdminPageHeader from '@/app/components/admin/admin-page-header'
import UsersTable from '@/app/components/admin/users-table'
import { DataTableSkeleton } from '@/app/components/data-table'
import { useAdminUsersParams } from '@/app/hooks/use-admin-users-params'
import { useTRPC } from '@/packages/trpc/client'
import { keepPreviousData, useQuery } from '@tanstack/react-query'


const Page = () => {
  const [params] = useAdminUsersParams()
  const trpc = useTRPC()
  const { data, isLoading, isError } = useQuery(
    trpc.users.getUsers.queryOptions(
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
        title="Users"
        description="Manage users of the system"
      />
      {isInitialLoading && <DataTableSkeleton columnCount={4} rowCount={10} filterCount={3} />}
      {isError && <div>Failed to fetch users data. Please refresh the page.</div>}
      {!isInitialLoading && data && (
        <UsersTable data={data.users} pageCount={data.pageCount} roleCounts={data.roleCounts} />
      )}
    </div>
  )
}

export default Page
