import { lazy, Suspense, type ReactNode } from 'react';

import { FadeIn } from '@/components/launchpad/reveal';

const AtmosphereScene = lazy(() =>
    import('@/components/launchpad/atmosphere-scene').then((module) => ({
        default: module.AtmosphereScene,
    })),
);

type PageBandProps = {
    children: ReactNode;
    className?: string;
    density?: number;
};

/**
 * Navy marketing band with Three.js atmosphere + fade-in content.
 */
export function PageBand({
    children,
    className = 'py-12 text-center sm:py-14',
    density = 1,
}: PageBandProps) {
    return (
        <section
            className={`bg-lp-navy relative isolate overflow-hidden ${className}`}
        >
            <Suspense fallback={null}>
                <AtmosphereScene density={density} />
            </Suspense>
            <div
                className="pointer-events-none absolute inset-0 -z-10 opacity-55"
                style={{
                    background:
                        'radial-gradient(ellipse at 70% 0%, rgba(184,148,63,0.16), transparent 48%), radial-gradient(ellipse at 10% 100%, rgba(61,122,85,0.1), transparent 40%)',
                }}
            />
            <div className="container relative z-10">
                <FadeIn>{children}</FadeIn>
            </div>
        </section>
    );
}
