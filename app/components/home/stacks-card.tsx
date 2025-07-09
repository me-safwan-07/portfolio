'use client'

import {
  SiCloudflare,
  SiCloudinary,
  SiCss,
  SiDrizzle,
  SiFigma,
  SiFirebase,
  SiGit,
  SiHtml5,
  SiJavascript,
  SiMarkdown,
  SiMongodb,
  SiMysql,
  SiNextdotjs,
  SiNodedotjs,
  SiPostgresql,
  SiPostman,
  SiPrisma,
  SiPython,
  SiRadixui,
  SiReact,
  SiReactquery,
  SiRedis,
  SiTailwindcss,
  SiTypescript,
  SiVite,
  SiVitest
} from '@icons-pack/react-simple-icons'
import { Marquee } from '@/packages/ui'
import { ZapIcon } from 'lucide-react'

const StacksCard = () => {

  return (
    <div className='shadow-feature-card flex h-60 flex-col gap-2 overflow-hidden rounded-xl p-4 lg:p-6'>
      <div className='flex items-center gap-2'>
        <ZapIcon className='size-[18px]' />
        <h2 className='text-sm'>Stacks</h2>
      </div>
      <Marquee gap='20px' className='py-4' fade pauseOnHover>
        <SiHtml5 className='size-10' />
        <SiCss className='size-10' />
        <SiJavascript className='size-10' />
        <SiTypescript className='size-10' />
        {/* <SiFigma className='size-10' /> */}
        <SiTailwindcss className='size-10' />
        <SiNextdotjs className='size-10' />
        <SiReact className='size-10' />
        <SiPython className='size-10' />
        <SiPostgresql className='size-10' />
        <SiRadixui className='size-10' />
        <SiCloudinary className='size-10' />
      </Marquee>
      <Marquee gap='20px' className='py-4' reverse fade pauseOnHover>
        <SiPrisma className='size-10' />
        <SiMysql className='size-10' />
        <SiFirebase className='size-10' />
        <SiGit className='size-10' />
        <SiVite className='size-10' />
        <SiDrizzle className='size-10' />
        {/* <SiCloudflare className='size-10' /> */}
        <SiMarkdown className='size-10' />
        <SiVitest className='size-10' />
        <SiNodedotjs className='size-10' />
        <SiReactquery className='size-10' />
        <SiMongodb className='size-10' />
        <SiRedis className='size-10'/>
        <SiPostman className='size-10' />
      </Marquee>
    </div>
  )
}

export default StacksCard
