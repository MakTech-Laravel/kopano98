import { Head, Link } from '@inertiajs/react';
import { AnimatePresence, motion } from 'framer-motion';
import { Briefcase, FileText, LayoutDashboard } from 'lucide-react';
import { useState, type ReactNode } from 'react';
import { toast } from 'sonner';

import { CvScanTool } from '@/components/launchpad/tools/cv-scan-tool';
import { LinkedInScanTool } from '@/components/launchpad/tools/linkedin-scan-tool';
import LaunchpadLayout from '@/layouts/launchpad-layout';

const tools = [
    {
        id: 'cv',
        label: 'CV Deep Scan',
        icon: 'cv',
    },
    {
        id: 'linkedin',
        label: 'LinkedIn',
        icon: 'linkedin',
    },
    {
        id: 'ats',
        label: 'ATS Match',
        icon: 'ats',
    },
    {
        id: 'jobs',
        label: 'Find Jobs',
        icon: 'jobs',
    },
    {
        id: 'dashboard',
        label: 'Dashboard',
        icon: 'dashboard',
    },
] as const;

type ToolId = (typeof tools)[number]['id'];

type JobType = 'fulltime' | 'internship' | 'vacation';

export default function ToolsIndex() {
    const [active, setActive] = useState<ToolId>('linkedin');
    const [jobType, setJobType] = useState<JobType>('fulltime');

    return (
        <LaunchpadLayout>
            <Head title="Free Tools | Launchpad Careers" />

            <section className="bg-white py-10 sm:py-[2.5rem]">
                <div className="mx-auto max-w-[960px] px-6 sm:px-6">
                    <p className="mb-2 text-[0.68rem] font-bold tracking-[0.14em] text-[var(--lp-gold-on-light-sm)] uppercase">
                        Free Tools
                    </p>
                    <h1 className="font-lp-display mb-[0.6rem] text-[clamp(1.5rem,4vw,2.2rem)] leading-[1.15] font-bold text-[var(--lp-navy)]">
                        See how your CV or LinkedIn looks.
                    </h1>

                    <div className="lp-rail-wrap mt-6 mb-5 grid items-start gap-4 lg:grid-cols-[186px_minmax(0,1fr)]">
                        <aside className="sticky top-4 rounded-[10px] border border-[var(--lp-border)] bg-[var(--lp-off)] p-[0.6rem]">
                            <p className="px-[0.65rem] pt-[0.2rem] pb-[0.35rem] text-[0.62rem] font-bold tracking-[0.07em] text-[var(--lp-text-light)] uppercase">
                                Free Tools
                            </p>
                            <nav>
                                {tools.map((tool) => {
                                    const selected = active === tool.id;

                                    return (
                                        <button
                                            key={tool.id}
                                            type="button"
                                            onClick={() => setActive(tool.id)}
                                            className={`mb-0.5 flex w-full items-center gap-2 rounded-[7px] border-l-[3px] py-2 pr-2.5 pl-[calc(0.65rem-3px)] text-left text-[0.78rem] font-semibold transition ${selected
                                                ? 'border-[#C8A84B] bg-white text-[#1B3A6B]'
                                                : 'text-lp-mid border-transparent hover:bg-white/70'
                                                }`}
                                        >
                                            <RailIcon name={tool.icon} />
                                            <span>{tool.label}</span>
                                        </button>
                                    );
                                })}
                            </nav>
                        </aside>

                        <div className="min-w-0">
                            <AnimatePresence mode="wait">
                                <motion.div
                                    key={active}
                                    initial={{ opacity: 0, y: 8 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: -4 }}
                                    transition={{ duration: 0.2 }}
                                >
                                    {active === 'cv' ? (
                                        <CvScanTool mode="deep" />
                                    ) : null}

                                    {active === 'ats' ? (
                                        <CvScanTool mode="ats" />
                                    ) : null}

                                    {active === 'linkedin' ? (
                                        <LinkedInScanTool />
                                    ) : null}

                                    {active === 'jobs' ? (
                                        <ToolCard
                                            title="Find Jobs"
                                            description="Live vacancies from several job boards, in one place. Save the ones worth coming back to, and add your CV to see how well you match each one."
                                        >
                                            <div className="mb-4">
                                                <p className="text-lp-navy mb-2 block text-[0.78rem] font-bold tracking-[0.06em] uppercase">
                                                    What are you looking for?
                                                </p>
                                                <div className="flex flex-wrap gap-2">
                                                    {(
                                                        [
                                                            {
                                                                id: 'fulltime',
                                                                label: 'Full-time Role',
                                                            },
                                                            {
                                                                id: 'internship',
                                                                label: 'Internship',
                                                            },
                                                            {
                                                                id: 'vacation',
                                                                label: 'Vacation Work',
                                                            },
                                                        ] as const
                                                    ).map((option) => {
                                                        const selected =
                                                            jobType === option.id;

                                                        return (
                                                            <button
                                                                key={option.id}
                                                                type="button"
                                                                onClick={() =>
                                                                    setJobType(
                                                                        option.id,
                                                                    )
                                                                }
                                                                className={`rounded-md border-[1.5px] px-3.5 py-2 text-[0.82rem] font-semibold transition ${selected
                                                                    ? 'border-[var(--lp-navy)] bg-[var(--lp-navy)] text-white'
                                                                    : 'border-[var(--lp-border)] text-[var(--lp-text-mid)]'
                                                                    }`}
                                                            >
                                                                {option.label}
                                                            </button>
                                                        );
                                                    })}
                                                </div>
                                            </div>
                                            <button
                                                type="button"
                                                className="btn-lp-navy inline-flex w-full items-center justify-center rounded-[5px] px-6 py-3 text-[0.83rem] font-bold"
                                                onClick={() =>
                                                    toast.message(
                                                        'Job finder demo — connect live boards next',
                                                    )
                                                }
                                            >
                                                Find My Jobs →
                                            </button>
                                        </ToolCard>
                                    ) : null}

                                    {active === 'dashboard' ? (
                                        <ToolCard
                                            title="My Dashboard"
                                            description="Everything in one place: the CV the tools are using, the reports you have run, and the jobs you have saved."
                                        >
                                            <div className="rounded-[8px] border border-dashed border-[var(--lp-border)] bg-[var(--lp-off)] px-4 py-8 text-center">
                                                <p className="text-[0.9rem] font-bold text-[#1B3A6B]">
                                                    No scans saved yet
                                                </p>
                                                <p className="text-lp-mid mt-1 text-[0.8rem]">
                                                    Run a CV Deep Scan to see
                                                    your first report here.
                                                </p>
                                                <button
                                                    type="button"
                                                    className="btn-lp-navy mt-4 rounded-[5px] px-4 py-2.5 text-[0.8rem] font-bold"
                                                    onClick={() =>
                                                        setActive('cv')
                                                    }
                                                >
                                                    Open CV Deep Scan
                                                </button>
                                            </div>
                                            <p className="text-lp-mid mt-4 text-center text-[0.78rem]">
                                                Looking for paid rewrites?{' '}
                                                <Link
                                                    href="/services"
                                                    className="font-semibold text-[#1B3A6B] underline-offset-2 hover:underline"
                                                >
                                                    View services
                                                </Link>
                                            </p>
                                        </ToolCard>
                                    ) : null}
                                </motion.div>
                            </AnimatePresence>
                        </div>
                    </div>
                </div>
            </section>
        </LaunchpadLayout>
    );
}

