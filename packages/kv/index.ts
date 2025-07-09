import { Ratelimit } from '@upstash/ratelimit'
import { Redis } from '@upstash/redis'
import { env } from '../env'
import { TRPCError } from '@trpc/server'

export const redis = new Redis({
  url: env.UPSTASH_REDIS_REST_URL,
  token: env.UPSTASH_REDIS_REST_TOKEN
})

export const ratelimit = new Ratelimit({
  redis,
  limiter: Ratelimit.fixedWindow(50, '10 s'),
  analytics: true
})

export const redisKeys = {
  postViews: (slug: string) => `post:views:${slug}`,
  postViewCount: 'post:views:count',
  postLikes: (slug: string) => `post:likes:${slug}`,
  postLikeCount: 'post:likes:count',
  currentUserLikes: (slug: string, sessionId: string) =>
    `post:likes:${slug}:current-user-likes:${sessionId}`
}

export const limitRequest = async (key: string) => {
  const res = await redis.incr(key)

  if (res === 1) {
    // First time: set expiration window
    await redis.expire(key, 10) // expires in 10 seconds
  }

  if (res > 50) {
    throw new TRPCError({ code: 'TOO_MANY_REQUESTS' })
  }
}
