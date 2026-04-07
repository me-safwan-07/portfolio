'use client'

import { usePostStore } from '@/app/stores/post'
import ImageZoom from '@/app/components/image-zoom'
import Link from 'next/link'
import { BlurImage } from '@/app/components/ui/blur-image'
import { useFormattedDate } from '@/app/hooks/use-formatted-date'

const Header = () => {
  const { date, title, slug } = usePostStore((state) => state.post)
  const formattedDate = useFormattedDate(date)

  return (
    <div className='space-y-16 py-16'>
      <div className='space-y-16 sm:px-8'>
        <h1 className='bg-linear-to-b from-black via-black/90 to-black/70 to-90% bg-clip-text text-center text-4xl font-bold text-transparent md:text-5xl md:leading-[64px] dark:from-white dark:via-white/90 dark:to-white/70'>
          {title}
        </h1>
        <div className='grid grid-cols-2 text-sm max-md:gap-4 md:grid-cols-4'>
          <div className='space-y-1 md:mx-auto'>
            <div className='text-muted-foreground'>Written by</div>
            <Link href='https://github.com/me-safwan-07' className='flex items-center gap-2'>
              <BlurImage
                src='/images/me.jpg'
                className='rounded-full'
                width={24}
                height={24}
                alt='Nelson Lai'
              />
              Muhammed Safwan
            </Link>
          </div>
          <div className='space-y-1 md:mx-auto'>
            <div className='text-muted-foreground'>Published on</div>
            <div>{formattedDate}</div>
          </div>
        </div>
      </div>
      <ImageZoom
        zoomImg={{
          src: `/images/blog/${slug}/cover.png`,
          alt: title
        }}
      >
        <BlurImage
          src={`/images/blog/${slug}/cover.png`}
          className='rounded-lg'
          width={1200}
          height={630}
          lazy={false}
          alt={title}
        />
      </ImageZoom>
    </div>
  )
}

export default Header
