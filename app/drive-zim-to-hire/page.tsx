import { Clock3 } from "lucide-react"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"

export default function DriveZimToHirePage() {
  return (
    <main className="min-h-screen bg-[#071a35] text-white">
      <Header />
      <section className="flex min-h-[calc(100vh-5rem)] items-center justify-center bg-[#071a35] px-4 py-20">
        <div className="w-full max-w-xl rounded-3xl border border-[#b51f32]/60 bg-[#0b2444] px-8 py-14 text-center shadow-2xl md:px-16">
          <Clock3 className="mx-auto h-14 w-14 text-[#f3bd54]" aria-hidden="true" />
          <p className="mt-6 text-sm font-bold uppercase tracking-[.25em] text-[#f3bd54]">Coming soon</p>
          <h1 className="mt-3 text-4xl font-black tracking-tight md:text-5xl">Hire a car zim</h1>
        </div>
      </section>
      <Footer />
    </main>
  )
}
