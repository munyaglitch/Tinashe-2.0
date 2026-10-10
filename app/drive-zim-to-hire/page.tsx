"use client"

import { useMemo, useState } from "react"
import { CalendarDays, CheckCircle2, Clock3, MapPin, ShieldCheck } from "lucide-react"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { getHireCategory, hireCategories, vehicles } from "@/components/vehicle-grid"

const money = new Intl.NumberFormat("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 0 })

export default function DriveZimToHirePage() {
  const [category, setCategory] = useState("fuel-savers")
  const [days, setDays] = useState(3)
  const selectedCategory = hireCategories.find((item) => item.id === category) ?? hireCategories[0]
  const availableVehicles = useMemo(() => vehicles.filter((vehicle) => getHireCategory(vehicle).id === category), [category])
  const deposit = selectedCategory.rate < 200 ? 200 : selectedCategory.rate

  return (
    <main className="min-h-screen bg-white text-[#071a35]">
      <Header />
      <section className="bg-[#1762a8] px-4 py-16 text-white md:px-8 md:py-24">
        <div className="mx-auto max-w-7xl">
          <p className="text-sm font-bold uppercase tracking-[.25em] text-white/80">TC Motors rental service</p>
          <h1 className="mt-4 max-w-3xl text-4xl font-black tracking-tight md:text-6xl">Hire a vehicle in Zimbabwe</h1>
          <p className="mt-5 max-w-2xl text-lg leading-8 text-white/85">Choose a hire category, see the matching vehicles from our existing inventory, and plan your rental with a clear daily rate.</p>
          <div className="mt-10 grid gap-4 rounded-2xl bg-white p-4 text-[#071a35] shadow-2xl md:grid-cols-[1fr_180px_auto] md:items-end md:p-5">
            <label className="text-sm font-bold">Hire category<select value={category} onChange={(event) => setCategory(event.target.value)} className="mt-2 w-full rounded-lg border border-slate-200 bg-white px-3 py-3 font-semibold outline-none focus:border-[#b51f32]">{hireCategories.map((item) => <option key={item.id} value={item.id}>{item.label} · from {money.format(item.rate)}/day</option>)}</select></label>
            <label className="text-sm font-bold">Rental days<input type="number" min="1" max="60" value={days} onChange={(event) => setDays(Math.max(1, Number(event.target.value) || 1))} className="mt-2 w-full rounded-lg border border-slate-200 px-3 py-3 outline-none focus:border-[#b51f32]" /></label>
            <div className="rounded-lg bg-[#f0f5fb] px-4 py-3 text-sm"><p className="font-bold">Security deposit</p><p className="mt-1 text-[#1762a8]">{money.format(deposit)} refundable</p></div>
          </div>
          <div className="mt-5 flex flex-wrap gap-3 text-sm font-bold"><span className="inline-flex items-center gap-2 rounded-full bg-white/15 px-4 py-2"><ShieldCheck className="h-4 w-4" />Deposit held securely</span><span className="inline-flex items-center gap-2 rounded-full bg-white/15 px-4 py-2"><CheckCircle2 className="h-4 w-4" />Refunded after inspection</span><span className="inline-flex items-center gap-2 rounded-full bg-white/15 px-4 py-2"><Clock3 className="h-4 w-4" />Clear daily pricing</span></div>
        </div>
      </section>
      <section className="bg-[#f5f7fb] px-4 py-14 md:px-8 md:py-20"><div className="mx-auto max-w-7xl"><div className="flex flex-col justify-between gap-4 md:flex-row md:items-end"><div><p className="text-sm font-bold uppercase tracking-[.2em] text-[#b51f32]">Our hire categories</p><h2 className="mt-2 text-3xl font-black md:text-4xl">Choose the right vehicle for your trip</h2><p className="mt-2 text-slate-600">{selectedCategory.tag} · {days}-day estimate from {money.format(selectedCategory.rate * days)}</p></div><p className="text-sm font-semibold text-slate-500">{availableVehicles.length} matching vehicles</p></div><div className="mt-6 flex flex-wrap gap-2">{hireCategories.map((item) => <button key={item.id} type="button" onClick={() => setCategory(item.id)} className={`rounded-full px-4 py-2 text-sm font-bold transition ${category === item.id ? "bg-[#b51f32] text-white" : "bg-white text-[#071a35] ring-1 ring-slate-200 hover:ring-[#1762a8]"}`}>{item.label} · ${item.rate}/day</button>)}</div><div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">{availableVehicles.map((vehicle) => <article key={vehicle.id} className="overflow-hidden rounded-2xl bg-white shadow-sm ring-1 ring-slate-200"><div className="h-52 bg-white p-3"><img src={vehicle.image} alt={vehicle.name} className="h-full w-full object-contain" /></div><div className="border-t border-slate-100 p-5"><span className="rounded-full bg-[#e8f1fb] px-3 py-1 text-xs font-bold text-[#1762a8]">{selectedCategory.label}</span><h3 className="mt-3 text-xl font-black">{vehicle.name}</h3><p className="mt-2 flex items-center gap-2 text-sm text-slate-500"><MapPin className="h-4 w-4 text-[#b51f32]" />Harare · {vehicle.year} · {vehicle.fuel}</p><div className="mt-5 flex items-end justify-between border-t border-slate-100 pt-4"><div><p className="text-2xl font-black text-[#b51f32]">{money.format(selectedCategory.rate)}<span className="text-sm font-medium text-slate-500"> / day</span></p><p className="text-xs text-slate-500">Deposit {money.format(deposit)}</p></div><a href={`https://wa.me/263783935399?text=${encodeURIComponent(`Hello TC Motors, I want to hire the ${vehicle.name} for ${days} days.`)}`} target="_blank" rel="noreferrer" className="rounded-lg bg-[#1762a8] px-4 py-2 text-sm font-bold text-white hover:bg-[#0d4f91]">Enquire</a></div></div></article>)}</div></div></section>
      <Footer />
    </main>
  )
}
