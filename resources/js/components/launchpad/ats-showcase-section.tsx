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
                        <p className="mb-3 text-[0.7rem] font-bold tracking-[0.12em] text-[var(--lp-gold)] uppercase">
                            Free ATS Deep Scan
                        </p>
                        <h2 className="font-lp-display text-[clamp(1.45rem,4vw,2.15rem)] leading-tight text-white">
                            Every highlight is a reason your ATS rejects your
                            CV.
                        </h2>
                        <p className="mx-auto mt-3 max-w-xl text-[0.92rem] leading-relaxed text-white/65">
                            See the weak spots light up in seconds — then know
                            exactly what to fix before a recruiter ever opens the
                            file.
                        </p>
                    </div>
                </Reveal>

                <Reveal delay={0.08}>
                    <div className="relative mx-auto max-w-5xl">
                        <div className="relative overflow-hidden rounded-[16px] border border-white/12 bg-black/30 p-1.5 shadow-[0_30px_80px_rgba(0,0,0,0.45)] sm:p-2.5">
                            <div className="relative overflow-hidden rounded-[12px]">
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

                                {/* Score pulse badge */}
                                <motion.div
                                    className="absolute top-3 left-3 rounded-xl border border-white/15 bg-[rgba(13,27,42,0.88)] px-3 py-2 backdrop-blur-sm sm:top-5 sm:left-5 sm:px-4 sm:py-3"
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
                                    <p className="text-[0.62rem] font-bold tracking-[0.08em] text-white/55 uppercase">
                                        Live score
                                    </p>
                                    <p className="font-lp-display text-[1.55rem] leading-none text-[var(--lp-gold)] sm:text-[1.85rem]">
                                        69
                                        <span className="ml-1 text-[0.75rem] text-white/50">
                                            / 100
                                        </span>
                                    </p>
                                    <p className="mt-1 text-[0.68rem] font-semibold text-amber-300">
                                        Fixable — gain +11 pts
                                    </p>
                                </motion.div>

                                <div className="absolute right-3 bottom-3 flex max-w-[70%] flex-wrap justify-end gap-1.5 sm:right-5 sm:bottom-5">
                                    {issueChips.map((chip) => (
                                        <span
                                            key={chip.label}
                                            className={`rounded-full px-2.5 py-1 text-[0.65rem] font-bold tracking-[0.02em] uppercase ${chip.tone === 'critical'
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
                        Run free ATS check
                    </Link>
                    <p className="mt-3 text-[0.75rem] text-white/50">
                        No payment · Instant sample scan · Built to drive real
                        shortlists
                    </p>
                </Reveal>
            </div>
        </section>
    );
}
