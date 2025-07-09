'use client'

import { flags } from '@/packages/env'
import { useTRPC } from '@/packages/trpc/client'
import { useQuery } from '@tanstack/react-query'
import { ClockIcon } from 'lucide-react'

const CodingHours = () => {
  const trpc = useTRPC()
  const { status, data } = useQuery({
    ...trpc.wakatime.get.queryOptions(),
    enabled: flags.stats
  })

  return (
    <div className='shadow-feature-card flex flex-col gap-6 rounded-xl p-4 lg:p-6'>
      <div className='flex items-center gap-2'>
        <ClockIcon className='size-[18px]' />
        <h2 className='text-sm'>Coding hours</h2>
      </div>
      <div className='flex grow items-center justify-center text-4xl font-semibold'>
        {status === 'pending' && '--'}
        {status === 'error' && "Error"}
        {status === 'success' && Math.round(data.seconds / 60 / 60)} hrs
      </div>
    </div>
  )
}

export default CodingHours
