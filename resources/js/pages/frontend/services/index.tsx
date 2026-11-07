import { Head, Link } from '@inertiajs/react';
import { useMemo, useState } from 'react';

import { Reveal } from '@/components/launchpad/reveal';
import { ServiceCard } from '@/components/launchpad/service-card';
import { useLaunchpadLocale } from '@/contexts/launchpad-locale';
import { launchpadFaqs } from '@/data/launchpad/faqs';
import {
    servicesInGroup,
    type LaunchpadService,
} from '@/data/launchpad/services';
import LaunchpadLayout from '@/layouts/launchpad-layout';

const howSteps = [
    {
        title: 'Choose a service or package',
        body: 'Browse our services and pick what you need — individual services or a bundle.',
    },
    {
        title: 'Place your order & pay securely',
        body: 'Click Place Order and complete payment securely through PayFast. We accept card, EFT, Instant EFT. No waiting — payment is instant.',
    },
    {
        title: 'Message us on WhatsApp',
        body: "After paying you'll be guided to WhatsApp where you can share your details and documents whenever you're ready — no rush at all.",
    },
    {
        title: 'Delivered to your inbox',
        body: 'Polished, professional documents delivered to your inbox within 1–2 business days. Revisions are always part of the process.',
    },
];

function SubHead({
    id,
    title,
    note,
}: {
    id?: string;
    title: string;
    note: string;
}) {
    return (
        <div
            id={id}
            className="mt-9 mb-3.5 flex items-baseline gap-2.5 border-b border-[var(--lp-border)] pb-2 scroll-mt-20"
        >
            <span className="h-[1.1rem] w-[3px] shrink-0 self-center rounded-sm bg-[var(--lp-gold)]" />
            <h2 className="font-lp-display text-lp-navy text-[1.2rem] font-bold">
                {title}
            </h2>
            <p className="text-[0.76rem] text-[var(--lp-text-light)]">{note}</p>
        </div>
    );
}

function TierGrid({
    services,
    columns = 4,
}: {
    services: LaunchpadService[];
    columns?: 3 | 4;
}) {
    return (
        <div
            className={`grid gap-3 sm:gap-4 ${columns === 4
                ? 'grid-cols-1 sm:grid-cols-2 xl:grid-cols-4'
                : 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3'
                }`}
        >
            {services.map((service, index) => (
                <Reveal key={service.id} delay={Math.min(index * 0.04, 0.2)}>
                    <ServiceCard service={service} variant="tier" />
                </Reveal>
            ))}
        </div>
    );
}

export default function ServicesIndex() {
    return (
        <LaunchpadLayout>
            <ServicesContent />
        </LaunchpadLayout>
    );
}

