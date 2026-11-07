import {
    useEffect,
    useRef,
    useState,
    type CSSProperties,
    type PointerEvent as ReactPointerEvent,
    type ReactNode,
    type RefObject,
} from 'react';

import {
    sampleContactLine,
    type SampleCv,
} from '@/data/launchpad/sample-cv';

export type CanvasBlockId =
    | 'photo'
    | 'name'
    | 'tagline'
    | 'contact'
    | 'summary'
    | 'experience'
    | 'skills'
    | 'education'
    | 'languages'
    | 'certs'
    | 'references';

export type BlockPos = { x: number; y: number; w: number; scale: number };

export type CanvasBoardState = {
    layout: Record<CanvasBlockId, BlockPos>;
    photoUrl: string | null;
    photoVisible: boolean;
};

type TemplateCanvasBoardProps = {
    cv: SampleCv;
    accent: string;
    selectedId: CanvasBlockId | null;
    zoom: number;
    board: CanvasBoardState;
    onBoardChange: (board: CanvasBoardState) => void;
    onSelect: (id: CanvasBlockId) => void;
    onChangeField: (key: keyof SampleCv, value: string) => void;
};

export const PAGE_W = 794;
export const PAGE_H = 1123;

export const defaultCanvasLayout: Record<CanvasBlockId, BlockPos> = {
    photo: { x: 650, y: 40, w: 96, scale: 1 },
    name: { x: 56, y: 48, w: 560, scale: 1 },
    tagline: { x: 56, y: 98, w: 560, scale: 1 },
    contact: { x: 56, y: 132, w: 682, scale: 1 },
    summary: { x: 56, y: 180, w: 682, scale: 1 },
    experience: { x: 56, y: 310, w: 682, scale: 1 },
    skills: { x: 56, y: 560, w: 682, scale: 1 },
    education: { x: 56, y: 680, w: 682, scale: 1 },
    languages: { x: 56, y: 760, w: 682, scale: 1 },
    certs: { x: 56, y: 820, w: 682, scale: 1 },
    references: { x: 56, y: 880, w: 682, scale: 1 },
};

export function createDefaultBoardState(): CanvasBoardState {
    return {
        layout: structuredClone(defaultCanvasLayout),
        photoUrl: null,
        photoVisible: false,
    };
}

type DragState = {
    id: CanvasBlockId;
    startX: number;
    startY: number;
    origX: number;
    origY: number;
};

/**
 * Canva-like A4 board: drag blocks, zoom page, scale photo/text, add image.
 */
