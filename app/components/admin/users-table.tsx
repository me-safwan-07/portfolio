'use client'

import { USER_ROLES } from '@/app/lib/constants'
import type { GetUsersOutput } from '@/packages/trpc/routers/users'
import { Checkbox } from '@/packages/ui/checkbox'

import { type ColumnDef } from '@tanstack/react-table'
import { CalendarIcon, CircleDashedIcon, UserIcon, UserLockIcon } from 'lucide-react'
import { DataTable, DataTableColumnHeader, DataTableSortList, DataTableToolbar, formatDate, useDataTable } from '../data-table'


type User = GetUsersOutput['users'][number]

type UsersTableProps = {
  data: User[]
  pageCount: number
  roleCounts: Record<string, number>
}

const getRoleIcon = (role: (typeof USER_ROLES)[number]) => {
  const roleIcons = {
    user: UserIcon,
    admin: UserLockIcon
  }

  return roleIcons[role]
}

const UsersTable = (props: UsersTableProps) => {
  const { data, pageCount, roleCounts } = props

  const columns: Array<ColumnDef<User>> = [
    {
      id: 'select',
      header: ({ table }) => (
        <Checkbox
          checked={
            table.getIsAllPageRowsSelected() ||
            (table.getIsSomePageRowsSelected() && 'indeterminate')
          }
          onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
          aria-label='Select all'
        />
      ),
      cell: ({ row }) => (
        <Checkbox
          checked={row.getIsSelected()}
          onCheckedChange={(value) => row.toggleSelected(!!value)}
          aria-label='Select row'
        />
      ),
      enableSorting: false,
      enableHiding: false,
      size: 40
    },
    {
      id: 'name',
      accessorKey: 'name',
      header: "Name",
      meta: {
        label: 'Name',
        placeholder: 'Search name...',
        variant: 'text',
        icon: UserIcon
      },
      enableColumnFilter: true
    },
    {
      id: 'email',
      accessorKey: 'email',
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Email" />
      ),
      meta: {
        label: 'Email'
      }
    },
    {
      id: 'role',
      accessorKey: 'role',
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Role" />
      ),
      meta: {
        label: 'Role',
        variant: 'multiSelect',
        options: USER_ROLES.map((role) => ({
          label: role.charAt(0).toUpperCase() + role.slice(1),
          value: role,
          count: roleCounts[role],
          icon: getRoleIcon(role)
        })),
        icon: CircleDashedIcon
      },
      enableColumnFilter: true
    },
    {
      id: 'createdAt',
      accessorKey: 'createdAt',
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Created At" />
      ),
      cell: ({ row }) =>
        formatDate(row.original.createdAt, {
          month: 'short',
          day: 'numeric',
          year: 'numeric'
        }),
      meta: {
        label: 'Created At',
        variant: 'dateRange',
        icon: CalendarIcon
      },
      enableColumnFilter: true
    }
  ]

  const { table } = useDataTable({
    data,
    columns,
    pageCount,
    initialState: {
      sorting: [{ id: 'createdAt', desc: true }]
    }
  })

  return (
    <DataTable table={table}>
      <DataTableToolbar table={table}>
        <DataTableSortList table={table} align='end' />
      </DataTableToolbar>
    </DataTable>
  )
}

export default UsersTable
