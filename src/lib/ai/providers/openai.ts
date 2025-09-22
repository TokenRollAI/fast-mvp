import { createOpenAI } from '@ai-sdk/openai'
import type { LanguageModel } from 'ai'

let client: ReturnType<typeof createOpenAI> | null = null

const DEFAULT_OPENAI_MODEL = 'gpt-4o-mini'

const getClient = () => {
  if (!client) {
    const apiKey = process.env.OPENAI_API_KEY
    if (!apiKey) {
      throw new Error(
        'OPENAI_API_KEY is not set. Define it in your environment.',
      )
    }

    client = createOpenAI({
      apiKey,
      baseURL: process.env.OPENAI_BASE_URL || undefined,
    })
  }

  return client
}

/**
 * Returns an OpenAI-compatible language model ready for Vercel AI SDK utilities.
 *
 * @param model - Optional override for the model identifier. Falls back to OPENAI_MODEL or gpt-4o-mini.
 */
export const getOpenAIModel = (model?: string): LanguageModel => {
  const selectedModel =
    model || process.env.OPENAI_MODEL || DEFAULT_OPENAI_MODEL
  return getClient()(selectedModel)
}
