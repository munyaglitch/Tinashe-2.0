import Link from "next/link"
import { FileText, Scale, Shield, Info } from "lucide-react"

export function InfoLinks() {
  return (
    <section className="bg-slate-900 py-12 px-4">
      <div className="container mx-auto">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          <Link
            href="/faq"
            className="flex flex-col items-center gap-3 p-6 bg-slate-800 rounded-lg hover:bg-slate-700 transition-colors group"
          >
            <FileText className="h-10 w-10 text-red-500 group-hover:scale-110 transition-transform" />
            <span className="text-white font-semibold text-center">FAQ</span>
          </Link>

          <Link
            href="/terms"
            className="flex flex-col items-center gap-3 p-6 bg-slate-800 rounded-lg hover:bg-slate-700 transition-colors group"
          >
            <Scale className="h-10 w-10 text-red-500 group-hover:scale-110 transition-transform" />
            <span className="text-white font-semibold text-center">Terms & Conditions</span>
          </Link>

          <Link
            href="/privacy"
            className="flex flex-col items-center gap-3 p-6 bg-slate-800 rounded-lg hover:bg-slate-700 transition-colors group"
          >
            <Shield className="h-10 w-10 text-red-500 group-hover:scale-110 transition-transform" />
            <span className="text-white font-semibold text-center">Privacy Policy</span>
          </Link>

          <Link
            href="/about"
            className="flex flex-col items-center gap-3 p-6 bg-slate-800 rounded-lg hover:bg-slate-700 transition-colors group"
          >
            <Info className="h-10 w-10 text-red-500 group-hover:scale-110 transition-transform" />
            <span className="text-white font-semibold text-center">About Us</span>
          </Link>
        </div>
      </div>
    </section>
  )
}
