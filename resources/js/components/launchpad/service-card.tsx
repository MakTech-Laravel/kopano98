import {
    Briefcase,
    Check,
    Clock,
    FileText,
    GraduationCap,
    Phone,
    Search,
    SlidersHorizontal,
    Star,
} from 'lucide-react';
import type { ReactNode } from 'react';
import { toast } from 'sonner';

import { useLaunchpadCart } from '@/contexts/launchpad-cart';
import { useLaunchpadLocale } from '@/contexts/launchpad-locale';
import type { LaunchpadService } from '@/data/launchpad/services';

type ServiceCardProps = {
    service: LaunchpadService;
    variant?: 'tier' | 'package';
    /** Extra controls rendered above the Place Order button (e.g. portfolio stepper). */
    footerSlot?: ReactNode;
    /** Override displayed price (portfolio totals). */
    priceOverride?: number;
};

function serviceIcon(service: LaunchpadService): ReactNode {
    if (service.group === 'linkedin' || service.category === 'linkedin') {
        return (
            <svg width="18" height="18" viewBox="0 0 24 24" fill="#fff" aria-hidden>
                <path d="M7.12 9.57H3.56V20h3.56V9.57ZM5.34 4c-1.21 0-2 .8-2 1.84 0 1.02.77 1.84 1.96 1.84h.02c1.23 0 2-.82 2-1.84C7.3 4.8 6.55 4 5.34 4ZM20.45 20h-3.56v-5.6c0-1.4-.5-2.36-1.76-2.36-.96 0-1.53.65-1.78 1.27-.09.22-.11.53-.11.84V20H9.68s.05-9.47 0-10.43h3.56v1.48c.47-.73 1.32-1.77 3.2-1.77 2.34 0 4.01 1.53 4.01 4.8V20Z" />
            </svg>
        );
    }

    const className = 'h-[18px] w-[18px]';
    if (service.id.includes('graduate') || service.id.includes('entry')) {
        return <GraduationCap className={className} strokeWidth={2} />;
    }
    if (service.id.includes('mid') || service.id === 'job-card') {
        return <Briefcase className={className} strokeWidth={2} />;
    }
    if (service.id.includes('senior') || service.popular) {
        return <Star className={className} strokeWidth={2} />;
    }
    if (service.id.includes('executive')) {
        return <SlidersHorizontal className={className} strokeWidth={2} />;
    }
    if (service.category === 'letter' || service.id.includes('portfolio')) {
        return <FileText className={className} strokeWidth={2} />;
    }
    if (service.category === 'prep') {
        return <Clock className={className} strokeWidth={2} />;
    }
    if (service.category === 'coaching') {
        return <Phone className={className} strokeWidth={2} />;
    }
    if (service.id.includes('search')) {
        return <Search className={className} strokeWidth={2} />;
    }

    return <FileText className={className} strokeWidth={2} />;
}

function displayName(service: LaunchpadService): string {
    return service.name
        .replace(/^CV Rewrite — /, '')
        .replace(/^LinkedIn Profile Fix — /, '');
}

function isHighlightFeature(feature: string): boolean {
    const lower = feature.toLowerCase();

    return !(
        lower.includes('report') ||
        lower.includes('suggestion') ||
        lower.includes('revision') ||
        lower.includes('deliver') ||
        lower.includes('email') ||
        lower.includes('ats score') ||
        lower.includes('photo')
    );
}

