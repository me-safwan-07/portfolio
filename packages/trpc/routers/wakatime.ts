import { TRPCError } from '@trpc/server'
import { env } from '@/packages/env'
import { ratelimit } from '@/packages/kv'

import { getIp } from '@/app/utils/get-ip'

import { createTRPCRouter, publicProcedure } from '../init'

const getKey = (id: string) => `wakatime:${id}`

export const wakatimeRouter = createTRPCRouter({
  get: publicProcedure.query(async ({ ctx }) => {
    const ip = getIp(ctx.headers)

    const { success } = await ratelimit.limit(getKey(ip))

    if (!success) throw new TRPCError({ code: 'TOO_MANY_REQUESTS' })

    const res = await fetch('https://wakatime.com/api/v1/users/current/all_time_since_today', {
      headers: {
        Authorization: `Basic ${Buffer.from(env.WAKATIME_API_KEY).toString('base64')}`
      }
    })

    console.log("hours", res);

    const {
      data: { total_seconds }
    } = await res.json()

    return {
      seconds: total_seconds as number
    }
  })
})
