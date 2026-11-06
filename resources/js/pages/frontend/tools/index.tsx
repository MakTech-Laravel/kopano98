import { Head } from '@inertiajs/react';
import { AnimatePresence, motion } from 'framer-motion';
import { useState } from 'react';
import { toast } from 'sonner';

import { PageBand } from '@/components/launchpad/page-band';
import { Reveal } from '@/components/launchpad/reveal';
import { SectionHeading } from '@/components/launchpad/section-heading';
import {
    postToolJson,
    ToolShell,
} from '@/components/launchpad/tools/tool-shell';
import LaunchpadLayout from '@/layouts/launchpad-layout';

const tabs = [
    { id: 'ats', label: 'ATS Checker' },
    { id: 'cv', label: 'CV Deep Scan' },
    { id: 'linkedin', label: 'LinkedIn' },
    { id: 'letter', label: 'Cover Letter' },
    { id: 'assistant', label: 'AI Assistant' },
] as const;

type TabId = (typeof tabs)[number]['id'];

export default function ToolsIndex() {
    const [active, setActive] = useState<TabId>('ats');
    const [headline, setHeadline] = useState('');
    const [about, setAbout] = useState('');
    const [jobDescription, setJobDescription] = useState('');
    const [assistantMessage, setAssistantMessage] = useState('');
    const [assistantReply, setAssistantReply] = useState<string | null>(null);
    const [assistantBusy, setAssistantBusy] = useState(false);

    return (
        <LaunchpadLayout>
            <Head title="Free Tools | Launchpad Careers" />

            <PageBand className="py-10 text-center sm:py-12">
                <h1 className="font-lp-display text-[clamp(1.85rem,5vw,2.85rem)] text-white">
                    Free career tools
                </h1>
                <p className="mx-auto mt-3 max-w-lg text-sm text-pretty text-white/70">
                    Run an ATS check, deep CV scan, LinkedIn review, cover letter
                    draft, or ask the assistant — results come from the live
                    analysis API.
                </p>
            </PageBand>

            <section className="py-8 sm:py-10">
                <div className="container">
                    <div className="mx-auto max-w-4xl">
                        <Reveal>
                            <SectionHeading
                                label="Toolkit"
                                title="Pick a tool and upload or paste your content."
                            />
                        </Reveal>

                        <Reveal delay={0.06}>
                            <div className="-mx-1 mb-5 flex overflow-x-auto rounded-md border border-[var(--lp-border)] px-0 sm:mx-0">
                                {tabs.map((tab) => (
                                    <button
                                        key={tab.id}
                                        type="button"
                                        onClick={() => setActive(tab.id)}
                                        className={`flex-none border-r border-[var(--lp-border)] px-3 py-2.5 text-[0.72rem] font-semibold whitespace-nowrap last:border-r-0 sm:px-4 sm:text-[0.78rem] ${
                                            active === tab.id
                                                ? 'bg-lp-navy text-white'
                                                : 'bg-[var(--lp-off)] text-[var(--lp-text-mid)]'
                                        }`}
                                    >
                                        {tab.label}
                                    </button>
                                ))}
                            </div>
                        </Reveal>

                        <AnimatePresence mode="wait">
                            <motion.div
                                key={active}
                                initial={{ opacity: 0, y: 12 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -8 }}
                                transition={{
                                    duration: 0.28,
                                    ease: [0.22, 1, 0.36, 1],
                                }}
                            >
                                {active === 'ats' || active === 'cv' ? (
                                    <ToolShell
                                        title={
                                            active === 'ats'
                                                ? 'ATS CV Checker'
                                                : 'CV Deep Scan'
                                        }
                                        description={
                                            active === 'ats'
                                                ? 'Upload a CV to get a match score against common ATS rules.'
                                                : 'Surface weak verbs, missing metrics, and structure issues.'
                                        }
                                        actionLabel={
                                            active === 'ats'
                                                ? 'Check ATS score'
                                                : 'Start deep scan'
                                        }
                                        onAnalyze={async ({ rawText, fileName }) => {
                                            const payload = await postToolJson<{
                                                score: number;
                                                summary: string;
                                                suggestions: string[];
                                                issues: {
                                                    label: string;
                                                    severity: string;
                                                }[];
                                            }>('/tools/cv-analyze', {
                                                raw_text: rawText || fileName,
                                                summary: rawText.slice(0, 500),
                                                skills: [],
                                                experience: [],
                                            });

                                            return (
                                                <div>
                                                    <p className="text-sm font-bold text-emerald-800">
                                                        ATS match: {payload.score}
                                                        /100
                                                    </p>
                                                    <p className="mt-1 text-xs text-emerald-700">
                                                        {payload.summary}
                                                    </p>
                                                    <ul className="mt-2 list-disc space-y-1 pl-4 text-xs text-emerald-700">
                                                        {payload.suggestions.map(
                                                            (item) => (
                                                                <li key={item}>
                                                                    {item}
                                                                </li>
                                                            ),
                                                        )}
                                                    </ul>
                                                </div>
                                            );
                                        }}
                                    />
                                ) : null}

                                {active === 'linkedin' ? (
                                    <div className="rounded-lg border border-[var(--lp-border)] bg-white p-5">
                                        <h3 className="text-lp-navy mb-1 text-base font-bold">
                                            LinkedIn profile scan
                                        </h3>
                                        <p className="text-lp-mid mb-4 text-sm">
                                            Paste your headline and About section
                                            for clarity and completeness scores.
                                        </p>
                                        <label className="mb-3 block text-sm">
                                            <span className="text-lp-navy mb-1 block font-semibold">
                                                Headline
                                            </span>
                                            <input
                                                className="w-full rounded border border-[var(--lp-border)] px-3 py-2 text-sm"
                                                value={headline}
                                                onChange={(event) =>
                                                    setHeadline(event.target.value)
                                                }
                                            />
                                        </label>
                                        <label className="mb-4 block text-sm">
                                            <span className="text-lp-navy mb-1 block font-semibold">
                                                About
                                            </span>
                                            <textarea
                                                rows={5}
                                                className="w-full rounded border border-[var(--lp-border)] px-3 py-2 text-sm"
                                                value={about}
                                                onChange={(event) =>
                                                    setAbout(event.target.value)
                                                }
                                            />
                                        </label>
                                        <LinkedInAnalyzeButton
                                            headline={headline}
                                            about={about}
                                        />
                                    </div>
                                ) : null}

                                {active === 'letter' ? (
                                    <div className="rounded-lg border border-[var(--lp-border)] bg-white p-5">
                                        <h3 className="text-lp-navy mb-1 text-base font-bold">
                                            Cover letter generator
                                        </h3>
                                        <p className="text-lp-mid mb-4 text-sm">
                                            Paste a job description to generate a
                                            tailored draft.
                                        </p>
                                        <textarea
                                            rows={7}
                                            className="mb-4 w-full rounded border border-[var(--lp-border)] px-3 py-2 text-sm"
                                            placeholder="Paste the job description…"
                                            value={jobDescription}
                                            onChange={(event) =>
                                                setJobDescription(event.target.value)
                                            }
                                        />
                                        <CoverLetterButton
                                            jobDescription={jobDescription}
                                        />
                                    </div>
                                ) : null}

                                {active === 'assistant' ? (
                                    <div className="rounded-lg border border-[var(--lp-border)] bg-white p-4 sm:p-5">
                                        <h3 className="text-lp-navy mb-1 text-base font-bold">
                                            AI CV Assistant
                                        </h3>
                                        <p className="text-lp-mid mb-4 text-sm">
                                            Ask for ATS, LinkedIn, or cover-letter
                                            guidance.
                                        </p>
                                        {assistantReply ? (
                                            <div className="mb-3 space-y-2 rounded-md bg-[var(--lp-off)] p-3 text-sm">
                                                <p className="text-lp-navy font-semibold">
                                                    Assistant
                                                </p>
                                                <p className="text-lp-mid">
                                                    {assistantReply}
                                                </p>
                                            </div>
                                        ) : null}
                                        <div className="flex flex-col gap-2 sm:flex-row">
                                            <input
                                                className="min-w-0 flex-1 rounded-md border border-[var(--lp-border)] px-3 py-2 text-sm"
                                                placeholder="Ask a career question…"
                                                value={assistantMessage}
                                                onChange={(event) =>
                                                    setAssistantMessage(
                                                        event.target.value,
                                                    )
                                                }
                                            />
                                            <button
                                                type="button"
                                                className="btn-lp-gold px-4 py-2 text-sm sm:shrink-0"
                                                disabled={
                                                    assistantBusy ||
                                                    !assistantMessage.trim()
                                                }
                                                onClick={() => {
                                                    void (async () => {
                                                        setAssistantBusy(true);

                                                        try {
                                                            const payload =
                                                                await postToolJson<{
                                                                    reply: string;
                                                                }>(
                                                                    '/tools/assistant',
                                                                    {
                                                                        message:
                                                                            assistantMessage,
                                                                    },
                                                                );
                                                            setAssistantReply(
                                                                payload.reply,
                                                            );
                                                        } catch {
                                                            toast.error(
                                                                'Assistant unavailable',
                                                            );
                                                        } finally {
                                                            setAssistantBusy(false);
                                                        }
                                                    })();
                                                }}
                                            >
                                                {assistantBusy ? '…' : 'Send'}
                                            </button>
                                        </div>
                                    </div>
                                ) : null}
                            </motion.div>
                        </AnimatePresence>
                    </div>
                </div>
            </section>
        </LaunchpadLayout>
    );
}

