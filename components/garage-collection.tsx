"use client"

import { useState } from "react"
import Image from "next/image"
import { ChevronLeft, ChevronRight, Sparkles } from "lucide-react"
import { Button } from "@/components/ui/button"

export function GarageCollection() {
  const [activeImage, setActiveImage] = useState(0)

  const images = [
    {
      src: "/images/garage-collection-1.jpeg",
      alt: "TC Garage Collection - Premium Vehicles Page 1",
    },
    {
      src: "/images/garage-collection-2.jpeg",
      alt: "TC Garage Collection - Premium Vehicles Page 2",
    },
  ]

  const nextImage = () => {
    setActiveImage((prev) => (prev + 1) % images.length)
  }

  const prevImage = () => {
    setActiveImage((prev) => (prev - 1 + images.length) % images.length)
  }

  return (
    <section className="py-16 px-4 relative overflow-hidden">
      {/* Background decorations matching the site's color scheme */}
      <div className="absolute inset-0 bg-gradient-to-b from-background via-card/50 to-background" />
      <div className="absolute top-0 left-0 w-96 h-96 bg-primary/10 rounded-full blur-3xl animate-pulse-slow" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-secondary/10 rounded-full blur-3xl animate-pulse-slow animation-delay-2000" />

      <div className="max-w-6xl mx-auto relative z-10">
        {/* Section Header */}
        <div className="text-center mb-10">
          <div className="inline-flex items-center gap-2 bg-primary/20 text-primary px-4 py-2 rounded-full mb-4 border border-primary/30">
            <Sparkles className="w-4 h-4" />
            <span className="text-sm font-medium">Featured Collection</span>
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-3 text-glow-primary">
            Our Premium Selection
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Browse our curated collection of quality vehicles. From luxury sedans to rugged off-roaders,
            find your perfect match at competitive prices.
          </p>
        </div>

        {/* Image Carousel */}
        <div className="relative">
          {/* Main Image Container */}
          <div className="relative rounded-2xl overflow-hidden border border-border/50 shadow-2xl glass-effect">
            {/* Decorative corner accents */}
            <div className="absolute top-0 left-0 w-20 h-20 border-t-2 border-l-2 border-primary/50 rounded-tl-2xl z-10" />
            <div className="absolute top-0 right-0 w-20 h-20 border-t-2 border-r-2 border-primary/50 rounded-tr-2xl z-10" />
            <div className="absolute bottom-0 left-0 w-20 h-20 border-b-2 border-l-2 border-primary/50 rounded-bl-2xl z-10" />
            <div className="absolute bottom-0 right-0 w-20 h-20 border-b-2 border-r-2 border-primary/50 rounded-br-2xl z-10" />

            {/* Image */}
            <div className="relative aspect-[9/16] md:aspect-[3/4] lg:aspect-[2/3] max-h-[800px] w-full">
              <Image
                src={images[activeImage].src || "/placeholder.svg"}
                alt={images[activeImage].alt}
                fill
                className="object-contain bg-gradient-to-b from-primary/5 to-secondary/5 transition-all duration-500"
                priority
              />
            </div>

            {/* Navigation Arrows */}
            <button
              onClick={prevImage}
              className="absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-background/80 backdrop-blur-md border border-border/50 flex items-center justify-center text-foreground hover:bg-primary hover:text-primary-foreground hover:border-primary transition-all duration-300 shadow-lg hover-lift"
              aria-label="Previous image"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>
            <button
              onClick={nextImage}
              className="absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-background/80 backdrop-blur-md border border-border/50 flex items-center justify-center text-foreground hover:bg-primary hover:text-primary-foreground hover:border-primary transition-all duration-300 shadow-lg hover-lift"
              aria-label="Next image"
            >
              <ChevronRight className="w-6 h-6" />
            </button>
          </div>

          {/* Image Indicators */}
          <div className="flex justify-center gap-3 mt-6">
            {images.map((_, index) => (
              <button
                key={index}
                onClick={() => setActiveImage(index)}
                className={`h-2 rounded-full transition-all duration-300 ${
                  activeImage === index
                    ? "w-8 bg-primary shadow-lg shadow-primary/50"
                    : "w-2 bg-muted hover:bg-muted-foreground"
                }`}
                aria-label={`Go to image ${index + 1}`}
              />
            ))}
          </div>
        </div>

        {/* Thumbnail Preview */}
        <div className="flex justify-center gap-4 mt-8">
          {images.map((image, index) => (
            <button
              key={index}
              onClick={() => setActiveImage(index)}
              className={`relative w-24 h-32 md:w-32 md:h-44 rounded-lg overflow-hidden border-2 transition-all duration-300 hover-lift ${
                activeImage === index
                  ? "border-primary shadow-lg shadow-primary/30 scale-105"
                  : "border-border/30 opacity-60 hover:opacity-100"
              }`}
            >
              <Image
                src={image.src || "/placeholder.svg"}
                alt={`Thumbnail ${index + 1}`}
                fill
                className="object-cover"
              />
              {activeImage === index && (
                <div className="absolute inset-0 bg-primary/10 backdrop-blur-[1px]" />
              )}
            </button>
          ))}
        </div>

        {/* CTA Button */}
        <div className="text-center mt-10">
          <Button
            size="lg"
            className="bg-primary hover:bg-primary/90 text-primary-foreground px-8 py-6 text-lg font-semibold rounded-xl shadow-lg shadow-primary/30 hover-lift animate-pulse-glow"
            asChild
          >
            <a href="/search">
              View All Vehicles
            </a>
          </Button>
        </div>
      </div>
    </section>
  )
}
