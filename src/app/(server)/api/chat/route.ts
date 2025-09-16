import { streamText } from 'ai'
import { google } from '@ai-sdk/google'

// 将运行时设置为 edge，以获得最佳性能
export const runtime = 'edge'

export async function POST(req: Request) {
  try {
    const { messages } = await req.json()

    // 使用 streamText 调用 OpenAI API
    const result = streamText({
      model: google('gemini-2.0-flash-001'),
      messages,
    })

    // 返回流式响应
    return result.toTextStreamResponse()
  } catch (error) {
    // 捕获并处理潜在的错误
    console.error('An error occurred in the chat API route:', error)
    return new Response('An internal server error occurred.', { status: 500 })
  }
}