function ServicesContent() {
    const [openFaq, setOpenFaq] = useState<number | null>(null);
    const [pdfProjects, setPdfProjects] = useState(1);
    const [webProjects, setWebProjects] = useState(1);
    const { formatPrice } = useLaunchpadLocale();

    const cvRewrite = useMemo(() => servicesInGroup('cv-rewrite'), []);
    const linkedin = useMemo(() => servicesInGroup('linkedin'), []);
    const more = useMemo(() => servicesInGroup('more'), []);
    const packages = useMemo(() => servicesInGroup('package'), []);
    const portfolio = useMemo(() => servicesInGroup('portfolio'), []);

    const pdfService = portfolio.find((item) => item.id === 'portfolio-pdf');
    const webService = portfolio.find((item) => item.id === 'portfolio-web');
    const pdfTotal = (pdfService?.price ?? 280) + Math.max(0, pdfProjects - 1) * 100;
    const webTotal = (webService?.price ?? 600) + Math.max(0, webProjects - 1) * 100;

    return (
        <>
            <Head title="Services & Pricing | Launchpad Careers" />

            <section className="bg-white py-10 sm:py-12">
                <div className="container max-w-[960px]">
                    <Reveal>
                        <p className="mb-2 text-[0.68rem] font-bold tracking-[0.14em] text-[var(--lp-gold-on-light-sm)] uppercase">
                            Individual Services
                        </p>
                        <h1 className="font-lp-display text-lp-navy mb-2.5 text-[clamp(1.5rem,4vw,2.2rem)] leading-[1.15] font-bold">
                            Pay only for what you{' '}
                            <span className="text-[var(--lp-gold-on-light)]">
                                need.
                            </span>
                        </h1>
                        <p className="text-lp-mid mb-4 max-w-[460px] text-[0.88rem]">
                            Delivered to your inbox within the stated timeframe.
                        </p>
                    </Reveal>

                    <SubHead
                        id="cv-rewrite"
                        title="CV Rewrite"
                        note="Priced by experience"
                    />
                    <TierGrid services={cvRewrite} columns={4} />

                    <SubHead
                        title="LinkedIn Profile Fix"
                        note="Priced by experience"
                    />
                    <p className="text-lp-mid -mt-1 mb-4 max-w-[680px] rounded border-l-[3px] border-[var(--lp-gold)] bg-[var(--lp-off)] px-3.5 py-3 text-[0.82rem] leading-relaxed">
                        Your LinkedIn profile and your CV get checked against
                        each other. One tells a strong story, the other
                        reinforces it. When they mismatch, recruiters doubt you
                        and pass. Let&apos;s get both of them amplifying your
                        strengths, so none of them ever gives a recruiter a
                        reason to look away.
                    </p>
                    <TierGrid services={linkedin} columns={4} />

                    <SubHead
                        title="More Services"
                        note="Flat price, every time"
                    />
                    <TierGrid services={more} columns={3} />

                    <hr className="my-10 border-[var(--lp-border)]" />

                    <Reveal>
                        <p className="mb-2 text-[0.68rem] font-bold tracking-[0.14em] text-[var(--lp-gold-on-light-sm)] uppercase">
                            Packages
                        </p>
                        <h2 className="font-lp-display text-lp-navy mb-2.5 text-[clamp(1.5rem,4vw,2.2rem)] leading-[1.15] font-bold">
                            Bundle and{' '}
                            <span className="text-[var(--lp-green)]">save</span>{' '}
                            for better value.
                        </h2>
                        <p className="text-lp-mid mb-5 max-w-[460px] text-[0.88rem]">
                            Combine services for a better price. All packages
                            include human review.
                        </p>
                    </Reveal>

                    <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                        {packages.map((service, index) => (
                            <Reveal key={service.id} delay={index * 0.05}>
                                <ServiceCard
                                    service={service}
                                    variant="package"
                                />
                            </Reveal>
                        ))}
                    </div>

                    <hr className="my-10 border-[var(--lp-border)]" />

                    <Reveal>
                        <p className="mb-2 text-[0.68rem] font-bold tracking-[0.14em] text-[var(--lp-gold-on-light-sm)] uppercase">
                            Portfolio Builder
                        </p>
                        <h2 className="font-lp-display text-lp-navy mb-2.5 text-[clamp(1.5rem,4vw,2.2rem)] leading-[1.15] font-bold">
                            Portfolio Bundles —{' '}
                            <span className="text-[var(--lp-gold-on-light)]">
                                priced for exactly what you&apos;re building.
                            </span>
                        </h2>
                        <p className="text-lp-mid mb-5 max-w-xl text-[0.88rem]">
                            Pick your format, set your number of projects, and
                            watch the price update live. No limit on how many
                            you add.
                        </p>
                    </Reveal>

                    <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                        {pdfService ? (
                            <Reveal>
                                <ServiceCard
                                    service={pdfService}
                                    variant="package"
                                    priceOverride={pdfTotal}
                                    footerSlot={
                                        <PortfolioStepper
                                            count={pdfProjects}
                                            totalLabel={formatPrice(pdfTotal)}
                                            onChange={setPdfProjects}
                                        />
                                    }
                                />
                            </Reveal>
                        ) : null}
                        {webService ? (
                            <Reveal delay={0.05}>
                                <ServiceCard
                                    service={webService}
                                    variant="package"
                                    priceOverride={webTotal}
                                    footerSlot={
                                        <>
                                            <PortfolioStepper
                                                count={webProjects}
                                                totalLabel={formatPrice(webTotal)}
                                                onChange={setWebProjects}
                                            />
                                            <p className="mt-2.5 text-center text-[0.72rem] leading-snug text-[var(--lp-text-light)]">
                                                Bug fixes always free. Coming
                                                back next year to add a project?
                                                Just R100.
                                            </p>
                                        </>
                                    }
                                />
                            </Reveal>
                        ) : null}
                    </div>

                    <hr className="my-10 border-[var(--lp-border)]" />

                    <div id="faq">
                        <Reveal>
                            <p className="mb-2 text-[0.68rem] font-bold tracking-[0.14em] text-[var(--lp-gold-on-light-sm)] uppercase">
                                FAQ
                            </p>
                            <h2 className="font-lp-display text-lp-navy mb-5 text-[clamp(1.5rem,4vw,2.2rem)] leading-[1.15] font-bold">
                                Common questions,{' '}
                                <span className="text-[var(--lp-gold-on-light)]">
                                    answered.
                                </span>
                            </h2>
                        </Reveal>

                        <div className="flex max-w-[680px] flex-col gap-2.5">
                            {launchpadFaqs.map((faq, index) => {
                                const open = openFaq === index;

                                return (
                                    <div
                                        key={faq.question}
                                        className="overflow-hidden rounded-lg border border-[var(--lp-border)]"
                                    >
                                        <button
                                            type="button"
                                            className="text-lp-navy flex w-full items-center justify-between gap-3 px-4 py-4 text-left text-[0.88rem] font-semibold hover:bg-[var(--lp-off)]"
                                            onClick={() =>
                                                setOpenFaq(open ? null : index)
                                            }
                                        >
                                            <span>{faq.question}</span>
                                            <span className="text-lp-gold shrink-0 text-lg">
                                                {open ? '−' : '+'}
                                            </span>
                                        </button>
                                        {open ? (
                                            <p className="text-lp-mid px-4 pb-4 text-[0.82rem] leading-[1.7]">
                                                {faq.answer}
                                            </p>
                                        ) : null}
                                    </div>
                                );
                            })}
                        </div>

                        <a
                            href="https://wa.me/27822192256?text=Hi%20Launchpad%2C%20I%20have%20a%20question%20about%20your%20services."
                            target="_blank"
                            rel="noreferrer"
                            className="text-lp-navy mt-4 inline-flex items-center rounded-[5px] border-[1.5px] border-[var(--lp-border)] px-4 py-2.5 text-[0.82rem] font-semibold transition hover:border-[var(--lp-navy)]"
                        >
                            Still have a question? Ask us on WhatsApp
                        </a>
                    </div>

                    <hr className="my-10 border-[var(--lp-border)]" />

                    <Reveal>
                        <h2 className="font-lp-display text-[clamp(1.5rem,4vw,2.2rem)] font-bold text-[var(--lp-gold-on-light)]">
                            Four simple steps.
                        </h2>
                        <div className="mt-5 max-w-[540px]">
                            {howSteps.map((step, index) => (
                                <div
                                    key={step.title}
                                    className="flex items-start gap-4 border-b border-[var(--lp-border)] py-4 last:border-b-0"
                                >
                                    <div className="font-lp-display bg-lp-navy text-lp-gold flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-base font-bold">
                                        {index + 1}
                                    </div>
                                    <div>
                                        <h4 className="text-lp-navy mb-1 text-[0.88rem] font-bold">
                                            {step.title}
                                        </h4>
                                        <p className="text-[0.78rem] leading-snug text-[var(--lp-text-mid)]">
                                            {step.body}
                                        </p>
                                    </div>
                                </div>
                            ))}
                        </div>
                        <Link
                            href="/services#cv-rewrite"
                            className="btn-lp-navy mt-6 inline-flex px-5 py-2.5 text-sm"
                        >
                            Browse All Services →
                        </Link>
                    </Reveal>
                </div>
            </section>
        </>
    );
}

