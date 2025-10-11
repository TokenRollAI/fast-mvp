'use client'

import { Button } from '@/components/ui/button'
import { ChevronRight } from 'lucide-react'
import { motion } from 'framer-motion'

/**
 * AnimatedButton Component
 *
 * A beautifully animated button showcasing MagicUI capabilities with theme system integration.
 * Features include:
 * - Scale animation on hover and tap
 * - Smooth gradient transitions using theme colors
 * - Infinite shimmer effect
 * - Chevron icon with slide animation
 *
 * @example
 * ```tsx
 * <AnimatedButton />
 * ```
 */
export function AnimatedButton() {
  return (
    <motion.div
      className='relative'
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      transition={{ duration: 0.2, ease: 'easeInOut' }}
    >
      <Button
        className='group relative h-12 px-6 text-base font-medium bg-gradient-primary text-primary-foreground hover:opacity-90 border-0 overflow-hidden shadow-warm'
        size='lg'
        aria-label='MagicUI example button with animations'
      >
        <motion.div
          className='flex items-center relative z-10'
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          ✨ MagicUI 示例按钮
          <ChevronRight className='ml-1 size-3 transition-transform duration-300 ease-in-out group-hover:translate-x-0.5' />
        </motion.div>

        {/* Animated background hover effect */}
        <motion.div
          className='absolute inset-0 bg-gradient-accent opacity-0 group-hover:opacity-100 transition-opacity duration-300'
          initial={false}
        />

        {/* Shimmer effect using theme color */}
        <motion.div
          className='absolute inset-0 rounded-md'
          style={{
            background:
              'linear-gradient(90deg, transparent, rgba(240, 240, 240, 0.4), transparent)',
            transform: 'translateX(-100%)',
          }}
          animate={{
            transform: 'translateX(300%)',
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: 'linear',
          }}
        />
      </Button>
    </motion.div>
  )
}
