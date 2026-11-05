import { Link } from '@inertiajs/react';
import { motion } from 'framer-motion';
import { lazy, Suspense, type ReactNode } from 'react';

const HeroScene = lazy(() =>
    import('@/components/launchpad/hero-scene').then((module) => ({
        default: module.HeroScene,
    })),
);

type LaunchpadHeroProps = {
    eyebrow?: string;
    title: ReactNode;
    subtitle: string;
    primaryCta?: { label: string; href: string };
    secondaryCta?: { label: string; href: string };
};

export function LaunchpadHero({
    eyebrow = 'Launchpad Careers',
    title,
    subtitle,
    primaryCta = { label: 'Check your CV free', href: '/tools' },
    secondaryCta = { label: 'View services', href: '/services' },
}: LaunchpadHeroProps) {
    return (
        <section className="bg-lp-navy relative isolate min-h-[min(68vh,560px)] overflow-hidden py-12 text-center sm:min-h-[min(72vh,640px)] sm:py-14 md:py-20">
            <Suspense fallback={null}>
                <HeroScene />
            </Suspense>
            <div
                className="pointer-events-none absolute inset-0 -z-10 opacity-60"
                style={{
                    background:
                        'radial-gradient(ellipse at 12% 0%, rgba(184,148,63,0.16), transparent 40%), linear-gradient(180deg, rgba(26,35,50,0.2) 0%, rgba(26,35,50,0.85) 100%)',
                }}
            />
            <div className="container relative z-10">
                <div className="mx-auto max-w-3xl">
                    <motion.p
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.4 }}
                        className="mb-4 text-[0.72rem] font-medium tracking-[0.08em] text-[rgba(201,168,90,0.8)] uppercase sm:mb-5"
                    >
                        {eyebrow}
                    </motion.p>
                    <motion.h1
                        initial={{ opacity: 0, y: 14 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.04 }}
                        className="font-lp-display mb-4 text-[clamp(2.15rem,7.5vw,3.75rem)] leading-[1.08] text-white"
                    >
                        {title}
                    </motion.h1>
                    <motion.p
                        initial={{ opacity: 0, y: 12 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.45, delay: 0.1 }}
                        className="mx-auto mb-7 max-w-[34rem] text-[0.95rem] leading-[1.65] text-pretty text-white/68 sm:mb-8 sm:text-[1rem]"
                    >
                        {subtitle}
                    </motion.p>
                    <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.45, delay: 0.16 }}
                        className="flex flex-col items-stretch justify-center gap-3 sm:flex-row sm:flex-wrap sm:items-center"
                    >
                        <Link
                            href={primaryCta.href}
                            className="btn-lp-gold inline-flex items-center justify-center px-6 py-3 text-[0.88rem]"
                        >
                            {primaryCta.label}
                        </Link>
                        <Link
                            href={secondaryCta.href}
                            className="inline-flex items-center justify-center rounded border border-white/30 bg-transparent px-6 py-3 text-[0.88rem] font-medium text-white/90 transition hover:border-white/55 hover:bg-white/5"
                        >
                            {secondaryCta.label}
                        </Link>
                    </motion.div>
                </div>
            </div>
        </section>
    );
}
