import { Head, Link } from '@inertiajs/react';
import { motion, useReducedMotion } from 'framer-motion';
import { lazy, Suspense } from 'react';

import {
    FadeIn,
    Reveal,
    Stagger,
    StaggerItem,
} from '@/components/launchpad/reveal';
import LaunchpadLayout from '@/layouts/launchpad-layout';

const AtmosphereScene = lazy(() =>
    import('@/components/launchpad/atmosphere-scene').then((module) => ({
        default: module.AtmosphereScene,
    })),
);

const approachPillars = [
    {
        title: 'Research-led',
        description: 'Tracking what actually gets people shortlisted',
    },
    {
        title: 'Hands-on',
        description: 'Every CV personally reviewed, never outsourced',
    },
    {
        title: 'Always improving',
        description: 'The scoring engine updates as hiring changes',
    },
] as const;

export default function About() {
    const reduceMotion = useReducedMotion();

    return (
        <LaunchpadLayout>
            <Head title="About | Launchpad Careers" />

            <section className="py-10 sm:py-12">
                <div className="container">
                    <div className="flex flex-col items-center gap-8 lg:flex-row lg:gap-12">
                        <FadeIn className="w-full max-w-[300px] shrink-0">
                            <motion.img
                                src="/images/launchpad/ref-images/kopano-thantsha.jpg"
                                alt="Kopano Thantsha, Founder of Launchpad Careers"
                                className="w-full rounded-xl object-cover shadow-[0_20px_40px_rgba(13,27,42,0.18)]"
                                initial={
                                    reduceMotion
                                        ? false
                                        : { opacity: 0, scale: 0.96 }
                                }
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{
                                    duration: 0.7,
                                    ease: [0.22, 1, 0.36, 1],
                                }}
                                whileHover={
                                    reduceMotion
                                        ? undefined
                                        : { scale: 1.02, y: -4 }
                                }
                            />
                        </FadeIn>

                        <div className="min-w-0 flex-1">
                            <FadeIn delay={0.06}>
                                <p className="mb-2 text-[0.7rem] font-medium tracking-[0.08em] text-[var(--lp-gold-on-light)] uppercase">
                                    The Founder
                                </p>
                                <h1 className="font-lp-display text-lp-navy mb-4 text-[clamp(1.85rem,4.5vw,2.5rem)] leading-tight">
                                    Kopano Thantsha
                                </h1>
                            </FadeIn>
                            <div className="text-lp-mid space-y-4 text-[0.92rem] leading-[1.75]">
                                <Reveal delay={0.08}>
                                    <p>
                                        Launchpad Careers started from a simple
                                        observation: most people don&apos;t lose
                                        out on jobs because they lack the skills.
                                        They lose out because their CV never makes
                                        it past the first ten seconds of an ATS
                                        parser. That gap between what someone can
                                        do and whether a recruiter sees it is the
                                        exact problem Launchpad was built to solve.
                                    </p>
                                </Reveal>
                                <Reveal delay={0.12}>
                                    <p>
                                        Closing that gap started with research:
                                        working closely with people across
                                        different recruitment fields to understand
                                        how they actually screen a CV and view a
                                        LinkedIn profile, studying how different
                                        ATS systems parse, rank and sometimes
                                        reject the same document in completely
                                        different ways, and digging into what
                                        genuinely separates the top 1% of
                                        candidates from everyone else applying for
                                        the same role. All of that was combined
                                        into one strong, leading engine, Deep Scan
                                        and LinkedIn Pro, personally maintained and
                                        kept current as hiring itself keeps
                                        changing.
                                    </p>
                                </Reveal>
                                <Reveal delay={0.16}>
                                    <p>
                                        From the start, the goal was to let people
                                        see their CV issues live when they scan,
                                        right there in plain sight, instead of
                                        being told secondhand by someone behind a
                                        screen. And it doesn&apos;t stop at the CV;
                                        the same thinking is built into the
                                        LinkedIn side too, so people get more
                                        visibility and a real shot at being found,
                                        not just read.
                                    </p>
                                </Reveal>
                            </div>
                            <FadeIn
                                delay={0.22}
                                className="mt-6 flex flex-wrap gap-3"
                            >
                                <Link
                                    href="/contact"
                                    className="btn-lp-gold inline-flex px-5 py-2.5 text-[0.85rem]"
                                >
                                    Work with us →
                                </Link>
                                <Link
                                    href="/services"
                                    className="text-lp-navy inline-flex items-center rounded-[5px] border-[1.5px] border-[var(--lp-navy)] bg-transparent px-5 py-2.5 text-[0.85rem] font-bold transition hover:bg-[var(--lp-off)]"
                                >
                                    View Services
                                </Link>
                            </FadeIn>
                        </div>
                    </div>
                </div>
            </section>

            <section className="bg-lp-navy relative isolate overflow-hidden border-b border-white/12">
                <Suspense fallback={null}>
                    <AtmosphereScene density={0.85} />
                </Suspense>
                <div className="container relative z-10 max-w-[1000px] py-12 text-center sm:py-14">
                    <Reveal>
                        <p className="mb-3 text-[0.68rem] font-bold tracking-[0.14em] text-[var(--lp-gold)] uppercase">
                            The Approach
                        </p>
                        <h2 className="font-lp-display mx-auto mb-3.5 max-w-[700px] text-[clamp(1.4rem,3.6vw,2rem)] leading-[1.3] font-bold text-white">
                            Where real market research meets a tool built to act
                            on it.
                        </h2>
                        <p className="mx-auto mb-9 max-w-[540px] text-[0.88rem] leading-[1.65] text-white/65">
                            Not theory, not guesswork. Ongoing research into how
                            hiring actually works right now, built directly into
                            every scan and every CV we touch.
                        </p>
                    </Reveal>

                    <Stagger
                        className="grid gap-4 text-left sm:grid-cols-3"
                        stagger={0.09}
                    >
                        {approachPillars.map((pillar) => (
                            <StaggerItem key={pillar.title}>
                                <motion.div
                                    className="h-full rounded-md border-t-[3px] border-[var(--lp-gold)] bg-white px-5 py-6"
                                    whileHover={
                                        reduceMotion
                                            ? undefined
                                            : { y: -4, scale: 1.01 }
                                    }
                                    transition={{ duration: 0.25 }}
                                >
                                    <h3 className="font-lp-display text-lp-navy mb-2 text-[1.2rem] font-bold">
                                        {pillar.title}
                                    </h3>
                                    <p className="text-[0.72rem] font-bold tracking-[0.05em] text-[var(--lp-text-light)] uppercase leading-relaxed">
                                        {pillar.description}
                                    </p>
                                </motion.div>
                            </StaggerItem>
                        ))}
                    </Stagger>
                </div>
            </section>
        </LaunchpadLayout>
    );
}
