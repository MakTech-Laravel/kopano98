import { Head, Link } from '@inertiajs/react';
import { motion, useReducedMotion } from 'framer-motion';
import { useEffect, useState } from 'react';

import { FadeIn, Reveal } from '@/components/launchpad/reveal';
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
    const reduceMotion = useReducedMotion();

    useEffect(() => {
        setOrder(readCheckoutOrder());
    }, []);

    return (
        <>
            <Head title="Thank you | Launchpad Careers" />

            <section className="py-16 sm:py-20">
                <div className="container">
                    <div className="mx-auto flex max-w-lg flex-col items-center text-center">
                        <FadeIn>
                            <motion.div
                                className="text-lp-navy mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-[rgba(184,148,63,0.2)] text-2xl"
                                initial={
                                    reduceMotion
                                        ? false
                                        : { scale: 0.6, opacity: 0 }
                                }
                                animate={{ scale: 1, opacity: 1 }}
                                transition={{
                                    type: 'spring',
                                    stiffness: 260,
                                    damping: 18,
                                }}
                                aria-hidden
                            >
                                ✓
                            </motion.div>
                            <p className="mb-2 text-[0.72rem] font-medium tracking-[0.08em] text-[var(--lp-gold-on-light-sm)] uppercase">
                                Order received
                            </p>
                            <h1 className="font-lp-display text-lp-navy text-4xl">
                                Thank you
                            </h1>
                            <p className="text-lp-mid mt-3 text-sm leading-relaxed text-pretty">
                                {order
                                    ? `Thanks ${order.customer.name}. Your order ${order.reference} is recorded for ${gatewayLabel(order.gateway)}. If live payment keys are configured, charging happens at the gateway; otherwise the order is saved for fulfilment follow-up.`
                                    : 'Complete checkout from the cart to see your order details here.'}
                            </p>
                        </FadeIn>

                        {order ? (
                            <Reveal
                                delay={0.1}
                                className="mt-6 w-full rounded-xl border border-[var(--lp-border)] bg-[var(--lp-off)] px-4 py-4 text-left"
                            >
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
                            </Reveal>
                        ) : null}

                        <FadeIn
                            delay={0.18}
                            className="mt-8 flex w-full flex-col justify-center gap-3 sm:w-auto sm:flex-row sm:flex-wrap"
                        >
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
                        </FadeIn>
                    </div>
                </div>
            </section>
        </>
    );
}
