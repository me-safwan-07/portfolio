'use client'

import { motion } from 'motion/react'
import { BlurImage } from '../ui/blur-image'

export const HeroAvatar = () => {
  return (
    <motion.div
      className='relative hidden size-28 md:block'
      initial={{ scale: 0 }}
      animate={{ scale: 1 }}
      transition={{ duration: 0.3 }}
    >
      <BlurImage
        src='/images/me.jpg'
        className='rounded-full'
        width={150}
        height={150}
        alt='Muhammed Safwan — Full Stack Developer based in Bangalore, India'
        lazy={false}
      />
      <div className='bg-linear-to-tl absolute inset-0 -z-10 from-purple-700 to-orange-700 opacity-50 blur-2xl' />
    </motion.div>
  )
}
