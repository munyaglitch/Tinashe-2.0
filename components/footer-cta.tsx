"use client"

import { Search, Handshake, Car, MapPin } from "lucide-react"
import { useRouter } from "next/navigation"

export function FooterCTA() {
  const router = useRouter()

  const handleBrowseCars = () => {
    const vehiclesSection = document.getElementById("vehicles")
    if (vehiclesSection) {
      vehiclesSection.scrollIntoView({ behavior: "smooth" })
    } else {
      router.push("/#vehicles")
    }
  }

  const handleListCar = () => {
    router.push("/list-car")
  }

  return (
    <section className="relative bg-[#2c3e6f] py-16 md:py-20 overflow-hidden">
      <div className="container px-4 mx-auto">
        <div className="max-w-3xl mx-auto">
          {/* Left Content */}
          <div className="space-y-6 md:space-y-8">
            <div className="space-y-4">
              <p className="text-red-500 font-semibold text-sm md:text-base">Zimbabwe's #1 Trusted Car Marketplace</p>
              <h2 className="text-white text-3xl md:text-4xl lg:text-5xl font-bold leading-tight">
                Buy and sell cars with confidence.
              </h2>
              <p className="text-white/90 text-base md:text-lg leading-relaxed max-w-xl">
                Tinashe Car Sales is the easiest, safest, and most trusted platform for verified vehicle listings across
                Zimbabwe. Whether you're looking to upgrade or make your first purchase, we've made the process simple,
                secure, and stress-free.
              </p>
            </div>

            {/* Features List */}
            <div className="space-y-3">
              <div className="flex items-center gap-3 text-white">
                <Search className="h-5 w-5 text-red-500 flex-shrink-0" />
                <span className="text-base md:text-lg">Verified Listings</span>
              </div>
              <div className="flex items-center gap-3 text-white">
                <Handshake className="h-5 w-5 text-red-500 flex-shrink-0" />
                <span className="text-base md:text-lg">Trusted Sellers & Real Buyers</span>
              </div>
              <div className="flex items-center gap-3 text-white">
                <Car className="h-5 w-5 text-red-500 flex-shrink-0" />
                <span className="text-base md:text-lg">Easy to Use – No Hassle, No Scams</span>
              </div>
              <div className="flex items-center gap-3 text-white">
                <MapPin className="h-5 w-5 text-red-500 flex-shrink-0" />
                <span className="text-base md:text-lg">Nationwide Reach</span>
              </div>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-wrap gap-4 pt-4">
              <button
                onClick={handleBrowseCars}
                className="flex items-center gap-2 bg-red-600 hover:bg-red-700 text-white font-semibold px-6 md:px-8 py-3 md:py-4 rounded-lg transition-all duration-300 shadow-lg hover:shadow-xl"
              >
                <Car className="h-5 w-5" />
                Browse Cars
              </button>
              <button
                onClick={handleListCar}
                className="flex items-center gap-2 bg-white hover:bg-gray-100 text-[#2c3e6f] font-semibold px-6 md:px-8 py-3 md:py-4 rounded-lg transition-all duration-300 shadow-lg hover:shadow-xl"
              >
                <span className="text-xl">📋</span>
                List Your Car
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
