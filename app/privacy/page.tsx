import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { BottomNav } from "@/components/bottom-nav"

export default function PrivacyPage() {
  return (
    <main className="min-h-screen bg-background pb-16 md:pb-0">
      <Header />
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto">
          <div id="privacy" className="bg-card border border-border rounded-lg p-8">
            <h2 className="text-3xl md:text-4xl font-bold mb-2">Privacy Policy</h2>
            <h3 className="text-xl md:text-2xl font-semibold mb-6 text-muted-foreground">Tinashe Carsale Zimbabwe</h3>

            <ol className="space-y-6 list-decimal list-inside text-base md:text-lg">
              <li>
                <strong>Data Collection</strong>
                <br />
                <span className="text-muted-foreground">
                  We collect contact info (name, phone, email) for sales/support.
                </span>
              </li>
              <li>
                <strong>Use of Data</strong>
                <br />
                <span className="text-muted-foreground">
                  For communication, processing sales, marketing (if consent given).
                </span>
              </li>
              <li>
                <strong>Protection</strong>
                <br />
                <span className="text-muted-foreground">We protect your data with reasonable measures.</span>
              </li>
              <li>
                <strong>Disclosure</strong>
                <br />
                <span className="text-muted-foreground">
                  Not shared with third parties without consent (except as required by law).
                </span>
              </li>
              <li>
                <strong>Rights</strong>
                <br />
                <span className="text-muted-foreground">You can request data access/correction/deletion.</span>
              </li>
            </ol>
          </div>
        </div>
      </div>
      <Footer />
      <BottomNav />
    </main>
  )
}
