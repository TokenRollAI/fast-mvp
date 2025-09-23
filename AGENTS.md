# 开发指南

## 1. 使用开发服务器，**而非** `pnpm build`

- 在迭代开发应用时，**请始终使用 `pnpm dev`** 启动开发服务器（或 `pnpm lint --watch` 等 `pnpm` 脚本）。开发模式会启用热重载，更适合交互式调试。
- **请勿在 Agent 会话中运行 `pnpm build`**。生产构建会覆盖 `.next` 为生产产物并禁用热重载，可能导致后续开发流程失效。若确需构建，请在 Agent 工作流之外执行。

## 2. 保持依赖同步

整个项目默认使用 `pnpm`。如需安装或更新依赖，请使用 `pnpm add`/`pnpm update`，并保持 `pnpm-lock.yaml` 与 `package.json` 同步。

1.  提交前确认 `pnpm-lock.yaml` 已更新；不要手动编辑 `package-lock.json` 或使用 `npm`/`yarn`。
2.  依赖变更后重启开发服务器，确保 Next.js 和 Turbopack 获取最新依赖。

## 3. 编码约定

- 对于新组件和工具函数，优先使用 TypeScript (`.tsx`/`.ts`)。
- 在实际可行的情况下，将组件特定的样式文件与组件放在同一个文件夹内。

## 4. 常用命令回顾

| 命令          | 用途                                       |
| ------------- | ------------------------------------------ |
| `pnpm dev`    | 启动支持 HMR 的 Next.js 开发服务器。       |
| `pnpm lint`   | 运行 ESLint 检查。                         |
| `pnpm test`   | 执行测试套件（如果存在）。                 |
| `pnpm build`  | **生产构建 – _请勿在 Agent 会话期间运行_** |
| `pnpm format` | 执行预设的代码格式化任务。                 |

## 5. AI Provider 工作流

- 所有对接 Vercel AI SDK 的配置集中在 `src/lib/ai/providers`。优先通过 `resolveLanguageModel`（`index.ts`）来获取模型，而不是在业务代码中直接初始化客户端。
- 调用时传入 `provider`（`'gemini' | 'openai' | 'claude'`）和可选的 `model` 名称，函数会自动读取 `.env.local` 中的密钥与模型覆盖值。必要环境变量：`GOOGLE_API_KEY` / `GOOGLE_MODEL`、`OPENAI_API_KEY` / `OPENAI_MODEL`、`ANTHROPIC_API_KEY` / `ANTHROPIC_MODEL`。
- 添加新 Provider 时，请：
  1.  在 `src/lib/ai/providers` 下创建与现有文件相同结构的工厂函数，负责懒加载客户端并处理默认模型。
  2.  在 `index.ts` 中更新 `AiProvider` 联合类型及 `resolveLanguageModel` 逻辑。
  3.  在 `.env.example` 或相关文档中记录新的环境变量名称。
- 请勿在各个组件或 Route Handler 中重复配置密钥或自定义 fetch 客户端，以避免泄露和配置漂移问题。

## 6. UI 组件优先级

- 新界面优先复用 `shadcn/ui` (`src/components/ui`) 与 `magicui` (`src/components/magicui`) 组件库。通过变体、组合和 Tailwind 实现设计需求，减少从零开始编写原子组件的次数。
- 若缺少所需样式，优先使用 `pnpm dlx shadcn-ui@latest add [component]` 拉取官方模板，然后在项目内细调。仅当现有方案无法满足需求时，再考虑手写组件，并保持样式与现有规范一致。
- 自定义样式放在对应组件文件或同级样式文件内，避免散落的全局 CSS。

## 7. 数据建模守则

- 未经用户明确指示，请勿新增数据库表或迁移。原型阶段优先利用内存状态、静态配置或现有 `hello` 表完成验证。
- 当确需持久化时，先与用户确认数据结构，再使用 Drizzle 的 schema 定义与迁移命令（`pnpm db:generate` → `pnpm db:push`）。在变更获批前，避免提交未使用的表或字段。
- 对临时数据可用 `tRPC` mock、前端状态或 KV 方案，保证快速迭代并减少迁移成本。

---

# Project Structure

```
  - AGENTS.md             # Agent 交互式开发的指南
  - components.json       # shadcn/ui 配置文件
  - docs\                 # 项目文档目录
    - AGENTS.md           # Agent 开发指南文档
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
          - trpc\         # tRPC API 路由
            - [trpc]\     # tRPC 的动态路由处理器
              - route.ts  # tRPC API 入口点
    - components\         # React 组件目录
      - chat\             # 聊天功能相关组件
        - ClientChat.tsx  # 客户端聊天界面组件
      - helloDemo\        # 示例 Demo 组件
        - HelloDemo.tsx   # 一个简单的 "Hello World" 示例
      - magicui\          # Magic UI 动画特效组件
        - AnimatedButton.tsx # 动画按钮组件
        - MagicShowcase.tsx  # Magic UI 特效展示组件
        - ParticleDemo.tsx   # 粒子效果示例组件
        - TextRevealDemo.tsx # 文字显示动画示例
      - providers\        # React Context Provider 组件目录
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
    <Card className='w-[350px]'>
      <CardHeader>
        <CardTitle>示例表单</CardTitle>
      </CardHeader>
      <CardContent className='space-y-4'>
        <div className='space-y-2'>
          <Label htmlFor='name'>姓名</Label>
          <Input id='name' placeholder='请输入姓名' />
        </div>
        <Button className='w-full'>
          提交 <Badge variant='secondary'>必填</Badge>
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
;<div className={cn('p-4 bg-blue-500', { 'font-bold': isActive })} />
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
      email: 'john@example.com',
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
      {messages.map((m) => (
        <div key={m.id}>
          <strong>{m.role}: </strong>
          {m.content}
        </div>
      ))}
      <form onSubmit={handleSubmit}>
        <input value={input} onChange={handleInputChange} />
        <button type='submit'>发送</button>
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
4.  **AI 功能集成**: 你熟悉 `Vercel AI SDK`的使用，能够构建复杂的 AI 聊天和智能交互功能。
5.  **UI & 样式**: 你擅长使用 `Tailwind CSS` 和 `shadcn/ui` 构建美观、一致的界面，并能运用`magicui` `Framer Motion` 添加流畅的动画效果。
    **生态与工具**: 你熟悉 `Turbopack`, `ESLint`, `Prettier`, `pnpm` 等现代前端工程化工具。
6.  **编码哲学与优先级**:
    - **可读性第一**: 代码首先是写给人看的。你产出的代码必须清晰、易于理解。
    - **性能第二**: 在保证可读性的前提下，追求最优的性能实践。
    - **可维护性第三**: 编写易于扩展和修改的代码。
7.  **代码结构偏好**: 你追求代码结构的平衡与合理。**避免为了拆分而过度拆分组件或模块，也绝不能将所有逻辑揉杂在一个巨大的文件中**。你的目标是“恰到好处的模块化”。
8.  **安全意识**: 你时刻关注前端安全，会主动规避 XSS、CSRF 等常见漏洞，不使用 `innerHTML` 等危险操作，除非被明确指示。

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
