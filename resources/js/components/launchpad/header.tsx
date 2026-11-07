import { Link, usePage } from '@inertiajs/react';
import { Menu, X } from 'lucide-react';
import { useState } from 'react';

import { launchpadMobileNav, launchpadNav } from '@/data/launchpad/nav';

export function LaunchpadHeader() {
    const { url } = usePage();
    const [mobileOpen, setMobileOpen] = useState(false);

    const isActive = (href: string) => {
        if (href === '/') {
            return url === '/';
        }

        return url.startsWith(href);
    };

    return (
        <header className="bg-lp-navy sticky top-0 z-[200] w-full">
            <nav className="flex h-14 w-full items-center justify-between gap-4 px-5 sm:h-[3.75rem] sm:px-8 lg:px-12 xl:px-16">
                <Link href="/" className="lp-brand-logo shrink-0">
                    Launch<span className="text-lp-gold">pad</span>
                </Link>

                <div className="hidden items-center gap-1 lg:flex">
                    {launchpadNav.map((item) => (
                        <Link
                            key={item.href}
                            href={item.href}
                            className={`rounded px-3.5 py-2 text-[0.8rem] font-medium whitespace-nowrap transition xl:px-4 ${isActive(item.href)
                                    ? 'text-lp-gold'
                                    : 'text-white/85 hover:text-white'
                                }`}
                        >
                            {item.label}
                        </Link>
                    ))}
                    <Link
                        href="/services"
                        className="btn-lp-gold ml-3 inline-flex items-center justify-center px-4 py-2 text-[0.8rem] font-bold"
                    >
                        Get Started
                    </Link>
                </div>

                <button
                    type="button"
                    className="rounded-md p-2 text-white lg:hidden"
                    onClick={() => setMobileOpen((open) => !open)}
                    aria-label="Menu"
                    aria-expanded={mobileOpen}
                >
                    {mobileOpen ? (
                        <X className="h-[22px] w-[22px]" />
                    ) : (
                        <Menu className="h-[22px] w-[22px]" />
                    )}
                </button>
            </nav>

            {mobileOpen ? (
                <div className="bg-lp-navy border-t border-[var(--lp-navy-3)] lg:hidden">
                    <div className="flex w-full flex-col gap-0.5 px-5 py-3 sm:px-8">
                        {launchpadMobileNav.map((item) => (
                            <Link
                                key={item.href}
                                href={item.href}
                                onClick={() => setMobileOpen(false)}
                                className={`rounded px-2 py-2.5 text-[0.8rem] font-medium ${isActive(item.href)
                                        ? 'text-lp-gold'
                                        : 'text-white/80 hover:bg-white/10 hover:text-white'
                                    }`}
                            >
                                {item.label}
                            </Link>
                        ))}
                        <div className="mt-1 border-t border-[var(--lp-navy-3)] pt-2">
                            <Link
                                href="/services"
                                onClick={() => setMobileOpen(false)}
                                className="btn-lp-gold block w-full py-2.5 text-center text-[0.8rem] font-bold"
                            >
                                Get Started
                            </Link>
                        </div>
                    </div>
                </div>
            ) : null}
        </header>
    );
}
