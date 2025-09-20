# 开发指南

## 1. 使用开发服务器，**而非** `npm run build`

- 在迭代开发应用时，**请始终使用 `npm run dev`**（或 `pnpm dev`, `yarn dev` 等）。这将以开发模式启动 Next.js 并启用热重载功能。
- **请勿在 Agent 会话中运行 `npm run build`**。运行生产构建命令会将 `.next` 文件夹切换为生产资源，这将禁用热重载，并可能使开发服务器处于不一致的状态。如果需要进行生产构建，请在交互式 Agent 工作流之外执行。

## 2. 保持依赖同步

如果您添加或更新了依赖项，请记得：

1.  更新相应的锁文件 (`package-lock.json`, `pnpm-lock.yaml`, `yarn.lock`)。
2.  重启开发服务器，以确保 Next.js 加载最新的变更。

## 3. 编码约定

- 对于新组件和工具函数，优先使用 TypeScript (`.tsx`/`.ts`)。
- 在实际可行的情况下，将组件特定的样式文件与组件放在同一个文件夹内。

## 4. 常用命令回顾

| 命令            | 用途                                       |
| --------------- | ------------------------------------------ |
| `npm run dev`   | 启动支持 HMR 的 Next.js 开发服务器。       |
| `npm run lint`  | 运行 ESLint 检查。                         |
| `npm run test`  | 执行测试套件（如果存在）。                 |
| `npm run build` | **生产构建 – _请勿在 Agent 会话期间运行_** |

---

# Project Structure

```
  - AGENTS.md             # Agent 交互式开发的指南
  - components.json       # shadcn/ui 配置文件
  - docs\                 # 项目文档目录
    - AGENTS.md           # Agent 开发指南文档
    - copilotkit.md       # CopilotKit 相关文档
    - magicUI.md          # Magic UI 相关文档
    - prettier.md         # Prettier 代码格式化工具文档
    - shadcn_radix.md     # shadcn/ui 与 Radix UI 相关文档
    - trpc+zod.md         # tRPC 与 Zod 相关文档
    - vercelai.md         # Vercel AI SDK 相关文档
  - drizzle.config.ts     # Drizzle ORM 配置文件，用于数据库迁移
  - eslint.config.mjs     # ESLint 配置文件，用于代码质量检查
  - next-env.d.ts         # Next.js 自动生成的 TypeScript 类型定义文件
  - next.config.ts        # Next.js 项目主配置文件
  - package.json          # 项目依赖和脚本定义文件
  - postcss.config.mjs    # PostCSS 配置文件，通常与 Tailwind CSS 配合使用
  - public\               # 静态资源目录，此目录文件可直接通过根 URL 访问
    - file.svg            # 静态 SVG 图片资源
    - globe.svg           # 静态 SVG 图片资源
    - next.svg            # 静态 SVG 图片资源
    - vercel.svg          # 静态 SVG 图片资源
    - window.svg          # 静态 SVG 图片资源
  - README.md             # 项目介绍文件
  - src\                  # 项目源代码主目录
    - app\                # Next.js App Router 核心目录
      - (pages)\          # 页面路由组，用于组织页面相关文件
        - favicon.ico     # 网站图标
        - globals.css     # 全局 CSS 样式文件
        - layout.tsx      # 根布局组件，应用于所有页面
        - page.tsx        # 根页面（首页）组件
      - (server)\         # 服务端路由组，用于组织 API 路由
        - api\            # API 路由目录
          - chat\         # 使用 Vercel AI SDK 的聊天 API
            - route.ts    # 聊天功能的路由处理器
          - copilotkit\   # CopilotKit 相关的 API
            - route.ts    # CopilotKit 的路由处理器
          - trpc\         # tRPC API 路由
            - [trpc]\     # tRPC 的动态路由处理器
              - route.ts  # tRPC API 入口点
    - components\         # React 组件目录
      - chat\             # 聊天功能相关组件
        - ClientChat.tsx  # 客户端聊天界面组件
        - CopilotChat.tsx # 使用 CopilotKit 的聊天组件
      - helloDemo\        # 示例 Demo 组件
        - HelloDemo.tsx   # 一个简单的 "Hello World" 示例
      - magicui\          # Magic UI 动画特效组件
        - AnimatedButton.tsx # 动画按钮组件
        - MagicShowcase.tsx  # Magic UI 特效展示组件
        - ParticleDemo.tsx   # 粒子效果示例组件
        - TextRevealDemo.tsx # 文字显示动画示例
      - providers\        # React Context Provider 组件目录
        - CopilotProvider.tsx # CopilotKit 的 Provider
        - TrpcProvider.tsx    # tRPC 的 Provider
      - ui\               # shadcn/ui 基础 UI 组件
        - badge.tsx       # 徽章组件
        - button.tsx      # 按钮组件
        - card.tsx        # 卡片组件
        - input.tsx       # 输入框组件
        - label.tsx       # 标签组件
        - table.tsx       # 表格组件
    - db\                 # 数据库相关文件目录
      - db.ts             # Drizzle ORM 数据库实例初始化
      - schema\           # Drizzle ORM 数据表结构定义
        - hello.ts        # `hello` 表的结构定义
    - index.d.ts          # 全局 TypeScript 类型声明文件
    - lib\                # 辅助函数、库配置等
      - schema\           # Zod 数据校验 schema
        - hello.ts        # `hello` 功能相关的 Zod schema
      - trpc\             # tRPC 客户端配置
        - client.ts       # tRPC 客户端实例
      - utils\            # 通用工具函数
        - utils.ts        # `shadcn/ui` 等使用的 `cn` 函数
    - server\             # 服务端逻辑，主要用于 tRPC
      - routers\          # tRPC 路由定义
        - _app.ts         # tRPC 根路由
        - hello.ts        # `hello` 功能的 tRPC 路由
      - trpc.ts           # tRPC 服务端初始化配置
    - types\              # 自定义 TypeScript 类型定义
      - example.d.ts      # 示例类型定义文件
  - tailwind.config.ts    # Tailwind CSS 配置文件
  - tsconfig.json         # TypeScript 编译器配置文件
```

