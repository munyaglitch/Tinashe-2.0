import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { BottomNav } from "@/components/bottom-nav"
import { Award, Users, TrendingUp, Heart } from "lucide-react"

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-background pb-16 md:pb-0">
      <Header />
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-5xl mx-auto">
          <h1 className="text-4xl md:text-6xl font-bold text-center mb-6">About Us: TC Automotive Group</h1>

          <div className="bg-card border border-border rounded-lg p-8 md:p-12 space-y-8">
            <p className="text-lg md:text-xl text-muted-foreground leading-relaxed">
              TC Automotive Group is a premier automotive dealership network dedicated to delivering exceptional value,
              quality, and service. We proudly specialize in both brand new models and competitively priced pre-owned
              luxury and performance vehicles, meeting the needs of a wide spectrum of drivers.
            </p>

            <p className="text-lg md:text-xl text-muted-foreground leading-relaxed">
              Renowned for our innovative approach and strong operational excellence, we continuously evolve to offer
              smarter, more efficient automotive solutions. Our customer-first philosophy sits at the heart of
              everything we do, ensuring every client receives personalized attention, transparent processes, and a
              seamless buying experience.
            </p>

            <p className="text-lg md:text-xl text-muted-foreground leading-relaxed">
              At TC Automotive Group, we don't just sell vehicles—we build lasting relationships and set new standards
              in the automotive industry.
            </p>

            <div className="grid md:grid-cols-2 gap-6 mt-12">
              <div className="flex items-start gap-4 p-6 bg-muted/50 rounded-lg">
                <Award className="h-8 w-8 text-red-500 flex-shrink-0 mt-1" />
                <div>
                  <h3 className="font-bold text-lg mb-2">Quality Assurance</h3>
                  <p className="text-muted-foreground">
                    Every vehicle undergoes rigorous inspection to meet our high standards
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4 p-6 bg-muted/50 rounded-lg">
                <Users className="h-8 w-8 text-red-500 flex-shrink-0 mt-1" />
                <div>
                  <h3 className="font-bold text-lg mb-2">Customer First</h3>
                  <p className="text-muted-foreground">
                    Personalized service and transparent processes for every client
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4 p-6 bg-muted/50 rounded-lg">
                <TrendingUp className="h-8 w-8 text-red-500 flex-shrink-0 mt-1" />
                <div>
                  <h3 className="font-bold text-lg mb-2">Innovation</h3>
                  <p className="text-muted-foreground">Continuously evolving to offer smarter automotive solutions</p>
                </div>
              </div>

              <div className="flex items-start gap-4 p-6 bg-muted/50 rounded-lg">
                <Heart className="h-8 w-8 text-red-500 flex-shrink-0 mt-1" />
                <div>
                  <h3 className="font-bold text-lg mb-2">Lasting Relationships</h3>
                  <p className="text-muted-foreground">Building trust and partnerships that go beyond the sale</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
      <BottomNav />
    </main>
  )
}
