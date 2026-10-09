"use client"

import { useState } from "react"
import { CalendarDays, CheckCircle2, Clock3, Phone, Search, ShieldCheck, Star } from "lucide-react"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"

export default function DriveZimToHirePage() {
  const [location, setLocation] = useState("Harare")
  const [pickupDate, setPickupDate] = useState("")
  const [dropoffDate, setDropoffDate] = useState("")
  const [submitted, setSubmitted] = useState(false)

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
          <div className="relative flex min-h-[290px] items-center justify-center lg:block" aria-label="Drive Zim Hire coming soon"><div className="absolute inset-8 rounded-3xl border border-white/15 bg-white/[.06]" /><div className="relative mx-auto max-w-sm rounded-2xl border border-[#b51f32]/60 bg-[#071a35]/90 p-8 text-center shadow-2xl"><Clock3 className="mx-auto h-12 w-12 text-[#f3bd54]" /><p className="mt-5 text-sm font-bold uppercase tracking-[.25em] text-[#f3bd54]">Coming soon</p><h2 className="mt-2 text-3xl font-black">Car hire is on the way</h2><p className="mt-3 text-sm leading-6 text-slate-300">We are preparing a reliable Zimbabwe-wide rental service for you.</p></div></div>
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

      <section className="bg-white px-4 py-16 md:px-8 md:py-24"><div className="mx-auto max-w-4xl rounded-3xl border border-[#1762a8]/20 bg-[#f5f7fb] px-6 py-12 text-center shadow-sm md:px-12"><Clock3 className="mx-auto h-10 w-10 text-[#b51f32]" /><p className="mt-5 text-sm font-bold uppercase tracking-[.25em] text-[#b51f32]">Coming soon</p><h2 className="mt-3 text-3xl font-black text-[#071a35] md:text-4xl">Drive Zim Hire is almost ready.</h2><p className="mx-auto mt-4 max-w-2xl leading-7 text-slate-600">Our rental fleet and booking process are being prepared. Soon you will be able to hire trusted vehicles across Zimbabwe with clear daily pricing and local support.</p><a href="https://wa.me/263783935399?text=Hello%20TC%20Motors%2C%20I%20would%20like%20to%20be%20notified%20when%20Drive%20Zim%20Hire%20is%20available." target="_blank" rel="noreferrer" className="mt-7 inline-flex items-center gap-2 rounded-lg bg-[#b51f32] px-6 py-3 font-bold text-white transition hover:bg-[#921b2a]"><Phone className="h-4 w-4" />Get notified on WhatsApp</a></div></section>
      <section className="bg-[#dfe8f6] px-4 py-12 md:px-8"><div className="mx-auto grid max-w-7xl gap-6 text-center md:grid-cols-3 md:text-left"><div><ShieldCheck className="mx-auto h-9 w-9 text-[#b51f32] md:mx-0" /><h3 className="mt-3 text-xl font-black">Trusted and insured</h3><p className="mt-2 text-slate-700">Clear hire terms and comprehensive cover for peace of mind.</p></div><div><CalendarDays className="mx-auto h-9 w-9 text-[#1762a8] md:mx-0" /><h3 className="mt-3 text-xl font-black">Flexible rentals</h3><p className="mt-2 text-slate-700">Daily, weekly or monthly hire with practical support.</p></div><div><Star className="mx-auto h-9 w-9 text-[#b51f32] md:mx-0" /><h3 className="mt-3 text-xl font-black">Local support</h3><p className="mt-2 text-slate-700">Zimbabwe-based assistance when you need it.</p></div></div></section>
      <Footer />
    </main>
  )
}
