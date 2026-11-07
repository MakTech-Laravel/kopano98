import { Link } from '@inertiajs/react';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import { useEffect, useState } from 'react';

import { TemplatePreview } from '@/components/launchpad/templates/template-preview';
import { launchpadTemplates } from '@/data/launchpad/templates';

const slides = launchpadTemplates.slice(0, 8);

/**
 * Compact rotating CV template stack for the home hero.
 */
export function HeroTemplateCarousel() {
    const reduceMotion = useReducedMotion();
    const [index, setIndex] = useState(0);

    useEffect(() => {
        if (reduceMotion) {
            return;
        }

        const timer = window.setInterval(() => {
            setIndex((current) => (current + 1) % slides.length);
        }, 3800);

        return () => window.clearInterval(timer);
    }, [reduceMotion]);

    const template = slides[index];

    return (
        <div className="relative mx-auto w-full max-w-[280px] sm:max-w-[300px]">
            <div className="absolute -inset-3 rounded-[18px] bg-[radial-gradient(circle_at_30%_20%,rgba(212,168,66,0.22),transparent_55%)]" />
            <div className="relative overflow-hidden rounded-[14px] bg-white/95 p-2.5 shadow-[0_22px_50px_rgba(0,0,0,0.35)] ring-1 ring-white/20">
                <AnimatePresence mode="wait">
                    <motion.div
                        key={template.id}
                        initial={reduceMotion ? false : { opacity: 0, rotate: 2, y: 12 }}
                        animate={{ opacity: 1, rotate: 0, y: 0 }}
                        exit={
                            reduceMotion
                                ? undefined
                                : { opacity: 0, rotate: -2, y: -10 }
                        }
                        transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                        className="aspect-[3/4]"
                    >
                        <TemplatePreview
                            template={template}
                            accent={template.colors[0]}
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
