import { Head } from '@inertiajs/react';

import { Reveal } from '@/components/launchpad/reveal';
import { SectionHeading } from '@/components/launchpad/section-heading';
import { ServiceCard } from '@/components/launchpad/service-card';
import { launchpadServices } from '@/data/launchpad/services';
import LaunchpadLayout from '@/layouts/launchpad-layout';

export default function ServicesIndex() {
    return (
        <LaunchpadLayout>
            <Head title="Services & Pricing | Launchpad Careers" />

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
                        Services &amp; Pricing
                    </p>
                    <h1 className="font-lp-display text-[clamp(1.85rem,5vw,2.85rem)] text-white">
                        Professional career services
                    </h1>
                    <p className="mx-auto mt-3 max-w-lg text-sm text-pretty text-white/70">
                        Prices adapt to your region. South Africa checks out with
                        Payfast; international visitors use Paddle — live charging
                        connects next milestone.
                    </p>
                </div>
            </section>

            <section className="py-8 sm:py-10">
                <div className="container">
                    <Reveal>
                        <SectionHeading
                            label="Catalogue"
                            title="Pick what you need."
                            subtitle="CV rewrites, LinkedIn, letters, interview prep, coaching, and kits."
                        />
                    </Reveal>
                    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                        {launchpadServices.map((service, index) => (
                            <Reveal key={service.id} delay={index * 0.04}>
                                <ServiceCard service={service} />
                            </Reveal>
                        ))}
                    </div>
                </div>
            </section>
        </LaunchpadLayout>
    );
}