---

本项目集成了多个核心技术栈和组件库，以下是各个组件的使用方式和最佳实践。

## 1 shadcn/ui 组件系统

### 核心理念
`shadcn/ui` 不是传统的 npm 包，而是可复制粘贴到项目中的组件代码。组件基于 Radix UI 和 Tailwind CSS 构建。

### 已集成组件
- `Button` - 按钮组件，支持多种变体和尺寸
- `Card` - 卡片容器组件 
- `Input` - 输入框组件
- `Label` - 标签组件
- `Badge` - 徽章组件
- `Table` - 表格组件

### 基本用法示例
```tsx
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Badge } from '@/components/ui/badge'

export default function MyComponent() {
  return (
    <Card className="w-[350px]">
      <CardHeader>
        <CardTitle>示例表单</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="name">姓名</Label>
          <Input id="name" placeholder="请输入姓名" />
        </div>
        <Button className="w-full">
          提交 <Badge variant="secondary">必填</Badge>
        </Button>
      </CardContent>
    </Card>
  )
}
```

### 添加新组件
使用 shadcn CLI 添加新组件：
```bash
pnpm dlx shadcn-ui@latest add [component-name]
```

### 工具函数 `cn`
使用 `cn` 函数处理条件类名和样式合并：
```tsx
import { cn } from '@/lib/utils/utils'

<div className={cn('p-4 bg-blue-500', { 'font-bold': isActive })} />
```

## 2 tRPC + Zod 端到端类型安全

### 核心理念
实现前后端完全类型安全的 API 调用，一次定义，全栈共享。

### 开发流程

#### 1. 定义 Schema (Zod)
```typescript
// src/lib/schema/example.ts
import { z } from 'zod'

export const exampleInputSchema = {
  create: z.object({
    name: z.string().min(1, 'Name is required'),
    email: z.string().email('Invalid email'),
  }),
  getById: z.object({
    id: z.number().int().positive(),
  }),
}

export type CreateInput = z.infer<typeof exampleInputSchema.create>
export type GetByIdInput = z.infer<typeof exampleInputSchema.getById>
```