export function ServiceCard({
    service,
    variant = 'tier',
    footerSlot,
    priceOverride,
}: ServiceCardProps) {
    const { addService } = useLaunchpadCart();
    const { formatPrice } = useLaunchpadLocale();
    const isPackage = variant === 'package';
    const isLinkedIn = service.group === 'linkedin';
    const price = priceOverride ?? service.price;
    const saveAmount =
        service.compareAt && service.compareAt > service.price
            ? service.compareAt - service.price
            : null;

    const placeOrder = () => {
        addService(
            priceOverride !== undefined
                ? { ...service, price: priceOverride }
                : service,
        );
        toast.success(`${service.name} added to cart`);
    };

    if (isPackage) {
        const hunter = service.id === 'job-hunter-pack';
        const featured = Boolean(service.popular);

        return (
            <article
                className={`relative flex h-full flex-col overflow-hidden rounded-[10px] border-[1.5px] bg-white transition hover:shadow-[0_8px_30px_rgba(13,27,42,0.12)] ${featured
                    ? 'border-[var(--lp-navy)]'
                    : hunter
                        ? 'border-[var(--lp-gold-on-light)]'
                        : 'border-[var(--lp-border)]'
                    }`}
            >
                {service.popular || hunter ? (
                    <span
                        className={`absolute top-0 right-0 z-10 rounded-bl-md px-2.5 py-1 text-[0.62rem] font-extrabold tracking-[0.1em] uppercase ${hunter
                            ? 'bg-[var(--lp-gold)] text-[var(--lp-navy)]'
                            : 'bg-[var(--lp-navy)] text-[var(--lp-gold)]'
                            }`}
                    >
                        {hunter ? 'Best for Job Hunters' : 'Most Popular'}
                    </span>
                ) : null}

                <div className="border-b border-[var(--lp-border)] px-5 pt-5 pb-4">
                    {service.badge && !hunter ? (
                        <p className="mb-1.5 text-[0.65rem] font-bold tracking-[0.12em] text-[var(--lp-text-light)] uppercase">
                            {service.badge}
                        </p>
                    ) : hunter ? (
                        <p className="mb-1.5 text-[0.65rem] font-bold tracking-[0.12em] text-[var(--lp-text-light)] uppercase">
                            Hunter
                        </p>
                    ) : null}
                    <h3 className="font-lp-display text-lp-navy mb-1.5 text-[1.25rem] font-bold">
                        {service.name}
                    </h3>
                    <p className="font-lp-display text-[1.9rem] leading-none font-black text-[var(--lp-gold-on-light)]">
                        {service.unit === 'from' ? (
                            <>
                                <span className="mr-1 font-[family-name:var(--font-lp-sans)] text-[0.7rem] font-bold text-[var(--lp-text)]">
                                    From{' '}
                                </span>
                                {formatPrice(price)}
                            </>
                        ) : (
                            <>
                                {formatPrice(price)}{' '}
                                <sub className="align-baseline font-[family-name:var(--font-lp-sans)] text-[0.78rem] font-normal text-[var(--lp-text-light)]">
                                    {service.unit ?? 'once-off'}
                                </sub>
                            </>
                        )}
                        {service.compareAt ? (
                            <span className="ml-2 text-[0.66rem] font-normal text-[var(--lp-text-light)] line-through">
                                {formatPrice(service.compareAt)}
                            </span>
                        ) : null}
                    </p>
                    <p className="mt-1.5 text-[0.7rem] text-[var(--lp-text-light)]">
                        {service.eta}
                        {saveAmount ? (
                            <>
                                {' '}
                                ·{' '}
                                <strong className="font-medium text-[var(--lp-green)]">
                                    Save {formatPrice(saveAmount)}
                                </strong>
                            </>
                        ) : null}
                    </p>
                </div>

                <div className="flex flex-1 flex-col px-5 pt-4 pb-5">
                    <ul className="mb-4">
                        {service.features.map((feature) => (
                            <li
                                key={feature}
                                className={`flex items-start gap-2 border-b border-[var(--lp-border)] py-1.5 text-[0.8rem] last:border-b-0 ${isHighlightFeature(feature)
                                    ? 'text-lp-navy font-semibold'
                                    : 'text-[var(--lp-text-mid)]'
                                    }`}
                            >
                                <span className="mt-0.5 shrink-0 font-bold text-[var(--lp-green)]">
                                    ✓
                                </span>
                                {feature}
                            </li>
                        ))}
                    </ul>

                    {footerSlot}

                    <button
                        type="button"
                        className={`mt-auto w-full rounded-[5px] py-3 text-[0.83rem] font-bold transition ${featured || hunter || service.unit === 'from'
                            ? 'bg-lp-navy text-white hover:bg-[var(--lp-navy-2)]'
                            : 'text-lp-navy border-[1.5px] border-[var(--lp-border)] bg-transparent hover:border-[var(--lp-navy)]'
                            }`}
                        onClick={placeOrder}
                    >
                        Place Order
                    </button>
                </div>
            </article>
        );
    }

    return (
        <article
            className={`relative flex h-full flex-col overflow-hidden rounded-xl border border-[var(--lp-border)] bg-white transition hover:-translate-y-[3px] hover:shadow-[0_10px_24px_rgba(13,27,42,0.1)] ${service.popular ? 'shadow-[0_6px_20px_rgba(212,168,66,0.18)]' : ''
                }`}
        >
            {service.popular ? (
                <span className="absolute top-0 right-0 z-10 rounded-bl-lg bg-[var(--lp-gold)] px-2.5 py-1 text-[0.6rem] font-extrabold tracking-[0.08em] text-[var(--lp-navy)] uppercase">
                    Most popular
                </span>
            ) : null}

            <div className="bg-[linear-gradient(160deg,#1b3250_0%,var(--lp-navy)_70%)] px-[1.15rem] pt-[1.1rem] pb-[0.85rem]">
                <div
                    className={`mb-2.5 flex h-[38px] w-[38px] items-center justify-center rounded-full shadow-[0_2px_6px_rgba(0,0,0,0.25)] ${isLinkedIn
                        ? 'bg-[#0a66c2] text-white'
                        : 'bg-[var(--lp-gold)] text-[var(--lp-navy)]'
                        }`}
                >
                    {serviceIcon(service)}
                </div>
                {service.badge ? (
                    <span
                        className={`mb-1.5 inline-block rounded-[3px] px-1.5 py-0.5 text-[0.63rem] font-bold ${service.badge.toLowerCase().includes('best')
                            ? 'bg-[rgba(254,243,199,0.95)] text-[#92400e]'
                            : 'bg-[rgba(219,234,254,0.92)] text-[#1e40af]'
                            }`}
                    >
                        {service.badge}
                    </span>
                ) : null}
                <h3 className="font-lp-display block text-[1.05rem] font-extrabold text-white">
                    {displayName(service)}
                </h3>
            </div>

            <div className="flex flex-1 flex-col px-[1.15rem] pt-4 pb-[1.15rem]">
                <ul className="mb-3.5">
                    {service.features.map((feature) => (
                        <li
                            key={feature}
                            className="mb-1.5 flex items-start gap-1.5 text-[0.76rem] leading-[1.45] text-[var(--lp-text-mid)]"
                        >
                            <Check
                                className="mt-0.5 h-3 w-3 shrink-0 text-[var(--lp-green)]"
                                strokeWidth={3}
                            />
                            {feature}
                        </li>
                    ))}
                </ul>

                <div className="mt-auto">
                    <p className="font-lp-display text-[1.3rem] font-extrabold text-[var(--lp-gold)]">
                        {formatPrice(price)}{' '}
                        <span className="font-[family-name:var(--font-lp-sans)] text-[0.7rem] font-normal text-[var(--lp-text-light)]">
                            {service.unit ?? 'once-off'}
                        </span>
                    </p>
                    <p className="mt-0.5 mb-3.5 text-[0.68rem] text-[var(--lp-text-light)]">
                        {service.eta}
                    </p>
                    <button
                        type="button"
                        className="w-full rounded-md bg-[var(--lp-gold)] py-2.5 text-[0.8rem] font-extrabold tracking-[0.02em] text-[var(--lp-navy)] transition hover:opacity-90"
                        onClick={placeOrder}
                    >
                        Place Order
                    </button>
                </div>
            </div>
        </article>
    );
}
