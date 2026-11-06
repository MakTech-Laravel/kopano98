const companies = [
    { name: 'ABSA', wordmark: 'ABSA' },
    { name: 'Amazon', wordmark: 'amazon' },
    { name: 'Deloitte', wordmark: 'Deloitte' },
    { name: 'Discovery', wordmark: 'Discovery' },
    { name: 'Standard Bank', wordmark: 'Standard Bank' },
    { name: 'Nedbank', wordmark: 'Nedbank' },
    { name: 'PwC', wordmark: 'PwC' },
    { name: 'Capitec', wordmark: 'Capitec' },
];

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
                            className="inline-flex min-w-[7.5rem] items-center justify-center rounded-md border border-white/15 bg-white px-3 py-2 text-[0.78rem] font-bold tracking-wide text-[var(--lp-navy)] shadow-sm"
                            title={`${company.name} wordmark placeholder — replace with approved logo asset`}
                        >
                            {company.wordmark}
                        </span>
                        <span className="bg-lp-gold inline-block h-1.5 w-1.5 rounded-full" />
                    </span>
                ))}
            </div>
            <p className="mx-auto mt-4 max-w-3xl px-4 text-center text-[0.68rem] leading-relaxed text-white/45">
                Company names shown are placement examples using temporary
                wordmark placeholders pending logo-use approval. Displayed
                organisations are not necessarily affiliated with, endorsing, or
                partnered with Launchpad Careers. Using our services does not
                guarantee employment.
            </p>
        </section>
    );
}
