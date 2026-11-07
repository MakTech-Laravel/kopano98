import { Link } from '@inertiajs/react';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import { useEffect, useState } from 'react';

import { launchpadTemplates } from '@/data/launchpad/templates';

/** Hero slides use the Launchpad PNG frames from the reference images folder. */
const heroSlideIds = [
    'classic',
    'minimal',
    'elegant',
    'executive',
    'modern',
    'graduate',
    'stripe',
    'heritage',
] as const;

const slides = heroSlideIds
    .map((id) => launchpadTemplates.find((template) => template.id === id))
    .filter((template): template is (typeof launchpadTemplates)[number] =>
        Boolean(template),
    )
    .map((template) => ({
        ...template,
        // Prefer the original PNG frames for the hero carousel.
        frame: `/images/launchpad/templates/${template.id === 'sidebar-navy' ? 'sidebarNavy' : template.id}.png`,
    }));

/**
 * Compact rotating CV template stack for the home hero — real PNG frames only.
 */
export function HeroTemplateCarousel() {
    const reduceMotion = useReducedMotion();
    const [index, setIndex] = useState(0);

    useEffect(() => {
        if (reduceMotion || slides.length === 0) {
            return;
        }

        const timer = window.setInterval(() => {
            setIndex((current) => (current + 1) % slides.length);
        }, 3800);

        return () => window.clearInterval(timer);
    }, [reduceMotion]);

    const template = slides[index];

    if (!template) {
        return null;
    }

    return (
        <div className="relative mx-auto w-full max-w-[280px] sm:max-w-[300px]">
            <div className="absolute -inset-3 rounded-[18px] bg-[radial-gradient(circle_at_30%_20%,rgba(212,168,66,0.22),transparent_55%)]" />
            <div className="relative overflow-hidden rounded-[14px] bg-white/95 p-1.5 shadow-[0_22px_50px_rgba(0,0,0,0.35)] ring-1 ring-white/20">
                <AnimatePresence mode="wait">
                    <motion.div
                        key={template.id}
                        initial={
                            reduceMotion ? false : { opacity: 0, rotate: 2, y: 12 }
                        }
                        animate={{ opacity: 1, rotate: 0, y: 0 }}
                        exit={
                            reduceMotion
                                ? undefined
                                : { opacity: 0, rotate: -2, y: -10 }
                        }
                        transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                        className="aspect-[3/4] overflow-hidden rounded-[10px] bg-[#eef1f5]"
                    >
                        <img
                            src={template.frame}
                            alt={`${template.name} CV template`}
                            className="h-full w-full object-cover object-top"
                            loading="eager"
                            decoding="async"
                        />
                    </motion.div>
                </AnimatePresence>
            </div>

            <div className="relative mt-3 flex flex-wrap items-center justify-center gap-2">
                {slides.map((slide, slideIndex) => (
                    <button
                        key={slide.id}
                        type="button"
                        aria-label={`Show ${slide.name}`}
                        className={`h-1.5 rounded-full transition-all ${slideIndex === index
                                ? 'w-6 bg-[var(--lp-gold)]'
                                : 'w-1.5 bg-white/35 hover:bg-white/55'
                            }`}
                        onClick={() => setIndex(slideIndex)}
                    />
                ))}
            </div>

            <p className="relative mt-2 text-center text-[0.72rem] text-white/70">
                {template.name}
            </p>
            <div className="relative mt-2 flex justify-center">
                <Link
                    href={`/templates?highlight=${encodeURIComponent(template.id)}`}
                    className="text-[0.72rem] font-semibold text-[var(--lp-gold)] underline-offset-2 hover:underline"
                >
                    Browse templates
                </Link>
            </div>
        </div>
    );
}
