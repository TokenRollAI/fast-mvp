import {
  CopilotRuntime,
  GoogleGenerativeAIAdapter,
  copilotRuntimeNextJSAppRouterEndpoint,
} from '@copilotkit/runtime'
import { NextRequest } from 'next/server'

const runtime = new CopilotRuntime()

export async function POST(req: NextRequest): Promise<Response> {
  const googleApiKey = process.env.GOOGLE_API_KEY
  if (!googleApiKey) {
    const errorMessage = 'Missing GOOGLE_API_KEY environment variable.'
    console.error(errorMessage)
    return new Response(JSON.stringify({ error: errorMessage }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    })
  }

  try {
    const serviceAdapter = new GoogleGenerativeAIAdapter({
      apiKey: googleApiKey,
      model: 'gemini-1.5-pro',
    })

    const { handleRequest } = copilotRuntimeNextJSAppRouterEndpoint({
      runtime,
      serviceAdapter,
      endpoint: '/api/copilotkit',
    })

    return handleRequest(req)
  } catch (error: unknown) {
    console.error(
      'Error processing CopilotKit request:',
      JSON.stringify(error, null, 2),
    )
    return new Response(
      JSON.stringify({
        error: 'An unexpected error occurred.',
        details: error instanceof Error ? error.message : 'Unknown error',
      }),
      {
        status: 500,
        headers: { 'Content-Type': 'application/json' },
      },
    )
  }
}
