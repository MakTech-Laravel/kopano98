import { useEffect, useRef } from 'react';

/**
 * Animated LinkedIn “Save to PDF” walkthrough — matches Compressed
 * #lif-demo-root + css/styles.css .li2-* + js/linkedin-demo.js.
 */
export function LinkedInHowtoDemo() {
    const rootRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const root = rootRef.current;

        if (!root) {
            return;
        }

        const q = (key: string) =>
            root.querySelector(`[data-demo="${key}"]`) as HTMLElement | null;

        const wrap = q('wrap');
        const cursor = q('cursor');
        const dots = q('dots');
        const dotsGlyph = dots?.querySelector(
            '.li2-mock-more-dots',
        ) as HTMLElement | null;
        const dropdown = q('dropdown');
        const save = q('save');
        const name = q('name');
        const dlIcon = q('dl-icon');
        const dlToast = q('dl-toast');

        if (
            !wrap ||
            !cursor ||
            !dots ||
            !dotsGlyph ||
            !dropdown ||
            !save ||
            !name ||
            !dlIcon ||
            !dlToast
        ) {
            return;
        }

        const tipX = 1.5;
        const tipY = 1.5;
        const pos = {
            start: { x: 38, y: 12 },
            dots: { x: 96, y: 56 },
            save: { x: 100, y: 92 },
        };

        const timers: number[] = [];
        let intervalId: number | null = null;
        let cancelled = false;

        const measure = (): boolean => {
            const wr = wrap.getBoundingClientRect();

            if (wr.width === 0) {
                return false;
            }

            const nr = name.getBoundingClientRect();
            const dgr = dotsGlyph.getBoundingClientRect();
            const sr = save.getBoundingClientRect();

            pos.start.x = nr.right - wr.left + 3;
            pos.start.y = nr.top - wr.top + nr.height / 2 - tipY;
            pos.dots.x = dgr.left - wr.left + dgr.width / 2 - tipX;
            pos.dots.y = dgr.top - wr.top + dgr.height / 2 - tipY;
            pos.save.x = sr.left - wr.left + sr.width / 2 - tipX;
            pos.save.y = sr.top - wr.top + sr.height / 2 - tipY;

            return true;
        };

        const clearTimers = () => {
            timers.forEach((id) => window.clearTimeout(id));
            timers.length = 0;
        };

        const at = (ms: number, fn: () => void) => {
            timers.push(window.setTimeout(fn, ms));
        };

        const moveTo = (p: { x: number; y: number }) => {
            cursor.style.transform = `translate(${p.x}px, ${p.y}px)`;
        };

        const resetVisual = () => {
            moveTo(pos.start);
            dots.classList.remove('li2-demo-clicked');
            dropdown.classList.remove('li2-demo-open');
            save.classList.remove('li2-demo-hover', 'li2-demo-click');
            dlIcon.classList.remove('li2-demo-show', 'li2-demo-done');
            dlToast.classList.remove('li2-demo-show');
        };

        const playOnce = () => {
            clearTimers();
            measure();
            resetVisual();
            at(150, () => moveTo(pos.dots));
            at(900, () => dots.classList.add('li2-demo-clicked'));
            at(1050, () => {
                dots.classList.remove('li2-demo-clicked');
                dropdown.classList.add('li2-demo-open');
            });
            at(1300, () => moveTo(pos.save));
            at(2050, () => save.classList.add('li2-demo-hover'));
            at(2700, () => save.classList.add('li2-demo-click'));
            at(2850, () => {
                save.classList.remove('li2-demo-hover', 'li2-demo-click');
                dropdown.classList.remove('li2-demo-open');
                moveTo(pos.start);
                dlIcon.classList.add('li2-demo-show');
            });
            at(3550, () => dlIcon.classList.add('li2-demo-done'));
            at(4200, () =>
                dlIcon.classList.remove('li2-demo-show', 'li2-demo-done'),
            );
            at(4500, () => dlToast.classList.add('li2-demo-show'));
            at(5200, () => dlToast.classList.remove('li2-demo-show'));
        };

        const onResize = () => {
            if (!cancelled) {
                measure();
            }
        };

        window.addEventListener('resize', onResize);

        let attempts = 0;

        const attemptStart = () => {
            if (cancelled) {
                return;
            }

            attempts += 1;

            if (!measure()) {
                if (attempts < 10) {
                    window.setTimeout(attemptStart, 200);
                }

                return;
            }

            playOnce();
            intervalId = window.setInterval(playOnce, 5600);
        };

        requestAnimationFrame(() => {
            requestAnimationFrame(attemptStart);
        });

        return () => {
            cancelled = true;
            window.removeEventListener('resize', onResize);
            clearTimers();

            if (intervalId !== null) {
                window.clearInterval(intervalId);
            }
        };
    }, []);

    return (
        <div className="li2-browser-window" ref={rootRef}>
            <div className="li2-mock-browserbar">
                <span className="dot" />
                <span className="dot" />
                <span className="dot" />
                <div className="urlpill">
                    <span style={{ color: '#16a34a' }} />
                    linkedin.com/in/sipho-matlala
                </div>
                <div className="li2-dl-icon" data-demo="dl-icon">
                    <span className="dl-arrow">↓</span>
                    <span className="dl-check">✓</span>
                </div>
            </div>
            <div className="li2-dl-toast" data-demo="dl-toast">
                <span className="chk">✓</span>
                sipho-matlala.pdf saved
            </div>
            <div className="li2-anim-wrap" data-demo="wrap">
                <div
                    className="li2-mock-profile"
                    style={{ borderRadius: '0 0 8px 8px' }}
                >
                    <div
                        className="li2-mock-top"
                        style={{
                            borderRadius: 0,
                            position: 'relative',
                            overflow: 'hidden',
                        }}
                    >
                        <div className="li2-mock-logo">in</div>
                        <img
                            src="/images/launchpad/tools/li-banner.jpg"
                            alt=""
                            loading="lazy"
                            style={{
                                position: 'absolute',
                                top: 0,
                                bottom: 0,
                                right: 0,
                                left: '32%',
                                width: '68%',
                                height: '100%',
                                objectFit: 'cover',
                                display: 'block',
                            }}
                        />
                    </div>
                    <div className="li2-mock-avatar">
                        <img
                            src="/images/launchpad/tools/li-avatar.jpg"
                            alt=""
                            loading="lazy"
                            style={{
                                width: '100%',
                                height: '100%',
                                objectFit: 'cover',
                                display: 'block',
                            }}
                        />
                    </div>
                    <div className="li2-mock-name">
                        <span data-demo="name">Sipho Matlala</span>
                    </div>
                    <div className="li2-mock-headline">
                        Candidate QS | SACPCMP Registered | BOQ &amp; Cost
                        Management
                    </div>
                    <div className="li2-mock-actions">
                        <div className="li2-mock-btn">Connect</div>
                        <div className="li2-mock-btn">Message</div>
                        <div className="li2-mock-more" data-demo="dots">
                            <span className="li2-mock-more-dots">•••</span>
                            <div
                                className="li2-mock-dropdown"
                                data-demo="dropdown"
                            >
                                <div className="li2-mock-drop-item">
                                    <span className="ic">✉</span>
                                    Send profile in a message
                                </div>
                                <div
                                    className="li2-mock-drop-item li2-save-el"
                                    data-demo="save"
                                >
                                    <span className="ic">↓</span>
                                    Save to PDF
                                </div>
                                <div className="li2-mock-drop-item">
                                    <span className="ic" />
                                    Saved items
                                </div>
                                <div className="li2-mock-drop-item">
                                    <span className="ic" />
                                    Activity
                                </div>
                                <div className="li2-mock-drop-item">
                                    <span className="ic">ℹ</span>
                                    About this member
                                </div>
                            </div>
                        </div>
                    </div>
                    <div
                        style={{
                            padding: '3px 10px 7px',
                            borderTop: '1px solid #f1f5f9',
                            marginTop: 2,
                        }}
                    >
                        <div
                            style={{
                                fontSize: '.52rem',
                                fontWeight: 700,
                                color: '#4b5563',
                                marginBottom: 2,
                            }}
                        >
                            About
                        </div>
                        <div
                            style={{
                                fontSize: '.5rem',
                                color: '#6b7280',
                                lineHeight: 1.4,
                            }}
                        >
                            Candidate QS with experience in BOQ preparation,
                            cost planning and valuations across residential and
                            civil projects in South Africa…
                        </div>
                    </div>
                </div>
                <div className="li2-cursor" data-demo="cursor" />
            </div>
        </div>
    );
}
