

import { notFound } from 'next/navigation'
import { getSession } from '../lib/auth'
import { SidebarProvider } from '@/packages/ui/sidebar'
import AdminSidebar from '../components/admin/admin-sidebar'
import AdminHeader from '../components/admin/admin-header'

type LayoutProps = {
  params: Promise<{
    locale: string
  }>
  children: React.ReactNode
}

const Layout = async (props: LayoutProps) => {
  const { children } = props
  const session = await getSession()

  if (!session || session.user.role !== 'admin') {
    return notFound()
  }

  return (
    <SidebarProvider>
      <AdminSidebar />
      <div className='flex w-full flex-col overflow-x-hidden px-4'>
        <AdminHeader />
        <main className='py-6'>{children}</main>
      </div>
    </SidebarProvider>
  )
}

export default Layout
