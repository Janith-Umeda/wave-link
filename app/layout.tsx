import type React from "react"
import "./globals.css"
import type { Metadata } from "next"
import { Inter } from "next/font/google"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "WaveLink - Your Global Radio Companion",
  description:
    "Tune in to thousands of radio stations from around the world. Discover new music, news, and cultures with WaveLink.",
  keywords: "radio, streaming, music, global radio, online radio",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "",
    siteName: "WaveLink",
    images: [
      {
        url: "/og-image.png",
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
      <body className={inter.className}>{children}</body>
    </html>
  )
}

