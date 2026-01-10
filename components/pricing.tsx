import { Button } from "@/components/ui/button"
import { Check } from "lucide-react"

export function Pricing() {
  const plans = [
    {
      name: "Basic Listing",
      price: "Free",
      description: "Perfect for individual sellers",
      features: ["List up to 1 vehicle", "30-day listing duration", "Basic photo gallery", "Email support"],
    },
    {
      name: "Premium Listing",
      price: "$50",
      description: "Best for serious sellers",
      features: [
        "List up to 5 vehicles",
        "60-day listing duration",
        "Premium photo gallery",
        "Featured placement",
        "Priority support",
        "Social media promotion",
      ],
      featured: true,
    },
    {
      name: "Dealer Package",
      price: "$200",
      description: "For professional dealers",
      features: [
        "Unlimited vehicle listings",
        "90-day listing duration",
        "Premium photo & video",
        "Top featured placement",
        "Dedicated account manager",
        "Full marketing support",
        "Custom dealer page",
      ],
    },
  ]

  return (
    <section className="py-24 bg-background">
      <div className="container px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4">Listing Plans</h2>
          <p className="text-xl text-muted-foreground">Choose the perfect plan to sell your vehicle</p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {plans.map((plan, index) => (
            <div
              key={index}
              className={`relative bg-card border rounded-xl p-8 space-y-6 ${
                plan.featured ? "border-primary shadow-lg scale-105" : "border-border"
              }`}
            >
              {plan.featured && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-primary text-primary-foreground px-4 py-1 rounded-full text-sm font-bold">
                  Most Popular
                </div>
              )}

              <div className="space-y-2">
                <h3 className="text-2xl font-bold text-foreground">{plan.name}</h3>
                <p className="text-muted-foreground">{plan.description}</p>
              </div>

              <div className="flex items-baseline gap-2">
                <span className="text-5xl font-bold text-primary">{plan.price}</span>
                {plan.price !== "Free" && <span className="text-muted-foreground">/listing</span>}
              </div>

              <ul className="space-y-3">
                {plan.features.map((feature, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <div className="flex-shrink-0 mt-0.5">
                      <Check className="h-5 w-5 text-primary" />
                    </div>
                    <span className="text-foreground">{feature}</span>
                  </li>
                ))}
              </ul>

              <Button
                className={`w-full ${
                  plan.featured
                    ? "bg-primary hover:bg-primary/90 text-primary-foreground"
                    : "bg-secondary hover:bg-secondary/90 text-secondary-foreground"
                }`}
              >
                Get Started
              </Button>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
