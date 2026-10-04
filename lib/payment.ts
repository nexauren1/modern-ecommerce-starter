export type PaymentStatus = "pending" | "paid" | "failed" | "cancelled";

export type CreatePaymentInput = {
  orderId: string;
  amount: number;
  currency: string;
  returnUrl: string;
  cancelUrl: string;
  customerEmail?: string;
  metadata?: Record<string, string>;
};

export type PaymentSession = {
  provider: string;
  checkoutUrl: string;
  paymentId?: string;
  status: PaymentStatus;
};

export interface PaymentProvider {
  readonly name: string;
  createCheckout(input: CreatePaymentInput): Promise<PaymentSession>;
  verifyWebhook(request: Request): Promise<{ event: string; paymentId?: string; status: PaymentStatus }>;
}

class ConfiguredRestPaymentProvider implements PaymentProvider {
  readonly name: string;

  constructor(
    private readonly config: {
      name: string;
      checkoutPath: string;
      apiKey?: string;
      baseUrl?: string;
    }
  ) {
    this.name = config.name;
  }

  async createCheckout(input: CreatePaymentInput): Promise<PaymentSession> {
    if (!this.config.baseUrl || !this.config.apiKey) {
      throw new Error("Payment provider is not configured.");
    }

    const response = await fetch(new URL(this.config.checkoutPath, this.config.baseUrl), {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + this.config.apiKey,
      },
      body: JSON.stringify(input),
    });

    if (!response.ok) {
      throw new Error("Payment provider rejected the checkout request.");
    }

    const data = (await response.json()) as { checkoutUrl?: string; url?: string; id?: string };
    const checkoutUrl = data.checkoutUrl ?? data.url;

    if (!checkoutUrl) {
      throw new Error("Payment provider response did not include a checkout URL.");
    }

    return {
      provider: this.name,
      checkoutUrl,
      paymentId: data.id,
      status: "pending",
    };
  }

  async verifyWebhook(request: Request) {
    const expectedSecret = process.env.PAYMENT_WEBHOOK_SECRET;
    const provided = request.headers.get("x-webhook-secret");

    if (!expectedSecret || !provided || provided !== expectedSecret) {
      throw new Error("Invalid payment webhook.");
    }

    const payload = (await request.json()) as {
      event?: string;
      paymentId?: string;
      status?: PaymentStatus;
    };

    return {
      event: payload.event ?? "payment.updated",
      paymentId: payload.paymentId,
      status: payload.status ?? "pending",
    };
  }
}

export function getPaymentProvider(): PaymentProvider {
  const provider = (process.env.PAYMENT_PROVIDER ?? "custom").toLowerCase();

  const baseUrl = process.env.PAYMENT_API_BASE_URL;
  const apiKey = process.env.PAYMENT_API_KEY;
  const checkoutPath = process.env.PAYMENT_CHECKOUT_PATH ?? "/checkout";

  return new ConfiguredRestPaymentProvider({
    name: provider,
    baseUrl,
    apiKey,
    checkoutPath,
  });
}
