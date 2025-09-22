import { createGoogleGenerativeAI } from '@ai-sdk/google'
import type { LanguageModel } from 'ai'

let client: ReturnType<typeof createGoogleGenerativeAI> | null = null

const DEFAULT_GEMINI_MODEL = 'gemini-2.0-flash-001'

const getClient = () => {
  if (!client) {
    const apiKey = process.env.GOOGLE_API_KEY
    if (!apiKey) {
      throw new Error(
        'GOOGLE_API_KEY is not set. Define it in your environment.',
      )
    }

    client = createGoogleGenerativeAI({
      apiKey,
      baseURL: process.env.GOOGLE_API_BASE_URL || undefined,
    })
  }

  return client
}

/**
 * Returns a Gemini language model that can be consumed by the Vercel AI SDK utilities.
 *
 * @param model - Optional override for the model identifier. Falls back to GOOGLE_MODEL or gemini-2.0-flash-001.
 */
export const getGeminiModel = (model?: string): LanguageModel => {
  const selectedModel =
    model || process.env.GOOGLE_MODEL || DEFAULT_GEMINI_MODEL
  return getClient()(selectedModel)
}
