'use client'

import { useCopilotAction, useCopilotReadable } from '@copilotkit/react-core'
import { CopilotChat } from '@copilotkit/react-ui'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { useState } from 'react'

export default function CopilotChatComponent() {
  const [tasks, setTasks] = useState<string[]>([])
  const [currentTask, setCurrentTask] = useState('')

  // 让 AI 可以读取当前任务列表
  useCopilotReadable({
    description: '用户的任务列表',
    value: tasks,
  })

  // 让 AI 可以添加任务
  useCopilotAction({
    name: 'addTask',
    description: '添加一个新任务到任务列表',
    parameters: [
      {
        name: 'task',
        type: 'string',
        description: '要添加的任务描述',
        required: true,
      },
    ],
    handler: async (args) => {
      const task = args.task as string
      if (task?.trim()) {
        setTasks((prev) => [...prev, task.trim()])
      }
    },
  })

  // 让 AI 可以删除任务
  useCopilotAction({
    name: 'removeTask',
    description: '从任务列表中删除一个任务',
    parameters: [
      {
        name: 'taskIndex',
        type: 'number',
        description: '要删除的任务索引（从0开始）',
        required: true,
      },
    ],
    handler: async (args) => {
      const taskIndex = args?.taskIndex as unknown as number
      if (taskIndex >= 0 && taskIndex < tasks.length) {
        setTasks((prev) => prev.filter((_, index) => index !== taskIndex))
      }
    },
  })

  // 让 AI 可以清空任务列表
  useCopilotAction({
    name: 'clearTasks',
    description: '清空所有任务',
    parameters: [],
    handler: async () => {
      setTasks([])
    },
  })

  const handleAddTask = () => {
    if (currentTask.trim()) {
      setTasks((prev) => [...prev, currentTask.trim()])
      setCurrentTask('')
    }
  }

  return (
    <div className='grid grid-cols-1 lg:grid-cols-2 gap-6 w-full max-w-6xl mx-auto'>
      {/* 任务管理面板 */}
      <Card>
        <CardHeader>
          <CardTitle>智能任务管理</CardTitle>
          <CardDescription>AI 助手可以帮助你管理任务列表</CardDescription>
        </CardHeader>
        <CardContent className='space-y-4'>
          <div className='flex gap-2'>
            <Input
              value={currentTask}
              onChange={(e) => setCurrentTask(e.target.value)}
              placeholder='添加新任务...'
              onKeyPress={(e) => e.key === 'Enter' && handleAddTask()}
            />
            <Button onClick={handleAddTask}>添加</Button>
          </div>

          <div className='space-y-2'>
            <h4 className='font-semibold'>任务列表 ({tasks.length})</h4>
            {tasks.length === 0 ? (
              <p className='text-muted-foreground text-sm'>
                暂无任务。你可以手动添加，或者通过右侧的 AI 聊天助手添加任务。
              </p>
            ) : (
              tasks.map((task, index) => (
                <div
                  key={index}
                  className='flex items-center justify-between p-2 border rounded'
                >
                  <span className='text-sm'>{task}</span>
                  <Button
                    variant='outline'
                    size='sm'
                    onClick={() =>
                      setTasks((prev) => prev.filter((_, i) => i !== index))
                    }
                  >
                    删除
                  </Button>
                </div>
              ))
            )}
          </div>
        </CardContent>
      </Card>

      {/* CopilotKit 聊天界面 */}
      <Card>
        <CardHeader>
          <CardTitle>AI 聊天助手</CardTitle>
          <CardDescription>与 AI 对话来管理你的任务</CardDescription>
        </CardHeader>
        <CardContent className='p-0'>
          <div className='h-[400px]'>
            <CopilotChat
              className='h-full'
              labels={{
                title: '任务管理助手',
                initial:
                  "你好！我可以帮助你管理任务列表。试试说：'帮我添加一个学习 React 的任务'",
              }}
              instructions='你是一个任务管理助手。你可以帮助用户：1) 添加新任务到列表中 2) 删除指定任务 3) 清空所有任务 4) 查看当前任务列表。请用中文回复用户。'
            />
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
