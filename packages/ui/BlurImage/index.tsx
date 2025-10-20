'use client'

import { cn } from '@portfolio/lib/cn'
import NextImage, { ImageProps } from 'next/image'
import React, { useState } from 'react'

type BlurImageProps = Omit<ImageProps, 'src' | 'alt'> & {
  src: string
  alt: string
  imageClassName?: string
  lazy?: boolean
}

const BlurImage = (props: BlurImageProps) => {
  const { alt, src, className, imageClassName, lazy = true, ...rest } = props
  const [isLoading, setIsLoading] = useState(true)

  return (
    <div className={cn('overflow-hidden', isLoading && 'animate-pulse', className)}>
      <NextImage
        className={cn(isLoading && 'scale-[1.02] blur-xl grayscale', imageClassName)}
        style={{
          transition: 'filter 700ms ease, scale 150ms ease'
        }}
        src={src}
        alt={alt}
        loading={lazy ? 'lazy' : undefined}
        priority={!lazy}
        quality={100}
        onLoad={() => setIsLoading(false)}
        {...rest}
      />
    </div>
  )
}

export { BlurImage }
