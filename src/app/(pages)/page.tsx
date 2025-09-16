import HelloDemo from '@/components/helloDemo/HelloDemo'
import ClientChat from '@/components/chat/ClientChat'
import { MagicShowcase } from '@/components/magicui/MagicShowcase'

export default function Home() {
  return (
    <div className='font-sans min-h-screen bg-background'>
      <main className='flex flex-col'>
        <MagicShowcase />
        <div className='p-4 md:p-6 space-y-8'>
          <ClientChat />
          <HelloDemo />
        </div>
      </main>
    </div>
  )
}
