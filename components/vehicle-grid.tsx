"use client"

import { useState, useEffect } from "react"
import { Phone, Filter, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import Image from "next/image"
import { VehicleDetailModal } from "./vehicle-detail-modal"

const vehicles = [
  {
    id: 1,
    name: "Range Rover Autobiography Sport",
    brand: "land rover",
    variant: "SPORT EDITION",
    year: 2025,
    fuel: "Petrol",
    mileage: "Delivery",
    price: 270000,
    image: "/images/screenshot-2026-01-08-172835.png",
    images: [
      "/images/whatsapp-image-2026-01-08-at-5-11-42-pm-1.jpeg",
      "/images/whatsapp-image-2026-01-08-at-5-11-41-pm-2.jpeg",
      "/images/whatsapp-image-2026-01-08-at-5-11-38-pm-4.jpeg",
      "/images/whatsapp-image-2026-01-08-at-5-11-40-pm-3.jpeg",
      "/images/whatsapp-image-2026-01-08-at-5-11-39-pm-2.jpeg",
      "/images/whatsapp-image-2026-01-08-at-5-11-42-pm-2.jpeg",
      "/images/whatsapp-image-2026-01-08-at-5-11-41-pm.jpeg",
      "/images/whatsapp-image-2026-01-08-at-5-11-41-pm-1.jpeg",
      "/images/screenshot-2026-01-08-172905.png",
      "/images/screenshot-2026-01-08-172835.png",
      "/images/screenshot-2026-01-08-172844.png",
      "/images/screenshot-2026-01-08-172916.png",
      "/images/screenshot-2026-01-08-172952.png",
      "/images/screenshot-2026-01-08-172804.png",
      "/images/screenshot-2026-01-08-172854.png",
      "/images/screenshot-2026-01-08-172942.png",
      "/images/screenshot-2026-01-08-172816.png",
      "/images/screenshot-2026-01-08-172826.png",
    ],
    description:
      "Recently Imported Vehicle - Duty Fully Paid! Premium luxury SUV in pristine condition with delivery mileage.",
    features: [
      "Reverse Camera + 360° Motion Sensor Cam",
      "LED Headlights with signature DRL",
      "Multi Steering Controls",
      "Wide Panoramic Roof",
      "Full Leather 8-way electric front seats",
      "Power recline rear seats",
      "Quality Sound System",
      "Solid Suspension",
      "Luxurious Drive Experience",
    ],
  },
  {
    id: 2,
    name: "Ford Ranger Raptor",
    brand: "ford",
    variant: "RAPTOR EDITION",
    year: 2023,
    fuel: "2.0L Bi-Turbo Diesel",
    mileage: "19,286 km",
    price: 95000,
    image: "/images/whatsapp-image-2026-01-08-at-5-12-12-pm-1.jpeg",
    images: [
      "/images/whatsapp-image-2026-01-08-at-5-12-12-pm-1.jpeg",
      "/images/whatsapp-image-2026-01-08-at-5-12-14-pm-2.jpeg",
      "/images/whatsapp-image-2026-01-08-at-5-12-14-pm-1.jpeg",
      "/images/whatsapp-image-2026-01-08-at-5-12-14-pm.jpeg",
      "/images/whatsapp-image-2026-01-08-at-5-12-12-pm.jpeg",
      "/images/whatsapp-image-2026-01-08-at-6-12-59-pm.jpeg",
      "/images/whatsapp-image-2026-01-08-at-6-13-00-pm.jpeg",
      "/images/whatsapp-image-2026-01-08-at-5-12-13-pm.jpeg",
      "/images/whatsapp-image-2026-01-08-at-5-12-13-pm-1.jpeg",
      "/images/whatsapp-image-2026-01-08-at-5-12-13-pm-2.jpeg",
      "/images/whatsapp-image-2026-01-08-at-5-12-08-pm.jpeg",
      "/images/whatsapp-image-2026-01-08-at-5-12-10-pm-2.jpeg",
      "/images/whatsapp-image-2026-01-08-at-5-12-10-pm-1.jpeg",
      "/images/whatsapp-image-2026-01-08-at-5-12-10-pm-3.jpeg",
      "/images/whatsapp-image-2026-01-08-at-5-12-08-pm-1.jpeg",
      "/images/whatsapp-image-2026-01-08-at-5-12-11-pm-2.jpeg",
      "/images/whatsapp-image-2026-01-08-at-5-12-11-pm-1.jpeg",
      "/images/ford-raptor.jpeg",
      "/images/whatsapp-image-2026-01-08-at-5-12-11-pm.jpeg",
    ],
    description:
      "Excellent Condition - Duty Fully Paid! Off-road performance truck with aggressive styling and powerful diesel engine.",
    features: [
      "Reverse Camera + OverHead Dual Cam",
      "Multi Steering Controls",
      "4X4 Package",
      "Wide Monitoring Display Screen",
      "Bluetooth Interface + Wireless Charging",
      "Motion Sensors Right Round",
      "Sparkling Full Leather Interior",
      "Quality Sound System",
      "Solid Suspension",
    ],
  },
  {
    id: 3,
    name: "Toyota LandCruiser 300",
    brand: "toyota",
    variant: "ZX EDITION",
    year: 2024,
    fuel: "3.3L Turbo Diesel",
    mileage: "Delivery",
    price: 168000,
    image: "/images/whatsapp-image-2026-01-08-at-6-13-15-pm-1.jpeg",
    images: [
      "/images/whatsapp-image-2026-01-08-at-6-13-15-pm-1.jpeg",
      "/images/whatsapp-image-2026-01-08-at-6-13-13-pm.jpeg",
      "/images/whatsapp-image-2026-01-08-at-6-13-12-pm.jpeg",
      "/images/whatsapp-image-2026-01-08-at-6-13-12-pm-1.jpeg",
      "/images/whatsapp-image-2026-01-08-at-6-13-14-pm.jpeg",
      "/images/whatsapp-image-2026-01-08-at-6-13-13-pm-1.jpeg",
      "/images/whatsapp-image-2026-01-08-at-6-13-16-pm.jpeg",
      "/images/whatsapp-image-2026-01-08-at-6-13-15-pm-2.jpeg",
      "/images/whatsapp-image-2026-01-08-at-6-13-15-pm.jpeg",
      "/images/whatsapp-image-2026-01-08-at-6-13-14-pm-1.jpeg",
      "/images/whatsapp-image-2026-01-08-at-6-13-10-pm.jpeg",
      "/images/whatsapp-image-2026-01-08-at-6-13-10-pm-1.jpeg",
      "/images/whatsapp-image-2026-01-08-at-6-13-03-pm.jpeg",
      "/images/whatsapp-image-2026-01-08-at-6-13-06-pm.jpeg",
      "/images/toyota-1-0.jpeg",
      "/images/whatsapp-image-2026-01-08-at-6-13-11-pm.jpeg",
      "/images/whatsapp-image-2026-01-08-at-6-13-02-pm.jpeg",
      "/images/whatsapp-image-2026-01-08-at-6-13-09-pm.jpeg",
    ],
    description: "Brand New - Duty Fully Paid! Premium executive SUV with spacious 3rd row seating and luxury package.",
    features: [
      "Reverse Camera + 360° Motion Sensor Cam",
      "Wide Sunroof Installed",
      "Auto DayTime Lights",
      "Multi Steering Controls",
      "Spacious Executive Vehicle",
      "Premium Package",
      "Wide Multi Functional Display Unit",
      "Rear Entertainment Quality System",
      "3rd Row Seats",
      "Sparkling Full Leather Interior",
      "Quality Sound System",
      "Solid Suspension",
    ],
  },
  {
    id: 4,
    name: "Mercedes Benz C200",
    brand: "mercedes",
    variant: "W205 EDITION",
    year: 2015,
    fuel: "2.0L Petrol",
    mileage: "51,876 km",
    price: 23000,
    image: "/images/whatsapp-image-2026-01-08-at-6-14-01-pm-1.jpeg",
    images: [
      "/images/whatsapp-image-2026-01-08-at-6-14-02-pm.jpeg",
      "/images/whatsapp-image-2026-01-08-at-6-14-04-pm-1.jpeg",
      "/images/whatsapp-image-2026-01-08-at-6-14-04-pm.jpeg",
      "/images/whatsapp-image-2026-01-08-at-6-14-05-pm.jpeg",
      "/images/whatsapp-image-2026-01-08-at-6-14-03-pm-1.jpeg",
      "/images/whatsapp-image-2026-01-08-at-6-14-01-pm-1.jpeg",
      "/images/whatsapp-image-2026-01-08-at-6-14-02-pm-1.jpeg",
      "/images/whatsapp-image-2026-01-08-at-6-14-01-pm-2.jpeg",
      "/images/whatsapp-image-2026-01-08-at-6-14-00-pm-1.jpeg",
      "/images/whatsapp-image-2026-01-08-at-6-13-59-pm-1.jpeg",
      "/images/whatsapp-image-2026-01-08-at-6-14-00-pm-2.jpeg",
      "/images/mercedes.jpeg",
      "/images/whatsapp-image-2026-01-08-at-6-14-01-pm.jpeg",
      "/images/whatsapp-image-2026-01-08-at-6-13-59-pm.jpeg",
      "/images/whatsapp-image-2026-01-08-at-6-14-00-pm.jpeg",
    ],
    description:
      "Excellent Condition - Duty Fully Paid! Compact luxury sedan with premium red leather interior and sport package.",
    features: [
      "Reverse Camera + 360° Motion Sensor Cam",
      "Premium Edition Package",
      "Sport Package + Eco Mode",
      "Running DayTime LED Lights",
      "Intelligent Technological Features",
      "Multi Steering Controls",
      "USB Ports + Bluetooth Interface",
      "Rear Entertainment",
      "Door Mercedes Refactor Light",
      "Sparkling Full Red Leather Interior",
      "Quality Sound System",
      "Solid Suspension",
    ],
  },
  {
    id: 5,
    name: "Mercedes Benz A45 AMG",
    brand: "mercedes",
    variant: "4MATIC AMG",
    year: 2018,
    fuel: "2.0L Turbo Petrol",
    mileage: "28,660 km",
    price: 24000,
    image: "/images/whatsapp-image-2026-01-08-at-6-15-40-pm-1.jpeg",
    images: [
      "/images/whatsapp-image-2026-01-08-at-6-15-37-pm-1.jpeg",
      "/images/whatsapp-image-2026-01-08-at-6-15-40-pm-1.jpeg",
      "/images/whatsapp-image-2026-01-08-at-6-15-40-pm.jpeg",
      "/images/whatsapp-image-2026-01-08-at-6-15-38-pm-1.jpeg",
      "/images/whatsapp-image-2026-01-08-at-6-15-37-pm-2.jpeg",
      "/images/whatsapp-image-2026-01-08-at-6-15-39-pm-1.jpeg",
      "/images/whatsapp-image-2026-01-08-at-6-15-38-pm-2.jpeg",
      "/images/whatsapp-image-2026-01-08-at-6-15-39-pm.jpeg",
      "/images/whatsapp-image-2026-01-08-at-6-15-39-pm-2.jpeg",
      "/images/whatsapp-image-2026-01-08-at-6-15-38-pm.jpeg",
      "/images/whatsapp-image-2026-01-08-at-6-15-33-pm.jpeg",
      "/images/whatsapp-image-2026-01-08-at-6-15-35-pm-1.jpeg",
      "/images/whatsapp-image-2026-01-08-at-6-15-37-pm.jpeg",
      "/images/whatsapp-image-2026-01-08-at-6-15-35-pm.jpeg",
      "/images/whatsapp-image-2026-01-08-at-6-15-36-pm.jpeg",
      "/images/whatsapp-image-2026-01-08-at-6-15-36-pm-2.jpeg",
      "/images/whatsapp-image-2026-01-08-at-6-15-36-pm-1.jpeg",
      "/images/whatsapp-image-2026-01-08-at-6-15-34-pm.jpeg",
      "/images/whatsapp-image-2026-01-08-at-6-15-33-pm-1.jpeg",
      "/images/whatsapp-image-2026-01-08-at-6-15-35-pm-2.jpeg",
    ],
    description: "High Performance - Duty Fully Paid! Luxury compact car with advanced features and powerful engine.",
    features: [
      "Reverse Camera + OverHead Dual Cam",
      "Multi Steering Controls",
      "4X4 Package",
      "Wide Monitoring Display Screen",
      "Bluetooth Interface + Wireless Charging",
      "Motion Sensors Right Round",
      "Sparkling Full Leather Interior",
      "Quality Sound System",
      "Solid Suspension",
    ],
  },
  {
    id: 6,
    name: "Toyota Auris Hybrid",
    brand: "toyota",
    variant: "NEWSHAPE HYBRID",
    year: 2016,
    fuel: "1.5L Petrol + Hybrid",
    mileage: "52,855 km",
    price: 14500,
    image: "/images/whatsapp-image-2026-01-08-at-7-04-48-pm.jpeg",
    images: [
      "/images/whatsapp-image-2026-01-08-at-7-04-49-pm.jpeg",
      "/images/whatsapp-image-2026-01-08-at-7-04-48-pm-3.jpeg",
      "/images/whatsapp-image-2026-01-08-at-7-04-51-pm-1.jpeg",
      "/images/whatsapp-image-2026-01-08-at-7-04-48-pm-2.jpeg",
      "/images/whatsapp-image-2026-01-08-at-7-04-50-pm-3.jpeg",
      "/images/whatsapp-image-2026-01-08-at-7-04-50-pm-2.jpeg",
      "/images/whatsapp-image-2026-01-08-at-7-04-49-pm-1.jpeg",
      "/images/whatsapp-image-2026-01-08-at-7-04-50-pm-1.jpeg",
      "/images/whatsapp-image-2026-01-08-at-7-04-49-pm-2.jpeg",
      "/images/whatsapp-image-2026-01-08-at-7-04-50-pm.jpeg",
      "/images/whatsapp-image-2026-01-08-at-7-04-47-pm-1.jpeg",
      "/images/whatsapp-image-2026-01-08-at-7-04-48-pm.jpeg",
      "/images/whatsapp-image-2026-01-08-at-7-04-47-pm.jpeg",
      "/images/whatsapp-image-2026-01-08-at-7-04-48-pm-1.jpeg",
    ],
    description:
      "Efficient and Economical - Duty Fully Paid! Hybrid car with excellent fuel efficiency and modern features.",
    features: [
      "Reverse Camera + 360° Motion Sensor Cam",
      "Multi Steering Controls",
      "Auto DayTime Lights",
      "Eco Mode + Sport Mode",
      "Sparkling Half Leather Interior",
      "Quality Sound System",
      "Solid Suspension",
      "Luxurious Drive",
    ],
  },
  {
    id: 7,
    name: "Toyota Hilux GD6 DoubleCab Edition",
    brand: "toyota",
    variant: "GD6 DOUBLECAB",
    year: 2025,
    fuel: "2.8L Diesel",
    mileage: "Delivery",
    price: 70000,
    image: "/images/whatsapp-image-2026-01-08-at-5-06-21-pm.jpeg",
    images: [
      "/images/whatsapp-image-2026-01-08-at-5-06-21-pm.jpeg",
      "/images/whatsapp-image-2026-01-08-at-5-06-26-pm.jpeg",
      "/images/whatsapp-image-2026-01-08-at-5-06-23-pm.jpeg",
      "/images/whatsapp-image-2026-01-08-at-5-06-20-pm-4.jpeg",
      "/images/whatsapp-image-2026-01-08-at-5-06-24-pm-2.jpeg",
      "/images/whatsapp-image-2026-01-08-at-5-06-22-pm-1.jpeg",
      "/images/whatsapp-image-2026-01-08-at-5-06-25-pm-1.jpeg",
      "/images/whatsapp-image-2026-01-08-at-5-06-22-pm-2.jpeg",
      "/images/whatsapp-image-2026-01-08-at-5-06-22-pm.jpeg",
      "/images/whatsapp-image-2026-01-08-at-5-06-24-pm.jpeg",
      "/images/whatsapp-image-2026-01-08-at-5-06-25-pm.jpeg",
      "/images/whatsapp-image-2026-01-08-at-5-06-23-pm-1.jpeg",
      "/images/whatsapp-image-2026-01-08-at-5-06-20-pm.jpeg",
      "/images/whatsapp-image-2026-01-08-at-5-06-24-pm-1.jpeg",
    ],
    description:
      "Brand New - SA Make - Duty Fully Paid! Premium pickup truck with advanced 4X4 package and luxury interior.",
    features: [
      "Reverse Camera + 360° Dual Cam",
      "Multi Steering Controls",
      "Eco Mode + PWR Mode",
      "Auto DayTime Lights",
      "Motion Sensors Right Round",
      "Sparkling Full Fabric Interior",
      "Quality Sound System",
      "Solid Suspension",
      "Luxurious Drive",
      "4X4 Package",
      "Automatic Transmission",
    ],
  },
]

interface VehicleGridProps {
  selectedBrand?: string
}

export function VehicleGrid({ selectedBrand }: VehicleGridProps) {
  const [selectedBudgets, setSelectedBudgets] = useState<string[]>([])
  const [sortBy, setSortBy] = useState("popularity")
  const [minPrice, setMinPrice] = useState<number>(0)
  const [maxPrice, setMaxPrice] = useState<number>(Number.POSITIVE_INFINITY)
  const [selectedVehicle, setSelectedVehicle] = useState<(typeof vehicles)[0] | null>(null)
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false)
  const [userListings, setUserListings] = useState<any[]>([])

  useEffect(() => {
    localStorage.removeItem("approvedListings")
    const approved = JSON.parse(localStorage.getItem("approvedListings") || "[]")
    setUserListings(approved)
  }, [])

  const allVehicles = [
    ...vehicles,
    ...userListings.map((listing: any, index: number) => ({
      id: 1000 + index,
      name: listing.details.split("\n")[0] || "User Listed Vehicle",
      brand: "other",
      variant: "USER LISTING",
      year: new Date().getFullYear(),
      fuel: "-",
      mileage: "-",
      price: Number.parseInt(listing.price.replace(/[^0-9]/g, "")) || 0,
      image: listing.images[0] || "/placeholder.svg",
      images: listing.images,
      description: listing.details,
      features: [],
    })),
  ]

  const filteredVehicles = allVehicles.filter((vehicle) => {
    if (selectedBrand && vehicle.brand.toLowerCase() !== selectedBrand.toLowerCase()) {
      return false
    }

    if (selectedBudgets.length > 0) {
      const matchesBudget = selectedBudgets.some((budget) => {
        if (budget === "0-50000") return vehicle.price <= 50000
        if (budget === "50000-100000") return vehicle.price > 50000 && vehicle.price <= 100000
        if (budget === "100000-200000") return vehicle.price > 100000 && vehicle.price <= 200000
        if (budget === "200000+") return vehicle.price > 200000
        return true
      })
      if (!matchesBudget) return false
    }

    if (vehicle.price < minPrice || vehicle.price > maxPrice) return false

    return true
  })

  const sortedVehicles = [...filteredVehicles].sort((a, b) => {
    if (sortBy === "price-low") return a.price - b.price
    if (sortBy === "price-high") return b.price - a.price
    if (sortBy === "year") return b.year - a.year
    return 0
  })

  const toggleBudget = (budget: string) => {
    setSelectedBudgets((prev) => (prev.includes(budget) ? prev.filter((b) => b !== budget) : [...prev, budget]))
  }

  return (
    <>
      <section id="vehicles" className="py-8 md:py-16 bg-gradient-to-br from-background via-background to-primary/5">
        <div className="container px-4">
          <div className="mb-6 md:mb-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div>
              <h2 className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                {selectedBrand
                  ? `${selectedBrand.charAt(0).toUpperCase() + selectedBrand.slice(1)} Selection`
                  : "Pre-owned Selection"}
              </h2>
              <p className="text-muted-foreground mt-2 text-sm md:text-base">
                {filteredVehicles.length === 0
                  ? "No cars available"
                  : `${filteredVehicles.length} Certified Cars available Now`}
              </p>
            </div>
            <div className="flex items-center gap-3 w-full sm:w-auto">
              <span className="text-xs md:text-sm text-muted-foreground">Sort by :</span>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="flex-1 sm:flex-none px-3 md:px-4 py-2 border border-border rounded-lg bg-card text-foreground font-medium focus:outline-none focus:ring-2 focus:ring-primary transition-all text-sm md:text-base"
              >
                <option value="popularity">Popularity</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
                <option value="year">Year</option>
              </select>
            </div>
          </div>

          <button
            onClick={() => setMobileFiltersOpen(true)}
            className="lg:hidden w-full mb-6 flex items-center justify-center gap-2 px-4 py-3 bg-gradient-to-r from-primary to-accent text-primary-foreground rounded-xl font-semibold transition-all hover:scale-105 hover:shadow-lg"
          >
            <Filter className="h-5 w-5" />
            <span>Filters & Budget</span>
          </button>

          <div className="flex gap-8">
            <aside className="hidden lg:block w-80 shrink-0">
              <div className="sticky top-24 space-y-6">
                <div className="bg-card rounded-xl p-6 border border-border shadow-lg hover:shadow-xl hover:shadow-primary/10 transition-shadow duration-300">
                  <div className="flex items-center justify-between mb-6">
                    <h3 className="text-xl font-bold text-foreground">Filter</h3>
                    <button
                      onClick={() => setSelectedBudgets([])}
                      className="text-sm text-primary hover:text-primary/80 font-medium transition-colors"
                    >
                      Clear Filters
                    </button>
                  </div>

                  <div className="space-y-4">
                    <h4 className="font-semibold text-foreground text-lg">Budget</h4>
                    <div className="space-y-3">
                      {[
                        { value: "0-50000", label: "$0 - $50k" },
                        { value: "50000-100000", label: "$50k - $100k" },
                        { value: "100000-200000", label: "$100k - $200k" },
                        { value: "200000+", label: "$200k+" },
                      ].map((budget) => (
                        <label key={budget.value} className="flex items-center gap-3 cursor-pointer group">
                          <div className="relative">
                            <input
                              type="checkbox"
                              checked={selectedBudgets.includes(budget.value)}
                              onChange={() => toggleBudget(budget.value)}
                              className="peer h-6 w-6 cursor-pointer appearance-none rounded border-2 border-border checked:border-primary checked:bg-primary transition-all"
                            />
                            <svg
                              className="absolute top-1 left-1 h-4 w-4 text-white opacity-0 peer-checked:opacity-100 transition-opacity pointer-events-none"
                              viewBox="0 0 16 16"
                              fill="none"
                              stroke="currentColor"
                              strokeWidth="2"
                            >
                              <path d="M3 8l3 3 7-7" />
                            </svg>
                          </div>
                          <span className="text-foreground group-hover:text-primary transition-colors font-medium text-lg">
                            {budget.label}
                          </span>
                        </label>
                      ))}
                    </div>
                  </div>

                  <div className="mt-6 pt-6 border-t border-border space-y-4">
                    <h4 className="font-semibold text-foreground text-lg">Price Range</h4>
                    <div className="flex gap-2">
                      <select
                        value={minPrice}
                        onChange={(e) => setMinPrice(Number(e.target.value))}
                        className="flex-1 px-2 py-2 text-sm border border-border rounded-lg bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary transition-all"
                      >
                        <option value={0}>Min</option>
                        <option value={10000}>$10k</option>
                        <option value={20000}>$20k</option>
                        <option value={50000}>$50k</option>
                        <option value={100000}>$100k</option>
                      </select>
                      <select
                        value={maxPrice === Number.POSITIVE_INFINITY ? "max" : maxPrice}
                        onChange={(e) =>
                          setMaxPrice(e.target.value === "max" ? Number.POSITIVE_INFINITY : Number(e.target.value))
                        }
                        className="flex-1 px-2 py-2 text-sm border border-border rounded-lg bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary transition-all"
                      >
                        <option value="max">Max</option>
                        <option value={50000}>$50k</option>
                        <option value={100000}>$100k</option>
                        <option value={200000}>$200k</option>
                        <option value={300000}>$300k</option>
                      </select>
                    </div>
                  </div>

                  <div className="mt-6 pt-6 border-t border-border">
                    <a
                      href="tel:+263783935399"
                      className="flex items-center justify-center gap-2 w-full px-4 py-3 bg-gradient-to-r from-primary to-accent text-white font-bold rounded-lg hover:shadow-2xl hover:shadow-primary/50 transition-all duration-300 hover:scale-105"
                    >
                      <Phone className="h-5 w-5" />
                      <span>Call Us Now</span>
                    </a>
                  </div>
                </div>
              </div>
            </aside>

            {mobileFiltersOpen && (
              <div className="lg:hidden fixed inset-0 z-50 bg-background/95 backdrop-blur-lg animate-in fade-in duration-300">
                <div className="h-full overflow-y-auto p-4">
                  <div className="flex items-center justify-between mb-6">
                    <h3 className="text-2xl font-bold text-foreground">Filters</h3>
                    <button
                      onClick={() => setMobileFiltersOpen(false)}
                      className="p-2 rounded-full hover:bg-primary/10 transition-colors"
                    >
                      <X className="h-6 w-6" />
                    </button>
                  </div>

                  <div className="bg-card rounded-xl p-6 border border-border shadow-lg space-y-6">
                    <div className="flex items-center justify-between">
                      <h4 className="font-semibold text-foreground text-lg">Budget</h4>
                      <button
                        onClick={() => setSelectedBudgets([])}
                        className="text-sm text-primary hover:text-primary/80 font-medium transition-colors"
                      >
                        Clear All
                      </button>
                    </div>

                    <div className="space-y-3">
                      {[
                        { value: "0-50000", label: "$0 - $50k" },
                        { value: "50000-100000", label: "$50k - $100k" },
                        { value: "100000-200000", label: "$100k - $200k" },
                        { value: "200000+", label: "$200k+" },
                      ].map((budget) => (
                        <label key={budget.value} className="flex items-center gap-3 cursor-pointer group">
                          <div className="relative">
                            <input
                              type="checkbox"
                              checked={selectedBudgets.includes(budget.value)}
                              onChange={() => toggleBudget(budget.value)}
                              className="peer h-6 w-6 cursor-pointer appearance-none rounded border-2 border-border checked:border-primary checked:bg-primary transition-all"
                            />
                            <svg
                              className="absolute top-1 left-1 h-4 w-4 text-white opacity-0 peer-checked:opacity-100 transition-opacity pointer-events-none"
                              viewBox="0 0 16 16"
                              fill="none"
                              stroke="currentColor"
                              strokeWidth="2"
                            >
                              <path d="M3 8l3 3 7-7" />
                            </svg>
                          </div>
                          <span className="text-foreground group-hover:text-primary transition-colors font-medium text-lg">
                            {budget.label}
                          </span>
                        </label>
                      ))}
                    </div>

                    <div className="pt-6 border-t border-border space-y-4">
                      <h4 className="font-semibold text-foreground text-lg">Price Range</h4>
                      <div className="flex gap-2">
                        <select
                          value={minPrice}
                          onChange={(e) => setMinPrice(Number(e.target.value))}
                          className="flex-1 px-2 py-2 text-sm border border-border rounded-lg bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary transition-all"
                        >
                          <option value={0}>Min</option>
                          <option value={10000}>$10k</option>
                          <option value={20000}>$20k</option>
                          <option value={50000}>$50k</option>
                          <option value={100000}>$100k</option>
                        </select>
                        <select
                          value={maxPrice === Number.POSITIVE_INFINITY ? "max" : maxPrice}
                          onChange={(e) =>
                            setMaxPrice(e.target.value === "max" ? Number.POSITIVE_INFINITY : Number(e.target.value))
                          }
                          className="flex-1 px-2 py-2 text-sm border border-border rounded-lg bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary transition-all"
                        >
                          <option value="max">Max</option>
                          <option value={50000}>$50k</option>
                          <option value={100000}>$100k</option>
                          <option value={200000}>$200k</option>
                          <option value={300000}>$300k</option>
                        </select>
                      </div>
                    </div>

                    <Button
                      onClick={() => setMobileFiltersOpen(false)}
                      className="w-full mt-6 bg-gradient-to-r from-primary to-accent hover:from-primary/90 hover:to-accent/90 text-primary-foreground font-bold py-3"
                    >
                      Apply Filters
                    </Button>
                  </div>
                </div>
              </div>
            )}

            <div className="flex-1 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {sortedVehicles.length === 0 ? (
                <div className="col-span-full text-center py-16">
                  <p className="text-xl text-muted-foreground">No cars available</p>
                </div>
              ) : (
                sortedVehicles.map((vehicle) => (
                  <div
                    key={vehicle.id}
                    onClick={() => setSelectedVehicle(vehicle)}
                    className="group bg-card rounded-2xl border border-border overflow-hidden hover:border-primary transition-all duration-300 hover:shadow-2xl hover:shadow-primary/20 hover:-translate-y-2 cursor-pointer"
                  >
                    <div className="relative h-72 sm:h-80 md:h-96 overflow-hidden bg-muted p-3">
                      <Image
                        src={vehicle.image || "/placeholder.svg"}
                        alt={vehicle.name}
                        fill
                        className="object-contain group-hover:scale-105 transition-transform duration-500"
                      />
                      <div className="absolute top-3 right-3 px-3 py-1 bg-primary/90 backdrop-blur-sm text-white text-xs md:text-sm font-bold rounded-full">
                        {vehicle.year}
                      </div>
                    </div>
                    <div className="p-4 md:p-6 space-y-3 md:space-y-4">
                      <div>
                        <h3 className="text-lg md:text-xl font-bold text-foreground group-hover:text-primary transition-colors line-clamp-1">
                          {vehicle.name}
                        </h3>
                        <p className="text-xs md:text-sm text-muted-foreground font-medium mt-1">{vehicle.variant}</p>
                      </div>

                      <div className="grid grid-cols-2 gap-2 md:gap-3 text-xs md:text-sm">
                        <div>
                          <span className="font-semibold">Year:</span> {vehicle.year}
                        </div>
                        <div>
                          <span className="font-semibold">Fuel:</span> {vehicle.fuel}
                        </div>
                        <div>
                          <span className="font-semibold">Mileage:</span> {vehicle.mileage}
                        </div>
                      </div>

                      <div className="pt-3 md:pt-4 border-t border-border flex items-center justify-between">
                        <div>
                          <div className="text-xs md:text-sm text-muted-foreground uppercase tracking-wider">Price</div>
                          <div className="text-xl md:text-2xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                            ${vehicle.price.toLocaleString()}
                          </div>
                        </div>
                        <Button
                          size="sm"
                          asChild
                          onClick={(e) => {
                            e.stopPropagation()
                          }}
                          className="bg-gradient-to-r from-primary to-accent hover:from-primary/90 hover:to-accent/90 text-primary-foreground transition-all hover:scale-105 text-xs md:text-sm px-3 md:px-4"
                        >
                          <a href="tel:+263783935399" className="flex items-center gap-1 md:gap-2">
                            <Phone className="h-3 w-3 md:h-4 md:w-4" />
                            <span className="hidden sm:inline">Call</span>
                          </a>
                        </Button>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      </section>

      {selectedVehicle && <VehicleDetailModal vehicle={selectedVehicle} onClose={() => setSelectedVehicle(null)} />}
    </>
  )
}
