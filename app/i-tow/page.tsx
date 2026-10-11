import { Clock3 } from "lucide-react"

export default function ITowPage() {
  return (
    <main className="flex min-h-[calc(100vh-5rem)] items-center justify-center bg-white px-6 py-20 text-[#071a35]">
      <section className="w-full max-w-2xl rounded-3xl border border-[#1762a8]/20 bg-[#f5f7fb] px-6 py-16 text-center shadow-sm md:px-12">
        <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-[#1762a8] text-white">
          <Clock3 className="h-10 w-10" aria-hidden="true" />
        </div>
        <p className="mt-8 text-sm font-bold uppercase tracking-[.25em] text-[#b51f32]">Coming soon</p>
        <h1 className="mt-3 text-4xl font-black tracking-tight md:text-6xl">I TOW COMING SOON</h1>
      </section>
    </main>
  )
}
