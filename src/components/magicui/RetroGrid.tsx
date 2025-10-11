'use client'

import { motion } from 'framer-motion'

/**
 * RetroGrid - Animated retro-style grid background effect
 *
 * Creates a dynamic grid pattern with an animated light sweep across it.
 * The effect uses a radial gradient mask to fade out at the edges.
 * Perfect for hero sections or card backgrounds.
 * Uses theme colors (foreground and accent) for consistency.
 *
 * @example
 * ```tsx
 * <Card className="relative overflow-hidden">
 *   <RetroGrid />
 *   <CardContent className="relative z-10">
 *     Your content here
 *   </CardContent>
 * </Card>
 * ```
 */
export function RetroGrid() {
  return (
    <div className='pointer-events-none absolute inset-0 overflow-hidden [mask-image:radial-gradient(ellipse_at_center,black,transparent)]'>
      <div className='absolute inset-0 bg-[linear-gradient(to_right,transparent_0%,hsl(var(--foreground)/0.05)_50%,transparent_100%)] bg-[length:20px_20px] animate-pulse' />
      <div className='absolute inset-0 bg-[linear-gradient(to_bottom,transparent_0%,hsl(var(--foreground)/0.05)_50%,transparent_100%)] bg-[length:20px_20px] animate-pulse' />
      <motion.div
        className='absolute inset-0 bg-gradient-to-r from-transparent via-accent/20 to-transparent'
        animate={{
          x: [-100, 1000],
        }}
        transition={{
          duration: 3,
          repeat: Infinity,
          ease: 'linear',
        }}
      />
    </div>
  )
}
