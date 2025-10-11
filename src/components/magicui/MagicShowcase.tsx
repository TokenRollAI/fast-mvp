'use client'

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { AnimatedButton } from './AnimatedButton'
import { ParticleDemo } from './ParticleDemo'
import { TextRevealDemo } from './TextRevealDemo'
import { Meteors } from './Meteors'
import { RetroGrid } from './RetroGrid'
import { motion } from 'framer-motion'

export function MagicShowcase() {
  return (
    <div className='container mx-auto py-12 px-4'>
      <motion.div
        className='text-center mb-12'
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <h1 className='text-4xl font-bold mb-4 text-gradient-primary'>
          MagicUI 组件展示
        </h1>
        <p className='text-lg text-muted-foreground'>
          体验令人惊艳的动画组件库
        </p>
      </motion.div>

      <div className='grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8'>
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <Card className='relative overflow-hidden'>
            <CardHeader>
              <CardTitle>动画按钮</CardTitle>
              <CardDescription>带有渐变背景和流光效果的按钮</CardDescription>
            </CardHeader>
            <CardContent className='flex justify-center py-8'>
              <AnimatedButton />
            </CardContent>
          </Card>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          <Card className='relative overflow-hidden'>
            <CardHeader>
              <CardTitle>粒子效果</CardTitle>
              <CardDescription>动态粒子背景效果</CardDescription>
            </CardHeader>
            <CardContent>
              <ParticleDemo />
            </CardContent>
            <Meteors number={20} />
          </Card>
        </motion.div>
      </div>

      <motion.div
        className='mb-8'
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.4 }}
      >
        <Card className='relative overflow-hidden'>
          <CardHeader>
            <CardTitle>文字揭示卡片</CardTitle>
            <CardDescription>鼠标悬停时揭示隐藏文字的交互效果</CardDescription>
          </CardHeader>
          <CardContent className='py-8'>
            <TextRevealDemo />
          </CardContent>
        </Card>
      </motion.div>

      <motion.div
        className='relative'
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.5 }}
      >
        <Card className='relative overflow-hidden min-h-[200px] bg-card/50 backdrop-blur-sm shadow-warm'>
          <CardHeader>
            <CardTitle className='text-foreground'>复古网格背景</CardTitle>
            <CardDescription className='text-muted-foreground'>
              科技感十足的网格背景效果
            </CardDescription>
          </CardHeader>
          <CardContent className='py-16'>
            <div className='text-center relative z-10'>
              <motion.h3
                className='text-2xl font-bold mb-2 text-foreground'
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8, delay: 0.6 }}
              >
                Welcome to the Future
              </motion.h3>
              <motion.p
                className='text-muted-foreground'
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.8, delay: 0.8 }}
              >
                科技与美学的完美结合
              </motion.p>
            </div>
          </CardContent>
          <RetroGrid />
        </Card>
      </motion.div>
    </div>
  )
}