function ToolCard({
    title,
    description,
    children,
}: {
    title: string;
    description?: string;
    children: ReactNode;
}) {
    return (
        <div className="lp-tool-card mb-4 rounded-lg border border-[var(--lp-border)] bg-white p-5 text-left">
            <h2 className="mb-1 text-[1rem] font-bold text-[var(--lp-text)]">
                {title}
            </h2>
            {description ? (
                <p className="mb-3.5 text-[0.8rem] leading-relaxed text-[var(--lp-text-mid)]">
                    {description}
                </p>
            ) : null}
            {children}
        </div>
    );
}

function RailIcon({
    name,
}: {
    name: 'cv' | 'linkedin' | 'ats' | 'jobs' | 'dashboard';
}) {
    if (name === 'linkedin') {
        return (
            <svg
                width="15"
                height="15"
                viewBox="0 0 24 24"
                fill="currentColor"
                aria-hidden="true"
                className="shrink-0"
            >
                <path d="M20.45 20.45h-3.56v-5.57c0-1.33-.02-3.04-1.85-3.04-1.85 0-2.14 1.45-2.14 2.94v5.67H9.35V9h3.41v1.56h.05c.48-.9 1.63-1.85 3.36-1.85 3.59 0 4.26 2.36 4.26 5.44v6.3zM5.34 7.43a2.06 2.06 0 1 1 0-4.13 2.06 2.06 0 0 1 0 4.13zM7.12 20.45H3.55V9h3.57v11.45zM22.22 0H1.77C.79 0 0 .77 0 1.72v20.56C0 23.23.79 24 1.77 24h20.45c.98 0 1.78-.77 1.78-1.72V1.72C24 .77 23.2 0 22.22 0z" />
            </svg>
        );
    }

    if (name === 'ats') {
        return (
            <svg
                width="15"
                height="15"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.7"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
                className="shrink-0"
            >
                <circle cx="12" cy="12" r="9" />
                <circle cx="12" cy="12" r="5" />
                <circle cx="12" cy="12" r="1.4" fill="currentColor" />
            </svg>
        );
    }

    if (name === 'cv') {
        return <FileText className="h-[15px] w-[15px] shrink-0" strokeWidth={1.7} />;
    }

    if (name === 'jobs') {
        return (
            <Briefcase className="h-[15px] w-[15px] shrink-0" strokeWidth={1.7} />
        );
    }

    return (
        <LayoutDashboard
            className="h-[15px] w-[15px] shrink-0"
            strokeWidth={1.7}
        />
    );
}
