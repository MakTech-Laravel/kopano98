import { Head, Link } from '@inertiajs/react';
import { AnimatePresence, motion } from 'framer-motion';
import {
    Briefcase,
    FileSearch,
    FileText,
    LayoutDashboard,
    UserRound,
} from 'lucide-react';
import { useState, type ReactNode } from 'react';
import { toast } from 'sonner';

import { CvScanTool } from '@/components/launchpad/tools/cv-scan-tool';
import { postToolJson } from '@/components/launchpad/tools/tool-shell';
import LaunchpadLayout from '@/layouts/launchpad-layout';

const tools = [
    {
        id: 'cv',
        label: 'CV Deep Scan',
        icon: FileText,
    },
    {
        id: 'linkedin',
        label: 'LinkedIn',
        icon: UserRound,
    },
    {
        id: 'ats',
        label: 'ATS Match',
        icon: FileSearch,
    },
    {
        id: 'jobs',
        label: 'Find Jobs',
        icon: Briefcase,
    },
    {
        id: 'dashboard',
        label: 'Dashboard',
        icon: LayoutDashboard,
    },
] as const;

type ToolId = (typeof tools)[number]['id'];

export default function ToolsIndex() {
    const [active, setActive] = useState<ToolId>('cv');
    const [headline, setHeadline] = useState('');
    const [about, setAbout] = useState('');
    const [jobDescription, setJobDescription] = useState('');

    return (
        <LaunchpadLayout>
            <Head title="Free Tools | Launchpad Careers" />

            <section className="min-h-[calc(100vh-4.5rem)] bg-[#f3f4f6] py-10 sm:py-12">
                <div className="container">
                    <div className="mb-8 max-w-3xl">
                        <p className="mb-2 text-[0.72rem] font-bold tracking-[0.12em] text-[#C8A84B] uppercase">
                            Free Tools
                        </p>
                        <h1 className="font-lp-display text-[clamp(1.85rem,4.5vw,2.65rem)] leading-[1.15] text-[#0d1b2a]">
                            See how your CV or LinkedIn looks.
                        </h1>
                    </div>

                    <div className="grid items-start gap-5 lg:grid-cols-[200px_minmax(0,1fr)] lg:gap-8">
                        <aside className="rounded-[12px] border border-[#e5e7eb] bg-white p-2 shadow-[0_1px_2px_rgba(16,24,40,0.04)]">
                            <nav className="space-y-0.5">
                                {tools.map((tool) => {
                                    const Icon = tool.icon;
                                    const selected = active === tool.id;

                                    return (
                                        <button
                                            key={tool.id}
                                            type="button"
                                            onClick={() => setActive(tool.id)}
                                            className={`flex w-full items-center gap-2.5 rounded-[8px] px-3 py-2.5 text-left text-[0.8rem] font-semibold transition ${selected
                                                ? 'border-l-[3px] border-[#C8A84B] bg-[#f8fafc] text-[#1B3A6B]'
                                                : 'border-l-[3px] border-transparent text-[#64748b] hover:bg-[#f8fafc]'
                                                }`}
                                        >
                                            <Icon
                                                className="h-4 w-4 shrink-0"
                                                strokeWidth={1.8}
                                            />
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
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: -6 }}
                                    transition={{ duration: 0.25 }}
                                >
                                    {active === 'cv' || active === 'ats' ? (
                                        <CvScanTool
                                            mode={
                                                active === 'ats' ? 'ats' : 'deep'
                                            }
                                        />
                                    ) : null}

                                    {active === 'linkedin' ? (
                                        <ToolCard
                                            title="LinkedIn Scan"
                                            description="Upload your LinkedIn profile as a PDF and get a full report — headline, About section, experience, skills and keyword gaps all checked."
                                        >
                                            <label className="mb-3 block text-sm">
                                                <span className="mb-1.5 block text-[0.75rem] font-bold tracking-wide text-[#1B3A6B] uppercase">
                                                    Headline
                                                </span>
                                                <input
                                                    className="w-full rounded-md border border-[#e5e7eb] px-3 py-2.5 text-[0.84rem] outline-none focus:border-[#1B3A6B]"
                                                    value={headline}
                                                    onChange={(event) =>
                                                        setHeadline(
                                                            event.target.value,
                                                        )
                                                    }
                                                    placeholder="Paste your LinkedIn headline"
                                                />
                                            </label>
                                            <label className="mb-4 block text-sm">
                                                <span className="mb-1.5 block text-[0.75rem] font-bold tracking-wide text-[#1B3A6B] uppercase">
                                                    About
                                                </span>
                                                <textarea
                                                    rows={5}
                                                    className="w-full rounded-md border border-[#e5e7eb] px-3 py-2.5 text-[0.84rem] outline-none focus:border-[#1B3A6B]"
                                                    value={about}
                                                    onChange={(event) =>
                                                        setAbout(
                                                            event.target.value,
                                                        )
                                                    }
                                                    placeholder="Paste your About section"
                                                />
                                            </label>
                                            <LinkedInAnalyzeButton
                                                headline={headline}
                                                about={about}
                                            />
                                        </ToolCard>
                                    ) : null}

                                    {active === 'jobs' ? (
                                        <ToolCard
                                            title="Find Jobs"
                                            description="Browse live vacancies and see how your CV matches each role."
                                        >
                                            <label className="mb-4 block">
                                                <span className="mb-1.5 block text-[0.75rem] font-bold tracking-wide text-[#1B3A6B] uppercase">
                                                    What are you looking for?
                                                </span>
                                                <input
                                                    className="w-full rounded-md border border-[#e5e7eb] px-3 py-2.5 text-[0.84rem] outline-none focus:border-[#1B3A6B]"
                                                    placeholder="e.g. Project Manager in Johannesburg"
                                                    value={jobDescription}
                                                    onChange={(event) =>
                                                        setJobDescription(
                                                            event.target.value,
                                                        )
                                                    }
                                                />
                                            </label>
                                            <div className="mb-4 flex flex-wrap gap-2">
                                                {[
                                                    'Full-time Role',
                                                    'Internship',
                                                    'Vacation Work',
                                                ].map((chip) => (
                                                    <span
                                                        key={chip}
                                                        className="rounded-full border border-[#e5e7eb] bg-[#f8fafc] px-3 py-1 text-[0.74rem] font-semibold text-[#1B3A6B]"
                                                    >
                                                        {chip}
                                                    </span>
                                                ))}
                                            </div>
                                            <button
                                                type="button"
                                                className="w-full rounded-lg bg-[#1B3A6B] px-5 py-3 text-[0.9rem] font-extrabold text-white"
                                                onClick={() =>
                                                    toast.message(
                                                        'Job finder demo — connect live boards next',
                                                    )
                                                }
                                            >
                                                Search jobs
                                            </button>
                                        </ToolCard>
                                    ) : null}

                                    {active === 'dashboard' ? (
                                        <ToolCard
                                            title="My Dashboard"
                                            description="Everything in one place: the CV the tools are using, the reports you have run, and the jobs you have saved."
                                        >
                                            <div className="rounded-[10px] border border-dashed border-[#d1d5db] bg-[#fafafa] px-4 py-8 text-center">
                                                <p className="text-[0.9rem] font-bold text-[#1B3A6B]">
                                                    No scans saved yet
                                                </p>
                                                <p className="mt-1 text-[0.8rem] text-[#64748b]">
                                                    Run a CV Deep Scan to see your
                                                    first report here.
                                                </p>
                                                <button
                                                    type="button"
                                                    className="mt-4 rounded-lg bg-[#1B3A6B] px-4 py-2.5 text-[0.8rem] font-bold text-white"
                                                    onClick={() => setActive('cv')}
                                                >
                                                    Open CV Deep Scan
                                                </button>
                                            </div>
                                            <p className="mt-4 text-center text-[0.78rem] text-[#64748b]">
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
    description: string;
    children: ReactNode;
}) {
    return (
        <div className="mx-auto w-full max-w-[560px] rounded-[14px] border border-[#e5e7eb] bg-white p-7 text-left shadow-[0_1px_2px_rgba(16,24,40,0.04)] sm:p-8">
            <h2 className="mb-1.5 text-[1.15rem] font-bold text-[#1B3A6B]">
                {title}
            </h2>
            <p className="mb-6 text-[0.85rem] leading-relaxed text-[#666]">
                {description}
            </p>
            {children}
        </div>
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
                className="w-full rounded-lg bg-[#1B3A6B] px-5 py-3 text-[0.9rem] font-extrabold text-white disabled:opacity-40"
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
