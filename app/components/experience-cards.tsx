'use client'

import type { Experience } from 'content-collections'
import { BlurImage } from './ui/blur-image'
import Link from 'next/link'


type ExperienceCardProps = Experience
type ExperienceCardsProps = {
  experiences: Experience[]
}

const ProjectCards = (props: ExperienceCardsProps) => {
  const { experiences } = props

  return (
    <div className='grid gap-4 md:grid-cols-2'>
      {experiences.map((experience) => (
        <ExperienceCard key={experience.slug} {...experience} />
      ))}
    </div>
  )
}

const ExperienceCard = (props: ExperienceCardProps) => {
  const { company, description, slug } = props

  return (
    <Link href={`/experience/${slug}`} className='shadow-feature-card group rounded-xl px-2 py-4'>
      <BlurImage
        src={`/images/experience/${slug}/cover.png`}
        width={1280}
        height={832}
        imageClassName='group-hover:scale-105'
        alt={company}
        className='rounded-lg'
      />
      <div className='flex-1 px-2 py-4'>
        <div className='space-y-2'>
          <h2 className='text-2xl font-semibold'>{company}</h2>
          <div className='text-muted-foreground'>{description}</div>
        </div>
        {/* <div className='mt-4 flex flex-wrap gap-2'>
          
          {techstack.map((label) => {
            return (
              <div
                key={label}
                className='rounded-full border bg-zinc-50 px-3 py-2 text-xs leading-4 dark dark:bg-zinc-900'
              >
                {label}
              </div>
            )
          })}
        </div> */}
      </div>
    </Link>
  )
}

export default ProjectCards
