"use client"

import { useState } from "react"
import { Header } from "@/components/header"
import { Hero } from "@/components/hero"
import { SellYourCar } from "@/components/sell-your-car"
import { SearchByMake } from "@/components/search-by-make"
import { VehicleGrid } from "@/components/vehicle-grid"
import { FooterCTA } from "@/components/footer-cta"
import { Footer } from "@/components/footer"
import { BottomNav } from "@/components/bottom-nav"

export default function Home() {
  const [selectedBrand, setSelectedBrand] = useState<string>("")

  const handleBrandSelect = (brand: string) => {
    setSelectedBrand(brand)
    // Scroll to vehicles section
    document.getElementById("vehicles")?.scrollIntoView({ behavior: "smooth" })
  }

  return (
    <main className="min-h-screen bg-background pb-16 md:pb-0">
      <Header />
      <Hero />
      <SellYourCar />
      <SearchByMake onBrandSelect={handleBrandSelect} />
      <VehicleGrid selectedBrand={selectedBrand} />
      <FooterCTA />
      <Footer />
      <BottomNav />
    </main>
  )
}
