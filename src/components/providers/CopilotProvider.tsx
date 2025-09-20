'use client'

import { CopilotKit } from '@copilotkit/react-core'
import { ReactNode } from 'react'
import '@copilotkit/react-ui/styles.css'
import dynamic from 'next/dynamic'

const CopilotPopup = dynamic(
  () => import('@copilotkit/react-ui').then((mod) => mod.CopilotPopup),
  { ssr: false },
)

export function CopilotProvider({ children }: { children: ReactNode }) {
  return (
    <CopilotKit runtimeUrl='/api/copilotkit' showDevConsole={false}>
      {children}
      <CopilotPopup
        instructions='请帮助我回答问题.'
        defaultOpen={true}
        labels={{
          title: 'ai助手',
          initial: '你好! 👋 有什么可以帮你的吗?',
        }}
      />
    </CopilotKit>
  )
}
