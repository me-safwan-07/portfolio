'use client'

import { buttonVariants } from '@/packages/ui'
import Link from 'next/link'


const GoToHomepage = () => {
  return (
    <Link href='/' className={buttonVariants()}>
      Go to homepage
    </Link>
  )
}

export default GoToHomepage
