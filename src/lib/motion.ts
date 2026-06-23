import type { Variants } from 'framer-motion'

/**
 * Shared Framer Motion variants for premium scroll reveals.
 * Use `staggerContainer` on a parent and `fadeUp` on each child for a
 * staggered fade-up effect. Pair with `whileInView` + `viewport`.
 */

export const fadeUp: Variants = {
  hidden: { opacity: 0, y: 24 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.21, 0.47, 0.32, 0.98] },
  },
}

export const fadeIn: Variants = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { duration: 0.6, ease: 'easeOut' } },
}

export const scaleIn: Variants = {
  hidden: { opacity: 0, scale: 0.95 },
  show: { opacity: 1, scale: 1, transition: { duration: 0.5, ease: 'easeOut' } },
}

export const staggerContainer: Variants = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.1, delayChildren: 0.05 },
  },
}

/** Standard viewport config so reveals fire once, slightly before fully in view. */
export const viewportOnce = { once: true, margin: '-80px' } as const
