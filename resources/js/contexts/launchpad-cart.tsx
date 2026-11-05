import {
    createContext,
    useCallback,
    useContext,
    useMemo,
    useState,
    type ReactNode,
} from 'react';

import type { LaunchpadService } from '@/data/launchpad/services';

export type CartItem = {
    id: string;
    name: string;
    price: number;
    quantity: number;
};

type LaunchpadCartContextValue = {
    items: CartItem[];
    isOpen: boolean;
    itemCount: number;
    total: number;
    openCart: () => void;
    closeCart: () => void;
    toggleCart: () => void;
    addService: (service: LaunchpadService) => void;
    removeItem: (id: string) => void;
    clearCart: () => void;
};

const LaunchpadCartContext = createContext<LaunchpadCartContextValue | null>(null);

export function LaunchpadCartProvider({ children }: { children: ReactNode }) {
    const [items, setItems] = useState<CartItem[]>([]);
    const [isOpen, setIsOpen] = useState(false);

    const openCart = useCallback(() => setIsOpen(true), []);
    const closeCart = useCallback(() => setIsOpen(false), []);
    const toggleCart = useCallback(() => setIsOpen((open) => !open), []);

    const addService = useCallback((service: LaunchpadService) => {
        setItems((current) => {
            const existing = current.find((item) => item.id === service.id);

            if (existing) {
                return current.map((item) =>
                    item.id === service.id
                        ? { ...item, quantity: item.quantity + 1 }
                        : item,
                );
            }

            return [
                ...current,
                {
                    id: service.id,
                    name: service.name,
                    price: service.price,
                    quantity: 1,
                },
            ];
        });
        setIsOpen(true);
    }, []);

    const removeItem = useCallback((id: string) => {
        setItems((current) => current.filter((item) => item.id !== id));
    }, []);

    const clearCart = useCallback(() => setItems([]), []);

    const value = useMemo<LaunchpadCartContextValue>(() => {
        const itemCount = items.reduce((sum, item) => sum + item.quantity, 0);
        const total = items.reduce(
            (sum, item) => sum + item.price * item.quantity,
            0,
        );

        return {
            items,
            isOpen,
            itemCount,
            total,
            openCart,
            closeCart,
            toggleCart,
            addService,
            removeItem,
            clearCart,
        };
    }, [
        items,
        isOpen,
        openCart,
        closeCart,
        toggleCart,
        addService,
        removeItem,
        clearCart,
    ]);

    return (
        <LaunchpadCartContext.Provider value={value}>
            {children}
        </LaunchpadCartContext.Provider>
    );
}

export function useLaunchpadCart(): LaunchpadCartContextValue {
    const context = useContext(LaunchpadCartContext);

    if (!context) {
        throw new Error('useLaunchpadCart must be used within LaunchpadCartProvider');
    }

    return context;
}
