import { Head, Link } from '@inertiajs/react';

import { AtsShowcaseSection } from '@/components/launchpad/ats-showcase-section';
import { CompanyLogosSection } from '@/components/launchpad/company-logos-section';
import { CvTemplateSlider } from '@/components/launchpad/cv-template-slider';
import { LaunchpadHero } from '@/components/launchpad/hero';
import { Reveal } from '@/components/launchpad/reveal';
import { SectionHeading } from '@/components/launchpad/section-heading';
import { TransformationSection } from '@/components/launchpad/transformation-section';
import { useLaunchpadLocale } from '@/contexts/launchpad-locale';
import { launchpadServices } from '@/data/launchpad/services';
import { launchpadTestimonials } from '@/data/launchpad/testimonials';
import LaunchpadLayout from '@/layouts/launchpad-layout';

const stats = [
    { num: '250+', lbl: 'CVs seen per role by recruiters' },
    { num: '6s', lbl: 'Average recruiter scan time' },
    { num: '75%', lbl: 'CVs filtered out by ATS before a human review' },
    { num: 'Top 1%', lbl: 'Our standard for every CV' },
];

const whyCards = [
    {
        title: 'First-hand experience',
        body: 'Every document is reviewed by someone who has navigated the job market first-hand, so the advice is practical, not theory.',
    },
    {
        title: 'Industry insight',
        body: 'Hands-on experience in demanding, results-driven industries shapes how every CV and profile is approached, no matter your field or level.',
    },
    {
        title: 'Local & international',
        body: 'Applying in South Africa or targeting roles abroad, we tailor your documents for the right market.',
    },
];

const offerIds = [
    'cv-rewrite-entry',
    'linkedin-graduate',
    'interview-prep',
    'essentials',
] as const;

const offerCopy: Record<
    (typeof offerIds)[number],
    { title: string; body: string }
> = {
    'cv-rewrite-entry': {
        title: 'CV Rewrite',
        body: 'Buzzwords removed, no repeating words, weak verbs replaced, impact added and ATS optimised.',
    },
    'linkedin-graduate': {
        title: 'LinkedIn Profile Fix',
        body: 'Headline, About section, skills, education and experience, all optimised for recruiters.',
    },
    'interview-prep': {
        title: 'Interview Prep',
        body: 'Tailored question guide & model answers for your role.',
    },
    essentials: {
        title: 'The Essentials',
        body: 'CV Rewrite + LinkedIn Profile Fix, with before-and-after optimisation reports for both.',
    },
};

export default function Home() {
    return (
        <LaunchpadLayout>
            <HomeContent />
        </LaunchpadLayout>
    );
}

