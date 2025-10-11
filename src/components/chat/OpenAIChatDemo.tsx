'use client'

import { useState, useRef, useEffect } from 'react'
import { trpc } from '@/lib/trpc/client'
import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { cn } from '@/lib/utils/utils'
import { motion, AnimatePresence } from 'framer-motion'
import { Send, Sparkles, AlertCircle, Loader2 } from 'lucide-react'

const OPENAI_MODEL = 'gpt-4o-mini'

type Message = {
  id: string
  role: 'user' | 'assistant' | 'system'
  content: string
}

/**
 * 为聊天气泡生成一个可读的角色标签。
 *
 * @param role 聊天消息的角色。
 */
const getRoleLabel = (role: string) => {
  switch (role) {
    case 'user':
      return '你'
    case 'assistant':
      return 'AI'
    case 'system':
      return '系统'
    default:
      return role
  }
}

export const OpenAIChatDemo = () => {
  const [input, setInput] = useState('')
  const [messages, setMessages] = useState<Message[]>([])
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const messagesContainerRef = useRef<HTMLDivElement>(null)

  // 自动滚动到最新消息
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const sendMessageMutation = trpc.chat.sendMessage.useMutation({
    onSuccess: (data) => {
      // 添加助手回复到消息列表
      const assistantMessage: Message = {
        id: Date.now().toString() + '-assistant',
        role: 'assistant',
        content: data.response,
      }
      setMessages((prev) => [...prev, assistantMessage])
    },
    onError: (error) => {
      console.error('发送消息失败:', error)
    },
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!input.trim() || sendMessageMutation.isPending) return

    const messageText = input.trim()

    // 添加用户消息到列表
    const userMessage: Message = {
      id: Date.now().toString() + '-user',
      role: 'user',
      content: messageText,
    }

    // 先更新消息列表
    setMessages((prev) => [...prev, userMessage])

    // 发送消息到后端，使用当前的消息历史
    sendMessageMutation.mutate({
      message: messageText,
      provider: 'openai',
      model: OPENAI_MODEL,
      conversationHistory: messages.map((msg) => ({
        role: msg.role,
        content: msg.content,
      })),
    })

    // 清空输入框
    setInput('')
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <Card className='w-full max-w-2xl border-2 border-border bg-card shadow-warm'>
        <CardHeader className='border-b border-border/50'>
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
          >
            <CardTitle className='flex items-center gap-2 text-primary'>
              <motion.div
                animate={{
                  rotate: [0, 10, -10, 10, 0],
                  scale: [1, 1.1, 1.1, 1.1, 1],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  repeatDelay: 3,
                }}
              >
                <Sparkles className='h-5 w-5' />
              </motion.div>
              OpenAI 聊天演示
            </CardTitle>
            <CardDescription className='mt-2'>
              使用 Vercel AI SDK 调用 OpenAI 模型 {OPENAI_MODEL} 的智能对话体验
            </CardDescription>
          </motion.div>
        </CardHeader>

        <CardContent className='p-0'>
          {/* 聊天消息区域 */}
          <div
            ref={messagesContainerRef}
            className='h-[500px] overflow-y-auto p-6 space-y-4 bg-gradient-to-b from-background/50 to-background/80'
          >
            <AnimatePresence mode='popLayout'>
              {messages.length > 0 ? (
                messages.map((message, index) => (
                  <motion.div
                    key={message.id}
                    initial={{ opacity: 0, y: 20, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{
                      duration: 0.3,
                      delay: index === messages.length - 1 ? 0.1 : 0,
                    }}
                    className={cn(
                      'flex flex-col gap-2',
                      message.role === 'user' ? 'items-end' : 'items-start',
                    )}
                  >
                    {/* 角色标签 */}
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.2 }}
                      className='flex items-center gap-2 px-2'
                    >
                      <span className='text-xs font-semibold text-muted-foreground uppercase tracking-wider'>
                        {getRoleLabel(message.role)}
                      </span>
                    </motion.div>

                    {/* 消息气泡 */}
                    <motion.div
                      whileHover={{ scale: 1.01 }}
                      className={cn(
                        'relative max-w-[85%] rounded-2xl px-4 py-3 shadow-md',
                        message.role === 'user'
                          ? 'bg-primary text-primary-foreground shadow-warm'
                          : 'bg-card border-2 border-border text-card-foreground',
                      )}
                    >
                      <p className='text-sm leading-relaxed whitespace-pre-wrap break-words'>
                        {message.content}
                      </p>

                      {/* 气泡尾巴装饰 */}
                      <div
                        className={cn(
                          'absolute -bottom-1 w-4 h-4',
                          message.role === 'user'
                            ? 'right-4 bg-primary'
                            : 'left-4 bg-card border-l-2 border-b-2 border-border',
                        )}
                        style={{
                          clipPath:
                            message.role === 'user'
                              ? 'polygon(0 0, 100% 0, 100% 100%)'
                              : 'polygon(0 0, 100% 0, 0 100%)',
                        }}
                      />
                    </motion.div>
                  </motion.div>
                ))
              ) : (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className='flex flex-col items-center justify-center h-full gap-4 text-center'
                >
                  <motion.div
                    animate={{
                      y: [0, -10, 0],
                    }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      repeatType: 'reverse',
                    }}
                    className='p-4 rounded-full bg-gradient-primary glow-primary'
                  >
                    <Sparkles className='h-8 w-8 text-primary-foreground' />
                  </motion.div>
                  <div className='space-y-2 max-w-md'>
                    <h3 className='text-lg font-semibold text-foreground'>
                      开始你的对话
                    </h3>
                    <p className='text-sm text-muted-foreground'>
                      输入你的问题，AI 将为你提供智能回答
                    </p>
                    <div className='pt-4 space-y-2'>
                      <p className='text-xs text-muted-foreground font-medium'>
                        试试这些问题：
                      </p>
                      <div className='flex flex-wrap gap-2 justify-center'>
                        {[
                          '如何学习编程？',
                          '写一首关于春天的诗',
                          '推荐一本好书',
                        ].map((suggestion) => (
                          <motion.button
                            key={suggestion}
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={() => setInput(suggestion)}
                            className='px-3 py-1.5 text-xs rounded-lg bg-secondary text-secondary-foreground hover:bg-secondary/80 transition-colors border border-border'
                          >
                            {suggestion}
                          </motion.button>
                        ))}
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* 加载动画 */}
            {sendMessageMutation.isPending && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className='flex items-start gap-2'
              >
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className='text-xs font-semibold text-muted-foreground uppercase tracking-wider px-2'
                >
                  AI
                </motion.div>
                <div className='flex items-center gap-2 px-4 py-3 rounded-2xl bg-card border-2 border-border shadow-md'>
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{
                      duration: 1,
                      repeat: Infinity,
                      ease: 'linear',
                    }}
                  >
                    <Loader2 className='h-4 w-4 text-primary' />
                  </motion.div>
                  <div className='flex gap-1'>
                    {[0, 1, 2].map((i) => (
                      <motion.div
                        key={i}
                        animate={{
                          y: [0, -8, 0],
                        }}
                        transition={{
                          duration: 0.6,
                          repeat: Infinity,
                          delay: i * 0.2,
                        }}
                        className='w-2 h-2 rounded-full bg-primary'
                      />
                    ))}
                  </div>
                </div>
              </motion.div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* 错误提示 */}
          <AnimatePresence>
            {sendMessageMutation.error && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                className='px-6 pb-4'
              >
                <div className='flex items-start gap-3 rounded-lg border-2 border-destructive bg-destructive/10 px-4 py-3'>
                  <AlertCircle className='h-5 w-5 text-destructive flex-shrink-0 mt-0.5' />
                  <div className='flex-1 space-y-1'>
                    <p className='text-sm font-semibold text-destructive'>
                      发送失败
                    </p>
                    <p className='text-xs text-destructive/80'>
                      {sendMessageMutation.error.message}
                    </p>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* 输入区域 */}
          <div className='p-6 border-t border-border/50 bg-card/50 backdrop-blur'>
            <form onSubmit={handleSubmit} className='flex gap-3'>
              <div className='flex-1 relative'>
                <Input
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder='输入你的问题...'
                  disabled={sendMessageMutation.isPending}
                  className='pr-10 h-12 text-base border-2 focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all'
                  autoFocus
                />
                {input && (
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className='absolute right-3 top-1/2 -translate-y-1/2'
                  >
                    <div className='w-2 h-2 rounded-full bg-primary animate-pulse' />
                  </motion.div>
                )}
              </div>

              <motion.div
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <Button
                  type='submit'
                  disabled={
                    sendMessageMutation.isPending || input.trim().length === 0
                  }
                  size='lg'
                  className='h-12 px-6 shadow-warm glow-primary hover:shadow-warm-lg transition-all'
                >
                  {sendMessageMutation.isPending ? (
                    <>
                      <Loader2 className='h-4 w-4 mr-2 animate-spin' />
                      生成中
                    </>
                  ) : (
                    <>
                      <Send className='h-4 w-4 mr-2' />
                      发送
                    </>
                  )}
                </Button>
              </motion.div>
            </form>
          </div>
        </CardContent>

        <CardFooter className='text-xs text-muted-foreground border-t border-border/50 bg-muted/20'>
          <div className='flex items-center gap-2'>
            <div className='w-1.5 h-1.5 rounded-full bg-primary animate-pulse' />
            <p>提示：你可以在 .env.local 中配置 OPENAI_MODEL 来覆盖默认模型</p>
          </div>
        </CardFooter>
      </Card>
    </motion.div>
  )
}
