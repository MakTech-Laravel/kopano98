import { Link } from '@inertiajs/react';

import { Reveal } from '@/components/launchpad/reveal';

const visuals = [
    {
        title: 'ATS CV Checker',
        href: '/tools',
        body: 'Upload a CV and get a match score with highlighted ATS risks before you apply.',
        kind: 'ats' as const,
    },
    {
        title: 'LinkedIn profile scan',
        href: '/tools',
        body: 'See headline clarity and About completeness gaps with concrete rewrite prompts.',
        kind: 'linkedin' as const,
    },
    {
        title: 'Cover letter builder',
        href: '/tools',
        body: 'Paste a job description and generate a tailored letter draft in seconds.',
        kind: 'letter' as const,
    },
];

function AtsVisual() {
    return (
        <div className="flex h-full flex-col bg-[linear-gradient(160deg,#0d1b2a_0%,#1e3448_100%)] p-4 text-white">
            <div className="mb-3 flex items-center justify-between text-[0.65rem] tracking-wide text-white/60 uppercase">
                <span>Deep scan</span>
                <span className="rounded bg-[var(--lp-gold)] px-2 py-0.5 font-bold text-[var(--lp-navy)]">
                    78/100
                </span>
            </div>
            <div className="space-y-2">
                {[
                    { label: 'Weak verbs', tone: 'bg-rose-400/80' },
                    { label: 'Missing metrics', tone: 'bg-amber-300/80' },
                    { label: 'ATS headings OK', tone: 'bg-emerald-400/80' },
                ].map((issue) => (
                    <div
                        key={issue.label}
                        className="flex items-center gap-2 rounded bg-white/10 px-2 py-1.5 text-[0.7rem]"
                    >
                        <span className={`h-2 w-2 rounded-full ${issue.tone}`} />
                        {issue.label}
                    </div>
                ))}
            </div>
            <div className="mt-auto pt-4">
                <div className="h-1.5 overflow-hidden rounded bg-white/15">
                    <div className="h-full w-[78%] rounded bg-[var(--lp-gold)]" />
                </div>
            </div>
        </div>
    );
}

function LinkedInVisual() {
    return (
        <div className="flex h-full flex-col bg-white p-4">
            <div className="mb-3 flex items-center gap-3 border-b border-[var(--lp-border)] pb-3">
                <div className="bg-lp-navy flex h-10 w-10 items-center justify-center rounded-full text-xs font-bold text-white">
                    NM
                </div>
                <div className="min-w-0">
                    <p className="text-lp-navy truncate text-sm font-bold">
                        Naledi Mokoena
                    </p>
                    <p className="text-lp-mid truncate text-[0.7rem]">
                        Sales Manager | Retail growth | CRM
                    </p>
                </div>
            </div>
            <p className="text-lp-mid mb-2 text-[0.68rem] font-semibold uppercase tracking-wide">
                Before → After
            </p>
            <div className="grid grid-cols-2 gap-2 text-[0.65rem]">
                <div className="rounded border border-rose-200 bg-rose-50 p-2 text-rose-800">
                    “Looking for opportunities…”
                </div>
                <div className="rounded border border-emerald-200 bg-emerald-50 p-2 text-emerald-800">
                    “Sales manager driving 18% retail growth across FS teams”
                </div>
            </div>
            <div className="mt-auto flex gap-2 pt-3 text-[0.65rem]">
                <span className="rounded bg-[var(--lp-off)] px-2 py-1 text-[var(--lp-navy)]">
                    Headline 84%
                </span>
                <span className="rounded bg-[var(--lp-off)] px-2 py-1 text-[var(--lp-navy)]">
                    About 76%
                </span>
            </div>
        </div>
    );
}

function LetterVisual() {
    return (
        <div className="flex h-full flex-col bg-[#f8fafc] p-4">
            <p className="text-lp-navy mb-2 text-[0.7rem] font-bold tracking-wide uppercase">
                Cover letter draft
            </p>
            <div className="rounded border border-[var(--lp-border)] bg-white p-3 text-[0.68rem] leading-relaxed text-slate-600 shadow-sm">
                <p className="mb-2 font-semibold text-slate-800">
                    Dear Hiring Manager,
                </p>
                <p className="mb-2">
                    I’m applying for the Sales Manager role. Your focus on retail
                    growth matches the 18% uplift I led across Free State teams…
                </p>
                <p className="text-slate-400">— tailored to the pasted JD</p>
            </div>
        </div>
    );
}

function Visual({ kind }: { kind: 'ats' | 'linkedin' | 'letter' }) {
    if (kind === 'ats') {
        return <AtsVisual />;
    }

    if (kind === 'linkedin') {
        return <LinkedInVisual />;
    }

    return <LetterVisual />;
}

export function ServiceVisualCards() {
    return (
        <div className="grid gap-3 sm:gap-4 md:grid-cols-3">
            {visuals.map((tool, index) => (
                <Reveal key={tool.title} delay={index * 0.05}>
                    <Link
                        href={tool.href}
                        className="group block h-full overflow-hidden rounded-[10px] border border-[var(--lp-border)] bg-white transition duration-300 hover:-translate-y-1 hover:border-[var(--lp-navy-3)] hover:shadow-[0_12px_28px_rgba(13,27,42,0.08)]"
                    >
                        <div className="aspect-[16/10] overflow-hidden bg-[var(--lp-off)] transition duration-500 group-hover:scale-[1.02] group-hover:brightness-[1.03]">
                            <Visual kind={tool.kind} />
                        </div>
                        <div className="p-5">
                            <h3 className="text-lp-navy mb-2 text-sm font-bold">
                                {tool.title}
                            </h3>
                            <p className="text-lp-mid text-[0.8rem] leading-relaxed">
                                {tool.body}
                            </p>
                        </div>
                    </Link>
                </Reveal>
            ))}
        </div>
    );
}
