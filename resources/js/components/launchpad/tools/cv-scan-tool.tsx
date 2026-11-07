import { useEffect, useState } from 'react';
import { toast } from 'sonner';

import { StaticDeepScanReport } from '@/components/launchpad/tools/static-deep-scan-report';

type CvScanToolProps = {
    mode: 'ats' | 'deep';
};

type Stage = 'form' | 'parsing' | 'scanning' | 'report';

const MAX_BYTES = 5 * 1024 * 1024;

const industries = [
    { value: '', label: 'Auto-detect, or select…' },
    { value: 'built_environment', label: 'Built Environment' },
    { value: 'technology', label: 'Technology & IT' },
    { value: 'healthcare', label: 'Healthcare' },
    { value: 'finance', label: 'Finance & Banking' },
    { value: 'logistics', label: 'Logistics & Supply Chain' },
    { value: 'retail', label: 'Retail' },
    { value: 'other', label: 'Other' },
];

const parseSteps = [
    'Reading your CV…',
    'Extracting contact details…',
    'Checking section structure…',
    'Scoring language quality…',
    'Finding measurable outcomes…',
    'Matching ATS keywords…',
];

/**
 * Launchpad Free Tools scan card — same upload layout as launchpadcareers.co.za.
 */
export function CvScanTool({ mode }: CvScanToolProps) {
    const [stage, setStage] = useState<Stage>('form');
    const [fileName, setFileName] = useState<string | null>(null);
    const [dragging, setDragging] = useState(false);
    const [role, setRole] = useState('');
    const [industry, setIndustry] = useState('');
    const [error, setError] = useState<string | null>(null);
    const [parseIndex, setParseIndex] = useState(0);
    const [parseProgress, setParseProgress] = useState(0);
    const [scanProgress, setScanProgress] = useState(0);

    const isAts = mode === 'ats';
    const title = isAts ? 'ATS Match' : 'CV Deep Scan';
    const description = isAts
        ? 'Upload your CV and paste the job description. Our software checks how well they match and what is missing.'
        : 'Upload your CV and get a full report — content, layout, formatting, buzzwords and ATS score all checked.';

    useEffect(() => {
        if (stage !== 'parsing') {
            return;
        }

        let step = 0;
        setParseIndex(0);
        setParseProgress(8);

        const timer = window.setInterval(() => {
            step += 1;
            setParseIndex(Math.min(step, parseSteps.length - 1));
            setParseProgress(Math.min(95, 12 + step * 14));

            if (step >= parseSteps.length) {
                window.clearInterval(timer);
                setParseProgress(100);
                window.setTimeout(() => setStage('scanning'), 350);
            }
        }, 520);

        return () => window.clearInterval(timer);
    }, [stage]);

    useEffect(() => {
        if (stage !== 'scanning') {
            return;
        }

        setScanProgress(0);
        let frame = 0;
        const timer = window.setInterval(() => {
            frame += 1;
            setScanProgress(Math.min(100, frame * 4));

            if (frame >= 26) {
                window.clearInterval(timer);
                window.setTimeout(() => {
                    setStage('report');
                    toast.success('Deep Scan complete');
                }, 280);
            }
        }, 90);

        return () => window.clearInterval(timer);
    }, [stage]);

    const acceptFile = (file: File | undefined) => {
        if (!file) {
            return;
        }

        setError(null);

        if (file.size > MAX_BYTES) {
            setError('File too large. Please upload under 5MB.');
            setFileName(null);

            return;
        }

        const ext = file.name.split('.').pop()?.toLowerCase();

        if (ext !== 'pdf') {
            setError('PDF only — please upload a PDF under 5MB.');
            setFileName(null);

            return;
        }

        setFileName(file.name);
    };

    if (stage === 'report') {
        return (
            <StaticDeepScanReport
                fileName={fileName ?? 'cv.pdf'}
                candidateName="Sipho Ndlovu"
                onRescan={() => {
                    setStage('form');
                    setFileName(null);
                    setRole('');
                    setIndustry('');
                    setError(null);
                    setParseProgress(0);
                    setScanProgress(0);
                }}
            />
        );
    }

    if (stage === 'parsing') {
        return (
            <div className="flex min-h-[360px] flex-col items-center justify-center rounded-[14px] border border-[#e5e7eb] bg-white px-6 py-12 shadow-[0_1px_2px_rgba(16,24,40,0.04)]">
                <div className="relative h-14 w-full max-w-md overflow-hidden">
                    <div
                        className="absolute inset-x-0 transition-transform duration-500 ease-[cubic-bezier(.4,0,.2,1)]"
                        style={{
                            transform: `translateY(${-parseIndex * 56}px)`,
                        }}
                    >
                        {parseSteps.map((step) => (
                            <p
                                key={step}
                                className="flex h-14 items-center justify-center text-center text-[1.05rem] font-bold text-[#1B3A6B]"
                            >
                                {step}
                            </p>
                        ))}
                    </div>
                </div>
                <div className="mt-3 h-[5px] w-[280px] overflow-hidden rounded-full bg-[#e5e7eb]">
                    <div
                        className="h-full rounded-full bg-[#C8A84B] transition-all duration-300"
                        style={{ width: `${parseProgress}%` }}
                    />
                </div>
                <p className="mt-2.5 text-[0.78rem] text-[#9ca3af]">
                    This takes a few seconds
                </p>
            </div>
        );
    }

    if (stage === 'scanning') {
        return (
            <div className="overflow-hidden rounded-[14px] border border-[#e5e7eb] bg-[#eef1f6] p-3 shadow-[0_1px_2px_rgba(16,24,40,0.04)] sm:p-4">
                <div
                    className="relative mx-auto flex w-full max-w-[820px] flex-col items-center gap-4 overflow-hidden rounded-2xl px-4 py-5 shadow-[0_10px_50px_rgba(0,0,0,0.2)]"
                    style={{
                        background:
                            'linear-gradient(160deg,#334155 0%,#475569 55%,#334155 100%)',
                    }}
                >
                    <div className="flex items-center gap-2 opacity-85">
                        <span className="h-px w-3.5 bg-[rgba(212,168,66,0.55)]" />
                        <span className="text-[0.62rem] font-bold tracking-[0.14em] text-[#E8C06A] uppercase">
                            ATS System
                        </span>
                        <span className="h-px w-3.5 bg-[rgba(212,168,66,0.55)]" />
                    </div>

                    <div className="relative w-full">
                        <div className="relative h-[min(58vh,520px)] overflow-hidden rounded-[10px] bg-white shadow-[0_8px_40px_rgba(0,0,0,0.5)]">
                            <span className="absolute top-2 left-2 z-20 h-4 w-4 border-t-2 border-l-2 border-rose-500" />
                            <span className="absolute top-2 right-2 z-20 h-4 w-4 border-t-2 border-r-2 border-rose-500" />
                            <span className="absolute bottom-2 left-2 z-20 h-4 w-4 border-b-2 border-l-2 border-rose-500" />
                            <span className="absolute right-2 bottom-2 z-20 h-4 w-4 border-r-2 border-b-2 border-rose-500" />

                            <div
                                className="absolute inset-x-0 will-change-transform"
                                style={{
                                    transform: `translateY(${-scanProgress * 2.2}px)`,
                                }}
                            >
                                <ScanTheatreCv />
                            </div>

                            <div
                                className="pointer-events-none absolute inset-x-0 z-[5] h-0.5"
                                style={{
                                    top: '50%',
                                    background:
                                        'linear-gradient(90deg,transparent,#ef4444 12%,#fff 50%,#ef4444 88%,transparent)',
                                    boxShadow: '0 0 10px 2px rgba(239,68,68,0.5)',
                                }}
                            />
                            <div
                                className="pointer-events-none absolute inset-x-0 z-[4] h-[70px] -translate-y-1/2"
                                style={{
                                    top: '50%',
                                    background:
                                        'linear-gradient(180deg,rgba(239,68,68,0.1),transparent 70%)',
                                }}
                            />
                            <div className="pointer-events-none absolute inset-x-0 top-0 z-[6] h-9 bg-gradient-to-b from-white to-transparent" />
                            <div className="pointer-events-none absolute inset-x-0 bottom-0 z-[6] h-9 bg-gradient-to-t from-white to-transparent" />
                        </div>
                    </div>

                    <p className="text-[0.72rem] font-semibold tracking-wide text-white/70">
                        Scanning document · {scanProgress}%
                    </p>
                </div>
            </div>
        );
    }

    return (
        <div className="mx-auto w-full max-w-[560px] rounded-[14px] border border-[#e5e7eb] bg-white p-7 text-left shadow-[0_1px_2px_rgba(16,24,40,0.04)] sm:p-8">
            <h2 className="mb-1.5 text-[1.15rem] font-bold text-[#1B3A6B]">
                {title}
            </h2>
            <p className="mb-6 text-[0.85rem] leading-relaxed text-[#666]">
                {description}
            </p>

            <div
                role="button"
                tabIndex={0}
                className={`mb-5 cursor-pointer rounded-[10px] border-2 border-dashed px-6 py-10 text-center transition ${dragging
                        ? 'border-[#1B3A6B] bg-[#f0f4ff]'
                        : fileName
                            ? 'border-emerald-400 bg-emerald-50'
                            : 'border-[#d1d5db] bg-[#fafafa]'
                    }`}
                onClick={() =>
                    document.getElementById('lp-ds2-file-input')?.click()
                }
                onKeyDown={(event) => {
                    if (event.key === 'Enter' || event.key === ' ') {
                        document.getElementById('lp-ds2-file-input')?.click();
                    }
                }}
                onDragOver={(event) => {
                    event.preventDefault();
                    setDragging(true);
                }}
                onDragLeave={() => setDragging(false)}
                onDrop={(event) => {
                    event.preventDefault();
                    setDragging(false);
                    acceptFile(event.dataTransfer.files?.[0]);
                }}
            >
                {fileName ? (
                    <>
                        <p className="text-[0.95rem] font-bold text-emerald-700">
                            ✓ {fileName}
                        </p>
                        <p className="mt-1 text-[0.78rem] text-[#999]">
                            Your file is uploaded — review the details below and
                            start when you&apos;re ready.
                        </p>
                    </>
                ) : (
                    <>
                        <p className="font-bold text-[#1B3A6B]">
                            Drop your CV here or click to upload
                        </p>
                        <p className="mt-1 text-[0.78rem] text-[#999]">
                            PDF only — max 5MB
                        </p>
                    </>
                )}
            </div>
            <input
                id="lp-ds2-file-input"
                type="file"
                className="hidden"
                accept=".pdf,application/pdf"
                onChange={(event) => {
                    acceptFile(event.target.files?.[0]);
                    event.target.value = '';
                }}
            />

            <div className="mb-5 grid grid-cols-1 gap-3 sm:grid-cols-2">
                <label className="block text-left">
                    <span className="mb-1.5 block text-[0.72rem] font-bold tracking-wide text-[#1B3A6B] uppercase">
                        Target Role
                    </span>
                    <input
                        type="text"
                        value={role}
                        onChange={(event) => setRole(event.target.value)}
                        placeholder="Auto-detect, or type your role"
                        autoComplete="off"
                        className="w-full rounded-md border border-[#e5e7eb] px-3 py-2.5 text-[0.84rem] text-[#0f172a] outline-none placeholder:text-[#94a3b8] focus:border-[#1B3A6B]"
                    />
                </label>
                <label className="block text-left">
                    <span className="mb-1.5 block text-[0.72rem] font-bold tracking-wide text-[#1B3A6B] uppercase">
                        Industry
                    </span>
                    <select
                        value={industry}
                        onChange={(event) => setIndustry(event.target.value)}
                        className="w-full rounded-md border border-[#e5e7eb] bg-white px-3 py-2.5 text-[0.84rem] text-[#0f172a] outline-none focus:border-[#1B3A6B]"
                    >
                        {industries.map((item) => (
                            <option key={item.value || 'auto'} value={item.value}>
                                {item.label}
                            </option>
                        ))}
                    </select>
                </label>
            </div>

            {fileName ? (
                <>
                    <button
                        type="button"
                        className="mb-3 w-full rounded-lg bg-[#1B3A6B] px-8 py-3.5 text-[0.95rem] font-extrabold text-white"
                        onClick={() => setStage('parsing')}
                    >
                        Start Deep Scan
                    </button>
                    <button
                        type="button"
                        className="mx-auto block text-[0.8rem] text-[#888] underline"
                        onClick={() => {
                            setFileName(null);
                            setError(null);
                        }}
                    >
                        Choose a different file
                    </button>
                </>
            ) : null}

            {error ? (
                <div className="mt-4 rounded-md border border-[#fecaca] bg-[#fef2f2] px-3 py-2.5 text-[0.82rem] font-medium text-[#dc2626]">
                    {error}
                </div>
            ) : null}
        </div>
    );
}

function ScanTheatreCv() {
    return (
        <div className="space-y-4 p-6 text-left text-slate-800">
            <div>
                <p className="text-[1.45rem] font-black text-[#1B3A6B]">
                    Sipho Ndlovu
                </p>
                <p className="text-[0.78rem] font-semibold tracking-wide text-slate-500 uppercase">
                    Construction Project Manager
                </p>
                <p className="mt-1 text-[0.7rem] text-slate-500">
                    Johannesburg · 082 000 0000 · sipho@email.com
                </p>
            </div>
            {[
                'Professional Summary',
                'Professional Experience',
                'Education',
                'Skills',
                'Certifications',
            ].map((heading) => (
                <div key={heading}>
                    <p className="mb-1 text-[0.7rem] font-bold tracking-[0.08em] text-[#1B3A6B] uppercase">
                        {heading}
                    </p>
                    <p className="text-[0.78rem] leading-relaxed text-slate-600">
                        Construction project manager with multi-site delivery
                        experience across Gauteng programmes. Coordinated
                        contractors, budgets and programme risk while reporting
                        to client stakeholders. Led residential and civil
                        packages with measurable programme outcomes.
                    </p>
                </div>
            ))}
        </div>
    );
}
