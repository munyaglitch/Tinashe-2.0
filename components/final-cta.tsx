import { Button } from "@/components/ui/button"
import { Phone, Instagram } from "lucide-react"

export function FinalCTA() {
  return (
    <section className="py-24 bg-gradient-to-br from-secondary via-background to-card">
      <div className="container px-4">
        <div className="max-w-4xl mx-auto text-center space-y-8">
          <h2 className="text-4xl md:text-6xl font-bold text-foreground leading-tight text-balance">
            Ready to Find Your <span className="text-primary">Dream Car?</span>
          </h2>
          <p className="text-xl md:text-2xl text-muted-foreground max-w-2xl mx-auto text-pretty">
            Contact us today and let's get you behind the wheel of your perfect vehicle.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
            <Button size="lg" className="bg-primary hover:bg-primary/90 text-primary-foreground text-lg px-8 py-6">
              <Phone className="mr-2 h-5 w-5" />
              Call Us Now
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="border-2 border-primary text-foreground hover:bg-primary/10 text-lg px-8 py-6 bg-transparent"
            >
              <Instagram className="mr-2 h-5 w-5" />
              Follow Us
            </Button>
          </div>

          <div className="pt-8 space-y-4">
            <div className="flex items-center justify-center gap-2 text-foreground">
              <Phone className="h-5 w-5 text-primary" />
              <a href="tel:+263783935399" className="text-xl font-bold hover:text-primary transition-colors">
                +263 78 393 5399
              </a>
            </div>
            <div className="flex items-center justify-center gap-2 text-foreground">
              <Instagram className="h-5 w-5 text-primary" />
              <a
                href="https://instagram.com/tcars.zim"
                target="_blank"
                rel="noopener noreferrer"
                className="text-xl font-bold hover:text-primary transition-colors"
              >
                @tcars.zim
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
