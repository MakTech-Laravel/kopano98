import {
    motion,
    useReducedMotion,
    type HTMLMotionProps,
    type Variants,
} from 'framer-motion';
import type { ReactNode } from 'react';

type RevealDirection = 'up' | 'down' | 'left' | 'right' | 'none' | 'scale';

type RevealProps = {
    children: ReactNode;
    delay?: number;
    direction?: RevealDirection;
    duration?: number;
    className?: string;
} & Omit<HTMLMotionProps<'div'>, 'children'>;

const offsets: Record<
    RevealDirection,
    { x?: number; y?: number; scale?: number }
> = {
    up: { y: 28 },
    down: { y: -20 },
    left: { x: 32 },
    right: { x: -32 },
    none: {},
    scale: { scale: 0.94, y: 12 },
};

export function Reveal({
    children,
    delay = 0,
    direction = 'up',
    duration = 0.55,
    className,
    ...props
}: RevealProps) {
    const reduceMotion = useReducedMotion();
    const offset = offsets[direction];

    if (reduceMotion) {
        return <div className={className}>{children}</div>;
    }

    return (
        <motion.div
            initial={{
                opacity: 0,
                x: offset.x ?? 0,
                y: offset.y ?? 0,
                scale: offset.scale ?? 1,
            }}
            whileInView={{ opacity: 1, x: 0, y: 0, scale: 1 }}
            viewport={{ once: true, amount: 0.01, margin: '0px 0px -8% 0px' }}
            transition={{
                duration,
                delay,
                ease: [0.22, 1, 0.36, 1],
            }}
            className={className}
            {...props}
        >
            {children}
        </motion.div>
    );
}

type StaggerProps = {
    children: ReactNode;
    className?: string;
    delay?: number;
    stagger?: number;
};

const staggerItem: Variants = {
    hidden: { opacity: 0, y: 22 },
    show: {
        opacity: 1,
        y: 0,
        transition: { duration: 0.45, ease: [0.22, 1, 0.36, 1] },
    },
};

export function Stagger({
    children,
    className,
    delay = 0,
    stagger = 0.07,
}: StaggerProps) {
    const reduceMotion = useReducedMotion();

    if (reduceMotion) {
        return <div className={className}>{children}</div>;
    }

    return (
        <motion.div
            className={className}
            variants={{
                hidden: {},
                show: {
                    transition: {
                        staggerChildren: stagger,
                        delayChildren: delay,
                    },
                },
            }}
            initial="hidden"
            whileInView="show"
            // Tall mobile grids (e.g. /templates 1-col) can exceed the viewport;
            // requiring a % of the whole grid never fires and cards stay opacity 0.
            viewport={{ once: true, amount: 0.01, margin: '120px 0px' }}
        >
            {children}
        </motion.div>
    );
}

export function StaggerItem({
    children,
    className,
}: {
    children: ReactNode;
    className?: string;
}) {
    const reduceMotion = useReducedMotion();

    if (reduceMotion) {
        return <div className={className}>{children}</div>;
    }

    return (
        <motion.div className={className} variants={staggerItem}>
            {children}
        </motion.div>
    );
}

type FadeInProps = {
    children: ReactNode;
    delay?: number;
    className?: string;
} & Omit<HTMLMotionProps<'div'>, 'children'>;

/** Immediate page-load fade (not scroll-triggered). */
export function FadeIn({
    children,
    delay = 0,
    className,
    ...props
}: FadeInProps) {
    const reduceMotion = useReducedMotion();

    if (reduceMotion) {
        return <div className={className}>{children}</div>;
    }

    return (
        <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
                duration: 0.5,
                delay,
                ease: [0.22, 1, 0.36, 1],
            }}
            className={className}
            {...props}
        >
            {children}
        </motion.div>
    );
}
