'use client'

import { motion } from 'framer-motion'
import { useEffect, useState } from 'react'

/**
 * Meteors - Animated meteor shower effect component
 *
 * Creates a visual effect of meteors falling across the screen.
 * Each meteor has randomized position, timing, and duration for natural appearance.
 * Uses theme colors (bg-muted) for consistency.
 *
 * @param number - Number of meteors to display
 *
 * @example
 * ```tsx
 * <div className="relative overflow-hidden">
 *   <Meteors number={30} />
 *   <YourContent />
 * </div>
 * ```
 */
export function Meteors({ number }: { number: number }) {
  const [meteors, setMeteors] = useState<number[]>([])

  useEffect(() => {
    setMeteors(Array.from({ length: number }, (_, i) => i))
  }, [number])

  return (
    <>
      {meteors.map((meteor) => (
        <motion.span
          key={meteor}
          className='absolute h-0.5 w-0.5 rotate-[215deg] animate-pulse rounded-[9999px] bg-muted shadow-[0_0_0_1px_hsl(var(--border)/0.1)]'
          style={{
            top: Math.random() * 100 + '%',
            left: Math.random() * 100 + '%',
            animationDelay: Math.random() * 8 + 's',
            animationDuration: Math.random() * 8 + 2 + 's',
          }}
          animate={{
            x: [0, -400],
            y: [0, 400],
            opacity: [0, 1, 0],
          }}
          transition={{
            duration: Math.random() * 8 + 2,
            repeat: Infinity,
            delay: Math.random() * 8,
          }}
        />
      ))}
    </>
  )
}
