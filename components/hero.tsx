"use client"

import { Button } from "@/components/ui/button"
import { Phone, Instagram, Search } from "lucide-react"
import { useEffect, useRef, useState } from "react"
import { useRouter } from "next/navigation"

export function Hero() {
  const heroRef = useRef<HTMLDivElement>(null)
  const backgroundRef = useRef<HTMLDivElement>(null)
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const [searchQuery, setSearchQuery] = useState("")
  const router = useRouter()

  useEffect(() => {
    const handleScroll = () => {
      if (!heroRef.current || !backgroundRef.current) return
      const scrolled = window.scrollY
      const parallaxSpeed = 0.5
      heroRef.current.style.transform = `translateY(${scrolled * parallaxSpeed}px)`

      const heroHeight = heroRef.current.offsetHeight
      const fadeStart = 0
      const fadeEnd = heroHeight * 0.5

      let opacity = 1
      if (scrolled >= fadeStart && scrolled <= fadeEnd) {
        opacity = 1 - (scrolled - fadeStart) / (fadeEnd - fadeStart)
      } else if (scrolled > fadeEnd) {
        opacity = 0
      }

      backgroundRef.current.style.opacity = opacity.toString()
      backgroundRef.current.style.transform = `translateY(${scrolled * 0.3}px) scale(${1 + scrolled * 0.0005})`
    }

    const handleMouseMove = (e: MouseEvent) => {
      const x = (e.clientX / window.innerWidth - 0.5) * 20
      const y = (e.clientY / window.innerHeight - 0.5) * 20
      setMousePosition({ x, y })
    }

    window.addEventListener("scroll", handleScroll)
    window.addEventListener("mousemove", handleMouseMove)
    return () => {
      window.removeEventListener("scroll", handleScroll)
      window.removeEventListener("mousemove", handleMouseMove)
    }
  }, [])

  const handleSearch = () => {
    if (searchQuery.trim()) {
      router.push(`/search?q=${encodeURIComponent(searchQuery.trim())}`)
    }
  }

  return (
    <section id="home" className="relative min-h-[85vh] flex items-center justify-center overflow-hidden py-12">
      <div
        ref={backgroundRef}
        className="absolute inset-0 bg-slate-900 transition-all duration-300 ease-out"
        style={{
          backgroundImage: "url('/images/whatsapp-image-2026-01-08-at-5-06-23-pm.jpeg')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          filter: "blur(4px) brightness(0.3)",
        }}
      />

      <div
        ref={heroRef}
        className="absolute inset-0 bg-slate-900"
        style={{
          backgroundImage: "url('/images/whatsapp-image-2026-01-08-at-5-06-23-pm.jpeg')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          filter: "blur(4px) brightness(0.3)",
        }}
      />

      <div
        className="absolute inset-0 opacity-10"
        style={{
          transform: `translate(${mousePosition.x}px, ${mousePosition.y}px)`,
          transition: "transform 0.3s ease-out",
        }}
      >
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,_var(--color-primary)_0%,_transparent_50%)] animate-pulse-slow" />
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-accent/30 rounded-full blur-3xl animate-float" />
        <div
          className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-primary/30 rounded-full blur-3xl animate-float"
          style={{ animationDelay: "2s" }}
        />
      </div>

      <div className="container relative z-10 px-4 py-16 md:py-20">
        <div className="max-w-5xl mx-auto text-center space-y-8 animate-fade-in-up">
          <div className="space-y-6">
            <p className="text-primary text-lg md:text-xl font-semibold animate-fade-in-up">
              Zimbabwe's #1 Online Car Marketplace
            </p>
            <h1
              className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-white leading-tight text-balance animate-fade-in-up"
              style={{
                animationDelay: "0.1s",
                transform: `translate(${mousePosition.x * 0.5}px, ${mousePosition.y * 0.5}px)`,
              }}
            >
              Buy & Sell <span className="text-primary">Premium Cars</span> <br className="hidden sm:block" />
              Across Zimbabwe
            </h1>
            <p
              className="text-lg md:text-xl lg:text-2xl text-gray-200 max-w-3xl mx-auto text-pretty animate-fade-in-up"
              style={{ animationDelay: "0.2s" }}
            >
              Fast. Reliable. Verified – Your Trusted Vehicle Hub.
            </p>
          </div>

          <div
            className="max-w-3xl mx-auto bg-white rounded-xl p-6 shadow-2xl animate-fade-in-up"
            style={{ animationDelay: "0.3s" }}
          >
            <div className="flex flex-col sm:flex-row gap-3">
              <input
                type="text"
                placeholder="Find Your Car"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleSearch()}
                className="flex-1 px-6 py-4 text-lg border-2 border-gray-200 rounded-lg focus:outline-none focus:border-primary transition-all text-gray-800 placeholder:text-gray-400"
              />
              <Button
                onClick={handleSearch}
                className="bg-primary hover:bg-primary/90 text-white text-lg px-8 py-4 h-auto rounded-lg font-semibold transition-all hover:scale-105"
              >
                <Search className="h-5 w-5 mr-2" />
                Search
              </Button>
            </div>
          </div>

          <div
            className="flex flex-wrap items-center justify-center gap-6 md:gap-12 pt-6 animate-fade-in-up"
            style={{ animationDelay: "0.4s" }}
          >
            <div className="flex items-center gap-3 text-white">
              <div className="p-3 rounded-full bg-primary/20">
                <span className="text-2xl">👥</span>
              </div>
              <div className="text-left">
                <div className="text-2xl font-bold">1000+</div>
                <div className="text-sm text-gray-300">Happy Users</div>
              </div>
            </div>
            <div className="flex items-center gap-3 text-white">
              <div className="p-3 rounded-full bg-primary/20">
                <span className="text-2xl">⭐</span>
              </div>
              <div className="text-left">
                <div className="text-2xl font-bold">5 Stars</div>
                <div className="text-sm text-gray-300">Reviews</div>
              </div>
            </div>
            <div className="flex items-center gap-3 text-white">
              <div className="p-3 rounded-full bg-primary/20">
                <span className="text-2xl">🚗</span>
              </div>
              <div className="text-left">
                <div className="text-2xl font-bold">100+</div>
                <div className="text-sm text-gray-300">Cars</div>
              </div>
            </div>
          </div>

          <div
            className="flex flex-col sm:flex-row items-center justify-center gap-6 pt-4 animate-fade-in-up"
            style={{ animationDelay: "0.5s" }}
          >
            <Button
              size="lg"
              onClick={() => router.push("/vehicles")}
              className="bg-primary hover:bg-primary/90 text-primary-foreground text-lg px-8 py-6 transition-all duration-300 hover:scale-110 hover:shadow-2xl hover:shadow-primary/50"
            >
              <span className="relative z-10">Browse Cars</span>
            </Button>
            <a href="tel:+263783935399">
              <Button
                size="lg"
                variant="outline"
                className="border-2 border-primary text-foreground hover:bg-primary/10 text-lg px-8 py-6 bg-transparent transition-all duration-300 hover:scale-110 hover:shadow-xl hover:shadow-primary/30"
              >
                Contact Us
              </Button>
            </a>
          </div>

          <div
            className="flex flex-col sm:flex-row items-center justify-center gap-8 pt-6 animate-fade-in-up"
            style={{ animationDelay: "0.6s" }}
          >
            <a
              href="tel:+263783935399"
              className="flex items-center gap-3 text-foreground hover:text-primary transition-all duration-300 group hover:scale-105"
            >
              <div className="p-3 rounded-full bg-primary/10 group-hover:bg-primary/20 transition-all duration-300 group-hover:rotate-12">
                <Phone className="h-6 w-6 text-primary" />
              </div>
              <span className="font-medium text-lg">+263 78 393 5399</span>
            </a>
            <a
              href="https://instagram.com/tcars.zim"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3 text-foreground hover:text-primary transition-all duration-300 group hover:scale-105"
            >
              <div className="p-3 rounded-full bg-primary/10 group-hover:bg-primary/20 transition-all duration-300 group-hover:rotate-12">
                <Instagram className="h-6 w-6 text-primary" />
              </div>
              <span className="font-medium text-lg">@tcars.zim</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}
