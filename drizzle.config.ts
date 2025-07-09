import type { Config } from 'drizzle-kit'
import { env } from './packages/env'

export default {
  dialect: 'postgresql',
  schema: './packages/db/schema/index.ts',
  dbCredentials: {
    url: env.DATABASE_URL
  },
  out: './packages/db/migrations',
  strict: true,
  verbose: true
} satisfies Config
