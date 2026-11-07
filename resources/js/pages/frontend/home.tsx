import { Head, Link } from '@inertiajs/react';
import { useState } from 'react';

import { AtsShowcaseSection } from '@/components/launchpad/ats-showcase-section';
import { CompanyLogosSection } from '@/components/launchpad/company-logos-section';
import { CvTemplateSlider } from '@/components/launchpad/cv-template-slider';
import { LaunchpadHero } from '@/components/launchpad/hero';
import { Reveal } from '@/components/launchpad/reveal';
import { SectionHeading } from '@/components/launchpad/section-heading';
import { ServiceVisualCards } from '@/components/launchpad/service-visual-cards';
import { useLaunchpadLocale } from '@/contexts/launchpad-locale';
import { launchpadFaqs } from '@/data/launchpad/faqs';
import { launchpadServices } from '@/data/launchpad/services';
import { launchpadTestimonials } from '@/data/launchpad/testimonials';
import LaunchpadLayout from '@/layouts/launchpad-layout';

const stats = [
    { num: '2.8k+', lbl: 'CVs reviewed' },
    { num: '78%', lbl: 'Avg. ATS lift' },
    { num: '48h', lbl: 'Typical turnaround' },
    { num: 'ZA+', lbl: 'Clients worldwide' },
];

const whyCards = [
    {
        title: 'First-hand experience',
        body: 'Every document is reviewed by someone who has navigated the job market first-hand — practical advice, not theory.',
    },
    {
        title: 'Industry insight',
        body: 'Hands-on experience in demanding, results-driven industries shapes how every CV and profile is approached.',
    },
    {
        title: 'Local & international',
        body: 'Applying in South Africa or targeting roles abroad, we tailor your documents for the right market and currency.',
    },
];

const howSteps = [
    {
        title: 'Choose a service or package',
        body: 'Browse services and pick what you need — individual services or a bundle.',
    },
    {
        title: 'Place your order & pay securely',
        body: 'Checkout in your local currency via Payfast (SA) or Paddle (international). Payment is instant.',
    },
    {
        title: 'Message us on WhatsApp',
        body: 'Share your details and documents whenever you’re ready — no rush at all.',
    },
    {
        title: 'Delivered to your inbox',
        body: 'Polished documents within 1–2 business days. Revisions are always part of the process.',
    },
];

export default function Home() {
    return (
        <LaunchpadLayout>
            <HomeContent />
        </LaunchpadLayout>
    );
}

