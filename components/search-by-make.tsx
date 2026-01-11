"use client"

import Image from "next/image"

const carBrands = [
  {
    name: "Mercedes",
    logo: "https://upload.wikimedia.org/wikipedia/commons/9/90/Mercedes-Logo.svg",
    value: "mercedes",
  },
  {
    name: "Toyota",
    logo: "https://companieslogo.com/img/orig/TM_BIG-6cabc6ac.svg?t=1720244494",
    value: "toyota",
  },
  {
    name: "Suzuki",
    logo: "https://upload.wikimedia.org/wikipedia/commons/b/be/Suzuki_logo.svg",
    value: "suzuki",
  },
  {
    name: "Mazda",
    logo: "/images/images-removebg-preview-20-281-29.png",
    value: "mazda",
  },
  {
    name: "Volkswagen",
    logo: "https://upload.wikimedia.org/wikipedia/commons/6/6d/Volkswagen_logo_2019.svg",
    value: "volkswagen",
  },
  { name: "BMW", logo: "https://upload.wikimedia.org/wikipedia/commons/4/44/BMW.svg", value: "bmw" },
  {
    name: "Hyundai",
    logo: "https://upload.wikimedia.org/wikipedia/commons/4/44/Hyundai_Motor_Company_logo.svg",
    value: "hyundai",
  },
  {
    name: "Lexus",
    logo: "/images/images-1-removebg-preview.png",
    value: "lexus",
    isLarger: true,
  },
  {
    name: "Chevrolet",
    logo: "/images/images-removebg-preview.png",
    value: "chevrolet",
  },
  {
    name: "Nissan",
    logo: "https://companieslogo.com/img/orig/7201.T_BIG-e1fde977.svg?t=1720244490",
    value: "nissan",
  },
  { name: "Honda", logo: "https://upload.wikimedia.org/wikipedia/commons/7/76/Honda_logo.svg", value: "honda" },
  {
    name: "KIA",
    logo: "https://companieslogo.com/img/orig/000270.KS-23c0c407.svg?t=1720244489",
    value: "kia",
  },
]

interface SearchByMakeProps {
  onBrandSelect: (brand: string) => void
}

export function SearchByMake({ onBrandSelect }: SearchByMakeProps) {
  return (
    <section className="py-8 md:py-12">
      <div className="container px-4">
        <div className="bg-gradient-to-br from-card/50 to-card border border-border rounded-2xl p-6 md:p-8 shadow-lg hover:shadow-xl hover:shadow-primary/5 transition-all duration-300">
          <h2 className="text-2xl md:text-3xl font-bold text-center mb-8 bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
            Search By Make
          </h2>

          <div className="grid grid-cols-3 gap-4 md:gap-6 max-w-4xl mx-auto">
            {carBrands.map((brand) => (
              <button
                key={brand.value}
                onClick={() => onBrandSelect(brand.value)}
                className="group flex flex-col items-center gap-2 md:gap-3 p-4 md:p-6 rounded-xl bg-card border-2 border-border hover:border-primary hover:bg-primary/5 transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-primary/20"
              >
                <div
                  className={`relative group-hover:scale-110 transition-transform duration-300 ${
                    brand.isLarger ? "w-20 h-20 md:w-24 md:h-24" : "w-12 h-12 md:w-16 md:h-16"
                  }`}
                >
                  <Image
                    src={brand.logo || "/placeholder.svg"}
                    alt={`${brand.name} logo`}
                    fill
                    className="object-contain"
                  />
                </div>
                <span className="text-sm md:text-base font-semibold text-foreground group-hover:text-primary transition-colors">
                  {brand.name}
                </span>
              </button>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
