import type { ReactNode } from 'react';

type SectionHeadingProps = {
    label?: string;
    title: ReactNode;
    subtitle?: string;
    className?: string;
};

export function SectionHeading({
    label,
    title,
    subtitle,
    className = '',
}: SectionHeadingProps) {
    return (
        <div className={`mb-8 max-w-xl ${className}`}>
            {label ? (
                <p className="mb-2 text-[0.7rem] font-medium tracking-[0.08em] text-[var(--lp-gold-on-light)] uppercase">
                    {label}
                </p>
            ) : null}
            <h2 className="font-lp-display text-lp-navy text-[clamp(1.65rem,4vw,2.35rem)] leading-[1.15]">
                {title}
            </h2>
            {subtitle ? (
                <p className="text-lp-mid mt-2.5 text-[0.92rem] leading-relaxed text-pretty">
                    {subtitle}
                </p>
            ) : null}
        </div>
    );
}
