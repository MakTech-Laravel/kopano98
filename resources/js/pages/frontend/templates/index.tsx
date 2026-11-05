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

            <section className="bg-gradient-to-b from-[#fcfaf5] to-[var(--lp-off)] py-10 sm:py-12">
                <div className="container grid items-center gap-8 md:grid-cols-[1fr_240px] lg:grid-cols-[1fr_280px]">
                    <div className="min-w-0">
                        <h1 className="font-lp-display text-lp-navy mb-3 text-[clamp(1.7rem,4vw,2.4rem)]">
                            CV templates that hire
                        </h1>
                        <p className="text-lp-mid mb-4 max-w-xl text-sm leading-relaxed text-pretty">
                            Filter by experience, photo, columns, and style. We
                            recommend ATS-safe single-column layouts for most
                            applications.
                        </p>
                        <ul className="space-y-2 text-sm font-semibold text-[var(--lp-text)]">
                            <li className="flex items-center gap-2">
                                <span className="bg-lp-gold/15 text-[var(--lp-gold-on-light-sm)] flex h-5 w-5 shrink-0 items-center justify-center rounded-full text-[0.65rem] font-semibold">
                                    ✓
                                </span>
                                ATS-safe options marked clearly
                            </li>
                            <li className="flex items-center gap-2">
                                <span className="bg-lp-gold/15 text-[var(--lp-gold-on-light-sm)] flex h-5 w-5 shrink-0 items-center justify-center rounded-full text-[0.65rem] font-semibold">
                                    ✓
                                </span>
                                Colour swatches for quick preview
                            </li>
                        </ul>
                    </div>
                    <div className="hidden justify-end md:flex">
                        <div className="w-full max-w-[200px] rounded-xl border border-[var(--lp-border)] bg-white p-3 shadow-md">
                            <div className="bg-lp-navy mb-2 h-2 rounded" />
                            <div className="mb-3 h-1.5 w-1/2 rounded bg-slate-200" />
                            <div className="space-y-1.5">
                                <div className="h-1.5 rounded bg-slate-100" />
                                <div className="h-1.5 w-5/6 rounded bg-slate-100" />
                                <div className="h-1.5 w-4/6 rounded bg-slate-100" />
                            </div>
                        </div>
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
