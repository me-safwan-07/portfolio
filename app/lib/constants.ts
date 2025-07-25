export const isProduction = process.env.NODE_ENV === 'production'

export const SITE_URL = isProduction ? 'https://mohdsafwan.vercel.app' : 'http://localhost:3000'

export const GITHUB_USERNAME = 'me-safwan-07'

export const SITE_NAME = 'Muhammed Safwan'
export const SITE_KEYWORDS = ['portfolio', 'Next.js', 'React', 'TypeScript', 'Node.js']

export const SITE_GITHUB_URL = 'https://github.com/me-safwan-07'
export const SITE_INSTAGRAM_URL = 'https://www.instagram.com/codewithsafwan'
export const SITE_X_URL = 'https://x.com/me_safwan_07';
export const SITE_YOUTUBE_URL = 'https://www.youtube.com/channel/UCkKVJNRrGYyLZFZsT-oQTrg'

export const COMMENT_TYPES = ['comment', 'reply'] as const
export const USER_ROLES = ['user', 'admin'] as const
