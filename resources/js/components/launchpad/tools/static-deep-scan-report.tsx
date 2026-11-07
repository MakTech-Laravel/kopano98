import { Check, CircleAlert } from 'lucide-react';
import { useState } from 'react';

type NavItem = {
    id: string;
    label: string;
    issues?: number;
};

const navItems: NavItem[] = [
    { id: 'overview', label: 'Overview' },
    { id: 'repetition', label: 'Repetition', issues: 2 },
    { id: 'buzzwords', label: 'Buzzwords' },
    { id: 'quantification', label: 'Quantification', issues: 1 },
    { id: 'language', label: 'Language Quality' },
    { id: 'spelling', label: 'Spelling & Grammar' },
    { id: 'experience', label: 'Work Experience', issues: 7 },
    { id: 'education', label: 'Education', issues: 1 },
    { id: 'skills', label: 'Skills Section' },
    { id: 'dates', label: 'Dates' },
    { id: 'contact', label: 'Contact Details', issues: 2 },
];

const priorityFixes = [
    {
        title: 'No measurable outcome',
        body: 'Add values, %, or Rand amounts to at least 3 bullets so recruiters see scale.',
        pts: 4,
    },
    {
        title: 'No dedicated Key Projects section',
        body: 'Name 2–3 projects with scope, budget, or outcome so impact is easy to scan.',
        pts: 4,
    },
    {
        title: 'Bullet consistency',
        body: 'End bullets the same way (full stops or none) so the document looks polished.',
        pts: 3,
    },
];

type StaticDeepScanReportProps = {
    candidateName?: string;
    fileName?: string;
    onRescan?: () => void;
};

/**
 * Static Deep Scan 2 results shell — same system/layout as launchpadcareers.co.za.
 */
