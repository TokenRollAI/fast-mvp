import { streamText } from 'ai'
import { resolveLanguageModel } from '@/lib/ai/providers'
import type { AiProvider } from '@/lib/ai/providers'

export const runtime = 'edge'

const DEFAULT_PROVIDER: AiProvider = 'gemini'

export async function POST(req: Request) {
  try {
    const body = await req.json()
    const { messages, provider, model } = body ?? {}

    if (!Array.isArray(messages)) {
      return new Response(
        'Invalid request body: "messages" must be an array.',
        {
          status: 400,
        },
      )
    }

    const selectedProvider = (
      typeof provider === 'string' ? provider : DEFAULT_PROVIDER
    ) as AiProvider

    if (!['gemini', 'openai', 'claude'].includes(selectedProvider)) {
      return new Response(`Unsupported provider: ${String(provider)}`, {
        status: 400,
      })
    }

    const result = await streamText({
      model: resolveLanguageModel(selectedProvider, model),
      messages,
    })

    return result.toAIStreamResponse()
  } catch (error) {
    console.error('An error occurred in the chat API route:', error)
    return new Response('An internal server error occurred.', { status: 500 })
  }
}
