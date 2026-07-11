import { HeroAnimatedLine } from './hero-animated-line'
import { HeroAvatar } from './hero-avatar'

const Hero = () => {
  return (
    <section aria-labelledby="hero-heading" className='my-16 space-y-6'>
      <div className='flex justify-between gap-8'>
        <div className='flex flex-col gap-4'>
          <h1 id="hero-heading" className='flex flex-col flex-wrap gap-2 text-xl font-bold sm:text-3xl'>
            <div>
              {"I'm Safwan, a Full Stack Engineer"}
            </div>
            <HeroAnimatedLine />
            <div>
              Next.js
            </div>
          </h1>
          <p className='text-muted-foreground text-sm sm:text-base max-w-lg'>
            Full Stack Developer based in Bengaluru, India. Specializing in React, Next.js, TypeScript, and MERN Stack development for modern web applications.
          </p>
        </div>
        <HeroAvatar />
      </div>
    </section>
  )
}

export default Hero
