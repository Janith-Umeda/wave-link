import type React from "react"
import "./globals.css"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import { GoogleAnalytics } from "@next/third-parties/google";
import { AudioPlayer } from "@/components/audio-player"
import { RadioStoreProvider } from "@/components/radio-store-provider"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "WaveLink - Your Global Radio Companion",
  description:
    "Tune in to thousands of radio stations from around the world. Discover new music, news, and cultures with WaveLink.",
  keywords: "radio, streaming, music, global radio, online radio",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://wavelink.music-tools.com",
    siteName: "WaveLink",
    images: [
      {
        url: "https://wavelink.music-tools.com/images/wavelink.svg",
        width: 1200,
        height: 630,
        alt: "WaveLink - Your Global Radio Companion",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    site: "@wavelink",
    creator: "@wavelink",
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <RadioStoreProvider>
          <div className="flex flex-col min-h-screen">
            <div className="flex-grow">{children}</div>
            <AudioPlayer />
          </div>
        </RadioStoreProvider>  
      </body>
      {process.env.APP_CONFIG === "production" ? (
        <>
          {process.env.GA_ID ? <GoogleAnalytics gaId={process.env.GA_ID} /> : null}
        </>
      ) : null}
    </html>
  )
}

