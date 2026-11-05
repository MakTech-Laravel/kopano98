import { useState } from 'react';
import { toast } from 'sonner';

import type { LaunchpadTemplate } from '@/data/launchpad/templates';

type TemplateCardProps = {
    template: LaunchpadTemplate;
};

export function TemplateCard({ template }: TemplateCardProps) {
    const [color, setColor] = useState(template.colors[0]);

    return (
        <article className="group">
            <div className="relative overflow-hidden rounded-lg bg-[#eef1f5] shadow-sm">
                {template.atsSafe ? (
                    <span className="absolute top-2 left-2 z-10 rounded bg-[rgba(13,27,42,0.82)] px-2 py-0.5 text-[0.6rem] font-bold tracking-wide text-white">
                        ATS-safe
                    </span>
                ) : null}
                {template.recommended ? (
                    <span className="absolute top-0 right-0 z-10 rounded-bl-lg bg-rose-200 px-3 py-1 font-[family-name:var(--font-lp-display)] text-[0.52rem] font-bold text-rose-800 italic">
                        Recommended
                    </span>
                ) : null}

                <div
                    className="aspect-[3/4] p-4"
                    style={{
                        background: `linear-gradient(160deg, ${color}22, #fff 40%)`,
                    }}
                >
                    <div className="flex h-full flex-col rounded border border-black/5 bg-white p-3 shadow-sm">
                        <div
                            className="mb-2 h-2 w-1/2 rounded"
                            style={{ backgroundColor: color }}
                        />
                        <div className="mb-3 h-1.5 w-1/3 rounded bg-slate-200" />
                        <div className="flex flex-1 gap-2">
                            {template.columns === 2 ? (
                                <div className="w-1/3 space-y-1.5 rounded bg-slate-50 p-1.5">
                                    <div className="mx-auto mb-2 h-8 w-8 rounded-full bg-slate-200" />
                                    <div className="h-1 rounded bg-slate-200" />
                                    <div className="h-1 w-4/5 rounded bg-slate-200" />
                                    <div className="h-1 w-3/5 rounded bg-slate-200" />
                                </div>
                            ) : null}
                            <div className="flex-1 space-y-1.5">
                                <div className="h-1.5 rounded bg-slate-200" />
                                <div className="h-1.5 w-5/6 rounded bg-slate-100" />
                                <div className="h-1.5 w-4/6 rounded bg-slate-100" />
                                <div
                                    className="mt-2 h-1 w-1/3 rounded"
                                    style={{ backgroundColor: color }}
                                />
                                <div className="h-1.5 rounded bg-slate-200" />
                                <div className="h-1.5 w-5/6 rounded bg-slate-100" />
                            </div>
                        </div>
                    </div>
                </div>

                <div className="absolute inset-0 flex flex-col items-center justify-center gap-2 bg-[rgba(13,27,42,0.55)] px-3 opacity-0 transition group-hover:opacity-100 group-focus-within:opacity-100 sm:flex-row">
                    <button
                        type="button"
                        className="w-full max-w-[9.5rem] rounded border border-white/45 px-3 py-2 text-[0.7rem] font-semibold tracking-wide text-white sm:w-auto sm:px-4"
                        onClick={() =>
                            toast.message('Download available soon', {
                                description: 'UI mock — Milestone 1 only.',
                            })
                        }
                    >
                        Download
                    </button>
                    <button
                        type="button"
                        className="btn-lp-gold w-full max-w-[9.5rem] rounded px-3 py-2 text-[0.7rem] sm:w-auto sm:px-4"
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

            <div className="mt-2 flex gap-1.5">
                {template.colors.map((swatch) => (
                    <button
                        key={swatch}
                        type="button"
                        aria-label={`Color ${swatch}`}
                        onClick={() => setColor(swatch)}
                        className={`h-[17px] w-[17px] rounded-full ${color === swatch
                            ? 'ring-2 ring-[var(--lp-navy)] ring-offset-1'
                            : ''
                            }`}
                        style={{ backgroundColor: swatch }}
                    />
                ))}
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
