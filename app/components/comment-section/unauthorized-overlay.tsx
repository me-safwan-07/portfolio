import { useDialogsStore } from '@/app/stores/dialogs'
import { Button } from '@/packages/ui'


const UnauthorizedOverlay = () => {
  const { setIsSignInOpen } = useDialogsStore()

  return (
    <div className='absolute inset-0 flex items-center justify-center rounded-lg bg-black/5 backdrop-blur-[0.8px]'>
      <Button size='sm' onClick={() => setIsSignInOpen(true)}>
        Sign in
      </Button>
    </div>
  )
}

export default UnauthorizedOverlay
