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
