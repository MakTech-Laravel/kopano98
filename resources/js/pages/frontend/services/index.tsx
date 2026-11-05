import { Head, Link } from '@inertiajs/react';
import { useState } from 'react';

import { PageBand } from '@/components/launchpad/page-band';
import { Reveal } from '@/components/launchpad/reveal';
import { SectionHeading } from '@/components/launchpad/section-heading';
import { ServiceCard } from '@/components/launchpad/service-card';
import { launchpadFaqs } from '@/data/launchpad/faqs';
import {
    serviceGroups,
    servicesInGroup,
} from '@/data/launchpad/services';
import LaunchpadLayout from '@/layouts/launchpad-layout';

export default function ServicesIndex() {
    const [openFaq, setOpenFaq] = useState<number | null>(0);

    return (
        <LaunchpadLayout>
            <Head title="Services & Pricing | Launchpad Careers" />

            <PageBand>
                <p className="mb-2 text-[0.7rem] font-medium tracking-[0.08em] text-[rgba(201,168,90,0.85)] uppercase">
                    Individual services &amp; packages
                </p>
                <h1 className="font-lp-display text-[clamp(1.9rem,5vw,3rem)] text-white">
                    Pay only for what you{' '}
                    <span className="text-lp-gold">need.</span>
                </h1>
                <p className="mx-auto mt-3 max-w-lg text-sm text-pretty text-white/70">
                    Delivered to your inbox within the stated timeframe. Local
                    currency pricing · Payfast (SA) or Paddle (international).
                </p>
            </PageBand>

            <section className="py-8 sm:py-10">
                <div className="container space-y-12">
                    {serviceGroups.map((group) => {
                        const items = servicesInGroup(group.id);

                        return (
                            <div key={group.id} id={group.id}>
                                <Reveal>
                                    <SectionHeading
                                        label={group.label}
                                        title={group.title}
                                        subtitle={group.note}
                                    />
                                </Reveal>
                                {group.id === 'linkedin' ? (
                                    <p className="text-lp-mid mb-5 max-w-3xl text-[0.82rem] leading-relaxed">
                                        Your LinkedIn profile and your CV get
                                        checked against each other. One tells a
                                        strong story, the other reinforces it —
                                        so recruiters never get a reason to look
                                        away.
                                    </p>
                                ) : null}
                                <div
                                    className={`grid gap-4 ${group.id === 'package' ||
                                        group.id === 'portfolio'
                                        ? 'sm:grid-cols-2'
                                        : 'sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4'
                                        }`}
                                >
                                    {items.map((service, index) => (
                                        <Reveal
                                            key={service.id}
                                            delay={index * 0.04}
                                        >
                                            <ServiceCard
                                                service={service}
                                                variant={
                                                    group.id === 'package' ||
                                                        group.id === 'portfolio'
                                                        ? 'package'
                                                        : 'tier'
                                                }
                                            />
                                        </Reveal>
                                    ))}
                                </div>
                            </div>
                        );
                    })}
                </div>
            </section>

            <section className="border-t border-[var(--lp-border)] bg-[var(--lp-off)] py-10 sm:py-12">
                <div className="container">
                    <div className="mx-auto max-w-3xl">
                        <Reveal>
                            <SectionHeading
                                label="FAQ"
                                title="Common questions, answered."
                            />
                        </Reveal>
                        <div className="space-y-2">
                            {launchpadFaqs.map((faq, index) => {
                                const open = openFaq === index;

                                return (
                                    <Reveal
                                        key={faq.question}
                                        delay={index * 0.03}
                                    >
                                        <div className="overflow-hidden rounded-xl border border-[var(--lp-border)] bg-white shadow-sm">
                                            <button
                                                type="button"
                                                className="text-lp-navy flex w-full items-center justify-between gap-3 px-4 py-3.5 text-left text-sm font-semibold"
                                                onClick={() =>
                                                    setOpenFaq(
                                                        open ? null : index,
                                                    )
                                                }
                                            >
                                                <span className="min-w-0">
                                                    {faq.question}
                                                </span>
                                                <span className="text-lp-gold shrink-0 text-lg">
                                                    {open ? '−' : '+'}
                                                </span>
                                            </button>
                                            {open ? (
                                                <p className="text-lp-mid px-4 pb-4 text-[0.82rem] leading-relaxed">
                                                    {faq.answer}
                                                </p>
                                            ) : null}
                                        </div>
                                    </Reveal>
                                );
                            })}
                        </div>
                        <a
                            href="https://wa.me/27822192256?text=Hi%20Launchpad%2C%20I%20have%20a%20question%20about%20your%20services."
                            target="_blank"
                            rel="noreferrer"
                            className="text-lp-navy mt-5 inline-flex items-center rounded-[5px] border-[1.5px] border-[var(--lp-border)] px-4 py-2.5 text-[0.82rem] font-semibold transition hover:border-[var(--lp-navy)]"
                        >
                            Still have a question? Ask us on WhatsApp
                        </a>
                    </div>
                </div>
            </section>

            <section className="py-10 sm:py-12">
                <div className="container text-center">
                    <Reveal>
                        <SectionHeading
                            label="Ready to stand out?"
                            title="Start free and upgrade when ready."
                            subtitle="Free tools give instant feedback. When you want a human expert, we’re here."
                        />
                        <div className="mt-2 flex flex-col items-center justify-center gap-3 sm:flex-row">
                            <Link
                                href="/tools"
                                className="btn-lp-gold inline-flex px-5 py-2.5 text-sm"
                            >
                                Try free tools
                            </Link>
                            <a
                                href="#cv-rewrite"
                                className="inline-flex rounded-[5px] border-[1.5px] border-[var(--lp-navy)] px-5 py-2.5 text-sm font-semibold text-[var(--lp-navy)]"
                            >
                                Back to pricing
                            </a>
                        </div>
                    </Reveal>
                </div>
            </section>
        </LaunchpadLayout>
    );
}
