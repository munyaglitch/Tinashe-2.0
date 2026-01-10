"use client"

import { useState, useEffect, useRef } from "react"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

const fordRaptorImages = [
  "/images/whatsapp-image-2026-01-08-at-5-12-12-pm-1.jpeg",
  "/images/whatsapp-image-2026-01-08-at-5-12-14-pm-2.jpeg",
  "/images/whatsapp-image-2026-01-08-at-5-12-14-pm-1.jpeg",
  "/images/whatsapp-image-2026-01-08-at-5-12-14-pm.jpeg",
  "/images/whatsapp-image-2026-01-08-at-5-12-12-pm.jpeg",
  "/images/whatsapp-image-2026-01-08-at-6-12-59-pm.jpeg",
  "/images/whatsapp-image-2026-01-08-at-6-13-00-pm.jpeg",
  "/images/whatsapp-image-2026-01-08-at-5-12-13-pm.jpeg",
  "/images/whatsapp-image-2026-01-08-at-5-12-13-pm-1.jpeg",
  "/images/whatsapp-image-2026-01-08-at-5-12-13-pm-2.jpeg",
  "/images/whatsapp-image-2026-01-08-at-5-12-08-pm.jpeg",
  "/images/whatsapp-image-2026-01-08-at-5-12-10-pm-2.jpeg",
  "/images/whatsapp-image-2026-01-08-at-5-12-10-pm-1.jpeg",
  "/images/whatsapp-image-2026-01-08-at-5-12-10-pm-3.jpeg",
  "/images/whatsapp-image-2026-01-08-at-5-12-08-pm-1.jpeg",
  "/images/whatsapp-image-2026-01-08-at-5-12-11-pm-2.jpeg",
  "/images/whatsapp-image-2026-01-08-at-5-12-11-pm-1.jpeg",
  "/images/ford-raptor.jpeg",
  "/images/whatsapp-image-2026-01-08-at-5-12-11-pm.jpeg",
]

export function FordRaptor() {
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
    setCurrentIndex((prev) => (prev + 1) % fordRaptorImages.length)
    setTimeout(() => setIsTransitioning(false), 800)
  }

  const prevSlide = () => {
    if (isTransitioning) return
    setIsTransitioning(true)
    setCurrentIndex((prev) => (prev - 1 + fordRaptorImages.length) % fordRaptorImages.length)
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
    <section ref={sectionRef} className="py-32 bg-gradient-to-b from-background to-card/50 overflow-hidden relative">
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-accent rounded-full blur-3xl animate-pulse-slow" />
        <div
          className="absolute bottom-1/4 left-1/4 w-96 h-96 bg-primary rounded-full blur-3xl animate-pulse-slow"
          style={{ animationDelay: "3s" }}
        />
      </div>

      <div className="container px-4 relative z-10">
        <div
          className={`text-center mb-16 transition-all duration-1000 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}
        >
          <h2 className="text-5xl md:text-6xl font-bold text-foreground mb-6 animate-glow">Performance Beast</h2>
          <p className="text-2xl text-muted-foreground">Ford Ranger Raptor</p>
        </div>

        <div className="max-w-7xl mx-auto">
          <div
            className={`relative aspect-[16/10] md:aspect-[21/9] rounded-3xl overflow-hidden bg-card/30 backdrop-blur-sm shadow-[0_20px_80px_-20px_rgba(0,0,0,0.5)] border border-border/50 transition-all duration-1000 ${isVisible ? "opacity-100 scale-100" : "opacity-0 scale-95"}`}
          >
            <div className="absolute inset-0 bg-gradient-to-t from-background/60 via-transparent to-background/20 z-10 pointer-events-none" />

            {fordRaptorImages.map((image, index) => (
              <div
                key={index}
                className={cn(
                  "absolute inset-0 transition-all duration-[1400ms] ease-[cubic-bezier(0.65,0,0.35,1)]",
                  index === currentIndex
                    ? "opacity-100 scale-100 z-[2]"
                    : index === (currentIndex - 1 + fordRaptorImages.length) % fordRaptorImages.length
                      ? "opacity-0 scale-105 z-[1]"
                      : "opacity-0 scale-95 z-0 pointer-events-none",
                )}
              >
                <div className="w-full h-full p-8 md:p-12 flex items-center justify-center">
                  <img
                    src={image || "/placeholder.svg"}
                    alt={`Ford Raptor view ${index + 1}`}
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
              {fordRaptorImages.map((_, index) => (
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
                <h3 className="text-4xl font-bold text-foreground bg-gradient-to-r from-accent to-accent/70 bg-clip-text text-transparent">
                  Ford Ranger Raptor
                </h3>
                <p className="text-muted-foreground text-xl font-medium">
                  Off-Road Performance Truck - Excellent Condition
                </p>

                <div className="pt-6 space-y-3 text-base leading-relaxed text-muted-foreground">
                  <p className="font-bold text-foreground text-xl mb-4">Ford Ranger Raptor Edition</p>
                  <div className="grid sm:grid-cols-2 gap-x-8 gap-y-3">
                    <p>
                      <span className="text-primary font-semibold">Model:</span>{" "}
                      <span className="text-foreground">2023</span>
                    </p>
                    <p className="text-accent font-semibold">Excellent Condition</p>
                    <p className="text-primary font-bold text-lg col-span-2">Duty Fully Paid!</p>
                    <p>
                      <span className="text-primary font-semibold">Mileage:</span>{" "}
                      <span className="text-foreground">19,286 km</span>
                    </p>
                    <p>
                      <span className="text-primary font-semibold">Transmission:</span>{" "}
                      <span className="text-foreground">Automatic</span>
                    </p>
                    <p>
                      <span className="text-primary font-semibold">Engine:</span>{" "}
                      <span className="text-foreground">2.0L Bi-Turbo Diesel</span>
                    </p>
                    <p className="col-span-2">
                      <span className="text-primary font-semibold">Drive:</span>{" "}
                      <span className="text-foreground font-bold">4X4</span>
                    </p>
                  </div>

                  <div className="pt-4 space-y-2 border-t border-border/50 mt-6">
                    <p className="font-semibold text-foreground text-lg mb-3">Premium Features:</p>
                    <ul className="space-y-2 pl-4">
                      <li className="flex items-start gap-2">
                        <span className="text-primary mt-1">•</span>
                        <span>Reverse Camera + OverHead Dual Cam</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-primary mt-1">•</span>
                        <span>Multi Steering Controls</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-primary mt-1">•</span>
                        <span>Wide Monitoring Display Screen</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-primary mt-1">•</span>
                        <span>Bluetooth Interface + Wireless Charging Section</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-primary mt-1">•</span>
                        <span>Motion Sensors Right Round</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-primary mt-1">•</span>
                        <span>Sparkling Full Leather Interior</span>
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
                <div className="text-left lg:text-right bg-gradient-to-br from-accent/10 to-primary/10 p-6 rounded-xl border border-accent/20 w-full">
                  <div className="text-sm text-muted-foreground uppercase tracking-wider mb-2">Price</div>
                  <div className="text-5xl font-bold bg-gradient-to-r from-accent to-primary bg-clip-text text-transparent">
                    $95,000
                  </div>
                  <div className="text-xl text-foreground font-medium mt-1">USD</div>
                </div>
                <Button
                  size="lg"
                  asChild
                  className="w-full bg-gradient-to-r from-accent to-primary hover:from-accent/90 hover:to-primary/90 text-primary-foreground transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:shadow-accent/50 text-lg py-6 font-bold"
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
