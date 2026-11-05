import { useLaunchpadCart } from '@/contexts/launchpad-cart';
import { formatZar } from '@/data/launchpad/services';

export function MobileCartBar() {
    const { itemCount, total, openCart } = useLaunchpadCart();

    if (itemCount === 0) {
        return null;
    }

    return (
        <div className="bg-lp-navy sticky top-14 z-[150] border-b border-[var(--lp-navy-3)] py-2 lg:hidden">
            <div className="container">
                <button
                    type="button"
                    onClick={openCart}
                    className="btn-lp-gold flex w-full items-center justify-between gap-2 px-3 py-2 text-[0.8rem]"
                >
                    <span>
                        View Cart · {itemCount} item{itemCount === 1 ? '' : 's'}
                    </span>
                    <span className="shrink-0 font-semibold">{formatZar(total)}</span>
                </button>
            </div>
        </div>
    );
}
