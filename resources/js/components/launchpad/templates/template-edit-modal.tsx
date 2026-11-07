import { useEffect, useRef, useState } from 'react';
import { toast } from 'sonner';

import {
    createDefaultBoardState,
    TemplateCanvasBoard,
    type CanvasBlockId,
    type CanvasBoardState,
} from '@/components/launchpad/templates/template-canvas-board';
import {
    cloneSampleCv,
    type SampleCv,
} from '@/data/launchpad/sample-cv';
import type { LaunchpadTemplate } from '@/data/launchpad/templates';

type TemplateEditModalProps = {
    template: LaunchpadTemplate;
    onClose: () => void;
};

type EditorTab = 'design' | 'text' | 'uploads' | 'details';

const ZOOM_DEFAULT = 0.55;
const ZOOM_MIN = 0.35;
const ZOOM_MAX = 1.15;
const ZOOM_STEP = 0.1;
const SCALE_MIN = 0.7;
const SCALE_MAX = 1.8;
const SCALE_STEP = 0.1;

const textLayers: Array<{
    id: CanvasBlockId;
    label: string;
    field?: keyof SampleCv;
}> = [
        { id: 'photo', label: 'Photo' },
        { id: 'name', label: 'Name', field: 'name' },
        { id: 'tagline', label: 'Job title', field: 'tagline' },
        { id: 'summary', label: 'Summary', field: 'summary' },
        { id: 'contact', label: 'Contact line' },
        { id: 'experience', label: 'Work history' },
        { id: 'skills', label: 'Skills' },
        { id: 'education', label: 'Education' },
    ];

/**
 * Canva-style customizer: drag, zoom, scale, add image, reset defaults.
 */
