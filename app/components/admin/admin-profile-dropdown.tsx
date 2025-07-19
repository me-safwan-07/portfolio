
import { useSession } from '@/app/lib/auth-client'
import { useDialogsStore } from '@/app/stores/dialogs'
import { getAbbreviation } from '@/app/utils/get-abbreviation'
import { getDefaultImage } from '@/app/utils/get-default-image'
import { Button, DropdownMenu, DropdownMenuContent, DropdownMenuLabel, DropdownMenuTrigger, Skeleton } from '@/packages/ui'
import { Avatar, AvatarFallback, AvatarImage } from '@/packages/ui/avatar'

const AdminProfileDropdown = () => {
  const { data: session, isPending } = useSession()
  const { setIsSignInOpen } = useDialogsStore()

  if (isPending) {
    return <Skeleton className='size-9 rounded-full' />
  }

  if (!session) {
    return (
      <Button size='sm' onClick={() => setIsSignInOpen(true)}>
        Sign in
      </Button>
    )
  }

  const { id, image, name, email } = session.user
  const defaultImage = getDefaultImage(id)

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button className='size-9 rounded-full' variant='ghost' aria-label='Profile'>
          <Avatar className='size-9'>
            <AvatarImage src={image ?? defaultImage} />
            <AvatarFallback>{getAbbreviation(name)}</AvatarFallback>
          </Avatar>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className='w-56' align='end'>
        <DropdownMenuLabel>
          <div className='flex flex-col gap-1'>
            <p className='text-sm'>{name}</p>
            <p className='text-muted-foreground text-xs'>{email}</p>
          </div>
        </DropdownMenuLabel>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

export default AdminProfileDropdown
