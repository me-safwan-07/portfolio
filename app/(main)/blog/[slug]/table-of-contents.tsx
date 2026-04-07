'use client'

import { useScrollspy } from '@/app/hooks/use-scrollspy'
import type { TOC } from '@/packages/mdx-plugins'

import { SegmentGroup, SegmentGroupItem } from '@/packages/ui'
import { useRouter } from 'next/navigation'


type TableOfContentsProps = {
  toc: TOC[]
}

const TableOfContents = (props: TableOfContentsProps) => {
  const { toc } = props
  const activeId = useScrollspy(
    toc.map((item) => item.url),
    { rootMargin: '0% 0% -80% 0%' }
  )
  const router = useRouter()

  return (
    <div className='hidden pl-4 lg:block'>
      <div className='mb-4'>On this page</div>
      <SegmentGroup
        orientation='vertical'
        value={activeId}
        onValueChange={(details) => {
          router.push(`#${details.value}`)
        }}
        className='text-sm'
      >
        {toc.map((item) => (
          <SegmentGroupItem
            key={item.url}
            value={item.url}
            style={{
              paddingLeft: (item.depth - 1) * 12
            }}
          >
            {item.title}
          </SegmentGroupItem>
        ))}
      </SegmentGroup>
    </div>
  )
}

export default TableOfContents