function HomeContent() {
    const { formatPrice } = useLaunchpadLocale();
    const previewServices = launchpadServices.filter((service) =>
        (offerIds as readonly string[]).includes(service.id),
    );

    return (
        <>
            <Head title="Free ATS CV Checker — Is Your CV ATS Friendly? | Launchpad">
                <meta
                    head-key="description"
                    name="description"
                    content="Free ATS CV checker — see your match score in seconds. Plus professional CV rewrites, LinkedIn profiles & interview coaching."
                />
            </Head>

            <LaunchpadHero
                title={
                    <>
                        Your CV{' '}
                        <span className="font-[family-name:var(--font-lp-sans)] [font-variant-ligatures:none]">
                            &
                        </span>{' '}
                        Career,
                        <br />
                        <span className="text-lp-gold">expertly crafted.</span>
                    </>
                }
                subtitle="Human-reviewed CVs, LinkedIn profiles and interview coaching, by an industry professional who has been through the job market first-hand."
                primaryCta={{
                    label: 'View Packages & Pricing',
                    href: '/services',
                }}
                secondaryCta={{
                    label: 'Free ATS CV Check',
                    href: '/tools',
                }}
                showTemplateCarousel
            />

            <div className="bg-lp-navy-2 border-t border-[var(--lp-navy-3)]">
                <div className="grid grid-cols-2 md:grid-cols-4">
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
                            <span className="font-lp-display block text-[1.5rem] leading-none font-bold text-white">
                                {stat.num}
                            </span>
                            <span className="mt-1 block text-[0.65rem] leading-snug text-white/50">
                                {stat.lbl}
                            </span>
                        </div>
                    ))}
                </div>
                <p className="px-4 py-1.5 text-center text-[0.65rem] text-white/50">
                    Sources: LinkedIn Talent Insights · Ladders Eye-Tracking
                    Study · CareerBuilder Recruiter Survey
                </p>
            </div>

            <CompanyLogosSection />
            <TransformationSection />
            <AtsShowcaseSection />
            <CvTemplateSlider />

            <section className="py-10 sm:py-12">
                <div className="container max-w-[960px]">
                    <Reveal>
                        <SectionHeading
                            label="Why Launchpad"
                            title={
                                <>
                                    Built by a{' '}
                                    <span className="text-[var(--lp-gold-on-light)]">
                                        Professional
                                    </span>{' '}
                                    | Designed to get you{' '}
                                    <span className="text-[var(--lp-gold-on-light)]">
                                        hired.
                                    </span>
                                </>
                            }
                            subtitle="Every document we deliver is reviewed personally by an industry professional who has navigated the job market first-hand."
                        />
                    </Reveal>
                    <div className="grid gap-3 md:grid-cols-3 md:gap-4">
                        {whyCards.map((card, index) => (
                            <Reveal key={card.title} delay={index * 0.06}>
                                <div className="h-full rounded-lg bg-[var(--lp-off)] p-5">
                                    <div className="bg-lp-gold mb-3 h-1 w-8 rounded-full" />
                                    <h3 className="text-lp-navy mb-1.5 text-[0.9rem] font-bold">
                                        {card.title}
                                    </h3>
                                    <p className="text-[0.8rem] leading-relaxed text-[var(--lp-text-mid)]">
                                        {card.body}
                                    </p>
                                </div>
                            </Reveal>
                        ))}
                    </div>
                </div>
            </section>

            <hr className="border-[var(--lp-border)]" />

            <section className="py-10 sm:py-12">
                <div className="container max-w-[960px]">
                    <Reveal>
                        <SectionHeading
                            label="What clients say"
                            title={
                                <>
                                    Results from{' '}
                                    <span className="text-[var(--lp-gold-on-light)]">
                                        industry
                                    </span>{' '}
                                    professionals.
                                </>
                            }
                            subtitle="Professionals across South Africa who got shortlisted after working with us."
                        />
                    </Reveal>
                    <div className="grid gap-3 md:grid-cols-3 md:gap-4">
                        {launchpadTestimonials.map((item, index) => (
                            <Reveal key={item.name} delay={index * 0.05}>
                                <figure className="flex h-full flex-col rounded-[10px] bg-[var(--lp-off)] p-5">
                                    <div className="mb-2 flex items-center justify-between">
                                        <span className="font-lp-display text-[1.5rem] leading-none text-[var(--lp-gold-on-light)]">
                                            “
                                        </span>
                                        <span
                                            className="text-[0.85rem] text-amber-500"
                                            aria-label="5 out of 5 stars"
                                        >
                                            ★★★★★
                                        </span>
                                    </div>
                                    <blockquote className="text-lp-navy flex-1 text-[0.83rem] leading-[1.65]">
                                        {item.quote}
                                    </blockquote>
                                    <div className="mt-4 mb-3">
                                        <span className="rounded bg-[#dbeafe] px-2 py-0.5 text-[0.68rem] font-bold text-[#1e40af]">
                                            {item.service}
                                        </span>
                                    </div>
                                    <figcaption className="flex items-center gap-2.5">
                                        <img
                                            src={item.photo}
                                            alt={item.name}
                                            className="h-10 w-10 rounded-full object-cover object-top"
                                            loading="lazy"
                                        />
                                        <div>
                                            <p className="text-lp-navy text-[0.78rem] font-bold">
                                                {item.name}
                                            </p>
                                            <p className="text-[0.7rem] text-[var(--lp-text-mid)]">
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

            <hr className="border-[var(--lp-border)]" />

            <section className="py-10 sm:py-12">
                <div className="container max-w-[960px]">
                    <Reveal>
                        <SectionHeading
                            label="What we offer"
                            title="From a quick CV fix to a full career kit."
                            subtitle="Individual services or bundled packages, all human-reviewed, delivered to your inbox."
                        />
                    </Reveal>
                    <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
                        {previewServices.map((service, index) => {
                            const copy =
                                offerCopy[
                                service.id as (typeof offerIds)[number]
                                ];

                            return (
                                <Reveal key={service.id} delay={index * 0.05}>
                                    <div className="flex h-full flex-col rounded-[10px] border border-[var(--lp-border)] bg-white p-4">
                                        <h3 className="text-lp-navy text-[0.9rem] font-bold">
                                            {copy?.title ?? service.name}
                                        </h3>
                                        <p className="text-lp-mid mt-1.5 flex-1 text-[0.78rem] leading-relaxed">
                                            {copy?.body ?? service.description}
                                        </p>
                                        <p className="font-lp-display mt-3 text-[1.35rem] font-extrabold text-[var(--lp-gold-on-light)]">
                                            {formatPrice(service.price)}
                                        </p>
                                    </div>
                                </Reveal>
                            );
                        })}
                    </div>
                    <Reveal className="mt-6">
                        <Link
                            href="/services"
                            className="text-lp-navy inline-flex rounded-[5px] border-[1.5px] border-[var(--lp-navy)] bg-transparent px-5 py-2.5 text-sm font-semibold transition hover:bg-[var(--lp-off)]"
                        >
                            See All Services
                        </Link>
                    </Reveal>
                </div>
            </section>

            <hr className="border-[var(--lp-border)]" />

            <section className="bg-white py-10 text-center sm:py-12">
                <div className="container max-w-[960px]">
                    <p className="mb-2 text-[0.68rem] font-bold tracking-[0.14em] text-[var(--lp-gold-on-light-sm)] uppercase">
                        Ready to stand out?
                    </p>
                    <h2 className="font-lp-display text-lp-navy text-[clamp(1.5rem,4vw,2.2rem)] font-bold">
                        Start{' '}
                        <span className="text-[var(--lp-gold-on-light)]">
                            free
                        </span>{' '}
                        and upgrade when ready.
                    </h2>
                    <p className="text-lp-mid mx-auto mt-3 max-w-[380px] text-[0.88rem] leading-relaxed">
                        The free tools give instant AI feedback. When you want a
                        human expert, we&apos;re here.
                    </p>
                    <div className="mt-6 flex flex-col items-center justify-center gap-3 sm:flex-row">
                        <Link
                            href="/services"
                            className="btn-lp-gold inline-flex px-5 py-2.5 text-sm"
                        >
                            Order a Service
                        </Link>
                        <Link
                            href="/tools"
                            className="text-lp-navy inline-flex rounded-[5px] border-[1.5px] border-[var(--lp-navy)] bg-transparent px-5 py-2.5 text-sm font-semibold transition hover:bg-[var(--lp-off)]"
                        >
                            Try Free Tools First
                        </Link>
                    </div>
                </div>
            </section>
        </>
    );
}
