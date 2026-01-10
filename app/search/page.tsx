"use client"

import { Suspense } from "react"
import { useSearchParams } from "next/navigation"
import { Header } from "@/components/header"
import { VehicleDetailModal } from "@/components/vehicle-detail-modal"
import { useState } from "react"
import Image from "next/image"
import { BottomNav } from "@/components/bottom-nav"
import Link from "next/link"
import { ArrowLeft } from "lucide-react"
import { Button } from "@/components/ui/button"

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
    name: "Toyota Hilux GD6",
    brand: "toyota",
    variant: "DOUBLECAB 4X4",
    year: 2025,
    fuel: "2.8L Diesel",
    mileage: "Delivery",
    price: 70000,
    image: "/images/whatsapp-image-2026-01-08-at-5-06-23-pm.jpeg",
    images: [
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
      "/images/whatsapp-image-2026-01-08-at-5-06-21-pm.jpeg",
      "/images/whatsapp-image-2026-01-08-at-5-06-20-pm.jpeg",
      "/images/whatsapp-image-2026-01-08-at-5-06-24-pm-1.jpeg",
    ],
    description:
      "Brand New SA Make - Duty Fully Paid! Robust 4X4 pickup truck with powerful diesel engine and delivery mileage.",
    features: [
      "Reverse Camera + 360° Dual Cam",
      "Multi Steering Controls",
      "4X4 Package",
      "Eco Mode + PWR Mode",
      "Auto DayTime Lights",
      "Motion Sensors Right Round",
      "Sparkling Full Fabric Interior",
      "Quality Sound System",
      "Solid Suspension",
    ],
  },
]

function SearchResultsContent() {
  const searchParams = useSearchParams()
  const query = searchParams.get("q") || ""
  const [selectedVehicle, setSelectedVehicle] = useState<(typeof vehicles)[0] | null>(null)

  const filteredVehicles = vehicles.filter((vehicle) => {
    const searchTerm = query.toLowerCase()
    return (
      vehicle.brand.toLowerCase().includes(searchTerm) ||
      vehicle.name.toLowerCase().includes(searchTerm) ||
      vehicle.variant.toLowerCase().includes(searchTerm)
    )
  })

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-primary/5">
      <Header />
      <div className="container px-4 py-8 md:py-12">
        <div className="mb-8">
          <Link href="/">
            <Button variant="ghost" className="gap-2 mb-4">
              <ArrowLeft className="h-4 w-4" />
              Back to Home
            </Button>
          </Link>
          <h1 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent mb-2">
            Search Results
          </h1>
          <p className="text-muted-foreground text-lg">
            {query ? `Showing results for "${query}"` : "Enter a search term"}
          </p>
        </div>

        {filteredVehicles.length === 0 ? (
          <div className="text-center py-16">
            <div className="bg-card border border-border rounded-xl p-12 max-w-2xl mx-auto">
              <p className="text-2xl font-semibold text-foreground mb-4">No results</p>
              <p className="text-muted-foreground">
                We couldn't find any vehicles matching "{query}". Try searching for a different brand or model.
              </p>
            </div>
          </div>
        ) : (
          <div>
            <p className="text-muted-foreground mb-6">{filteredVehicles.length} vehicles found</p>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredVehicles.map((vehicle) => (
                <div
                  key={vehicle.id}
                  onClick={() => setSelectedVehicle(vehicle)}
                  className="bg-card rounded-xl overflow-hidden border border-border shadow-lg hover:shadow-2xl hover:shadow-primary/20 transition-all duration-300 cursor-pointer group hover:scale-[1.02]"
                >
                  <div className="relative h-56 overflow-hidden">
                    <Image
                      src={vehicle.image || "/placeholder.svg"}
                      alt={vehicle.name}
                      fill
                      className="object-contain p-4 group-hover:scale-110 transition-transform duration-500"
                    />
                  </div>
                  <div className="p-6 space-y-4">
                    <div>
                      <h3 className="text-xl font-bold text-foreground group-hover:text-primary transition-colors">
                        {vehicle.name}
                      </h3>
                      <p className="text-sm text-muted-foreground uppercase tracking-wider">{vehicle.variant}</p>
                    </div>
                    <div className="flex items-center justify-between text-sm text-muted-foreground">
                      <span>{vehicle.year}</span>
                      <span>{vehicle.fuel}</span>
                      <span>{vehicle.mileage}</span>
                    </div>
                    <div className="flex items-center justify-between pt-4 border-t border-border">
                      <div className="text-2xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                        ${vehicle.price.toLocaleString()}
                      </div>
                      <Button className="bg-gradient-to-r from-primary to-accent hover:from-primary/90 hover:to-accent/90 text-primary-foreground">
                        View Details
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
      <BottomNav />
      {selectedVehicle && <VehicleDetailModal vehicle={selectedVehicle} onClose={() => setSelectedVehicle(null)} />}
    </div>
  )
}

export default function SearchPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <SearchResultsContent />
    </Suspense>
  )
}
