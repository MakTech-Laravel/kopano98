import { Head } from '@inertiajs/react';
import { motion, useReducedMotion } from 'framer-motion';
import { lazy, Suspense, useMemo, useState } from 'react';

import { FadeIn, Reveal } from '@/components/launchpad/reveal';
import {
    FilterSidebar,
    type TemplateFilters,
} from '@/components/launchpad/templates/filter-sidebar';
import { TemplateCard } from '@/components/launchpad/templates/template-card';
import { TemplateEditModal } from '@/components/launchpad/templates/template-edit-modal';
import {
    launchpadTemplates,
    type LaunchpadTemplate,
} from '@/data/launchpad/templates';
import LaunchpadLayout from '@/layouts/launchpad-layout';

const AtmosphereScene = lazy(() =>
    import('@/components/launchpad/atmosphere-scene').then((module) => ({
        default: module.AtmosphereScene,
    })),
);

const defaultFilters: TemplateFilters = {
    experience: 'any',
    withPhoto: true,
    withoutPhoto: true,
    col1: true,
    col2: true,
    style: 'all',
};

export default function TemplatesIndex() {
    const [filters, setFilters] = useState<TemplateFilters>(defaultFilters);
    const [editingTemplate, setEditingTemplate] =
        useState<LaunchpadTemplate | null>(null);
    const reduceMotion = useReducedMotion();

    const filtered = useMemo(() => {
        return launchpadTemplates.filter((template) => {
            if (
                filters.experience !== 'any' &&
                !template.experience.includes(filters.experience)
            ) {
                return false;
            }

            if (!filters.withPhoto && template.withPhoto) {
                return false;
            }

            if (!filters.withoutPhoto && !template.withPhoto) {
                return false;
            }

            if (!filters.col1 && template.columns === 1) {
                return false;
            }

            if (!filters.col2 && template.columns === 2) {
                return false;
            }

            if (filters.style !== 'all' && template.style !== filters.style) {
                return false;
            }

            return true;
        });
    }, [filters]);

    return (
        <LaunchpadLayout>
            <Head title="CV Templates | Launchpad Careers" />

            <section className="bg-lp-navy relative isolate overflow-hidden py-12 sm:py-14">
                <Suspense fallback={null}>
                    <AtmosphereScene density={1.05} />
                </Suspense>
                <div
                    className="pointer-events-none absolute inset-0 opacity-50"
                    style={{
                        background:
                            'radial-gradient(ellipse at 80% 0%, rgba(212,168,66,0.16), transparent 45%)',
                    }}
                />
                <div className="container relative z-10 grid items-center gap-8 md:grid-cols-[1.2fr_0.8fr]">
                    <FadeIn className="min-w-0 text-left">
                        <p className="mb-2 text-[0.7rem] font-medium tracking-[0.08em] text-[rgba(201,168,90,0.85)] uppercase">
                            Template library
                        </p>
                        <h1 className="font-lp-display mb-3 text-[clamp(1.85rem,5vw,2.85rem)] leading-tight text-white">
                            Templates for every industry,{' '}
                            <span className="text-lp-gold">every country</span>
                            , every version of you.
                        </h1>
                        <p className="mb-5 max-w-xl text-sm leading-relaxed text-pretty text-white/68">
                            A creative role in Cape Town and a corporate one in
                            Dubai need different CVs — not one template stretched
                            to fit. Filter by experience, photo, columns, and
                            style.
                        </p>
                        <ul className="space-y-2 text-sm font-semibold text-white/85">
                            {[
                                'Styled for every industry',
                                'Built to match hiring norms by country',
                                'ATS-safe options marked clearly',
                            ].map((item, index) => (
                                <motion.li
                                    key={item}
                                    className="flex items-center gap-2"
                                    initial={
                                        reduceMotion
                                            ? false
                                            : { opacity: 0, x: -10 }
                                    }
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{
                                        delay: 0.12 + index * 0.06,
                                        duration: 0.4,
                                    }}
                                >
                                    <span className="text-lp-gold flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-white/10 text-[0.65rem] font-semibold">
                                        ✓
                                    </span>
                                    {item}
                                </motion.li>
                            ))}
                        </ul>
                    </FadeIn>
                    <FadeIn
                        delay={0.12}
                        className="hidden justify-end md:flex"
                    >
                        <motion.img
                            src="/images/launchpad/templates/executive.webp"
                            alt="Executive CV template preview"
                            className="w-full max-w-[240px] rounded-xl border border-white/10 shadow-2xl"
                            loading="lazy"
                            animate={
                                reduceMotion
                                    ? undefined
                                    : { y: [0, -8, 0] }
                            }
                            transition={
                                reduceMotion
                                    ? undefined
                                    : {
                                        duration: 5,
                                        repeat: Infinity,
                                        ease: 'easeInOut',
                                    }
                            }
                        />
                    </FadeIn>
                </div>
            </section>

            <section className="py-8 sm:py-10">
                <div className="container">
                    <div className="grid gap-5 lg:grid-cols-[220px_minmax(0,1fr)] lg:gap-6">
                        <Reveal direction="left">
                            <FilterSidebar
                                filters={filters}
                                onChange={setFilters}
                                onReset={() => setFilters(defaultFilters)}
                            />
                        </Reveal>
                        <div className="min-w-0">
                            <p className="text-lp-light mb-4 text-[0.78rem] leading-snug">
                                <span className="text-lp-navy font-semibold">
                                    Live templates
                                </span>{' '}
                                — tap a template for{' '}
                                <span className="text-lp-navy font-semibold">
                                    Download
                                </span>{' '}
                                /{' '}
                                <span className="text-lp-navy font-semibold">
                                    Build My CV
                                </span>
                                , or tap a colour to preview accents.
                            </p>

                            {filtered.length === 0 ? (
                                <p className="text-lp-light py-16 text-center text-sm">
                                    No templates match these filters. Reset to see
                                    all.
                                </p>
                            ) : (
                                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-5 xl:grid-cols-3">
                                    {filtered.map((template, index) => (
                                        <Reveal
                                            key={template.id}
                                            delay={Math.min(index * 0.04, 0.28)}
                                            duration={0.45}
                                        >
                                            <TemplateCard
                                                template={template}
                                                onBuild={setEditingTemplate}
                                            />
                                        </Reveal>
                                    ))}
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </section>

            {editingTemplate ? (
                <TemplateEditModal
                    template={editingTemplate}
                    onClose={() => setEditingTemplate(null)}
                />
            ) : null}
        </LaunchpadLayout>
    );
}
