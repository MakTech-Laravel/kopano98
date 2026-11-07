import { useEffect, useState } from 'react';
import { toast } from 'sonner';

import { TemplatePreview } from '@/components/launchpad/templates/template-preview';
import { defaultCvDocument } from '@/data/launchpad/cv-document';
import type { LaunchpadTemplate } from '@/data/launchpad/templates';
import { exportCvPdf } from '@/lib/launchpad/cv-export';

type TemplateCardProps = {
    template: LaunchpadTemplate;
    onBuild: (template: LaunchpadTemplate) => void;
};

export function TemplateCard({ template, onBuild }: TemplateCardProps) {
    const [accent, setAccent] = useState(template.colors[0]);
    const [hoverAccent, setHoverAccent] = useState<string | null>(null);
    const activeAccent = hoverAccent ?? accent;

    const defaultAccent = template.colors[0];

    useEffect(() => {
        setAccent(defaultAccent);
        setHoverAccent(null);
    }, [template.id, defaultAccent]);

    return (
        <article className="group">
            <div className="relative overflow-hidden rounded-[10px] bg-[#eef1f5] shadow-sm ring-1 ring-black/5 transition duration-300 group-hover:shadow-md">
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

                <div className="aspect-[3/4] overflow-hidden bg-white p-2 sm:p-2.5">
                    <div className="h-full w-full origin-top transition duration-300 group-hover:scale-[1.012]">
                        <TemplatePreview
                            template={template}
                            accent={activeAccent}
                            document={defaultCvDocument}
                            density="card"
                        />
                    </div>
                </div>

                <div className="pointer-events-none absolute inset-x-0 bottom-0 z-[5] flex translate-y-1 items-center justify-center gap-2 bg-gradient-to-t from-[rgba(13,27,42,0.9)] via-[rgba(13,27,42,0.55)] to-transparent px-3 pt-12 pb-3 opacity-0 transition group-hover:translate-y-0 group-hover:opacity-100 group-focus-within:translate-y-0 group-focus-within:opacity-100">
                    <button
                        type="button"
                        className="pointer-events-auto min-w-0 rounded border border-white/45 px-3 py-2 text-[0.68rem] font-semibold tracking-wide text-white"
                        onClick={() => {
                            exportCvPdf(defaultCvDocument, template, accent);
                            toast.success('Sample PDF downloaded');
                        }}
                    >
                        Download
                    </button>
                    <button
                        type="button"
                        className="btn-lp-gold pointer-events-auto min-w-0 rounded px-3.5 py-2 text-[0.68rem]"
                        onClick={() => onBuild(template)}
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
                            title={`Accent ${swatch}`}
                            aria-label={`Use accent ${swatch}`}
                            aria-pressed={selected}
                            className="h-[18px] w-[18px] rounded-full transition"
                            style={{
                                backgroundColor: swatch,
                                boxShadow: selected
                                    ? `0 0 0 2px #fff, 0 0 0 3.5px ${swatch}`
                                    : '0 0 0 1px rgba(13,27,42,0.12)',
                            }}
                            onMouseEnter={() => setHoverAccent(swatch)}
                            onMouseLeave={() => setHoverAccent(null)}
                            onFocus={() => setHoverAccent(swatch)}
                            onBlur={() => setHoverAccent(null)}
                            onClick={() => setAccent(swatch)}
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
