export type LaunchpadNavItem = {
    label: string;
    href: string;
};

/** Desktop header — matches Compressed reference (Templates hidden by default). */
export const launchpadNav: LaunchpadNavItem[] = [
    { label: 'Home', href: '/' },
    { label: 'Free Tools', href: '/tools' },
    { label: 'Services', href: '/services' },
    { label: 'About', href: '/about' },
    { label: 'Contact', href: '/contact' },
];

/** Client site mobile labels (IA parity). */
export const launchpadMobileNav: LaunchpadNavItem[] = [
    { label: 'Home', href: '/' },
    { label: 'Free Tools', href: '/tools' },
    { label: 'Services & Pricing', href: '/services' },
    { label: 'About', href: '/about' },
    { label: 'Contact Us', href: '/contact' },
];