function LinkedInAnalyzeButton({
    headline,
    about,
}: {
    headline: string;
    about: string;
}) {
    const [result, setResult] = useState<string | null>(null);
    const [busy, setBusy] = useState(false);

    return (
        <>
            <button
                type="button"
                className="btn-lp-navy px-5 py-2.5 text-sm"
                disabled={busy || (!headline && !about)}
                onClick={() => {
                    void (async () => {
                        setBusy(true);

                        try {
                            const payload = await postToolJson<{
                                headline_score: number;
                                about_score: number;
                                suggestions: string[];
                            }>('/tools/linkedin-analyze', { headline, about });

                            setResult(
                                `Headline ${payload.headline_score}% · About ${payload.about_score}%. ${payload.suggestions.join(' ')}`,
                            );
                            toast.success('LinkedIn scan complete');
                        } catch {
                            toast.error('LinkedIn scan failed');
                        } finally {
                            setBusy(false);
                        }
                    })();
                }}
            >
                {busy ? 'Analysing…' : 'Analyse profile'}
            </button>
            {result ? (
                <p className="mt-4 rounded-lg border border-emerald-200 bg-emerald-50 p-4 text-sm text-emerald-800">
                    {result}
                </p>
            ) : null}
        </>
    );
}

function CoverLetterButton({ jobDescription }: { jobDescription: string }) {
    const [draft, setDraft] = useState<string | null>(null);
    const [busy, setBusy] = useState(false);

    return (
        <>
            <button
                type="button"
                className="btn-lp-navy px-5 py-2.5 text-sm"
                disabled={busy || jobDescription.trim().length < 20}
                onClick={() => {
                    void (async () => {
                        setBusy(true);

                        try {
                            const payload = await postToolJson<{ draft: string }>(
                                '/tools/cover-letter',
                                {
                                    job_description: jobDescription,
                                    candidate_name: 'Applicant',
                                    role_title: 'the role',
                                },
                            );
                            setDraft(payload.draft);
                            toast.success('Draft ready');
                        } catch {
                            toast.error('Could not generate draft');
                        } finally {
                            setBusy(false);
                        }
                    })();
                }}
            >
                {busy ? 'Generating…' : 'Generate draft'}
            </button>
            {draft ? (
                <pre className="mt-4 whitespace-pre-wrap rounded-lg border border-emerald-200 bg-emerald-50 p-4 text-sm leading-relaxed text-emerald-900">
                    {draft}
                </pre>
            ) : null}
        </>
    );
}
