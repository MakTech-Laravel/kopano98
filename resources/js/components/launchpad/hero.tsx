import { Link } from '@inertiajs/react';
import { motion } from 'framer-motion';
import type { ReactNode } from 'react';

import { HeroTemplateCarousel } from '@/components/launchpad/hero-template-carousel';

type LaunchpadHeroProps = {
    eyebrow?: string;
    title: ReactNode;
    subtitle: string;
    primaryCta?: { label: string; href: string };
    secondaryCta?: { label: string; href: string };
    /** Show rotating live CV templates beside the copy (home). */
    showTemplateCarousel?: boolean;
};

/**
 * Navy hero matching launchpadcareers.co.za `.hero`.
 */
export function LaunchpadHero({
    eyebrow = 'Free ATS CV Check · LinkedIn · Interview Prep · Career Services',
    title,
    subtitle,
    primaryCta = { label: 'View Packages & Pricing', href: '/services' },
    secondaryCta = { label: 'Free ATS CV Check', href: '/tools' },
    showTemplateCarousel = false,
}: LaunchpadHeroProps) {
    return (
        <section className="bg-lp-navy relative isolate overflow-hidden px-5 py-14 sm:px-8 sm:py-16 md:py-[4.5rem]">
            <div
                className="pointer-events-none absolute inset-0 opacity-60"
                aria-hidden
                style={{
                    backgroundImage:
                        'radial-gradient(rgba(255,255,255,0.05) 0.6px, transparent 0.6px)',
                    backgroundSize: '3px 3px',
                }}
            />
            <div
                className="pointer-events-none absolute inset-0"
                aria-hidden
                style={{
                    background:
                        'radial-gradient(ellipse at 50% 0%, rgba(212,168,66,0.14), transparent 55%)',
                }}
            />

            <div
                className={
                    showTemplateCarousel
                        ? 'container relative z-10 grid items-center gap-10 lg:grid-cols-[minmax(0,1.15fr)_minmax(0,0.85fr)] lg:gap-12'
                        : 'relative z-10 mx-auto max-w-[720px] text-center'
                }
            >
                <div
                    className={
                        showTemplateCarousel
                            ? 'text-center lg:text-left'
                            : undefined
                    }
                >
                    <motion.p
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.4 }}
                        className="mb-5 inline-block text-[0.68rem] font-semibold tracking-[0.22em] text-[rgba(200,168,75,0.85)] uppercase"
                    >
                        {eyebrow}
                    </motion.p>

                    <motion.h1
                        initial={{ opacity: 0, y: 14 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.04 }}
                        className="font-lp-display mb-4 text-[clamp(2.2rem,7vw,3.8rem)] leading-[1.05] font-normal tracking-[-0.01em] text-white"
                    >
                        {title}
                    </motion.h1>

                    <motion.p
                        initial={{ opacity: 0, y: 12 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.45, delay: 0.1 }}
                        className={`mx-auto mb-8 max-w-[34rem] text-[0.95rem] leading-[1.65] text-pretty text-white/68 sm:text-[1rem] ${showTemplateCarousel ? 'lg:mx-0' : ''
                            }`}
                    >
                        {subtitle}
                    </motion.p>

                    <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.45, delay: 0.16 }}
                        className={`flex flex-col items-stretch justify-center gap-3 sm:flex-row sm:items-center ${showTemplateCarousel ? 'lg:justify-start' : ''
                            }`}
                    >
                        <Link
                            href={primaryCta.href}
                            className="btn-lp-gold inline-flex items-center justify-center px-6 py-3 text-[0.88rem]"
                        >
                            {primaryCta.label}
                        </Link>
                        <Link
                            href={secondaryCta.href}
                            className="inline-flex items-center justify-center rounded border border-white/35 bg-transparent px-6 py-3 text-[0.88rem] font-medium text-white/90 transition hover:border-white/60 hover:bg-white/5"
                        >
                            {secondaryCta.label}
                        </Link>
                    </motion.div>
                </div>

                {showTemplateCarousel ? (
                    <motion.div
                        initial={{ opacity: 0, y: 18 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.55, delay: 0.18 }}
                        className="flex justify-center lg:justify-end"
                    >
                        <HeroTemplateCarousel />
                    </motion.div>
                ) : null}
            </div>
        </section>
    );
}
