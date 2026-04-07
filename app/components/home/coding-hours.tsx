'use client'

import { useEffect, useState } from 'react'
import { ClockIcon } from 'lucide-react'

const CodingHours = () => {
  const [status, setStatus] = useState<'loading' | 'success' | 'error'>('loading')
  const [seconds, setSeconds] = useState<number | null>(null)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch('/api/wakatime')
        if (!res.ok) throw new Error('Error')

        const data = await res.json()
        setSeconds(data.seconds)
        setStatus('success')
      } catch (error) {
        setStatus('error')
      }
    }

    fetchData()
  }, [])

  return (
    <div className='shadow-feature-card flex flex-col gap-6 rounded-xl p-4 lg:p-6'>
      <div className='flex items-center gap-2'>
        <ClockIcon className='size-[18px]' />
        <h2 className='text-sm'>Coding hours</h2>
      </div>

      <div className='flex grow items-center justify-center text-4xl font-semibold'>
        {status === 'loading' && '--'}
        {status === 'error' && 'Error'}
        {status === 'success' && seconds !== null &&
          Math.round(seconds / 3600)} hrs
      </div>
    </div>
  )
}

export default CodingHours