'use client'

import { motion } from 'framer-motion'
import HelloDemo from '@/components/helloDemo/HelloDemo'
import { Meteors } from '@/components/magicui/meteors'

export default function TrpcPage() {
  return (
    <div className='font-sans min-h-screen bg-background relative overflow-hidden'>
      {/* 背景装饰 */}
      <div className='absolute inset-0 bg-gradient-warm opacity-5' />
      <Meteors number={20} />

      <main className='flex flex-col relative z-10'>
        <div className='p-4 md:p-6'>
          <div className='max-w-6xl mx-auto'>
            <motion.div
              className='mb-8 text-center'
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <motion.div
                className='inline-flex rounded-full bg-primary/10 px-4 py-1.5 text-sm font-medium text-primary mb-6 shadow-warm'
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: 0.1 }}
              >
                端到端类型安全演示
              </motion.div>

              <motion.h1
                className='text-4xl md:text-5xl font-bold tracking-tight mb-4 text-gradient-primary'
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
              >
                tRPC 示例演示
              </motion.h1>

              <motion.p
                className='text-lg text-muted-foreground max-w-2xl mx-auto'
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.3 }}
              >
                这是一个完整的 tRPC + Zod + Drizzle ORM 的端到端类型安全示例，
                展示了如何构建现代化的全栈应用。
              </motion.p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              <HelloDemo />
            </motion.div>
          </div>
        </div>
      </main>
    </div>
  )
}
