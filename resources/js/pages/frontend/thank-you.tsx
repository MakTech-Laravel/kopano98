import { Head, Link } from '@inertiajs/react';
import { useEffect, useMemo, useState } from 'react';

import { FadeIn } from '@/components/launchpad/reveal';
import LaunchpadLayout from '@/layouts/launchpad-layout';
import {
    readCheckoutOrder,
    type CheckoutOrderDraft,
} from '@/lib/launchpad/checkout-order';

const WHATSAPP_BASE = 'https://wa.me/27822192256';

export default function ThankYou() {
    return (
        <LaunchpadLayout>
            <ThankYouContent />
        </LaunchpadLayout>
    );
}

function ThankYouContent() {
    const [order, setOrder] = useState<CheckoutOrderDraft | null>(null);

    useEffect(() => {
        setOrder(readCheckoutOrder());
    }, []);

    const whatsappHref = useMemo(() => {
        const lines = [
            'Hi Launchpad — payment successful.',
            order?.reference ? `Order: ${order.reference}` : null,
            order?.customer.name ? `Name: ${order.customer.name}` : null,
            order?.customer.email ? `Email: ${order.customer.email}` : null,
            order?.displayTotal
                ? `Total: ${order.displayTotal}`
                : null,
            'I will share documents when ready.',
        ].filter(Boolean);

        return `${WHATSAPP_BASE}?text=${encodeURIComponent(lines.join('\n'))}`;
    }, [order]);

    return (
        <>
            <Head title="Payment Successful | Launchpad Careers" />

            <section className="bg-lp-navy flex flex-1 flex-col items-center justify-center px-5 py-16 text-center sm:py-20">
                <FadeIn className="mx-auto max-w-[520px]">
                    <h1 className="font-lp-display mb-3 text-[clamp(1.8rem,4vw,2.2rem)] font-bold text-white">
                        Payment Successful!
                    </h1>
                    <p className="mx-auto mb-8 max-w-[480px] text-[0.95rem] leading-[1.7] text-white/70">
                        Thank you for choosing Launchpad Careers. Your payment
                        has been received. We will start working on your order
                        and deliver it within{' '}
                        <strong className="text-lp-gold font-semibold">
                            1–2 business days
                        </strong>
                        .
                    </p>

                    <div className="mb-4 rounded-[10px] border border-white/10 bg-white/5 px-5 py-5 text-left">
                        <p className="mb-2 text-[0.85rem] font-bold tracking-[0.08em] text-[var(--lp-gold)] uppercase">
                            Next Step
                        </p>
                        <p className="mb-4 text-[0.88rem] leading-relaxed text-white/70">
                            Press the button below to send your purchase details
                            to our WhatsApp. We&apos;ll take it from there — no
                            rush on documents, share them whenever you&apos;re
                            ready.
                        </p>
                        <a
                            href={whatsappHref}
                            target="_blank"
                            rel="noreferrer"
                            className="btn-lp-gold inline-flex w-full items-center justify-center px-5 py-3 text-[0.9rem]"
                        >
                            Send Purchase Details to WhatsApp
                        </a>
                    </div>

                    <p className="mb-6 text-[0.78rem] text-white/45">
                        🔒 We open WhatsApp for you — if it didn&apos;t pop up,
                        use the gold button above.
                    </p>

                    <Link
                        href="/"
                        className="text-[0.88rem] font-semibold text-white/75 transition hover:text-[var(--lp-gold)]"
                    >
                        ← Back to Home
                    </Link>
                </FadeIn>
            </section>
        </>
    );
}
