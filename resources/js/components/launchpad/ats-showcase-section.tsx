import { Link } from '@inertiajs/react';
import { motion, useReducedMotion } from 'framer-motion';

import { Reveal } from '@/components/launchpad/reveal';

const issueChips = [
    { label: '7 work issues', tone: 'critical' },
    { label: '2 contact gaps', tone: 'warn' },
    { label: 'Quantify +4 pts', tone: 'fix' },
] as const;

export function AtsShowcaseSection() {
    const reduceMotion = useReducedMotion();

    return (
        <section className="bg-lp-navy relative overflow-hidden py-12 sm:py-16">
            <div
                className="pointer-events-none absolute inset-0 opacity-70"
                style={{
                    background:
                        'radial-gradient(ellipse at 50% 0%, rgba(212,168,66,0.18), transparent 48%), radial-gradient(ellipse at 90% 70%, rgba(37,99,235,0.16), transparent 42%), radial-gradient(ellipse at 10% 90%, rgba(220,38,38,0.12), transparent 35%)',
                }}
            />

            <div className="container relative">
                <Reveal>
                    <div className="mx-auto mb-8 max-w-3xl text-center">
                        <h2 className="font-lp-display text-[clamp(1rem,3.5vw,1.4rem)] leading-tight font-bold text-white">
                            Every highlight is a reason your ATS rejects your
                            CV.
                        </h2>
                        <p className="mx-auto mt-2 max-w-xl text-[0.78rem] leading-relaxed text-white/55">
                            Our free ATS CV checker exposes every skeleton
                            before a recruiter does.
                        </p>
                    </div>
                </Reveal>

                <Reveal delay={0.08}>
                    <div className="relative mx-auto w-full max-w-[18.5rem] sm:max-w-xl md:max-w-3xl lg:max-w-5xl">
                        <div className="relative overflow-hidden rounded-[12px] border border-white/12 bg-black/30 p-1 shadow-[0_20px_50px_rgba(0,0,0,0.45)] sm:rounded-[16px] sm:p-2 sm:shadow-[0_30px_80px_rgba(0,0,0,0.45)] md:p-2.5">
                            <div className="relative overflow-hidden rounded-[9px] sm:rounded-[12px]">
                                <img
                                    src="/images/launchpad/showcase/deep-scan-dashboard.jpg"
                                    alt="Deep Scan ATS checker dashboard showing score, issues, and highlighted CV"
                                    className="h-auto w-full object-cover object-top"
                                    loading="lazy"
                                />

                                {/* Dramatic scan beam */}
                                {!reduceMotion ? (
                                    <motion.div
                                        aria-hidden
                                        className="pointer-events-none absolute inset-x-0 h-[28%] bg-gradient-to-b from-transparent via-[rgba(212,168,66,0.28)] to-transparent"
                                        initial={{ top: '-20%' }}
                                        animate={{ top: ['-20%', '95%'] }}
                                        transition={{
                                            duration: 3.4,
                                            repeat: Infinity,
                                            ease: 'easeInOut',
                                        }}
                                    />
                                ) : null}

                                <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(180deg,rgba(13,27,42,0.15)_0%,transparent_28%,transparent_62%,rgba(13,27,42,0.55)_100%)]" />

                                {/* Score pulse badge — compact on mobile */}
                                <motion.div
                                    className="absolute top-2 left-2 rounded-lg border border-white/15 bg-[rgba(13,27,42,0.9)] px-2 py-1.5 backdrop-blur-sm sm:top-4 sm:left-4 sm:rounded-xl sm:px-3.5 sm:py-2.5 md:top-5 md:left-5 md:px-4 md:py-3"
                                    animate={
                                        reduceMotion
                                            ? undefined
                                            : { scale: [1, 1.03, 1] }
                                    }
                                    transition={
                                        reduceMotion
                                            ? undefined
                                            : {
                                                duration: 2.2,
                                                repeat: Infinity,
                                                ease: 'easeInOut',
                                            }
                                    }
                                >
                                    <p className="text-[0.48rem] font-bold tracking-[0.08em] text-white/55 uppercase sm:text-[0.58rem]">
                                        Live score
                                    </p>
                                    <p className="font-lp-display text-[1.05rem] leading-none text-[var(--lp-gold)] sm:text-[1.45rem] md:text-[1.85rem]">
                                        69
                                        <span className="ml-0.5 text-[0.55rem] text-white/50 sm:ml-1 sm:text-[0.7rem]">
                                            / 100
                                        </span>
                                    </p>
                                    <p className="mt-0.5 text-[0.52rem] font-semibold text-amber-300 sm:mt-1 sm:text-[0.65rem]">
                                        Fixable — gain +11 pts
                                    </p>
                                </motion.div>

                                <div className="absolute right-2 bottom-2 flex max-w-[78%] flex-wrap justify-end gap-1 sm:right-4 sm:bottom-4 sm:max-w-[70%] sm:gap-1.5 md:right-5 md:bottom-5">
                                    {issueChips.map((chip) => (
                                        <span
                                            key={chip.label}
                                            className={`rounded-full px-1.5 py-0.5 text-[0.48rem] font-bold tracking-[0.02em] uppercase sm:px-2.5 sm:py-1 sm:text-[0.62rem] ${chip.tone === 'critical'
                                                ? 'bg-red-500/90 text-white'
                                                : chip.tone === 'warn'
                                                    ? 'bg-amber-400 text-[var(--lp-navy)]'
                                                    : 'bg-emerald-400 text-[var(--lp-navy)]'
                                                }`}
                                        >
                                            {chip.label}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </Reveal>

                <Reveal delay={0.12} className="relative z-10 mt-8 text-center">
                    <Link
                        href="/tools"
                        className="btn-lp-gold inline-flex px-5 py-2.5 text-sm"
                    >
                        Get My Free ATS CV Scan »
                    </Link>
                    <p className="mt-3 text-[0.75rem] text-white/50">
                        Our free ATS CV checker exposes every skeleton before a
                        recruiter does.
                    </p>
                </Reveal>
            </div>
        </section>
    );
}
