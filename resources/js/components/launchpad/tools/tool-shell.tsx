import { Upload } from 'lucide-react';
import { useState, type ReactNode } from 'react';
import { toast } from 'sonner';

type ToolShellProps = {
    title: string;
    description: string;
    actionLabel?: string;
    result?: ReactNode;
    onAnalyze?: (payload: {
        fileName: string;
        rawText: string;
    }) => Promise<ReactNode>;
};

function csrfToken(): string {
    return (
        (
            window.document.querySelector(
                'meta[name="csrf-token"]',
            ) as HTMLMetaElement | null
        )?.content ?? ''
    );
}

export async function postToolJson<T>(url: string, body: unknown): Promise<T> {
    const response = await fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json',
            'X-Requested-With': 'XMLHttpRequest',
            'X-CSRF-TOKEN': csrfToken(),
        },
        body: JSON.stringify(body),
    });

    if (!response.ok) {
        throw new Error('Tool request failed');
    }

    return (await response.json()) as T;
}

export function ToolShell({
    title,
    description,
    actionLabel = 'Run scan',
    result,
    onAnalyze,
}: ToolShellProps) {
    const [fileName, setFileName] = useState<string | null>(null);
    const [rawText, setRawText] = useState('');
    const [processing, setProcessing] = useState(false);
    const [liveResult, setLiveResult] = useState<ReactNode>(null);

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
                    TXT works best in-browser · PDF/DOCX use filename + paste fallback
                </span>
                <input
                    type="file"
                    className="hidden"
                    accept=".pdf,.doc,.docx,.txt"
                    onChange={async (event) => {
                        const file = event.target.files?.[0];

                        if (!file) {
                            return;
                        }

                        setFileName(file.name);
                        setLiveResult(null);

                        const isPlain =
                            file.type.startsWith('text/') ||
                            file.name.toLowerCase().endsWith('.txt');

                        if (isPlain) {
                            try {
                                const text = await file.text();
                                setRawText(text.slice(0, 12000));

                                return;
                            } catch {
                                // fall through
                            }
                        }

                        setRawText(
                            [
                                `Uploaded file: ${file.name}.`,
                                'Paste CV text below for a more accurate scan when PDF/DOCX binary cannot be parsed in-browser.',
                                file.name
                                    .replace(/\.[^.]+$/, '')
                                    .replace(/[-_]+/g, ' '),
                            ].join(' '),
                        );
                    }}
                />
            </label>

            <label className="mt-3 block text-sm">
                <span className="text-lp-navy mb-1 block font-semibold">
                    Or paste CV / profile text
                </span>
                <textarea
                    rows={4}
                    className="w-full rounded border border-[var(--lp-border)] px-3 py-2 text-sm"
                    value={rawText}
                    onChange={(event) => setRawText(event.target.value)}
                    placeholder="Paste text extracted from your CV…"
                />
            </label>

            <button
                type="button"
                className="btn-lp-navy mt-4 px-5 py-2.5 text-sm disabled:opacity-40"
                disabled={(!fileName && !rawText.trim()) || processing}
                onClick={() => {
                    void (async () => {
                        setProcessing(true);

                        try {
                            if (onAnalyze) {
                                const node = await onAnalyze({
                                    fileName: fileName ?? 'pasted-text',
                                    rawText,
                                });
                                setLiveResult(node);
                            } else {
                                setLiveResult(result ?? null);
                            }

                            toast.success('Analysis complete');
                        } catch {
                            toast.error('Could not analyse that document');
                        } finally {
                            setProcessing(false);
                        }
                    })();
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

            {liveResult ? (
                <div className="mt-4 rounded-lg border border-emerald-200 bg-emerald-50 p-4">
                    {liveResult}
                </div>
            ) : null}
        </div>
    );
}
