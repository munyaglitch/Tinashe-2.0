"use client"

import { useMemo, useState } from "react"
import { ArrowRight, BadgeCheck, CarFront, Check, ChevronDown, Clock3, Download, Gauge, HandCoins, ShieldCheck, WalletCards } from "lucide-react"
import { vehicles } from "@/components/vehicle-grid"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"

const money = new Intl.NumberFormat("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 0 })
const aquaImage = "/images/aqua-example.png"
const categories = [
  { name: "Indrive vehicles", price: 6500, description: "Aqua · Vitz · Swift · Fit" },
  { name: "Fuel savers", price: 6500, description: "Efficient daily drivers" },
  { name: "Mini SUV", price: 13000, description: "Compact and capable" },
  { name: "SUV / 4x4", price: 16000, description: "More room, more confidence" },
  { name: "Luxury", price: 20000, description: "Premium vehicles" },
  { name: "Buses & kombis", price: 8000, description: "Built for more passengers" },
  { name: "Heavy machinery", price: 15000, description: "Work-ready equipment" },
]

export default function DriveToOwnPage() {
  const [months, setMonths] = useState(12)
  const [packageType, setPackageType] = useState<"a" | "b">("a")
  const [condition, setCondition] = useState<"new" | "used">("new")
  const [category, setCategory] = useState(categories[0].name)
  const [budget, setBudget] = useState(String(categories[0].price))
  const [selectedVehicle, setSelectedVehicle] = useState<(typeof vehicles)[number] | null>(null)
  const price = selectedVehicle?.price ?? Math.max(4000, Number(budget) || 4000)
  const vehicleName = selectedVehicle?.name ?? "2018 Toyota Aqua Hybrid"
  const vehicleImage = selectedVehicle?.image ?? aquaImage
  const depositRate = packageType === "a" ? 0.2 : condition === "new" ? 0.25 : 0.3
  const deposit = price * depositRate
  const balance = price - deposit
  const monthlyInterestRate = packageType === "a" ? 0.1 : 0.05
  const totalPayable = balance + balance * monthlyInterestRate * months
  const monthlyPayment = totalPayable / months
  const savings = Math.max(0, 300 - (months - 1) * 20)

  const summary = useMemo(() => [
    ["Vehicle price", money.format(price)],
    ["Deposit", `${Math.round(depositRate * 100)}% · ${money.format(deposit)}`],
    ["Repayment period", `${months} months`],
    ["Interest", `${packageType === "a" ? "10%" : "5%"} / month on remaining balance`],
    ["Total payable", money.format(totalPayable)],
  ], [deposit, depositRate, months, totalPayable])

  function downloadDetails() {
    const canvas = document.createElement("canvas")
    canvas.width = 1200
    canvas.height = 1600
    const context = canvas.getContext("2d")
    if (!context) return
    context.fillStyle = "#ffffff"
    context.fillRect(0, 0, canvas.width, canvas.height)
    context.fillStyle = "#1762a8"
    context.fillRect(0, 0, canvas.width, 18)
    const logo = new Image()
    const vehicle = new Image()
    logo.crossOrigin = "anonymous"
    vehicle.crossOrigin = "anonymous"
    let loaded = 0
    const render = () => {
      loaded += 1
      if (loaded !== 2) return
      context.drawImage(logo, 70, 55, 260, 130)
      context.fillStyle = "#1762a8"
      context.font = "bold 25px Arial"
      context.textAlign = "right"
      context.fillText("SELECTED OPTION", 1125, 105)
      context.textAlign = "center"
      context.font = "bold 52px Arial"
      context.fillStyle = "#102b55"
      context.fillText(vehicleName, 600, 760)
      context.font = "bold 72px Arial"
      context.fillStyle = "#1762a8"
      context.fillText(money.format(price), 600, 845)
      context.font = "28px Arial"
      context.fillStyle = "#102b55"
      context.fillText(`${packageType === "a" ? "Package A · 20% deposit" : `Package B · ${condition === "new" ? "25% new" : "30% used"}`} · ${months} months`, 600, 900)
      const imageRatio = vehicle.width / vehicle.height
      const imageBox = { x: 90, y: 215, width: 1020, height: 500 }
      const drawWidth = Math.min(imageBox.width, imageBox.height * imageRatio)
      const drawHeight = drawWidth / imageRatio
      context.drawImage(vehicle, imageBox.x + (imageBox.width - drawWidth) / 2, imageBox.y + (imageBox.height - drawHeight) / 2, drawWidth, drawHeight)
      const cards = [["REPAYMENT PERIOD", `${months} months`], ["MONTHLY PAYMENT", money.format(monthlyPayment)], ["TOTAL PAYABLE", money.format(totalPayable)]]
      cards.forEach(([label, value], index) => { const x = 55 + index * 370; context.fillStyle = "#f4f8fb"; context.strokeStyle = "#9ab4ca"; context.lineWidth = 2; context.roundRect(x, 970, 330, 150, 14); context.fill(); context.stroke(); context.fillStyle = "#102b55"; context.font = "bold 20px Arial"; context.fillText(label, x + 165, 1020); context.font = "bold 34px Arial"; context.fillText(value, x + 165, 1080) })
      context.fillStyle = "#1762a8"
      context.roundRect(55, 1160, 1090, 82, 14)
      context.fill()
      context.fillStyle = "#ffffff"
      context.font = "bold 29px Arial"
      context.fillText(`${packageType === "a" ? "10% monthly interest" : "5% monthly interest"} on remaining balance · Deposit ${money.format(deposit)}`, 600, 1212)
      context.fillStyle = "#102b55"
      context.font = "bold 24px Arial"
      context.fillText("Hybrid · Fuel efficient · Automatic · Inspected", 600, 1310)
      context.font = "24px Arial"
      context.fillText("Contact TC Motors · +263 78 393 5399", 600, 1370)
      context.font = "20px Arial"
      context.fillStyle = "#5b6b7d"
      context.fillText("Figures are estimates and subject to approval.", 600, 1435)
      canvas.toBlob((blob) => { if (!blob) return; const url = URL.createObjectURL(blob); const link = document.createElement("a"); link.href = url; link.download = "tc-motors-drive-to-own.png"; link.click(); URL.revokeObjectURL(url) }, "image/png")
    }
    logo.onload = render
    vehicle.onload = render
    logo.src = "/icon.svg"
    vehicle.src = vehicleImage
  }

  return (
    <main className="min-h-screen bg-[#071a35] text-white">
      <Header />
      <section className="relative overflow-hidden border-b border-white/10 bg-[#071a35] px-4 pb-16 pt-20 md:pb-24 md:pt-28">
        <div className="mx-auto grid max-w-7xl items-center gap-12 lg:grid-cols-[1fr_380px]">
          <div className="max-w-2xl">
            <div className="mb-6 inline-flex items-center gap-2 rounded-lg border border-primary/30 bg-primary/10 px-4 py-2 text-xs font-semibold uppercase tracking-[.22em] text-primary">Drive-to-own financing</div>
            <h1 className="text-5xl font-semibold leading-[.98] tracking-[-.04em] md:text-7xl">Your car.<br /><span className="text-[#e33a45]">Your way.</span></h1>
            <p className="mt-7 max-w-xl text-lg leading-8 text-slate-300 md:text-xl">Choose the payment plan that works for you and see your estimated monthly payment instantly.</p>
            <a href="#calculator" className="mt-9 inline-flex items-center gap-3 rounded-full bg-[#e33a45] px-6 py-3.5 text-sm font-bold shadow-[0_10px_30px_rgba(227,58,69,.3)] transition hover:-translate-y-0.5 hover:bg-[#f04a55]">Calculate your payment <ArrowRight className="h-4 w-4" /></a>
            <div className="mt-12 flex flex-wrap gap-6 text-sm text-slate-300"><span className="flex items-center gap-2"><ShieldCheck className="h-5 w-5 text-[#f3bd54]" /> Trusted local dealer</span><span className="flex items-center gap-2"><Clock3 className="h-5 w-5 text-[#f3bd54]" /> 1–12 month terms</span></div>
          </div>
          <aside className="hidden rounded-2xl border border-white/15 bg-white/[.06] p-6 shadow-xl backdrop-blur-sm lg:block" aria-label="Drive-to-own highlights"><div className="flex items-center justify-between border-b border-white/10 pb-5"><div><p className="text-xs font-semibold uppercase tracking-[.2em] text-[#f3bd54]">Built for you</p><p className="mt-2 text-2xl font-semibold">Own it your way.</p></div><CarFront className="h-8 w-8 text-[#e33a45]" /></div><div className="space-y-5 pt-5"><div className="flex gap-3"><div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[#e33a45]/15 text-sm font-bold text-[#f56b73]">01</div><div><p className="font-semibold">Choose a vehicle</p><p className="mt-1 text-sm leading-6 text-slate-400">Start with the car that fits your plans.</p></div></div><div className="flex gap-3"><div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[#e33a45]/15 text-sm font-bold text-[#f56b73]">02</div><div><p className="font-semibold">Pick your pace</p><p className="mt-1 text-sm leading-6 text-slate-400">Compare clear 1–12 month repayment options.</p></div></div><div className="flex gap-3"><div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[#e33a45]/15 text-sm font-bold text-[#f56b73]">03</div><div><p className="font-semibold">Drive away</p><p className="mt-1 text-sm leading-6 text-slate-400">Apply with confidence and get moving.</p></div></div></div></aside>
        </div>
      </section>

      <section id="calculator" className="mx-auto grid max-w-7xl scroll-mt-24 gap-10 bg-[#071a35] px-4 py-16 md:py-24 lg:grid-cols-2 lg:items-start">
        <div className="space-y-8">
          <div><p className="text-sm font-bold uppercase tracking-[.25em] text-[#e55b63]">Choose your route</p><h2 className="mt-3 text-3xl font-semibold tracking-tight md:text-4xl">Simple plans, clear numbers.</h2><p className="mt-4 leading-7 text-slate-400">Choose a vehicle category or enter your own budget. Your estimate updates instantly.</p></div>
          <div className="rounded-xl border border-white/10 bg-[#0b2444] p-6"><div className="flex items-center justify-between gap-3"><div><p className="text-lg font-semibold">Choose your vehicle category</p><p className="mt-1 text-sm text-slate-400">Choose a vehicle first, then select your package and repayment period.</p></div><CarFront className="h-6 w-6 text-[#f3bd54]" /></div><label className="mt-6 block text-sm font-semibold" htmlFor="inventory-vehicle">Choose from available vehicles</label><select id="inventory-vehicle" value={selectedVehicle?.id ?? ""} onChange={(event) => { const vehicle = vehicles.find((item) => String(item.id) === event.target.value) ?? null; setSelectedVehicle(vehicle); if (vehicle) setBudget(String(vehicle.price)) }} className="mt-2 w-full rounded-lg border border-white/15 bg-[#071a35] px-4 py-3 text-sm text-white outline-none focus:border-[#e33a45]"><option value="">Choose a vehicle to begin</option>{vehicles.map((vehicle) => <option key={vehicle.id} value={vehicle.id}>{vehicle.name} · {money.format(vehicle.price)}</option>)}</select><div className="mt-6 grid grid-cols-2 gap-4 sm:grid-cols-3">{categories.map((item) => <button type="button" key={item.name} onClick={() => { setSelectedVehicle(null); setCategory(item.name); setBudget(String(item.price)) }} className={`rounded-lg border p-4 text-left transition ${category === item.name ? "border-[#e33a45] bg-[#e33a45]/15 shadow-[0_8px_24px_rgba(227,58,69,.15)]" : "border-white/10 bg-[#071a35]/50 hover:border-white/25"}`}><CarFront className={`h-5 w-5 ${category === item.name ? "text-[#f56b73]" : "text-slate-400"}`} /><p className="mt-3 text-sm font-semibold capitalize">{item.name}</p><p className="mt-1 text-xs text-slate-400">From {money.format(item.price)}</p></button>)}</div><label className="mt-5 block text-sm font-semibold" htmlFor="vehicle-budget">Or enter your own budget</label><div className="mt-2 flex items-center rounded-xl border border-white/15 bg-[#071a35] px-4 focus-within:border-[#e33a45]"><span className="text-xl text-[#f56b73]">$</span><input id="vehicle-budget" inputMode="numeric" type="number" min="4000" step="100" value={budget} onChange={(event) => { setSelectedVehicle(null); setBudget(event.target.value); setCategory("custom") }} className="w-full bg-transparent px-3 py-3 text-xl font-semibold outline-none" aria-describedby="budget-help" /><span className="text-xs text-slate-500">USD</span></div><p id="budget-help" className="mt-2 text-xs text-slate-500">Any amount from $4,000 qualifies.</p></div>
          <PlanCard selected={packageType === "a"} onClick={() => { setPackageType("a"); setMonths(12) }} title="Package A — 20%" label="Standard" copy="Available for all eligible vehicles. A straightforward way to get moving." points={["Flexible repayment period", "12-month repayment period", "Simple payment structure"]} />
          <PlanCard selected={packageType === "b"} onClick={() => { setPackageType("b"); setMonths(36) }} title="Package B — 30% used / 25% new" label="Flexible" copy="Designed for faster approval with options for both new and used vehicles." points={["30% option for used vehicles", "25% option for new vehicles", "36-month repayment period · 5% monthly interest"]} />
          <div className="flex gap-4 rounded-xl border border-[#f3bd54]/30 bg-[#f3bd54]/10 p-6"><div className="rounded-xl bg-[#f3bd54]/20 p-3 text-[#f3bd54]"><HandCoins className="h-6 w-6" /></div><div><p className="font-semibold">Pay fast. Save more.</p><p className="mt-1 text-sm leading-6 text-slate-400">Shorter repayment periods can save up to <span className="font-semibold text-[#f3bd54]">$300 in fees.</span></p></div></div>
        </div>

        <div className="lg:sticky lg:top-24 lg:self-start"><div className="overflow-hidden rounded-xl border border-white/15 bg-[#0c284b] shadow-xl" id="calculator-card"><div className="border-b border-white/10 bg-[#0c284b] p-6 md:p-8"><div className="overflow-hidden rounded-xl border border-white/10 bg-white"><div className="flex items-center justify-between gap-4 px-4 pt-4"><img src="/images/tc-car-sales-logo.png" alt="TC Motors" className="h-12 w-auto object-contain" /><span className="rounded-full bg-[#1762a8] px-3 py-1 text-[10px] font-bold uppercase tracking-[.12em] text-white">{selectedVehicle ? "Selected vehicle" : "Example only"}</span></div><div className="bg-white px-4 pt-4"><img src={vehicleImage} alt={vehicleName} className="mx-auto h-auto max-h-64 w-full object-contain object-center sm:max-h-80" /></div><div className="p-5 text-[#071a35]"><p className="text-xs font-bold uppercase tracking-[.18em] text-[#b51f32]">{selectedVehicle ? "Selected vehicle" : "Example vehicle"}</p><h2 className="mt-1 text-2xl font-semibold">{vehicleName}</h2><p className="mt-1 text-sm text-slate-600">{selectedVehicle ? `Vehicle price · ${money.format(price)}` : "Example price · $8,000"}</p><div className="mt-4 grid grid-cols-2 gap-3 border-t border-slate-200 pt-4 text-sm"><div><p className="text-xs text-slate-500">Type</p><p className="font-semibold capitalize">{selectedVehicle?.bodyType ?? "Hybrid hatchback"}</p></div><div><p className="text-xs text-slate-500">Year</p><p className="font-semibold">{selectedVehicle?.year ?? "2018"}</p></div><div><p className="text-xs text-slate-500">Fuel</p><p className="font-semibold">{selectedVehicle?.fuel ?? "Fuel efficient"}</p></div><div><p className="text-xs text-slate-500">Mileage</p><p className="font-semibold">{selectedVehicle?.mileage ?? "Low mileage"}</p></div></div><p className="mt-4 text-xs leading-5 text-slate-500">{selectedVehicle ? "Your selected vehicle is ready. Choose a package and repayment period below." : "This Aqua is a visual example only. Choose a vehicle from the inventory above or enter your own budget below."}</p></div></div><div className="mt-7 flex items-end justify-between"><div><p className="text-sm text-slate-400">Repayment period</p><p className="mt-1 text-3xl font-bold text-[#f3bd54]">{months} <span className="text-lg font-medium text-slate-300">months</span></p></div><span className="rounded-full bg-white/10 px-3 py-1.5 text-xs text-slate-300">1–12 months</span></div><input aria-label="Repayment period in months" type="range" min="1" max="12" value={months} onChange={(e) => setMonths(Number(e.target.value))} className="mt-6 h-2 w-full cursor-pointer accent-[#e33a45]" /><div className="mt-2 flex justify-between text-xs text-slate-500"><span>1 month</span><span>12 months</span></div></div>
          <div className="p-6 md:p-8"><div className="flex rounded-xl bg-[#071a35] p-1"><button onClick={() => setPackageType("a")} className={`flex-1 rounded-lg px-4 py-3 text-sm font-semibold transition ${packageType === "a" ? "bg-[#e33a45] text-white shadow" : "text-slate-400 hover:text-white"}`}>Package A · 20%</button><button onClick={() => setPackageType("b")} className={`flex-1 rounded-lg px-4 py-3 text-sm font-semibold transition ${packageType === "b" ? "bg-[#e33a45] text-white shadow" : "text-slate-400 hover:text-white"}`}>Package B</button></div>{packageType === "b" && <div className="mt-4 flex gap-2"><button onClick={() => setCondition("new")} className={`flex-1 rounded-lg border px-3 py-2 text-sm ${condition === "new" ? "border-[#f3bd54] bg-[#f3bd54]/10 text-[#f3bd54]" : "border-white/10 text-slate-400"}`}>New · 25%</button><button onClick={() => setCondition("used")} className={`flex-1 rounded-lg border px-3 py-2 text-sm ${condition === "used" ? "border-[#f3bd54] bg-[#f3bd54]/10 text-[#f3bd54]" : "border-white/10 text-slate-400"}`}>Used · 30%</button></div>}
            <div className="mt-7 rounded-2xl bg-gradient-to-br from-[#e33a45] to-[#b51f32] p-6"><p className="text-sm text-white/75">Estimated monthly payment</p><p className="mt-2 text-5xl font-semibold tracking-tight">{money.format(monthlyPayment)}<span className="text-base font-medium text-white/70"> / month</span></p></div><div className="mt-6 grid gap-4 sm:grid-cols-2">{summary.map(([label, value]) => <div key={label}><p className="text-xs text-slate-500">{label}</p><p className="mt-1 text-sm font-semibold text-slate-200">{value}</p></div>)}<div><p className="text-xs text-slate-500">Estimated savings</p><p className="mt-1 text-sm font-semibold text-[#f3bd54]">{money.format(savings)}</p></div></div><div className="mt-7 flex flex-col gap-3 sm:flex-row"><a href={`https://wa.me/263783935399?text=${encodeURIComponent(`Hello TC Motors, I would like to apply for Drive-to-Own. Vehicle budget: ${money.format(price)}. Package: ${packageType === "a" ? "Package A (20% deposit)" : `Package B (${condition === "new" ? "25% new" : "30% used"})`}. Repayment period: ${months} months. Estimated monthly payment: ${money.format(monthlyPayment)}.`)}`} target="_blank" rel="noreferrer" className="flex flex-1 items-center justify-center gap-2 rounded-xl bg-white px-5 py-3.5 text-sm font-bold text-[#071a35] transition hover:bg-slate-100">Apply on WhatsApp <ArrowRight className="h-4 w-4" /></a><button onClick={downloadDetails} className="flex flex-1 items-center justify-center gap-2 rounded-xl border border-white/20 px-5 py-3.5 text-sm font-semibold transition hover:bg-white/10"><Download className="h-4 w-4" /> Download details</button></div><p className="mt-6 text-xs leading-5 text-slate-500">Package A uses a 20% deposit with 10% interest per month on the remaining balance. Package B uses its applicable deposit option without the Package A interest calculation. Final repayment amounts, eligibility and approval are subject to TC Motors&apos; confirmation.</p></div></div></div>
      </section>


      <section className="mx-auto max-w-7xl px-4 py-16 md:py-24"><div className="mx-auto max-w-3xl text-center"><p className="text-sm font-bold uppercase tracking-[.25em] text-[#e55b63]">The process</p><h2 className="mt-3 text-3xl font-semibold">How Drive-to-Own works</h2></div><div className="mt-12 grid gap-6 md:grid-cols-3">{[["01", "Choose your car", "Find the vehicle you want from Tinashe Car Sale.", CarFront], ["02", "Choose your plan", "Select your package and repayment period.", WalletCards], ["03", "Apply & drive", "Submit your details, get reviewed, and complete the process.", Gauge]].map(([number, title, copy, Icon]) => <div key={number} className="rounded-2xl border border-white/10 bg-white/[.04] p-6"><div className="flex items-center justify-between"><Icon className="h-7 w-7 text-[#f3bd54]" /><span className="text-sm font-semibold text-[#e33a45]">{number}</span></div><h3 className="mt-8 text-xl font-semibold">{title as string}</h3><p className="mt-2 leading-7 text-slate-400">{copy as string}</p></div>)}</div></section>

      <section className="bg-[#0a2242] px-4 py-16"><div className="mx-auto max-w-3xl"><div className="text-center"><p className="text-sm font-bold uppercase tracking-[.25em] text-[#e55b63]">Good to know</p><h2 className="mt-3 text-3xl font-semibold">Frequently asked questions</h2></div><div className="mt-10 divide-y divide-white/10 rounded-2xl border border-white/10 bg-[#071a35] px-6">{[["How long can I repay over?", "Customers can choose a repayment period from 1–12 months, subject to approval and the selected plan."], ["Can I use Drive-to-Own for used cars?", "Yes, eligible used vehicles can qualify under the Package B used-vehicle option."], ["Can I pay earlier?", "Yes. Faster repayment may reduce applicable fees depending on the selected plan."], ["Are these calculations final?", "No. Calculator figures are estimates. Final figures are confirmed during the application and approval process."]].map(([question, answer]) => <details key={question} className="group py-5"><summary className="flex cursor-pointer list-none items-center justify-between font-semibold">{question}<ChevronDown className="h-5 w-5 text-slate-500 transition group-open:rotate-180" /></summary><p className="mt-3 max-w-2xl leading-7 text-slate-400">{answer}</p></details>)}</div></div></section>
      <Footer />
    </main>
  )
}

function PlanCard({ selected, onClick, title, label, copy, points }: { selected: boolean; onClick: () => void; title: string; label: string; copy: string; points: string[] }) {
  return <button type="button" onClick={onClick} className={`w-full rounded-2xl border p-6 text-left transition ${selected ? "border-[#e33a45] bg-[#e33a45]/10 shadow-[0_12px_40px_rgba(227,58,69,.12)]" : "border-white/10 bg-white/[.04] hover:border-white/25"}`}><div className="flex items-start justify-between gap-4"><div><span className={`rounded-full px-2.5 py-1 text-[10px] font-bold uppercase tracking-[.18em] ${selected ? "bg-[#e33a45] text-white" : "bg-white/10 text-slate-400"}`}>{label}</span><h3 className="mt-4 text-xl font-semibold">{title}</h3></div><div className={`rounded-full border p-1.5 ${selected ? "border-[#e33a45] bg-[#e33a45]" : "border-white/20"}`}><Check className="h-4 w-4" /></div></div><p className="mt-3 text-sm leading-6 text-slate-400">{copy}</p><ul className="mt-5 space-y-2">{points.map((point) => <li key={point} className="flex items-center gap-2 text-sm text-slate-300"><BadgeCheck className="h-4 w-4 text-[#f3bd54]" />{point}</li>)}</ul><p className="mt-5 text-sm font-semibold text-[#f3bd54]">Calculate with this package <ArrowRight className="ml-1 inline h-4 w-4" /></p></button>
}
