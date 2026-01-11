"use client"

import { Star } from "lucide-react"

const testimonials = [
  {
    name: "Tendai Moyo",
    rating: 5,
    text: "Excellent service! Found my dream car in no time. The team was professional and helpful throughout.",
  },
  {
    name: "Chipo Ncube",
    rating: 4.8,
    text: "Great selection of vehicles. Very trustworthy and reliable platform for buying cars in Zimbabwe.",
  },
  {
    name: "Tapiwa Mutasa",
    rating: 4.5,
    text: "Smooth transaction process. The car was exactly as described. Highly recommend Tinashe Car Sales.",
  },
  {
    name: "Rufaro Banda",
    rating: 4.9,
    text: "Best car marketplace in Zimbabwe. Quality vehicles and transparent pricing. Very satisfied!",
  },
  {
    name: "Munashe Dube",
    rating: 4.7,
    text: "Professional service from start to finish. Got a great deal on my Mercedes. Will buy again!",
  },
  {
    name: "Nyasha Sibanda",
    rating: 4.6,
    text: "Fast and reliable. The verification process gave me confidence in my purchase. Thank you!",
  },
  {
    name: "Blessing Chikwanha",
    rating: 3.8,
    text: "Good experience overall. Wide variety of cars to choose from. Customer service was helpful.",
  },
  {
    name: "Simba Khumalo",
    rating: 4.9,
    text: "Outstanding platform! Found exactly what I was looking for. Very happy with my new Toyota.",
  },
]

export function TestimonialsSlider() {
  // Double the testimonials array for seamless loop
  const doubledTestimonials = [...testimonials, ...testimonials]

  return (
    <section className="py-6 md:py-8 bg-slate-900/50 overflow-hidden">
      <div className="relative">
        {/* Gradient fade edges */}
        <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-slate-900 to-transparent z-10" />
        <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-slate-900 to-transparent z-10" />

        {/* Animated testimonials */}
        <div className="flex gap-6 animate-scroll">
          {doubledTestimonials.map((testimonial, index) => (
            <div key={index} className="flex-shrink-0 w-80 bg-card border border-border rounded-xl p-6 shadow-lg">
              <div className="flex items-center gap-2 mb-3">
                {/* Star rating */}
                <div className="flex items-center gap-1">
                  {[...Array(5)].map((_, i) => {
                    const fillPercentage = Math.min(Math.max(testimonial.rating - i, 0), 1) * 100
                    return (
                      <div key={i} className="relative">
                        <Star className="w-4 h-4 text-gray-300" />
                        <div className="absolute inset-0 overflow-hidden" style={{ width: `${fillPercentage}%` }}>
                          <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                        </div>
                      </div>
                    )
                  })}
                </div>
                <span className="text-sm font-bold text-yellow-400">{testimonial.rating}</span>
              </div>

              <p className="text-sm text-muted-foreground mb-4 leading-relaxed">{testimonial.text}</p>

              <p className="text-sm font-semibold text-foreground">- {testimonial.name}</p>
            </div>
          ))}
        </div>
      </div>

      <style jsx>{`
        @keyframes scroll {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-50%);
          }
        }

        .animate-scroll {
          animation: scroll 40s linear infinite;
        }

        .animate-scroll:hover {
          animation-play-state: paused;
        }
      `}</style>
    </section>
  )
}
