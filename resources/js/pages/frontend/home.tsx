import { Head, Link } from '@inertiajs/react';
import { useState } from 'react';

import { LaunchpadHero } from '@/components/launchpad/hero';
import { Reveal } from '@/components/launchpad/reveal';
import { SectionHeading } from '@/components/launchpad/section-heading';
import { useLaunchpadLocale } from '@/contexts/launchpad-locale';
import { launchpadFaqs } from '@/data/launchpad/faqs';
import { launchpadServices } from '@/data/launchpad/services';
import LaunchpadLayout from '@/layouts/launchpad-layout';

const stats = [
    { num: '2.8k+', lbl: 'CVs reviewed' },
    { num: '78%', lbl: 'Avg. ATS lift' },
    { num: '48h', lbl: 'Typical turnaround' },
    { num: 'ZA+', lbl: 'Clients worldwide' },
];

const hired = [
    'Thabo · Hired at Discovery',
    'Aisha · Offer from Deloitte',
    'Lebo · Role at Absa',
    'Nomsa · Contract at Amazon',
    'Sipho · Graduate intake',
    'Priya · Product role',
];

const whyCards = [
    {
        title: 'ATS-safe by default',
        body: 'Single-column, parser-friendly layouts — the style recruiters and systems actually read.',
    },
    {
        title: 'Human writers, not fluff',
        body: 'Buzzwords cut, weak verbs replaced, impact quantified for real hiring screens.',
    },
    {
        title: 'Free tools first',
        body: 'Scan your CV before you spend. Upgrade to a rewrite, LinkedIn fix, or Career Kit when ready.',
    },
    {
        title: 'WhatsApp-ready support',
        body: 'After you order, we guide you on WhatsApp so materials and revisions stay simple.',
    },
];

