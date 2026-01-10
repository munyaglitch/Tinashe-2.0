import crypto from "crypto";

const INTEGRATION_ID = process.env.PAYNOW_INTEGRATION_ID ?? "demo-integration";
const INTEGRATION_KEY = process.env.PAYNOW_INTEGRATION_KEY ?? "demo-secret";
const CHECKOUT_BASE =
  process.env.PAYNOW_CHECKOUT_URL ?? "https://www.paynow.co.zw/paynow/checkout";
const CARD_AMOUNT = Number(process.env.PAYNOW_CARD_AMOUNT ?? 4999);
const ECOCASH_AMOUNT = Number(process.env.PAYNOW_ECOCASH_AMOUNT ?? 4999);

type SupportedPaymentMethod = "card" | "ecocash";

export type PaynowSession = {
  reference: string;
  amount: string;
  description: string;
  paymentMethod: SupportedPaymentMethod;
  metadata: string;
  checkoutUrl: string;
  expiresAt: string;
  signature: string;
  integrationId: string;
};

export type PaynowWebhookPayload = {
  reference: string;
  status: string;
  amount: string;
  metadata: string;
  signature?: string;
};

function getAmountForMethod(method: SupportedPaymentMethod): number {
  switch (method) {
    case "ecocash":
      return ECOCASH_AMOUNT;
    case "card":
      return CARD_AMOUNT;
  }
}

function formatAmount(amount: number) {
  return amount.toFixed(2);
}

function createReference(method: SupportedPaymentMethod) {
  return `paynow-${method}-${Date.now()}-${Math.floor(Math.random() * 1000)}`;
}

function signPayload(values: Record<string, string>) {
  const sorted = Object.keys(values)
    .sort()
    .map((key) => `${key}:${values[key]}`)
    .join("|");
  return crypto.createHmac("sha256", INTEGRATION_KEY).update(sorted).digest("hex");
}

export function createPaynowSession(options: {
  email: string;
  method: SupportedPaymentMethod;
  plan?: string;
}): PaynowSession {
  const { email, method, plan = "pro" } = options;
  const amount = getAmountForMethod(method);
  const reference = createReference(method);
  const metadata = JSON.stringify({
    email,
    plan,
    method,
  });
  const payloadFields: Record<string, string> = {
    integration_id: INTEGRATION_ID,
    reference,
    amount: formatAmount(amount),
    payment_method: method,
    metadata,
  };
  const signature = signPayload(payloadFields);
  return {
    reference,
    amount: payloadFields.amount,
    description: `Upgrade ${plan} plan`,
    paymentMethod: method,
    metadata,
    checkoutUrl: `${CHECKOUT_BASE}?reference=${reference}&amount=${payloadFields.amount}&method=${method}`,
    expiresAt: new Date(Date.now() + 1000 * 60 * 15).toISOString(),
    signature,
    integrationId: INTEGRATION_ID,
  };
}

export function verifyPaynowWebhook(
  payload: PaynowWebhookPayload,
  signature: string | null,
) {
  if (!signature) {
    return false;
  }
  const fields: Record<string, string> = {
    reference: payload.reference,
    status: payload.status,
    amount: payload.amount,
    metadata: payload.metadata,
  };
  const expected = signPayload(fields);
  return expected === signature;
}
