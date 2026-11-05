import { useLaunchpadLocale } from '@/contexts/launchpad-locale';

export function RegionBanner() {
    const { ready, countryName, currencyCode, gatewayName, isSouthAfrica } =
        useLaunchpadLocale();

    if (!ready) {
        return null;
    }

    return (
        <div className="border-b border-[var(--lp-border)] bg-[var(--lp-off)]">
            <div className="container flex flex-wrap items-center justify-center gap-x-2 gap-y-1 py-2 text-center text-[0.72rem] text-[var(--lp-text-mid)]">
                <span>
                    Showing prices in{' '}
                    <strong className="text-lp-navy">{currencyCode}</strong>
                    {' · '}
                    {countryName}
                </span>
                <span className="text-[var(--lp-border)]" aria-hidden>
                    |
                </span>
                <span>
                    Checkout via{' '}
                    <strong className="text-lp-navy">{gatewayName}</strong>
                    {isSouthAfrica
                        ? ' for local SA payments'
                        : ' for international customers'}
                </span>
            </div>
        </div>
    );
}
