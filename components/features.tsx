"use client"

import { Shield, Star, Zap, HeadphonesIcon } from "lucide-react"
import { useEffect, useRef, useState } from "react"

export function Features() {
  const [isVisible, setIsVisible] = useState(false)
  const sectionRef = useRef<HTMLElement>(null)
  const [scrollY, setScrollY] = useState(0)

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

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const features = [
    {
      icon: Shield,
      title: "Quality Assurance",
      description:
        "Every vehicle is thoroughly inspected and verified before listing. We guarantee quality and transparency.",
    },
    {
      icon: Star,
      title: "Premium Selection",
      description: "Curated collection of luxury and premium vehicles. From Range Rovers to Mercedes-Benz and more.",
    },
    {
      icon: Zap,
      title: "Fast & Easy Process",
      description:
        "Simplified buying and selling process. Get your dream car or sell yours quickly with minimal hassle.",
    },
    {
      icon: HeadphonesIcon,
      title: "Expert Support",
      description: "Dedicated team ready to assist you. Contact us anytime for personalized service and guidance.",
    },
  ]

  return (
    <section ref={sectionRef} id="about" className="py-24 bg-background relative overflow-hidden">
      <div className="absolute inset-0 opacity-5" style={{ transform: `translateY(${scrollY * 0.2}px)` }}>
        <div className="absolute top-20 left-10 w-72 h-72 bg-primary rounded-full blur-3xl animate-pulse-slow animate-float" />
        <div
          className="absolute bottom-20 right-10 w-96 h-96 bg-secondary rounded-full blur-3xl animate-pulse-slow animate-float"
          style={{ animationDelay: "3s" }}
        />
      </div>

      <div className="container px-4 relative z-10">
        <div
          className={`text-center mb-16 transition-all duration-1000 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}
        >
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4 animate-glow">
            Why Choose Tinashe Car Sales
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Zimbabwe's trusted automotive marketplace for premium vehicles
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-7xl mx-auto">
          {features.map((feature, index) => (
            <div
              key={index}
              className={`group relative bg-card/80 backdrop-blur-sm border border-border rounded-xl p-8 hover:border-primary transition-all duration-500 hover:scale-105 hover:-translate-y-2 hover:shadow-2xl hover:shadow-primary/30 ${
                isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
              }`}
              style={{
                transitionDelay: `${index * 150}ms`,
                transform: isVisible ? `translateY(${Math.sin(scrollY * 0.01 + index) * 5}px)` : "translateY(40px)",
              }}
            >
              <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-accent/5 to-secondary/10 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 animate-shimmer" />
              <div className="relative space-y-4 transform-3d">
                <div className="inline-flex p-4 rounded-lg bg-gradient-to-br from-primary/20 to-accent/10 group-hover:from-primary/30 group-hover:to-accent/20 transition-all duration-300 group-hover:scale-125 group-hover:rotate-6 shadow-lg group-hover:shadow-primary/50">
                  <feature.icon className="h-8 w-8 text-primary group-hover:scale-110 transition-transform duration-300" />
                </div>
                <h3 className="text-xl font-bold text-foreground group-hover:text-primary transition-colors duration-300">
                  {feature.title}
                </h3>
                <p className="text-muted-foreground leading-relaxed group-hover:text-foreground/90 transition-colors duration-300">
                  {feature.description}
                </p>
              </div>
              <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-br from-primary/20 to-transparent rounded-bl-full opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
