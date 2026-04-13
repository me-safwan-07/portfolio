'use client'

import { BlurImage } from '@/app/components/ui/blur-image'
import type { Experience } from 'content-collections'

// import { ArrowUpRightIcon } from 'lucide-react'
import { motion } from 'motion/react'

// import { cn } from '@/packages/utils/cn'
// import { buttonVariants } from '@/packages/ui'
// import Link from 'next/link'
// import { GITHUB_USERNAME } from '@/app/lib/constants'

const animation = {
  hide: {
    x: -30,
    opacity: 0
  },
  show: {
    x: 0,
    opacity: 1
  }
}

type HeaderProps = Experience

const Header = (props: HeaderProps) => {
  const { company, slug, position } = props

  return (
    <div className="flex items-center justify-start gap-6">
        <BlurImage
          src={`/images/experience/${slug}/cover.png`}
          width={60}
          height={60}
          alt={company}
          className='my-12 border rounded-full'
          lazy={false}
          />

          <motion.div
            className='flex flex-col'
            initial={animation.hide}
            animate={animation.show}
          >
          <h1 className='text-3xl font-bold'>{company}</h1>
          <p className='text-lg text-muted-foreground'>{position}</p>
          {/* <h2 className='text-muted-foreground'>{description}</h2> */}
        </motion.div>

        {/* <Header {...experience} /> */}
        </div>
  )
}
export default Header
