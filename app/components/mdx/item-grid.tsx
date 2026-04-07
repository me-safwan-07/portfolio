'use client'

import { BlurImage } from "../ui/blur-image"
import { useTheme } from 'next-themes'
import { useEffect, useState } from 'react'

type Items = Array<{
  image: string
  darkImage?: string
  name: string
  description: string
}>

type ItemGridProps = {
  items: Items
}

const ItemGrid = ({ items }: ItemGridProps) => {
  const { resolvedTheme } = useTheme()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) return null // 🔥 prevents hydration mismatch

  return (
    <div className='mb-9 grid grid-cols-2 gap-2 sm:grid-cols-6'>
      {items.map((item) => {
        const imageSrc =
          resolvedTheme === 'dark' && item.darkImage
            ? item.darkImage
            : item.image

        return (
          <div
            key={item.name}
            className='shadow-xs flex gap-2 rounded-lg border p-4 no-underline transition-colors hover:bg-zinc-100 flex-col sm:gap-3 justify-center items-center dark:bg-zinc-900 dark:hover:bg-zinc-800'
          >
            <div className='flex flex-col justify-center'>
              <div className='text-md font-semibold'>{item.name}</div>
            </div>

            <BlurImage
              src={imageSrc}
              width={100}
              height={100}
              alt={item.name}
              className='shrink-0'
              imageClassName='m-0 size-24'
            />

          </div>
        )
      })}
    </div>
  )
}

export default ItemGrid