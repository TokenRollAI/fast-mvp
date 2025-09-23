import { generateText } from 'ai'
import { publicProcedure, router } from '../trpc'
import { resolveLanguageModel } from '@/lib/ai/providers'
import { chatInputSchema } from '@/lib/schema/chat'
import type { AiProvider } from '@/lib/ai/providers'

export const chatRouter = router({
  sendMessage: publicProcedure
    .input(chatInputSchema.sendMessage)
    .mutation(async ({ input }) => {
      const { message, provider, model, conversationHistory } = input

      try {
        // 构建完整的消息历史
        const messages = [
          ...conversationHistory,
          {
            role: 'user' as const,
            content: message,
          },
        ]

        // 获取 AI 模型
        const languageModel = resolveLanguageModel(
          provider as AiProvider,
          'DeepSeek-V3.1',
        )

        // 生成回复
        const result = await generateText({
          model: languageModel,
          messages,
          temperature: 0.7,
        })

        return {
          success: true,
          response: result.text,
          usage: result.usage,
        }
      } catch (error) {
        console.error('Chat error:', error)
        throw new Error(
          error instanceof Error
            ? error.message
            : '生成回复时发生错误，请检查 API Key 配置',
        )
      }
    }),
})
