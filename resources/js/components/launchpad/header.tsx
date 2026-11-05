import { Link, usePage } from '@inertiajs/react';
import { Menu, ShoppingBag, X } from 'lucide-react';
import { useState } from 'react';

import { CurrencySwitcher } from '@/components/launchpad/currency-switcher';
import { useLaunchpadCart } from '@/contexts/launchpad-cart';
import { launchpadMobileNav, launchpadNav } from '@/data/launchpad/nav';

export function LaunchpadHeader() {
    const { url } = usePage();
    const { itemCount, openCart } = useLaunchpadCart();
    const [mobileOpen, setMobileOpen] = useState(false);

    const isActive = (href: string) => {
        if (href === '/') {
            return url === '/';
        }

        return url.startsWith(href);
    };

    return (
        <header className="bg-lp-navy sticky top-0 z-[200]">
            <nav className="container flex h-14 items-center justify-between gap-2">
                <Link
                    href="/"
                    className="font-lp-display shrink-0 text-[1.35rem] tracking-tight text-white sm:text-[1.5rem]"
                >
                    Launch<span className="text-lp-gold">pad</span>
                </Link>

                <div className="hidden items-center gap-0.5 lg:flex">
                    {launchpadNav.map((item) => (
                        <Link
                            key={item.href}
                            href={item.href}
                            className={`rounded px-2.5 py-2 text-[0.78rem] font-medium transition xl:px-3 xl:text-[0.8rem] ${isActive(item.href)
                                ? 'text-lp-gold'
                                : 'text-white/70 hover:bg-white/10 hover:text-white'
                                }`}
                        >
                            {item.label}
                        </Link>
                    ))}
                </div>

                <div className="flex items-center gap-1">
                    <CurrencySwitcher />
                    <button
                        type="button"
                        onClick={openCart}
                        className="relative rounded-md p-2 text-white/80 hover:bg-white/10 hover:text-white"
                        aria-label="Open cart"
                    >
                        <ShoppingBag className="h-5 w-5" />
                        {itemCount > 0 ? (
                            <span className="bg-lp-gold text-lp-navy absolute -top-0.5 -right-0.5 flex h-4 min-w-4 items-center justify-center rounded-full px-1 text-[0.65rem] font-semibold">
                                {itemCount}
                            </span>
                        ) : null}
                    </button>
                    <Link
                        href="/services"
                        className="btn-lp-gold ml-1 hidden px-3 py-2 text-[0.78rem] md:inline-flex"
                    >
                        Get Started
                    </Link>
                    <button
                        type="button"
                        className="rounded-md p-2 text-white lg:hidden"
                        onClick={() => setMobileOpen((open) => !open)}
                        aria-label="Menu"
                        aria-expanded={mobileOpen}
                    >
                        {mobileOpen ? (
                            <X className="h-5 w-5" />
                        ) : (
                            <Menu className="h-5 w-5" />
                        )}
                    </button>
                </div>
            </nav>

            {mobileOpen ? (
                <div className="bg-lp-navy-2 border-t border-[var(--lp-navy-3)] lg:hidden">
                    <div className="container flex flex-col gap-1 py-3">
                        {launchpadMobileNav.map((item) => (
                            <Link
                                key={item.href}
                                href={item.href}
                                onClick={() => setMobileOpen(false)}
                                className={`rounded px-2 py-2.5 text-sm ${isActive(item.href)
                                    ? 'text-lp-gold'
                                    : 'text-white/80'
                                    }`}
                            >
                                {item.label}
                            </Link>
                        ))}
                        <Link
                            href="/services"
                            onClick={() => setMobileOpen(false)}
                            className="btn-lp-gold mt-2 w-full py-2.5 text-center text-sm"
                        >
                            Get Started
                        </Link>
                    </div>
                </div>
            ) : null}
        </header>
    );
}
