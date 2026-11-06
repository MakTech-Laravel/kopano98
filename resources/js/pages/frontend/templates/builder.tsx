import { Head, Link, usePage } from '@inertiajs/react';
import { useMemo, useState, type ChangeEvent } from 'react';
import { toast } from 'sonner';

import { Reveal } from '@/components/launchpad/reveal';
import { TemplatePreview } from '@/components/launchpad/templates/template-preview';
import {
    defaultCvDocument,
    type CvDocument,
    type CvEducation,
    type CvExperience,
} from '@/data/launchpad/cv-document';
import {
    launchpadTemplates,
    type LaunchpadTemplate,
} from '@/data/launchpad/templates';
import LaunchpadLayout from '@/layouts/launchpad-layout';
import { exportCvPdf, exportCvWord } from '@/lib/launchpad/cv-export';

type BuilderPageProps = {
    templateId?: string;
    accent?: string;
};

function resolveTemplate(templateId?: string): LaunchpadTemplate {
    return (
        launchpadTemplates.find((template) => template.id === templateId) ??
        launchpadTemplates[0]
    );
}

export default function CvBuilder() {
    const { props } = usePage<BuilderPageProps>();
    const search =
        typeof window !== 'undefined'
            ? new URLSearchParams(window.location.search)
            : null;
    const initialTemplateId =
        props.templateId ?? search?.get('template') ?? undefined;
    const initialAccent =
        props.accent ?? search?.get('accent') ?? undefined;

    const [templateId, setTemplateId] = useState(
        resolveTemplate(initialTemplateId).id,
    );
    const template = useMemo(
        () => resolveTemplate(templateId),
        [templateId],
    );
    const [accent, setAccent] = useState(
        initialAccent && /^#?[0-9a-fA-F]{6}$/.test(initialAccent)
            ? initialAccent.startsWith('#')
                ? initialAccent
                : `#${initialAccent}`
            : template.colors[0],
    );
    type AiIssue = {
        id: string;
        label: string;
        severity: string;
        suggestion: string;
        field?: string;
    };

    type AiPatch = {
        id: string;
        field: string;
        action: string;
        value: string;
    };

    const [cv, setCv] = useState<CvDocument>(defaultCvDocument);
    const [aiNotes, setAiNotes] = useState<string[]>([]);
    const [aiIssues, setAiIssues] = useState<AiIssue[]>([]);
    const [aiPatches, setAiPatches] = useState<AiPatch[]>([]);
    const [appliedIds, setAppliedIds] = useState<string[]>([]);
    const [analyzing, setAnalyzing] = useState(false);

    const csrfToken =
        (
            window.document.querySelector(
                'meta[name="csrf-token"]',
            ) as HTMLMetaElement | null
        )?.content ?? '';

    const updateField = <K extends keyof CvDocument>(
        key: K,
        value: CvDocument[K],
    ) => {
        setCv((current) => ({ ...current, [key]: value }));
    };

    const updateExperience = (
        index: number,
        key: keyof CvExperience,
        value: string,
    ) => {
        setCv((current) => ({
            ...current,
            experience: current.experience.map((role, roleIndex) =>
                roleIndex === index ? { ...role, [key]: value } : role,
            ),
        }));
    };

    const updateEducation = (
        index: number,
        key: keyof CvEducation,
        value: string,
    ) => {
        setCv((current) => ({
            ...current,
            education: current.education.map((item, itemIndex) =>
                itemIndex === index ? { ...item, [key]: value } : item,
            ),
        }));
    };

    const onPhotoChange = (event: ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];

        if (!file) {
            return;
        }

        if (!file.type.startsWith('image/')) {
            toast.error('Please choose an image file');

            return;
        }

        const reader = new FileReader();
        reader.onload = () => {
            updateField('photoDataUrl', String(reader.result));
        };
        reader.readAsDataURL(file);
    };

    const analyzeCv = async () => {
        setAnalyzing(true);

        try {
            const response = await fetch('/tools/cv-analyze', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Accept: 'application/json',
                    'X-Requested-With': 'XMLHttpRequest',
                    'X-CSRF-TOKEN': csrfToken,
                },
                body: JSON.stringify({
                    name: cv.name,
                    title: cv.title,
                    summary: cv.summary,
                    experience: cv.experience,
                    education: cv.education,
                    skills: cv.skills,
                }),
            });

            if (!response.ok) {
                throw new Error('Analysis failed');
            }

            const payload = (await response.json()) as {
                suggestions?: string[];
                issues?: AiIssue[];
                patches?: AiPatch[];
            };
            setAiNotes(payload.suggestions ?? []);
            setAiIssues(payload.issues ?? []);
            setAiPatches(payload.patches ?? []);
            setAppliedIds([]);
            toast.success('CV analysis ready');
        } catch {
            const fallbackIssues: AiIssue[] = [
                cv.summary.length < 80
                    ? {
                          id: 'thin-summary',
                          label: 'Thin summary',
                          severity: 'medium',
                          suggestion:
                              'Expand your professional summary with quantified outcomes.',
                          field: 'summary',
                      }
                    : null,
                cv.experience.some((role) => role.description.length < 40)
                    ? {
                          id: 'weak-experience',
                          label: 'Experience lacks metrics',
                          severity: 'high',
                          suggestion:
                              'Add measurable results to experience bullet points.',
                          field: 'experience',
                      }
                    : null,
                cv.skills.length < 5
                    ? {
                          id: 'limited-skills',
                          label: 'Limited skills',
                          severity: 'medium',
                          suggestion:
                              'Add 2–3 more role-relevant skills for ATS keyword coverage.',
                          field: 'skills',
                      }
                    : null,
            ].filter(Boolean) as AiIssue[];

            setAiIssues(fallbackIssues);
            setAiNotes(fallbackIssues.map((issue) => issue.suggestion));
            setAiPatches(
                fallbackIssues.map((issue) => ({
                    id: issue.id,
                    field: issue.field ?? 'summary',
                    action:
                        issue.field === 'skills'
                            ? 'merge'
                            : issue.field === 'experience'
                              ? 'append_metric'
                              : 'append',
                    value:
                        issue.field === 'skills'
                            ? 'Stakeholder communication|ATS keyword alignment'
                            : ' Delivered measurable results with clear ownership of outcomes.',
                })),
            );
            setAppliedIds([]);
            toast.message('Offline analysis complete');
        } finally {
            setAnalyzing(false);
        }
    };

    const applyPatch = (patchId: string) => {
        const patch = aiPatches.find((item) => item.id === patchId);

        if (!patch || appliedIds.includes(patchId)) {
            return;
        }

        setCv((current) => {
            if (patch.field === 'summary' && patch.action === 'append') {
                return {
                    ...current,
                    summary: `${current.summary.trim()}${patch.value}`,
                };
            }

            if (patch.field === 'skills' && patch.action === 'merge') {
                const extras = patch.value
                    .split('|')
                    .map((part) => part.trim())
                    .filter(Boolean);

                return {
                    ...current,
                    skills: [...new Set([...current.skills, ...extras])],
                };
            }

            if (patch.field === 'experience' && patch.action === 'append_metric') {
                return {
                    ...current,
                    experience: current.experience.map((role) =>
                        role.description.length < 40
                            ? {
                                  ...role,
                                  description: `${role.description.trim()}${patch.value}`,
                              }
                            : role,
                    ),
                };
            }

            return current;
        });

        setAppliedIds((current) => [...current, patchId]);
        toast.success('Suggestion applied to your CV');
    };

    const applySuggestionTone = () => {
        const pending = aiPatches.filter(
            (patch) => !appliedIds.includes(patch.id),
        );

        pending.forEach((patch) => applyPatch(patch.id));
    };

    return (
        <LaunchpadLayout>
            <Head title={`Build CV — ${template.name} | Launchpad Careers`} />

            <section className="border-b border-[var(--lp-border)] bg-[var(--lp-off)] py-6">
                <div className="container flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
                    <div>
                        <p className="mb-1 text-[0.7rem] font-medium tracking-[0.08em] text-[var(--lp-gold-on-light)] uppercase">
                            CV builder
                        </p>
                        <h1 className="font-lp-display text-lp-navy text-[clamp(1.6rem,4vw,2.2rem)]">
                            Build with {template.name}
                        </h1>
                        <p className="text-lp-mid mt-1 max-w-xl text-sm">
                            Fill in your details, watch the live preview update,
                            then export PDF or Word.
                        </p>
                    </div>
                    <Link
                        href="/templates"
                        className="text-sm font-semibold text-[var(--lp-navy)] underline-offset-2 hover:underline"
                    >
                        ← Back to templates
                    </Link>
                </div>
            </section>

            <section className="py-8 sm:py-10">
                <div className="container grid gap-6 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)]">
                    <Reveal>
                        <div className="space-y-5 rounded-[10px] border border-[var(--lp-border)] bg-white p-5 shadow-sm">
                            <div className="grid gap-3 sm:grid-cols-2">
                                <label className="block text-sm">
                                    <span className="text-lp-navy mb-1 block font-semibold">
                                        Template
                                    </span>
                                    <select
                                        className="w-full rounded border border-[var(--lp-border)] px-3 py-2 text-sm"
                                        value={template.id}
                                        onChange={(event) => {
                                            const next = resolveTemplate(
                                                event.target.value,
                                            );
                                            setTemplateId(next.id);
                                            setAccent(next.colors[0]);
                                        }}
                                    >
                                        {launchpadTemplates.map((item) => (
                                            <option key={item.id} value={item.id}>
                                                {item.name}
                                                {item.withPhoto
                                                    ? ' · photo'
                                                    : ' · no photo'}
                                            </option>
                                        ))}
                                    </select>
                                </label>
                                <label className="block text-sm">
                                    <span className="text-lp-navy mb-1 block font-semibold">
                                        Accent
                                    </span>
                                    <div className="flex flex-wrap gap-2 pt-1">
                                        {template.colors.map((swatch) => (
                                            <button
                                                key={swatch}
                                                type="button"
                                                aria-label={`Accent ${swatch}`}
                                                className="h-7 w-7 rounded-full"
                                                style={{
                                                    backgroundColor: swatch,
                                                    boxShadow:
                                                        accent === swatch
                                                            ? `0 0 0 2px #fff, 0 0 0 3px ${swatch}`
                                                            : '0 0 0 1px rgba(13,27,42,0.12)',
                                                }}
                                                onClick={() => setAccent(swatch)}
                                            />
                                        ))}
                                    </div>
                                </label>
                            </div>

                            <div className="grid gap-3 sm:grid-cols-2">
                                {(
                                    [
                                        ['name', 'Full name'],
                                        ['title', 'Professional title'],
                                        ['email', 'Email'],
                                        ['phone', 'Phone'],
                                        ['location', 'Location'],
                                    ] as const
                                ).map(([key, label]) => (
                                    <label key={key} className="block text-sm">
                                        <span className="text-lp-navy mb-1 block font-semibold">
                                            {label}
                                        </span>
                                        <input
                                            className="w-full rounded border border-[var(--lp-border)] px-3 py-2 text-sm"
                                            value={cv[key]}
                                            onChange={(event) =>
                                                updateField(key, event.target.value)
                                            }
                                        />
                                    </label>
                                ))}
                            </div>

                            {template.withPhoto ? (
                                <label className="block text-sm">
                                    <span className="text-lp-navy mb-1 block font-semibold">
                                        Profile photo
                                    </span>
                                    <input
                                        type="file"
                                        accept="image/*"
                                        onChange={onPhotoChange}
                                        className="block w-full text-sm"
                                    />
                                </label>
                            ) : null}

                            <label className="block text-sm">
                                <span className="text-lp-navy mb-1 block font-semibold">
                                    Professional summary
                                </span>
                                <textarea
                                    rows={4}
                                    className="w-full rounded border border-[var(--lp-border)] px-3 py-2 text-sm"
                                    value={cv.summary}
                                    onChange={(event) =>
                                        updateField('summary', event.target.value)
                                    }
                                />
                            </label>

                            <div>
                                <p className="text-lp-navy mb-2 text-sm font-semibold">
                                    Experience
                                </p>
                                <div className="space-y-3">
                                    {cv.experience.map((role, index) => (
                                        <div
                                            key={index}
                                            className="grid gap-2 rounded-lg border border-[var(--lp-border)] p-3 sm:grid-cols-2"
                                        >
                                            {(
                                                [
                                                    ['title', 'Title'],
                                                    ['company', 'Company'],
                                                    ['dates', 'Dates'],
                                                ] as const
                                            ).map(([key, label]) => (
                                                <label
                                                    key={key}
                                                    className="block text-sm"
                                                >
                                                    <span className="text-lp-mid mb-1 block text-xs">
                                                        {label}
                                                    </span>
                                                    <input
                                                        className="w-full rounded border border-[var(--lp-border)] px-2 py-1.5 text-sm"
                                                        value={role[key]}
                                                        onChange={(event) =>
                                                            updateExperience(
                                                                index,
                                                                key,
                                                                event.target.value,
                                                            )
                                                        }
                                                    />
                                                </label>
                                            ))}
                                            <label className="block text-sm sm:col-span-2">
                                                <span className="text-lp-mid mb-1 block text-xs">
                                                    Description
                                                </span>
                                                <textarea
                                                    rows={2}
                                                    className="w-full rounded border border-[var(--lp-border)] px-2 py-1.5 text-sm"
                                                    value={role.description}
                                                    onChange={(event) =>
                                                        updateExperience(
                                                            index,
                                                            'description',
                                                            event.target.value,
                                                        )
                                                    }
                                                />
                                            </label>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            <div>
                                <p className="text-lp-navy mb-2 text-sm font-semibold">
                                    Education
                                </p>
                                {cv.education.map((item, index) => (
                                    <div
                                        key={index}
                                        className="mb-2 grid gap-2 rounded-lg border border-[var(--lp-border)] p-3 sm:grid-cols-3"
                                    >
                                        {(
                                            [
                                                ['qualification', 'Qualification'],
                                                ['school', 'School'],
                                                ['dates', 'Dates'],
                                            ] as const
                                        ).map(([key, label]) => (
                                            <label
                                                key={key}
                                                className="block text-sm"
                                            >
                                                <span className="text-lp-mid mb-1 block text-xs">
                                                    {label}
                                                </span>
                                                <input
                                                    className="w-full rounded border border-[var(--lp-border)] px-2 py-1.5 text-sm"
                                                    value={item[key]}
                                                    onChange={(event) =>
                                                        updateEducation(
                                                            index,
                                                            key,
                                                            event.target.value,
                                                        )
                                                    }
                                                />
                                            </label>
                                        ))}
                                    </div>
                                ))}
                            </div>

                            <label className="block text-sm">
                                <span className="text-lp-navy mb-1 block font-semibold">
                                    Skills (comma separated)
                                </span>
                                <input
                                    className="w-full rounded border border-[var(--lp-border)] px-3 py-2 text-sm"
                                    value={cv.skills.join(', ')}
                                    onChange={(event) =>
                                        updateField(
                                            'skills',
                                            event.target.value
                                                .split(',')
                                                .map((part) => part.trim())
                                                .filter(Boolean),
                                        )
                                    }
                                />
                            </label>

                            <div className="flex flex-wrap gap-2 border-t border-[var(--lp-border)] pt-4">
                                <button
                                    type="button"
                                    className="btn-lp-navy px-4 py-2 text-sm"
                                    onClick={() => {
                                        exportCvPdf(cv, template, accent);
                                        toast.success('PDF downloaded');
                                    }}
                                >
                                    Download PDF
                                </button>
                                <button
                                    type="button"
                                    className="rounded-[5px] border-[1.5px] border-[var(--lp-navy)] px-4 py-2 text-sm font-semibold text-[var(--lp-navy)]"
                                    onClick={() => {
                                        exportCvWord(cv, template, accent);
                                        toast.success('Word document downloaded');
                                    }}
                                >
                                    Download Word
                                </button>
                                <button
                                    type="button"
                                    className="rounded-[5px] border border-[var(--lp-border)] px-4 py-2 text-sm font-semibold"
                                    disabled={analyzing}
                                    onClick={() => void analyzeCv()}
                                >
                                    {analyzing ? 'Analyzing…' : 'AI analyze CV'}
                                </button>
                                {aiNotes.length > 0 ? (
                                    <button
                                        type="button"
                                        className="rounded-[5px] border border-[var(--lp-gold)] px-4 py-2 text-sm font-semibold text-[var(--lp-gold-on-light)]"
                                        onClick={applySuggestionTone}
                                    >
                                        Apply suggestions
                                    </button>
                                ) : null}
                            </div>

                            {aiIssues.length > 0 || aiNotes.length > 0 ? (
                                <div className="rounded-lg border border-[var(--lp-border)] bg-[var(--lp-off)] p-4">
                                    <p className="text-lp-navy mb-2 text-sm font-semibold">
                                        Analysis flags
                                    </p>
                                    <div className="space-y-3">
                                        {(aiIssues.length > 0
                                            ? aiIssues
                                            : aiNotes.map((note, index) => ({
                                                  id: `note-${index}`,
                                                  label: 'Suggestion',
                                                  severity: 'medium',
                                                  suggestion: note,
                                              }))
                                        ).map((issue) => (
                                            <div
                                                key={issue.id}
                                                className="rounded border border-[var(--lp-border)] bg-white p-3"
                                            >
                                                <div className="mb-1 flex items-center justify-between gap-2">
                                                    <p className="text-lp-navy text-sm font-semibold">
                                                        {issue.label}
                                                    </p>
                                                    <span className="text-lp-light text-[0.65rem] uppercase">
                                                        {issue.severity}
                                                    </span>
                                                </div>
                                                <p className="text-lp-mid text-sm">
                                                    {issue.suggestion}
                                                </p>
                                                {aiPatches.some(
                                                    (patch) => patch.id === issue.id,
                                                ) ? (
                                                    <button
                                                        type="button"
                                                        className="mt-2 text-sm font-semibold text-[var(--lp-gold-on-light)] disabled:opacity-40"
                                                        disabled={appliedIds.includes(
                                                            issue.id,
                                                        )}
                                                        onClick={() =>
                                                            applyPatch(issue.id)
                                                        }
                                                    >
                                                        {appliedIds.includes(issue.id)
                                                            ? 'Applied'
                                                            : 'Apply this fix'}
                                                    </button>
                                                ) : null}
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            ) : null}
                        </div>
                    </Reveal>

                    <Reveal delay={0.06}>
                        <div className="sticky top-24">
                            <TemplatePreview
                                template={template}
                                accent={accent}
                                document={cv}
                                density="builder"
                            />
                        </div>
                    </Reveal>
                </div>
            </section>
        </LaunchpadLayout>
    );
}
