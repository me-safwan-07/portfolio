import type { SidebarLink } from '@/app/config/admin-sidebar-links'
import { SidebarMenuButton, SidebarMenuItem } from '@/packages/ui/sidebar'

import Link from 'next/link'

import { usePathname } from 'next/navigation'

type AdminNavLinkProps = SidebarLink

const AdminNavLink = (props: AdminNavLinkProps) => {
  const { titleKey, url, icon: Icon } = props
  const pathname = usePathname()
  const isActive = url === pathname

  return (
    <SidebarMenuItem>
      <SidebarMenuButton isActive={isActive} asChild>
        <Link href={url}>
          <Icon />
          <span>{titleKey}</span>
        </Link>
      </SidebarMenuButton>
    </SidebarMenuItem>
  )
}

export default AdminNavLink
