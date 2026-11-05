import { usePage } from '@inertiajs/react';
import { motion, useReducedMotion } from 'framer-motion';
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
    const { url } = usePage();
    const reduceMotion = useReducedMotion();

    return (
        <LaunchpadLocaleProvider>
            <LaunchpadCartProvider>
                <div className="launchpad flex min-h-screen flex-col">
                    <LaunchpadHeader />
                    <RegionBanner />
                    <MobileCartBar />
                    <motion.main
                        key={url}
                        className="flex flex-1 flex-col"
                        initial={
                            reduceMotion
                                ? false
                                : { opacity: 0, y: 10 }
                        }
                        animate={{ opacity: 1, y: 0 }}
                        transition={{
                            duration: 0.35,
                            ease: [0.22, 1, 0.36, 1],
                        }}
                    >
                        {children}
                    </motion.main>
                    <LaunchpadFooter />
                    <CartDrawer />
                    <WhatsappFab />
                </div>
            </LaunchpadCartProvider>
        </LaunchpadLocaleProvider>
    );
}
