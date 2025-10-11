'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { OpenAIChatDemo } from '@/components/chat/OpenAIChatDemo'
import { Meteors } from '@/components/magicui/meteors'

export default function OpenAIPage() {
  return (
    <div className='mx-auto flex min-h-screen w-full max-w-5xl flex-col gap-12 px-6 py-16 relative'>
      {/* 背景装饰 */}
      <div className='absolute inset-0 bg-gradient-cool opacity-5 -z-10' />
      <Meteors number={15} />

      <motion.section
        className='space-y-6 text-center relative z-10'
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <motion.div
          className='inline-flex rounded-full bg-primary/10 px-4 py-1.5 text-sm font-medium text-primary shadow-warm'
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          OpenAI 集成演示
        </motion.div>

        <motion.h1
          className='text-4xl font-bold tracking-tight sm:text-5xl text-gradient-primary'
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          在 Fast MVP 中体验 OpenAI 聊天能力
        </motion.h1>

        <motion.p
          className='mx-auto max-w-2xl text-lg text-muted-foreground'
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          下方的演示组件通过 Vercel AI SDK 调用你在环境变量中配置的 OpenAI
          模型，展示了如何在几行代码内构建 AI 交互体验。
        </motion.p>
      </motion.section>

      <motion.div
        className='flex justify-center relative z-10'
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.4 }}
      >
        <OpenAIChatDemo />
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.5 }}
        className='relative z-10'
      >
        <Card className='border-dashed shadow-warm'>
          <CardContent className='flex flex-col gap-4 p-6 text-left text-sm text-muted-foreground sm:flex-row sm:items-center sm:justify-between'>
            <div>
              <p className='font-medium text-foreground'>快速上手</p>
              <p>
                在{' '}
                <code className='bg-muted px-1.5 py-0.5 rounded'>
                  .env.local
                </code>{' '}
                中设置{' '}
                <code className='bg-muted px-1.5 py-0.5 rounded'>
                  OPENAI_API_KEY
                </code>{' '}
                （及可选的{' '}
                <code className='bg-muted px-1.5 py-0.5 rounded'>
                  OPENAI_MODEL
                </code>
                ），然后重启开发服务器。
              </p>
            </div>
            <Button asChild variant='outline' className='shadow-warm'>
              <Link href='/'>返回首页</Link>
            </Button>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  )
}
