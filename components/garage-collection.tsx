"use client"

import { useState } from "react"
import Image from "next/image"
import { ChevronLeft, ChevronRight, Car } from "lucide-react"
import { Button } from "@/components/ui/button"

export function GarageCollection() {
  const [activeImage, setActiveImage] = useState(0)
  const [isTransitioning, setIsTransitioning] = useState(false)
  const [slideDirection, setSlideDirection] = useState<"left" | "right">("right")

  const images = [
    {
      src: "/images/garage-collection-1.jpeg",
      alt: "TC Garage Collection - Premium Vehicles Page 1",
      label: "Collection A",
    },
    {
      src: "/images/garage-collection-2.jpeg",
      alt: "TC Garage Collection - Premium Vehicles Page 2",
      label: "Collection B",
    },
  ]

  const changeImage = (newIndex: number, direction: "left" | "right") => {
    if (isTransitioning) return
    setSlideDirection(direction)
    setIsTransitioning(true)
    setTimeout(() => {
      setActiveImage(newIndex)
      setTimeout(() => setIsTransitioning(false), 50)
    }, 400)
  }

  const nextImage = () => {
    const newIndex = (activeImage + 1) % images.length
    changeImage(newIndex, "right")
  }

  const prevImage = () => {
    const newIndex = (activeImage - 1 + images.length) % images.length
    changeImage(newIndex, "left")
  }

  return (
    <section className="py-20 px-4 relative overflow-hidden">
      {/* Diagonal accent lines */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-1/2 -left-1/4 w-full h-full bg-gradient-to-br from-primary/5 to-transparent rotate-12 transform-gpu" />
        <div className="absolute -bottom-1/2 -right-1/4 w-full h-full bg-gradient-to-tl from-secondary/5 to-transparent -rotate-12 transform-gpu" />
      </div>

      <div className="max-w-5xl mx-auto relative z-10">
        {/* Section Header - Unique asymmetric design */}
        <div className="mb-14">
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4">
            <div>
              <div className="inline-flex items-center gap-2 text-primary mb-3">
                <div className="w-8 h-px bg-primary" />
                <Car className="w-4 h-4" />
                <span className="text-xs font-semibold tracking-widest uppercase">Featured Collection</span>
              </div>
              <h2 className="text-3xl md:text-5xl font-bold text-foreground">
                Our Premium Selection
              </h2>
            </div>
            <p className="text-muted-foreground max-w-sm text-sm md:text-right">
              Curated quality vehicles at competitive prices
            </p>
          </div>
        </div>

        {/* Image Carousel */}
        <div className="relative">
          {/* Main Image Container with unique shape */}
          <div className="relative rounded-[2.5rem] overflow-hidden bg-gradient-to-br from-card/80 to-card/40 p-1.5">
            <div className="relative rounded-[2rem] overflow-hidden bg-background">
              {/* Subtle top accent bar */}
              <div className="absolute top-0 left-1/2 -translate-x-1/2 w-1/3 h-1 bg-gradient-to-r from-transparent via-primary/50 to-transparent z-30" />
              
              {/* Image with 3D flip animation */}
              <div className="relative aspect-[9/16] md:aspect-[3/4] lg:aspect-[2/3] max-h-[750px] w-full overflow-hidden" style={{ perspective: "1000px" }}>
                <div
                  className={`absolute inset-0 transition-all duration-500 ease-out ${
                    isTransitioning
                      ? slideDirection === "right"
                        ? "opacity-0 rotate-y-[-15deg] scale-90"
                        : "opacity-0 rotate-y-[15deg] scale-90"
                      : "opacity-100 rotate-y-0 scale-100"
                  }`}
                  style={{ 
                    transformStyle: "preserve-3d",
                    transform: isTransitioning 
                      ? `perspective(1000px) rotateY(${slideDirection === "right" ? "-15deg" : "15deg"}) scale(0.9)` 
                      : "perspective(1000px) rotateY(0deg) scale(1)"
                  }}
                >
                  <Image
                    src={images[activeImage].src || "/placeholder.svg"}
                    alt={images[activeImage].alt}
                    fill
                    className="object-contain"
                    priority
                  />
                </div>
              </div>

              {/* Navigation Arrows - Pill shape */}
              <button
                onClick={prevImage}
                disabled={isTransitioning}
                className="absolute left-3 md:left-6 top-1/2 -translate-y-1/2 w-10 h-16 md:w-12 md:h-20 rounded-full bg-foreground/10 backdrop-blur-md flex items-center justify-center text-foreground hover:bg-primary hover:text-primary-foreground transition-all duration-300 disabled:opacity-50 group"
                aria-label="Previous image"
              >
                <ChevronLeft className="w-5 h-5 md:w-6 md:h-6 group-hover:-translate-x-0.5 transition-transform" />
              </button>
              <button
                onClick={nextImage}
                disabled={isTransitioning}
                className="absolute right-3 md:right-6 top-1/2 -translate-y-1/2 w-10 h-16 md:w-12 md:h-20 rounded-full bg-foreground/10 backdrop-blur-md flex items-center justify-center text-foreground hover:bg-primary hover:text-primary-foreground transition-all duration-300 disabled:opacity-50 group"
                aria-label="Next image"
              >
                <ChevronRight className="w-5 h-5 md:w-6 md:h-6 group-hover:translate-x-0.5 transition-transform" />
              </button>

              {/* Bottom info bar */}
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-background/90 via-background/60 to-transparent p-4 md:p-6">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium text-foreground/80">{images[activeImage].label}</span>
                  <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
                    <span className="font-bold text-foreground">{activeImage + 1}</span>
                    <span>/</span>
                    <span>{images.length}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Progress bar style indicator */}
          <div className="flex justify-center gap-2 mt-6">
            {images.map((_, index) => (
              <button
                key={index}
                onClick={() => changeImage(index, index > activeImage ? "right" : "left")}
                className="relative h-1.5 w-16 rounded-full bg-muted-foreground/20 overflow-hidden"
                aria-label={`Go to image ${index + 1}`}
              >
                <div 
                  className={`absolute inset-y-0 left-0 bg-primary rounded-full transition-all duration-500 ${
                    activeImage === index ? "w-full" : "w-0"
                  }`} 
                />
              </button>
            ))}
          </div>
        </div>

        {/* Thumbnail Preview - Card style */}
        <div className="flex justify-center gap-3 mt-8">
          {images.map((image, index) => (
            <button
              key={index}
              onClick={() => changeImage(index, index > activeImage ? "right" : "left")}
              className={`relative w-20 h-28 md:w-24 md:h-36 rounded-xl overflow-hidden transition-all duration-300 ${
                activeImage === index
                  ? "ring-2 ring-primary scale-105 shadow-lg"
                  : "opacity-40 grayscale hover:opacity-70 hover:grayscale-0"
              }`}
            >
              <Image
                src={image.src || "/placeholder.svg"}
                alt={`Thumbnail ${index + 1}`}
                fill
                className="object-cover"
              />
              {activeImage === index && (
                <div className="absolute bottom-0 left-0 right-0 h-1 bg-primary" />
              )}
            </button>
          ))}
        </div>

        {/* CTA Button - Unique design */}
        <div className="text-center mt-12">
          <Button
            size="lg"
            className="bg-primary hover:bg-primary/90 text-primary-foreground px-10 py-6 text-base font-semibold rounded-full transition-all duration-300 hover:scale-105 hover:shadow-xl hover:shadow-primary/20"
            asChild
          >
            <a href="/search" className="inline-flex items-center gap-2">
              <span>View All Vehicles</span>
              <ChevronRight className="w-4 h-4" />
            </a>
          </Button>
        </div>
      </div>
    </section>
  )
}
