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
    WAKATIME_API_KEY: z.string().optional(),
    IP_ADDRESS_SALT: z.string().optional(),
    UPSTASH_REDIS_REST_URL: z.string().url().optional(),
    UPSTASH_REDIS_REST_TOKEN: z.string().optional()
  },
  experimental__runtimeEnv: {
    NODE_ENV: process.env.NODE_ENV,
  },

  emptyStringAsUndefined: true
})