export function TemplateCanvasBoard({
    cv,
    accent,
    selectedId,
    zoom,
    board,
    onBoardChange,
    onSelect,
    onChangeField,
}: TemplateCanvasBoardProps) {
    const [drag, setDrag] = useState<DragState | null>(null);
    const [editingId, setEditingId] = useState<CanvasBlockId | null>(null);
    const { layout, photoUrl, photoVisible } = board;

    const boardRef = useRef(board);
    boardRef.current = board;

    useEffect(() => {
        if (!drag) {
            return;
        }

        const onMove = (event: PointerEvent) => {
            const currentBoard = boardRef.current;
            const item = currentBoard.layout[drag.id];
            const width = item.w * item.scale;
            const dx = (event.clientX - drag.startX) / zoom;
            const dy = (event.clientY - drag.startY) / zoom;

            onBoardChange({
                ...currentBoard,
                layout: {
                    ...currentBoard.layout,
                    [drag.id]: {
                        ...item,
                        x: Math.max(
                            8,
                            Math.min(PAGE_W - width - 8, drag.origX + dx),
                        ),
                        y: Math.max(8, Math.min(PAGE_H - 40, drag.origY + dy)),
                    },
                },
            });
        };

        const onUp = () => setDrag(null);

        window.addEventListener('pointermove', onMove);
        window.addEventListener('pointerup', onUp);

        return () => {
            window.removeEventListener('pointermove', onMove);
            window.removeEventListener('pointerup', onUp);
        };
    }, [drag, zoom, onBoardChange]);

    const startDrag = (
        event: ReactPointerEvent,
        id: CanvasBlockId,
    ) => {
        if (editingId === id) {
            return;
        }

        event.preventDefault();
        event.stopPropagation();
        onSelect(id);
        setEditingId(null);
        setDrag({
            id,
            startX: event.clientX,
            startY: event.clientY,
            origX: layout[id].x,
            origY: layout[id].y,
        });
    };

    const block = (id: CanvasBlockId) => layout[id];

    return (
        <div
            className="relative overflow-hidden bg-white"
            style={{
                width: PAGE_W * zoom,
                height: PAGE_H * zoom,
            }}
            onPointerDown={() => {
                setEditingId(null);
            }}
        >
            <div
                className="origin-top-left select-none"
                style={{
                    width: PAGE_W,
                    height: PAGE_H,
                    transform: `scale(${zoom})`,
                }}
            >
                {photoVisible ? (
                    <CanvasBlock
                        id="photo"
                        pos={block('photo')}
                        selected={selectedId === 'photo'}
                        editing={false}
                        dragging={drag?.id === 'photo'}
                        onPointerDown={startDrag}
                        onDoubleClick={() => onSelect('photo')}
                    >
                        <div
                            className="overflow-hidden rounded-md border border-slate-200 bg-slate-100"
                            style={{
                                width: block('photo').w,
                                height: block('photo').w,
                                transform: `scale(${block('photo').scale})`,
                                transformOrigin: 'top left',
                            }}
                        >
                            {photoUrl ? (
                                <img
                                    src={photoUrl}
                                    alt="CV photo"
                                    className="h-full w-full object-cover"
                                    draggable={false}
                                />
                            ) : (
                                <div
                                    className="flex h-full w-full flex-col items-center justify-center gap-1 text-[10px] font-semibold"
                                    style={{ color: accent }}
                                >
                                    <span className="text-lg">👤</span>
                                    Photo
                                </div>
                            )}
                        </div>
                    </CanvasBlock>
                ) : null}

                <CanvasBlock
                    id="name"
                    pos={block('name')}
                    selected={selectedId === 'name'}
                    editing={editingId === 'name'}
                    dragging={drag?.id === 'name'}
                    onPointerDown={startDrag}
                    onDoubleClick={() => {
                        onSelect('name');
                        setEditingId('name');
                    }}
                >
                    <div
                        style={{
                            transform: `scale(${block('name').scale})`,
                            transformOrigin: 'top left',
                            width: block('name').w,
                        }}
                    >
                        {editingId === 'name' ? (
                            <EditableText
                                value={cv.name}
                                className="w-full bg-transparent font-[family-name:var(--font-lp-display)] text-[34px] leading-none font-bold outline-none"
                                style={{ color: accent }}
                                onChange={(value) =>
                                    onChangeField('name', value)
                                }
                                onDone={() => setEditingId(null)}
                            />
                        ) : (
                            <p
                                className="font-[family-name:var(--font-lp-display)] text-[34px] leading-none font-bold"
                                style={{ color: accent }}
                            >
                                {cv.name}
                            </p>
                        )}
                    </div>
                </CanvasBlock>

                <CanvasBlock
                    id="tagline"
                    pos={block('tagline')}
                    selected={selectedId === 'tagline'}
                    editing={editingId === 'tagline'}
                    dragging={drag?.id === 'tagline'}
                    onPointerDown={startDrag}
                    onDoubleClick={() => {
                        onSelect('tagline');
                        setEditingId('tagline');
                    }}
                >
                    <div
                        style={{
                            transform: `scale(${block('tagline').scale})`,
                            transformOrigin: 'top left',
                            width: block('tagline').w,
                        }}
                    >
                        {editingId === 'tagline' ? (
                            <EditableText
                                value={cv.tagline}
                                className="w-full bg-transparent text-[13px] font-semibold tracking-[0.14em] text-slate-600 uppercase outline-none"
                                onChange={(value) =>
                                    onChangeField('tagline', value)
                                }
                                onDone={() => setEditingId(null)}
                            />
                        ) : (
                            <p className="text-[13px] font-semibold tracking-[0.14em] text-slate-600 uppercase">
                                {cv.tagline}
                            </p>
                        )}
                    </div>
                </CanvasBlock>

                <CanvasBlock
                    id="contact"
                    pos={block('contact')}
                    selected={selectedId === 'contact'}
                    editing={false}
                    dragging={drag?.id === 'contact'}
                    onPointerDown={startDrag}
                    onDoubleClick={() => onSelect('contact')}
                >
                    <div
                        className="border-t border-slate-200 pt-2 text-[10px] text-slate-500"
                        style={{
                            transform: `scale(${block('contact').scale})`,
                            transformOrigin: 'top left',
                            width: block('contact').w,
                        }}
                    >
                        {sampleContactLine(cv)}
                    </div>
                </CanvasBlock>

                <CanvasBlock
                    id="summary"
                    pos={block('summary')}
                    selected={selectedId === 'summary'}
                    editing={editingId === 'summary'}
                    dragging={drag?.id === 'summary'}
                    onPointerDown={startDrag}
                    onDoubleClick={() => {
                        onSelect('summary');
                        setEditingId('summary');
                    }}
                >
                    <div
                        style={{
                            transform: `scale(${block('summary').scale})`,
                            transformOrigin: 'top left',
                            width: block('summary').w,
                        }}
                    >
                        <SectionLabel accent={accent}>
                            Professional Summary
                        </SectionLabel>
                        {editingId === 'summary' ? (
                            <EditableText
                                value={cv.summary}
                                multiline
                                className="mt-1 w-full bg-transparent text-[11px] leading-relaxed text-slate-700 outline-none"
                                onChange={(value) =>
                                    onChangeField('summary', value)
                                }
                                onDone={() => setEditingId(null)}
                            />
                        ) : (
                            <p className="mt-1 text-[11px] leading-relaxed text-slate-700">
                                {cv.summary}
                            </p>
                        )}
                    </div>
                </CanvasBlock>

                <CanvasBlock
                    id="experience"
                    pos={block('experience')}
                    selected={selectedId === 'experience'}
                    editing={false}
                    dragging={drag?.id === 'experience'}
                    onPointerDown={startDrag}
                    onDoubleClick={() => onSelect('experience')}
                >
                    <ScaledSection
                        pos={block('experience')}
                        accent={accent}
                        title="Work History"
                    >
                        <div className="mt-2 space-y-3">
                            {cv.roles.map((role) => (
                                <div key={role.title + role.dates}>
                                    <div className="flex items-baseline justify-between gap-2">
                                        <p className="text-[12px] font-bold text-slate-800">
                                            {role.title}
                                        </p>
                                        <p className="text-[10px] text-slate-500">
                                            {role.dates}
                                        </p>
                                    </div>
                                    <p className="text-[10px] text-slate-500">
                                        {role.company}
                                    </p>
                                    <ul className="mt-1 space-y-0.5">
                                        {role.bullets.map((bullet) => (
                                            <li
                                                key={bullet}
                                                className="flex gap-1.5 text-[10px] leading-snug text-slate-700"
                                            >
                                                <span style={{ color: accent }}>
                                                    •
                                                </span>
                                                <span>{bullet}</span>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            ))}
                        </div>
                    </ScaledSection>
                </CanvasBlock>

                <CanvasBlock
                    id="skills"
                    pos={block('skills')}
                    selected={selectedId === 'skills'}
                    editing={false}
                    dragging={drag?.id === 'skills'}
                    onPointerDown={startDrag}
                    onDoubleClick={() => onSelect('skills')}
                >
                    <ScaledSection
                        pos={block('skills')}
                        accent={accent}
                        title="Skills"
                    >
                        <div className="mt-2 grid grid-cols-2 gap-x-4 gap-y-1">
                            {cv.skills.map((skill) => (
                                <p
                                    key={skill}
                                    className="flex gap-1.5 text-[10px] text-slate-700"
                                >
                                    <span style={{ color: accent }}>•</span>
                                    {skill}
                                </p>
                            ))}
                        </div>
                    </ScaledSection>
                </CanvasBlock>

                <CanvasBlock
                    id="education"
                    pos={block('education')}
                    selected={selectedId === 'education'}
                    editing={false}
                    dragging={drag?.id === 'education'}
                    onPointerDown={startDrag}
                    onDoubleClick={() => onSelect('education')}
                >
                    <ScaledSection
                        pos={block('education')}
                        accent={accent}
                        title="Education"
                    >
                        {cv.education.map((item) => (
                            <div key={item.qualification} className="mt-1">
                                <p className="text-[11px] font-bold text-slate-800">
                                    {item.qualification}
                                </p>
                                <p className="text-[10px] text-slate-500">
                                    {item.institution} · {item.year}
                                </p>
                            </div>
                        ))}
                    </ScaledSection>
                </CanvasBlock>

                <CanvasBlock
                    id="languages"
                    pos={block('languages')}
                    selected={selectedId === 'languages'}
                    editing={false}
                    dragging={drag?.id === 'languages'}
                    onPointerDown={startDrag}
                    onDoubleClick={() => onSelect('languages')}
                >
                    <ScaledSection
                        pos={block('languages')}
                        accent={accent}
                        title="Languages"
                    >
                        {cv.languages.map((lang) => (
                            <p
                                key={lang.name}
                                className="mt-1 text-[10px] text-slate-700"
                            >
                                <span className="font-semibold">
                                    {lang.name}
                                </span>
                                <span className="text-slate-500">
                                    {' '}
                                    — {lang.level}
                                </span>
                            </p>
                        ))}
                    </ScaledSection>
                </CanvasBlock>

                <CanvasBlock
                    id="certs"
                    pos={block('certs')}
                    selected={selectedId === 'certs'}
                    editing={false}
                    dragging={drag?.id === 'certs'}
                    onPointerDown={startDrag}
                    onDoubleClick={() => onSelect('certs')}
                >
                    <ScaledSection
                        pos={block('certs')}
                        accent={accent}
                        title="Certifications"
                    >
                        {cv.certifications.map((cert) => (
                            <p
                                key={cert}
                                className="mt-1 flex gap-1.5 text-[10px] text-slate-700"
                            >
                                <span style={{ color: accent }}>•</span>
                                {cert}
                            </p>
                        ))}
                    </ScaledSection>
                </CanvasBlock>

                <CanvasBlock
                    id="references"
                    pos={block('references')}
                    selected={selectedId === 'references'}
                    editing={false}
                    dragging={drag?.id === 'references'}
                    onPointerDown={startDrag}
                    onDoubleClick={() => onSelect('references')}
                >
                    <ScaledSection
                        pos={block('references')}
                        accent={accent}
                        title="References"
                    >
                        {cv.references.map((ref) => (
                            <p
                                key={ref.name}
                                className="mt-1 text-[10px] text-slate-700"
                            >
                                <span className="font-semibold">
                                    {ref.name}
                                </span>
                                {' | '}
                                {ref.relationship}
                                {' | '}
                                {ref.phone}
                            </p>
                        ))}
                    </ScaledSection>
                </CanvasBlock>
            </div>
        </div>
    );
}

function ScaledSection({
    pos,
    accent,
    title,
    children,
}: {
    pos: BlockPos;
    accent: string;
    title: string;
    children: ReactNode;
}) {
    return (
        <div
            style={{
                transform: `scale(${pos.scale})`,
                transformOrigin: 'top left',
                width: pos.w,
            }}
        >
            <SectionLabel accent={accent}>{title}</SectionLabel>
            {children}
        </div>
    );
}

function SectionLabel({
    accent,
    children,
}: {
    accent: string;
    children: string;
}) {
    return (
        <div>
            <div
                className="text-[10px] font-bold tracking-[0.12em] uppercase"
                style={{ color: accent }}
            >
                {children}
            </div>
            <div
                className="mt-0.5 h-px w-full"
                style={{ backgroundColor: `${accent}40` }}
            />
        </div>
    );
}

function CanvasBlock({
    id,
    pos,
    selected,
    editing,
    dragging,
    onPointerDown,
    onDoubleClick,
    children,
}: {
    id: CanvasBlockId;
    pos: BlockPos;
    selected: boolean;
    editing: boolean;
    dragging: boolean;
    onPointerDown: (event: ReactPointerEvent, id: CanvasBlockId) => void;
    onDoubleClick: () => void;
    children: ReactNode;
}) {
    return (
        <div
            data-block={id}
            className={`absolute rounded-sm px-1 py-1 ${selected
                    ? 'ring-2 ring-[#8b3dff] ring-offset-1'
                    : 'hover:ring-1 hover:ring-[#8b3dff]/40'
                } ${dragging ? 'cursor-grabbing z-20' : 'cursor-grab z-10'} ${editing ? 'cursor-text z-30' : ''
                }`}
            style={{
                left: pos.x,
                top: pos.y,
                touchAction: 'none',
            }}
            onPointerDown={(event) => {
                event.stopPropagation();
                onPointerDown(event, id);
            }}
            onDoubleClick={(event) => {
                event.stopPropagation();
                onDoubleClick();
            }}
        >
            {selected && !editing ? (
                <span className="pointer-events-none absolute -top-5 left-0 rounded bg-[#8b3dff] px-1.5 py-0.5 text-[9px] font-bold tracking-wide text-white uppercase">
                    Drag · size ± in toolbar
                </span>
            ) : null}
            {children}
        </div>
    );
}

function EditableText({
    value,
    onChange,
    onDone,
    className,
    style,
    multiline = false,
}: {
    value: string;
    onChange: (value: string) => void;
    onDone: () => void;
    className?: string;
    style?: CSSProperties;
    multiline?: boolean;
}) {
    const textAreaRef = useRef<HTMLTextAreaElement>(null);
    const inputRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
        const node = multiline ? textAreaRef.current : inputRef.current;
        node?.focus();
        node?.select();
    }, [multiline]);

    if (multiline) {
        return (
            <textarea
                ref={textAreaRef as RefObject<HTMLTextAreaElement>}
                value={value}
                rows={4}
                className={className}
                style={style}
                onChange={(event) => onChange(event.target.value)}
                onBlur={onDone}
                onKeyDown={(event) => {
                    if (event.key === 'Escape') {
                        onDone();
                    }
                }}
                onPointerDown={(event) => event.stopPropagation()}
            />
        );
    }

    return (
        <input
            ref={inputRef as RefObject<HTMLInputElement>}
            type="text"
            value={value}
            className={className}
            style={style}
            onChange={(event) => onChange(event.target.value)}
            onBlur={onDone}
            onKeyDown={(event) => {
                if (event.key === 'Enter' || event.key === 'Escape') {
                    onDone();
                }
            }}
            onPointerDown={(event) => event.stopPropagation()}
        />
    );
}