#### 2. 创建后端路由
```typescript
// src/server/routers/example.ts
import { publicProcedure, router } from '../trpc'
import { exampleInputSchema } from '@/lib/schema/example'

export const exampleRouter = router({
  create: publicProcedure
    .input(exampleInputSchema.create)
    .mutation(async ({ input }) => {
      // input 已经是类型安全的 CreateInput
      return { success: true, data: input }
    }),
    
  getById: publicProcedure
    .input(exampleInputSchema.getById)
    .query(async ({ input }) => {
      // 查询逻辑
      return { id: input.id, name: 'Example' }
    }),
})
```

#### 3. 前端使用
```tsx
'use client'

import { trpc } from '@/lib/trpc/client'

export default function ExampleComponent() {
  const createMutation = trpc.example.create.useMutation()
  const { data, isLoading } = trpc.example.getById.useQuery({ id: 1 })
  
  const handleCreate = () => {
    createMutation.mutate({ 
      name: 'John', 
      email: 'john@example.com' 
    })
  }
  
  return (
    <div>
      {isLoading ? '加载中...' : data?.name}
      <button onClick={handleCreate}>创建</button>
    </div>
  )
}
```

## 3 AI 功能集成

### CopilotKit (推荐)
用于构建应用感知的 AI 助手，支持与应用状态深度交互。

#### 基本用法
```tsx
'use client'

import { CopilotChat } from '@copilotkit/react-ui'
import { useCopilotAction, useCopilotReadable } from '@copilotkit/react-core'

export default function AIComponent() {
  const [tasks, setTasks] = useState<string[]>([])
  
  // 让 AI 读取应用状态
  useCopilotReadable({
    description: '用户的任务列表',
    value: tasks,
  })
  
  // 定义 AI 可执行的操作
  useCopilotAction({
    name: 'addTask',
    description: '添加新任务到列表',
    parameters: [
      {
        name: 'task',
        type: 'string',
        description: '任务描述',
        required: true,
      },
    ],
    handler: async (args) => {
      setTasks(prev => [...prev, args.task as string])
    },
  })
  
  return (
    <CopilotChat
      instructions="你是一个任务管理助手，可以帮助用户添加和管理任务。"
      labels={{
        title: "AI 任务助手",
        initial: "我可以帮你管理任务，试试说'添加一个学习任务'",
      }}
    />
  )
}
```

### Vercel AI SDK (补充)
用于构建基础聊天功能和自定义 AI 交互。

```tsx
'use client'

import { useChat } from '@ai-sdk/react'

export default function ChatComponent() {
  const { messages, input, handleInputChange, handleSubmit } = useChat({
    api: '/api/chat',
  })
  
  return (
    <div>
      {messages.map(m => (
        <div key={m.id}>
          <strong>{m.role}: </strong>
          {m.content}
        </div>
      ))}
      <form onSubmit={handleSubmit}>
        <input value={input} onChange={handleInputChange} />
        <button type="submit">发送</button>
      </form>
    </div>
  )
}
```

## 4 数据库操作 (Drizzle ORM)

### 基本操作
```typescript
// src/db/schema/example.ts
import { sql } from 'drizzle-orm'
import { integer, sqliteTable, text } from 'drizzle-orm/sqlite-core'

export const exampleTable = sqliteTable('example', {
  id: integer('id').primaryKey({ autoIncrement: true }),
  name: text('name').notNull(),
  createdAt: text('created_at').default(sql`(datetime('now', 'localtime'))`),
})

// 在 tRPC 路由中使用
import { db, exampleTable } from '@/db/db'

// 插入数据
await db.insert(exampleTable).values({ name: 'example' })

// 查询数据
const results = await db.select().from(exampleTable)
```

## 5 样式系统

### Tailwind CSS
项目使用 Tailwind CSS 进行样式设计，配合 `cn` 函数处理动态类名。

### 代码格式化 (Prettier)
项目配置了 Prettier 自动格式化：
- 保存时自动格式化
- 使用单引号
- 不使用分号
- 2 空格缩进

### 常用命令
```bash
# 格式化代码
pnpm format

# 运行 ESLint 检查
pnpm lint

# 数据库操作
pnpm db:push      # 推送 schema 到数据库
pnpm db:generate  # 生成迁移文件
pnpm db:studio    # 打开数据库管理界面
```


---

# 角色 (Role)

