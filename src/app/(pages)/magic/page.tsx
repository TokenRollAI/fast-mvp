'use client'

import { motion } from 'framer-motion'
import { MagicShowcase } from '@/components/magicui/MagicShowcase'

export default function MagicPage() {
  return (
    <div className='font-sans min-h-screen bg-background relative overflow-hidden'>
      {/* 背景装饰 */}
      <div className='absolute inset-0 bg-gradient-accent opacity-5' />

      <main className='flex flex-col relative z-10'>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
        >
          <MagicShowcase />
        </motion.div>

        <div className='p-4 md:p-6'>
          <div className='max-w-6xl mx-auto text-center'>
            <motion.div
              className='inline-flex rounded-full bg-primary/10 px-4 py-1.5 text-sm font-medium text-primary mb-6 shadow-warm'
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              精美动画组件集合
            </motion.div>

            <motion.h1
              className='text-4xl md:text-5xl font-bold tracking-tight mb-4 text-gradient-primary'
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              Magic UI 动画展示
            </motion.h1>

            <motion.p
              className='text-lg text-muted-foreground max-w-2xl mx-auto'
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
            >
              这里展示了各种精美的 UI 动画效果和交互组件，
              为你的应用增添视觉魅力。
            </motion.p>
          </div>
        </div>
      </main>
    </div>
  )
}
