const companies = [
    {
        name: 'Amazon',
        logo: '/images/launchpad/companies/amazon.svg',
    },
    {
        name: 'ABSA',
        logo: '/images/launchpad/companies/absa.svg',
    },
    {
        name: 'Deloitte',
        logo: '/images/launchpad/companies/deloitte.svg',
    },
    {
        name: 'Discovery',
        logo: '/images/launchpad/companies/discovery.svg',
    },
    {
        name: 'Standard Bank',
        logo: '/images/launchpad/companies/standard-bank.svg',
    },
    {
        name: 'Nedbank',
        logo: '/images/launchpad/companies/nedbank.svg',
    },
    {
        name: 'PwC',
        logo: '/images/launchpad/companies/pwc.svg',
    },
    {
        name: 'Capitec',
        logo: '/images/launchpad/companies/capitec.svg',
    },
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
                        <span className="inline-flex h-11 min-w-[8.75rem] items-center justify-center rounded-md border border-white/12 bg-white px-4 py-2 shadow-[0_6px_16px_rgba(0,0,0,0.18)]">
                            <img
                                src={company.logo}
                                alt={`${company.name} logo`}
                                className="h-7 w-auto max-w-[7.5rem] object-contain"
                                loading="lazy"
                                decoding="async"
                            />
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
