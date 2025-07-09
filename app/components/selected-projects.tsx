'use client'

import { buttonVariants } from '@/packages/ui'
import { cn } from '@/packages/utils/cn'
import { allProjects, type Project } from 'content-collections'
import { ArrowUpRightIcon, LightbulbIcon } from 'lucide-react'
import { motion, useInView } from 'motion/react'
import Link from 'next/link'
import { useRef } from 'react'
import { BlurImage } from './ui/blur-image'

const variants = {
  initial: {
    y: 40,
    opacity: 0
  },
  animate: {
    y: 0,
    opacity: 1
  }
}

type CardProps = {
  project: Project
}

const SelectedProjects = () => {
  const projectsRef = useRef<HTMLDivElement>(null)
  const isInView = useInView(projectsRef, { once: true, margin: '-100px' })
  const filteredProjects = allProjects.slice(0, 2)

  return (
    <motion.div
      initial='initial'
      animate={isInView ? 'animate' : 'initial'}
      variants={variants}
      ref={projectsRef}
      transition={{
        duration: 0.5
      }}
      className='relative my-24'
    >
      <motion.h2
        className='text-center text-3xl font-semibold'
        initial={{
          y: 30,
          opacity: 0
        }}
        animate={{
          y: 0,
          opacity: 1
        }}
        transition={{
          duration: 0.3
        }}
      >
        Selected Projects
      </motion.h2>
      <motion.div
        className='mt-12 grid gap-4 md:grid-cols-2'
        initial={{
          y: 40,
          opacity: 0
        }}
        animate={{
          y: 0,
          opacity: 1
        }}
        transition={{
          duration: 0.3
        }}
      >
        {filteredProjects.map((project, index) => (
          <Card key={index} project={project} />
        ))}
      </motion.div>
      <div className='my-8 flex items-center justify-center'>
        <Link
          href='/projects'
          className={cn(
            buttonVariants({
              variant: 'outline'
            }),
            'rounded-xl'
          )}
        >
          See all Project
        </Link>
      </div>
    </motion.div>
  )
}

const Card = (props: CardProps) => {
  const { project } = props
  const { slug, name, description } = project

  return (
    <Link
      key={slug}
      href={`/projects/${slug}`}
      className='shadow-feature-card group relative rounded-xl p-2'
    >
      <div className='flex items-center justify-between p-4'>
        <div className='flex items-center gap-3'>
          <LightbulbIcon className='size-[18px]' />
          <h2>{"Project"}</h2>
        </div>
        <ArrowUpRightIcon className='size-[18px] opacity-0 transition-opacity group-hover:opacity-100' />
      </div>
      <BlurImage
        width={1280}
        height={832}
        src={`/images/projects/${slug}/cover.png`}
        alt={description}
        className='rounded-lg'
      />
      <div className='absolute bottom-6 left-7 flex flex-col transition-[left] ease-out group-hover:left-[30px]'>
        <h3 className='text-2xl font-semibold text-white'>{name}</h3>
        <p className='dark:text-muted-foreground mt-2 text-zinc-100'>{description}</p>
      </div>
    </Link>
  )
}

export default SelectedProjects
