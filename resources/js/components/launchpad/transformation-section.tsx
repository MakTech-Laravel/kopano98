import { useState } from 'react';

import { Reveal } from '@/components/launchpad/reveal';

export function TransformationSection() {
    const [lightboxOpen, setLightboxOpen] = useState(false);

    return (
        <section className="overflow-hidden bg-white pt-7 pb-0 sm:pt-8">
            <div className="container max-w-[960px] pb-2">
                <Reveal>
                    <div className="mx-auto mb-7 max-w-2xl text-center">
                        <p className="mb-2 text-[0.68rem] font-bold tracking-[0.14em] text-[var(--lp-gold-on-light-sm)] uppercase">
                            The transformation
                        </p>
                        <h2 className="font-lp-display text-lp-navy text-[clamp(1.5rem,4vw,2.2rem)] leading-[1.15] font-normal tracking-[-0.01em]">
                            From overlooked to{' '}
                            <span className="text-[var(--lp-gold-on-light)]">
                                top 1%.
                            </span>
                        </h2>
                    </div>
                </Reveal>

                <Reveal delay={0.06}>
                    <figure className="mx-auto mb-7 max-w-[820px]">
                        <button
                            type="button"
                            className="block w-full cursor-zoom-in border-0 bg-transparent p-0"
                            onClick={() => setLightboxOpen(true)}
                            aria-label="Enlarge transformation image"
                        >
                            <img
                                src="/images/launchpad/showcase/cv-transformation.jpg"
                                alt="Before and after CV comparison — rejected messy CV versus selected top 1% rewrite"
                                className="h-auto w-full rounded-[10px] object-cover object-top"
                                loading="eager"
                                fetchPriority="high"
                            />
                        </button>
                    </figure>
                </Reveal>
            </div>

            {lightboxOpen ? (
                <button
                    type="button"
                    className="fixed inset-0 z-[11000] flex cursor-zoom-out items-center justify-center bg-[rgba(13,27,42,0.92)] p-5"
                    onClick={() => setLightboxOpen(false)}
                    aria-label="Close enlarged image"
                >
                    <img
                        src="/images/launchpad/showcase/cv-transformation.jpg"
                        alt="Enlarged transformation view"
                        className="max-h-full max-w-full object-contain"
                    />
                </button>
            ) : null}
        </section>
    );
}
