"use client"

import Link from "next/link"
import { Timeline } from "./experience-timeline"
import { buttonVariants } from "@/packages/ui"
import { cn } from "@/packages/utils/cn"
import { allExperiences } from "@/.content-collections/generated"


export function SelectedExperience() {
  const filteredExperiences = allExperiences.slice(0, 2)
  return (
    <div className="bg-background">
      <header className="text-center py-16 px-6">
        <h1 className="text-4xl sm:text-5xl font-bold text-foreground mb-4">
          Selected Experiences
        </h1>
      </header>

      <main>
        <Timeline items={filteredExperiences} />
      </main>

      <div className='my-8 flex items-center justify-center'>
        <Link
          href='/experiences'
          className={cn(
            buttonVariants({ variant: 'outline' }),
            'rounded-xl'
          )}
        >
          See all Experiences
        </Link>
      </div>
    </div>
  )
} 