import { Link } from '@inertiajs/react';

import { Reveal } from '@/components/launchpad/reveal';

export function AtsShowcaseSection() {
    return (
        <section className="bg-lp-navy relative overflow-hidden py-12 sm:py-16">
            <div
                className="pointer-events-none absolute inset-0 opacity-60"
                style={{
                    background:
                        'radial-gradient(ellipse at 50% 0%, rgba(212,168,66,0.14), transparent 50%), radial-gradient(ellipse at 85% 80%, rgba(37,99,235,0.12), transparent 40%)',
                }}
            />

            <div className="container relative">
                <Reveal>
                    <div className="mx-auto mb-8 max-w-3xl text-center">
                        <h2 className="font-lp-display text-[clamp(1.45rem,4vw,2.15rem)] leading-tight text-white">
                            Every highlight is a reason your ATS rejects your
                            CV.
                        </h2>
                        <p className="mx-auto mt-3 max-w-xl text-[0.92rem] leading-relaxed text-white/65">
                            Our free ATS CV checker exposes every weak spot
                            before a recruiter does — then shows exactly what to
                            fix.
                        </p>
                    </div>
                </Reveal>

                <Reveal delay={0.08}>
                    <div className="relative mx-auto max-w-5xl">
                        <div className="overflow-hidden rounded-[16px] border border-white/10 bg-white/5 p-1.5 shadow-[0_30px_80px_rgba(0,0,0,0.35)] sm:p-2.5">
                            <img
                                src="/images/launchpad/showcase/deep-scan-dashboard.jpg"
                                alt="Deep Scan ATS checker dashboard showing score, issues, and highlighted CV"
                                className="h-auto w-full rounded-[12px] object-cover object-top"
                                loading="lazy"
                            />
                        </div>
                        <div className="pointer-events-none absolute -inset-x-6 -bottom-8 hidden h-24 bg-gradient-to-t from-[var(--lp-navy)] to-transparent sm:block" />
                    </div>
                </Reveal>

                <Reveal delay={0.12} className="relative z-10 mt-8 text-center">
                    <Link
                        href="/tools"
                        className="btn-lp-gold inline-flex px-5 py-2.5 text-sm"
                    >
                        Run free ATS check
                    </Link>
                </Reveal>
            </div>
        </section>
    );
}
