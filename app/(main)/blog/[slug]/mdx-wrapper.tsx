'use client'

import dynamic from 'next/dynamic'

const Mdx = dynamic(() => import('@/app/components/mdx/mdx'), {
  ssr: false
})

export default Mdx