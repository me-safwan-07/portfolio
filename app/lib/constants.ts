export const isProduction = process.env.NODE_ENV === 'production'

export const SITE_URL = isProduction ? 'https://www.muhammadsafwan.com' : 'http://localhost:3000'

export const GITHUB_USERNAME = 'me-safwan-07'

export const SITE_NAME = 'Muhammed Safwan'
export const SITE_TITLE = 'Muhammed Safwan | Full Stack Developer & Web Developer in Bangalore, India'
export const SITE_TAGLINE = 'Full Stack Developer specializing in React, Next.js & MERN Stack'
export const SITE_DESCRIPTION = 'Muhammed Safwan is a Full Stack Developer based in Bangalore, India. Specializing in React, Next.js, TypeScript, and MERN Stack development. Hire a skilled web developer for modern web applications, SaaS platforms, and professional websites.'

export const SITE_KEYWORDS = [
  // Primary keywords
  'Muhammed Safwan',
  'Safwan',
  'Muhammed Safwan Portfolio',
  'Muhammed Safwan Full Stack Developer',
  'Full Stack Developer',
  'Web Developer',
  'Full Stack Web Developer',
  'React Developer',
  'Next.js Developer',
  'MERN Stack Developer',
  // Secondary keywords
  'Full Stack Developer Bangalore',
  'Web Developer Bangalore',
  'Freelance Web Developer',
  'Freelance Full Stack Developer',
  'React Developer India',
  'Next.js Developer India',
  'TypeScript Developer',
  'JavaScript Developer',
  'Portfolio Website Developer',
  'SaaS Developer',
  'Frontend Developer',
  'Backend Developer',
  'Website Developer India',
  'Website Designer and Developer',
  // Technology keywords
  'Next.js',
  'React',
  'TypeScript',
  'Node.js',
  'PostgreSQL',
  'MongoDB',
  'Tailwind CSS',
  'Prisma',
]

export const SITE_GITHUB_URL = 'https://github.com/me-safwan-07'
export const SITE_LINKEDIN_URL = 'https://www.linkedin.com/in/muhammed-safwan-07'
export const SITE_INSTAGRAM_URL = 'https://www.instagram.com/codewithsafwan'
export const SITE_FACEBOOK_URL = 'https://www.facebook.com/mohdsafwan07'
export const SITE_X_URL = 'https://x.com/me_safwan_07';
export const SITE_YOUTUBE_URL = 'https://www.youtube.com/channel/UCkKVJNRrGYyLZFZsT-oQTrg'
export const SITE_EMAIL = 'mesafwan07@gmail.com'

export const COMMENT_TYPES = ['comment', 'reply'] as const
export const USER_ROLES = ['user', 'admin'] as const
