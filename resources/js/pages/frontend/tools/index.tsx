import { Head } from '@inertiajs/react';
import { AnimatePresence, motion } from 'framer-motion';
import { useState } from 'react';

import { PageBand } from '@/components/launchpad/page-band';
import { Reveal } from '@/components/launchpad/reveal';
import { SectionHeading } from '@/components/launchpad/section-heading';
import { ToolShell } from '@/components/launchpad/tools/tool-shell';
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

    return (
        <LaunchpadLayout>
            <Head title="Free Tools | Launchpad Careers" />

            <PageBand className="py-10 text-center sm:py-12">
                <h1 className="font-lp-display text-[clamp(1.85rem,5vw,2.85rem)] text-white">
                    Free career tools
                </h1>
                <p className="mx-auto mt-3 max-w-lg text-sm text-pretty text-white/70">
                    UI shells for ATS checks, CV scan, LinkedIn, cover letters,
                    and assistant chat — processing connects in Milestone 2.
                </p>
            </PageBand>

            <section className="py-8 sm:py-10">
                <div className="container">
                    <div className="mx-auto max-w-4xl">
                        <Reveal>
                            <SectionHeading
                                label="Toolkit"
                                title="Pick a tool and upload a sample file."
                            />
                        </Reveal>

                        <Reveal delay={0.06}>
                            <div className="-mx-1 mb-5 flex overflow-x-auto rounded-md border border-[var(--lp-border)] px-0 sm:mx-0">
                                {tabs.map((tab) => (
                                    <button
                                        key={tab.id}
                                        type="button"
                                        onClick={() => setActive(tab.id)}
                                        className={`flex-none border-r border-[var(--lp-border)] px-3 py-2.5 text-[0.72rem] font-semibold whitespace-nowrap last:border-r-0 sm:px-4 sm:text-[0.78rem] ${active === tab.id
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
                                {active === 'ats' ? (
                                    <ToolShell
                                        title="ATS CV Checker"
                                        description="See a demo match score for your CV against common ATS rules."
                                        actionLabel="Check ATS score"
                                    />
                                ) : null}
                                {active === 'cv' ? (
                                    <ToolShell
                                        title="CV Deep Scan"
                                        description="Highlight weak verbs, missing metrics, and structure issues — demo mode."
                                        actionLabel="Start deep scan"
                                        result={
                                            <div>
                                                <p className="text-sm font-bold text-emerald-800">
                                                    12 suggestions found (sample)
                                                </p>
                                                <ul className="mt-2 list-disc space-y-1 pl-4 text-xs text-emerald-700">
                                                    <li>
                                                        Replace “responsible for”
                                                        with action verbs
                                                    </li>
                                                    <li>
                                                        Add quantifiable outcomes to
                                                        3 bullets
                                                    </li>
                                                    <li>
                                                        Prefer single-column ATS-safe
                                                        layout
                                                    </li>
                                                </ul>
                                            </div>
                                        }
                                    />
                                ) : null}
                                {active === 'linkedin' ? (
                                    <ToolShell
                                        title="LinkedIn profile demo"
                                        description="Upload an export or paste a profile URL later — UI preview for headline and About."
                                        actionLabel="Analyse profile"
                                        result={
                                            <p className="text-sm text-emerald-800">
                                                Sample: headline clarity 62% · About
                                                completeness 54%. Full rewrite
                                                available under Services.
                                            </p>
                                        }
                                    />
                                ) : null}
                                {active === 'letter' ? (
                                    <ToolShell
                                        title="Cover letter generator"
                                        description="Paste a job description in Milestone 2. For now, upload any doc to preview the flow."
                                        actionLabel="Generate draft"
                                        result={
                                            <p className="text-sm leading-relaxed text-emerald-800">
                                                “Dear Hiring Manager — thank you for
                                                considering my application for the
                                                role…” (placeholder draft)
                                            </p>
                                        }
                                    />
                                ) : null}
                                {active === 'assistant' ? (
                                    <div className="rounded-lg border border-[var(--lp-border)] bg-white p-4 sm:p-5">
                                        <h3 className="text-lp-navy mb-1 text-base font-bold">
                                            AI CV Assistant
                                        </h3>
                                        <p className="text-lp-mid mb-4 text-sm">
                                            Chat UI shell — responses are mocked until
                                            the Worker API is wired.
                                        </p>
                                        <div className="mb-3 space-y-2 rounded-md bg-[var(--lp-off)] p-3 text-sm">
                                            <p className="text-lp-navy font-semibold">
                                                You
                                            </p>
                                            <p className="text-lp-mid">
                                                How do I make my CV more ATS friendly?
                                            </p>
                                            <p className="text-lp-navy mt-3 font-semibold">
                                                Assistant
                                            </p>
                                            <p className="text-lp-mid">
                                                Use a single column, standard headings,
                                                and measurable bullets. Avoid text boxes
                                                and icons that parsers miss.
                                            </p>
                                        </div>
                                        <div className="flex flex-col gap-2 sm:flex-row">
                                            <input
                                                className="min-w-0 flex-1 rounded-md border border-[var(--lp-border)] px-3 py-2 text-sm"
                                                placeholder="Ask a career question…"
                                                disabled
                                            />
                                            <button
                                                type="button"
                                                className="btn-lp-gold px-4 py-2 text-sm opacity-60 sm:shrink-0"
                                                disabled
                                            >
                                                Send
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
