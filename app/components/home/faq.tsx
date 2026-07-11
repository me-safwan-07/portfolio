'use client'

import { motion, useInView } from 'motion/react'
import { useRef, useState } from 'react'
import { ChevronDown } from 'lucide-react'
import { cn } from '@/packages/utils/cn'

const FAQS = [
  {
    question: 'What services does Muhammed Safwan offer?',
    answer: 'I offer comprehensive web development services including Full Stack Development, Frontend & Backend Development, SaaS Development, API Development, Business Websites, Landing Pages, Portfolio Websites, E-commerce Development, and Website Maintenance. I specialize in React, Next.js, TypeScript, and the MERN stack.'
  },
  {
    question: 'What technologies does Muhammed Safwan use?',
    answer: 'I primarily work with modern web technologies including React, Next.js, TypeScript, Node.js, PostgreSQL, MongoDB, Prisma, Tailwind CSS, and various other tools in the JavaScript ecosystem. I stay updated with the latest industry best practices and frameworks.'
  },
  {
    question: 'How can I hire Muhammed Safwan for a project?',
    answer: 'You can reach out to me via email at mesafwan07@gmail.com or connect with me through my social profiles on GitHub, LinkedIn, or X (Twitter). I am available for freelance projects, contract work, and full-time opportunities.'
  },
  {
    question: 'Where is Muhammed Safwan based?',
    answer: 'I am based in Bengaluru (Bangalore), Karnataka, India. I work with clients globally and am comfortable collaborating across different time zones through remote communication tools.'
  },
  {
    question: 'What is Muhammed Safwan\'s experience in web development?',
    answer: 'I started my web development journey in early 2024 and have since built multiple projects using modern technologies. I have hands-on experience building full-stack applications, SaaS platforms, and professional business websites. My portfolio showcases my best work and technical capabilities.'
  },
  {
    question: 'Does Muhammed Safwan take freelance projects?',
    answer: 'Yes, I am available for freelance web development projects. Whether you need a new website, a web application, SaaS platform, or improvements to an existing project, I can help. Feel free to reach out to discuss your requirements and get a quote.'
  }
]

const variants = {
  initial: { y: 40, opacity: 0 },
  animate: { y: 0, opacity: 1 }
}

const FAQ = () => {
  const sectionRef = useRef<HTMLDivElement>(null)
  const isInView = useInView(sectionRef, { once: true, margin: '-100px' })
  const [openIndex, setOpenIndex] = useState<number | null>(0)

  return (
    <motion.section
      aria-labelledby="faq-heading"
      initial="initial"
      animate={isInView ? 'animate' : 'initial'}
      variants={variants}
      ref={sectionRef}
      transition={{ duration: 0.5 }}
      className="relative my-24"
    >
      <motion.h2
        id="faq-heading"
        className="text-center text-3xl font-semibold"
        initial={{ y: 30, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.3 }}
      >
        Frequently Asked Questions
      </motion.h2>

      <motion.div
        className="mx-auto mt-12 max-w-3xl space-y-4"
        initial={{ y: 40, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.3, delay: 0.1 }}
      >
        {FAQS.map((faq, index) => {
          const isOpen = openIndex === index
          return (
            <div 
              key={index} 
              className="shadow-feature-card overflow-hidden rounded-xl bg-card transition-colors hover:bg-zinc-50 dark:hover:bg-zinc-900/50"
            >
              <button
                onClick={() => setOpenIndex(isOpen ? null : index)}
                className="flex w-full items-center justify-between p-5 text-left font-medium"
                aria-expanded={isOpen}
              >
                <span>{faq.question}</span>
                <ChevronDown 
                  className={cn("h-5 w-5 flex-shrink-0 text-muted-foreground transition-transform duration-300", isOpen && "rotate-180")} 
                />
              </button>
              <div 
                className={cn(
                  "grid transition-all duration-300 ease-in-out",
                  isOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
                )}
              >
                <div className="overflow-hidden">
                  <p className="px-5 pb-5 text-muted-foreground">
                    {faq.answer}
                  </p>
                </div>
              </div>
            </div>
          )
        })}
      </motion.div>
    </motion.section>
  )
}

export default FAQ
