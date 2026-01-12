import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { BottomNav } from "@/components/bottom-nav"

export default function TermsPage() {
  return (
    <main className="min-h-screen bg-background pb-16 md:pb-0">
      <Header />
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Terms & Conditions</h1>
          <p className="text-muted-foreground mb-8">Tinashe Carsale Zimbabwe</p>

          <div className="space-y-8 bg-card border border-border rounded-lg p-8">
            <section>
              <h2 className="text-2xl font-bold mb-3">1. Introduction</h2>
              <p className="text-muted-foreground leading-relaxed">
                Tinashe Carsale Zimbabwe ("the Company") operates in the sale of motor vehicles in accordance with these
                terms and conditions.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-3">2. Vehicle Information</h2>
              <p className="text-muted-foreground leading-relaxed">
                All vehicle details are provided to the best of our knowledge, however, specifications and availability
                may change without prior notice.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-3">3. Pricing</h2>
              <p className="text-muted-foreground leading-relaxed">
                All prices are quoted in Zimbabwean dollars or otherwise specified currency and may be adjusted in line
                with market changes.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-3">4. Payment</h2>
              <p className="text-muted-foreground leading-relaxed">
                Full payment must be received and cleared prior to the transfer of ownership or vehicle release.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-3">5. Transfer of Ownership</h2>
              <p className="text-muted-foreground leading-relaxed">
                Legal ownership is assigned to the buyer once payment is completed and all required documents have been
                finalised.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-3">6. Liability</h2>
              <p className="text-muted-foreground leading-relaxed">
                Vehicles are purchased "as is." Buyers are responsible for inspecting the vehicle prior to payment. The
                Company is not liable for any post-purchase mechanical or cosmetic issues.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-3">7. Governing Law</h2>
              <p className="text-muted-foreground leading-relaxed">
                All transactions are governed by the laws and statutory regulations of Zimbabwe.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-3">8. Dispute Resolution</h2>
              <p className="text-muted-foreground leading-relaxed">
                Any disputes arising from a transaction will be addressed through local arbitration and/or the
                Zimbabwean court system.
              </p>
            </section>
          </div>
        </div>
      </div>
      <Footer />
      <BottomNav />
    </main>
  )
}
