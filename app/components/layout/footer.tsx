'use client'

import { useQuery } from '@tanstack/react-query'
import { linkVariants } from '@/packages/ui'
import { StarIcon } from 'lucide-react'

import { FOOTER_LINKS } from '@/app/config/links';
import { useTRPC } from '@/packages/trpc/client'
import Link from 'next/link'


// import NowPlaying from './now-playing'

const Footer = () => {
  const trpc = useTRPC()
  const { status, data } = useQuery(trpc.github.getRepoStarCount.queryOptions())

  return (
    <footer className='bg-background/30 shadow-xs relative mx-auto mb-6 flex w-full max-w-5xl flex-col rounded-2xl p-8 saturate-100 backdrop-blur-[10px]'>
      {/* {flags.spotify && <NowPlaying />} */}
      <div className='mt-12 grid grid-cols-2 sm:grid-cols-3'>
        {FOOTER_LINKS.map((list) => (
          <div key={list.id} className='mb-10 flex flex-col items-start gap-4 pr-4'>
            {list.links.map((link) => {
              const { href, key } = link

              return (
                <Link key={href} href={href} className={linkVariants({ variant: 'muted' })}>
                  {key}
                </Link>
              )
            })}
          </div>
        ))}
      </div>
      <div className='mt-20 flex items-center justify-between text-sm'>
        <div>&copy; {new Date().getFullYear()} Muhammed Safwan</div>
        <Link
          href='https://git.new/me-safwan-07'
          className='flex items-center justify-center overflow-hidden rounded-md border'
        >
          <div className='bg-muted flex h-8 items-center gap-2 border-r px-2'>
            <StarIcon className='size-4' />
            <span className='font-medium'>Star</span>
          </div>
          <div className='bg-background flex h-8 items-center px-3'>
            {status === 'pending' && '--'}
            {status === 'error' && "Error"}
            {status === 'success' &&
              Intl.NumberFormat('en', {
                notation: 'compact',
                minimumFractionDigits: 0,
                maximumFractionDigits: 1
              }).format(data)}
          </div>
        </Link>
      </div>
    </footer>
  )
}

export default Footer