export function TemplateEditModal({
    template,
    onClose,
}: TemplateEditModalProps) {
    const fileRef = useRef<HTMLInputElement>(null);
    const [accent, setAccent] = useState(template.colors[0]);
    const [hoverAccent, setHoverAccent] = useState<string | null>(null);
    const [cv, setCv] = useState<SampleCv>(() => cloneSampleCv());
    const [tab, setTab] = useState<EditorTab>('uploads');
    const [selectedBlock, setSelectedBlock] =
        useState<CanvasBlockId>('name');
    const [zoom, setZoom] = useState(ZOOM_DEFAULT);
    const [board, setBoard] = useState<CanvasBoardState>(() =>
        createDefaultBoardState(),
    );
    const activeAccent = hoverAccent ?? accent;

    useEffect(() => {
        const previous = document.body.style.overflow;
        document.body.style.overflow = 'hidden';

        const onKeyDown = (event: KeyboardEvent) => {
            if (event.key === 'Escape') {
                onClose();
            }
        };

        window.addEventListener('keydown', onKeyDown);

        return () => {
            document.body.style.overflow = previous;
            window.removeEventListener('keydown', onKeyDown);
        };
    }, [onClose]);

    const updateField = <K extends keyof SampleCv>(
        key: K,
        value: SampleCv[K],
    ) => {
        setCv((current) => ({ ...current, [key]: value }));
    };

    const bumpZoom = (delta: number) => {
        setZoom((current) =>
            Math.min(ZOOM_MAX, Math.max(ZOOM_MIN, +(current + delta).toFixed(2))),
        );
    };

    const bumpElementScale = (delta: number) => {
        setBoard((current) => {
            const item = current.layout[selectedBlock];
            const nextScale = Math.min(
                SCALE_MAX,
                Math.max(SCALE_MIN, +(item.scale + delta).toFixed(2)),
            );

            return {
                ...current,
                layout: {
                    ...current.layout,
                    [selectedBlock]: { ...item, scale: nextScale },
                },
            };
        });
    };

    const resetDefaults = () => {
        setBoard(createDefaultBoardState());
        setZoom(ZOOM_DEFAULT);
        setAccent(template.colors[0]);
        setCv(cloneSampleCv());
        setSelectedBlock('name');
        toast.message('Defaults restored', {
            description: 'Layout, zoom, colours and sample text reset.',
        });
    };

    const addPhoto = () => {
        setBoard((current) => ({
            ...current,
            photoVisible: true,
        }));
        setSelectedBlock('photo');
        setTab('uploads');
        fileRef.current?.click();
    };

    const onFileChange = (file: File | null) => {
        if (!file) {
            return;
        }

        if (!file.type.startsWith('image/')) {
            toast.message('Choose an image file', {
                description: 'JPG, PNG or WebP work best.',
            });

            return;
        }

        const url = URL.createObjectURL(file);
        setBoard((current) => ({
            ...current,
            photoVisible: true,
            photoUrl: url,
        }));
        setSelectedBlock('photo');
        toast.message('Photo added', {
            description: 'Drag it on the page. Use Size − / + to zoom the photo.',
        });
    };

    const selectedScale = board.layout[selectedBlock]?.scale ?? 1;
    const selectedLayer = textLayers.find(
        (layer) => layer.id === selectedBlock,
    );

    return (
        <div
            className="fixed inset-0 z-[80] flex flex-col bg-[#1f1f1f] text-white"
            role="dialog"
            aria-modal="true"
            aria-labelledby="tmpl-edit-title"
        >
            <input
                ref={fileRef}
                type="file"
                accept="image/*"
                className="hidden"
                onChange={(event) =>
                    onFileChange(event.target.files?.[0] ?? null)
                }
            />

            <header className="flex h-14 shrink-0 items-center gap-2 border-b border-white/10 bg-[#252627] px-3 sm:gap-3 sm:px-4">
                <button
                    type="button"
                    onClick={onClose}
                    className="rounded-lg px-2.5 py-1.5 text-[0.78rem] font-semibold text-white/80 transition hover:bg-white/10 hover:text-white"
                >
                    ← Templates
                </button>
                <div className="hidden h-5 w-px bg-white/15 sm:block" />
                <div className="min-w-0 flex-1">
                    <p className="truncate text-[0.65rem] font-medium tracking-[0.08em] text-[#d4a842] uppercase">
                        Image · zoom · drag
                    </p>
                    <h2
                        id="tmpl-edit-title"
                        className="truncate text-[0.95rem] font-semibold leading-tight"
                    >
                        {template.name}
                    </h2>
                </div>

                <div className="hidden items-center gap-1 rounded-lg bg-white/5 p-1 sm:flex">
                    <ToolbarChip onClick={() => bumpZoom(-ZOOM_STEP)}>
                        Zoom −
                    </ToolbarChip>
                    <span className="min-w-12 text-center font-mono text-[0.7rem] text-white/70">
                        {Math.round(zoom * 100)}%
                    </span>
                    <ToolbarChip onClick={() => bumpZoom(ZOOM_STEP)}>
                        Zoom +
                    </ToolbarChip>
                    <ToolbarChip onClick={() => setZoom(ZOOM_DEFAULT)}>
                        Fit
                    </ToolbarChip>
                </div>

                <div className="hidden items-center gap-1 rounded-lg bg-white/5 p-1 md:flex">
                    <ToolbarChip onClick={() => bumpElementScale(-SCALE_STEP)}>
                        Size −
                    </ToolbarChip>
                    <span className="min-w-12 text-center font-mono text-[0.7rem] text-white/70">
                        {Math.round(selectedScale * 100)}%
                    </span>
                    <ToolbarChip onClick={() => bumpElementScale(SCALE_STEP)}>
                        Size +
                    </ToolbarChip>
                </div>

                <button
                    type="button"
                    className="rounded-lg border border-white/20 px-2.5 py-1.5 text-[0.72rem] font-semibold text-white/85 hover:bg-white/10"
                    onClick={resetDefaults}
                >
                    Defaults
                </button>
                <button
                    type="button"
                    className="rounded-lg bg-[#8b3dff] px-3.5 py-1.5 text-[0.75rem] font-bold text-white hover:bg-[#7a2ff0]"
                    onClick={() =>
                        toast.message('Saved for this demo', {
                            description:
                                'Image, zoom and layout stay in this session.',
                        })
                    }
                >
                    Save
                </button>
            </header>

            <div className="flex min-h-0 flex-1">
                <nav
                    className="flex w-16 shrink-0 flex-col items-center gap-1 border-r border-white/10 bg-[#252627] py-3"
                    aria-label="Editor tools"
                >
                    <ToolButton
                        label="Design"
                        active={tab === 'design'}
                        onClick={() => setTab('design')}
                        icon="◆"
                    />
                    <ToolButton
                        label="Text"
                        active={tab === 'text'}
                        onClick={() => setTab('text')}
                        icon="T"
                    />
                    <ToolButton
                        label="Uploads"
                        active={tab === 'uploads'}
                        onClick={() => setTab('uploads')}
                        icon="⬆"
                    />
                    <ToolButton
                        label="Details"
                        active={tab === 'details'}
                        onClick={() => setTab('details')}
                        icon="☰"
                    />
                </nav>

                <aside className="flex w-[min(100%,300px)] shrink-0 flex-col border-r border-white/10 bg-[#2c2d2e]">
                    <div className="border-b border-white/10 px-4 py-3">
                        <p className="text-[0.8rem] font-bold tracking-wide">
                            {tab === 'design'
                                ? 'Design'
                                : tab === 'text'
                                    ? 'Text'
                                    : tab === 'uploads'
                                        ? 'Uploads'
                                        : 'Details'}
                        </p>
                        <p className="mt-0.5 text-[0.68rem] text-white/55">
                            {tab === 'uploads'
                                ? 'Add a photo, then drag & resize on the page'
                                : tab === 'design'
                                    ? 'Colours and page defaults'
                                    : tab === 'text'
                                        ? 'Select a layer on the canvas'
                                        : 'Contact fields'}
                        </p>
                    </div>

                    <div className="min-h-0 flex-1 overflow-y-auto p-3">
                        {tab === 'design' ? (
                            <div className="space-y-4">
                                <div>
                                    <p className="mb-2 text-[0.68rem] font-semibold tracking-[0.06em] text-white/60 uppercase">
                                        Brand colours
                                    </p>
                                    <div className="grid grid-cols-5 gap-2">
                                        {template.colors.map((swatch) => {
                                            const selected = accent === swatch;

                                            return (
                                                <button
                                                    key={swatch}
                                                    type="button"
                                                    title={swatch}
                                                    aria-pressed={selected}
                                                    onMouseEnter={() =>
                                                        setHoverAccent(swatch)
                                                    }
                                                    onMouseLeave={() =>
                                                        setHoverAccent(null)
                                                    }
                                                    onClick={() =>
                                                        setAccent(swatch)
                                                    }
                                                    className="aspect-square rounded-lg"
                                                    style={{
                                                        backgroundColor: swatch,
                                                        boxShadow: selected
                                                            ? `0 0 0 2px #2c2d2e, 0 0 0 4px ${swatch}`
                                                            : '0 0 0 1px rgba(255,255,255,0.12)',
                                                    }}
                                                />
                                            );
                                        })}
                                    </div>
                                </div>
                                <button
                                    type="button"
                                    onClick={resetDefaults}
                                    className="w-full rounded-xl bg-white/5 px-3 py-2.5 text-left text-[0.78rem] font-semibold hover:bg-white/10"
                                >
                                    Reset to defaults
                                    <span className="mt-0.5 block text-[0.65rem] font-normal text-white/50">
                                        Layout, zoom, photo and sample text
                                    </span>
                                </button>
                            </div>
                        ) : null}

                        {tab === 'uploads' ? (
                            <div className="space-y-3">
                                <button
                                    type="button"
                                    onClick={addPhoto}
                                    className="w-full rounded-xl border border-dashed border-white/25 bg-white/5 px-3 py-6 text-center hover:bg-white/10"
                                >
                                    <span className="block text-2xl">⬆</span>
                                    <span className="mt-2 block text-[0.8rem] font-bold">
                                        Upload image
                                    </span>
                                    <span className="mt-1 block text-[0.65rem] text-white/50">
                                        JPG, PNG, WebP
                                    </span>
                                </button>

                                {board.photoVisible ? (
                                    <div className="rounded-xl bg-black/20 p-3">
                                        <p className="text-[0.72rem] font-semibold">
                                            Photo on page
                                        </p>
                                        <div className="mt-2 flex gap-2">
                                            <button
                                                type="button"
                                                className="flex-1 rounded-lg bg-white/10 py-2 text-[0.7rem] font-semibold"
                                                onClick={() => {
                                                    setSelectedBlock('photo');
                                                    fileRef.current?.click();
                                                }}
                                            >
                                                Replace
                                            </button>
                                            <button
                                                type="button"
                                                className="flex-1 rounded-lg bg-white/10 py-2 text-[0.7rem] font-semibold"
                                                onClick={() => {
                                                    setBoard((current) => ({
                                                        ...current,
                                                        photoVisible: false,
                                                        photoUrl: null,
                                                    }));
                                                    setSelectedBlock('name');
                                                }}
                                            >
                                                Remove
                                            </button>
                                        </div>
                                        <p className="mt-2 text-[0.65rem] text-white/50">
                                            Select the photo, then use Size − /
                                            + to zoom it. Drag to move.
                                        </p>
                                    </div>
                                ) : null}

                                <div className="rounded-xl bg-white/5 p-3 text-[0.7rem] leading-relaxed text-white/55">
                                    Page Zoom changes the whole A4 view. Size
                                    changes only the selected block (great for
                                    photos).
                                </div>
                            </div>
                        ) : null}

                        {tab === 'text' ? (
                            <div className="space-y-2">
                                {textLayers.map((layer) => {
                                    if (
                                        layer.id === 'photo' &&
                                        !board.photoVisible
                                    ) {
                                        return null;
                                    }

                                    const active = selectedBlock === layer.id;

                                    return (
                                        <button
                                            key={layer.id}
                                            type="button"
                                            onClick={() =>
                                                setSelectedBlock(layer.id)
                                            }
                                            className={`w-full rounded-xl px-3 py-2.5 text-left transition ${active
                                                    ? 'bg-[#8b3dff]/25 ring-1 ring-[#8b3dff]/60'
                                                    : 'bg-white/5 hover:bg-white/10'
                                                }`}
                                        >
                                            <span className="block text-[0.78rem] font-semibold">
                                                {layer.label}
                                            </span>
                                            <span className="mt-0.5 block truncate text-[0.68rem] text-white/55">
                                                {layer.field
                                                    ? String(
                                                        cv[layer.field],
                                                    ).slice(0, 42)
                                                    : 'Drag / resize on canvas'}
                                            </span>
                                        </button>
                                    );
                                })}

                                {selectedLayer?.field ? (
                                    <div className="mt-3 rounded-xl bg-black/20 p-3">
                                        <label className="block">
                                            <span className="mb-1.5 block text-[0.68rem] font-semibold tracking-[0.06em] text-white/60 uppercase">
                                                Edit {selectedLayer.label}
                                            </span>
                                            {selectedLayer.field ===
                                                'summary' ? (
                                                <textarea
                                                    rows={5}
                                                    value={cv.summary}
                                                    onChange={(event) =>
                                                        updateField(
                                                            'summary',
                                                            event.target.value,
                                                        )
                                                    }
                                                    className="w-full rounded-lg border border-white/10 bg-[#1f1f1f] px-3 py-2 text-sm text-white outline-none focus:border-[#8b3dff]"
                                                />
                                            ) : (
                                                <input
                                                    type="text"
                                                    value={String(
                                                        cv[selectedLayer.field],
                                                    )}
                                                    onChange={(event) =>
                                                        updateField(
                                                            selectedLayer.field!,
                                                            event.target.value,
                                                        )
                                                    }
                                                    className="w-full rounded-lg border border-white/10 bg-[#1f1f1f] px-3 py-2 text-sm text-white outline-none focus:border-[#8b3dff]"
                                                />
                                            )}
                                        </label>
                                    </div>
                                ) : null}
                            </div>
                        ) : null}

                        {tab === 'details' ? (
                            <div className="space-y-3">
                                {(
                                    [
                                        ['email', 'Email'],
                                        ['phone', 'Phone'],
                                        ['location', 'Location'],
                                        ['linkedin', 'LinkedIn'],
                                    ] as const
                                ).map(([key, label]) => (
                                    <label key={key} className="block">
                                        <span className="mb-1 block text-[0.68rem] font-semibold tracking-[0.06em] text-white/60 uppercase">
                                            {label}
                                        </span>
                                        <input
                                            type="text"
                                            value={cv[key]}
                                            onChange={(event) =>
                                                updateField(
                                                    key,
                                                    event.target.value,
                                                )
                                            }
                                            className="w-full rounded-lg border border-white/10 bg-[#1f1f1f] px-3 py-2 text-sm text-white outline-none focus:border-[#8b3dff]"
                                        />
                                    </label>
                                ))}
                            </div>
                        ) : null}
                    </div>

                    <div className="flex gap-1 border-t border-white/10 p-2 sm:hidden">
                        <ToolbarChip onClick={() => bumpZoom(-ZOOM_STEP)}>
                            Zoom −
                        </ToolbarChip>
                        <ToolbarChip onClick={() => bumpZoom(ZOOM_STEP)}>
                            Zoom +
                        </ToolbarChip>
                        <ToolbarChip
                            onClick={() => bumpElementScale(-SCALE_STEP)}
                        >
                            Size −
                        </ToolbarChip>
                        <ToolbarChip
                            onClick={() => bumpElementScale(SCALE_STEP)}
                        >
                            Size +
                        </ToolbarChip>
                    </div>
                </aside>

                <main className="relative min-w-0 flex-1 overflow-auto bg-[#0e0e0e]">
                    <div
                        className="pointer-events-none absolute inset-0 opacity-[0.35]"
                        style={{
                            backgroundImage:
                                'radial-gradient(circle at 1px 1px, rgba(255,255,255,0.08) 1px, transparent 0)',
                            backgroundSize: '18px 18px',
                        }}
                    />
                    <div className="relative flex min-h-full items-start justify-center px-4 py-8 sm:px-8 sm:py-10">
                        <div>
                            <div className="mb-3 flex items-center justify-between gap-2 text-[0.68rem] text-white/50">
                                <span>Page 1 · A4</span>
                                <span>
                                    Zoom {Math.round(zoom * 100)}% · selected{' '}
                                    {Math.round(selectedScale * 100)}%
                                </span>
                            </div>
                            <div className="overflow-hidden rounded-sm bg-white shadow-[0_20px_60px_rgba(0,0,0,0.55)] ring-1 ring-white/10">
                                <TemplateCanvasBoard
                                    cv={cv}
                                    accent={activeAccent}
                                    selectedId={selectedBlock}
                                    zoom={zoom}
                                    board={board}
                                    onBoardChange={setBoard}
                                    onSelect={(id) => {
                                        setSelectedBlock(id);
                                        if (id === 'photo') {
                                            setTab('uploads');
                                        } else {
                                            setTab('text');
                                        }
                                    }}
                                    onChangeField={(key, value) =>
                                        updateField(key, value)
                                    }
                                />
                            </div>
                            <p className="mt-3 text-center text-[0.7rem] text-white/45">
                                Uploads → add image · Zoom = page · Size =
                                selected block · Defaults = reset
                            </p>
                        </div>
                    </div>
                </main>
            </div>
        </div>
    );
}

function ToolbarChip({
    children,
    onClick,
}: {
    children: string;
    onClick: () => void;
}) {
    return (
        <button
            type="button"
            onClick={onClick}
            className="rounded-md px-2 py-1 text-[0.68rem] font-semibold text-white/80 hover:bg-white/10 hover:text-white"
        >
            {children}
        </button>
    );
}

function ToolButton({
    label,
    active,
    onClick,
    icon,
}: {
    label: string;
    active: boolean;
    onClick: () => void;
    icon: string;
}) {
    return (
        <button
            type="button"
            title={label}
            aria-label={label}
            aria-pressed={active}
            onClick={onClick}
            className={`flex w-14 flex-col items-center gap-1 rounded-xl px-1 py-2 text-[0.58rem] font-semibold transition ${active
                    ? 'bg-white/10 text-white'
                    : 'text-white/55 hover:bg-white/5 hover:text-white/90'
                }`}
        >
            <span
                className={`flex h-8 w-8 items-center justify-center rounded-lg text-sm ${active ? 'bg-[#8b3dff] text-white' : 'bg-white/5'
                    }`}
            >
                {icon}
            </span>
            {label}
        </button>
    );
}
