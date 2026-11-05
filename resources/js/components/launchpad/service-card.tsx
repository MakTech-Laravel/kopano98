import { motion, useReducedMotion } from 'framer-motion';
import { Check } from 'lucide-react';
import { toast } from 'sonner';

import { useLaunchpadCart } from '@/contexts/launchpad-cart';
import { useLaunchpadLocale } from '@/contexts/launchpad-locale';
import type { LaunchpadService } from '@/data/launchpad/services';

type ServiceCardProps = {
    service: LaunchpadService;
    variant?: 'tier' | 'package';
};

export function ServiceCard({
    service,
    variant = 'tier',
}: ServiceCardProps) {
    const { addService } = useLaunchpadCart();
    const { formatPrice, formatBaseZar, currencyCode } = useLaunchpadLocale();
    const isPackage = variant === 'package';
    const reduceMotion = useReducedMotion();

    return (
        <motion.article
            className={`relative flex h-full flex-col overflow-hidden rounded-[10px] border bg-white ${service.popular
                ? 'border-[var(--lp-navy)] shadow-sm'
                : 'border-[var(--lp-border)]'
                }`}
            whileHover={
                reduceMotion
                    ? undefined
                    : {
                        y: -4,
                        boxShadow: '0 12px 28px rgba(13,27,42,0.08)',
                    }
            }
            transition={{ duration: 0.22 }}
        >
            {service.popular ? (
                <span className="bg-lp-navy text-lp-gold absolute top-0 right-0 z-10 rounded-bl-md px-2.5 py-1 text-[0.62rem] font-semibold tracking-[0.06em] uppercase">
                    Most popular
                </span>
            ) : null}

            <div
                className={`px-4 pt-4 pb-3 ${isPackage
                    ? 'bg-lp-navy text-white'
                    : 'bg-[linear-gradient(160deg,var(--lp-navy)_0%,var(--lp-navy-2)_100%)] text-white'
                    }`}
            >
                {service.badge ? (
                    <p className="mb-1.5 text-[0.65rem] font-semibold tracking-[0.06em] text-white/55 uppercase">
                        {service.badge}
                    </p>
                ) : null}
                <h3 className="font-lp-display text-[1.35rem] leading-tight text-white">
                    {service.name.replace(/^CV Rewrite — |^LinkedIn Profile Fix — /, '')}
                </h3>
                <p className="mt-1.5 text-[0.75rem] leading-relaxed text-white/65">
                    {service.description}
                </p>
            </div>

            <div className="flex flex-1 flex-col p-4">
                <ul className="mb-4 space-y-2">
                    {service.features.map((feature) => (
                        <li
                            key={feature}
                            className="text-lp-mid flex items-start gap-2 text-[0.78rem] leading-snug"
                        >
                            <Check
                                className="mt-0.5 h-3.5 w-3.5 shrink-0 text-[var(--lp-green)]"
                                strokeWidth={3}
                            />
                            <span
                                className={
                                    isPackage &&
                                        !feature.toLowerCase().includes('report') &&
                                        !feature.toLowerCase().includes('suggestion') &&
                                        !feature.toLowerCase().includes('revision') &&
                                        !feature.toLowerCase().includes('deliver')
                                        ? 'text-lp-navy font-semibold'
                                        : undefined
                                }
                            >
                                {feature}
                            </span>
                        </li>
                    ))}
                </ul>

                <div className="mt-auto border-t border-[var(--lp-border)] pt-3">
                    <div className="flex items-end justify-between gap-2">
                        <div>
                            <p className="font-lp-display text-[1.55rem] leading-none text-[var(--lp-gold-on-light)]">
                                {formatPrice(service.price)}
                            </p>
                            {service.compareAt ? (
                                <p className="text-lp-light mt-1 text-[0.72rem] line-through">
                                    {formatPrice(service.compareAt)}
                                </p>
                            ) : null}
                            {currencyCode !== 'ZAR' ? (
                                <p className="text-lp-light mt-0.5 text-[0.68rem]">
                                    Base {formatBaseZar(service.price)}
                                </p>
                            ) : null}
                        </div>
                        <p className="text-lp-light pb-0.5 text-right text-[0.7rem]">
                            {service.unit ?? 'once-off'}
                            <br />
                            {service.eta}
                        </p>
                    </div>
                    <button
                        type="button"
                        className="btn-lp-navy mt-3 w-full py-2.5 text-[0.82rem]"
                        onClick={() => {
                            addService(service);
                            toast.success(`${service.name} added to cart`);
                        }}
                    >
                        Place Order
                    </button>
                </div>
            </div>
        </motion.article>
    );
}
