import { createEnv } from '@t3-oss/env-nextjs'
import { vercel } from '@t3-oss/env-nextjs/presets-zod'
import { z } from 'zod'

export const env = createEnv({
  skipValidation: !!process.env.CI,
  extends: [vercel()],
  
  shared: {
    NODE_ENV: z.enum(['development', 'production', 'test']).default('development')
  },
  
  server: {
    WAKATIME_API_KEY: z.string().min(1),
    IP_ADDRESS_SALT: z.string().min(1),
    UPSTASH_REDIS_REST_URL: z.string().url(),
    UPSTASH_REDIS_REST_TOKEN: z.string().min(1)
  },
  experimental__runtimeEnv: {
    NODE_ENV: process.env.NODE_ENV,
  },

  emptyStringAsUndefined: true
})
