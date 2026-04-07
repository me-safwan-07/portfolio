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
  // MonitorIcon,
  PencilIcon,
  UserCircleIcon
} from 'lucide-react'

import {
  SITE_FACEBOOK_URL,
  SITE_GITHUB_URL,
  SITE_INSTAGRAM_URL,
  SITE_X_URL,
  SITE_YOUTUBE_URL
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
  // {
  //   icon: <MessageCircleIcon className='size-3.5' />,
  //   href: '/guestbook',
  //   key: 'guestbook'
  // },
  // {
  //   icon: <BarChartIcon className='size-3.5' />,
  //   href: '/dashboard',
  //   key: 'dashboard'
  // },
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
  },
  // {
  //   icon: <MonitorIcon className='size-3.5' />,
  //   href: '/uses',
  //   key: 'uses'
  // }
] as const

export const FOOTER_LINKS = [
  {
    id: 1,
    links: [
      { href: '/', key: 'Home' },
      { href: '/blog', key: 'Blog' },
      { href: '/about', key: 'About' },
      // { href: '/dashboard', key: 'dashboard' }
    ]
  },
  {
    id: 2,
    links: [
      { href: '/experience', key: 'Experience' },
      { href: '/stacks', key: 'Stacks' },
      { href: '/projects', key: 'Projects' },
      { href: 'https://links.nelsonlai.me', key: 'Links' }
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
  // {
  //   href: SITE_FACEBOOK_URL,
  //   title: 'Facebook',
  //   icon: SiFacebook
  // },
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