const howSteps = [
    {
        title: 'Choose a service or package',
        body: 'Browse services and pick what you need — CV, LinkedIn, letter, prep, or the full Career Kit.',
    },
    {
        title: 'Place your order',
        body: 'Add to cart from Services, then check out in your local currency via Payfast (SA) or Paddle (international).',
    },
    {
        title: 'Message us on WhatsApp',
        body: 'Send your current CV / profile details so writers can start immediately.',
    },
    {
        title: 'Delivered to your inbox',
        body: 'Polished, professional documents delivered with clear revision rounds.',
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
        ['cv-rewrite-mid', 'linkedin-fix', 'interview-prep', 'career-kit'].includes(
            service.id,
        ),
    );

    return (
        <>
            <Head title="Free ATS CV Checker | Launchpad Careers">
                <meta
                    head-key="description"
                    name="description"
                    content="Free ATS CV checker — plus professional CV rewrites, LinkedIn profile fixes, interview prep and coaching from Launchpad Careers."
                />
            </Head>

            <LaunchpadHero
                title={
                    <>
                        Is your CV{' '}
                        <em className="text-lp-gold italic">ATS friendly?</em>
                    </>
                }
                subtitle="Free ATS check in seconds — plus professional rewrites, LinkedIn fixes, and interview prep from Launchpad Careers."
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

            <div className="bg-lp-navy-2 overflow-hidden py-4">
                <p className="mb-3 text-center text-[0.72rem] font-bold tracking-wider text-white/55 uppercase">
                    Recently placed
                </p>
                <div className="lp-hired-track gap-0">
                    {[...hired, ...hired].map((item, index) => (
                        <span
                            key={`${item}-${index}`}
                            className="px-6 text-sm font-bold whitespace-nowrap text-white/80 sm:px-10 sm:text-[1.05rem]"
                        >
                            {item}
                            <span className="bg-lp-gold ml-6 inline-block h-1.5 w-1.5 rounded-full align-middle sm:ml-10" />
                        </span>
                    ))}
                </div>
            </div>

            <section className="py-10 sm:py-12">
                <div className="container">
                    <Reveal>
                        <SectionHeading
                            label="Why Launchpad"
                            title="Built for hiring outcomes — not pretty PDFs."
                            subtitle="The same IA as launchpadcareers.co.za: free tools, paid services, templates, and human support."
                        />
                    </Reveal>
                    <div className="grid gap-4 sm:grid-cols-2">
                        {whyCards.map((card, index) => (
                            <Reveal key={card.title} delay={index * 0.06}>
                                <div className="h-full rounded-lg border border-[var(--lp-border)] bg-[var(--lp-off)] p-4 transition hover:border-[var(--lp-navy-3)] sm:p-5">
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

            <section className="pb-4">
                <div className="container">
                    <Reveal>
                        <SectionHeading
                            label="Free tools"
                            title="Scan first. Rewrite when you’re ready."
                            subtitle="Try the ATS checker and career tools with no payment. Professional services stay one click away."
                        />
                    </Reveal>
                    <div className="grid gap-4 md:grid-cols-3">
                        {[
                            {
                                title: 'ATS CV Checker',
                                body: 'Upload a CV and see a sample match score — live parsing lands in Milestone 2.',
                                href: '/tools',
                            },
                            {
                                title: 'LinkedIn preview',
                                body: 'Explore headline and About improvements before you order a full profile fix.',
                                href: '/tools',
                            },
                            {
                                title: 'Cover letter shell',
                                body: 'Draft structure ready for role-specific generation later.',
                                href: '/tools',
                            },
                        ].map((tool, index) => (
                            <Reveal key={tool.title} delay={index * 0.05}>
                                <Link
                                    href={tool.href}
                                    className="block h-full rounded-lg border border-[var(--lp-border)] bg-white p-5 transition hover:border-[var(--lp-navy-3)]"
                                >
                                    <h3 className="text-lp-navy mb-2 text-sm font-bold">
                                        {tool.title}
                                    </h3>
                                    <p className="text-lp-mid text-[0.8rem] leading-relaxed">
                                        {tool.body}
                                    </p>
                                </Link>
                            </Reveal>
                        ))}
                    </div>
                </div>
            </section>

            <section className="bg-[var(--lp-off)] py-10 sm:py-12">
                <div className="container">
                    <Reveal>
                        <SectionHeading
                            label="Services"
                            title="From a quick CV fix to a full career kit."
                            subtitle={`Human-written deliverables. Prices shown in ${currencyCode}; checkout via ${gatewayName}.`}
                        />
                    </Reveal>
                    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                        {previewServices.map((service, index) => (
                            <Reveal key={service.id} delay={index * 0.05}>
                                <div className="h-full rounded-xl border border-[var(--lp-border)] bg-white p-4 shadow-sm">
                                    <h3 className="text-lp-navy text-sm font-bold">
                                        {service.name}
                                    </h3>
                                    <p className="text-lp-mid mt-1 line-clamp-2 text-[0.78rem]">
                                        {service.description}
                                    </p>
                                    <p className="font-lp-display mt-3 text-[1.25rem] text-[var(--lp-gold-on-light)]">
                                        {formatPrice(service.price)}
                                    </p>
                                </div>
                            </Reveal>
                        ))}
                    </div>
                    <Reveal className="mt-6">
                        <Link
                            href="/services"
                            className="btn-lp-navy inline-flex px-5 py-2.5 text-sm"
                        >
                            Browse all services
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
                                title="Four clear steps."
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
                            <SectionHeading label="FAQ" title="Straight answers." />
                        </Reveal>
                        <div className="space-y-2">
                            {launchpadFaqs.map((faq, index) => {
                                const open = openFaq === index;

                                return (
                                    <Reveal key={faq.question} delay={index * 0.03}>
                                        <div className="overflow-hidden rounded-xl border border-[var(--lp-border)] bg-white shadow-sm">
                                            <button
                                                type="button"
                                                className="text-lp-navy flex w-full items-center justify-between gap-3 px-4 py-3 text-left text-sm font-semibold"
                                                onClick={() =>
                                                    setOpenFaq(open ? null : index)
                                                }
                                            >
                                                <span className="min-w-0">{faq.question}</span>
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
                    </div>
                </div>
            </section>
        </>
    );
}
