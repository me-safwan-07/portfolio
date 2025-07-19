'use client'

import { ADMIN_SIDEBAR_LINKS } from '@/app/config/admin-sidebar-links'
import AdminNavGroup from './admin-nav-group'
import { Sidebar, SidebarContent } from '@/packages/ui/sidebar'

const AdminSidebar = () => {
  return (
    <Sidebar collapsible='icon' variant='floating'>
      <SidebarContent>
        {ADMIN_SIDEBAR_LINKS.map((group) => (
          <AdminNavGroup key={group.titleKey} {...group} />
        ))}
      </SidebarContent>
    </Sidebar>
  )
}

export default AdminSidebar
