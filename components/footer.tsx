import { Phone, Instagram, MapPin } from "lucide-react"

export function Footer() {
  return (
    <footer id="contact" className="bg-card border-t border-border">
      <div className="container px-4 py-16">
        <div className="grid md:grid-cols-4 gap-12">
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <div className="h-10 w-10 rounded-lg overflow-hidden">
                <img
                  src="/images/tc-car-sales-removebg-preview.png"
                  alt="TC"
                  className="h-full w-full object-contain"
                />
              </div>
              <div className="flex flex-col">
                <span className="text-foreground font-bold text-lg leading-none">Tinashe Car Sales</span>
                <span className="text-muted-foreground text-xs">Zimbabwe</span>
              </div>
            </div>
            <p className="text-muted-foreground leading-relaxed">
              Your trusted partner for buying and selling premium vehicles across Zimbabwe.
            </p>
          </div>

          <div className="space-y-4">
            <h3 className="text-foreground font-bold text-lg">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <a href="#home" className="text-muted-foreground hover:text-primary transition-colors">
                  Home
                </a>
              </li>
              <li>
                <a href="#vehicles" className="text-muted-foreground hover:text-primary transition-colors">
                  Vehicles
                </a>
              </li>
              <li>
                <a href="#about" className="text-muted-foreground hover:text-primary transition-colors">
                  About Us
                </a>
              </li>
              <li>
                <a href="#contact" className="text-muted-foreground hover:text-primary transition-colors">
                  Contact
                </a>
              </li>
            </ul>
          </div>

          <div className="space-y-4">
            <h3 className="text-foreground font-bold text-lg">Services</h3>
            <ul className="space-y-2">
              <li className="text-muted-foreground">Buy a Car</li>
              <li className="text-muted-foreground">Sell Your Car</li>
              <li className="text-muted-foreground">Vehicle Inspection</li>
              <li className="text-muted-foreground">Financing Options</li>
            </ul>
          </div>

          <div className="space-y-4">
            <h3 className="text-foreground font-bold text-lg">Contact Us</h3>
            <ul className="space-y-3">
              <li className="flex items-start gap-2">
                <Phone className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                <a href="tel:+263783935399" className="text-muted-foreground hover:text-primary transition-colors">
                  +263 78 393 5399
                </a>
              </li>
              <li className="flex items-start gap-2">
                <Instagram className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                <a
                  href="https://instagram.com/tcars.zim"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-muted-foreground hover:text-primary transition-colors"
                >
                  @tcars.zim
                </a>
              </li>
              <li className="flex items-start gap-2">
                <MapPin className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                <span className="text-muted-foreground">Harare, Zimbabwe</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-border text-center text-muted-foreground">
          <p>&copy; 2026 Tinashe Car Sales Zimbabwe. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}
