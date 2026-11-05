import { Link } from '@inertiajs/react';

import { launchpadNav } from '@/data/launchpad/nav';

export function LaunchpadFooter() {
    return (
        <footer className="bg-lp-navy py-6 pb-[calc(1.5rem+env(safe-area-inset-bottom))] text-center">
            <div className="container">
                <Link
                    href="/"
                    className="font-lp-display mb-3 inline-block text-[1.35rem] text-white"
                >
                    Launch<span className="text-lp-gold">pad</span>
                </Link>
                <nav className="mb-3 flex flex-wrap items-center justify-center gap-x-4 gap-y-2">
                    {launchpadNav.map((item) => (
                        <Link
                            key={item.href}
                            href={item.href}
                            className="text-[0.78rem] text-white/60 transition hover:text-[var(--lp-gold)]"
                        >
                            {item.label}
                        </Link>
                    ))}
                    <Link
                        href="/terms"
                        className="text-[0.78rem] text-white/60 transition hover:text-[var(--lp-gold)]"
                    >
                        Terms
                    </Link>
                </nav>
                <p className="text-[0.72rem] text-white/65">
                    © {new Date().getFullYear()} Launchpad Careers ·
                    launchpadcareers.co.za
                </p>
                <p className="mt-1 text-[0.72rem] break-all text-white/50 sm:break-normal">
                    WhatsApp{' '}
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
