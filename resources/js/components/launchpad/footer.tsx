import { Link } from '@inertiajs/react';

import { launchpadNav } from '@/data/launchpad/nav';

const footerLinks = [
    ...launchpadNav,
    { label: 'FAQ', href: '/services#faq' },
    { label: 'Terms', href: '/terms' },
];

export function LaunchpadFooter() {
    return (
        <footer className="bg-lp-navy py-6 pb-[calc(1.5rem+env(safe-area-inset-bottom))] text-center">
            <div className="container">
                <nav className="mb-1.5 flex flex-wrap items-center justify-center gap-x-3 gap-y-2 sm:gap-x-4">
                    {footerLinks.map((item) => (
                        <Link
                            key={item.href}
                            href={item.href}
                            className="text-[0.78rem] text-white/60 transition hover:text-[var(--lp-gold)]"
                        >
                            {item.label}
                        </Link>
                    ))}
                </nav>
                <p className="text-[0.72rem] text-white/[0.68]">
                    © {new Date().getFullYear()} Launchpad · Top 1% CV and Career
                    Services, South Africa
                </p>
                <p className="mt-1 px-2 text-[0.7rem] leading-relaxed text-white/50">
                    Builder data: GeoNames (CC BY 4.0) · ESCO © European Union
                    (CC BY 4.0) · countries-states-cities database (ODbL) ·
                    university-domains-list (MIT)
                </p>
                <p className="mt-1 text-[0.72rem] text-white/35">
                    <a
                        href="mailto:info@launchpadcareers.co.za"
                        className="hover:text-[var(--lp-gold)]"
                    >
                        info@launchpadcareers.co.za
                    </a>
                    <span className="mx-1.5">·</span>
                    <a
                        href="https://wa.me/27822192256"
                        className="hover:text-[var(--lp-gold)]"
                    >
                        +27 82 219 2256
                    </a>
                </p>
            </div>
        </footer>
    );
}
