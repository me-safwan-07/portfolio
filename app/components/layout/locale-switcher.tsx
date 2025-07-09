import {
  Button,
  DropdownMenu,
  DropdownMenuTrigger
} from '@/packages/ui'
import { LanguagesIcon } from 'lucide-react'

const LocaleSwitcher = () => {

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant='ghost' className='size-9 p-0' aria-label={"change language"}>
          <LanguagesIcon />
        </Button>
      </DropdownMenuTrigger>
      {/* <DropdownMenuContent align='end'>
        {i18n.locales.map((locale) => (
          <Item key={locale} locale={locale} />
        ))}
      </DropdownMenuContent> */}
    </DropdownMenu>
  )
}

export default LocaleSwitcher
