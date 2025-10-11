'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Card, CardContent } from '@/components/ui/card'

/**
 * TextRevealDemo Component
 *
 * An interactive text reveal effect demonstrating smooth transitions.
 * Features include:
 * - Hover-triggered text swap with smooth opacity and scale transitions
 * - Two alternating messages with theme-based gradient text
 * - Staggered entrance animations for title and description
 * - Accessible hover interactions
 *
 * @example
 * ```tsx
 * <TextRevealDemo />
 * ```
 */
export function TextRevealDemo() {
  const [isHovered, setIsHovered] = useState(false)

  return (
    <div className='flex items-center justify-center'>
      <Card className='w-full max-w-2xl shadow-warm'>
        <CardContent className='p-8'>
          <motion.div
            className='text-center'
            onHoverStart={() => setIsHovered(true)}
            onHoverEnd={() => setIsHovered(false)}
            role='region'
            aria-label='Interactive text reveal demonstration'
          >
            <motion.h3
              className='text-2xl font-bold mb-4 text-foreground'
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, ease: 'easeOut' }}
            >
              鼠标悬停展示隐藏文字
            </motion.h3>

            <motion.p
              className='text-muted-foreground mb-6'
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1, ease: 'easeOut' }}
            >
              这是一个文字揭示效果的演示组件，展示了自定义动画的强大能力。
            </motion.p>

            <div
              className='relative h-20 flex items-center justify-center cursor-pointer'
              role='button'
              tabIndex={0}
              aria-label='Hover or focus to reveal alternate text'
              onFocus={() => setIsHovered(true)}
              onBlur={() => setIsHovered(false)}
            >
              <motion.div
                className='absolute inset-0 flex items-center justify-center text-3xl font-bold'
                animate={{
                  opacity: isHovered ? 0 : 1,
                  scale: isHovered ? 0.8 : 1,
                }}
                transition={{ duration: 0.3, ease: 'easeInOut' }}
              >
                <span className='text-gradient-primary'>
                  MagicUI 让你的界面栩栩如生
                </span>
              </motion.div>

              <motion.div
                className='absolute inset-0 flex items-center justify-center text-3xl font-bold'
                animate={{
                  opacity: isHovered ? 1 : 0,
                  scale: isHovered ? 1 : 0.8,
                }}
                transition={{ duration: 0.3, ease: 'easeInOut' }}
              >
                <span className='text-gradient-accent'>
                  体验超炫酷的动画效果 ✨
                </span>
              </motion.div>
            </div>
          </motion.div>
        </CardContent>
      </Card>
    </div>
  )
}
