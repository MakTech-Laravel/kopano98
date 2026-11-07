import { Link, usePage } from '@inertiajs/react';
import { Menu, ShoppingBag, X } from 'lucide-react';
import { useState } from 'react';

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

    const openCartSidebar = () => {
        openCart();
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
                    <button
                        type="button"
                        onClick={openCartSidebar}
                        className="relative mr-1 flex items-center rounded px-3 py-2 text-white transition hover:bg-white/10"
                        aria-label={
                            itemCount > 0
                                ? `Open cart, ${itemCount} items`
                                : 'Open cart'
                        }
                    >
                        <ShoppingBag className="h-[1.15rem] w-[1.15rem]" strokeWidth={1.9} />
                        {itemCount > 0 ? (
                            <span className="bg-lp-gold text-lp-navy absolute -top-0.5 -right-0.5 flex h-[18px] min-w-[18px] items-center justify-center rounded-full px-1 text-[0.6rem] font-extrabold leading-none">
                                {itemCount > 9 ? '9+' : itemCount}
                            </span>
                        ) : null}
                    </button>
                    <Link
                        href="/services"
                        className="btn-lp-gold ml-1 inline-flex items-center justify-center px-4 py-2 text-[0.8rem] font-bold"
                    >
                        Get Started
                    </Link>
                </div>

                <div className="flex items-center gap-1 lg:hidden">
                    <button
                        type="button"
                        onClick={openCartSidebar}
                        className="relative rounded-md p-2 text-white"
                        aria-label={
                            itemCount > 0
                                ? `Open cart, ${itemCount} items`
                                : 'Open cart'
                        }
                    >
                        <ShoppingBag className="h-[22px] w-[22px]" strokeWidth={1.9} />
                        {itemCount > 0 ? (
                            <span className="bg-lp-gold text-lp-navy absolute top-0.5 right-0.5 flex h-[16px] min-w-[16px] items-center justify-center rounded-full px-1 text-[0.55rem] font-extrabold leading-none">
                                {itemCount > 9 ? '9+' : itemCount}
                            </span>
                        ) : null}
                    </button>
                    <button
                        type="button"
                        className="rounded-md p-2 text-white"
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
                </div>
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
                        <button
                            type="button"
                            onClick={() => {
                                setMobileOpen(false);
                                openCartSidebar();
                            }}
                            className="flex w-full items-center justify-center gap-2 rounded bg-[var(--lp-navy-3)] px-2 py-2.5 text-[0.8rem] font-semibold text-white"
                        >
                            View Cart
                            {itemCount > 0 ? (
                                <span className="bg-lp-gold text-lp-navy rounded-full px-2 py-0.5 text-[0.65rem] font-extrabold">
                                    {itemCount}
                                </span>
                            ) : null}
                        </button>
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
