import { Head } from '@inertiajs/react';
import type { ReactNode } from 'react';

import { FadeIn, Reveal } from '@/components/launchpad/reveal';
import {
    launchpadTermsSections,
    renderTermsBody,
} from '@/data/launchpad/terms';
import LaunchpadLayout from '@/layouts/launchpad-layout';

function formatInline(text: string): ReactNode[] {
    const parts = text.split(/(\*\*[^*]+\*\*)/g);

    return parts.map((part, index) => {
        if (part.startsWith('**') && part.endsWith('**')) {
            return (
                <strong key={index} className="text-lp-navy font-semibold">
                    {part.slice(2, -2)}
                </strong>
            );
        }

        return <span key={index}>{part}</span>;
    });
}

export default function Terms() {
    return (
        <LaunchpadLayout>
            <Head title="Terms & Conditions | Launchpad Careers" />

            <article className="bg-white py-10 sm:py-12">
                <div className="container max-w-[960px]">
                    <FadeIn>
                        <p className="mb-2 text-[0.68rem] font-bold tracking-[0.14em] text-[var(--lp-gold-on-light-sm)] uppercase">
                            Legal
                        </p>
                        <h1 className="font-lp-display text-lp-navy mb-3 text-[clamp(1.5rem,4vw,2.2rem)] font-bold">
                            Terms & Conditions
                        </h1>
                        <p className="text-lp-mid mb-8 max-w-[560px] text-[0.88rem] leading-relaxed">
                            Please read these terms carefully before placing an
                            order or using our free tools. By using Launchpad
                            services you agree to the following.
                        </p>
                    </FadeIn>

                    <div className="space-y-3">
                        {launchpadTermsSections.map((section, index) => (
                            <Reveal key={section.title} delay={Math.min(index * 0.02, 0.2)}>
                                <section className="overflow-hidden rounded-[10px] border border-[var(--lp-border)] bg-white">
                                    <h2 className="text-lp-navy border-b border-[var(--lp-border)] bg-[var(--lp-off)] px-4 py-3 text-[0.92rem] font-bold sm:px-5">
                                        {section.title}
                                    </h2>
                                    <div className="text-lp-mid space-y-2.5 px-4 py-4 text-[0.84rem] leading-[1.7] sm:px-5">
                                        {renderTermsBody(section.body).map(
                                            (line) => (
                                                <p key={line.slice(0, 48)}>
                                                    {formatInline(line)}
                                                </p>
                                            ),
                                        )}
                                    </div>
                                </section>
                            </Reveal>
                        ))}
                    </div>

                    <p className="text-lp-light mt-8 text-[0.75rem]">
                        Last updated: May 2026 · This policy is compliant with
                        the Protection of Personal Information Act (POPIA), Act
                        4 of 2013
                    </p>
                </div>
            </article>
        </LaunchpadLayout>
    );
}
