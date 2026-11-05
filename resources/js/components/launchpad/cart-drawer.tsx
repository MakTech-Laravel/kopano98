import { Link, router } from '@inertiajs/react';
import { ShoppingBag, X } from 'lucide-react';

import { useLaunchpadCart } from '@/contexts/launchpad-cart';
import { useLaunchpadLocale } from '@/contexts/launchpad-locale';

export function CartDrawer() {
    const { items, isOpen, total, closeCart, removeItem } = useLaunchpadCart();
    const { formatPrice, formatBaseZar, currencyCode, gatewayName } =
        useLaunchpadLocale();

    if (!isOpen) {
        return null;
    }

    return (
        <div
            className="fixed inset-0 z-[10000] bg-black/45"
            onClick={(event) => {
                if (event.target === event.currentTarget) {
                    closeCart();
                }
            }}
        >
            <aside className="absolute top-0 right-0 flex h-full w-full max-w-md flex-col bg-white shadow-2xl sm:max-w-md">
                <div className="flex items-center justify-between border-b border-[var(--lp-border)] px-6 py-4">
                    <div className="flex items-center gap-2">
                        <ShoppingBag className="text-lp-navy h-5 w-5" />
                        <h2 className="font-lp-display text-lp-navy text-2xl">
                            Your cart
                        </h2>
                    </div>
                    <button
                        type="button"
                        onClick={closeCart}
                        className="text-lp-mid rounded-md p-2 hover:bg-[var(--lp-off)]"
                        aria-label="Close cart"
                    >
                        <X className="h-5 w-5" />
                    </button>
                </div>

                <div className="flex-1 overflow-y-auto px-6 py-4">
                    {items.length === 0 ? (
                        <p className="text-lp-mid text-sm">
                            Your cart is empty. Browse services to get started.
                        </p>
                    ) : (
                        <ul className="space-y-3">
                            {items.map((item) => (
                                <li
                                    key={item.id}
                                    className="flex items-start justify-between gap-3 rounded-lg border border-[var(--lp-border)] p-3"
                                >
                                    <div>
                                        <p className="text-lp-navy text-sm font-semibold">
                                            {item.name}
                                        </p>
                                        <p className="text-lp-light text-xs">
                                            Qty {item.quantity} ·{' '}
                                            {formatPrice(item.price)}
                                        </p>
                                    </div>
                                    <button
                                        type="button"
                                        className="text-xs font-semibold text-red-600"
                                        onClick={() => removeItem(item.id)}
                                    >
                                        Remove
                                    </button>
                                </li>
                            ))}
                        </ul>
                    )}
                </div>

                <div className="border-t border-[var(--lp-border)] px-6 py-4">
                    <div className="mb-1 flex items-center justify-between">
                        <span className="text-lp-mid text-sm">Total</span>
                        <span className="font-lp-display text-lp-navy text-2xl">
                            {formatPrice(total)}
                        </span>
                    </div>
                    {currencyCode !== 'ZAR' ? (
                        <p className="text-lp-light mb-3 text-right text-[0.7rem]">
                            Base {formatBaseZar(total)}
                        </p>
                    ) : (
                        <div className="mb-3" />
                    )}
                    <p className="text-lp-mid mb-3 text-[0.7rem]">
                        Checkout via {gatewayName} · prices in {currencyCode}
                    </p>
                    <button
                        type="button"
                        className="btn-lp-gold mb-2 w-full py-3 text-sm disabled:opacity-40"
                        disabled={items.length === 0}
                        onClick={() => {
                            closeCart();
                            router.visit('/checkout');
                        }}
                    >
                        Checkout
                    </button>
                    <Link
                        href="/services"
                        onClick={closeCart}
                        className="text-lp-mid block text-center text-xs hover:underline"
                    >
                        Continue shopping
                    </Link>
                </div>
            </aside>
        </div>
    );
}
