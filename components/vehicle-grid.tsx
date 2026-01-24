"use client"

import { useState, useEffect } from "react"
import { Phone, Filter, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import Image from "next/image"
import { VehicleDetailModal } from "./vehicle-detail-modal"
import { getApprovedListings } from "@/lib/listings"

const vehicles = [
  {
    id: 1,
    name: "Range Rover Autobiography Sport",
    brand: "land rover",
    variant: "SPORT EDITION",
    bodyType: "suv",
    year: 2025,
    fuel: "Petrol",
    mileage: "Delivery",
    price: 270000,
    image: "/images/whatsapp-image-2026-01-08-at-5-11-42-pm-1.jpeg",
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
    bodyType: "truck",
    year: 2023,
    fuel: "2.0L Bi-Turbo Diesel",
    mileage: "19,286 km",
    price: 95000,
    image: "/images/whatsapp-image-2026-01-08-at-5-12-08-pm-1.jpeg",
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
    bodyType: "suv",
    year: 2024,
    fuel: "3.3L Turbo Diesel",
    mileage: "Delivery",
    price: 168000,
    image: "/images/whatsapp-image-2026-01-08-at-6-13-06-pm.jpeg",
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
      "/images/whatsapp-image-2026-01-08-at-6-13-10-pm-3.jpeg",
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
    bodyType: "sedan",
    year: 2015,
    fuel: "2.0L Petrol",
    mileage: "51,876 km",
    price: 23000,
    image: "/images/whatsapp-image-2026-01-08-at-6-14-04-pm-1.jpeg",
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
    bodyType: "hatchback",
    year: 2018,
    fuel: "2.0L Turbo Petrol",
    mileage: "28,660 km",
    price: 24000,
    image: "/images/whatsapp-image-2026-01-08-at-6-15-39-pm.jpeg",
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
    bodyType: "hatchback",
    year: 2016,
    fuel: "1.5L Petrol + Hybrid",
    mileage: "52,855 km",
    price: 14500,
    image: "/images/whatsapp-image-2026-01-08-at-7-04-50-pm-3.jpeg",
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
    bodyType: "truck",
    year: 2025,
    fuel: "2.8L Diesel",
    mileage: "Delivery",
    price: 70000,
    image: "/images/whatsapp-image-2026-01-08-at-5-06-20-pm-4.jpeg",
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
  
  {
    id: 9,
    name: "BMW 523d F10 Edition",
    brand: "bmw",
    variant: "F10 EDITION",
    bodyType: "sedan",
    year: 2016,
    fuel: "Turbo Diesel",
    mileage: "64,754 km",
    price: 17500,
    image: "/images/bmw-523d/front-quarter-right.jpeg",
    images: [
      "/images/bmw-523d/front-view.jpeg",
      "/images/bmw-523d/front-closeup.jpeg",
      "/images/bmw-523d/front-quarter-right.jpeg",
      "/images/bmw-523d/front-quarter-left.jpeg",
      "/images/bmw-523d/side-left.jpeg",
      "/images/bmw-523d/side-right.jpeg",
      "/images/bmw-523d/side-profile.jpeg",
      "/images/bmw-523d/rear-quarter.jpeg",
      "/images/bmw-523d/rear-quarter-left.jpeg",
      "/images/bmw-523d/rear-view.jpeg",
      "/images/bmw-523d/taillight-detail.jpeg",
      "/images/bmw-523d/full-dashboard.jpeg",
      "/images/bmw-523d/interior-driver.jpeg",
      "/images/bmw-523d/steering-wheel.jpeg",
      "/images/bmw-523d/center-console.jpeg",
      "/images/bmw-523d/infotainment.jpeg",
      "/images/bmw-523d/rear-seats.jpeg",
    ],
    description:
      "Excellent Condition - Recently Imported - Duty Fully Paid! Premium German sedan with Eco + Sport Package and extra clean full leather interior.",
    features: [
      "Heated Rear Seats",
      "Eco + Sport Package",
      "Premium Alloy Wheels",
      "Quality Sound System",
      "Extra Clean Full Leather Interior",
      "Solid Suspension",
      "Luxurious Drive",
      "BMW iDrive System",
      "M Sport Steering Wheel",
    ],
  },
  {
    id: 10,
    name: "Mercedes Benz C180 W205 Edition",
    brand: "mercedes",
    variant: "W205 EDITION",
    bodyType: "sedan",
    year: 2015,
    fuel: "1.8L Petrol",
    mileage: "54,481 km",
    price: 18000,
    image: "/images/mercedes-c180/front-quarter-right.jpeg",
    images: [
      "/images/mercedes-c180/front-view.jpeg",
      "/images/mercedes-c180/front-quarter-right.jpeg",
      "/images/mercedes-c180/front-quarter-left.jpeg",
      "/images/mercedes-c180/side-left.jpeg",
      "/images/mercedes-c180/side-right.jpeg",
      "/images/mercedes-c180/rear-quarter-right.jpeg",
      "/images/mercedes-c180/rear-quarter-left.jpeg",
      "/images/mercedes-c180/rear-quarter-grass.jpeg",
      "/images/mercedes-c180/rear-view.jpeg",
      "/images/mercedes-c180/taillight-detail.jpeg",
      "/images/mercedes-c180/full-dashboard.jpeg",
      "/images/mercedes-c180/interior-driver.jpeg",
      "/images/mercedes-c180/steering-wheel.jpeg",
      "/images/mercedes-c180/instrument-cluster.jpeg",
      "/images/mercedes-c180/center-console.jpeg",
      "/images/mercedes-c180/infotainment.jpeg",
      "/images/mercedes-c180/rear-seats.jpeg",
    ],
    description:
      "Excellent Condition - Recently Imported - Duty Fully Paid! Premium German sedan with Sport Package, Eco Mode, and intelligent technological features.",
    features: [
      "Reverse Camera + 360 Motion Sensor Cam",
      "Premium Edition Package",
      "Sport Package + Eco Mode",
      "Running DayTime LED Lights",
      "Intelligent Technological Features",
      "Multi Steering Controls",
      "USB Ports + Bluetooth Interface",
      "Rear Entertainment",
      "Door Mercedes Refractor Light",
      "Sparkling Full Leather Interior",
      "Quality Sound System",
      "Solid Suspension",
      "Luxurious Drive",
      "Automatic Transmission",
    ],
  },
  {
    id: 11,
    name: "Nissan NP300 SingleCab Edition",
    brand: "nissan",
    variant: "SINGLECAB",
    bodyType: "truck",
    year: 2014,
    fuel: "2.7L Diesel",
    mileage: "131,644 km",
    price: 10000,
    image: "/images/nissan-np300/front-quarter-right.jpeg",
    images: [
      "/images/nissan-np300/front-view.jpeg",
      "/images/nissan-np300/front-quarter-right.jpeg",
      "/images/nissan-np300/front-quarter-left.jpeg",
      "/images/nissan-np300/side-left.jpeg",
      "/images/nissan-np300/side-right.jpeg",
      "/images/nissan-np300/rear-quarter-left.jpeg",
      "/images/nissan-np300/rear-quarter-right.jpeg",
      "/images/nissan-np300/rear-view.jpeg",
      "/images/nissan-np300/interior-driver.jpeg",
      "/images/nissan-np300/gear-shift.jpeg",
    ],
    description:
      "Excellent Condition - Well Maintained Vehicle! Reliable workhorse with intact engine and gearbox, perfect for work or personal use.",
    features: [
      "Well Maintained Vehicle",
      "Engine And GearBox Intact",
      "Superb Full Fabric Interior",
      "Quality Sound System",
      "Solid Suspension",
      "Roll Bar Installed",
      "Manual Transmission",
    ],
  },
  
  
  
  {
    id: 15,
    name: "Mercedes Benz GLA 180 Edition",
    brand: "mercedes",
    variant: "GLA 180",
    bodyType: "suv",
    year: 2016,
    fuel: "1.8L Petrol",
    mileage: "73,744 km",
    price: 19000,
    image: "/images/mercedes-gla180/side-right.jpeg",
    images: [
      "/images/mercedes-gla180/front-view.jpeg",
      "/images/mercedes-gla180/front-closeup.jpeg",
      "/images/mercedes-gla180/front-quarter-left.jpeg",
      "/images/mercedes-gla180/side-right.jpeg",
      "/images/mercedes-gla180/rear-quarter.jpeg",
      "/images/mercedes-gla180/rear-quarter-right.jpeg",
      "/images/mercedes-gla180/side-left.jpeg",
      "/images/mercedes-gla180/rear-view.jpeg",
      "/images/mercedes-gla180/taillight-detail.jpeg",
      "/images/mercedes-gla180/full-dashboard.jpeg",
      "/images/mercedes-gla180/interior-driver.jpeg",
      "/images/mercedes-gla180/steering-wheel.jpeg",
      "/images/mercedes-gla180/infotainment.jpeg",
      "/images/mercedes-gla180/rear-seats.jpeg",
    ],
    description:
      "Excellent Condition - Recently Imported - Duty Fully Paid! Compact luxury SUV with sporty styling, AMG wheels, and intelligent features.",
    features: [
      "Reverse Camera + 360 Motion Sensor Cam",
      "Multi Steering Controls",
      "Auto DayTime Lights",
      "Eco Mode + Sport Mode",
      "Half Leather Interior with Red Stitching",
      "Quality Sound System",
      "Solid Suspension",
      "AMG Style Alloy Wheels",
      "Sport Pedals",
      "Automatic Transmission",
    ],
  },
  
  {
    id: 17,
    name: "Toyota Hilux GD6 DoubleCab 4x4",
    brand: "toyota",
    variant: "2.8 GD-6 4X4",
    bodyType: "truck",
    year: 2017,
    fuel: "2.8L Diesel",
    mileage: "144,166 km",
    price: 30000,
    image: "/images/hilux-gd6/front-quarter-right.jpeg",
    images: [
      "/images/hilux-gd6/front-closeup.jpeg",
      "/images/hilux-gd6/side-right.jpeg",
      "/images/hilux-gd6/side-left.jpeg",
      "/images/hilux-gd6/rear-quarter.jpeg",
      "/images/hilux-gd6/rear-quarter-2.jpeg",
      "/images/hilux-gd6/rear-view.jpeg",
      "/images/hilux-gd6/taillight-detail.jpeg",
      "/images/hilux-gd6/full-dashboard.jpeg",
      "/images/hilux-gd6/infotainment.jpeg",
      "/images/hilux-gd6/gear-shift.jpeg",
    ],
    description:
      "Excellent Condition - 2017 Toyota Hilux GD6 DoubleCab 4x4 with reverse camera and 360 dual cam. A rugged and reliable workhorse.",
    features: [
      "4x4 Drivetrain",
      "Reverse Camera + 360 Dual Cam",
      "Multi Steering Controls",
      "Eco Mode + PWR Mode",
      "Full Fabric Interior",
      "Quality Sound System",
      "Chrome Roll Bar",
      "Bull Bar",
      "Side Steps",
      "Manual Transmission",
    ],
  },
  {
    id: 18,
    name: "Toyota Landcruiser Prado J150 TX",
    brand: "toyota",
    variant: "3.0L TURBO DIESEL 4X4",
    bodyType: "suv",
    year: 2015,
    fuel: "3.0L Turbo Diesel",
    mileage: "134,135 km",
    price: 35000,
    image: "/images/prado-j150/front-quarter-right.jpeg",
    images: [
      "/images/prado-j150/front-view.jpeg",
      "/images/prado-j150/front-quarter-left.jpeg",
      "/images/prado-j150/front-quarter-right.jpeg",
      "/images/prado-j150/side-right.jpeg",
      "/images/prado-j150/side-left.jpeg",
      "/images/prado-j150/rear-quarter.jpeg",
      "/images/prado-j150/rear-quarter-right.jpeg",
      "/images/prado-j150/rear-view.jpeg",
      "/images/prado-j150/full-dashboard.jpeg",
      "/images/prado-j150/interior-driver.jpeg",
      "/images/prado-j150/infotainment.jpeg",
      "/images/prado-j150/gear-shift.jpeg",
      "/images/prado-j150/odometer.jpeg",
      "/images/prado-j150/rear-seats.jpeg",
    ],
    description:
      "Excellent Condition - Duty Fully Paid! 2015 Toyota Landcruiser Prado J150 TX Edition with stunning red quilted leather interior and wood grain trim. 7 Seater with updated service record from Croco Motors.",
    features: [
      "4x4 Drivetrain",
      "7 Seater",
      "Full Red Leather Interior",
      "Wood Grain Steering Wheel",
      "Multi Steering Controls",
      "Motion Sensors All Round",
      "Touchscreen Infotainment",
      "Dual Zone Climate Control",
      "Updated Service Record",
      "Automatic Transmission",
    ],
  },
  {
    id: 19,
    name: "Honda Vezel Hybrid RS Z Edition",
    brand: "honda",
    variant: "1.5L HYBRID RS",
    bodyType: "suv",
    year: 2016,
    fuel: "1.5L Petrol + Hybrid",
    mileage: "50,275 km",
    price: 17500,
    image: "/images/vezel-rs/front-quarter-right.jpeg",
    images: [
      "/images/vezel-rs/front-view.jpeg",
      "/images/vezel-rs/front-closeup.jpeg",
      "/images/vezel-rs/front-quarter-left.jpeg",
      "/images/vezel-rs/front-quarter-right.jpeg",
      "/images/vezel-rs/side-right.jpeg",
      "/images/vezel-rs/side-left.jpeg",
      "/images/vezel-rs/rear-quarter-left.jpeg",
      "/images/vezel-rs/rear-quarter-right.jpeg",
      "/images/vezel-rs/rear-quarter-closeup.jpeg",
      "/images/vezel-rs/rear-view.jpeg",
      "/images/vezel-rs/badge-detail.jpeg",
      "/images/vezel-rs/full-dashboard.jpeg",
      "/images/vezel-rs/interior-driver.jpeg",
      "/images/vezel-rs/steering-wheel.jpeg",
      "/images/vezel-rs/infotainment.jpeg",
      "/images/vezel-rs/gear-shift.jpeg",
      "/images/vezel-rs/rear-seats.jpeg",
    ],
    description:
      "Excellent Condition - Duty Fully Paid! 2016 Honda Vezel Hybrid RS Z Edition with Sport Package. Sporty crossover with hybrid efficiency and premium features.",
    features: [
      "Hybrid Battery System",
      "RS Sport Package",
      "Auto Daytime Lights",
      "Roof Rails",
      "Multi Steering Controls",
      "Reverse Camera + 360 Motion Camera",
      "Eco Mode + Sport Mode",
      "Gathers Touchscreen",
      "Sport Pedals",
      "Automatic Transmission",
    ],
  },
  
  
  {
    id: 23,
    name: "Mercedes Benz C220d W206",
    brand: "mercedes",
    variant: "C220d W206 EDITION",
    bodyType: "sedan",
    year: 2021,
    fuel: "2.2L Turbo Diesel",
    mileage: "30,865 km",
    price: 68000,
    image: "/images/mercedes-c220d-w206/front-quarter-right.jpeg",
    images: [
      "/images/mercedes-c220d-w206/front-view.jpeg",
      "/images/mercedes-c220d-w206/front-closeup.jpeg",
      "/images/mercedes-c220d-w206/front-quarter-left.jpeg",
      "/images/mercedes-c220d-w206/front-quarter-right.jpeg",
      "/images/mercedes-c220d-w206/side-right.jpeg",
      "/images/mercedes-c220d-w206/side-left.jpeg",
      "/images/mercedes-c220d-w206/rear-quarter-left.jpeg",
      "/images/mercedes-c220d-w206/rear-quarter-right.jpeg",
      "/images/mercedes-c220d-w206/rear-view.jpeg",
      "/images/mercedes-c220d-w206/taillight-detail.jpeg",
      "/images/mercedes-c220d-w206/full-dashboard.jpeg",
      "/images/mercedes-c220d-w206/interior-driver.jpeg",
      "/images/mercedes-c220d-w206/steering-wheel.jpeg",
      "/images/mercedes-c220d-w206/infotainment.jpeg",
      "/images/mercedes-c220d-w206/center-console.jpeg",
      "/images/mercedes-c220d-w206/rear-seats.jpeg",
      "/images/mercedes-c220d-w206/panoramic-roof.jpeg",
    ],
    description:
      "Excellent Condition - Recently Imported! Duty Fully Paid! 2021 Mercedes Benz C220d W206 with Distronic self-drive technology. Features wide screen display, 360 camera system, and 3D surround sound.",
    features: [
      "Distronic + Self Drive Technology",
      "360 Camera System",
      "Wide Screen Display",
      "3D Surround Sound System",
      "Panoramic Sunroof",
      "Half Leather Interior",
      "Blue Ambient Lighting",
      "AMG Sport Wheels",
      "Sport Pedals",
      "Eco Mode + Sport Package",
      "Auto Daytime Lights",
      "Automatic Transmission",
    ],
  },
  {
    id: 24,
    name: "Toyota Hilux GD6 Rocco DoubleCab",
    brand: "toyota",
    variant: "2.8 GD-6 ROCCO DOUBLECAB",
    bodyType: "truck",
    year: 2021,
    fuel: "2.8L Diesel",
    mileage: "68,265 km",
    price: 58000,
    image: "/images/hilux-rocco/front-quarter-right.jpeg",
    images: [
      "/images/hilux-rocco/front-view.jpeg",
      "/images/hilux-rocco/front-closeup.jpeg",
      "/images/hilux-rocco/front-quarter-left.jpeg",
      "/images/hilux-rocco/front-quarter-right.jpeg",
      "/images/hilux-rocco/side-right.jpeg",
      "/images/hilux-rocco/side-left.jpeg",
      "/images/hilux-rocco/rear-quarter-left.jpeg",
      "/images/hilux-rocco/rear-quarter-left-alt.jpeg",
      "/images/hilux-rocco/rear-quarter-right.jpeg",
      "/images/hilux-rocco/rear-view.jpeg",
      "/images/hilux-rocco/rocco-badge.jpeg",
      "/images/hilux-rocco/full-dashboard.jpeg",
      "/images/hilux-rocco/interior-driver.jpeg",
      "/images/hilux-rocco/steering-wheel.jpeg",
      "/images/hilux-rocco/infotainment.jpeg",
      "/images/hilux-rocco/rear-seats.jpeg",
    ],
    description:
      "Excellent Condition 2021 Toyota Hilux GD6 Rocco DoubleCab Edition. Features 360 dual camera system, motion sensors, Rocco body kit with mountain graphics, black alloy wheels with white-letter off-road tires, and full leather interior.",
    features: [
      "Rocco Edition Body Kit",
      "360 Dual Camera System",
      "Motion Sensors All Round",
      "Multi Steering Controls",
      "Eco Mode + PWR Mode",
      "Auto Daytime Lights",
      "Full Leather Interior",
      "Touchscreen Infotainment",
      "Push Start Button",
      "Black Alloy Wheels",
      "Off-Road Tires",
      "Automatic Transmission",
    ],
  },
  {
    id: 25,
    name: "Toyota Runx TearDrop Edition",
    brand: "toyota",
    variant: "TEARDROP Z AEROTOURER",
    bodyType: "hatchback",
    year: 2007,
    fuel: "1.5L Petrol",
    mileage: "130,276 km",
    price: 6000,
    image: "/images/runx-teardrop/front-quarter-right.jpeg",
    images: [
      "/images/runx-teardrop/front-view.jpeg",
      "/images/runx-teardrop/front-quarter-left.jpeg",
      "/images/runx-teardrop/front-quarter-right.jpeg",
      "/images/runx-teardrop/side-right.jpeg",
      "/images/runx-teardrop/rear-quarter-left.jpeg",
      "/images/runx-teardrop/rear-quarter-left-alt.jpeg",
      "/images/runx-teardrop/rear-quarter-right.jpeg",
      "/images/runx-teardrop/rear-view.jpeg",
      "/images/runx-teardrop/taillight-detail.jpeg",
      "/images/runx-teardrop/full-dashboard.jpeg",
      "/images/runx-teardrop/interior-driver.jpeg",
      "/images/runx-teardrop/infotainment.jpeg",
      "/images/runx-teardrop/rear-seats.jpeg",
    ],
    description:
      "Excellent Condition 2007 Toyota Runx TearDrop Z Aerotourer Edition. Well maintained vehicle with engine and gearbox intact. Super smooth drive with extra clean interior.",
    features: [
      "Z Aerotourer Body Kit",
      "Roof Spoiler",
      "Alloy Wheels",
      "MiniDisc Player + FM Radio",
      "Auto Climate Control",
      "Full Fabric Interior",
      "Quilted Seat Covers",
      "Power Windows",
      "Central Locking",
      "Automatic Transmission",
    ],
  },
  {
    id: 26,
    name: "Toyota LandCruiser 79 Series DoubleCab",
    brand: "toyota",
    variant: "4.5 V8 TURBO DIESEL 4X4",
    bodyType: "truck",
    year: 2021,
    fuel: "4.5L V8 Turbo Diesel",
    mileage: "10,116 km",
    price: 78000,
    image: "/images/landcruiser-79/front-quarter-right.jpeg",
    images: [
      "/images/landcruiser-79/front-view.jpeg",
      "/images/landcruiser-79/front-closeup.jpeg",
      "/images/landcruiser-79/front-quarter-left.jpeg",
      "/images/landcruiser-79/front-quarter-right.jpeg",
      "/images/landcruiser-79/side-right.jpeg",
      "/images/landcruiser-79/side-left.jpeg",
      "/images/landcruiser-79/rear-quarter-left.jpeg",
      "/images/landcruiser-79/rear-quarter-left-alt.jpeg",
      "/images/landcruiser-79/rear-quarter-right.jpeg",
      "/images/landcruiser-79/rear-view.jpeg",
      "/images/landcruiser-79/tailgate-detail.jpeg",
      "/images/landcruiser-79/snorkel-detail.jpeg",
      "/images/landcruiser-79/full-dashboard.jpeg",
      "/images/landcruiser-79/interior-driver.jpeg",
      "/images/landcruiser-79/infotainment.jpeg",
      "/images/landcruiser-79/gear-shift.jpeg",
      "/images/landcruiser-79/rear-seats.jpeg",
    ],
    description:
      "Brand New 2021 Toyota LandCruiser 79 Series DoubleCab. The ultimate workhorse with 4.5L V8 Turbo Diesel producing 151kW (202hp) and 430Nm torque. Features snorkel, roll bar with spare tire, and 5-speed manual transmission.",
    features: [
      "4.5L V8 Turbo Diesel",
      "4x4 Drivetrain",
      "5-Speed Manual Transmission",
      "Snorkel",
      "Roll Bar with Spare Tire",
      "360 Motion Sensor Camera",
      "Reverse Camera",
      "Steel Wheels",
      "Off-Road Tires",
      "Fire Extinguisher",
      "Tow Bar",
      "Dual Airbags",
    ],
  },
  {
    id: 27,
    name: "Toyota LandCruiser 79 Series SingleCab",
    brand: "toyota",
    variant: "4.5 V8 TURBO DIESEL 4X4",
    bodyType: "truck",
    year: 2021,
    fuel: "4.5L V8 Turbo Diesel",
    mileage: "1,175 km",
    price: 68000,
    image: "/images/landcruiser-79-single/front-quarter-right.jpeg",
    images: [
      "/images/landcruiser-79-single/front-view.jpeg",
      "/images/landcruiser-79-single/front-quarter-left.jpeg",
      "/images/landcruiser-79-single/front-quarter-right.jpeg",
      "/images/landcruiser-79-single/side-right.jpeg",
      "/images/landcruiser-79-single/rear-quarter-left.jpeg",
      "/images/landcruiser-79-single/rear-quarter-left-alt.jpeg",
      "/images/landcruiser-79-single/rear-quarter-right.jpeg",
      "/images/landcruiser-79-single/rear-view.jpeg",
      "/images/landcruiser-79-single/badge-detail.jpeg",
      "/images/landcruiser-79-single/infotainment.jpeg",
      "/images/landcruiser-79-single/interior-driver.jpeg",
    ],
    description:
      "Brand New 2021 Toyota LandCruiser 79 Series SingleCab with only 1,175km. The ultimate expedition workhorse with 4.5L V8 Turbo Diesel producing 151kW (202hp) and 430Nm torque. Features ARB bull bar with LED lights, black expedition cage, BFGoodrich All-Terrain tires, and full leather interior.",
    features: [
      "4.5L V8 Turbo Diesel",
      "4x4 Drivetrain",
      "5-Speed Manual Transmission",
      "ARB Bull Bar",
      "Dual LED Spotlights",
      "Snorkel",
      "Black Expedition Cage",
      "BFGoodrich All-Terrain Tires",
      "Swing-Out Spare Tire Carrier",
      "Jerry Can Holder",
      "Android Touchscreen",
      "Full Leather Interior",
    ],
  },
  {
    id: 28,
    name: "Ford Ranger Everest NewShape",
    brand: "ford",
    variant: "3.0 V6 DIESEL 4WD",
    bodyType: "suv",
    year: 2024,
    fuel: "3.0L V6 Diesel",
    mileage: "680 km",
    price: 78000,
    image: "/images/everest-2024/front-quarter-right.jpeg",
    images: [
      "/images/everest-2024/front-view.jpeg",
      "/images/everest-2024/front-quarter-left.jpeg",
      "/images/everest-2024/front-quarter-right.jpeg",
      "/images/everest-2024/side-right.jpeg",
      "/images/everest-2024/side-left.jpeg",
      "/images/everest-2024/rear-quarter-left.jpeg",
      "/images/everest-2024/rear-quarter-left-alt.jpeg",
      "/images/everest-2024/rear-quarter-right.jpeg",
      "/images/everest-2024/rear-view.jpeg",
      "/images/everest-2024/full-dashboard.jpeg",
      "/images/everest-2024/interior-driver.jpeg",
      "/images/everest-2024/steering-wheel.jpeg",
      "/images/everest-2024/infotainment.jpeg",
      "/images/everest-2024/gear-shift.jpeg",
      "/images/everest-2024/rear-seats.jpeg",
    ],
    description:
      "Brand New 2024 Ford Ranger Everest NewShape Edition with only 680km. Recently imported with duty fully paid. Features 3.0L V6 Diesel producing 184kW (247hp) and 600Nm torque. Horizontal Raptor-style touchscreen, Terrain Management System, and luxurious full leather interior.",
    features: [
      "3.0L V6 Diesel Engine",
      "4WD Drivetrain",
      "Terrain Management System",
      "Horizontal Raptor Touchscreen",
      "Apple CarPlay",
      "360 Motion Sensor Camera",
      "Digital Instrument Cluster",
      "Multi Steering Controls",
      "Eco Mode + Power Mode",
      "Auto DayTime Lights",
      "3D Surround Sound System",
      "Full Leather Interior",
      "Automatic Transmission",
    ],
  },
  {
    id: 29,
    name: "BMW 320d M-Sport NewShape",
    brand: "bmw",
    variant: "XDRIVE TWINPOWER TURBO",
    bodyType: "sedan",
    year: 2023,
    fuel: "2.0L TwinPower Turbo Diesel",
    mileage: "11,475 km",
    price: 35000,
    image: "/images/bmw-320d/front-quarter-right.jpeg",
    images: [
      "/images/bmw-320d/front-view.jpeg",
      "/images/bmw-320d/front-detail.jpeg",
      "/images/bmw-320d/front-quarter-left.jpeg",
      "/images/bmw-320d/front-quarter-right.jpeg",
      "/images/bmw-320d/side-left.jpeg",
      "/images/bmw-320d/side-right.jpeg",
      "/images/bmw-320d/rear-quarter-left.jpeg",
      "/images/bmw-320d/rear-quarter-right.jpeg",
      "/images/bmw-320d/rear-view.jpeg",
      "/images/bmw-320d/taillight-detail.jpeg",
      "/images/bmw-320d/full-dashboard.jpeg",
      "/images/bmw-320d/interior-driver.jpeg",
      "/images/bmw-320d/steering-wheel.jpeg",
      "/images/bmw-320d/infotainment.jpeg",
      "/images/bmw-320d/gear-shift.jpeg",
      "/images/bmw-320d/rear-seats.jpeg",
    ],
    description:
      "Excellent Condition 2023 BMW 320d M-Sport in stunning Portimao Blue. Recently imported with duty fully paid. Features xDrive all-wheel drive, M-Sport steering wheel, digital dashboard with customizable driving modes, and wireless Apple CarPlay.",
    features: [
      "2.0L TwinPower Turbo Diesel",
      "xDrive All-Wheel Drive",
      "M-Sport Package",
      "M-Sport Steering Wheel",
      "Digital Instrument Cluster",
      "360 Degree Camera",
      "Park Assist",
      "Apple CarPlay Wireless",
      "Wireless Device Charging",
      "Heated Rear Seats",
      "Adjustable Sport Seats",
      "Eco + Sport Mode",
      "Premium Sound System",
      "Full Leather Interior",
    ],
  },
  {
    id: 30,
    name: "VW Polo TSI BlueMotion",
    brand: "volkswagen",
    variant: "1.4 TSI TURBO",
    bodyType: "hatchback",
    year: 2016,
    fuel: "1.4L Turbo Petrol",
    mileage: "51,855 km",
  price: 12000,
  image: "/images/polo-tsi/front-view-new.jpeg",
  images: [
  "/images/polo-tsi/front-view-new.jpeg",
  "/images/polo-tsi/front-closeup-new.jpeg",
  "/images/polo-tsi/front-quarter-new.jpeg",
  "/images/polo-tsi/front-quarter-left-new.jpeg",
  "/images/polo-tsi/side-left.jpeg",
  "/images/polo-tsi/side-right.jpeg",
  "/images/polo-tsi/rear-quarter-new.jpeg",
  "/images/polo-tsi/rear-quarter-left.jpeg",
  "/images/polo-tsi/rear-quarter-right.jpeg",
  "/images/polo-tsi/rear-view.jpeg",
  "/images/polo-tsi/taillight-new.jpeg",
  "/images/polo-tsi/full-dashboard.jpeg",
  "/images/polo-tsi/interior-driver.jpeg",
  "/images/polo-tsi/steering-wheel.jpeg",
  "/images/polo-tsi/infotainment.jpeg",
  "/images/polo-tsi/rear-seats.jpeg",
  ],
    description:
      "Excellent Condition 2016 VW Polo TSI BlueMotion in stunning Sunset Red. Recently imported with duty fully paid. Features 1.4L Turbo engine, touchscreen infotainment, multi-function steering wheel, and DSG automatic transmission.",
    features: [
      "1.4L Turbo Petrol Engine",
      "DSG Automatic Transmission",
      "Multi Steering Controls",
      "Touchscreen Infotainment",
      "Reverse Camera",
      "360 Motion Sensor",
      "Auto DayTime Lights",
      "Eco Mode + Sport Mode",
      "3D Surround Sound System",
      "Full Fabric Interior",
      "Solid Suspension",
      "BlueMotion Technology",
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
  const [selectedBodyType, setSelectedBodyType] = useState<string>("all")
  const [selectedVehicle, setSelectedVehicle] = useState<(typeof vehicles)[0] | null>(null)
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false)
  const [userListings, setUserListings] = useState<any[]>([])

  useEffect(() => {
    const sync = () => {
      setUserListings(getApprovedListings())
    }
    sync()
    window.addEventListener("approved-listings-update", sync)
    return () => window.removeEventListener("approved-listings-update", sync)
  }, [])

  const allVehicles = [
    ...vehicles,
    ...userListings.map((listing: any, index: number) => ({
      id: 1000 + index,
      name: listing.details.split("\n")[0] || "User Listed Vehicle",
      brand: "other",
      variant: "USER LISTING",
      bodyType: "other",
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

    if (selectedBodyType !== "all" && vehicle.bodyType !== selectedBodyType) {
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
            <div className="flex items-center gap-3 w-full sm:w-auto flex-wrap">
              <div className="flex items-center gap-2">
                <span className="text-xs md:text-sm text-muted-foreground">Body:</span>
                <select
                  value={selectedBodyType}
                  onChange={(e) => setSelectedBodyType(e.target.value)}
                  className="px-3 md:px-4 py-2 border border-border rounded-lg bg-card text-foreground font-medium focus:outline-none focus:ring-2 focus:ring-primary transition-all text-sm md:text-base"
                >
                  <option value="all">All</option>
                  <option value="suv">SUV</option>
                  <option value="sedan">Sedan</option>
                  <option value="hatchback">Hatchback</option>
                  <option value="truck">Truck</option>
                  <option value="bus">Bus</option>
                </select>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-xs md:text-sm text-muted-foreground">Sort by:</span>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="px-3 md:px-4 py-2 border border-border rounded-lg bg-card text-foreground font-medium focus:outline-none focus:ring-2 focus:ring-primary transition-all text-sm md:text-base"
                >
                  <option value="popularity">Popularity</option>
                  <option value="price-low">Price: Low to High</option>
                  <option value="price-high">Price: High to Low</option>
                  <option value="year">Year</option>
                </select>
              </div>
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

            <div className="flex-1 grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8">
              {sortedVehicles.length === 0 ? (
                <div className="col-span-full text-center py-16">
                  <p className="text-xl text-muted-foreground">No cars available</p>
                </div>
              ) : (
                sortedVehicles.map((vehicle) => (
                  <div
                    key={vehicle.id}
                    onClick={() => setSelectedVehicle(vehicle)}
                    className="group bg-card rounded-[32px] border border-border overflow-hidden hover:border-primary transition-all duration-300 hover:shadow-2xl hover:shadow-primary/20 hover:-translate-y-2 cursor-pointer"
                  >
                    <div className="relative h-80 sm:h-[22rem] md:h-[26rem] overflow-hidden">
                      <Image
                        src={vehicle.image || "/placeholder.svg"}
                        alt={vehicle.name}
                        fill
                        className="object-cover group-hover:scale-[1.03] transition-transform duration-500"
                        style={{ objectPosition: "center" }}
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
