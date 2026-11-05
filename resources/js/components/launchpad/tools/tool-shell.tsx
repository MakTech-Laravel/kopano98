import { Upload } from 'lucide-react';
import { useState, type ReactNode } from 'react';
import { toast } from 'sonner';

type ToolShellProps = {
    title: string;
    description: string;
    actionLabel?: string;
    result?: ReactNode;
};

export function ToolShell({
    title,
    description,
    actionLabel = 'Run scan (demo)',
    result,
}: ToolShellProps) {
    const [fileName, setFileName] = useState<string | null>(null);
    const [processing, setProcessing] = useState(false);
    const [showResult, setShowResult] = useState(false);

    return (
        <div className="rounded-lg border border-[var(--lp-border)] bg-white p-5">
            <h3 className="text-lp-navy mb-1 text-base font-bold">{title}</h3>
            <p className="text-lp-mid mb-4 text-sm">{description}</p>

            <label className="flex cursor-pointer flex-col items-center justify-center rounded-lg border-[1.5px] border-dashed border-[var(--lp-border)] bg-[var(--lp-off)] px-4 py-8 transition hover:border-[var(--lp-gold)]">
                <Upload className="text-lp-mid mb-2 h-7 w-7" />
                <span className="text-lp-navy text-sm font-semibold">
                    {fileName ?? 'Drop your file here or click to upload'}
                </span>
                <span className="text-lp-light mt-1 text-xs">
                    PDF or DOCX · UI demo only
                </span>
                <input
                    type="file"
                    className="hidden"
                    accept=".pdf,.doc,.docx"
                    onChange={(event) => {
                        const file = event.target.files?.[0];
                        if (file) {
                            setFileName(file.name);
                            setShowResult(false);
                        }
                    }}
                />
            </label>

            <button
                type="button"
                className="btn-lp-navy mt-4 px-5 py-2.5 text-sm disabled:opacity-40"
                disabled={!fileName || processing}
                onClick={() => {
                    setProcessing(true);
                    window.setTimeout(() => {
                        setProcessing(false);
                        setShowResult(true);
                        toast.message('Demo result ready', {
                            description:
                                'Real AI/CV processing ships in Milestone 2.',
                        });
                    }, 1200);
                }}
            >
                {processing ? 'Scanning…' : actionLabel}
            </button>

            {processing ? (
                <div className="mt-4 space-y-2">
                    <div className="h-1 overflow-hidden rounded bg-[var(--lp-border)]">
                        <div className="h-full w-2/3 animate-pulse bg-[var(--lp-navy-3)]/40" />
                    </div>
                    <p className="text-lp-light text-xs">Analysing document…</p>
                </div>
            ) : null}

            {showResult ? (
                <div className="mt-4 rounded-lg border border-emerald-200 bg-emerald-50 p-4">
                    {result ?? (
                        <div>
                            <p className="text-sm font-bold text-emerald-800">
                                Sample ATS match: 78/100
                            </p>
                            <p className="mt-1 text-xs text-emerald-700">
                                Placeholder score — connect backend in Milestone
                                2 for live parsing.
                            </p>
                        </div>
                    )}
                </div>
            ) : null}
        </div>
    );
}