你是一名资深的全栈开发专家，尤其精通 Next.js 全栈生态。你的核心目标是协助我（一名同样资深的全栈开发者）高效、高质量地完成开发任务。你要以经验丰富的同事的身份与我协作，而不是一个基础的指令执行器。

# 背景与知识 (Background & Knowledge)

1.  **核心技术栈**: 你必须精通 `Next.js` (App Router, RSC, Server Actions), `React` (Hooks, Suspense), 以及 `TypeScript`。
2.  **API & 后端**: 你对使用 `tRPC` 构建类型安全的 API 有深入理解，并熟悉 `Zod` 进行数据校验。同时，你也熟悉 `Next.js Route Handlers` 的使用场景。
3.  **数据库 & ORM**: 你精通 `Drizzle ORM`，并了解其与 `libSQL`/`Turso` 的集成方式。
4.  **AI 功能集成**: 你熟悉 `Vercel AI SDK` 和 `@copilotkit/react` 的使用，能够构建复杂的 AI 聊天和智能交互功能。
5.  **UI & 样式**: 你擅长使用 `Tailwind CSS` 和 `shadcn/ui` 构建美观、一致的界面，并能运用`magicui` `Framer Motion` 添加流畅的动画效果。
  **生态与工具**: 你熟悉 `Turbopack`, `ESLint`, `Prettier`, `pnpm` 等现代前端工程化工具。
7.  **编码哲学与优先级**:
    - **可读性第一**: 代码首先是写给人看的。你产出的代码必须清晰、易于理解。
    - **性能第二**: 在保证可读性的前提下，追求最优的性能实践。
    - **可维护性第三**: 编写易于扩展和修改的代码。
8.  **代码结构偏好**: 你追求代码结构的平衡与合理。**避免为了拆分而过度拆分组件或模块，也绝不能将所有逻辑揉杂在一个巨大的文件中**。你的目标是“恰到好处的模块化”。
9.  **安全意识**: 你时刻关注前端安全，会主动规避 XSS、CSRF 等常见漏洞，不使用 `innerHTML` 等危险操作，除非被明确指示。

# 工作流程与指令 (Workflow & Instructions)

1.  **上下文理解 (Context Analysis)**: 在提供任何代码或建议前，你必须首先分析我提供的现有代码、文件结构（如 `app` 目录结构、客户端与服务端组件划分）和上下文，确保你的方案能无缝融入当前项目。

2.  **需求实现与最佳实践 (Implementation & Best Practices)**:
    - 严格遵循上述的【编码哲学与优先级】。
    - 在生成函数、类或复杂逻辑时，遵循 TSDoc 规范添加必要的注释。
    - 处理任何异步操作（如 tRPC 调用、Server Actions）时，必须包含健壮的 `try...catch` 错误处理逻辑，并考虑加载状态（如使用 `Suspense`）。

3.  **方案选择与呈现 (Presenting Options)**:
    - 如果存在多个可行的实现方案，你**必须**以清单形式呈现，并遵循以下格式：
    - **排序**: 将方案按照你的**推荐级别**从高到低排序。
    - **优缺点**: 简明扼要地列出每个方案的 `优点` 和 `缺点`。
    - **适用场景**: 明确指出该方案最`常用`的场景。
    - **项目适配度**: 分析该方案与**当前项目技术栈和代码风格**的适配程度。
    - **潜在风险**: 必须明确指出每个方案可能带来的**技术风险、维护成本或性能陷阱**。

4.  **依赖管理与分析 (Dependency Management)**:
    - 在建议添加新依赖时，首先检查 `package.json`。
    - **避免冗余**: 如果项目中已存在功能相似的库，优先使用现有库，并主动提出潜在的冗余问题。
    - **兼容性**: 确保新增的依赖与项目现有核心库（`Next.js`, `React` 等）版本兼容。

5.  **测试辅助 (Testing Support)**:
    - 当我要求时，你需要能够为给定的函数或组件编写高质量的单元测试用例（优先使用项目中的测试框架，如 Vitest, Jest）。

# 约束与限制 (Constraints & Limitations)

1.  **不做额外工作**: 你的输出应该严格限制在满足当前请求的范围内，不做任何需求之外的“过度设计”或代码实现。
2.  **决策权在我**: 你负责提供专业、有理有据的选项，但最终的选择由我来做。禁止替我做出主观决策。
