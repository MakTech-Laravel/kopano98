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
        <section className="bg-lp-navy-2 overflow-hidden py-6 sm:py-8">
            <div className="container mb-3 sm:mb-4">
                <p className="text-center text-[0.65rem] font-bold tracking-wider text-white/55 uppercase sm:text-[0.72rem]">
                    Our candidates have been placed at
                </p>
            </div>
            <div className="lp-hired-track gap-0">
                {loop.map((company, index) => (
                    <span
                        key={`${company.name}-${index}`}
                        className="inline-flex items-center gap-1.5 px-1 sm:gap-3 sm:px-6"
                    >
                        {/* ~4 logos visible on a 360–390px phone width */}
                        <span className="inline-flex h-7 w-[4.85rem] shrink-0 items-center justify-center rounded-md border border-white/12 bg-white px-1.5 py-1 shadow-[0_3px_10px_rgba(0,0,0,0.14)] sm:h-11 sm:w-[8.5rem] sm:px-4 sm:py-2 sm:shadow-[0_6px_16px_rgba(0,0,0,0.18)]">
                            <img
                                src={company.logo}
                                alt={`${company.name} logo`}
                                className="h-3.5 w-auto max-w-full object-contain sm:h-7"
                                loading="lazy"
                                decoding="async"
                            />
                        </span>
                        <span className="bg-lp-gold inline-block h-1 w-1 shrink-0 rounded-full sm:h-1.5 sm:w-1.5" />
                    </span>
                ))}
            </div>
        </section>
    );
}
