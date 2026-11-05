import { Head } from '@inertiajs/react';
import { useMemo, useState } from 'react';

import {
    FilterSidebar,
    type TemplateFilters,
} from '@/components/launchpad/templates/filter-sidebar';
import { TemplateCard } from '@/components/launchpad/templates/template-card';
import { launchpadTemplates } from '@/data/launchpad/templates';
import LaunchpadLayout from '@/layouts/launchpad-layout';

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

            <section className="bg-lp-navy relative overflow-hidden py-12 sm:py-14">
                <div
                    className="pointer-events-none absolute inset-0 opacity-50"
                    style={{
                        background:
                            'radial-gradient(ellipse at 80% 0%, rgba(212,168,66,0.16), transparent 45%)',
                    }}
                />
                <div className="container relative grid items-center gap-8 md:grid-cols-[1.2fr_0.8fr]">
                    <div className="min-w-0 text-left">
                        <p className="mb-2 text-[0.7rem] font-medium tracking-[0.08em] text-[rgba(201,168,90,0.85)] uppercase">
                            Template library
                        </p>
                        <h1 className="font-lp-display mb-3 text-[clamp(1.85rem,5vw,2.85rem)] leading-tight text-white">
                            Templates for every industry,{' '}
                            <em className="text-lp-gold italic">
                                every country
                            </em>
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
                            ].map((item) => (
                                <li key={item} className="flex items-center gap-2">
                                    <span className="text-lp-gold flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-white/10 text-[0.65rem] font-semibold">
                                        ✓
                                    </span>
                                    {item}
                                </li>
                            ))}
                        </ul>
                    </div>
                    <div className="hidden justify-end md:flex">
                        <img
                            src="/images/launchpad/templates/executive.png"
                            alt="Executive CV template preview"
                            className="w-full max-w-[240px] rounded-xl border border-white/10 shadow-2xl"
                            loading="lazy"
                        />
                    </div>
                </div>
            </section>

            <section className="py-8 sm:py-10">
                <div className="container">
                    <div className="grid gap-6 lg:grid-cols-[240px_minmax(0,1fr)]">
                        <FilterSidebar
                            filters={filters}
                            onChange={setFilters}
                            onReset={() => setFilters(defaultFilters)}
                        />
                        <div className="min-w-0">
                            {filtered.length === 0 ? (
                                <p className="text-lp-light py-16 text-center text-sm">
                                    No templates match these filters. Reset to see
                                    all.
                                </p>
                            ) : (
                                <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-3">
                                    {filtered.map((template) => (
                                        <TemplateCard
                                            key={template.id}
                                            template={template}
                                        />
                                    ))}
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </section>
        </LaunchpadLayout>
    );
}
