'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { trpc } from '@/lib/trpc/client'
import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Badge } from '@/components/ui/badge'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { Users, MessageCircle, TrendingUp } from 'lucide-react'

export default function HelloDemo() {
  const [name, setName] = useState('')
  const [selectedName, setSelectedName] = useState('')
  const [searchQuery, setSearchQuery] = useState('')

  const utils = trpc.useUtils()

  // 使用tRPC mutations
  const sayHelloMutation = trpc.hello.sayHello.useMutation({
    onSuccess: () => {
      // 成功后刷新所有记录
      utils.hello.getAll.invalidate()
      // 清空输入框
      setName('')
      // 清空选中的名字以隐藏查询结果
      if (selectedName === name.trim()) {
        setSelectedName('')
      }
    },
  })

  // 使用tRPC queries - 直接使用，无需封装
  const getCountQuery = trpc.hello.getCount.useQuery(
    { name: selectedName },
    {
      enabled: !!selectedName,
    },
  )

  const getAllQuery = trpc.hello.getAll.useQuery()

  // 过滤记录
  const filteredRecords =
    getAllQuery.data?.filter((record) =>
      record.name.toLowerCase().includes(searchQuery.toLowerCase()),
    ) || []

  // 统计信息
  const totalRecords = getAllQuery.data?.length || 0
  const totalGreetings =
    getAllQuery.data?.reduce((sum, record) => sum + record.count, 0) || 0

  const statCards = [
    {
      title: '总用户数',
      value: totalRecords,
      description: '已注册用户',
      icon: Users,
      variant: 'secondary' as const,
      delay: 0,
    },
    {
      title: '总问候次数',
      value: totalGreetings,
      description: '累计问候次数',
      icon: MessageCircle,
      variant: 'default' as const,
      delay: 0.1,
    },
    {
      title: '平均问候数',
      value:
        totalRecords > 0 ? (totalGreetings / totalRecords).toFixed(1) : '0',
      description: '每用户平均',
      icon: TrendingUp,
      variant: 'outline' as const,
      delay: 0.2,
    },
  ]

  return (
    <div className='max-w-6xl mx-auto p-6 space-y-6'>
      {/* 统计概览卡片 */}
      <div className='grid grid-cols-1 md:grid-cols-3 gap-4'>
        {statCards.map((stat, index) => (
          <motion.div
            key={stat.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: stat.delay }}
          >
            <Card className='shadow-warm hover:shadow-warm-lg transition-shadow duration-300'>
              <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
                <CardTitle className='text-sm font-medium'>
                  {stat.title}
                </CardTitle>
                <div className='p-2 rounded-full bg-primary/10'>
                  <stat.icon className='h-4 w-4 text-primary' />
                </div>
              </CardHeader>
              <CardContent>
                <div className='text-2xl font-bold'>{stat.value}</div>
                <p className='text-xs text-muted-foreground'>
                  {stat.description}
                </p>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>

      {/* 主操作区域 */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.3 }}
      >
        <Card className='shadow-warm'>
          <CardHeader>
            <CardTitle>问候系统</CardTitle>
            <CardDescription>输入名字进行问候或查询问候次数</CardDescription>
          </CardHeader>
          <CardContent className='space-y-4'>
            <div className='space-y-2'>
              <Label htmlFor='name'>姓名</Label>
              <Input
                id='name'
                type='text'
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder='请输入姓名...'
                onKeyDown={(e) => {
                  if (e.key === 'Enter' && name.trim()) {
                    sayHelloMutation.mutate({ name: name.trim() })
                  }
                }}
                className='transition-all duration-200 focus:shadow-warm'
              />
            </div>

            <div className='flex gap-2'>
              <motion.div
                className='flex-1'
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <Button
                  onClick={() =>
                    name.trim() &&
                    sayHelloMutation.mutate({ name: name.trim() })
                  }
                  disabled={sayHelloMutation.isPending || !name.trim()}
                  className='w-full shadow-warm hover:shadow-warm-lg transition-all duration-200'
                >
                  {sayHelloMutation.isPending ? '处理中...' : '👋 说Hello'}
                </Button>
              </motion.div>

              <motion.div
                className='flex-1'
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <Button
                  variant='outline'
                  onClick={() => name.trim() && setSelectedName(name.trim())}
                  disabled={!name.trim()}
                  className='w-full shadow-warm hover:shadow-warm-lg transition-all duration-200'
                >
                  🔍 查询次数
                </Button>
              </motion.div>
            </div>

            {/* 显示mutation结果 */}
            <AnimatePresence>
              {sayHelloMutation.data && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <Card className='border-primary/50 bg-primary/10 shadow-warm'>
                    <CardContent className='pt-4'>
                      <div className='flex items-center gap-2'>
                        <Badge variant='default'>成功</Badge>
                        <span className='text-sm font-medium'>
                          {sayHelloMutation.data.message}
                        </span>
                      </div>
                      <p className='text-sm text-muted-foreground mt-1'>
                        当前次数: {sayHelloMutation.data.count}
                      </p>
                    </CardContent>
                  </Card>
                </motion.div>
              )}
            </AnimatePresence>

            {/* 显示查询结果 */}
            <AnimatePresence>
              {getCountQuery.data && selectedName && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <Card className='border-primary/50 bg-primary/10 shadow-warm'>
                    <CardContent className='pt-4'>
                      <div className='flex items-center gap-2'>
                        <Badge variant='secondary'>查询结果</Badge>
                        <span className='text-sm font-medium'>
                          {getCountQuery.data.message}
                        </span>
                      </div>
                      <p className='text-sm text-muted-foreground mt-1'>
                        问候次数: {getCountQuery.data.count}
                      </p>
                    </CardContent>
                  </Card>
                </motion.div>
              )}
            </AnimatePresence>

            {/* 显示错误 */}
            <AnimatePresence>
              {(sayHelloMutation.error || getCountQuery.error) && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <Card className='border-destructive/50 bg-destructive/10 shadow-warm'>
                    <CardContent className='pt-4'>
                      <div className='flex items-center gap-2'>
                        <Badge variant='destructive'>错误</Badge>
                        <span className='text-sm font-medium text-destructive'>
                          {sayHelloMutation.error?.message ||
                            getCountQuery.error?.message}
                        </span>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              )}
            </AnimatePresence>
          </CardContent>
        </Card>
      </motion.div>

      {/* 记录列表 */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.4 }}
      >
        <Card className='shadow-warm'>
          <CardHeader>
            <div className='flex items-center justify-between'>
              <div>
                <CardTitle>问候记录</CardTitle>
                <CardDescription>所有用户的问候历史记录</CardDescription>
              </div>
              <Badge variant='outline' className='shadow-warm'>
                {filteredRecords.length} 条记录
              </Badge>
            </div>
            <div className='space-y-2'>
              <Label htmlFor='search'>搜索用户</Label>
              <Input
                id='search'
                type='text'
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder='搜索用户名...'
                className='transition-all duration-200 focus:shadow-warm'
              />
            </div>
          </CardHeader>
          <CardContent>
            {getAllQuery.isLoading ? (
              <motion.div
                className='flex items-center justify-center py-8'
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.3 }}
              >
                <div className='text-sm text-muted-foreground'>加载中...</div>
              </motion.div>
            ) : filteredRecords.length > 0 ? (
              <div className='overflow-hidden rounded-lg border border-border'>
                <Table>
                  <TableHeader>
                    <TableRow className='bg-muted/50'>
                      <TableHead>ID</TableHead>
                      <TableHead>姓名</TableHead>
                      <TableHead>问候次数</TableHead>
                      <TableHead>操作</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredRecords.map((record, index) => (
                      <motion.tr
                        key={record.id}
                        className='border-b border-border transition-colors hover:bg-muted/50 cursor-pointer'
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.3, delay: index * 0.05 }}
                        whileHover={{ scale: 1.01 }}
                      >
                        <TableCell className='font-medium'>
                          #{record.id}
                        </TableCell>
                        <TableCell className='font-medium'>
                          {record.name}
                        </TableCell>
                        <TableCell>
                          <Badge
                            variant={record.count > 5 ? 'default' : 'secondary'}
                            className='shadow-warm'
                          >
                            {record.count} 次
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <motion.div whileHover={{ scale: 1.05 }}>
                            <Button
                              variant='ghost'
                              size='sm'
                              onClick={() => setSelectedName(record.name)}
                              className='hover:bg-primary/10 transition-colors'
                            >
                              查看详情
                            </Button>
                          </motion.div>
                        </TableCell>
                      </motion.tr>
                    ))}
                  </TableBody>
                </Table>
              </div>
            ) : (
              <motion.div
                className='flex flex-col items-center justify-center py-12 text-center'
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.3 }}
              >
                <div className='mb-4 p-4 rounded-full bg-muted'>
                  <Users className='h-8 w-8 text-muted-foreground' />
                </div>
                <p className='text-sm font-medium text-foreground mb-2'>
                  {searchQuery ? '没有找到匹配的记录' : '暂无问候记录'}
                </p>
                {!searchQuery && (
                  <p className='text-xs text-muted-foreground max-w-xs'>
                    输入姓名并点击 &quot;说Hello&quot; 按钮开始使用问候系统
                  </p>
                )}
              </motion.div>
            )}
          </CardContent>
        </Card>
      </motion.div>
    </div>
  )
}
