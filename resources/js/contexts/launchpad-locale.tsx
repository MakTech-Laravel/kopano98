import {
    createContext,
    useCallback,
    useContext,
    useEffect,
    useMemo,
    useState,
    type ReactNode,
} from 'react';

import {
    formatMoney,
    formatZar,
    gatewayLabel,
    resolveRegionProfile,
    type LaunchpadCurrencyCode,
    type PaymentGateway,
    type RegionProfile,
} from '@/data/launchpad/currencies';
import {
    detectRegionProfile,
    readStoredRegion,
    writeStoredRegion,
} from '@/lib/launchpad/detect-region';

type LaunchpadLocaleContextValue = {
    ready: boolean;
    countryCode: string;
    countryName: string;
    currencyCode: LaunchpadCurrencyCode;
    gateway: PaymentGateway;
    gatewayName: string;
    isSouthAfrica: boolean;
    setCountryCode: (countryCode: string) => void;
    setCurrencyCode: (currencyCode: LaunchpadCurrencyCode) => void;
    formatPrice: (amountZar: number) => string;
    formatBaseZar: (amountZar: number) => string;
};

const LaunchpadLocaleContext = createContext<LaunchpadLocaleContextValue | null>(
    null,
);

const defaultProfile = resolveRegionProfile('ZA');

export function LaunchpadLocaleProvider({ children }: { children: ReactNode }) {
    const [ready, setReady] = useState(false);
    const [profile, setProfile] = useState<RegionProfile>(defaultProfile);
    const [currencyOverride, setCurrencyOverride] =
        useState<LaunchpadCurrencyCode | null>(null);

    useEffect(() => {
        let cancelled = false;

        const stored = readStoredRegion();

        if (stored?.countryCode) {
            const initial = resolveRegionProfile(stored.countryCode);
            setProfile(initial);

            if (
                stored.currencyCode &&
                stored.currencyCode !== initial.currencyCode
            ) {
                setCurrencyOverride(stored.currencyCode as LaunchpadCurrencyCode);
            }
        }

        void detectRegionProfile().then((detected) => {
            if (cancelled) {
                return;
            }

            const current = readStoredRegion();

            if (current?.manual) {
                setProfile(resolveRegionProfile(current.countryCode));
                setReady(true);

                return;
            }

            setProfile(detected);
            setCurrencyOverride(null);
            setReady(true);
        });

        return () => {
            cancelled = true;
        };
    }, []);

    const setCountryCode = useCallback((countryCode: string) => {
        const next = resolveRegionProfile(countryCode);
        setProfile(next);
        setCurrencyOverride(null);
        writeStoredRegion({
            countryCode: next.countryCode,
            currencyCode: next.currencyCode,
            manual: true,
        });
        setReady(true);
    }, []);

    const setCurrencyCode = useCallback(
        (currencyCode: LaunchpadCurrencyCode) => {
            setCurrencyOverride(currencyCode);
            writeStoredRegion({
                countryCode: profile.countryCode,
                currencyCode,
                manual: true,
            });
        },
        [profile.countryCode],
    );

    const currencyCode = currencyOverride ?? profile.currencyCode;
    const gateway: PaymentGateway =
        profile.countryCode === 'ZA' ||
        profile.countryCode === 'NA' ||
        profile.countryCode === 'BW'
            ? 'payfast'
            : 'paddle';

    const value = useMemo<LaunchpadLocaleContextValue>(
        () => ({
            ready,
            countryCode: profile.countryCode,
            countryName: profile.countryName,
            currencyCode,
            gateway,
            gatewayName: gatewayLabel(gateway),
            isSouthAfrica: profile.countryCode === 'ZA',
            setCountryCode,
            setCurrencyCode,
            formatPrice: (amountZar: number) =>
                formatMoney(amountZar, currencyCode),
            formatBaseZar: formatZar,
        }),
        [
            ready,
            profile,
            currencyCode,
            gateway,
            setCountryCode,
            setCurrencyCode,
        ],
    );

    return (
        <LaunchpadLocaleContext.Provider value={value}>
            {children}
        </LaunchpadLocaleContext.Provider>
    );
}

export function useLaunchpadLocale(): LaunchpadLocaleContextValue {
    const context = useContext(LaunchpadLocaleContext);

    if (!context) {
        throw new Error(
            'useLaunchpadLocale must be used within LaunchpadLocaleProvider',
        );
    }

    return context;
}
