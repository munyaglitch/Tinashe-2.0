import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { BottomNav } from "@/components/bottom-nav"
import { ChevronDown } from "lucide-react"

export default function FAQPage() {
  const faqs = [
    {
      question: "What types of vehicles do you offer?",
      answer:
        "We supply a diverse portfolio of vehicles including luxury models, affordable options, and commercial units. Browse our online catalogue or contact us directly for the most up-to-date inventory.",
    },
    {
      question: "How can I purchase a vehicle?",
      answer:
        "Simply explore our website, identify your preferred vehicle, reach out to our sales team for confirmation, and finalize the purchase through the required payment and documentation process.",
    },
    {
      question: "Do you provide financing support?",
      answer:
        "Yes. We collaborate with reputable local financial institutions to assist customers in securing financing. Get in touch to discuss available options.",
    },
    {
      question: "Can I trade in my current vehicle?",
      answer:
        "Absolutely. We do accept trade-ins. Share your vehicle information with us and we will evaluate it and advise accordingly.",
    },
    {
      question: "Do you offer returns or refunds?",
      answer:
        'All vehicles are sold on an "as is" basis. Customers are encouraged to thoroughly inspect the vehicle prior to purchase. Any refund considerations are handled individually and guided by the purchase agreement.',
    },
    {
      question: "How can I contact your team?",
      answer: "Reach us through our website contact page or call/WhatsApp us at +263 783 935 399.",
    },
  ]

  return (
    <main className="min-h-screen bg-background pb-16 md:pb-0">
      <Header />
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl md:text-5xl font-bold text-center mb-4">Frequently Asked Questions</h1>
          <p className="text-center text-muted-foreground mb-12">Find answers to common questions about our services</p>

          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <details key={index} className="bg-card border border-border rounded-lg group">
                <summary className="flex items-center justify-between p-6 cursor-pointer list-none hover:bg-muted/50 transition-colors">
                  <h3 className="text-lg font-semibold pr-4">{faq.question}</h3>
                  <ChevronDown className="h-5 w-5 text-muted-foreground group-open:rotate-180 transition-transform flex-shrink-0" />
                </summary>
                <div className="px-6 pb-6 pt-2">
                  <p className="text-muted-foreground leading-relaxed">{faq.answer}</p>
                </div>
              </details>
            ))}
          </div>
        </div>
      </div>
      <Footer />
      <BottomNav />
    </main>
  )
}
