import { Head, Link } from '@inertiajs/react';
import { useEffect, useState } from 'react';

import { useLaunchpadLocale } from '@/contexts/launchpad-locale';
import { gatewayLabel } from '@/data/launchpad/currencies';
import LaunchpadLayout from '@/layouts/launchpad-layout';
import {
    readCheckoutOrder,
    type CheckoutOrderDraft,
} from '@/lib/launchpad/checkout-order';

export default function ThankYou() {
    return (
        <LaunchpadLayout>
            <ThankYouContent />
        </LaunchpadLayout>
    );
}

function ThankYouContent() {
    const { formatPrice } = useLaunchpadLocale();
    const [order, setOrder] = useState<CheckoutOrderDraft | null>(null);

    useEffect(() => {
        setOrder(readCheckoutOrder());
    }, []);

    return (
        <>
            <Head title="Thank you | Launchpad Careers" />

            <section className="py-16 sm:py-20">
                <div className="container">
                    <div className="mx-auto flex max-w-lg flex-col items-center text-center">
                        <p className="mb-2 text-[0.72rem] font-medium tracking-[0.08em] text-[var(--lp-gold-on-light-sm)] uppercase">
                            Order received
                        </p>
                        <h1 className="font-lp-display text-lp-navy text-4xl">
                            Thank you
                        </h1>
                        <p className="text-lp-mid mt-3 text-sm leading-relaxed text-pretty">
                            {order
                                ? `We saved your UI checkout for ${order.customer.name}. Live ${gatewayLabel(order.gateway)} charging and confirmation emails connect in the next milestone.`
                                : 'Your post-checkout confirmation shell is ready. Complete checkout from the cart to see order details here.'}
                        </p>

                        {order ? (
                            <div className="mt-6 w-full rounded-xl border border-[var(--lp-border)] bg-[var(--lp-off)] px-4 py-4 text-left">
                                <dl className="space-y-2 text-sm">
                                    <div className="flex justify-between gap-3">
                                        <dt className="text-lp-mid">Reference</dt>
                                        <dd className="text-lp-navy font-semibold">
                                            {order.reference}
                                        </dd>
                                    </div>
                                    <div className="flex justify-between gap-3">
                                        <dt className="text-lp-mid">Amount</dt>
                                        <dd className="text-lp-navy font-semibold">
                                            {order.displayTotal ||
                                                formatPrice(order.totalZar)}
                                        </dd>
                                    </div>
                                    <div className="flex justify-between gap-3">
                                        <dt className="text-lp-mid">Gateway</dt>
                                        <dd className="text-lp-navy font-semibold">
                                            {gatewayLabel(order.gateway)}
                                        </dd>
                                    </div>
                                    <div className="flex justify-between gap-3">
                                        <dt className="text-lp-mid">Email</dt>
                                        <dd className="text-lp-navy font-semibold break-all">
                                            {order.customer.email}
                                        </dd>
                                    </div>
                                </dl>
                            </div>
                        ) : null}

                        <div className="mt-8 flex w-full flex-col justify-center gap-3 sm:w-auto sm:flex-row sm:flex-wrap">
                            <Link
                                href="/tools"
                                className="btn-lp-navy inline-flex items-center justify-center px-5 py-2.5 text-sm"
                            >
                                Try free tools
                            </Link>
                            <Link
                                href="/services"
                                className="inline-flex items-center justify-center rounded-[5px] border-[1.5px] border-[var(--lp-navy)] px-5 py-2.5 text-sm font-semibold text-[var(--lp-navy)]"
                            >
                                Back to services
                            </Link>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
}
