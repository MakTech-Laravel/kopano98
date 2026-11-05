import type { LaunchpadTemplate } from '@/data/launchpad/templates';

type TemplatePreviewProps = {
    template: LaunchpadTemplate;
    accent: string;
};

const sample = {
    name: 'Naledi Mokoena',
    title: 'Senior Sales Manager',
    contact: 'Bloemfontein · 072 458 3310 · naledi@email.com',
    summary:
        'Sales manager with 5+ years driving loyalty programmes and retail growth across Free State teams.',
    roles: [
        {
            title: 'Senior Sales Manager',
            company: 'Mangaung Agricultural Co-op',
            dates: '2021 – Present',
        },
        {
            title: 'Sales Manager',
            company: 'Rainbow Trade Holdings',
            dates: '2019 – 2021',
        },
    ],
    skills: ['Sales leadership', 'Merchandising', 'Loss prevention', 'CRM'],
};

function SectionLabel({
    children,
    accent,
    ruled,
}: {
    children: string;
    accent: string;
    ruled?: boolean;
}) {
    return (
        <div
            className="mb-1 text-[0.42rem] font-bold tracking-[0.08em] uppercase"
            style={{
                color: accent,
                borderBottom: ruled ? `1px solid ${accent}33` : undefined,
                paddingBottom: ruled ? 1 : undefined,
            }}
        >
            {children}
        </div>
    );
}

function Lines({ count = 2 }: { count?: number }) {
    return (
        <div className="space-y-[3px]">
            {Array.from({ length: count }).map((_, index) => (
                <div
                    key={index}
                    className="h-[3px] rounded-full bg-slate-200"
                    style={{ width: `${92 - index * 12}%` }}
                />
            ))}
        </div>
    );
}

/**
 * Live mini CV used on the templates grid.
 * Accent colour updates on swatch hover/click — same logic as the reference site.
 */
export function TemplatePreview({ template, accent }: TemplatePreviewProps) {
    const isSidebar = template.columns === 2 && template.id.includes('sidebar');
    const isBand =
        template.id === 'modern' ||
        template.id === 'graduate' ||
        template.id === 'elegant';
    const ruled =
        template.style === 'traditional' ||
        template.id === 'executive' ||
        template.id === 'classic' ||
        template.id === 'oxford';

    if (isSidebar) {
        return (
            <div className="flex h-full min-h-0 overflow-hidden rounded-[3px] bg-white text-left shadow-sm">
                <aside
                    className="flex w-[34%] flex-col gap-2 p-2.5 text-white"
                    style={{ backgroundColor: accent }}
                >
                    {template.withPhoto ? (
                        <div className="mx-auto mb-1 flex h-10 w-10 items-center justify-center rounded-full bg-white/20 text-[0.55rem] font-bold">
                            NM
                        </div>
                    ) : null}
                    <p className="text-[0.48rem] font-bold tracking-wide uppercase opacity-80">
                        Contact
                    </p>
                    <div className="space-y-1 opacity-90">
                        <div className="h-[3px] w-full rounded-full bg-white/45" />
                        <div className="h-[3px] w-[85%] rounded-full bg-white/45" />
                        <div className="h-[3px] w-[70%] rounded-full bg-white/45" />
                    </div>
                    <p className="mt-2 text-[0.48rem] font-bold tracking-wide uppercase opacity-80">
                        Skills
                    </p>
                    <div className="space-y-1">
                        {sample.skills.map((skill) => (
                            <div
                                key={skill}
                                className="rounded bg-white/15 px-1 py-0.5 text-[0.38rem] leading-tight"
                            >
                                {skill}
                            </div>
                        ))}
                    </div>
                </aside>
                <div className="min-w-0 flex-1 space-y-2 p-2.5">
                    <p
                        className="text-[0.72rem] leading-none font-bold"
                        style={{ color: accent }}
                    >
                        {sample.name}
                    </p>
                    <p className="text-[0.42rem] text-slate-500">{sample.title}</p>
                    <SectionLabel accent={accent}>Profile</SectionLabel>
                    <Lines count={3} />
                    <SectionLabel accent={accent}>Experience</SectionLabel>
                    {sample.roles.map((role) => (
                        <div key={role.title} className="mb-1.5">
                            <p className="text-[0.4rem] font-bold text-slate-700">
                                {role.title}
                            </p>
                            <p className="text-[0.36rem] text-slate-400">
                                {role.company} · {role.dates}
                            </p>
                            <Lines count={2} />
                        </div>
                    ))}
                </div>
            </div>
        );
    }

    return (
        <div className="flex h-full min-h-0 flex-col overflow-hidden rounded-[3px] bg-white text-left shadow-sm">
            {isBand ? (
                <div
                    className="flex items-center gap-2 px-2.5 py-2 text-white"
                    style={{ backgroundColor: accent }}
                >
                    <div className="min-w-0 flex-1">
                        <p className="truncate text-[0.7rem] leading-none font-bold">
                            {sample.name}
                        </p>
                        <p className="mt-0.5 text-[0.4rem] opacity-85">
                            {sample.title}
                        </p>
                    </div>
                    {template.withPhoto ? (
                        <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded bg-white/20 text-[0.5rem] font-bold">
                            NM
                        </div>
                    ) : null}
                </div>
            ) : (
                <div className="border-b border-slate-100 px-2.5 pt-2.5 pb-1.5">
                    <div className="flex items-start justify-between gap-2">
                        <div className="min-w-0">
                            <p
                                className="truncate text-[0.78rem] leading-none font-bold"
                                style={{ color: accent }}
                            >
                                {sample.name}
                            </p>
                            <p className="mt-0.5 text-[0.4rem] text-slate-500">
                                {sample.title}
                            </p>
                            <p className="mt-1 text-[0.34rem] text-slate-400">
                                {sample.contact}
                            </p>
                        </div>
                        {template.withPhoto ? (
                            <div
                                className="flex h-8 w-8 shrink-0 items-center justify-center rounded text-[0.5rem] font-bold text-white"
                                style={{ backgroundColor: accent }}
                            >
                                NM
                            </div>
                        ) : null}
                    </div>
                </div>
            )}

            <div className="space-y-2 p-2.5">
                {!isBand ? null : (
                    <p className="text-[0.34rem] text-slate-400">{sample.contact}</p>
                )}
                <SectionLabel accent={accent} ruled={ruled}>
                    Professional Summary
                </SectionLabel>
                <Lines count={3} />
                <SectionLabel accent={accent} ruled={ruled}>
                    Work History
                </SectionLabel>
                {sample.roles.map((role) => (
                    <div key={role.title} className="mb-1">
                        <div className="mb-0.5 flex items-baseline justify-between gap-1">
                            <p className="text-[0.4rem] font-bold text-slate-700">
                                {role.title}
                            </p>
                            <p className="text-[0.32rem] text-slate-400">
                                {role.dates}
                            </p>
                        </div>
                        <p className="mb-0.5 text-[0.34rem] text-slate-500">
                            {role.company}
                        </p>
                        <Lines count={2} />
                    </div>
                ))}
                <SectionLabel accent={accent} ruled={ruled}>
                    Skills
                </SectionLabel>
                <div className="flex flex-wrap gap-1">
                    {sample.skills.map((skill) => (
                        <span
                            key={skill}
                            className="rounded px-1 py-0.5 text-[0.34rem] font-semibold text-white"
                            style={{ backgroundColor: accent }}
                        >
                            {skill}
                        </span>
                    ))}
                </div>
            </div>
        </div>
    );
}