function HomeContent() {
    const [openFaq, setOpenFaq] = useState<number | null>(0);
    const { formatPrice, gatewayName, currencyCode } = useLaunchpadLocale();
    const previewServices = launchpadServices.filter((service) =>
        [
            'cv-rewrite-entry',
            'linkedin-graduate',
            'interview-prep',
            'essentials',
        ].includes(service.id),
    );

    return (
        <>
            <Head title="Free ATS CV Checker | Launchpad Careers">
                <meta
                    head-key="description"
                    name="description"
                    content="Free ATS CV checker — see your match score in seconds. Plus professional CV rewrites, LinkedIn profiles & interview coaching from Launchpad Careers."
                />
            </Head>

            <LaunchpadHero
                title={
                    <>
                        Is your CV{' '}
                        <span className="text-lp-gold">ATS friendly?</span>
                    </>
                }
                subtitle="Free ATS check in seconds — plus professional rewrites, LinkedIn fixes, and interview prep from Launchpad Careers."
                showTemplateCarousel
            />

            <div className="bg-lp-navy-2 border-t border-[var(--lp-navy-3)]">
                <div className="container grid grid-cols-2 md:grid-cols-4">
                    {stats.map((stat, index) => (
                        <div
                            key={stat.lbl}
                            className={`px-3 py-4 text-center ${index % 2 === 0
                                ? 'border-r border-[var(--lp-navy-3)]'
                                : ''
                                } ${index < 2
                                    ? 'border-b border-[var(--lp-navy-3)] md:border-b-0'
                                    : ''
                                } md:border-r md:last:border-r-0`}
                        >
                            <span className="font-lp-display text-lp-gold block text-2xl sm:text-[1.75rem]">
                                {stat.num}
                            </span>
                            <span className="mt-1 block text-[0.65rem] text-white/50">
                                {stat.lbl}
                            </span>
                        </div>
                    ))}
                </div>
            </div>

            <CompanyLogosSection />
            <AtsShowcaseSection />
            <CvTemplateSlider />

            <section className="py-10 sm:py-12">
                <div className="container">
                    <Reveal>
                        <SectionHeading
                            label="Why Launchpad"
                            title={
                                <>
                                    Built by a{' '}
                                    <span className="text-[var(--lp-gold-on-light)]">
                                        professional
                                    </span>{' '}
                                    · designed to get you hired.
                                </>
                            }
                            subtitle="Every document we deliver is reviewed personally by an industry professional who has navigated the job market first-hand."
                        />
                    </Reveal>
                    <div className="grid gap-4 md:grid-cols-3">
                        {whyCards.map((card, index) => (
                            <Reveal key={card.title} delay={index * 0.06}>
                                <div className="h-full rounded-[10px] border border-[var(--lp-border)] bg-[var(--lp-off)] p-5 transition hover:border-[var(--lp-navy-3)]">
                                    <div className="bg-lp-gold mb-3 h-px w-8" />
                                    <h3 className="text-lp-navy mb-2 text-sm font-semibold">
                                        {card.title}
                                    </h3>
                                    <p className="text-lp-mid text-[0.8rem] leading-relaxed">
                                        {card.body}
                                    </p>
                                </div>
                            </Reveal>
                        ))}
                    </div>
                </div>
            </section>

            <section className="border-y border-[var(--lp-border)] bg-[var(--lp-off)] py-10 sm:py-12">
                <div className="container">
                    <Reveal>
                        <SectionHeading
                            label="What clients say"
                            title="Results from industry professionals."
                            subtitle="Professionals across South Africa who got shortlisted after working with us."
                        />
                    </Reveal>
                    <div className="grid gap-4 md:grid-cols-3">
                        {launchpadTestimonials.map((item, index) => (
                            <Reveal key={item.name} delay={index * 0.05}>
                                <figure className="flex h-full flex-col rounded-[10px] border border-[var(--lp-border)] bg-white p-5 shadow-sm">
                                    <div className="mb-3 flex items-center justify-between">
                                        <span className="font-lp-display text-[1.6rem] leading-none text-[var(--lp-gold-on-light)]">
                                            “
                                        </span>
                                        <span className="text-[0.85rem] text-amber-500">
                                            ★★★★★
                                        </span>
                                    </div>
                                    <blockquote className="text-lp-mid flex-1 text-[0.83rem] leading-relaxed">
                                        {item.quote}
                                    </blockquote>
                                    <div className="mt-4 mb-3">
                                        <span className="rounded bg-[#dbeafe] px-2 py-0.5 text-[0.68rem] font-bold text-[#1e40af]">
                                            {item.service}
                                        </span>
                                    </div>
                                    <figcaption className="flex items-center gap-3">
                                        <img
                                            src={item.photo}
                                            alt={item.name}
                                            className="h-11 w-11 rounded-full object-cover object-top"
                                            loading="lazy"
                                        />
                                        <div>
                                            <p className="text-lp-navy text-[0.78rem] font-bold">
                                                {item.name}
                                            </p>
                                            <p className="text-lp-mid text-[0.7rem]">
                                                {item.role}
                                            </p>
                                        </div>
                                    </figcaption>
                                </figure>
                            </Reveal>
                        ))}
                    </div>
                </div>
            </section>

            <section className="py-10 sm:py-12">
                <div className="container">
                    <Reveal>
                        <SectionHeading
                            label="Free tools"
                            title="Scan first. Rewrite when you’re ready."
                            subtitle="Try the ATS checker and career tools with no payment. Professional services stay one click away."
                        />
                    </Reveal>
                    <ServiceVisualCards />
                </div>
            </section>

            <section className="bg-[var(--lp-off)] py-10 sm:py-12">
                <div className="container">
                    <Reveal>
                        <SectionHeading
                            label="What we offer"
                            title="From a quick CV fix to a full career kit."
                            subtitle={`Human-written deliverables. Prices in ${currencyCode} · checkout via ${gatewayName}.`}
                        />
                    </Reveal>
                    <div className="grid gap-3 sm:grid-cols-2 sm:gap-4 lg:grid-cols-4">
                        {previewServices.map((service, index) => (
                            <Reveal key={service.id} delay={index * 0.05}>
                                <div className="flex h-full flex-col rounded-[10px] border border-[var(--lp-border)] bg-white p-4 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md">
                                    <h3 className="text-lp-navy text-sm font-bold">
                                        {service.name.replace(
                                            /^CV Rewrite — |^LinkedIn Profile Fix — /,
                                            '',
                                        )}
                                    </h3>
                                    <p className="text-lp-mid mt-1 line-clamp-2 flex-1 text-[0.78rem]">
                                        {service.description}
                                    </p>
                                    <p className="font-lp-display mt-3 text-[1.35rem] text-[var(--lp-gold-on-light)]">
                                        {formatPrice(service.price)}
                                    </p>
                                </div>
                            </Reveal>
                        ))}
                    </div>
                    <Reveal className="mt-6 text-center sm:text-left">
                        <Link
                            href="/services"
                            className="btn-lp-navy inline-flex px-5 py-2.5 text-sm"
                        >
                            See all services
                        </Link>
                    </Reveal>
                </div>
            </section>

            <section className="py-10 sm:py-12">
                <div className="container">
                    <div className="mx-auto max-w-3xl">
                        <Reveal>
                            <SectionHeading
                                label="How it works"
                                title="Four simple steps."
                            />
                        </Reveal>
                        <div className="space-y-0">
                            {howSteps.map((step, index) => (
                                <Reveal key={step.title} delay={index * 0.05}>
                                    <div className="flex gap-3 border-b border-[var(--lp-border)] py-4 last:border-b-0 sm:gap-4">
                                        <div className="bg-lp-navy text-lp-gold font-lp-display flex h-9 w-9 shrink-0 items-center justify-center rounded text-lg">
                                            {index + 1}
                                        </div>
                                        <div className="min-w-0">
                                            <h4 className="text-lp-navy text-[0.88rem] font-bold">
                                                {step.title}
                                            </h4>
                                            <p className="text-lp-mid mt-1 text-[0.78rem] leading-relaxed">
                                                {step.body}
                                            </p>
                                        </div>
                                    </div>
                                </Reveal>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            <section className="pb-12 sm:pb-14">
                <div className="container">
                    <div className="mx-auto max-w-3xl">
                        <Reveal>
                            <SectionHeading
                                label="FAQ"
                                title="Common questions, answered."
                            />
                        </Reveal>
                        <div className="space-y-2">
                            {launchpadFaqs.slice(0, 5).map((faq, index) => {
                                const open = openFaq === index;

                                return (
                                    <Reveal
                                        key={faq.question}
                                        delay={index * 0.03}
                                    >
                                        <div className="overflow-hidden rounded-xl border border-[var(--lp-border)] bg-white shadow-sm">
                                            <button
                                                type="button"
                                                className="text-lp-navy flex w-full items-center justify-between gap-3 px-4 py-3 text-left text-sm font-semibold"
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
                        <Reveal className="mt-5 text-center">
                            <Link
                                href="/services"
                                className="text-lp-navy text-sm font-semibold underline-offset-4 hover:underline"
                            >
                                View full pricing &amp; FAQ →
                            </Link>
                        </Reveal>
                    </div>
                </div>
            </section>

            <section className="border-t border-[var(--lp-border)] bg-lp-navy py-12 text-center">
                <div className="container">
                    <p className="mb-2 text-[0.7rem] font-medium tracking-[0.08em] text-[rgba(201,168,90,0.85)] uppercase">
                        Ready to stand out?
                    </p>
                    <h2 className="font-lp-display text-[clamp(1.6rem,4vw,2.4rem)] text-white">
                        Start{' '}
                        <span className="text-lp-gold">free</span> and
                        upgrade when ready.
                    </h2>
                    <p className="mx-auto mt-3 max-w-md text-sm text-white/65">
                        Free tools give instant feedback. When you want a human
                        expert, we’re here.
                    </p>
                    <div className="mt-6 flex flex-col items-center justify-center gap-3 sm:flex-row">
                        <Link
                            href="/services"
                            className="btn-lp-gold inline-flex px-5 py-2.5 text-sm"
                        >
                            Order a service
                        </Link>
                        <Link
                            href="/tools"
                            className="inline-flex rounded-[5px] border border-white/30 px-5 py-2.5 text-sm font-semibold text-white/90 transition hover:border-white/55"
                        >
                            Try free tools first
                        </Link>
                    </div>
                </div>
            </section>
        </>
    );
}
