"use client"

import { useMemo, useState } from "react"
import { ArrowRight, BadgeCheck, CarFront, Check, ChevronDown, Clock3, Download, FileText, Gauge, HandCoins, ShieldCheck, Sparkles, WalletCards } from "lucide-react"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"

const planVisuals = [
  { months: "1 month", title: "Pay fast, save more", image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/tc5-6V4ROe7yHceBmHO672Jd22J71tPvfQ.jpeg" },
  { months: "2 months", title: "Flexible and affordable", image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/tc1-SiVp8hik52heyNLg8VZOGmGYVivXr9.jpeg" },
  { months: "3 months", title: "A plan that moves with you", image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/tc2-XGRAZvBCLkPH2N37dlBvhHvt9uQUbp.jpeg" },
  { months: "4 months", title: "Own your car with confidence", image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/tc3-H5zN0M2nFbGG9KH7W04n73oawdkN45.jpeg" },
]

const money = new Intl.NumberFormat("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 0 })

export default function DriveToOwnPage() {
  const [months, setMonths] = useState(6)
  const [packageType, setPackageType] = useState<"a" | "b">("a")
  const [condition, setCondition] = useState<"new" | "used">("new")
  const price = 8000
  const depositRate = packageType === "a" ? 0.2 : condition === "new" ? 0.25 : 0.3
  const deposit = price * depositRate
  const balance = price - deposit
  const rate = packageType === "a" ? 0.2 : condition === "new" ? 0.25 : 0.3
  const totalPayable = balance + balance * rate
  const monthlyPayment = totalPayable / months
  const savings = Math.max(0, 300 - (months - 1) * 20)

  const summary = useMemo(() => [
    ["Vehicle price", money.format(price)],
    ["Deposit", `${Math.round(depositRate * 100)}% · ${money.format(deposit)}`],
    ["Repayment period", `${months} months`],
    ["Total payable", money.format(totalPayable)],
  ], [deposit, depositRate, months, totalPayable])

  function downloadDetails() {
    const text = `TINASHE CAR SALE · DRIVE-TO-OWN\n\nVehicle: 2018 Toyota Aqua Hybrid\nVehicle price: ${money.format(price)}\nPackage: ${packageType === "a" ? "Package A · 20%" : `Package B · ${condition === "new" ? "25% New" : "30% Used"}`}\nRepayment period: ${months} months\nEstimated monthly payment: ${money.format(monthlyPayment)}\nTotal payable: ${money.format(totalPayable)}\nEstimated savings: ${money.format(savings)}\n\nFigures are estimates and subject to approval.`
    const blob = new Blob([text], { type: "text/plain" })
    const url = URL.createObjectURL(blob)
    const link = document.createElement("a")
    link.href = url
    link.download = "tinashe-drive-to-own-summary.txt"
    link.click()
    URL.revokeObjectURL(url)
  }

  return (
    <main className="min-h-screen bg-[#071a35] text-white">
      <Header />
      <section className="relative overflow-hidden border-b border-white/10 bg-[radial-gradient(circle_at_80%_10%,rgba(218,39,51,.25),transparent_35%),linear-gradient(135deg,#071a35,#0b2a50)] px-4 pb-16 pt-20 md:pb-24 md:pt-28">
        <div className="mx-auto grid max-w-7xl items-center gap-12 lg:grid-cols-[1.05fr_.95fr]">
          <div className="max-w-2xl">
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-[#e33a45]/40 bg-[#e33a45]/10 px-4 py-2 text-xs font-semibold uppercase tracking-[.22em] text-[#ff8589]"><Sparkles className="h-4 w-4" /> Drive-to-own financing</div>
            <h1 className="text-5xl font-semibold leading-[.98] tracking-[-.04em] md:text-7xl">Your car.<br /><span className="text-[#e33a45]">Your way.</span></h1>
            <p className="mt-7 max-w-xl text-lg leading-8 text-slate-300 md:text-xl">Choose the payment plan that works for you and see your estimated monthly payment instantly.</p>
            <a href="#calculator" className="mt-9 inline-flex items-center gap-3 rounded-full bg-[#e33a45] px-6 py-3.5 text-sm font-bold shadow-[0_10px_30px_rgba(227,58,69,.3)] transition hover:-translate-y-0.5 hover:bg-[#f04a55]">Calculate your payment <ArrowRight className="h-4 w-4" /></a>
            <div className="mt-12 flex flex-wrap gap-6 text-sm text-slate-300"><span className="flex items-center gap-2"><ShieldCheck className="h-5 w-5 text-[#f3bd54]" /> Trusted local dealer</span><span className="flex items-center gap-2"><Clock3 className="h-5 w-5 text-[#f3bd54]" /> 1–12 month terms</span></div>
          </div>
          <div className="relative overflow-hidden rounded-[2rem] border border-white/15 bg-white/10 p-3 shadow-2xl backdrop-blur"><img src={planVisuals[2].image} alt="Tinashe Car Sale three month drive-to-own plan" className="h-[360px] w-full rounded-[1.5rem] object-cover object-top opacity-90 md:h-[480px]" /><div className="absolute inset-x-8 bottom-8 rounded-2xl border border-white/20 bg-[#071a35]/85 p-5 backdrop-blur"><p className="text-xs font-semibold uppercase tracking-[.2em] text-[#f3bd54]">Example vehicle</p><p className="mt-1 text-xl font-semibold">2018 Toyota Aqua Hybrid</p><p className="mt-1 text-sm text-slate-300">From a $8,000 vehicle example</p></div></div>
        </div>
      </section>

      <section id="calculator" className="mx-auto grid max-w-7xl scroll-mt-24 gap-8 px-4 py-16 md:py-24 lg:grid-cols-[.9fr_1.1fr]">
        <div className="space-y-6">
          <div><p className="text-sm font-bold uppercase tracking-[.25em] text-[#e55b63]">Choose your route</p><h2 className="mt-3 text-3xl font-semibold tracking-tight md:text-4xl">Simple plans, clear numbers.</h2><p className="mt-4 leading-7 text-slate-400">Pick a package, set your timeline, and get a transparent estimate before you apply.</p></div>
          <PlanCard selected={packageType === "a"} onClick={() => setPackageType("a")} title="Package A — 20%" label="Standard" copy="Available for all eligible vehicles. A straightforward way to get moving." points={["Flexible repayment period", "Choose between 1–12 months", "Simple payment structure"]} />
          <PlanCard selected={packageType === "b"} onClick={() => setPackageType("b")} title="Package B — 30% used / 25% new" label="Flexible" copy="Designed for faster approval with options for both new and used vehicles." points={["30% option for used vehicles", "25% option for new vehicles", "Flexible repayment options"]} />
          <div className="flex gap-4 rounded-2xl border border-[#f3bd54]/30 bg-[#f3bd54]/10 p-5"><div className="rounded-xl bg-[#f3bd54]/20 p-3 text-[#f3bd54]"><HandCoins className="h-6 w-6" /></div><div><p className="font-semibold">Pay fast. Save more.</p><p className="mt-1 text-sm leading-6 text-slate-400">Shorter repayment periods can save up to <span className="font-semibold text-[#f3bd54]">$300 in fees.</span></p></div></div>
        </div>

        <div className="lg:sticky lg:top-24 lg:self-start"><div className="overflow-hidden rounded-[2rem] border border-white/15 bg-[#0c284b] shadow-2xl" id="calculator-card"><div className="border-b border-white/10 bg-white/[.03] p-6 md:p-8"><div className="flex items-start justify-between gap-4"><div><p className="text-sm text-slate-400">Your selected vehicle</p><h2 className="mt-1 text-2xl font-semibold">2018 Toyota Aqua Hybrid</h2><p className="mt-1 text-sm text-slate-400">Vehicle price · {money.format(price)}</p></div><div className="rounded-xl bg-[#e33a45]/15 p-3 text-[#f56b73]"><CarFront className="h-6 w-6" /></div></div><div className="mt-7 flex items-end justify-between"><div><p className="text-sm text-slate-400">Repayment period</p><p className="mt-1 text-3xl font-bold text-[#f3bd54]">{months} <span className="text-lg font-medium text-slate-300">months</span></p></div><span className="rounded-full bg-white/10 px-3 py-1.5 text-xs text-slate-300">1–12 months</span></div><input aria-label="Repayment period in months" type="range" min="1" max="12" value={months} onChange={(e) => setMonths(Number(e.target.value))} className="mt-6 h-2 w-full cursor-pointer accent-[#e33a45]" /><div className="mt-2 flex justify-between text-xs text-slate-500"><span>1 month</span><span>12 months</span></div></div>
          <div className="p-6 md:p-8"><div className="flex rounded-xl bg-[#071a35] p-1"><button onClick={() => setPackageType("a")} className={`flex-1 rounded-lg px-4 py-3 text-sm font-semibold transition ${packageType === "a" ? "bg-[#e33a45] text-white shadow" : "text-slate-400 hover:text-white"}`}>Package A · 20%</button><button onClick={() => setPackageType("b")} className={`flex-1 rounded-lg px-4 py-3 text-sm font-semibold transition ${packageType === "b" ? "bg-[#e33a45] text-white shadow" : "text-slate-400 hover:text-white"}`}>Package B</button></div>{packageType === "b" && <div className="mt-4 flex gap-2"><button onClick={() => setCondition("new")} className={`flex-1 rounded-lg border px-3 py-2 text-sm ${condition === "new" ? "border-[#f3bd54] bg-[#f3bd54]/10 text-[#f3bd54]" : "border-white/10 text-slate-400"}`}>New · 25%</button><button onClick={() => setCondition("used")} className={`flex-1 rounded-lg border px-3 py-2 text-sm ${condition === "used" ? "border-[#f3bd54] bg-[#f3bd54]/10 text-[#f3bd54]" : "border-white/10 text-slate-400"}`}>Used · 30%</button></div>}
            <div className="mt-7 rounded-2xl bg-gradient-to-br from-[#e33a45] to-[#b51f32] p-6"><p className="text-sm text-white/75">Estimated monthly payment</p><p className="mt-2 text-5xl font-semibold tracking-tight">{money.format(monthlyPayment)}<span className="text-base font-medium text-white/70"> / month</span></p></div><div className="mt-6 grid gap-4 sm:grid-cols-2">{summary.map(([label, value]) => <div key={label}><p className="text-xs text-slate-500">{label}</p><p className="mt-1 text-sm font-semibold text-slate-200">{value}</p></div>)}<div><p className="text-xs text-slate-500">Estimated savings</p><p className="mt-1 text-sm font-semibold text-[#f3bd54]">{money.format(savings)}</p></div></div><div className="mt-7 flex flex-col gap-3 sm:flex-row"><a href="/auth" className="flex flex-1 items-center justify-center gap-2 rounded-xl bg-white px-5 py-3.5 text-sm font-bold text-[#071a35] transition hover:bg-slate-100">Apply now <ArrowRight className="h-4 w-4" /></a><button onClick={downloadDetails} className="flex flex-1 items-center justify-center gap-2 rounded-xl border border-white/20 px-5 py-3.5 text-sm font-semibold transition hover:bg-white/10"><Download className="h-4 w-4" /> Download details</button></div><p className="mt-6 text-xs leading-5 text-slate-500">Estimated repayments are illustrative only. Final repayment amounts, fees, eligibility and approval are subject to Tinashe Car Sale&apos;s terms and confirmation.</p></div></div></div>
      </section>

      <section className="border-y border-white/10 bg-[#0a2242] px-4 py-16 md:py-20"><div className="mx-auto max-w-7xl"><div className="mb-10 max-w-xl"><p className="text-sm font-bold uppercase tracking-[.25em] text-[#e55b63]">A plan for every pace</p><h2 className="mt-3 text-3xl font-semibold">Pay fast. Save more.</h2></div><div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">{planVisuals.map((item) => <div key={item.months} className="group overflow-hidden rounded-2xl border border-white/10 bg-[#071a35]"><img src={item.image} alt={`${item.months} Tinashe Car Sale payment plan`} className="h-48 w-full object-cover object-top transition duration-500 group-hover:scale-105" /><div className="p-4"><p className="text-xs font-bold uppercase tracking-[.18em] text-[#f3bd54]">{item.months}</p><p className="mt-1 font-semibold">{item.title}</p></div></div>)}</div></div></section>

      <section className="mx-auto max-w-7xl px-4 py-16 md:py-24"><div className="mx-auto max-w-3xl text-center"><p className="text-sm font-bold uppercase tracking-[.25em] text-[#e55b63]">The process</p><h2 className="mt-3 text-3xl font-semibold">How Drive-to-Own works</h2></div><div className="mt-12 grid gap-6 md:grid-cols-3">{[["01", "Choose your car", "Find the vehicle you want from Tinashe Car Sale.", CarFront], ["02", "Choose your plan", "Select your package and repayment period.", WalletCards], ["03", "Apply & drive", "Submit your details, get reviewed, and complete the process.", Gauge]].map(([number, title, copy, Icon]) => <div key={number} className="rounded-2xl border border-white/10 bg-white/[.04] p-6"><div className="flex items-center justify-between"><Icon className="h-7 w-7 text-[#f3bd54]" /><span className="text-sm font-semibold text-[#e33a45]">{number}</span></div><h3 className="mt-8 text-xl font-semibold">{title as string}</h3><p className="mt-2 leading-7 text-slate-400">{copy as string}</p></div>)}</div></section>

      <section className="bg-[#0a2242] px-4 py-16"><div className="mx-auto max-w-3xl"><div className="text-center"><p className="text-sm font-bold uppercase tracking-[.25em] text-[#e55b63]">Good to know</p><h2 className="mt-3 text-3xl font-semibold">Frequently asked questions</h2></div><div className="mt-10 divide-y divide-white/10 rounded-2xl border border-white/10 bg-[#071a35] px-6">{[["How long can I repay over?", "Customers can choose a repayment period from 1–12 months, subject to approval and the selected plan."], ["Can I use Drive-to-Own for used cars?", "Yes, eligible used vehicles can qualify under the Package B used-vehicle option."], ["Can I pay earlier?", "Yes. Faster repayment may reduce applicable fees depending on the selected plan."], ["Are these calculations final?", "No. Calculator figures are estimates. Final figures are confirmed during the application and approval process."]].map(([question, answer]) => <details key={question} className="group py-5"><summary className="flex cursor-pointer list-none items-center justify-between font-semibold">{question}<ChevronDown className="h-5 w-5 text-slate-500 transition group-open:rotate-180" /></summary><p className="mt-3 max-w-2xl leading-7 text-slate-400">{answer}</p></details>)}</div></div></section>
      <Footer />
    </main>
  )
}

function PlanCard({ selected, onClick, title, label, copy, points }: { selected: boolean; onClick: () => void; title: string; label: string; copy: string; points: string[] }) {
  return <button type="button" onClick={onClick} className={`w-full rounded-2xl border p-6 text-left transition ${selected ? "border-[#e33a45] bg-[#e33a45]/10 shadow-[0_12px_40px_rgba(227,58,69,.12)]" : "border-white/10 bg-white/[.04] hover:border-white/25"}`}><div className="flex items-start justify-between gap-4"><div><span className={`rounded-full px-2.5 py-1 text-[10px] font-bold uppercase tracking-[.18em] ${selected ? "bg-[#e33a45] text-white" : "bg-white/10 text-slate-400"}`}>{label}</span><h3 className="mt-4 text-xl font-semibold">{title}</h3></div><div className={`rounded-full border p-1.5 ${selected ? "border-[#e33a45] bg-[#e33a45]" : "border-white/20"}`}><Check className="h-4 w-4" /></div></div><p className="mt-3 text-sm leading-6 text-slate-400">{copy}</p><ul className="mt-5 space-y-2">{points.map((point) => <li key={point} className="flex items-center gap-2 text-sm text-slate-300"><BadgeCheck className="h-4 w-4 text-[#f3bd54]" />{point}</li>)}</ul><p className="mt-5 text-sm font-semibold text-[#f3bd54]">Calculate with this package <ArrowRight className="ml-1 inline h-4 w-4" /></p></button>
}