function PortfolioStepper({
    count,
    totalLabel,
    onChange,
}: {
    count: number;
    totalLabel: string;
    onChange: (value: number) => void;
}) {
    return (
        <div className="mb-3">
            <div className="mb-3.5 flex items-center justify-between rounded-lg bg-[var(--lp-off)] px-3.5 py-2.5">
                <span className="text-[0.78rem] font-semibold text-[var(--lp-text-mid)]">
                    Your total
                </span>
                <span className="font-lp-display text-[1.1rem] font-extrabold text-[var(--lp-gold)]">
                    {totalLabel}
                </span>
            </div>
            <div className="mb-1 flex items-center justify-center gap-3.5">
                <button
                    type="button"
                    aria-label="Decrease projects"
                    className="text-lp-navy flex h-[34px] w-[34px] items-center justify-center rounded-full border-[1.5px] border-[var(--lp-border)] bg-white text-[1.15rem] font-bold transition hover:border-[var(--lp-navy)] hover:bg-[var(--lp-navy)] hover:text-white"
                    onClick={() => onChange(Math.max(1, count - 1))}
                >
                    –
                </button>
                <span className="font-lp-display text-lp-navy min-w-[1.8rem] text-center text-[1.2rem] font-bold">
                    {count}
                </span>
                <button
                    type="button"
                    aria-label="Increase projects"
                    className="text-lp-navy flex h-[34px] w-[34px] items-center justify-center rounded-full border-[1.5px] border-[var(--lp-border)] bg-white text-[1.15rem] font-bold transition hover:border-[var(--lp-navy)] hover:bg-[var(--lp-navy)] hover:text-white"
                    onClick={() => onChange(count + 1)}
                >
                    +
                </button>
            </div>
            <p className="mb-3.5 px-2 text-center text-[0.62rem] tracking-[0.02em] text-[var(--lp-text-light)] uppercase">
                Choose No of projects you worked on
            </p>
        </div>
    );
}
