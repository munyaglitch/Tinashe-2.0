"use client"

import Image from "next/image"

type Brand = {
  name: string
  logo: string
  value: string
  size?: "standard" | "medium" | "large" | "small"
}

const carBrands: Brand[] = [
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
    size: "large",
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
    size: "small",
  },
  {
    name: "Lexus",
    logo: "/images/images-1-removebg-preview.png",
    value: "lexus",
    size: "large",
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
    size: "small",
  },
  { name: "Honda", logo: "https://upload.wikimedia.org/wikipedia/commons/7/76/Honda_logo.svg", value: "honda", size: "small" },
  {
    name: "KIA",
    logo: "https://companieslogo.com/img/orig/000270.KS-23c0c407.svg?t=1720244489",
    value: "kia",
    size: "small",
  },
]

interface SearchByMakeProps {
  onBrandSelect: (brand: string) => void
}

export function SearchByMake({ onBrandSelect }: SearchByMakeProps) {
  const getLogoSize = (brand: Brand) => {
    if (brand.size === "large") return "w-24 h-24 md:w-28 md:h-28"
    if (brand.size === "medium") return "w-18 h-18 md:w-22 md:h-22"
    if (brand.size === "small") return "w-8 h-8 md:w-10 md:h-10"
    return "w-12 h-12 md:w-16 md:h-16"
  }

  return (
    <section className="py-8 md:py-12">
      <div className="container px-4">
        <div className="bg-gradient-to-br from-card/50 to-card rounded-2xl border border-border p-6 md:p-8 shadow-lg shadow-black/30">
          <h2 className="text-2xl md:text-3xl font-bold text-center mb-8 bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
            Search By Make
          </h2>

          <div className="grid grid-cols-3 gap-4 md:gap-6 max-w-4xl mx-auto">
            {carBrands.map((brand) => (
              <button
                key={brand.value}
                onClick={() => onBrandSelect(brand.value)}
                className="group flex flex-col items-center gap-2 md:gap-3 p-4 md:p-6 rounded-xl bg-card border border-border hover:border-primary transition-all duration-300 hover:shadow-[0_12px_18px_rgba(0,0,0,0.35)]"
              >
                <div
                  className={`relative ${getLogoSize(brand)} flex items-center justify-center transition-all duration-300 overflow-hidden`}
                >
                  <Image
                    src={brand.logo || "/placeholder.svg"}
                    alt={`${brand.name} logo`}
                    fill
                    className="object-cover"
                  />
                </div>
                <span className="text-sm md:text-base font-semibold text-foreground group-hover:text-primary transition-colors text-center w-full whitespace-normal">
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
