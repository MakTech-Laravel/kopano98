import { ChevronDown, Globe2, X } from 'lucide-react';
import { useEffect, useId, useRef, useState } from 'react';

import { useLaunchpadLocale } from '@/contexts/launchpad-locale';
import { demoSwitcherCountries } from '@/data/launchpad/countries';
import {
    currencyOptions,
    type LaunchpadCurrencyCode,
} from '@/data/launchpad/currencies';

const demoCountries = demoSwitcherCountries.map((country) => ({
    code: country.code,
    label: country.name,
}));

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

        const onKeyDown = (event: KeyboardEvent) => {
            if (event.key === 'Escape') {
                setOpen(false);
            }
        };

        const previousOverflow = document.body.style.overflow;
        document.body.style.overflow = 'hidden';

        window.addEventListener('keydown', onKeyDown);

        return () => {
            document.body.style.overflow = previousOverflow;
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
                <>
                    <button
                        type="button"
                        aria-label="Close region picker"
                        className="fixed inset-0 z-[290] bg-black/45 sm:bg-transparent"
                        onClick={() => setOpen(false)}
                    />
                    <div
                        id={menuId}
                        role="dialog"
                        aria-label="Region and currency"
                        className="fixed top-[4.75rem] right-4 left-4 z-[300] mx-auto max-h-[min(70vh,28rem)] w-auto max-w-sm overflow-y-auto rounded-lg border border-[var(--lp-border)] bg-white p-3.5 shadow-xl sm:absolute sm:top-full sm:right-0 sm:left-auto sm:mt-2 sm:max-h-none sm:w-80 sm:max-w-none sm:p-3"
                    >
                        <div className="mb-2 flex items-start justify-between gap-2 sm:mb-0 sm:block">
                            <div className="min-w-0">
                                <p className="text-lp-navy text-xs font-semibold">
                                    Prices for {countryName}
                                </p>
                                <p className="text-lp-mid mt-1 text-[0.7rem] leading-relaxed">
                                    We detect your region and show local
                                    currency. South Africa checks out with
                                    Payfast; other countries use Paddle.
                                </p>
                            </div>
                            <button
                                type="button"
                                className="text-lp-mid -mr-1 -mt-1 rounded-md p-1.5 hover:bg-[var(--lp-off)] sm:hidden"
                                aria-label="Close"
                                onClick={() => setOpen(false)}
                            >
                                <X className="h-4 w-4" />
                            </button>
                        </div>

                        <label className="mt-3 block">
                            <span className="text-lp-light text-[0.65rem] font-medium tracking-wide uppercase">
                                Country
                            </span>
                            <select
                                className="text-lp-navy mt-1 w-full max-w-full rounded-md border border-[var(--lp-border)] bg-[var(--lp-off)] px-2.5 py-2 text-sm outline-none focus:border-[var(--lp-navy)]"
                                value={
                                    demoCountries.some(
                                        (item) => item.code === countryCode,
                                    )
                                        ? countryCode
                                        : 'US'
                                }
                                onChange={(event) =>
                                    setCountryCode(event.target.value)
                                }
                            >
                                {!demoCountries.some(
                                    (item) => item.code === countryCode,
                                ) ? (
                                    <option value={countryCode}>
                                        {countryName} ({countryCode})
                                    </option>
                                ) : null}
                                {demoCountries.map((country) => (
                                    <option
                                        key={country.code}
                                        value={country.code}
                                    >
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
                                className="text-lp-navy mt-1 w-full max-w-full rounded-md border border-[var(--lp-border)] bg-[var(--lp-off)] px-2.5 py-2 text-sm outline-none focus:border-[var(--lp-navy)]"
                                value={currencyCode}
                                onChange={(event) =>
                                    setCurrencyCode(
                                        event.target
                                            .value as LaunchpadCurrencyCode,
                                    )
                                }
                            >
                                {currencyOptions.map((currency) => (
                                    <option
                                        key={currency.code}
                                        value={currency.code}
                                    >
                                        {currency.code} — {currency.label}
                                    </option>
                                ))}
                            </select>
                        </label>

                        <p className="text-lp-light mt-3 text-[0.65rem] leading-relaxed">
                            Display amounts use estimated FX. Checkout charges
                            Payfast in ZAR for ZA/NA/BW, or Paddle for
                            international customers when gateway keys are
                            configured.
                        </p>
                    </div>
                </>
            ) : null}
        </div>
    );
}
