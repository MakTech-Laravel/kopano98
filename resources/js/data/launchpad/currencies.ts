export type LaunchpadCurrencyCode =
    | 'ZAR'
    | 'USD'
    | 'EUR'
    | 'GBP'
    | 'AUD'
    | 'CAD'
    | 'INR'
    | 'NGN'
    | 'KES'
    | 'AED';

export type PaymentGateway = 'payfast' | 'paddle';

export type LaunchpadCurrency = {
    code: LaunchpadCurrencyCode;
    label: string;
    /** Approximate units of this currency per 1 ZAR — display only until live FX/Paddle. */
    fromZar: number;
    locale: string;
};

export type RegionProfile = {
    countryCode: string;
    countryName: string;
    currencyCode: LaunchpadCurrencyCode;
    gateway: PaymentGateway;
};

/**
 * Base catalogue prices stay in ZAR. These rates are UI estimates so
 * international visitors see local-looking amounts before Milestone 2 billing.
 */
export const launchpadCurrencies: Record<LaunchpadCurrencyCode, LaunchpadCurrency> = {
    ZAR: { code: 'ZAR', label: 'South African Rand', fromZar: 1, locale: 'en-ZA' },
    USD: { code: 'USD', label: 'US Dollar', fromZar: 0.055, locale: 'en-US' },
    EUR: { code: 'EUR', label: 'Euro', fromZar: 0.051, locale: 'de-DE' },
    GBP: { code: 'GBP', label: 'British Pound', fromZar: 0.043, locale: 'en-GB' },
    AUD: { code: 'AUD', label: 'Australian Dollar', fromZar: 0.084, locale: 'en-AU' },
    CAD: { code: 'CAD', label: 'Canadian Dollar', fromZar: 0.075, locale: 'en-CA' },
    INR: { code: 'INR', label: 'Indian Rupee', fromZar: 4.6, locale: 'en-IN' },
    NGN: { code: 'NGN', label: 'Nigerian Naira', fromZar: 85, locale: 'en-NG' },
    KES: { code: 'KES', label: 'Kenyan Shilling', fromZar: 7.1, locale: 'en-KE' },
    AED: { code: 'AED', label: 'UAE Dirham', fromZar: 0.202, locale: 'en-AE' },
};

export const currencyOptions = Object.values(launchpadCurrencies);

/** Common country → preferred currency + checkout path. */
const countryProfiles: Record<string, Omit<RegionProfile, 'countryCode'>> = {
    ZA: { countryName: 'South Africa', currencyCode: 'ZAR', gateway: 'payfast' },
    NA: { countryName: 'Namibia', currencyCode: 'ZAR', gateway: 'payfast' },
    BW: { countryName: 'Botswana', currencyCode: 'ZAR', gateway: 'payfast' },
    US: { countryName: 'United States', currencyCode: 'USD', gateway: 'paddle' },
    GB: { countryName: 'United Kingdom', currencyCode: 'GBP', gateway: 'paddle' },
    IE: { countryName: 'Ireland', currencyCode: 'EUR', gateway: 'paddle' },
    DE: { countryName: 'Germany', currencyCode: 'EUR', gateway: 'paddle' },
    FR: { countryName: 'France', currencyCode: 'EUR', gateway: 'paddle' },
    NL: { countryName: 'Netherlands', currencyCode: 'EUR', gateway: 'paddle' },
    BE: { countryName: 'Belgium', currencyCode: 'EUR', gateway: 'paddle' },
    ES: { countryName: 'Spain', currencyCode: 'EUR', gateway: 'paddle' },
    IT: { countryName: 'Italy', currencyCode: 'EUR', gateway: 'paddle' },
    PT: { countryName: 'Portugal', currencyCode: 'EUR', gateway: 'paddle' },
    AU: { countryName: 'Australia', currencyCode: 'AUD', gateway: 'paddle' },
    NZ: { countryName: 'New Zealand', currencyCode: 'AUD', gateway: 'paddle' },
    CA: { countryName: 'Canada', currencyCode: 'CAD', gateway: 'paddle' },
    IN: { countryName: 'India', currencyCode: 'INR', gateway: 'paddle' },
    NG: { countryName: 'Nigeria', currencyCode: 'NGN', gateway: 'paddle' },
    KE: { countryName: 'Kenya', currencyCode: 'KES', gateway: 'paddle' },
    AE: { countryName: 'United Arab Emirates', currencyCode: 'AED', gateway: 'paddle' },
    GH: { countryName: 'Ghana', currencyCode: 'USD', gateway: 'paddle' },
    PK: { countryName: 'Pakistan', currencyCode: 'USD', gateway: 'paddle' },
    BD: { countryName: 'Bangladesh', currencyCode: 'USD', gateway: 'paddle' },
};

export function resolveRegionProfile(countryCode: string): RegionProfile {
    const normalized = countryCode.trim().toUpperCase() || 'ZA';
    const known = countryProfiles[normalized];

    if (known) {
        return { countryCode: normalized, ...known };
    }

    return {
        countryCode: normalized,
        countryName: normalized,
        currencyCode: 'USD',
        gateway: 'paddle',
    };
}

export function convertFromZar(
    amountZar: number,
    currencyCode: LaunchpadCurrencyCode,
): number {
    const rate = launchpadCurrencies[currencyCode].fromZar;

    return amountZar * rate;
}

export function formatMoney(
    amountZar: number,
    currencyCode: LaunchpadCurrencyCode,
): string {
    const currency = launchpadCurrencies[currencyCode];
    const converted = convertFromZar(amountZar, currencyCode);
    const digits = currencyCode === 'NGN' || currencyCode === 'KES' ? 0 : 2;

    return new Intl.NumberFormat(currency.locale, {
        style: 'currency',
        currency: currency.code,
        minimumFractionDigits: currencyCode === 'ZAR' ? 0 : digits,
        maximumFractionDigits: currencyCode === 'ZAR' ? 0 : digits,
    }).format(currencyCode === 'ZAR' ? Math.round(converted) : converted);
}

export function formatZar(amount: number): string {
    return formatMoney(amount, 'ZAR');
}

export function gatewayLabel(gateway: PaymentGateway): string {
    return gateway === 'payfast' ? 'Payfast' : 'Paddle';
}

export function gatewayBlurb(gateway: PaymentGateway): string {
    if (gateway === 'payfast') {
        return 'Trusted local checkout for South African cards, EFT, and Instant EFT.';
    }

    return 'International checkout with prices shown in your local currency.';
}
