"use client"

import { Star } from "lucide-react"

const testimonials = [
  {
    name: "Tafadzwa M.",
    location: "Harare",
    rating: 4.8,
    text: "Excellent service—found my dream Range Rover through Tinashe Car Sales. The whole process felt premium and honest.",
  },
  {
    name: "Nyasha K.",
    location: "Bulawayo",
    rating: 4.3,
    text: "They helped me sell my BMW quickly and handled all the logistics without asking for extra fees.",
  },
  {
    name: "Rumbi S.",
    location: "Harare",
    rating: 4.9,
    text: "The cars look exactly like the listing photos, and the delivery team checked every detail before handover.",
  },
  {
    name: "Kuda B.",
    location: "Mutare",
    rating: 3.8,
    text: "Great vehicles, though I wished the follow-up text came a bit sooner. Still impressed with the transparency.",
  },
  {
    name: "Chiedza T.",
    location: "Gweru",
    rating: 4.7,
    text: "Concierge-level attention from start to finish. I’ll be recommending them to my dealership circle.",
  },
  {
    name: "Elias M.",
    location: "Kadoma",
    rating: 4.2,
    text: "They handled the customs paperwork for me and were patient whenever I had questions.",
  },
  {
    name: "Makeda P.",
    location: "Harare",
    rating: 4.8,
    text: "Sold my SUV within a week thanks to their featured placement. I got full visibility without chasing anyone.",
  },
  {
    name: "Tanaka C.",
    location: "Masvingo",
    rating: 4.1,
    text: "Consistent updates and quick clarifications when I needed a second opinion—a rare level of service.",
  },
  {
    name: "Nadia F.",
    location: "Mutare",
    rating: 4.6,
    text: "Their premium listings stand out, and the condition reports are detailed enough to trust the purchase.",
  },
  {
    name: "Julia N.",
    location: "Chitungwiza",
    rating: 4.4,
    text: "My second vehicle with them. The whole checkout felt smoother than the first time.",
  },
]

function StarRating({ rating }: { rating: number }) {
  return (
    <div className="flex items-center gap-2 mb-2">
      <div className="flex gap-1">
        {Array.from({ length: 5 }, (_, index) => {
          const fillWidth = Math.min(Math.max(rating - index, 0), 1) * 100
          return (
            <div key={index} className="relative h-5 w-5 overflow-hidden">
              <Star className="absolute inset-0 text-muted-foreground" />
              <div
                className="absolute inset-y-0 left-0 overflow-hidden"
                style={{ width: `${fillWidth}%` }}
              >
                <Star className="absolute inset-0 text-[#ff6b6b]" />
              </div>
            </div>
          )
        })}
      </div>
      <span className="text-xs font-semibold text-foreground">{rating.toFixed(1)} / 5</span>
    </div>
  )
}

export function Testimonials() {
  const glideTestimonials = [...testimonials, ...testimonials]

  return (
    <section className="py-20 relative overflow-hidden">
      <div className="container px-4">
        <div className="flex flex-col items-center gap-2 text-center mb-8">
          <p className="text-xs tracking-[0.4em] uppercase text-muted-foreground">Testimonials</p>
          <h2 className="text-4xl md:text-5xl font-bold text-foreground">What they’re saying</h2>
          <p className="text-muted-foreground max-w-3xl">
            Genuine feedback from people who bought and sold vehicles through our platform.
          </p>
        </div>

        <div className="relative overflow-hidden rounded-[20px] border border-border bg-card shadow-[0_12px_18px_rgba(0,0,0,0.35)]">
          <div className="pointer-events-none absolute inset-y-0 left-0 w-20 bg-gradient-to-r from-card to-transparent" />
          <div className="pointer-events-none absolute inset-y-0 right-0 w-20 bg-gradient-to-l from-card to-transparent" />

          <div className="flex gap-6 px-6 py-8 testimonial-track">
            {glideTestimonials.map((testimonial, index) => (
              <article
                key={`${testimonial.name}-${index}`}
                className="whitespace-normal min-w-[260px] flex-shrink-0 rounded-[18px] border border-border bg-gradient-to-b from-card to-[#11151c] p-5 shadow-[0_12px_18px_rgba(0,0,0,0.35)]"
              >
                <StarRating rating={testimonial.rating} />
                <p className="text-sm md:text-base italic leading-relaxed text-foreground mb-4">
                  “{testimonial.text}”
                </p>
                <div className="text-xs uppercase tracking-[0.4em] text-muted-foreground mb-1">From</div>
                <div className="font-semibold text-foreground">{testimonial.name}</div>
                <div className="text-sm text-muted-foreground">{testimonial.location}</div>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
