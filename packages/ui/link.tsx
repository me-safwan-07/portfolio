import { cva, type VariantProps } from 'class-variance-authority'
import NextLink from 'next/link'
import { cn } from '../utils/cn'

const linkVariants = cva('', {
  variants: {
    variant: {
      muted: 'text-muted-foreground hover:text-foreground transition-colors'
    }
  }
})

type LinkProps = Omit<React.ComponentProps<typeof NextLink>, 'href'> &
  VariantProps<typeof linkVariants> & {
    href: string
  }

const Link = (props: LinkProps) => {
  const { className, variant, href, children, ...rest } = props

  if (href.startsWith('/')) {
    return (
      <NextLink className={cn(linkVariants({ variant }), className)} href={href} {...rest}>
        {children}
      </NextLink>
    )
  }

  if (href.startsWith('#')) {
    return (
      <a className={cn(linkVariants({ variant }), className)} href={href} {...rest}>
        {children}
      </a>
    )
  }

  return (
    <a
      className={cn(linkVariants({ variant }), className)}
      target='_blank'
      rel='noopener noreferrer'
      href={href}
      {...rest}
    >
      {children}
    </a>
  )
}

export { Link, linkVariants }
