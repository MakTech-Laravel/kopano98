import { Head, Link, router } from '@inertiajs/react';
import { useEffect, useMemo, useState, type FormEvent } from 'react';
import { toast } from 'sonner';

import { Reveal } from '@/components/launchpad/reveal';
import { SectionHeading } from '@/components/launchpad/section-heading';
import { useLaunchpadCart } from '@/contexts/launchpad-cart';
import { useLaunchpadLocale } from '@/contexts/launchpad-locale';
import { countryOptionsForSelect } from '@/data/launchpad/countries';
import {
    gatewayBlurb,
    gatewayLabel,
    type PaymentGateway,
} from '@/data/launchpad/currencies';
import LaunchpadLayout from '@/layouts/launchpad-layout';
import {
    createOrderReference,
    openPaddleOverlay,
    saveCheckoutOrder,
    submitPayfastForm,
    type CheckoutOrderResponse,
} from '@/lib/launchpad/checkout-order';

type CheckoutFormState = {
    name: string;
    email: string;
    phone: string;
};

export default function Checkout() {
    return (
        <LaunchpadLayout>
            <CheckoutContent />
        </LaunchpadLayout>
    );
}

function CheckoutContent() {
    const { items, total, clearCart, openCart } = useLaunchpadCart();
    const {
        countryCode,
        countryName,
        currencyCode,
        gateway,
        formatPrice,
        formatBaseZar,
        setCountryCode,
    } = useLaunchpadLocale();

    const [form, setForm] = useState<CheckoutFormState>({
        name: '',
        email: '',
        phone: '',
    });
    const [selectedGateway, setSelectedGateway] =
        useState<PaymentGateway>(gateway);
    const [submitting, setSubmitting] = useState(false);

    const recommendedGateway = gateway;

    useEffect(() => {
        setSelectedGateway(recommendedGateway);
    }, [recommendedGateway]);

    const lineItems = useMemo(
        () =>
            items.map((item) => ({
                ...item,
                lineTotal: item.price * item.quantity,
            })),
        [items],
    );

    const onSubmit = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        if (items.length === 0) {
            toast.error('Your cart is empty');
            openCart();

            return;
        }

        if (!form.name.trim() || !form.email.trim()) {
            toast.error('Please add your name and email');

            return;
        }

        setSubmitting(true);

        const order = {
            reference: createOrderReference(),
            createdAt: new Date().toISOString(),
            customer: {
                name: form.name.trim(),
                email: form.email.trim(),
                phone: form.phone.trim(),
                countryCode,
            },
            items,
            totalZar: total,
            currencyCode,
            displayTotal: formatPrice(total),
            gateway: selectedGateway,
        };

        saveCheckoutOrder(order);

        const csrf =
            (
                window.document.querySelector(
                    'meta[name="csrf-token"]',
                ) as HTMLMetaElement | null
            )?.content ?? '';

        void fetch('/checkout/orders', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Accept: 'application/json',
                'X-Requested-With': 'XMLHttpRequest',
                'X-CSRF-TOKEN': csrf,
            },
            body: JSON.stringify({
                reference: order.reference,
                customer_name: order.customer.name,
                customer_email: order.customer.email,
                customer_phone: order.customer.phone,
                country_code: order.customer.countryCode,
                currency_code: order.currencyCode,
                gateway: order.gateway,
                items: items.map((item) => ({
                    service_id: item.id,
                    quantity: item.quantity,
                })),
            }),
        })
            .then(async (response) => {
                if (!response.ok) {
                    const errorBody = (await response.json().catch(() => null)) as
                        | { message?: string; errors?: Record<string, string[]> }
                        | null;
                    const firstError = errorBody?.errors
                        ? Object.values(errorBody.errors)[0]?.[0]
                        : null;
                    throw new Error(firstError || errorBody?.message || 'Order create failed');
                }

                const payload = (await response.json()) as CheckoutOrderResponse;

                clearCart();

                if (
                    payload.gateway === 'payfast' &&
                    payload.payfast?.action &&
                    payload.payfast.form
                ) {
                    toast.success('Redirecting to Payfast');
                    submitPayfastForm(payload.payfast.action, payload.payfast.form);

                    return;
                }

                if (payload.gateway === 'paddle' && payload.paddle?.overlay) {
                    const opened = await openPaddleOverlay(payload.paddle.overlay);

                    if (opened) {
                        toast.success('Opening Paddle checkout');

                        return;
                    }
                }

                toast.success(
                    payload.payments_configured
                        ? 'Order created — complete payment when the gateway is ready'
                        : `Order ${payload.reference} saved. Add gateway keys to charge live.`,
                );
                router.visit(
                    `/thank-you?reference=${encodeURIComponent(payload.reference)}`,
                );
            })
            .catch((error: unknown) => {
                const message =
                    error instanceof Error
                        ? error.message
                        : 'Could not create order';
                toast.error(message);
            })
            .finally(() => setSubmitting(false));
    };

    return (
        <>
            <Head title="Checkout | Launchpad Careers" />

            <section className="bg-lp-navy relative overflow-hidden py-10 text-center sm:py-12">
                <div
                    className="pointer-events-none absolute inset-0 opacity-40"
                    style={{
                        background:
                            'radial-gradient(ellipse at 70% 0%, rgba(184,148,63,0.14), transparent 45%)',
                    }}
                />
                <div className="container relative">
                    <p className="mb-2 text-[0.7rem] font-medium tracking-[0.08em] text-[rgba(201,168,90,0.85)] uppercase">
                        Checkout
                    </p>
                    <h1 className="font-lp-display text-[clamp(1.85rem,5vw,2.85rem)] text-white">
                        Pay in your local currency
                    </h1>
                    <p className="mx-auto mt-3 max-w-lg text-sm text-pretty text-white/70">
                        Detected region: {countryName}. South Africa, Namibia and
                        Botswana check out with Payfast; other countries use
                        Paddle. Totals stay locked to your selected currency.
                    </p>
                </div>
            </section>

            <section className="py-8 sm:py-10">
                <div className="container">
                    {items.length === 0 ? (
                        <Reveal>
                            <div className="mx-auto max-w-lg text-center">
                                <SectionHeading
                                    label="Cart"
                                    title="Nothing to check out yet."
                                    subtitle="Add a service, then return here to complete secure checkout."
                                />
                                <Link
                                    href="/services"
                                    className="btn-lp-navy mt-2 inline-flex px-5 py-2.5 text-sm"
                                >
                                    Browse services
                                </Link>
                            </div>
                        </Reveal>
                    ) : (
                        <form
                            onSubmit={onSubmit}
                            className="mx-auto grid max-w-5xl gap-8 lg:grid-cols-[1.1fr_0.9fr]"
                        >
                            <Reveal>
                                <div>
                                    <h2 className="font-lp-display text-lp-navy text-2xl">
                                        Your details
                                    </h2>
                                    <p className="text-lp-mid mt-1 text-sm">
                                        We use this to confirm your order once live
                                        payments are connected.
                                    </p>

                                    <div className="mt-5 space-y-3">
                                        <label className="block">
                                            <span className="text-lp-light text-[0.7rem] font-medium tracking-wide uppercase">
                                                Full name
                                            </span>
                                            <input
                                                required
                                                name="name"
                                                value={form.name}
                                                onChange={(event) =>
                                                    setForm((current) => ({
                                                        ...current,
                                                        name: event.target.value,
                                                    }))
                                                }
                                                className="text-lp-navy mt-1 w-full rounded-md border border-[var(--lp-border)] bg-white px-3 py-2.5 text-sm outline-none focus:border-[var(--lp-navy)]"
                                                placeholder="Thabo Dlamini"
                                            />
                                        </label>
                                        <label className="block">
                                            <span className="text-lp-light text-[0.7rem] font-medium tracking-wide uppercase">
                                                Email
                                            </span>
                                            <input
                                                required
                                                type="email"
                                                name="email"
                                                value={form.email}
                                                onChange={(event) =>
                                                    setForm((current) => ({
                                                        ...current,
                                                        email: event.target.value,
                                                    }))
                                                }
                                                className="text-lp-navy mt-1 w-full rounded-md border border-[var(--lp-border)] bg-white px-3 py-2.5 text-sm outline-none focus:border-[var(--lp-navy)]"
                                                placeholder="you@email.com"
                                            />
                                        </label>
                                        <label className="block">
                                            <span className="text-lp-light text-[0.7rem] font-medium tracking-wide uppercase">
                                                Phone / WhatsApp
                                            </span>
                                            <input
                                                name="phone"
                                                value={form.phone}
                                                onChange={(event) =>
                                                    setForm((current) => ({
                                                        ...current,
                                                        phone: event.target.value,
                                                    }))
                                                }
                                                className="text-lp-navy mt-1 w-full rounded-md border border-[var(--lp-border)] bg-white px-3 py-2.5 text-sm outline-none focus:border-[var(--lp-navy)]"
                                                placeholder="+27…"
                                            />
                                        </label>
                                        <label className="block">
                                            <span className="text-lp-light text-[0.7rem] font-medium tracking-wide uppercase">
                                                Billing country
                                            </span>
                                            <select
                                                value={countryCode}
                                                onChange={(event) =>
                                                    setCountryCode(event.target.value)
                                                }
                                                className="text-lp-navy mt-1 w-full rounded-md border border-[var(--lp-border)] bg-white px-3 py-2.5 text-sm outline-none focus:border-[var(--lp-navy)]"
                                            >
                                                {countryOptionsForSelect().map(
                                                    (country) => (
                                                        <option
                                                            key={country.code}
                                                            value={country.code}
                                                        >
                                                            {country.name}
                                                        </option>
                                                    ),
                                                )}
                                            </select>
                                        </label>
                                    </div>

                                    <h2 className="font-lp-display text-lp-navy mt-8 text-2xl">
                                        Payment method
                                    </h2>
                                    <p className="text-lp-mid mt-1 text-sm">
                                        Recommended for {countryName}:{' '}
                                        {gatewayLabel(recommendedGateway)}.
                                    </p>

                                    <div className="mt-4 space-y-3">
                                        {(
                                            [
                                                'payfast',
                                                'paddle',
                                            ] as PaymentGateway[]
                                        ).map((option) => {
                                            const selected =
                                                selectedGateway === option;
                                            const recommended =
                                                recommendedGateway === option;

                                            return (
                                                <button
                                                    key={option}
                                                    type="button"
                                                    onClick={() =>
                                                        setSelectedGateway(option)
                                                    }
                                                    className={`w-full rounded-lg border px-4 py-3 text-left transition ${selected
                                                            ? 'border-[var(--lp-navy)] bg-[var(--lp-off)]'
                                                            : 'border-[var(--lp-border)] bg-white hover:border-[var(--lp-navy-3)]'
                                                        }`}
                                                >
                                                    <div className="flex items-start justify-between gap-3">
                                                        <div>
                                                            <p className="text-lp-navy text-sm font-semibold">
                                                                {gatewayLabel(option)}
                                                                {recommended ? (
                                                                    <span className="ml-2 text-[0.65rem] font-medium tracking-wide text-[var(--lp-gold-on-light-sm)] uppercase">
                                                                        Recommended
                                                                    </span>
                                                                ) : null}
                                                            </p>
                                                            <p className="text-lp-mid mt-1 text-[0.78rem] leading-relaxed">
                                                                {gatewayBlurb(option)}
                                                            </p>
                                                        </div>
                                                        <span
                                                            className={`mt-0.5 h-4 w-4 shrink-0 rounded-full border ${selected
                                                                    ? 'border-[var(--lp-navy)] bg-[var(--lp-navy)]'
                                                                    : 'border-[var(--lp-border)]'
                                                                }`}
                                                            aria-hidden
                                                        />
                                                    </div>
                                                </button>
                                            );
                                        })}
                                    </div>
                                </div>
                            </Reveal>

                            <Reveal delay={0.05}>
                                <aside className="rounded-xl border border-[var(--lp-border)] bg-white p-5 lg:sticky lg:top-20">
                                    <h2 className="font-lp-display text-lp-navy text-2xl">
                                        Order summary
                                    </h2>
                                    <ul className="mt-4 space-y-3 border-b border-[var(--lp-border)] pb-4">
                                        {lineItems.map((item) => (
                                            <li
                                                key={item.id}
                                                className="flex items-start justify-between gap-3 text-sm"
                                            >
                                                <div>
                                                    <p className="text-lp-navy font-semibold">
                                                        {item.name}
                                                    </p>
                                                    <p className="text-lp-light text-xs">
                                                        Qty {item.quantity}
                                                    </p>
                                                </div>
                                                <p className="text-lp-navy shrink-0 font-medium">
                                                    {formatPrice(item.lineTotal)}
                                                </p>
                                            </li>
                                        ))}
                                    </ul>

                                    <div className="mt-4 flex items-end justify-between gap-3">
                                        <div>
                                            <p className="text-lp-mid text-sm">Total</p>
                                            {currencyCode !== 'ZAR' ? (
                                                <p className="text-lp-light text-[0.7rem]">
                                                    Base {formatBaseZar(total)}
                                                </p>
                                            ) : null}
                                        </div>
                                        <p className="font-lp-display text-lp-navy text-3xl">
                                            {formatPrice(total)}
                                        </p>
                                    </div>

                                    <p className="text-lp-mid mt-3 text-[0.72rem] leading-relaxed">
                                        Displayed in {currencyCode}.{' '}
                                        {selectedGateway === 'paddle'
                                            ? 'Paddle will finalise local tax and FX when live.'
                                            : 'Payfast will take ZAR when live for SA checkout.'}
                                    </p>

                                    <button
                                        type="submit"
                                        disabled={submitting}
                                        className="btn-lp-gold mt-5 w-full py-3 text-sm disabled:opacity-50"
                                    >
                                        {submitting
                                            ? 'Preparing checkout…'
                                            : `Continue with ${gatewayLabel(selectedGateway)}`}
                                    </button>

                                    <Link
                                        href="/services"
                                        className="text-lp-mid mt-3 block text-center text-xs hover:underline"
                                    >
                                        Continue shopping
                                    </Link>
                                </aside>
                            </Reveal>
                        </form>
                    )}
                </div>
            </section>
        </>
    );
}
