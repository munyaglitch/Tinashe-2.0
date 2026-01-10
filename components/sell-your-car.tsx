"use client"

import { Button } from "@/components/ui/button"
import { Car } from "lucide-react"
import { useRouter } from "next/navigation"

export function SellYourCar() {
  const router = useRouter()

  return (
    <section className="py-12 px-4">
      <div className="container mx-auto max-w-6xl">
        <div className="bg-gradient-to-br from-red-600 via-red-700 to-red-800 rounded-3xl p-6 md:p-8 lg:p-10 shadow-2xl relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-red-500/20 to-transparent" />
          <div className="absolute -top-24 -right-24 w-96 h-96 bg-red-400/10 rounded-full blur-3xl" />
          <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-red-400/10 rounded-full blur-3xl" />

          <div className="relative z-10 space-y-6">
            <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-white">Sell Your Car</h2>

            <p className="text-base md:text-lg text-white/90 max-w-2xl">
              List your vehicle and connect with serious buyers instantly with Photos #1 car marketplace. No middlemen,
              no hassle — just result.
            </p>

            <ul className="space-y-3 text-white">
              <li className="flex items-start gap-3">
                <div className="mt-1 w-2 h-2 rounded-full bg-white flex-shrink-0" />
                <span className="text-sm md:text-base">Sign up in seconds and access your seller dashboard.</span>
              </li>
              <li className="flex items-start gap-3">
                <div className="mt-1 w-2 h-2 rounded-full bg-white flex-shrink-0" />
                <span className="text-sm md:text-base">Add photos, specs, and pricing – it is simple!</span>
              </li>
              <li className="flex items-start gap-3">
                <div className="mt-1 w-2 h-2 rounded-full bg-white flex-shrink-0" />
                <span className="text-sm md:text-base">Buyers will contact you directly. Sell fast and easily!</span>
              </li>
            </ul>

            <Button
              size="lg"
              onClick={() => router.push("/auth")}
              className="bg-white text-red-600 hover:bg-white/90 text-base md:text-lg px-6 md:px-8 py-4 md:py-6 rounded-xl font-semibold transition-all duration-300 hover:scale-105 hover:shadow-xl flex items-center gap-2"
            >
              <Car className="h-5 w-5" />
              List Your Car
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
}
