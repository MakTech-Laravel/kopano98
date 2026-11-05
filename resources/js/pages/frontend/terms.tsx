import { Head } from '@inertiajs/react';

import { FadeIn, Reveal } from '@/components/launchpad/reveal';
import LaunchpadLayout from '@/layouts/launchpad-layout';

export default function Terms() {
    return (
        <LaunchpadLayout>
            <Head title="Terms | Launchpad Careers" />

            <article className="py-10 sm:py-12">
                <div className="container">
                    <div className="mx-auto max-w-3xl">
                        <FadeIn>
                            <h1 className="font-lp-display text-lp-navy mb-4 text-3xl">
                                Terms of service
                            </h1>
                        </FadeIn>
                        <div className="text-lp-mid space-y-4 text-sm leading-relaxed text-pretty">
                            <Reveal delay={0.05}>
                                <p>
                                    Launchpad Careers provides career documents and
                                    coaching services. By placing an order you agree
                                    that deliverables are for your personal job search
                                    use.
                                </p>
                            </Reveal>
                            <Reveal delay={0.1}>
                                <p>
                                    Turnaround estimates start after we receive
                                    complete source materials. Revision rounds are
                                    listed per service. Payment is due before work
                                    begins unless otherwise agreed.
                                </p>
                            </Reveal>
                            <Reveal delay={0.15}>
                                <p>
                                    Free tools on this site are provided as-is for
                                    guidance. They do not replace professional advice.
                                    Checkout shows Payfast for South African customers
                                    and Paddle for international customers with
                                    local-currency pricing. Live payment processing
                                    connects in the next milestone.
                                </p>
                            </Reveal>
                            <Reveal delay={0.2}>
                                <p>
                                    For questions:{' '}
                                    <a
                                        href="https://wa.me/27822192256"
                                        className="font-semibold break-all text-[var(--lp-gold-on-light)] sm:break-normal"
                                    >
                                        WhatsApp Launchpad
                                    </a>
                                    .
                                </p>
                            </Reveal>
                        </div>
                    </div>
                </div>
            </article>
        </LaunchpadLayout>
    );
}
