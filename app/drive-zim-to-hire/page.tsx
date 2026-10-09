"use client"

import { useMemo, useState } from "react"
import { CalendarDays, CheckCircle2, MapPin, Phone, Search, ShieldCheck, Star } from "lucide-react"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"

const rentals = [
  { name: "Toyota Hilux 4x4", type: "SUV · 4x4", location: "Harare", seats: 5, transmission: "Manual", fuel: "Diesel", price: 55, image: "/images/hilux-gd6/front-quarter-right.jpeg" },
  { name: "Honda Fit", type: "Economy · Automatic", location: "Bulawayo", seats: 5, transmission: "Automatic", fuel: "Petrol", price: 35, image: "/images/vezel-rs/front-quarter-right.jpeg" },
  { name: "VW Polo", type: "Compact · Automatic", location: "Victoria Falls", seats: 5, transmission: "Automatic", fuel: "Petrol", price: 32, image: "/images/polo-tsi/front-quarter-new.jpeg" },
]

export default function DriveZimToHirePage() {
  const [location, setLocation] = useState("Harare")
  const [pickupDate, setPickupDate] = useState("")
  const [dropoffDate, setDropoffDate] = useState("")
  const [submitted, setSubmitted] = useState(false)
  const [filter, setFilter] = useState("All")

  const visibleRentals = useMemo(() => filter === "All" ? rentals : rentals.filter((rental) => rental.location === filter), [filter])

  return (
    <main className="min-h-screen bg-[#f5f7fb] text-[#071a35]">
      <Header />
      <section className="relative overflow-hidden bg-[#071a35] px-4 py-14 text-white md:px-8 md:py-20">
        <div className="absolute -right-32 -top-32 h-96 w-96 rounded-full bg-[#b51f32]/30 blur-3xl" />
        <div className="absolute bottom-0 left-1/3 h-56 w-56 rounded-full bg-[#1762a8]/25 blur-3xl" />
        <div className="relative mx-auto grid max-w-7xl items-center gap-12 lg:grid-cols-[1.05fr_.95fr]">
          <div>
            <p className="mb-4 text-sm font-bold uppercase tracking-[.25em] text-[#f3bd54]">TC Motors rental service</p>
            <h1 className="max-w-3xl text-4xl font-black tracking-tight md:text-6xl">Rent a car in Zimbabwe — easy, fast, reliable.</h1>
            <p className="mt-5 max-w-2xl text-lg leading-8 text-slate-200">Practical vehicles for work, weekends, airport transfers and road trips across Harare, Bulawayo and beyond.</p>
          </div>
          <div className="relative hidden min-h-[290px] lg:block" aria-label="Rental vehicle preview">
            <div className="absolute right-0 top-0 h-52 w-4/5 overflow-hidden rounded-2xl border border-white/15 bg-white/10 shadow-2xl"><img src={rentals[0].image} alt={rentals[0].name} className="h-full w-full object-contain" /></div>
            <div className="absolute bottom-0 left-0 h-40 w-3/5 overflow-hidden rounded-2xl border border-white/15 bg-[#0b2444] p-2 shadow-xl"><img src={rentals[1].image} alt={rentals[1].name} className="h-full w-full object-contain" /></div>
            <div className="absolute bottom-5 right-6 rounded-lg bg-[#b51f32] px-4 py-2 text-sm font-bold shadow-lg">Verified local rentals</div>
          </div>
          <div className="mt-2 lg:col-span-2 rounded-2xl bg-white p-4 text-[#071a35] shadow-2xl md:p-5">
            <div className="grid gap-4 md:grid-cols-[1.1fr_1fr_1fr_auto] md:items-end">
              <label className="text-sm font-bold">Pick-up location<select value={location} onChange={(event) => setLocation(event.target.value)} className="mt-2 w-full rounded-lg border border-slate-200 bg-white px-3 py-3 font-normal outline-none focus:border-[#b51f32]"><option>Harare</option><option>Bulawayo</option><option>Victoria Falls</option><option>Mutare</option></select></label>
              <label className="text-sm font-bold">Pick-up date<input type="date" value={pickupDate} onChange={(event) => setPickupDate(event.target.value)} className="mt-2 w-full rounded-lg border border-slate-200 px-3 py-3 font-normal outline-none focus:border-[#b51f32]" /></label>
              <label className="text-sm font-bold">Drop-off date<input type="date" value={dropoffDate} onChange={(event) => setDropoffDate(event.target.value)} className="mt-2 w-full rounded-lg border border-slate-200 px-3 py-3 font-normal outline-none focus:border-[#b51f32]" /></label>
              <button type="button" onClick={() => setSubmitted(true)} className="inline-flex items-center justify-center gap-2 rounded-lg bg-[#b51f32] px-6 py-3 font-bold text-white transition hover:bg-[#921b2a]"><Search className="h-4 w-4" /> Search cars</button>
            </div>
            {submitted && <p className="mt-4 text-sm font-semibold text-[#1762a8]">Showing available cars near {location}. Choose a vehicle below to enquire.</p>}
          </div>
          <div className="mt-1 flex flex-wrap gap-3 text-sm font-semibold lg:col-span-2"><span className="rounded-full bg-white/10 px-4 py-2"><ShieldCheck className="mr-2 inline h-4 w-4 text-[#f3bd54]" />Fully insured</span><span className="rounded-full bg-white/10 px-4 py-2"><Phone className="mr-2 inline h-4 w-4 text-[#f3bd54]" />24/7 roadside assistance</span><span className="rounded-full bg-white/10 px-4 py-2"><CheckCircle2 className="mr-2 inline h-4 w-4 text-[#f3bd54]" />Zimbabwe verified</span></div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl bg-[#f5f7fb] px-4 py-14 md:px-8 md:py-20">
        <div className="flex flex-col justify-between gap-5 md:flex-row md:items-end"><div><p className="text-sm font-bold uppercase tracking-[.25em] text-[#b51f32]">Available now</p><h2 className="mt-2 text-3xl font-black text-[#071a35] md:text-4xl">Popular car listings</h2><p className="mt-2 text-slate-600">Straightforward daily hire from a team you can reach.</p></div><div className="flex flex-wrap gap-2">{["All", "Harare", "Bulawayo", "Victoria Falls"].map((item) => <button key={item} type="button" onClick={() => setFilter(item)} className={`rounded-full px-4 py-2 text-sm font-bold transition ${filter === item ? "bg-[#071a35] text-white" : "bg-white text-[#071a35] ring-1 ring-slate-200 hover:ring-[#b51f32]"}`}>{item}</button>)}</div></div>
        <div className="mt-8 grid gap-6 md:grid-cols-3">{visibleRentals.map((rental) => <article key={rental.name} className="overflow-hidden rounded-2xl bg-white shadow-[0_12px_35px_rgba(7,26,53,.10)] ring-1 ring-slate-200"><div className="flex h-52 items-center justify-center bg-slate-100 p-3"><img src={rental.image} alt={rental.name} className="h-full w-full object-contain" /></div><div className="p-5"><span className="rounded-full bg-[#e8eef8] px-3 py-1 text-xs font-bold text-[#1762a8]">{rental.type}</span><h3 className="mt-4 text-2xl font-black text-[#071a35]">{rental.name}</h3><p className="mt-3 flex items-center gap-2 text-sm text-slate-600"><MapPin className="h-4 w-4 text-[#b51f32]" />{rental.seats} seats · {rental.transmission} · {rental.fuel} · {rental.location}</p><div className="mt-5 flex items-center justify-between border-t border-slate-100 pt-5"><p className="text-xl font-black text-[#b51f32]">USD ${rental.price} <span className="text-sm font-medium text-slate-500">/ day</span></p><a href={`https://wa.me/263783935399?text=${encodeURIComponent(`Hello TC Motors, I would like to hire the ${rental.name} in ${rental.location}.`)}`} target="_blank" rel="noreferrer" className="rounded-lg border-2 border-[#071a35] px-4 py-2 text-sm font-bold text-[#071a35] transition hover:bg-[#071a35] hover:text-white">Hire now</a></div></div></article>)}</div>
      </section>
      <section className="bg-[#dfe8f6] px-4 py-12 md:px-8"><div className="mx-auto grid max-w-7xl gap-6 text-center md:grid-cols-3 md:text-left"><div><ShieldCheck className="mx-auto h-9 w-9 text-[#b51f32] md:mx-0" /><h3 className="mt-3 text-xl font-black">Trusted and insured</h3><p className="mt-2 text-slate-700">Clear hire terms and comprehensive cover for peace of mind.</p></div><div><CalendarDays className="mx-auto h-9 w-9 text-[#1762a8] md:mx-0" /><h3 className="mt-3 text-xl font-black">Flexible rentals</h3><p className="mt-2 text-slate-700">Daily, weekly or monthly hire with practical support.</p></div><div><Star className="mx-auto h-9 w-9 text-[#b51f32] md:mx-0" /><h3 className="mt-3 text-xl font-black">Local support</h3><p className="mt-2 text-slate-700">Zimbabwe-based assistance when you need it.</p></div></div></section>
      <Footer />
    </main>
  )
}
