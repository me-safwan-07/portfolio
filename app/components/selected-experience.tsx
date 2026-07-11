"use client"

import Link from "next/link"
import { Timeline } from "./experience-timeline"
import { buttonVariants } from "@/packages/ui"
import { cn } from "@/packages/utils/cn"
import { allExperiences } from "@/.content-collections/generated"


export function SelectedExperience() {
  const filteredExperiences = allExperiences
    .toSorted((a, b) => new Date(b.startDate).getTime() - new Date(a.startDate).getTime())
    .slice(0, 2)
  return (
    <section aria-labelledby="experience-heading" className="bg-background">
      <header className="text-center py-16 px-6">
        <h2 id="experience-heading" className="text-4xl sm:text-5xl font-bold text-foreground mb-4">
          Selected Experiences
        </h2>
      </header>

      <div className="w-full">
        <Timeline items={filteredExperiences} />
      </div>

      <div className='my-8 flex items-center justify-center'>
        <Link
          href='/experience'
          className={cn(
            buttonVariants({ variant: 'outline' }),
            'rounded-xl'
          )}
        >
          See all Experiences
        </Link>
      </div>
    </section>
  )
} 