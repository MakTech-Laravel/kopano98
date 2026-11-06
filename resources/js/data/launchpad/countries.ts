import {
    resolveRegionProfile,
    type LaunchpadCurrencyCode,
    type PaymentGateway,
    type RegionProfile,
} from '@/data/launchpad/currencies';

export type CheckoutCountry = {
    code: string;
    name: string;
    currencyCode: LaunchpadCurrencyCode;
    gateway: PaymentGateway;
};

/** Single catalogue used by currency switcher, checkout, and region helpers. */
export const launchpadCountries: CheckoutCountry[] = [
    'ZA',
    'NA',
    'BW',
    'US',
    'GB',
    'DE',
    'FR',
    'AU',
    'CA',
    'IN',
    'NG',
    'KE',
    'AE',
].map((code) => {
    const profile = resolveRegionProfile(code);

    return {
        code: profile.countryCode,
        name: profile.countryName,
        currencyCode: profile.currencyCode,
        gateway: profile.gateway,
    };
});

export const demoSwitcherCountries = launchpadCountries.filter((country) =>
    ['ZA', 'US', 'GB', 'DE', 'AU', 'CA', 'IN', 'NG', 'KE', 'AE'].includes(
        country.code,
    ),
);

export function countryOptionsForSelect(): CheckoutCountry[] {
    return launchpadCountries;
}

export function profileForCountry(countryCode: string): RegionProfile {
    return resolveRegionProfile(countryCode);
}
