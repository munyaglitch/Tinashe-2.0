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
  icons: {
    icon: "/images/tc-car-sales-logo.png",
    apple: "/images/tc-car-sales-logo.png",
  },
    generator: 'v0.app'
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
        <div className="pointer-events-none fixed bottom-14 right-4 md:bottom-4 z-50 flex items-center justify-center rounded-[10px] bg-transparent">
          <Image
            src="/images/tc-car-sales-logo.png"
            alt="Tinashe Car Sales"
            width={56}
            height={56}
            className="object-contain drop-shadow-[0_8px_18px_rgba(0,0,0,0.45)]"
            priority
          />
        </div>
        <Analytics />
      </body>
    </html>
  )
}
