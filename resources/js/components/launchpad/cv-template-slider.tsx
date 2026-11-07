import { Link } from '@inertiajs/react';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import { useEffect, useState } from 'react';

import { launchpadTemplates } from '@/data/launchpad/templates';

const galleryIds = [
    'classic',
    'minimal',
    'elegant',
    'executive',
    'modern',
    'graduate',
    'stripe',
    'heritage',
] as const;

const slides = galleryIds
    .map((id) => launchpadTemplates.find((template) => template.id === id))
    .filter((template): template is (typeof launchpadTemplates)[number] =>
        Boolean(template),
    )
    .map((template) => ({
        ...template,
        frame: `/images/launchpad/templates/${template.id}.png`,
    }));

export function CvTemplateSlider() {
    const reduceMotion = useReducedMotion();
    const [index, setIndex] = useState(0);

    useEffect(() => {
        if (reduceMotion) {
            return;
        }

        const timer = window.setInterval(() => {
            setIndex((current) => (current + 1) % slides.length);
        }, 4200);

        return () => window.clearInterval(timer);
    }, [reduceMotion]);

    const template = slides[index];

    return (
        <section className="border-y border-[var(--lp-border)] bg-[var(--lp-off)] py-10 sm:py-12">
            <div className="container">
                <div className="mb-6 max-w-2xl">
                    <p className="mb-2 text-[0.7rem] font-medium tracking-[0.08em] text-[var(--lp-gold-on-light)] uppercase">
                        Template gallery
                    </p>
                    <h2 className="font-lp-display text-lp-navy text-[clamp(1.65rem,4vw,2.35rem)] leading-[1.15]">
                        Explore the full template library.
                    </h2>
                    <p className="text-lp-mid mt-2.5 max-w-xl text-[0.92rem] leading-relaxed">
                        Same Launchpad template frames as the hero — then open
                        the library to filter by photo, columns, and style.
                    </p>
                </div>

                <div className="grid items-center gap-6 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,0.9fr)]">
                    <div className="relative mx-auto w-full max-w-md overflow-hidden rounded-[12px] bg-white p-4 shadow-[0_18px_40px_rgba(13,27,42,0.10)] ring-1 ring-black/5">
                        <AnimatePresence mode="wait">
                            <motion.div
                                key={template.id}
                                initial={
                                    reduceMotion
                                        ? false
                                        : { opacity: 0, x: 24 }
                                }
                                animate={{ opacity: 1, x: 0 }}
                                exit={
                                    reduceMotion
                                        ? undefined
                                        : { opacity: 0, x: -24 }
                                }
                                transition={{ duration: 0.35 }}
                                className="aspect-[3/4] overflow-hidden rounded-[8px] bg-[#eef1f5]"
                            >
                                <img
                                    src={template.frame}
                                    alt={`${template.name} CV template`}
                                    className="h-full w-full object-cover object-top"
                                    loading="lazy"
                                    decoding="async"
                                />
                            </motion.div>
                        </AnimatePresence>
                    </div>

                    <div>
                        <p className="text-lp-navy font-lp-display text-2xl">
                            {template.name}
                        </p>
                        <p className="text-lp-mid mt-2 text-sm leading-relaxed">
                            {template.description}
                        </p>
                        <div className="mt-4 flex flex-wrap gap-2">
                            {slides.map((slide, slideIndex) => (
                                <button
                                    key={slide.id}
                                    type="button"
                                    aria-label={`Show ${slide.name}`}
                                    className={`h-2.5 rounded-full transition-all ${slideIndex === index
                                        ? 'w-8 bg-[var(--lp-navy)]'
                                        : 'w-2.5 bg-[var(--lp-border)]'
                                        }`}
                                    onClick={() => setIndex(slideIndex)}
                                />
                            ))}
                        </div>
                        <div className="mt-6 flex flex-wrap gap-3">
                            <Link
                                href={`/templates/builder?template=${template.id}`}
                                className="btn-lp-gold inline-flex px-5 py-2.5 text-sm"
                            >
                                Build with {template.name}
                            </Link>
                            <Link
                                href="/templates"
                                className="inline-flex rounded-[5px] border-[1.5px] border-[var(--lp-navy)] px-5 py-2.5 text-sm font-semibold text-[var(--lp-navy)]"
                            >
                                Browse all templates
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
