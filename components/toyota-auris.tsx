"use client"

import { useState, useEffect, useRef } from "react"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

const toyotaAurisImages = [
  "/images/whatsapp-image-2026-01-08-at-7-04-49-pm.jpeg",
  "/images/whatsapp-image-2026-01-08-at-7-04-48-pm-3.jpeg",
  "/images/whatsapp-image-2026-01-08-at-7-04-51-pm-1.jpeg",
  "/images/whatsapp-image-2026-01-08-at-7-04-48-pm-2.jpeg",
  "/images/whatsapp-image-2026-01-08-at-7-04-50-pm-3.jpeg",
  "/images/whatsapp-image-2026-01-08-at-7-04-50-pm-2.jpeg",
  "/images/whatsapp-image-2026-01-08-at-7-04-49-pm-1.jpeg",
  "/images/whatsapp-image-2026-01-08-at-7-04-50-pm-1.jpeg",
  "/images/whatsapp-image-2026-01-08-at-7-04-49-pm-2.jpeg",
  "/images/whatsapp-image-2026-01-08-at-7-04-50-pm.jpeg",
  "/images/whatsapp-image-2026-01-08-at-7-04-47-pm-1.jpeg",
  "/images/whatsapp-image-2026-01-08-at-7-04-48-pm.jpeg",
  "/images/whatsapp-image-2026-01-08-at-7-04-47-pm.jpeg",
  "/images/whatsapp-image-2026-01-08-at-7-04-48-pm-1.jpeg",
]

