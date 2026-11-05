import { useState } from 'react';
import { toast } from 'sonner';

import { TemplatePreview } from '@/components/launchpad/templates/template-preview';
import type { LaunchpadTemplate } from '@/data/launchpad/templates';

type TemplateCardProps = {
    template: LaunchpadTemplate;
};

export function TemplateCard({ template }: TemplateCardProps) {
    const [accent, setAccent] = useState(template.colors[0]);
    const [hoverAccent, setHoverAccent] = useState<string | null>(null);
    const activeAccent = hoverAccent ?? accent;

    return (
        <article className="group">
            <div className="relative overflow-hidden rounded-[10px] bg-[#eef1f5] shadow-sm ring-1 ring-black/5">
                {template.atsSafe ? (
                    <span className="absolute top-2 left-2 z-10 rounded bg-[rgba(13,27,42,0.82)] px-2 py-0.5 text-[0.6rem] font-bold tracking-wide text-white">
                        ATS-safe
                    </span>
                ) : null}
                {template.recommended ? (
                    <span className="absolute top-0 right-0 z-10 rounded-bl-lg bg-rose-200 px-3 py-1 font-[family-name:var(--font-lp-display)] text-[0.52rem] font-bold text-rose-800">
                        Recommended
                    </span>
                ) : null}

                <div className="aspect-[3/4] overflow-hidden p-3 sm:p-4">
                    <div className="h-full transition duration-300 group-hover:scale-[1.01]">
                        <TemplatePreview
                            template={template}
                            accent={activeAccent}
                        />
                    </div>
                </div>

                <div className="pointer-events-none absolute inset-x-0 bottom-0 z-[5] flex translate-y-1 flex-col gap-2 bg-gradient-to-t from-[rgba(13,27,42,0.88)] via-[rgba(13,27,42,0.55)] to-transparent px-3 pt-10 pb-3 opacity-0 transition group-hover:translate-y-0 group-hover:opacity-100 group-focus-within:translate-y-0 group-focus-within:opacity-100 sm:flex-row sm:items-end">
                    <button
                        type="button"
                        className="pointer-events-auto w-full rounded border border-white/45 px-3 py-2 text-[0.7rem] font-semibold tracking-wide text-white sm:flex-1"
                        onClick={() =>
                            toast.message('Download available soon', {
                                description:
                                    'Template downloads connect in the next milestone.',
                            })
                        }
                    >
                        Download
                    </button>
                    <button
                        type="button"
                        className="btn-lp-gold pointer-events-auto w-full rounded px-3 py-2 text-[0.7rem] sm:flex-1"
                        onClick={() =>
                            toast.message('CV builder coming soon', {
                                description:
                                    'Build flow hooks into Milestone 2 tools.',
                            })
                        }
                    >
                        Build My CV
                    </button>
                </div>
            </div>

            <div className="mt-2.5 flex flex-wrap gap-1.5">
                {template.colors.map((swatch) => {
                    const selected = accent === swatch;

                    return (
                        <button
                            key={swatch}
                            type="button"
                            aria-label={`Preview accent ${swatch}`}
                            aria-pressed={selected}
                            title={swatch}
                            onMouseEnter={() => setHoverAccent(swatch)}
                            onMouseLeave={() => setHoverAccent(null)}
                            onFocus={() => setHoverAccent(swatch)}
                            onBlur={() => setHoverAccent(null)}
                            onClick={() => setAccent(swatch)}
                            className="h-[18px] w-[18px] rounded-full transition-transform hover:scale-110 focus-visible:outline-none"
                            style={{
                                backgroundColor: swatch,
                                boxShadow: selected
                                    ? `0 0 0 2px #fff, 0 0 0 3px ${swatch}`
                                    : '0 0 0 1px rgba(13,27,42,0.12)',
                            }}
                        />
                    );
                })}
            </div>
            <h3 className="font-lp-display text-lp-navy mt-2 text-[1.05rem]">
                {template.name}
            </h3>
            <p className="text-lp-light text-[0.68rem] leading-snug">
                {template.description}
            </p>
        </article>
    );
}
