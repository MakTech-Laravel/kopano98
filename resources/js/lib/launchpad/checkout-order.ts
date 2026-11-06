import type { CartItem } from '@/contexts/launchpad-cart';
import type {
    LaunchpadCurrencyCode,
    PaymentGateway,
} from '@/data/launchpad/currencies';

export type CheckoutOrderDraft = {
    reference: string;
    createdAt: string;
    customer: {
        name: string;
        email: string;
        phone: string;
        countryCode: string;
    };
    items: CartItem[];
    totalZar: number;
    currencyCode: LaunchpadCurrencyCode;
    displayTotal: string;
    gateway: PaymentGateway;
};

export type CheckoutOrderResponse = {
    reference: string;
    status: string;
    total_zar: number;
    total_display: number | string;
    currency_code: string;
    gateway: PaymentGateway;
    payments_configured: boolean;
    payfast?: {
        action: string | null;
        form: Record<string, string> | null;
    };
    paddle?: {
        overlay: {
            client_token: string;
            price_id: string;
            order_reference: string;
            customer_email: string;
        } | null;
    };
};

const ORDER_STORAGE_KEY = 'launchpad.checkout.order.v1';

export function createOrderReference(): string {
    const stamp = Date.now().toString(36).toUpperCase();
    const random = Math.random().toString(36).slice(2, 6).toUpperCase();

    return `LP-${stamp}-${random}`;
}

export function saveCheckoutOrder(order: CheckoutOrderDraft): void {
    if (typeof window === 'undefined') {
        return;
    }

    window.sessionStorage.setItem(ORDER_STORAGE_KEY, JSON.stringify(order));
}

export function readCheckoutOrder(): CheckoutOrderDraft | null {
    if (typeof window === 'undefined') {
        return null;
    }

    try {
        const raw = window.sessionStorage.getItem(ORDER_STORAGE_KEY);

        if (!raw) {
            return null;
        }

        return JSON.parse(raw) as CheckoutOrderDraft;
    } catch {
        return null;
    }
}

export function submitPayfastForm(
    action: string,
    fields: Record<string, string>,
): void {
    const form = window.document.createElement('form');
    form.method = 'POST';
    form.action = action;
    form.style.display = 'none';

    Object.entries(fields).forEach(([key, value]) => {
        const input = window.document.createElement('input');
        input.type = 'hidden';
        input.name = key;
        input.value = value;
        form.appendChild(input);
    });

    window.document.body.appendChild(form);
    form.submit();
}

export async function openPaddleOverlay(overlay: {
    client_token: string;
    price_id: string;
    order_reference: string;
    customer_email: string;
}): Promise<boolean> {
    const paddle = (
        window as unknown as {
            Paddle?: {
                Environment?: { set: (env: string) => void };
                Initialize: (options: { token: string }) => void;
                Checkout: {
                    open: (options: Record<string, unknown>) => void;
                };
            };
        }
    ).Paddle;

    if (!paddle) {
        return false;
    }

    try {
        paddle.Environment?.set('sandbox');
        paddle.Initialize({ token: overlay.client_token });
        paddle.Checkout.open({
            items: [{ priceId: overlay.price_id, quantity: 1 }],
            customer: { email: overlay.customer_email },
            customData: { order_reference: overlay.order_reference },
            settings: {
                successUrl: `${window.location.origin}/thank-you?reference=${encodeURIComponent(overlay.order_reference)}`,
            },
        });

        return true;
    } catch {
        return false;
    }
}