export function ToyotaAuris() {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isTransitioning, setIsTransitioning] = useState(false)
  const [isVisible, setIsVisible] = useState(false)
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
        }
      },
      { threshold: 0.1 },
    )

    if (sectionRef.current) {
      observer.observe(sectionRef.current)
    }

    return () => observer.disconnect()
  }, [])

  const nextSlide = () => {
    if (isTransitioning) return
    setIsTransitioning(true)
    setCurrentIndex((prev) => (prev + 1) % toyotaAurisImages.length)
    setTimeout(() => setIsTransitioning(false), 800)
  }

  const prevSlide = () => {
    if (isTransitioning) return
    setIsTransitioning(true)
    setCurrentIndex((prev) => (prev - 1 + toyotaAurisImages.length) % toyotaAurisImages.length)
    setTimeout(() => setIsTransitioning(false), 800)
  }

  const goToSlide = (index: number) => {
    if (isTransitioning || index === currentIndex) return
    setIsTransitioning(true)
    setCurrentIndex(index)
    setTimeout(() => setIsTransitioning(false), 800)
  }

  useEffect(() => {
    const interval = setInterval(() => {
      nextSlide()
    }, 6000)

    return () => clearInterval(interval)
  }, [currentIndex, isTransitioning])

  return (
    <section ref={sectionRef} className="py-32 bg-gradient-to-b from-card/50 to-background overflow-hidden relative">
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary rounded-full blur-3xl animate-pulse-slow" />
        <div
          className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-secondary rounded-full blur-3xl animate-pulse-slow"
          style={{ animationDelay: "3s" }}
        />
      </div>

      <div className="container px-4 relative z-10">
        <div
          className={`text-center mb-16 transition-all duration-1000 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}
        >
          <h2 className="text-5xl md:text-6xl font-bold text-foreground mb-6 animate-glow">Toyota Auris Hybrid</h2>
          <p className="text-2xl text-muted-foreground">Eco-Friendly NewShape Edition</p>
        </div>

        <div className="max-w-7xl mx-auto">
          <div
            className={`relative aspect-[16/10] md:aspect-[21/9] rounded-3xl overflow-hidden bg-card/30 backdrop-blur-sm shadow-[0_20px_80px_-20px_rgba(0,0,0,0.5)] border border-border/50 transition-all duration-1000 ${isVisible ? "opacity-100 scale-100" : "opacity-0 scale-95"}`}
          >
            <div className="absolute inset-0 bg-gradient-to-t from-background/60 via-transparent to-background/20 z-10 pointer-events-none" />

            {toyotaAurisImages.map((image, index) => (
              <div
                key={index}
                className={cn(
                  "absolute inset-0 transition-all duration-[1400ms] ease-[cubic-bezier(0.65,0,0.35,1)]",
                  index === currentIndex
                    ? "opacity-100 scale-100 z-[2]"
                    : index === (currentIndex - 1 + toyotaAurisImages.length) % toyotaAurisImages.length
                      ? "opacity-0 scale-105 z-[1]"
                      : "opacity-0 scale-95 z-0 pointer-events-none",
                )}
              >
                <div className="w-full h-full p-8 md:p-12 flex items-center justify-center">
                  <img
                    src={image || "/placeholder.svg"}
                    alt={`Toyota Auris view ${index + 1}`}
                    className="w-full h-full object-contain drop-shadow-2xl"
                  />
                </div>
              </div>
            ))}

            <button
              onClick={prevSlide}
              disabled={isTransitioning}
              className="absolute left-6 top-1/2 -translate-y-1/2 p-5 rounded-full bg-card/95 backdrop-blur-xl border-2 border-border hover:border-primary transition-all duration-300 disabled:opacity-50 group z-20 hover:scale-110 shadow-2xl hover:shadow-primary/30"
              aria-label="Previous image"
            >
              <ChevronLeft className="h-7 w-7 text-foreground group-hover:text-primary transition-colors" />
            </button>

            <button
              onClick={nextSlide}
              disabled={isTransitioning}
              className="absolute right-6 top-1/2 -translate-y-1/2 p-5 rounded-full bg-card/95 backdrop-blur-xl border-2 border-border hover:border-primary transition-all duration-300 disabled:opacity-50 group z-20 hover:scale-110 shadow-2xl hover:shadow-primary/30"
              aria-label="Next image"
            >
              <ChevronRight className="h-7 w-7 text-foreground group-hover:text-primary transition-colors" />
            </button>

            <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex gap-3 z-20 bg-card/80 backdrop-blur-lg px-6 py-3 rounded-full border border-border/50">
              {toyotaAurisImages.map((_, index) => (
                <button
                  key={index}
                  onClick={() => goToSlide(index)}
                  disabled={isTransitioning}
                  className={cn(
                    "h-2.5 rounded-full transition-all duration-500 hover:scale-110",
                    index === currentIndex
                      ? "w-14 bg-primary shadow-lg shadow-primary/60"
                      : "w-2.5 bg-muted-foreground/40 hover:bg-muted-foreground/70",
                  )}
                  aria-label={`Go to image ${index + 1}`}
                />
              ))}
            </div>
          </div>

          <div
            className={`mt-10 bg-gradient-to-br from-card/90 to-card/70 backdrop-blur-sm rounded-2xl p-10 border-2 border-border/50 shadow-2xl transition-all duration-1000 delay-300 hover:border-primary/50 hover:shadow-[0_20px_80px_-20px] hover:shadow-primary/30 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}
          >
            <div className="flex flex-col lg:flex-row justify-between items-start gap-10">
              <div className="space-y-4 flex-1">
                <h3 className="text-4xl font-bold text-foreground bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent">
                  Toyota Auris Hybrid
                </h3>
                <p className="text-muted-foreground text-xl font-medium">Fuel-Efficient Hybrid Hatchback</p>

                <div className="pt-6 space-y-3 text-base leading-relaxed text-muted-foreground">
                  <p className="font-bold text-foreground text-xl mb-4">Toyota Auris NewShape Hybrid Edition</p>
                  <div className="grid sm:grid-cols-2 gap-x-8 gap-y-3">
                    <p>
                      <span className="text-primary font-semibold">Model:</span>{" "}
                      <span className="text-foreground">2016</span>
                    </p>
                    <p className="text-accent font-semibold">Recently Imported Vehicle</p>
                    <p className="text-primary font-bold text-lg col-span-2">Duty Fully Paid!</p>
                    <p>
                      <span className="text-primary font-semibold">Mileage:</span>{" "}
                      <span className="text-foreground">52,855km</span>
                    </p>
                    <p>
                      <span className="text-primary font-semibold">Transmission:</span>{" "}
                      <span className="text-foreground">Automatic</span>
                    </p>
                    <p className="col-span-2">
                      <span className="text-primary font-semibold">Engine:</span>{" "}
                      <span className="text-foreground">1.5L Petrol + Hybrid Battery</span>
                    </p>
                    <p className="text-accent font-semibold col-span-2">Excellent Condition</p>
                  </div>

                  <div className="pt-4 space-y-2 border-t border-border/50 mt-6">
                    <p className="font-semibold text-foreground text-lg mb-3">Premium Features:</p>
                    <ul className="space-y-2 pl-4">
                      <li className="flex items-start gap-2">
                        <span className="text-primary mt-1">•</span>
                        <span>Reverse Camera + 360° Motion Sensor Cam</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-primary mt-1">•</span>
                        <span>Multi Steering Controls</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-primary mt-1">•</span>
                        <span>Auto DayTime Lights</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-primary mt-1">•</span>
                        <span>Eco Mode + Sport Mode</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-primary mt-1">•</span>
                        <span>Sparkling Half Leather Interior</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-primary mt-1">•</span>
                        <span>Quality Sound System</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-primary mt-1">•</span>
                        <span>Solid Suspension</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-primary mt-1">•</span>
                        <span className="font-semibold text-foreground">Luxurious Drive Experience</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>

              <div className="flex flex-col items-start lg:items-end gap-6 lg:min-w-[280px]">
                <div className="text-left lg:text-right bg-gradient-to-br from-primary/10 to-secondary/10 p-6 rounded-xl border border-primary/20 w-full">
                  <div className="text-sm text-muted-foreground uppercase tracking-wider mb-2">Price</div>
                  <div className="text-5xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                    $14,500
                  </div>
                  <div className="text-xl text-foreground font-medium mt-1">USD</div>
                </div>
                <Button
                  size="lg"
                  asChild
                  className="w-full bg-gradient-to-r from-primary to-accent hover:from-primary/90 hover:to-accent/90 text-primary-foreground transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:shadow-primary/50 text-lg py-6 font-bold"
                >
                  <a href="tel:+263783935399" className="flex items-center justify-center gap-2">
                    <span>Purchase Now</span>
                  </a>
                </Button>
                <p className="text-sm text-muted-foreground text-center lg:text-right w-full">
                  Contact us for more details or to schedule a viewing
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
