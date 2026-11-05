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
            <div className="relative overflow-hidden rounded-[10px] bg-[#eef1f5] shadow-sm ring-1 ring-black/5">
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
                    className="aspect-[3/4] overflow-hidden p-3 sm:p-4"
                    style={{
                        background: `linear-gradient(160deg, ${color}18, #f8fafc 42%)`,
                    }}
                >
                    <img
                        src={template.image}
                        alt={`${template.name} CV template preview`}
                        className="h-full w-full rounded border border-black/5 object-cover object-top shadow-sm transition duration-500 group-hover:scale-[1.02]"
                        loading="lazy"
                        style={{
                            boxShadow: `0 0 0 1px ${color}22`,
                        }}
                    />
                </div>

                <div className="absolute inset-0 flex flex-col items-center justify-center gap-2 bg-[rgba(13,27,42,0.55)] px-3 opacity-0 transition group-hover:opacity-100 group-focus-within:opacity-100 sm:flex-row">
                    <button
                        type="button"
                        className="w-full max-w-[9.5rem] rounded border border-white/45 px-3 py-2 text-[0.7rem] font-semibold tracking-wide text-white sm:w-auto sm:px-4"
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

            <div className="mt-2.5 flex gap-1.5">
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
