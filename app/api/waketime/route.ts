import { env } from '@/packages/env'
import { redis } from '@/packages/kv'
import { NextResponse } from 'next/server'

const CACHE_KEY = 'wakatime:cached-hours'
const CACHE_TTL = 60 * 10 // 10 minutes

export async function GET() {
  try {
    // Step 1: Try Redis cache
    const cached = await redis.get(CACHE_KEY)
    if (cached) {
      return NextResponse.json({ source: 'cache', ...cached })
    }

    // Step 2: Fetch from WakaTime API
    const response = await fetch('https://wakatime.com/api/v1/users/current/all_time_since_today', {
      headers: {
        Authorization: `Basic ${Buffer.from(env.WAKATIME_API_KEY).toString('base64')}`,
      },
    })

    console.log("Response:", response)

    const json = await response.json()


    const seconds = json?.data?.total_seconds
    if (!seconds) {
      return NextResponse.json({ error: 'Invalid response from WakaTime' }, { status: 500 })
    }

    // Step 3: Cache it in Redis
    await redis.set(CACHE_KEY, { seconds }, { ex: CACHE_TTL })

    return NextResponse.json({ source: 'fresh', seconds })
  } catch (err) {
    console.error('WakaTime API error:', err)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
