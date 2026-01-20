"use client"

import Image from "next/image"
import { useRouter } from "next/navigation"
import { Button } from "./ui/button"

export function ShowcaseBanner() {
  const router = useRouter()

  const handleCTA = () => {
    const section = document.getElementById("vehicles")
    if (section) {
      section.scrollIntoView({ behavior: "smooth" })
    } else {
      router.push("/")
    }
  }

  return (
    <section className="relative py-12 md:py-16">
      <div className="relative h-72 md:h-96 rounded-[20px] border border-border overflow-hidden bg-gradient-to-br from-card/80 to-card/60">
        <div className="absolute inset-0 bg-gradient-to-br from-black/40 via-black/10 to-transparent" />
        <div className="relative z-10 flex h-full flex-col items-start justify-center gap-4 px-6 md:px-12">
          <p className="text-xs uppercase tracking-[0.5em] text-muted-foreground">Featured Curations</p>
          <h2 className="text-3xl md:text-4xl font-semibold text-white max-w-2xl">
            Insert your Vercel-hosted hero image here to showcase the next curated drop.
          </h2>
          <p className="text-sm md:text-base text-white/90 max-w-xl">
            This cover area is ready to receive any remote image you deploy on Vercel. It will fit and stay sharp across breakpoints.
          </p>
          <Button onClick={handleCTA} className="bg-gradient-to-r from-primary to-accent">
            Search by results
          </Button>
        </div>
      </div>
    </section>
  )
}
