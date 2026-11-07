import { useState } from 'react';
import { toast } from 'sonner';

import { LinkedInHowtoDemo } from '@/components/launchpad/tools/linkedin-howto-demo';
import { launchpadIndustries } from '@/data/launchpad/industries';

const howtoSteps = [
    <>
        Open <strong>linkedin.com</strong> on a desktop browser
    </>,
    <>
        Set your language to <strong>English</strong> in Settings
    </>,
    <>
        Go to your <strong>Profile</strong>
    </>,
    <>
        Click the <strong>••• icon → Save to PDF</strong>
    </>,
    <>Upload below</>,
];

/**
 * LinkedIn Profile Scan panel — matches Compressed reference #tool-li-wrap.
 */
export function LinkedInScanTool() {
    const [fileName, setFileName] = useState<string | null>(null);
    const [dragging, setDragging] = useState(false);
    const [role, setRole] = useState('');
    const [industry, setIndustry] = useState('');
    const [otherIndustry, setOtherIndustry] = useState('');
    const [busy, setBusy] = useState(false);

    const acceptFile = (file: File | undefined) => {
        if (!file) {
            return;
        }

        if (file.size > 10 * 1024 * 1024) {
            toast.error('File too large. Please upload under 10MB.');

            return;
        }

        const ext = file.name.split('.').pop()?.toLowerCase();

        if (ext !== 'pdf' && ext !== 'docx') {
            toast.error('Please upload a LinkedIn PDF export.');

            return;
        }

        setFileName(file.name);
    };

    return (
        <div className="lp-tool-card mb-4 rounded-lg border border-[var(--lp-border)] bg-white p-5 text-left">
            <h2 className="mb-1 text-[1rem] font-bold text-[var(--lp-text)]">
                LinkedIn Profile Scan
            </h2>
            <p className="mb-3.5 text-[0.8rem] leading-relaxed text-[var(--lp-text-mid)]">
                Upload your LinkedIn profile as a PDF and get a full report —
                headline, About section, experience, skills and keyword gaps all
                checked.
            </p>

            <div
                id="li-howto-wrap"
                className="mb-4 flex flex-wrap items-start justify-center gap-4"
            >
                <div className="w-[210px] shrink-0 overflow-visible">
                    <LinkedInHowtoDemo />
                </div>

                <div className="min-w-[200px] flex-1 text-left">
                    <p className="mb-2 text-[0.72rem] font-bold tracking-wide text-[#1d4ed8]">
                        HOW TO EXPORT YOUR LINKEDIN PDF
                    </p>
                    <div className="flex flex-col gap-1.5">
                        {howtoSteps.map((step, index) => (
                            <div
                                key={index}
                                className="flex items-start gap-[0.45rem] text-[0.72rem] text-[#374151]"
                            >
                                <span
                                    className={`mt-px flex h-[15px] w-[15px] shrink-0 items-center justify-center rounded-full text-[0.56rem] font-bold text-white ${index === 4
                                            ? 'bg-[#16a34a]'
                                            : 'bg-[#0a66c2]'
                                        }`}
                                >
                                    {index + 1}
                                </span>
                                <span>{step}</span>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            <div
                role="button"
                tabIndex={0}
                id="li-upload-zone"
                className={`mb-4 cursor-pointer rounded-[10px] border-2 border-dashed px-6 py-8 text-center transition ${dragging
                        ? 'border-[var(--lp-navy)] bg-[#e8f0fe]'
                        : fileName
                            ? 'border-[#86efac] bg-[#dcfce7]'
                            : 'border-[var(--lp-border)] bg-[var(--lp-off)]'
                    }`}
                onClick={() =>
                    document.getElementById('lp-li-file-input')?.click()
                }
                onKeyDown={(event) => {
                    if (event.key === 'Enter' || event.key === ' ') {
                        document.getElementById('lp-li-file-input')?.click();
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
                        <p className="text-[0.85rem] font-semibold text-[var(--lp-green)]">
                            ✅ {fileName}
                        </p>
                        <p className="mt-0.5 text-[0.72rem] text-[var(--lp-text-mid)]">
                            Ready to scan
                        </p>
                        <button
                            type="button"
                            className="mt-2 text-[0.8rem] text-[var(--lp-text-light)]"
                            onClick={(event) => {
                                event.stopPropagation();
                                setFileName(null);
                            }}
                        >
                            Remove
                        </button>
                    </>
                ) : (
                    <>
                        <p className="text-[0.9rem] font-semibold text-[var(--lp-navy)]">
                            Upload your LinkedIn PDF
                        </p>
                        <p className="mt-1 text-[0.75rem] text-[var(--lp-text-light)]">
                            LinkedIn PDF export — max 10MB
                        </p>
                    </>
                )}
            </div>
            <input
                id="lp-li-file-input"
                type="file"
                className="hidden"
                accept=".pdf,.docx,application/pdf"
                onChange={(event) => {
                    acceptFile(event.target.files?.[0]);
                    event.target.value = '';
                }}
            />

            <div className="lp-frow mb-3 grid grid-cols-1 gap-3 sm:grid-cols-2">
                <label className="lp-fg mb-0 block">
                    <span className="mb-[0.3rem] block text-[0.72rem] font-bold tracking-[0.06em] text-[var(--lp-text-mid)] uppercase">
                        Target role
                    </span>
                    <input
                        type="text"
                        value={role}
                        onChange={(event) => setRole(event.target.value)}
                        placeholder="Auto-detect, or type your role"
                        className="w-full rounded-md border-[1.5px] border-[var(--lp-border)] bg-white px-[0.85rem] py-[0.65rem] text-[0.88rem] text-[var(--lp-text)] outline-none transition focus:border-[var(--lp-navy)]"
                    />
                </label>
                <label className="lp-fg mb-0 block">
                    <span className="mb-[0.3rem] block text-[0.72rem] font-bold tracking-[0.06em] text-[var(--lp-text-mid)] uppercase">
                        Industry
                    </span>
                    <select
                        value={industry}
                        onChange={(event) => setIndustry(event.target.value)}
                        className="w-full rounded-md border-[1.5px] border-[var(--lp-border)] bg-white px-[0.85rem] py-[0.65rem] text-[0.88rem] text-[var(--lp-text)] outline-none transition focus:border-[var(--lp-navy)]"
                    >
                        <option value="">Auto-detect, or select…</option>
                        {launchpadIndustries.map((item) => (
                            <option key={item} value={item}>
                                {item}
                            </option>
                        ))}
                    </select>
                    {industry === 'Other' ? (
                        <input
                            type="text"
                            value={otherIndustry}
                            onChange={(event) =>
                                setOtherIndustry(event.target.value)
                            }
                            placeholder="e.g. Agriculture, Education, Logistics…"
                            className="mt-2 w-full rounded-md border-[1.5px] border-[var(--lp-border)] bg-white px-[0.85rem] py-[0.65rem] text-[0.88rem] text-[var(--lp-text)] outline-none transition focus:border-[var(--lp-navy)]"
                        />
                    ) : null}
                </label>
            </div>

            <button
                type="button"
                className="btn-lp-navy inline-flex w-full items-center justify-center rounded-[5px] px-6 py-3 text-[0.83rem] font-bold disabled:cursor-not-allowed disabled:opacity-40"
                disabled={busy || !fileName}
                onClick={() => {
                    setBusy(true);
                    window.setTimeout(() => {
                        setBusy(false);
                        toast.success('LinkedIn scan demo complete');
                    }, 900);
                }}
            >
                {busy ? 'Scanning…' : 'Scan My LinkedIn'}
            </button>
        </div>
    );
}
