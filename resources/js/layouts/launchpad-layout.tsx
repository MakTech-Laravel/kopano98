import type { ReactNode } from 'react';

import { CartDrawer } from '@/components/launchpad/cart-drawer';
import { LaunchpadFooter } from '@/components/launchpad/footer';
import { LaunchpadHeader } from '@/components/launchpad/header';
import { MobileCartBar } from '@/components/launchpad/mobile-cart-bar';
import { RegionBanner } from '@/components/launchpad/region-banner';
import { WhatsappFab } from '@/components/launchpad/whatsapp-fab';
import { LaunchpadCartProvider } from '@/contexts/launchpad-cart';
import { LaunchpadLocaleProvider } from '@/contexts/launchpad-locale';

type LaunchpadLayoutProps = {
    children: ReactNode;
};

export default function LaunchpadLayout({ children }: LaunchpadLayoutProps) {
    return (
        <LaunchpadLocaleProvider>
            <LaunchpadCartProvider>
                <div className="launchpad flex min-h-screen flex-col">
                    <LaunchpadHeader />
                    <RegionBanner />
                    <MobileCartBar />
                    <main className="flex flex-1 flex-col">{children}</main>
                    <LaunchpadFooter />
                    <CartDrawer />
                    <WhatsappFab />
                </div>
            </LaunchpadCartProvider>
        </LaunchpadLocaleProvider>
    );
}
