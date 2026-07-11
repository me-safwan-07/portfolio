import {
  type IconType,
  SiGithub,
  SiInstagram,
  SiX,
  SiYoutube
} from '@icons-pack/react-simple-icons'
import {
  Briefcase,
  FlameIcon,
  Layers,
  PencilIcon,
  UserCircleIcon,
  LinkedinIcon
} from 'lucide-react'

import {
  SITE_FACEBOOK_URL,
  SITE_GITHUB_URL,
  SITE_INSTAGRAM_URL,
  SITE_X_URL,
  SITE_YOUTUBE_URL,
  SITE_LINKEDIN_URL
} from '../lib/constants';

type SocialLinks = Array<{
  href: string
  title: string
  icon: IconType
}>

export const HEADER_LINKS = [
  {
    icon: <Briefcase className='size-3.5' />,
    href: '/experience',
    key: 'experience'
  },
  {
    icon: <PencilIcon className='size-3.5' />,
    href: '/blog',
    key: 'blog'
  },
  {
    icon: <FlameIcon className='size-3.5' />,
    href: '/projects',
    key: 'projects'
  },
  {
    icon: <UserCircleIcon className='size-3.5' />,
    href: '/about',
    key: 'about'
  },
  {
    icon: <Layers className='size-3.5' />,
    href: '/stacks',
    key: 'stacks'
  }
] as const

export const FOOTER_LINKS = [
  {
    id: 1,
    links: [
      { href: '/', key: 'Home' },
      { href: '/blog', key: 'Blog' },
      { href: '/about', key: 'About' }
    ]
  },
  {
    id: 2,
    links: [
      { href: '/experience', key: 'Experience' },
      { href: '/stacks', key: 'Stacks' },
      { href: '/projects', key: 'Projects' },
      { href: SITE_LINKEDIN_URL, key: 'LinkedIn' }
    ]
  },
  {
    id: 3,
    links: [
      { href: SITE_GITHUB_URL, key: 'GitHub' },
      { href: SITE_YOUTUBE_URL, key: 'YouTube' },
      { href: SITE_INSTAGRAM_URL, key: 'Instagram' },
      { href: SITE_FACEBOOK_URL, key: 'Facebook' }
    ]
  }
] as const

export const SOCIAL_LINKS: SocialLinks = [
  {
    href: SITE_GITHUB_URL,
    title: 'GitHub',
    icon: SiGithub
  },
  {
    href: SITE_LINKEDIN_URL,
    title: 'LinkedIn',
    icon: LinkedinIcon as IconType
  },
  {
    href: SITE_INSTAGRAM_URL,
    title: 'Instagram',
    icon: SiInstagram
  },
  {
    href: SITE_X_URL,
    title: 'X',
    icon: SiX
  },
  {
    href: SITE_YOUTUBE_URL,
    title: 'YouTube',
    icon: SiYoutube
  }
]
