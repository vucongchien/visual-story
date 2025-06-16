import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const variantOptions = {
    fast: {
        container: {
            open: {
                opacity: 1,
                transition: {
                    duration: 0.01,
                    delayChildren: 0.01,
                    staggerChildren: 0.05,
                },
            },
            closed: {
                opacity: 0,
                transition: {
                    when: 'afterChildren',
                    staggerChildren: 0.025,
                    staggerDirection: -1,
                },
            },
        },
        item: {
            open: { opacity: 1, y: 0, transition: { duration: 0.1 } },
            closed: { opacity: 0, y: -10, transition: { duration: 0.1 } },
        },
    },
    normal: {
        container: {
            open: {
                opacity: 1,
                transition: {
                    duration: 0.01,
                    delayChildren: 0.01,
                    staggerChildren: 0.1,
                },
            },
            closed: {
                opacity: 0,
                transition: {
                    when: 'afterChildren',
                    staggerChildren: 0.05,
                    staggerDirection: -1,
                },
            },
        },
        item: {
            open: { opacity: 1, y: 0, transition: { duration: 0.2 } },
            closed: { opacity: 0, y: -10, transition: { duration: 0.2 } },
        },
    },
    slow: {
        container: {
            open: {
                opacity: 1,
                transition: {
                    duration: 0.01,
                    delayChildren: 0.01,
                    staggerChildren: 0.2,
                },
            },
            closed: {
                opacity: 0,
                transition: {
                    when: 'afterChildren',
                    staggerChildren: 0.1,
                    staggerDirection: -1,
                },
            },
        },
        item: {
            open: { opacity: 1, y: 0, transition: { duration: 0.4 } },
            closed: { opacity: 0, y: -10, transition: { duration: 0.4 } },
        },
    },
};

type StaggeredListProps = {
    isOpen: boolean;
    children: React.ReactNode;
    className?: string;
    variant?: 'fast' | 'normal' | 'slow';
};

export const StaggeredList: React.FC<StaggeredListProps> = ({
    isOpen,
    children,
    className,
    variant = 'normal',
}) => {
    const { container, item } = variantOptions[variant];

    return (
        <AnimatePresence>
            {isOpen && (
                <motion.div
                    className={className}
                    initial="closed"
                    animate="open"
                    exit="closed"
                    variants={container}
                >
                    {React.Children.map(children, (child) => (
                        <motion.div variants={item}>
                            {child}
                        </motion.div>
                    ))}
                </motion.div>
            )}
        </AnimatePresence>
    );
};