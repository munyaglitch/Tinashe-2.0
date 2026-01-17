import type React from "react"
import type { Metadata } from "next"
import { Geist, Geist_Mono } from "next/font/google"
import { Analytics } from "@vercel/analytics/next"
import Image from "next/image"
import { ConvexClientProvider } from "@/components/ConvexClientProvider"
import "./globals.css"

const _geist = Geist({ subsets: ["latin"] })
const _geistMono = Geist_Mono({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Tinashe Car Sales Zimbabwe - Premium Cars",
  description: "Buy & Sell Premium Cars Across Zimbabwe - Your Trusted Vehicle Hub",
  generator: "v0.app",
  icons: {
    icon: [
      {
        url: "/icon-light-32x32.png",
        media: "(prefers-color-scheme: light)",
      },
      {
        url: "/icon-dark-32x32.png",
        media: "(prefers-color-scheme: dark)",
      },
      {
        url: "/icon.svg",
        type: "image/svg+xml",
      },
    ],
    apple: "/apple-icon.png",
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={`font-sans antialiased`}>
        <ConvexClientProvider>{children}</ConvexClientProvider>
        <div className="pointer-events-none fixed bottom-4 right-4 z-50 flex items-center justify-center rounded-[10px] bg-transparent">
          <Image
            src="/images/tc-car-sales-removebg-preview.png"
            alt="TC"
            width={64}
            height={64}
            className="object-contain drop-shadow-[0_8px_18px_rgba(0,0,0,0.45)]"
            priority
          />
        </div>
        <Analytics />
      </body>
    </html>
  )
}
