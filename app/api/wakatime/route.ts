import { env } from '@/packages/env'
import { ratelimit } from '@/packages/kv'
import { NextRequest } from 'next/server'

const getKey = (id: string) => `wakatime:${id}`

const getIp = (req: NextRequest) => {
  return (
    req.headers.get('x-forwarded-for') ||
    req.headers.get('x-real-ip') ||
    'anonymous'
  )
}

export async function GET(req: NextRequest) {
  const ip = getIp(req)

  const { success } = await ratelimit.limit(getKey(ip))
  if (!success) {
    return Response.json(
      { error: 'Too many requests' },
      { status: 429 }
    )
  }

  const res = await fetch(
    'https://wakatime.com/api/v1/users/current/all_time_since_today',
    {
      headers: {
        Authorization: `Basic ${Buffer.from(env.WAKATIME_API_KEY).toString('base64')}`
      }
    }
  )

  if (!res.ok) {
    return Response.json({ error: 'Failed to fetch' }, { status: 500 })
  }

  const {
    data: { total_seconds }
  } = await res.json()

  return Response.json({
    seconds: total_seconds
  })
}