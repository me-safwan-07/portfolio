import RSS from 'rss'
import { SITE_NAME, SITE_URL } from '../lib/constants'
import { allPosts } from '@/.content-collections/generated'
import { NextResponse } from 'next/server'

export const GET = async () => {

  const feed = new RSS({
    title: "Muhammed Safwan - A Full Stack Developer",
    description: "Nelson Lai • 20 y/o • Student • Full Stack Developer",
    site_url: SITE_URL,
    feed_url: `${SITE_URL}/rss.xml`,
    language: 'en-US',
    image_url: `${SITE_URL}/images/og.png`
  })

  const posts = allPosts

  for (const post of posts) {
    const { title, summary, date, slug } = post

    feed.item({
      title,
      url: `${SITE_URL}/blog/${slug}`,
      date,
      description: summary,
      author: SITE_NAME
    })
  }

  return new NextResponse(feed.xml({ indent: true }), {
    headers: {
      'Content-Type': 'application/xml'
    }
  })
}
