'use client'

import { AnimatePresence, motion } from 'motion/react'
import { useEffect, useState } from 'react'

const TEXTS = [
  {
    key: 'amazing',
    className:
      'bg-clip-text text-center text-transparent bg-linear-to-r from-[#ff1835] to-[#ffc900]'
  },
  {
    key: 'stunning',
    className:
      'bg-clip-text text-center text-transparent bg-linear-to-r from-[#0077ff] to-[#00e7df]'
  },
  {
    key: 'fantastic',
    className:
      'bg-clip-text text-center text-transparent bg-linear-to-r from-[#7f00de] to-[#ff007f]'
  },
  {
    key: 'attractive',
    className:
      'bg-clip-text text-center text-transparent bg-linear-to-r from-[#2ecc70] to-[#1ca085]'
  }
] as const

const SPEED = 2

const variants = {
  enter: {
    y: 100,
    opacity: 0
  },
  center: {
    y: 0,
    opacity: 1
  },
  exit: {
    y: -100,
    opacity: 0
  }
}

export const HeroAnimatedLine = () => {
  const [currentIndex, setCurrentIndex] = useState(0)

  useEffect(() => {
    const timer = setInterval(
      () => setCurrentIndex((prev) => (prev + 1) % TEXTS.length),
      SPEED * 1000
    )

    return () => clearInterval(timer)
  }, [])

  const textItem = TEXTS[currentIndex]
  if (!textItem) return null

  return (
    <div className='flex gap-2'>
      <motion.div
        layout
        key='title-middle-left'
        className='leading-[30px] sm:leading-[45px]'
      >
        building
      </motion.div>
      <div className='relative overflow-hidden'>
        <AnimatePresence mode='popLayout'>
          <motion.div
            key={currentIndex}
            variants={variants}
            initial='enter'
            animate='center'
            exit='exit'
            layout
            transition={{
              type: 'tween',
              duration: 0.3
            }}
            className='inline-flex items-center justify-center leading-[30px] sm:leading-[45px]'
          >
            <span className={textItem.className}>{`${textItem.key.charAt(0).toUpperCase() + textItem.key.slice(1)}`}</span>
          </motion.div>
        </AnimatePresence>
      </div>
      <motion.div
        layout
        key='title-middle-right'
        className='leading-[30px] sm:leading-[45px]'
      >
        websites using
      </motion.div>
    </div>
  )
}
