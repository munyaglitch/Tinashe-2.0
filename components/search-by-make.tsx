"use client"

import Image from "next/image"

type Brand = {
  name: string;
  logo: string;
  value: string;
  large?: boolean;
};

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
    large: true,
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
        <div className="bg-card/80 rounded-[20px] p-6 md:p-10 shadow-[0_12px_18px_rgba(0,0,0,0.35)]">
          <h2 className="text-2xl md:text-3xl font-bold text-center mb-8 bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
            Search By Make
          </h2>

          <div className="grid grid-cols-2 sm:grid-cols-3 gap-5 md:gap-6 max-w-5xl mx-auto">
            {carBrands.map((brand) => {
              const expanded = brand.large
              return (
                <button
                  key={brand.value}
                  onClick={() => onBrandSelect(brand.value)}
                  className="group flex flex-col items-center gap-3 px-5 py-6 rounded-[20px] bg-card/80 shadow-[0_12px_18px_rgba(0,0,0,0.35)] hover:shadow-[0_14px_24px_rgba(0,0,0,0.45)] transition-all duration-300"
                >
                  <div
                    className={`relative rounded-[14px] bg-transparent shadow-[0_8px_12px_rgba(0,0,0,0.55)] p-2 flex items-center justify-center ${
                      expanded ? "w-28 h-28 md:w-32 md:h-32" : "w-20 h-20 md:w-24 md:h-24"
                    }`}
                  >
                    <Image
                      src={brand.logo || "/placeholder.svg"}
                      alt={`${brand.name} logo`}
                      fill
                      className={`object-contain ${brand.large ? "scale-[1.1]" : ""}`}
                    />
                  </div>
                  <span className="text-sm md:text-base font-semibold text-foreground group-hover:text-primary transition-colors">
                    {brand.name}
                  </span>
                </button>
              )
            })}
          </div>
        </div>
      </div>
    </section>
  )
}
