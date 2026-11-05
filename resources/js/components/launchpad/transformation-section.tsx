import { Link } from '@inertiajs/react';

import { Reveal } from '@/components/launchpad/reveal';

export function TransformationSection() {
    return (
        <section className="overflow-hidden bg-white">
            <div className="bg-lp-navy">
                <p className="container py-2.5 text-center text-[0.68rem] leading-relaxed tracking-[0.02em] text-white/70 sm:text-[0.72rem]">
                    Sources: LinkedIn Talent Insights · Ladders Eye-Tracking
                    Study · CareerBuilder Recruiter Survey
                </p>
            </div>

            <div className="container py-10 sm:py-12">
                <Reveal>
                    <div className="mx-auto mb-7 max-w-2xl text-center">
                        <p className="mb-2 text-[0.7rem] font-medium tracking-[0.08em] text-[var(--lp-gold-on-light)] uppercase">
                            The transformation
                        </p>
                        <h2 className="font-lp-display text-lp-navy text-[clamp(1.7rem,4.5vw,2.5rem)] leading-tight">
                            From overlooked to{' '}
                            <span className="text-[var(--lp-gold-on-light)]">
                                top 1%
                            </span>
                            .
                        </h2>
                    </div>
                </Reveal>

                <Reveal delay={0.06}>
                    <div className="mx-auto max-w-5xl overflow-hidden rounded-[14px] border border-[var(--lp-border)] bg-[var(--lp-off)] p-2 shadow-[0_18px_50px_rgba(13,27,42,0.08)] sm:p-3">
                        <img
                            src="/images/launchpad/showcase/cv-transformation.jpg"
                            alt="Before and after CV comparison — rejected messy CV versus selected top 1% rewrite"
                            className="h-auto w-full rounded-[10px] object-cover object-top"
                            loading="lazy"
                        />
                    </div>
                </Reveal>

                <Reveal delay={0.1} className="mt-7 text-center">
                    <Link
                        href="/services"
                        className="btn-lp-navy inline-flex px-5 py-2.5 text-sm"
                    >
                        Get a top 1% rewrite
                    </Link>
                </Reveal>
            </div>
        </section>
    );
}