export function StaticDeepScanReport({
    candidateName = 'Sipho Ndlovu',
    fileName,
    onRescan,
}: StaticDeepScanReportProps) {
    const [active, setActive] = useState('overview');
    const score = 69;
    const circumference = 2 * Math.PI * 52;
    const offset = circumference * (1 - score / 100);

    return (
        <div className="overflow-hidden rounded-[12px] border border-[#e5e7eb] bg-white shadow-[0_18px_40px_rgba(13,27,42,0.08)]">
            <div className="flex flex-wrap items-center justify-between gap-2 border-b border-[#e5e7eb] bg-[#1B3A6B] px-4 py-3">
                <div>
                    <p className="text-[0.95rem] font-extrabold tracking-wide text-white">
                        Deep Scan 2
                    </p>
                    <p className="text-[0.68rem] text-white/65">
                        {fileName
                            ? `Report for ${fileName}`
                            : 'Static demo · same system as live scans'}
                    </p>
                </div>
                {onRescan ? (
                    <button
                        type="button"
                        className="rounded-md border border-white/25 bg-white/10 px-3 py-1.5 text-[0.72rem] font-semibold text-white"
                        onClick={onRescan}
                    >
                        ← New scan
                    </button>
                ) : null}
            </div>

            <div className="grid lg:grid-cols-[220px_minmax(0,0.95fr)_minmax(0,1.1fr)]">
                <aside className="flex flex-col border-b border-[#e5e7eb] bg-[#f8fafc] lg:border-r lg:border-b-0">
                    <div className="px-4 pt-5 pb-3 text-center">
                        <p className="mb-3 text-[0.6rem] font-extrabold tracking-[0.08em] text-[#9ca3af] uppercase">
                            Deep Scan Results
                        </p>
                        <div className="relative mx-auto h-[120px] w-[120px]">
                            <svg
                                width="120"
                                height="120"
                                viewBox="0 0 120 120"
                                className="-rotate-90"
                            >
                                <circle
                                    cx="60"
                                    cy="60"
                                    r="52"
                                    fill="none"
                                    stroke="#f0f0f0"
                                    strokeWidth="8"
                                />
                                <circle
                                    cx="60"
                                    cy="60"
                                    r="52"
                                    fill="none"
                                    stroke="#f59e0b"
                                    strokeWidth="8"
                                    strokeLinecap="round"
                                    strokeDasharray={circumference}
                                    strokeDashoffset={offset}
                                />
                            </svg>
                            <div className="absolute inset-0 flex flex-col items-center justify-center">
                                <span className="text-[1.9rem] leading-none font-black text-[#f59e0b]">
                                    {score}
                                </span>
                                <span className="mt-0.5 text-[0.58rem] text-[#9ca3af]">
                                    Overall
                                </span>
                            </div>
                        </div>
                        <p className="mt-2 text-[0.66rem] font-extrabold tracking-wide text-[#166534]">
                            Potential: 90+
                        </p>
                        <span className="mt-2 inline-block rounded-full bg-[#dcfce7] px-2.5 py-0.5 text-[0.66rem] font-extrabold text-[#16a34a]">
                            Fixable — gain +11 pts
                        </span>
                        <div className="mt-3 inline-flex rounded-md bg-white p-0.5 text-[0.62rem] font-bold shadow-sm">
                            <span className="rounded bg-[#1B3A6B] px-2.5 py-1 text-white">
                                Latest
                            </span>
                            <span className="px-2.5 py-1 text-[#9ca3af]">
                                Previous
                            </span>
                        </div>
                    </div>

                    <nav className="flex-1 space-y-0.5 px-2 pb-3">
                        {navItems.map((item) => {
                            const selected = active === item.id;
                            const hasIssues = (item.issues ?? 0) > 0;

                            return (
                                <button
                                    key={item.id}
                                    type="button"
                                    onClick={() => setActive(item.id)}
                                    className={`flex w-full items-center justify-between gap-2 rounded-[7px] px-2.5 py-2 text-left text-[0.78rem] font-semibold transition ${selected
                                            ? 'border-l-[3px] border-[#1B3A6B] bg-[#e8eef8] text-[#1B3A6B]'
                                            : 'border-l-[3px] border-transparent text-[#4a5568] hover:bg-white'
                                        }`}
                                >
                                    <span className="truncate">{item.label}</span>
                                    {hasIssues ? (
                                        <span className="shrink-0 rounded-full bg-[#dc2626] px-1.5 py-0.5 text-[0.6rem] font-bold text-white">
                                            {item.issues}{' '}
                                            {item.issues === 1
                                                ? 'issue'
                                                : 'issues'}
                                        </span>
                                    ) : (
                                        <Check
                                            className="h-3.5 w-3.5 shrink-0 text-[#16a34a]"
                                            strokeWidth={3}
                                        />
                                    )}
                                </button>
                            );
                        })}
                    </nav>

                    <div className="border-t border-[#f0f0f0] p-3">
                        <a
                            href="/services"
                            className="block w-full rounded-lg bg-[#1B3A6B] px-2 py-2.5 text-center text-[0.8rem] font-extrabold text-white"
                        >
                            Fix My CV
                        </a>
                    </div>
                </aside>

                <div className="border-b border-[#e5e7eb] bg-white p-4 sm:p-5 lg:border-r lg:border-b-0">
                    <p className="text-[0.95rem] font-semibold text-[#0f172a]">
                        Good day. Here&apos;s your Deep Scan results.
                    </p>

                    <div className="mt-3 overflow-hidden rounded-[10px] border border-amber-200 bg-amber-50">
                        <p className="bg-[#f59e0b] px-3 py-2 text-[0.78rem] font-bold text-white">
                            Your CV is improving, but isn&apos;t there yet.
                        </p>
                        <div className="px-3 py-3">
                            <ScoreScale score={score} />
                            <div className="mt-3 flex items-center justify-between text-[0.72rem]">
                                <span className="font-semibold text-[#4a5568]">
                                    Fixes applied
                                </span>
                                <span className="font-bold text-[#1B3A6B]">
                                    0 / 6
                                </span>
                            </div>
                            <div className="mt-1.5 h-1.5 overflow-hidden rounded-full bg-amber-100">
                                <div className="h-full w-0 rounded-full bg-[#1B3A6B]" />
                            </div>
                        </div>
                    </div>

                    {active === 'overview' ? (
                        <div className="mt-5">
                            <p className="text-[0.72rem] font-extrabold tracking-[0.08em] text-[#dc2626] uppercase">
                                Fix these 3 — gain +11 pts
                            </p>
                            <div className="mt-3 space-y-3">
                                {priorityFixes.map((fix, index) => (
                                    <article
                                        key={fix.title}
                                        className="rounded-[10px] border border-[#e5e7eb] border-l-[3px] border-l-[#ea580c] bg-white p-3.5 shadow-sm"
                                    >
                                        <div className="flex items-start justify-between gap-2">
                                            <div className="flex items-start gap-3">
                                                <span className="flex h-[26px] w-[26px] shrink-0 items-center justify-center rounded-full bg-[#1B3A6B] text-[0.78rem] font-extrabold text-white">
                                                    {index + 1}
                                                </span>
                                                <div>
                                                    <h4 className="text-[0.9rem] font-bold text-[#0f172a]">
                                                        {fix.title}
                                                    </h4>
                                                    <p className="mt-1 text-[0.7rem] leading-relaxed text-[#64748b]">
                                                        {fix.body}
                                                    </p>
                                                    <button
                                                        type="button"
                                                        className="mt-2 text-[0.72rem] font-semibold text-[#1B3A6B]"
                                                        onClick={() =>
                                                            setActive(
                                                                'experience',
                                                            )
                                                        }
                                                    >
                                                        Go Fix on Structure →
                                                    </button>
                                                </div>
                                            </div>
                                            <span className="inline-flex shrink-0 items-center rounded-[10px] bg-[#f0fdf4] px-2 py-0.5 text-[0.66rem] font-extrabold text-[#16a34a]">
                                                +{fix.pts} pts
                                            </span>
                                        </div>
                                    </article>
                                ))}
                            </div>
                        </div>
                    ) : (
                        <CategoryDetail
                            item={
                                navItems.find((entry) => entry.id === active) ??
                                navItems[0]
                            }
                        />
                    )}
                </div>

                <div className="bg-[#f8fafc] p-4 sm:p-5">
                    <div className="mb-3 flex flex-wrap items-center justify-between gap-2">
                        <p className="text-[0.8rem] font-bold text-[#1B3A6B]">
                            {candidateName} — Construction Project Manager
                        </p>
                        <div className="flex flex-wrap gap-1.5 text-[0.62rem] font-bold tracking-wide text-slate-600 uppercase">
                            <LegendDot color="bg-[#f87171]" label="Critical" />
                            <LegendDot color="bg-[#fb923c]" label="Important" />
                            <LegendDot color="bg-[#fcd34d]" label="Minor" />
                        </div>
                    </div>

                    <div className="rounded-[10px] border border-[#e5e7eb] bg-white p-4 shadow-sm sm:p-5">
                        <h3 className="text-[1.35rem] leading-none font-black text-[#1B3A6B]">
                            {candidateName}
                        </h3>
                        <p className="mt-1 text-[0.72rem] font-semibold tracking-wide text-slate-500 uppercase">
                            Construction Project Manager
                        </p>
                        <p className="mt-2 text-[0.68rem] text-slate-500">
                            Johannesburg · 082 000 0000 · sipho@email.com
                        </p>

                        <SectionTitle>Professional Summary</SectionTitle>
                        <p className="text-[0.72rem] leading-relaxed text-slate-700">
                            Construction project manager with 8+ years delivering
                            multi-site builds across Gauteng.{' '}
                            <Mark tone="minor">
                                Passionate team player with strong communication
                                skills
                            </Mark>{' '}
                            and experience coordinating contractors, budgets and
                            programme risk.
                        </p>

                        <SectionTitle>Professional Experience</SectionTitle>
                        <p className="text-[0.78rem] font-bold text-slate-800">
                            Senior Project Manager
                        </p>
                        <p className="text-[0.68rem] text-slate-500">
                            Group Five Construction · 2021 – Present
                        </p>
                        <ul className="mt-2 space-y-2 text-[0.72rem] leading-relaxed text-slate-700">
                            <li className="flex gap-2">
                                <span className="mt-1 text-slate-400">•</span>
                                <span>
                                    Led delivery of residential and civil packages
                                    across overlapping programmes.
                                </span>
                            </li>
                            <li className="flex gap-2">
                                <span className="mt-1 text-slate-400">•</span>
                                <span>
                                    <Mark tone="important">
                                        Responsible for coordinating site teams and
                                        reporting to stakeholders
                                    </Mark>
                                </span>
                            </li>
                            <li className="flex gap-2">
                                <span className="mt-1 text-slate-400">•</span>
                                <span>
                                    <Mark tone="critical">
                                        Helped improve delivery outcomes and
                                        supported loss prevention initiatives
                                    </Mark>
                                </span>
                            </li>
                        </ul>

                        <p className="mt-4 text-[0.78rem] font-bold text-slate-800">
                            Project Manager
                        </p>
                        <p className="text-[0.68rem] text-slate-500">
                            WBHO · 2017 – 2021
                        </p>
                        <ul className="mt-2 space-y-2 text-[0.72rem] leading-relaxed text-slate-700">
                            <li className="flex gap-2">
                                <span className="mt-1 text-slate-400">•</span>
                                <span>
                                    Managed tender handovers and site establishment
                                    for mid-size commercial works.
                                </span>
                            </li>
                            <li className="flex gap-2">
                                <span className="mt-1 text-slate-400">•</span>
                                <span>
                                    <Mark tone="minor">
                                        Worked closely with quantity surveyors on
                                        valuations and variations
                                    </Mark>
                                </span>
                            </li>
                        </ul>

                        <SectionTitle>Education</SectionTitle>
                        <p className="text-[0.72rem] text-slate-700">
                            <span className="font-semibold">
                                BTech Construction Management
                            </span>
                            <br />
                            <span className="text-slate-500">
                                Tshwane University of Technology · 2013 – 2016
                            </span>
                        </p>
                    </div>

                    <p className="mt-3 flex items-start gap-1.5 text-[0.68rem] leading-relaxed text-[#718096]">
                        <CircleAlert className="mt-0.5 h-3.5 w-3.5 shrink-0 text-amber-500" />
                        Highlights mirror live Deep Scan annotations on the CV
                        preview (critical / important / minor).
                    </p>
                </div>
            </div>
        </div>
    );
}

