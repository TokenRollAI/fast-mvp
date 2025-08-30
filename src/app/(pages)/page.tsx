import HelloDemo from '@/components/helloDemo/HelloDemo'

export default function Home() {
  return (
    <div className='font-sans min-h-screen p-8 bg-gray-50'>
      <main className='max-w-4xl mx-auto'>
        <h1 className="text-4xl font-bold text-center mb-8 text-gray-800">
          tRPC 全栈应用演示
        </h1>

        <HelloDemo />
      </main>
    </div>
  )
}
