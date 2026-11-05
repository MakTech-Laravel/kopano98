import type { ReactNode } from 'react';

import LaunchpadLayout from '@/layouts/launchpad-layout';

interface FrontendLayoutProps {
    children: ReactNode;
}

/** @deprecated Prefer LaunchpadLayout directly on public pages. */
export default function FrontendLayout({ children }: FrontendLayoutProps) {
    return <LaunchpadLayout>{children}</LaunchpadLayout>;
}
