"use client"

import { useState, useEffect } from "react"
import { X, ChevronLeft, ChevronRight, Phone } from "lucide-react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

interface VehicleDetailModalProps {
  vehicle: {
    id: number
    name: string
    variant: string
    year: number
    fuel: string
    mileage: string
    price: number
    images: string[]
    description: string
    features: string[]
  } | null
  onClose: () => void
}

export function VehicleDetailModal({ vehicle, onClose }: VehicleDetailModalProps) {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isTransitioning, setIsTransitioning] = useState(false)

  useEffect(() => {
    setCurrentIndex(0)
  }, [vehicle?.id])

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose()
    }
    window.addEventListener("keydown", handleEscape)
    return () => window.removeEventListener("keydown", handleEscape)
  }, [onClose])

  if (!vehicle) return null

  const nextSlide = () => {
    if (isTransitioning) return
    setIsTransitioning(true)
    setCurrentIndex((prev) => (prev + 1) % vehicle.images.length)
    setTimeout(() => setIsTransitioning(false), 800)
  }

  const prevSlide = () => {
    if (isTransitioning) return
    setIsTransitioning(true)
    setCurrentIndex((prev) => (prev - 1 + vehicle.images.length) % vehicle.images.length)
    setTimeout(() => setIsTransitioning(false), 800)
  }

  const goToSlide = (index: number) => {
    if (isTransitioning || index === currentIndex) return
    setIsTransitioning(true)
    setCurrentIndex(index)
    setTimeout(() => setIsTransitioning(false), 800)
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-background/95 backdrop-blur-lg p-0 sm:p-4 animate-in fade-in duration-300">
      <div className="relative w-full h-full sm:h-auto sm:max-w-7xl sm:max-h-[90vh] bg-card sm:rounded-3xl shadow-2xl border-0 sm:border border-border overflow-hidden animate-in zoom-in-95 duration-300">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-50 p-2 sm:p-3 rounded-full bg-card/95 backdrop-blur-xl border-2 border-border hover:border-primary transition-all duration-300 group hover:scale-110 shadow-2xl"
        >
          <X className="h-5 w-5 sm:h-6 sm:w-6 text-foreground group-hover:text-primary transition-colors" />
        </button>

        <div className="overflow-y-auto h-full sm:max-h-[90vh]">
          <div className="relative w-full h-[70vh] sm:h-[75vh] bg-background">
            {vehicle.images.map((image, index) => (
              <div
                key={index}
                className={cn(
                  "absolute inset-0 transition-all duration-[1400ms] ease-[cubic-bezier(0.65,0,0.35,1)]",
                  index === currentIndex ? "opacity-100 scale-100 z-[2]" : "opacity-0 scale-95 z-0",
                )}
              >
                <div className="w-full h-full flex items-center justify-center">
                  <img
                    src={image || "/placeholder.svg"}
                    alt={`${vehicle.name} view ${index + 1}`}
                    className="w-full h-full object-contain"
                  />
                </div>
              </div>
            ))}

            {vehicle.images.length > 1 && (
              <>
                <button
                  onClick={prevSlide}
                  disabled={isTransitioning}
                  className="absolute left-2 sm:left-6 top-1/2 -translate-y-1/2 p-3 sm:p-4 rounded-full bg-card/95 backdrop-blur-xl border-2 border-border hover:border-primary transition-all duration-300 disabled:opacity-50 group z-20 hover:scale-110 shadow-2xl"
                >
                  <ChevronLeft className="h-5 w-5 sm:h-6 sm:w-6 text-foreground group-hover:text-primary transition-colors" />
                </button>

                <button
                  onClick={nextSlide}
                  disabled={isTransitioning}
                  className="absolute right-2 sm:right-6 top-1/2 -translate-y-1/2 p-3 sm:p-4 rounded-full bg-card/95 backdrop-blur-xl border-2 border-border hover:border-primary transition-all duration-300 disabled:opacity-50 group z-20 hover:scale-110 shadow-2xl"
                >
                  <ChevronRight className="h-5 w-5 sm:h-6 sm:w-6 text-foreground group-hover:text-primary transition-colors" />
                </button>

                <div className="absolute bottom-4 sm:bottom-6 left-1/2 -translate-x-1/2 flex gap-1.5 sm:gap-2 z-20 bg-card/80 backdrop-blur-lg px-3 sm:px-4 py-1.5 sm:py-2 rounded-full overflow-x-auto max-w-[90%]">
                  {vehicle.images.map((_, index) => (
                    <button
                      key={index}
                      onClick={() => goToSlide(index)}
                      disabled={isTransitioning}
                      className={cn(
                        "h-2 sm:h-2 rounded-full transition-all duration-500 flex-shrink-0",
                        index === currentIndex
                          ? "w-8 sm:w-12 bg-primary shadow-lg shadow-primary/60"
                          : "w-2 sm:w-2 bg-muted-foreground/40 hover:bg-muted-foreground/70",
                      )}
                    />
                  ))}
                </div>
              </>
            )}
          </div>

          <div className="p-4 sm:p-6 md:p-8">
            <div className="flex flex-col lg:flex-row justify-between items-start gap-6 md:gap-8">
              <div className="flex-1 space-y-4 md:space-y-6 w-full">
                <div>
                  <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent mb-2">
                    {vehicle.name}
                  </h2>
                  <p className="text-base sm:text-lg md:text-xl text-muted-foreground font-medium">{vehicle.variant}</p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 md:gap-4 text-sm md:text-base">
                  <p>
                    <span className="text-primary font-semibold">Year:</span>{" "}
                    <span className="text-foreground">{vehicle.year}</span>
                  </p>
                  <p>
                    <span className="text-primary font-semibold">Engine:</span>{" "}
                    <span className="text-foreground">{vehicle.fuel}</span>
                  </p>
                  <p>
                    <span className="text-primary font-semibold">Mileage:</span>{" "}
                    <span className="text-foreground">{vehicle.mileage}</span>
                  </p>
                </div>

                <div className="pt-3 md:pt-4 border-t border-border">
                  <p className="text-muted-foreground leading-relaxed text-sm md:text-base">{vehicle.description}</p>
                </div>

                <div className="pt-3 md:pt-4 border-t border-border">
                  <h3 className="text-base md:text-lg font-semibold text-foreground mb-3 md:mb-4">Premium Features</h3>
                  <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 md:gap-3">
                    {vehicle.features.map((feature, index) => (
                      <li key={index} className="flex items-start gap-2 text-muted-foreground text-sm md:text-base">
                        <span className="text-primary mt-1">•</span>
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="w-full lg:min-w-[280px] flex flex-col gap-4">
                <div className="bg-gradient-to-br from-primary/10 to-accent/10 p-4 sm:p-6 rounded-xl border border-primary/20">
                  <div className="text-xs md:text-sm text-muted-foreground uppercase tracking-wider mb-2">Price</div>
                  <div className="text-3xl sm:text-4xl md:text-5xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                    ${vehicle.price.toLocaleString()}
                  </div>
                  <div className="text-lg md:text-xl text-foreground font-medium mt-1">USD</div>
                </div>

                <Button
                  size="lg"
                  asChild
                  className="w-full bg-gradient-to-r from-primary to-accent hover:from-primary/90 hover:to-accent/90 text-primary-foreground transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:shadow-primary/50 text-base md:text-lg py-5 md:py-6 font-bold"
                >
                  <a href="tel:+263783935399" className="flex items-center justify-center gap-2">
                    <Phone className="h-4 w-4 md:h-5 md:w-5" />
                    <span>Purchase Now</span>
                  </a>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
