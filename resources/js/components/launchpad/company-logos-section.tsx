const companies = [
    { name: 'Amazon', mark: 'amazon', weight: 700 },
    { name: 'ABSA', mark: 'ABSA', weight: 800 },
    { name: 'Deloitte', mark: 'Deloitte', weight: 600 },
    { name: 'Discovery', mark: 'Discovery', weight: 700 },
    { name: 'Standard Bank', mark: 'Standard Bank', weight: 700 },
    { name: 'Nedbank', mark: 'Nedbank', weight: 700 },
    { name: 'PwC', mark: 'PwC', weight: 800 },
    { name: 'Capitec', mark: 'Capitec', weight: 700 },
] as const;

export function CompanyLogosSection() {
    const loop = [...companies, ...companies];

    return (
        <section className="bg-lp-navy-2 overflow-hidden py-8">
            <div className="container mb-4">
                <p className="text-center text-[0.72rem] font-bold tracking-wider text-white/55 uppercase">
                    Our candidates have been placed at
                </p>
            </div>
            <div className="lp-hired-track gap-0">
                {loop.map((company, index) => (
                    <span
                        key={`${company.name}-${index}`}
                        className="inline-flex items-center gap-3 px-5 sm:px-8"
                    >
                        <span
                            className="inline-flex min-w-[8.5rem] items-center justify-center rounded-md border border-white/12 bg-white px-4 py-2.5 text-[0.82rem] tracking-[0.02em] text-[var(--lp-navy)] shadow-[0_6px_16px_rgba(0,0,0,0.18)]"
                            style={{ fontWeight: company.weight }}
                            title={`${company.name} placement example`}
                        >
                            {company.mark}
                        </span>
                        <span className="bg-lp-gold inline-block h-1.5 w-1.5 rounded-full" />
                    </span>
                ))}
            </div>
            <p className="mx-auto mt-4 max-w-3xl px-4 text-center text-[0.68rem] leading-relaxed text-white/45">
                Company names and marks shown are placement examples only and are
                not necessarily affiliated with, endorsing, or partnered with
                Launchpad Careers. Using our services does not guarantee
                employment at any organisation named.
            </p>
        </section>
    );
}
