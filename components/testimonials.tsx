"use client"

import { Star } from "lucide-react"
import { useEffect, useRef, useState } from "react"

export function Testimonials() {
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

  const testimonials = [
    {
      name: "Tafadzwa M.",
      location: "Harare",
      rating: 5,
      text: "Excellent service! Found my dream Range Rover through Tinashe Car Sales. The process was smooth and professional from start to finish.",
    },
    {
      name: "Nyasha K.",
      location: "Bulawayo",
      rating: 5,
      text: "Very reliable and trustworthy. They helped me sell my car quickly at a fair price. Highly recommend their services!",
    },
    {
      name: "Rumbi S.",
      location: "Harare",
      rating: 5,
      text: "Top-notch quality vehicles and amazing customer support. Tinashe was very helpful throughout the entire buying process.",
    },
  ]

  return (
    <section ref={sectionRef} className="py-24 bg-gradient-to-b from-card to-background relative overflow-hidden">
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-primary rounded-full blur-3xl animate-pulse-slow" />
      </div>

      <div className="container px-4 relative z-10">
        <div
          className={`text-center mb-16 transition-all duration-1000 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}
        >
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4">What Our Clients Say</h2>
          <p className="text-xl text-muted-foreground">Trusted by hundreds of satisfied customers across Zimbabwe</p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {testimonials.map((testimonial, index) => (
            <div
              key={index}
              className={`bg-card border border-border rounded-xl p-8 space-y-4 hover:border-primary transition-all duration-500 hover:scale-105 hover:shadow-2xl hover:shadow-primary/20 ${
                isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
              }`}
              style={{ transitionDelay: `${index * 150}ms` }}
            >
              <div className="flex gap-1">
                {Array.from({ length: testimonial.rating }).map((_, i) => (
                  <Star
                    key={i}
                    className="h-5 w-5 fill-primary text-primary animate-pulse-slow"
                    style={{ animationDelay: `${i * 0.1}s` }}
                  />
                ))}
              </div>
              <p className="text-foreground leading-relaxed italic">"{testimonial.text}"</p>
              <div className="pt-4 border-t border-border">
                <div className="font-bold text-foreground">{testimonial.name}</div>
                <div className="text-sm text-muted-foreground">{testimonial.location}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