function ScoreScale({ score }: { score: number }) {
    const labels = ['Weak', 'Below avg', 'Average', 'Strong', 'Top 1%'];

    return (
        <div>
            <div className="relative h-2 rounded-full bg-gradient-to-r from-rose-400 via-amber-300 to-emerald-400">
                <span
                    className="absolute top-1/2 h-3.5 w-3.5 -translate-y-1/2 rounded-full border-2 border-white bg-[#1B3A6B] shadow"
                    style={{ left: `calc(${score}% - 7px)` }}
                />
            </div>
            <div className="mt-1.5 flex justify-between text-[0.58rem] font-semibold text-slate-500 uppercase">
                {labels.map((label) => (
                    <span key={label}>{label}</span>
                ))}
            </div>
        </div>
    );
}

function CategoryDetail({ item }: { item: NavItem }) {
    const count = item.issues ?? 0;

    if (count === 0) {
        return (
            <div className="mt-5 rounded-[10px] border border-emerald-200 bg-emerald-50 p-4">
                <p className="text-sm font-bold text-emerald-900">
                    {item.label} looks clean
                </p>
                <p className="mt-1 text-[0.75rem] text-emerald-800">
                    No issues flagged in this category on the sample report.
                </p>
            </div>
        );
    }

    return (
        <div className="mt-5 space-y-3">
            <p className="text-[0.72rem] font-extrabold tracking-[0.06em] text-[#dc2626] uppercase">
                {count} {count === 1 ? 'issue' : 'issues'} in {item.label}
            </p>
            {Array.from({ length: Math.min(count, 3) }).map((_, index) => (
                <article
                    key={`${item.id}-${index}`}
                    className="rounded-[10px] border border-[#e5e7eb] border-l-[3px] border-l-[#ea580c] bg-white p-3.5"
                >
                    <div className="flex items-center gap-3">
                        <span className="flex h-[26px] w-[26px] shrink-0 items-center justify-center rounded-full bg-[#1B3A6B] text-[0.78rem] font-extrabold text-white">
                            {index + 1}
                        </span>
                        <h4 className="text-[0.9rem] font-bold text-[#0f172a]">
                            Sample finding #{index + 1}
                        </h4>
                    </div>
                    <p className="mt-2 ml-[38px] text-[0.7rem] leading-relaxed text-[#64748b]">
                        Flagged on the annotated CV. Live product shows rewrite
                        options here — static preview for now.
                    </p>
                    <div className="mt-3 ml-[38px] rounded-lg border border-[#e5e7eb] bg-[#f8fafc] px-3 py-2 text-[0.8rem] text-[#dc2626]">
                        Responsible for coordinating site teams and reporting to
                        stakeholders
                    </div>
                    <p className="mt-2 ml-[38px] text-[0.68rem] font-extrabold tracking-wide text-[#1B3A6B] uppercase">
                        Suggested rewrite
                    </p>
                    <p className="mt-1 ml-[38px] rounded-[10px] border border-[#e5e7eb] bg-white px-3 py-2 text-[0.84rem] text-[#0f172a]">
                        Led weekly stakeholder reporting across 4 site teams,
                        cutting decision lag by 2 days.
                    </p>
                </article>
            ))}
        </div>
    );
}

function SectionTitle({ children }: { children: string }) {
    return (
        <p className="mt-4 mb-1.5 text-[0.68rem] font-bold tracking-[0.08em] text-[#1B3A6B] uppercase">
            {children}
        </p>
    );
}

function LegendDot({ color, label }: { color: string; label: string }) {
    return (
        <span className="inline-flex items-center gap-1">
            <span className={`h-2 w-2 rounded-full ${color}`} />
            {label}
        </span>
    );
}

function Mark({
    children,
    tone,
}: {
    children: string;
    tone: 'critical' | 'important' | 'minor';
}) {
    const classes =
        tone === 'critical'
            ? 'bg-rose-200/90 box-decoration-clone px-0.5'
            : tone === 'important'
                ? 'bg-orange-200/90 box-decoration-clone px-0.5'
                : 'bg-amber-200/90 box-decoration-clone px-0.5';

    return <mark className={classes}>{children}</mark>;
}
