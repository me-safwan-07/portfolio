"use client"

import React from "react"
import { motion } from "framer-motion"
import { CheckCircle } from "lucide-react"
import Image from "next/image"
import { cn } from "@/packages/utils/cn"
import { Card, CardContent } from "@/packages/ui/card"
import Link from "next/link"

export interface TimelineItem {
  company: string
  position: string
  startDate?: string
  endDate?: string
  image?: string
  description: string
  slug: string
}

export interface TimelineProps {
  items: TimelineItem[]
  className?: string
}

export function Timeline({ items, className }: TimelineProps) {
  if (!items || items.length === 0) {
    return (
      <div className={cn("w-full max-w-4xl mx-auto px-4 sm:px-6 py-8", className)}>
        <p className="text-center text-muted-foreground">No timeline items to display</p>
      </div>
    )
  }

  return (
    <section 
      className={cn("w-full max-w-4xl mx-auto px-4 sm:px-6 py-8", className)}
    >
      <div className="relative">
        <div 
          className="absolute left-4 sm:left-8 top-0 bottom-0 w-px bg-border" 
          aria-hidden="true"
        />
        
        <motion.div
          className="absolute left-4 sm:left-8 top-0 w-px bg-primary origin-top"
          initial={{ scaleY: 0 }}
          whileInView={{ 
            scaleY: 1,
            transition: {
              duration: 1.2,
              ease: "easeOut",
              delay: 0.2
            }
          }}
          viewport={{ once: true }}
          aria-hidden="true"
        />

        <div className="space-y-8 sm:space-y-12 relative">
          {items.map((item, index) => {
            
            return (
              <motion.div
                key={index}
                className="relative group"
                initial={{ opacity: 0, y: 40, scale: 0.98 }}
                whileInView={{ 
                  opacity: 1, 
                  y: 0, 
                  scale: 1,
                  transition: {
                    duration: 0.5,
                    delay: index * 0.1,
                    ease: [0.25, 0.46, 0.45, 0.94]
                  }
                }}
                viewport={{ once: true, margin: "-30px" }}
              >
                <Link href={`/experience/${item.slug}`} className="flex items-start gap-4 sm:gap-6">
                  <div className="relative flex-shrink-0">
                    <motion.div
                      className="relative"
                      whileHover={{ scale: 1.05 }}
                      transition={{ duration: 0.2 }}
                      tabIndex={0}
                      role="img"
                      aria-label={`Avatar for ${item.company}`}
                    >
                      <div className="w-12 h-12 sm:w-16 sm:h-16 rounded-full overflow-hidden border-2 border-background shadow-lg relative z-10">
                        {item.slug ? (
                          <Image
                            src={`/images/experience/${item.slug}/cover.png`}
                            alt={`${item.company} avatar`}
                            className="w-full h-full object-cover"
                            width={64}
                            height={64}
                            loading="lazy"
                          />
                        ) : (
                          <div className="w-full h-full bg-muted flex items-center justify-center">
                            <CheckCircle 
                              className="w-5 h-5 sm:w-6 sm:h-6 text-muted-foreground/70" 
                              aria-hidden="true"
                            />
                          </div>
                        )}
                      </div>
                    </motion.div>
                  </div>

                  <motion.div
                    className="flex-1 min-w-0"
                    whileHover={{ y: -2 }}
                    transition={{ duration: 0.2 }}
                  >
                    <Card className={cn(
                      "border transition-all duration-300 hover:shadow-md relative",
                      "bg-card/50 backdrop-blur-sm",
                      "group-hover:border-primary/30"
                    )}>
                      <CardContent className="p-4 sm:p-6">
                        <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2 sm:gap-4 mb-3">
                          <div className="flex-1 min-w-0">
                            <motion.h3 
                              className="text-lg sm:text-xl font-semibold text-foreground mb-1 group-hover:text-primary transition-colors duration-300"
                              layoutId={`title-${index}`}
                            >
                              {item.company}
                            </motion.h3>
                            
                            <div className="flex flex-wrap items-center gap-2 text-sm text-muted-foreground">
                              {item.startDate && (
                                <time dateTime={item.startDate}>{item.startDate} - {item.endDate || "Present"}</time>
                              )}
                            </div>
                          </div>
                        </div>

                        <motion.p 
                          className="text-sm sm:text-base text-muted-foreground leading-relaxed mb-4"
                          initial={{ opacity: 0.8 }}
                          whileHover={{ opacity: 1 }}
                        >
                          {item.description}
                        </motion.p>
                      </CardContent>
                    </Card>
                  </motion.div>
                </Link>
              </motion.div>
            )
          })}
        </div>

        <motion.div
          className="absolute left-4 sm:left-8 -bottom-6 transform -translate-x-1/2"
          initial={{ opacity: 0, scale: 0 }}
          whileInView={{ 
            opacity: 1, 
            scale: 1,
            transition: {
              duration: 0.4,
              delay: items.length * 0.1 + 0.3,
              type: "spring",
              stiffness: 400
            }
          }}
          viewport={{ once: true }}
          aria-hidden="true"
        >
          <div className="w-3 h-3 bg-primary rounded-full shadow-sm" />
        </motion.div>
      </div>
    </section>
  )
}
