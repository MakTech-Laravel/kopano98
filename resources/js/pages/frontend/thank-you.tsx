import { Head, Link } from '@inertiajs/react';

import LaunchpadLayout from '@/layouts/launchpad-layout';

export default function ThankYou() {
    return (
        <LaunchpadLayout>
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
                            This is the post-checkout shell from the current Launchpad
                            site. Real payment confirmation and email hooks land with
                            Milestone 2.
                        </p>
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
        </LaunchpadLayout>
    );
}
