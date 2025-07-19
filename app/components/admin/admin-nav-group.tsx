import type { SidebarGroup as SidebarGroupConfig } from '@/app/config/admin-sidebar-links'

import AdminNavLink from './admin-nav-link'
import { SidebarGroup, SidebarGroupContent, SidebarGroupLabel, SidebarMenu } from '@/packages/ui/sidebar'

type AdminNavGroupProps = SidebarGroupConfig

const AdminNavGroup = (props: AdminNavGroupProps) => {
  const { titleKey, links } = props

  return (
    <SidebarGroup>
      <SidebarGroupLabel>{titleKey}</SidebarGroupLabel>
      <SidebarGroupContent>
        <SidebarMenu>
          {links.map((link) => (
            <AdminNavLink key={link.titleKey} {...link} />
          ))}
        </SidebarMenu>
      </SidebarGroupContent>
    </SidebarGroup>
  )
}

export default AdminNavGroup
