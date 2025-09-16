'use client'

import dynamic from 'next/dynamic'

const CopilotChatComponent = dynamic(
  () => import('@/components/chat/CopilotChat'),
  {
    ssr: false,
    loading: () => <p>Loading chat...</p>,
  },
)

export default function ClientChat() {
  return <CopilotChatComponent />
}
