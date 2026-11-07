import {
    cvContactLine,
    cvInitials,
    defaultCvDocument,
    type CvDocument,
} from '@/data/launchpad/cv-document';
import type { LaunchpadTemplate } from '@/data/launchpad/templates';

type TemplatePreviewProps = {
    template: LaunchpadTemplate;
    accent: string;
    document?: CvDocument;
    /** Compact card preview vs builder/export-scale preview */
    density?: 'card' | 'builder';
};

function SectionLabel({
    children,
    accent,
    ruled,
    density,
}: {
    children: string;
    accent: string;
    ruled?: boolean;
    density: 'card' | 'builder';
}) {
    return (
        <div
            className={
                density === 'builder'
                    ? 'mb-1.5 text-[0.7rem] font-bold tracking-[0.08em] uppercase'
                    : 'mb-1 text-[0.42rem] font-bold tracking-[0.08em] uppercase'
            }
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

function PhotoBadge({
    document,
    accent,
    sizeClass,
}: {
    document: CvDocument;
    accent: string;
    sizeClass: string;
}) {
    if (document.photoDataUrl) {
        return (
            <img
                src={document.photoDataUrl}
                alt=""
                className={`${sizeClass} shrink-0 rounded object-cover`}
            />
        );
    }

    return (
        <div
            className={`flex shrink-0 items-center justify-center rounded font-bold text-white ${sizeClass}`}
            style={{ backgroundColor: accent }}
        >
            {cvInitials(document.name || 'CV')}
        </div>
    );
}

/**
 * Live mini CV used on the templates grid and CV builder.
 * Accent colour updates on swatch hover/click — same logic as the reference site.
 */
export function TemplatePreview({
    template,
    accent,
    document = defaultCvDocument,
    density = 'card',
}: TemplatePreviewProps) {
    // All two-column catalogue templates use a functional sidebar preview
    // (not a marketing PNG), matching photo/no-photo and accent hover.
    const isSidebar = template.columns === 2;
    const isBand =
        !isSidebar &&
        (template.id === 'modern' ||
            template.id === 'graduate' ||
            template.id === 'elegant');
    const ruled =
        template.style === 'traditional' ||
        template.id === 'executive' ||
        template.id === 'classic' ||
        template.id === 'oxford';
    const contact = cvContactLine(document);
    const nameClass =
        density === 'builder'
            ? 'text-[1.35rem] leading-none font-bold'
            : 'text-[0.72rem] leading-none font-bold';
    const titleClass =
        density === 'builder' ? 'text-[0.85rem]' : 'text-[0.42rem]';
    const bodyClass =
        density === 'builder' ? 'text-[0.78rem] leading-relaxed' : 'text-[0.34rem]';
    const roleTitleClass =
        density === 'builder'
            ? 'text-[0.82rem] font-bold text-slate-700'
            : 'text-[0.4rem] font-bold text-slate-700';

    if (isSidebar) {
        return (
            <div
                className={`flex h-full min-h-0 overflow-hidden rounded-[3px] bg-white text-left shadow-sm ${
                    density === 'builder' ? 'min-h-[640px]' : ''
                }`}
            >
                <aside
                    className={`flex flex-col gap-2 text-white ${
                        density === 'builder'
                            ? 'w-[34%] gap-3 p-5'
                            : 'w-[34%] p-2.5'
                    }`}
                    style={{ backgroundColor: accent }}
                >
                    {template.withPhoto ? (
                        <div className="mx-auto mb-1">
                            {document.photoDataUrl ? (
                                <img
                                    src={document.photoDataUrl}
                                    alt=""
                                    className={
                                        density === 'builder'
                                            ? 'h-20 w-20 rounded-full object-cover'
                                            : 'h-10 w-10 rounded-full object-cover'
                                    }
                                />
                            ) : (
                                <div
                                    className={`mx-auto flex items-center justify-center rounded-full bg-white/20 font-bold ${
                                        density === 'builder'
                                            ? 'h-20 w-20 text-lg'
                                            : 'h-10 w-10 text-[0.55rem]'
                                    }`}
                                >
                                    {cvInitials(document.name || 'CV')}
                                </div>
                            )}
                        </div>
                    ) : null}
                    <p
                        className={`font-bold tracking-wide uppercase opacity-80 ${
                            density === 'builder' ? 'text-xs' : 'text-[0.48rem]'
                        }`}
                    >
                        Contact
                    </p>
                    <p
                        className={`opacity-90 ${
                            density === 'builder'
                                ? 'text-[0.78rem] leading-relaxed'
                                : 'text-[0.36rem] leading-snug'
                        }`}
                    >
                        {contact}
                    </p>
                    <p
                        className={`mt-2 font-bold tracking-wide uppercase opacity-80 ${
                            density === 'builder' ? 'text-xs' : 'text-[0.48rem]'
                        }`}
                    >
                        Skills
                    </p>
                    <div className="space-y-1">
                        {document.skills.map((skill) => (
                            <div
                                key={skill}
                                className={`rounded bg-white/15 leading-tight ${
                                    density === 'builder'
                                        ? 'px-2 py-1 text-[0.72rem]'
                                        : 'px-1 py-0.5 text-[0.38rem]'
                                }`}
                            >
                                {skill}
                            </div>
                        ))}
                    </div>
                </aside>
                <div
                    className={`min-w-0 flex-1 space-y-2 ${
                        density === 'builder' ? 'space-y-4 p-5' : 'p-2.5'
                    }`}
                >
                    <p className={nameClass} style={{ color: accent }}>
                        {document.name}
                    </p>
                    <p className={`${titleClass} text-slate-500`}>
                        {document.title}
                    </p>
                    <SectionLabel accent={accent} density={density}>
                        Profile
                    </SectionLabel>
                    <p className={`${bodyClass} text-slate-600`}>
                        {document.summary}
                    </p>
                    <SectionLabel accent={accent} density={density}>
                        Experience
                    </SectionLabel>
                    {document.experience.map((role) => (
                        <div key={`${role.title}-${role.company}`} className="mb-1.5">
                            <p className={roleTitleClass}>{role.title}</p>
                            <p
                                className={
                                    density === 'builder'
                                        ? 'text-[0.72rem] text-slate-400'
                                        : 'text-[0.36rem] text-slate-400'
                                }
                            >
                                {role.company} · {role.dates}
                            </p>
                            {density === 'builder' && role.description ? (
                                <p className="mt-1 text-[0.75rem] text-slate-600">
                                    {role.description}
                                </p>
                            ) : null}
                        </div>
                    ))}
                </div>
            </div>
        );
    }

    return (
        <div
            className={`flex h-full min-h-0 flex-col overflow-hidden rounded-[3px] bg-white text-left shadow-sm ${
                density === 'builder' ? 'min-h-[640px]' : ''
            }`}
        >
            {isBand ? (
                <div
                    className={`flex items-center gap-2 text-white ${
                        density === 'builder' ? 'gap-4 px-5 py-4' : 'px-2.5 py-2'
                    }`}
                    style={{ backgroundColor: accent }}
                >
                    <div className="min-w-0 flex-1">
                        <p
                            className={`truncate font-bold ${
                                density === 'builder'
                                    ? 'text-[1.35rem] leading-none'
                                    : 'text-[0.7rem] leading-none'
                            }`}
                        >
                            {document.name}
                        </p>
                        <p
                            className={`mt-0.5 opacity-85 ${
                                density === 'builder'
                                    ? 'text-[0.85rem]'
                                    : 'text-[0.4rem]'
                            }`}
                        >
                            {document.title}
                        </p>
                    </div>
                    {template.withPhoto ? (
                        <PhotoBadge
                            document={document}
                            accent="#ffffff33"
                            sizeClass={
                                density === 'builder' ? 'h-14 w-14 text-sm' : 'h-8 w-8 text-[0.5rem]'
                            }
                        />
                    ) : null}
                </div>
            ) : (
                <div
                    className={`border-b border-slate-100 ${
                        density === 'builder' ? 'px-5 pt-5 pb-3' : 'px-2.5 pt-2.5 pb-1.5'
                    }`}
                >
                    <div className="flex items-start justify-between gap-2">
                        <div className="min-w-0">
                            <p
                                className={`truncate font-bold ${
                                    density === 'builder'
                                        ? 'text-[1.4rem] leading-none'
                                        : 'text-[0.78rem] leading-none'
                                }`}
                                style={{ color: accent }}
                            >
                                {document.name}
                            </p>
                            <p
                                className={`mt-0.5 text-slate-500 ${
                                    density === 'builder'
                                        ? 'text-[0.85rem]'
                                        : 'text-[0.4rem]'
                                }`}
                            >
                                {document.title}
                            </p>
                            <p
                                className={`mt-1 text-slate-400 ${
                                    density === 'builder'
                                        ? 'text-[0.75rem]'
                                        : 'text-[0.34rem]'
                                }`}
                            >
                                {contact}
                            </p>
                        </div>
                        {template.withPhoto ? (
                            <PhotoBadge
                                document={document}
                                accent={accent}
                                sizeClass={
                                    density === 'builder'
                                        ? 'h-14 w-14 text-sm'
                                        : 'h-8 w-8 text-[0.5rem]'
                                }
                            />
                        ) : null}
                    </div>
                </div>
            )}

            <div
                className={`space-y-2 ${
                    density === 'builder' ? 'space-y-4 p-5' : 'p-2.5'
                }`}
            >
                {isBand ? (
                    <p className={`${bodyClass} text-slate-400`}>{contact}</p>
                ) : null}
                <SectionLabel accent={accent} ruled={ruled} density={density}>
                    Professional Summary
                </SectionLabel>
                <p className={`${bodyClass} text-slate-600`}>{document.summary}</p>
                <SectionLabel accent={accent} ruled={ruled} density={density}>
                    Work History
                </SectionLabel>
                {document.experience.map((role) => (
                    <div key={`${role.title}-${role.company}`} className="mb-1">
                        <div className="mb-0.5 flex items-baseline justify-between gap-1">
                            <p className={roleTitleClass}>{role.title}</p>
                            <p
                                className={
                                    density === 'builder'
                                        ? 'text-[0.72rem] text-slate-400'
                                        : 'text-[0.32rem] text-slate-400'
                                }
                            >
                                {role.dates}
                            </p>
                        </div>
                        <p
                            className={
                                density === 'builder'
                                    ? 'mb-1 text-[0.75rem] text-slate-500'
                                    : 'mb-0.5 text-[0.34rem] text-slate-500'
                            }
                        >
                            {role.company}
                        </p>
                        {density === 'builder' && role.description ? (
                            <p className="text-[0.75rem] text-slate-600">
                                {role.description}
                            </p>
                        ) : null}
                    </div>
                ))}
                <SectionLabel accent={accent} ruled={ruled} density={density}>
                    Skills
                </SectionLabel>
                <div className="flex flex-wrap gap-1">
                    {document.skills.map((skill) => (
                        <span
                            key={skill}
                            className={`rounded font-semibold text-white ${
                                density === 'builder'
                                    ? 'px-2 py-1 text-[0.72rem]'
                                    : 'px-1 py-0.5 text-[0.34rem]'
                            }`}
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
