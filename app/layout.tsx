import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { cn } from "@/packages/utils/cn";
import Providers from "./providers";
import { NuqsAdapter } from 'nuqs/adapters/next/app'
import SignInDialog from "./components/sign-in-dialog";
import { SITE_KEYWORDS, SITE_NAME, SITE_URL } from "./lib/constants";

export const generateMetadata = async (): Promise<Metadata> => {
  return {
    metadataBase: new URL(SITE_URL),
    title: {
      default: "Muhammed Safwan - A Full Stack Developer",
      template: `%s | Muhammed Safwan - A Full Stack Developer`
    },
    description: "Muhammed Safwan • 20 y/o • Student • Full Stack Developer",
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        'max-video-preview': -1,
        'max-image-preview': 'large',
        'max-snippet': -1
      }
    },
    manifest: '/favicon/site.webmanifest',
    twitter: {
      card: 'summary_large_image',
      title: SITE_NAME,
      description: 'Muhammed Safwan • 20 y/o • Student • Full Stack Developer',
      site: "@me_safwan_07",
      siteId: "1748175560541675520",
      creator: "@me_safwan_07",
      creatorId: "1748175560541675520",
      images: [
        {
          url: '/images/og.png',
          width: 1200,
          height: 630,
          alt: "Muhammed Safwan • 20 y/o • Student • Full Stack Developer",
        }
      ]
    },
    keywords: SITE_KEYWORDS,
    creator: 'me_safwan_07',
    openGraph: {
      url: SITE_URL,
      type: 'website',
      title: 'Muhammed Safwan - A Full Stack Developer',
      siteName: "Muhammed Safwan - A Full Stack Developer",
      description: "Muhammed Safwan • 20 y/o • Student • Full Stack Developer",
      locale: "en",
      images: [
        {
          url: "/images/og.png",
          width: 1200,
          height: 630,
          alt: "Muhammed Safwan • 20 y/o • Student • Full Stack Developer",
          type: 'image/png'
        }
      ]
    },
    icons: {
      icon: '/favicon/favicon.svg',
      shortcut: '/favicon/favicon.svg',
      apple: [
        {
          url: '/favicon/apple-touch-icon.png',
          sizes: '180x180',
          type: 'image/png'
        }
      ],
      other: [
        {
          rel: 'icon',
          type: 'image/png',
          sizes: '16x16',
          url: '/favicon/favicon-16x16.png'
        },
        {
          rel: 'icon',
          type: 'image/png',
          sizes: '32x32',
          url: '/favicon/favicon-32x32.png'
        }
      ]
    }
  }
}

export const viewport: Viewport = {
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: 'white' },
    { media: '(prefers-color-scheme: dark)', color: 'black' }
  ]
}

const fontSans = Geist({
  subsets: ['latin'],
  variable: '--font-sans'
})

const fontMono = Geist_Mono({
  subsets: ['latin'],
  variable: '--font-mono',
  weight: '400'
})

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html 
      lang="en"
      className={cn(fontSans.variable, fontMono.variable)}
      suppressHydrationWarning  
    >
      <body
        className={`relative flex min-h-screen flex-col`}
      >
        <NuqsAdapter>
          <Providers>
              {children}
              <SignInDialog />
          </Providers>
        </NuqsAdapter>
      </body>
    </html>
  );
}
