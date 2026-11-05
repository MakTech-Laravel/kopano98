import type {
    TemplateExperience,
    TemplateStyle,
} from '@/data/launchpad/templates';

export type TemplateFilters = {
    experience: TemplateExperience | 'any';
    withPhoto: boolean;
    withoutPhoto: boolean;
    col1: boolean;
    col2: boolean;
    style: TemplateStyle;
};

type FilterSidebarProps = {
    filters: TemplateFilters;
    onChange: (next: TemplateFilters) => void;
    onReset: () => void;
};

const experienceOptions: { value: TemplateExperience | 'any'; label: string }[] =
    [
        { value: 'any', label: 'Any experience' },
        { value: 'none', label: 'No Experience Yet' },
        { value: 'lt3', label: 'Less than 3 years' },
        { value: '3to5', label: '3–5 years' },
        { value: '5to10', label: '5–10 years' },
        { value: '10plus', label: '10+ years' },
    ];

const styleOptions: TemplateStyle[] = [
    'all',
    'traditional',
    'contemporary',
    'creative',
];

export function FilterSidebar({
    filters,
    onChange,
    onReset,
}: FilterSidebarProps) {
    return (
        <aside className="rounded-lg border border-[var(--lp-border)] bg-white p-4">
            <div className="mb-4 flex items-center justify-between">
                <h3 className="font-lp-display text-lp-navy text-xl">
                    Filters
                </h3>
                <button
                    type="button"
                    onClick={onReset}
                    className="text-[0.74rem] font-bold text-[var(--lp-gold-on-light-sm)]"
                >
                    Reset all
                </button>
            </div>

            <div className="mb-5">
                <p className="text-lp-navy mb-2 text-[0.78rem] font-bold">
                    Your Experience
                </p>
                <div className="space-y-1.5">
                    {experienceOptions.map((option) => (
                        <label
                            key={option.value}
                            className="text-lp-mid flex cursor-pointer items-center gap-2 text-[0.78rem]"
                        >
                            <input
                                type="radio"
                                name="experience"
                                checked={filters.experience === option.value}
                                onChange={() =>
                                    onChange({
                                        ...filters,
                                        experience: option.value,
                                    })
                                }
                                className="accent-[var(--lp-navy)]"
                            />
                            {option.label}
                        </label>
                    ))}
                </div>
            </div>

            <div className="mb-5">
                <p className="text-lp-navy mb-2 text-[0.78rem] font-bold">
                    Headshot
                </p>
                <label className="text-lp-mid mb-1.5 flex cursor-pointer items-center gap-2 text-[0.78rem]">
                    <input
                        type="checkbox"
                        checked={filters.withPhoto}
                        onChange={(event) =>
                            onChange({
                                ...filters,
                                withPhoto: event.target.checked,
                            })
                        }
                        className="accent-[var(--lp-navy)]"
                    />
                    With Photo
                </label>
                <label className="text-lp-mid flex cursor-pointer items-center gap-2 text-[0.78rem]">
                    <input
                        type="checkbox"
                        checked={filters.withoutPhoto}
                        onChange={(event) =>
                            onChange({
                                ...filters,
                                withoutPhoto: event.target.checked,
                            })
                        }
                        className="accent-[var(--lp-navy)]"
                    />
                    Without Photo
                </label>
            </div>

            <div className="mb-5">
                <p className="text-lp-navy mb-2 text-[0.78rem] font-bold">
                    Columns
                </p>
                <label className="text-lp-mid mb-1.5 flex cursor-pointer items-center gap-2 text-[0.78rem]">
                    <input
                        type="checkbox"
                        checked={filters.col1}
                        onChange={(event) =>
                            onChange({ ...filters, col1: event.target.checked })
                        }
                        className="accent-[var(--lp-navy)]"
                    />
                    1 Column
                </label>
                <label className="text-lp-mid flex cursor-pointer items-center gap-2 text-[0.78rem]">
                    <input
                        type="checkbox"
                        checked={filters.col2}
                        onChange={(event) =>
                            onChange({ ...filters, col2: event.target.checked })
                        }
                        className="accent-[var(--lp-navy)]"
                    />
                    2 Columns
                </label>
            </div>

            <div>
                <p className="text-lp-navy mb-2 text-[0.78rem] font-bold">
                    Style
                </p>
                <div className="flex flex-wrap gap-2">
                    {styleOptions.map((style) => (
                        <button
                            key={style}
                            type="button"
                            onClick={() => onChange({ ...filters, style })}
                            className={`rounded-full border px-3 py-1 text-[0.73rem] font-semibold capitalize ${filters.style === style
                                ? 'border-[var(--lp-navy)] bg-[var(--lp-navy)] text-white'
                                : 'border-[var(--lp-border)] text-[var(--lp-text-mid)]'
                                }`}
                        >
                            {style}
                        </button>
                    ))}
                </div>
            </div>
        </aside>
    );
}
