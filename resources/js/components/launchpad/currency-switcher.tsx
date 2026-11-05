import { ChevronDown, Globe2 } from 'lucide-react';
import { useEffect, useId, useRef, useState } from 'react';

import { useLaunchpadLocale } from '@/contexts/launchpad-locale';
import {
    currencyOptions,
    type LaunchpadCurrencyCode,
} from '@/data/launchpad/currencies';

const demoCountries: { code: string; label: string }[] = [
    { code: 'ZA', label: 'South Africa' },
    { code: 'US', label: 'United States' },
    { code: 'GB', label: 'United Kingdom' },
    { code: 'DE', label: 'Germany (EU)' },
    { code: 'AU', label: 'Australia' },
    { code: 'CA', label: 'Canada' },
    { code: 'IN', label: 'India' },
    { code: 'NG', label: 'Nigeria' },
    { code: 'KE', label: 'Kenya' },
    { code: 'AE', label: 'United Arab Emirates' },
];

export function CurrencySwitcher() {
    const {
        countryCode,
        countryName,
        currencyCode,
        gatewayName,
        setCountryCode,
        setCurrencyCode,
    } = useLaunchpadLocale();
    const [open, setOpen] = useState(false);
    const rootRef = useRef<HTMLDivElement>(null);
    const menuId = useId();

    useEffect(() => {
        if (!open) {
            return;
        }

        const onPointerDown = (event: MouseEvent) => {
            if (!rootRef.current?.contains(event.target as Node)) {
                setOpen(false);
            }
        };

        const onKeyDown = (event: KeyboardEvent) => {
            if (event.key === 'Escape') {
                setOpen(false);
            }
        };

        window.addEventListener('mousedown', onPointerDown);
        window.addEventListener('keydown', onKeyDown);

        return () => {
            window.removeEventListener('mousedown', onPointerDown);
            window.removeEventListener('keydown', onKeyDown);
        };
    }, [open]);

    return (
        <div ref={rootRef} className="relative">
            <button
                type="button"
                className="flex items-center gap-1.5 rounded-md px-2 py-2 text-[0.72rem] font-medium text-white/80 transition hover:bg-white/10 hover:text-white"
                aria-haspopup="dialog"
                aria-expanded={open}
                aria-controls={menuId}
                onClick={() => setOpen((value) => !value)}
            >
                <Globe2 className="h-4 w-4 shrink-0 opacity-80" />
                <span className="hidden sm:inline">
                    {currencyCode} · {gatewayName}
                </span>
                <span className="sm:hidden">{currencyCode}</span>
                <ChevronDown className="h-3.5 w-3.5 opacity-70" />
            </button>

            {open ? (
                <div
                    id={menuId}
                    role="dialog"
                    aria-label="Region and currency"
                    className="absolute top-full right-0 z-[300] mt-2 w-[min(100vw-1.5rem,20rem)] rounded-lg border border-[var(--lp-border)] bg-white p-3 shadow-xl"
                >
                    <p className="text-lp-navy text-xs font-semibold">
                        Prices for {countryName}
                    </p>
                    <p className="text-lp-mid mt-1 text-[0.7rem] leading-relaxed">
                        We detect your region and show local currency. South Africa
                        checks out with Payfast; other countries use Paddle.
                    </p>

                    <label className="mt-3 block">
                        <span className="text-lp-light text-[0.65rem] font-medium tracking-wide uppercase">
                            Country
                        </span>
                        <select
                            className="text-lp-navy mt-1 w-full rounded-md border border-[var(--lp-border)] bg-[var(--lp-off)] px-2.5 py-2 text-sm outline-none focus:border-[var(--lp-navy)]"
                            value={
                                demoCountries.some((item) => item.code === countryCode)
                                    ? countryCode
                                    : 'US'
                            }
                            onChange={(event) => setCountryCode(event.target.value)}
                        >
                            {!demoCountries.some((item) => item.code === countryCode) ? (
                                <option value={countryCode}>
                                    {countryName} ({countryCode})
                                </option>
                            ) : null}
                            {demoCountries.map((country) => (
                                <option key={country.code} value={country.code}>
                                    {country.label}
                                </option>
                            ))}
                        </select>
                    </label>

                    <label className="mt-3 block">
                        <span className="text-lp-light text-[0.65rem] font-medium tracking-wide uppercase">
                            Display currency
                        </span>
                        <select
                            className="text-lp-navy mt-1 w-full rounded-md border border-[var(--lp-border)] bg-[var(--lp-off)] px-2.5 py-2 text-sm outline-none focus:border-[var(--lp-navy)]"
                            value={currencyCode}
                            onChange={(event) =>
                                setCurrencyCode(
                                    event.target.value as LaunchpadCurrencyCode,
                                )
                            }
                        >
                            {currencyOptions.map((currency) => (
                                <option key={currency.code} value={currency.code}>
                                    {currency.code} — {currency.label}
                                </option>
                            ))}
                        </select>
                    </label>

                    <p className="text-lp-light mt-3 text-[0.65rem] leading-relaxed">
                        Converted amounts are estimates for this UI. Live Payfast /
                        Paddle charging connects in the next milestone.
                    </p>
                </div>
            ) : null}
        </div>
    );
}
