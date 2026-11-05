import { resolveRegionProfile, type RegionProfile } from '@/data/launchpad/currencies';

const STORAGE_KEY = 'launchpad.region.v1';

type StoredRegion = {
    countryCode: string;
    currencyCode?: string;
    manual?: boolean;
};

function countryFromBrowserLocale(): string {
    const locale = typeof navigator !== 'undefined' ? navigator.language : 'en-ZA';
    const match = locale.match(/-([A-Za-z]{2})\b/);

    return match?.[1]?.toUpperCase() ?? 'ZA';
}

export function readStoredRegion(): StoredRegion | null {
    if (typeof window === 'undefined') {
        return null;
    }

    try {
        const raw = window.localStorage.getItem(STORAGE_KEY);

        if (!raw) {
            return null;
        }

        return JSON.parse(raw) as StoredRegion;
    } catch {
        return null;
    }
}

export function writeStoredRegion(value: StoredRegion): void {
    if (typeof window === 'undefined') {
        return;
    }

    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(value));
}

/**
 * Soft geo lookup for UI pricing. Falls back to browser locale, then ZA.
 * Real IP/geo + billing sync lands with payment backends next milestone.
 */
export async function detectRegionProfile(): Promise<RegionProfile> {
    const stored = readStoredRegion();

    if (stored?.manual && stored.countryCode) {
        return resolveRegionProfile(stored.countryCode);
    }

    try {
        const response = await fetch('https://ipapi.co/json/', {
            signal: AbortSignal.timeout(2500),
        });

        if (response.ok) {
            const payload = (await response.json()) as {
                country_code?: string;
                error?: boolean;
            };

            if (!payload.error && payload.country_code) {
                const profile = resolveRegionProfile(payload.country_code);

                writeStoredRegion({
                    countryCode: profile.countryCode,
                    currencyCode: profile.currencyCode,
                    manual: false,
                });

                return profile;
            }
        }
    } catch {
        // Ignore network / CORS / timeout — use locale fallback.
    }

    const fallbackCode = stored?.countryCode ?? countryFromBrowserLocale();
    const profile = resolveRegionProfile(fallbackCode);

    writeStoredRegion({
        countryCode: profile.countryCode,
        currencyCode: profile.currencyCode,
        manual: Boolean(stored?.manual),
    });

    return profile;
}
