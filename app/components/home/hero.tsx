'use client'

import { AnimatePresence, motion } from 'motion/react'
import { useEffect, useState } from 'react'
import { BlurImage } from '../ui/blur-image'

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

const Hero = () => {
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
    <div className='my-16 space-y-6'>
      <div className='flex justify-between gap-8'>
        <div className='flex flex-col gap-4'>
          <h1 className='flex flex-col flex-wrap gap-2 text-xl font-bold sm:text-3xl'>
            <motion.div
              initial={{ x: 20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ ease: 'easeOut' }}
            >
              {"I'm Safwan, a Full Stack Engineer"}
            </motion.div>
            <motion.div
              initial={{ x: 30, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ ease: 'easeOut' }}
              className='flex gap-2'
            >
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
            </motion.div>
            <motion.div
              initial={{ x: 40, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ ease: 'easeOut' }}
            >
              React
            </motion.div>
          </h1>
          {/* <motion.div
            initial={{ x: 50, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ ease: 'easeOut' }}
            className='text-muted-foreground text-sm'
          >
            Hong Kong • UTC/GMT +8
          </motion.div> */}
        </div>
        <motion.div
          className='relative hidden size-28 md:block'
          initial={{
            scale: 0
          }}
          animate={{
            scale: 1
          }}
          transition={{
            duration: 0.3
          }}
        >
          <BlurImage
            src='/images/me.jpg'
            className='rounded-full'
            width={150}
            height={200}
            alt='Nelson Lai'
            lazy={false}
          />
          <div className='bg-linear-to-tl absolute inset-0 -z-10 from-purple-700 to-orange-700 opacity-50 blur-2xl' />
        </motion.div>
      </div>
    </div>
  )
}

export default Hero
