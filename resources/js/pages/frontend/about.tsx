import { Head } from '@inertiajs/react';

import { SectionHeading } from '@/components/launchpad/section-heading';
import { launchpadTeam } from '@/data/launchpad/team';
import LaunchpadLayout from '@/layouts/launchpad-layout';

export default function About() {
    return (
        <LaunchpadLayout>
            <Head title="About | Launchpad Careers" />

            <section className="bg-lp-navy py-10 text-center sm:py-12">
                <div className="container">
                    <h1 className="font-lp-display text-[clamp(1.85rem,5vw,2.85rem)] text-white">
                        About Launchpad
                    </h1>
                    <p className="mx-auto mt-3 max-w-xl text-sm text-pretty text-white/70">
                        Human-led career services with ATS-safe defaults — built for
                        candidates who need results, not fluff.
                    </p>
                </div>
            </section>

            <section className="py-10 sm:py-12">
                <div className="container">
                    <SectionHeading
                        label="Team"
                        title="The people behind the rewrites."
                    />
                    <div className="grid gap-4 sm:grid-cols-2">
                        {launchpadTeam.map((member) => (
                            <article
                                key={member.id}
                                className="rounded-[10px] border border-[var(--lp-border)] bg-white p-5 sm:p-6"
                            >
                                <div className="mb-3 flex items-center gap-3 sm:gap-4">
                                    <img
                                        src={member.image}
                                        alt={member.name}
                                        className="h-12 w-12 shrink-0 rounded-full object-cover sm:h-14 sm:w-14"
                                    />
                                    <div className="min-w-0">
                                        <h3 className="font-lp-display text-lp-navy text-xl">
                                            {member.name}
                                        </h3>
                                        <p className="text-[0.72rem] font-medium tracking-[0.06em] text-[var(--lp-gold-on-light-sm)] uppercase">
                                            {member.role}
                                        </p>
                                    </div>
                                </div>
                                <p className="text-lp-mid mb-3 text-[0.82rem] leading-relaxed">
                                    {member.bio}
                                </p>
                                <div className="flex flex-wrap gap-1.5">
                                    {member.tags.map((tag) => (
                                        <span
                                            key={tag}
                                            className="rounded border border-[var(--lp-border)] bg-[var(--lp-off)] px-2 py-0.5 text-[0.67rem] font-semibold text-[var(--lp-text-mid)]"
                                        >
                                            {tag}
                                        </span>
                                    ))}
                                </div>
                            </article>
                        ))}
                    </div>
                </div>
            </section>
        </LaunchpadLayout>
    );
}
