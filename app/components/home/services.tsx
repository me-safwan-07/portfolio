'use client'

import { motion, useInView } from 'motion/react'
import { useRef } from 'react'
import Link from 'next/link'
import { allServices } from 'content-collections'
import { 
  Globe, Code, ShoppingCart, FileText, Wrench, Rocket 
} from 'lucide-react'
import type { LucideIcon } from 'lucide-react'

const iconMap: Record<string, LucideIcon> = {
  Globe,
  Code,
  ShoppingCart,
  FileText,
  Wrench,
  Rocket
}

const variants = {
  initial: { y: 40, opacity: 0 },
  animate: { y: 0, opacity: 1 }
}

const Services = () => {
  const sectionRef = useRef<HTMLDivElement>(null)
  const isInView = useInView(sectionRef, { once: true, margin: '-100px' })

  return (
    <motion.section
      aria-labelledby="services-heading"
      initial="initial"
      animate={isInView ? 'animate' : 'initial'}
      variants={variants}
      ref={sectionRef}
      transition={{ duration: 0.5 }}
      className="relative my-24"
    >
      <div className="flex flex-col items-center justify-center text-center">
        <motion.h2
          id="services-heading"
          className="text-3xl font-semibold"
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.3 }}
        >
          Services I Offer
        </motion.h2>
        <motion.p
          className="mt-4 max-w-2xl text-muted-foreground"
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.4 }}
        >
          From concept to deployment, I deliver end-to-end web development solutions using modern technologies like React, Next.js, and Node.js.
        </motion.p>
      </div>

      <motion.div
        className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3"
        initial={{ y: 40, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.3, delay: 0.1 }}
      >
        {allServices.map((service, index) => {
          const Icon = iconMap[service.icon] || Globe
          return (
            <Link href={`/services/${service.slug}`} key={index} className="h-full">
              <div 
                className="shadow-feature-card group flex h-full flex-col gap-3 rounded-xl p-6 transition-colors hover:bg-zinc-100/50 dark:hover:bg-zinc-800/10 cursor-pointer"
              >
                <div className="mb-2 inline-flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 text-primary group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                  <Icon className="h-5 w-5" />
                </div>
                <h3 className="font-semibold">{service.name}</h3>
                <p className="text-sm text-muted-foreground">{service.description}</p>
              </div>
            </Link>
          )
        })}
      </motion.div>
    </motion.section>
  )
}

export default Services
