import { toast } from 'sonner';

import { useLaunchpadCart } from '@/contexts/launchpad-cart';
import { useLaunchpadLocale } from '@/contexts/launchpad-locale';
import type { LaunchpadService } from '@/data/launchpad/services';

type ServiceCardProps = {
    service: LaunchpadService;
};

export function ServiceCard({ service }: ServiceCardProps) {
    const { addService } = useLaunchpadCart();
    const { formatPrice, formatBaseZar, currencyCode } = useLaunchpadLocale();

    return (
        <article
            className={`relative flex flex-col rounded-[8px] border bg-white p-4 transition hover:border-[var(--lp-navy)] ${
                service.popular
                    ? 'border-[var(--lp-navy)] shadow-sm'
                    : 'border-[var(--lp-border)]'
            }`}
        >
            {service.popular ? (
                <span className="bg-lp-navy text-lp-gold absolute top-0 right-0 rounded-bl px-2.5 py-1 text-[0.62rem] font-medium tracking-[0.06em] uppercase">
                    Popular
                </span>
            ) : null}
            <div className="bg-lp-gold mb-3 h-px w-8" />
            <h3 className="text-lp-navy mb-1 text-[0.95rem] font-semibold">
                {service.name}
            </h3>
            <p className="text-lp-mid mb-3 text-[0.78rem] leading-relaxed">
                {service.description}
            </p>
            <ul className="mb-4 space-y-1.5">
                {service.features.map((feature) => (
                    <li
                        key={feature}
                        className="text-lp-mid relative pl-3.5 text-[0.78rem] before:absolute before:top-[0.55em] before:left-0.5 before:h-1 before:w-1 before:rounded-full before:bg-[var(--lp-text-light)] before:content-['']"
                    >
                        {feature}
                    </li>
                ))}
            </ul>
            <div className="mt-auto">
                <p className="font-lp-display text-[1.4rem] text-[var(--lp-gold-on-light)]">
                    {formatPrice(service.price)}{' '}
                    <span className="font-[family-name:var(--font-lp-sans)] text-[0.72rem] font-normal text-[var(--lp-text-light)]">
                        once-off
                    </span>
                </p>
                {currencyCode !== 'ZAR' ? (
                    <p className="text-lp-light text-[0.68rem]">
                        Base {formatBaseZar(service.price)}
                    </p>
                ) : null}
                <p className="text-lp-light mt-0.5 text-[0.7rem]">
                    {service.eta}
                </p>
                <button
                    type="button"
                    className="mt-3 w-full rounded-[5px] border-[1.5px] border-[var(--lp-border)] py-2.5 text-[0.82rem] font-bold text-[var(--lp-navy)] transition hover:border-[var(--lp-navy)] hover:bg-[var(--lp-navy)] hover:text-white"
                    onClick={() => {
                        addService(service);
                        toast.success(`${service.name} added to cart`);
                    }}
                >
                    Place Order
                </button>
            </div>
        </article>
    );
}
