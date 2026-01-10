"use client";

import { useMemo, useState } from "react";

type PaymentMethod = "card" | "ecocash";

const cardBenefits = [
  "Unlimited vehicle listings + analytics",
  "Priority placement on our marketplace",
  "Dedicated account manager for each sale",
];

const methodLabels: Record<PaymentMethod, string> = {
  card: "Pay with Card (Visa/Mastercard)",
  ecocash: "Pay with EcoCash",
};

export default function PricingPage() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<
    "idle" | "pending" | "success" | "error"
  >("idle");
  const [feedback, setFeedback] = useState<string | null>(null);

  const buttonDisabled = status === "pending";

  const messageColor = useMemo(() => {
    if (status === "success") {
      return "text-emerald-300";
    }
    if (status === "error") {
      return "text-rose-200";
    }
    return "text-slate-100";
  }, [status]);

  const startPayment = async (method: PaymentMethod) => {
    if (!email) {
      setFeedback("Please enter an email so we can track the payment.");
      setStatus("error");
      return;
    }

    setStatus("pending");
    setFeedback(null);
    try {
      const response = await fetch(`/api/payments/paynow/${method}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(errorText || "Failed to create payment.");
      }
      const payload = await response.json();
      window.open(payload.checkoutUrl, "_blank");
      setFeedback(
        `Redirected to Paynow for ${method === "card" ? "card" : "EcoCash"} checkout.`,
      );
      setStatus("success");
    } catch (error) {
      setFeedback(
        error instanceof Error ? error.message : "Unable to start payment flow.",
      );
      setStatus("error");
    }
  };

  return (
    <main className="min-h-screen bg-slate-950 px-4 py-14 text-white">
      <div className="mx-auto max-w-4xl space-y-10 rounded-[32px] border border-white/10 bg-white/5 p-10 shadow-2xl shadow-black/50 backdrop-blur">
        <header className="space-y-3 text-center">
          <p className="text-xs uppercase tracking-[0.4em] text-slate-400">
            Premium support
          </p>
          <h1 className="text-4xl font-semibold">Go Pro with Tinashe</h1>
          <p className="text-lg text-slate-300">
            Unlock everything needed to sell premium vehicles in Zimbabwe.
          </p>
        </header>

        <div className="grid gap-6 md:grid-cols-[1.2fr_0.8fr]">
          <section className="rounded-3xl border border-slate-800 bg-slate-900/70 p-6">
            <p className="text-sm uppercase tracking-[0.4em] text-slate-400">
              Pro plan
            </p>
            <div className="mt-4 flex items-baseline gap-3">
              <span className="text-5xl font-bold">US$49</span>
              <span className="text-sm text-slate-400">/month</span>
            </div>
            <ul className="mt-6 space-y-3 text-sm text-slate-200">
              {cardBenefits.map((benefit) => (
                <li key={benefit} className="flex items-start gap-3">
                  <span className="mt-1 h-2 w-2 rounded-full bg-emerald-400" />
                  <span>{benefit}</span>
                </li>
              ))}
            </ul>
          </section>
          <section className="rounded-3xl border border-emerald-500/40 bg-emerald-500/5 p-6">
            <p className="text-sm uppercase tracking-[0.4em] text-emerald-300">
              Instant access
            </p>
            <p className="mt-3 text-sm text-slate-200">
              Pick your favorite checkout and pay securely via card or EcoCash.
            </p>
            <label className="mt-8 block text-xs uppercase tracking-[0.4em] text-slate-400">
              Email (for receipts & plan sync)
              <input
                className="mt-2 w-full rounded-2xl border border-white/20 bg-slate-950/60 px-4 py-3 text-base text-white focus:border-emerald-400 focus:outline-none"
                placeholder="you@company.com"
                type="email"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
              />
            </label>
            <div className="mt-6 flex flex-wrap gap-4">
              {(Object.keys(methodLabels) as PaymentMethod[]).map((method) => (
                <button
                  key={method}
                  type="button"
                  disabled={buttonDisabled}
                  onClick={() => startPayment(method)}
                  className="flex-1 min-w-[200px] rounded-2xl border border-white/20 bg-gradient-to-r from-emerald-500/70 to-sky-500/70 px-4 py-3 text-sm font-semibold uppercase tracking-[0.3em] text-white transition hover:from-emerald-400 hover:to-sky-400 disabled:cursor-wait disabled:opacity-60"
                >
                  {methodLabels[method]}
                </button>
              ))}
            </div>
            {feedback && (
              <p className={`mt-4 rounded-2xl border px-4 py-3 text-sm ${messageColor}`}>
                {feedback}
              </p>
            )}
          </section>
        </div>
      </div>
    </main>
  );
}
