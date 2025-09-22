import { createAnthropic } from '@ai-sdk/anthropic'
import type { LanguageModel } from 'ai'

let client: ReturnType<typeof createAnthropic> | null = null

const DEFAULT_CLAUDE_MODEL = 'claude-3-5-sonnet-latest'

const getClient = () => {
  if (!client) {
    const apiKey = process.env.ANTHROPIC_API_KEY
    if (!apiKey) {
      throw new Error(
        'ANTHROPIC_API_KEY is not set. Define it in your environment.',
      )
    }

    client = createAnthropic({
      apiKey,
      baseURL: process.env.ANTHROPIC_BASE_URL || undefined,
    })
  }

  return client
}

/**
 * Returns a Claude language model for consumption through the Vercel AI SDK.
 *
 * @param model - Optional override for the model identifier. Falls back to ANTHROPIC_MODEL or claude-3-5-sonnet-latest.
 */
export const getClaudeModel = (model?: string): LanguageModel => {
  const selectedModel =
    model || process.env.ANTHROPIC_MODEL || DEFAULT_CLAUDE_MODEL
  return getClient()(selectedModel)
}
