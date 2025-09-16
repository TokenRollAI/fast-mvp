# 在本项目中使用 CopilotKit 的团队指南

本文档旨在帮助团队成员理解并高效地在项目中集成和扩展 CopilotKit AI 功能。

## 1. 技术选型与定位

在本项目中，我们同时集成了 `CopilotKit` 和 `Vercel AI SDK` 以满足不同的 AI 功能需求。

**`CopilotKit` 是我们构建 AI 助手的首选和主要推荐方案。**

**原因**:

- **开箱即用**: CopilotKit 提供了功能完善的前端组件（如 `<CopilotChat />`）和强大的 high-level hooks (`useCopilotAction`, `useCopilotReadable`)。这使得我们能够极快地开发出能与应用状态和功能深度交互的 AI 助手，完美契合我们快速迭代 (MVP) 的目标。
- **应用感知能力**: 其核心的 "In-App Awareness" 理念，让 AI 不仅仅是文本生成器，更是能理解并操作应用的应用内代理 (In-App Agent)。

相比之下，`Vercel AI SDK` 更偏向于底层的聊天流构建。当团队需要从零开始构建一个高度定制化、但交互逻辑相对简单的聊天界面时，可以考虑使用它。但在绝大多数场景下，我们应优先使用 CopilotKit。

## 2. 核心理念

CopilotKit 是一套用于在应用中构建、部署和管理 AI Copilots 的开源框架。在本项目中，我们利用它来创建一个能理解我们应用上下文、并能代表用户执行操作的 AI 聊天助手。

它的核心优势在于：

- **应用内感知 (In-App Awareness)**：通过 "Copilot Actions" 和 "Readables"，AI 可以读取应用前端的状态，并执行在前端定义好的函数，实现与应用的深度交互。
- **灵活的前端组件**：提供了如 `<CopilotChat />`, `<CopilotPopup />` 等开箱即用的 UI 组件，同时也支持完全自定义 UI。
- **后端无关**：可以与任何语言模型（本项目使用 Google Gemini）和后端框架（本项目使用 Next.js App Router）集成。

## 3. 项目架构概览

CopilotKit 在我们项目中的实现主要涉及以下几个关键文件：

- **后端 API 端点**: `src/app/(server)/api/copilotkit/route.ts`
  - 职责：作为前端与 AI 模型之间的桥梁。它接收前端的请求，通过 `GoogleGenerativeAIAdapter` 与 Google Gemini Pro 模型通信，并将结果返回给前端。
- **前端 UI 组件**: `src/components/chat/CopilotChat.tsx`
  - 职责：渲染 AI 聊天界面，并定义 AI 可以读取的状态 (`useCopilotReadable`) 和可以执行的操作 (`useCopilotAction`)。
- **全局 Provider**: `src/components/providers/CopilotProvider.tsx`
  - 职责：使用 `<CopilotKit>` 组件包裹整个应用或相关部分，并指定后端的 `runtimeUrl`，为所有子组件提供 AI 能力的上下文。

## 4. 后端配置 (`route.ts`)

后端配置相对简单，核心是初始化 `CopilotRuntime` 和语言模型适配器。

- **AI 模型**: 我们当前使用的是 Google 的 `gemini-1.5-pro` 模型。
- **环境变量**: 后端需要一个名为 `GOOGLE_API_KEY` 的环境变量来验证与 Google AI 服务的通信。请确保你的本地 `.env.local` 文件中包含了这个密钥。

```typescript
// src/app/(server)/api/copilotKit/route.ts (简化示例)

// ...
const serviceAdapter = new GoogleGenerativeAIAdapter({
  apiKey: googleApiKey,
  model: 'gemini-1.5-pro',
})

const { handleRequest } = copilotRuntimeNextJSAppRouterEndpoint({
  runtime,
  serviceAdapter,
  endpoint: '/api/copilotkit',
})
// ...
```

## 5. 前端实现 (`CopilotChat.tsx`)

前端是定义 AI 能力的核心。

### 5.1. 让 AI “看见”应用状态

我们使用 `useCopilotReadable` hook 让 AI 能够读取前端组件的状态。

- **示例**：在 `CopilotChatComponent` 中，我们将 `tasks` 状态数组提供给了 AI。

  ```typescript
  const [tasks, setTasks] = useState<string[]>([])

  useCopilotReadable({
    description: '用户的任务列表', // 对这个状态的描述，AI 会据此理解
    value: tasks,
  })
  ```

- **关键点**：`description` 字段至关重要，它告诉 AI 这个数据是什么。描述得越清晰，AI 理解得越准确。

### 5.2. 赋予 AI “行动”能力

我们使用 `useCopilotAction` hook 来定义 AI 可以执行的函数。

- **示例**：我们定义了 `addTask` action，允许 AI 向任务列表中添加新任务。
  ```typescript
  useCopilotAction({
    name: 'addTask', // action 的唯一名称
    description: '添加一个新任务到任务列表',
    parameters: [
      // 定义 action 需要的参数
      {
        name: 'task',
        type: 'string',
        description: '要添加的任务描述',
        required: true,
      },
    ],
    handler: async (args) => {
      // AI 调用此 action 时的处理函数
      const task = args.task as string
      setTasks((prev) => [...prev, task.trim()])
    },
  })
  ```
- **工作原理**：当用户说“帮我添加一个学习 Next.js 的任务”时，AI 会理解这个意图，并找到名为 `addTask` 的 action。然后，它会从用户输入中提取出 "学习 Next.js" 作为 `task` 参数，并调用 `handler` 函数。

## 6. 如何扩展 AI 的能力？ (核心流程)

当需要让 AI 与应用进行更多交互时，请遵循以下步骤：

1.  **确定目标**：明确你是想让 AI **读取**新的状态，还是**执行**新的操作。

2.  **如果要读取状态**：
    - 在相关组件中，找到你需要暴露给 AI 的 state。
    - 调用 `useCopilotReadable` hook，并传入一个清晰的 `description` 和 state 的 `value`。

3.  **如果要执行操作**：
    - 在相关组件中，构思一个操作并为其命名（例如 `updateTaskStatus`）。
    - 调用 `useCopilotAction` hook。
    - 定义清晰的 `name` 和 `description`。
    - 在 `parameters` 中定义该操作需要的所有参数，包括名称、类型和描述。
    - 在 `handler` 函数中编写该操作的具体逻辑。

4.  **更新 AI 指令 (Instructions)**：
    - 在 `<CopilotChat />` 或 `<CopilotPopup />` 组件的 `instructions` prop 中，添加关于新能力的描述。这会作为系统提示 (System Prompt) 的一部分，帮助 AI 更好地理解和使用你新添加的 actions 和 readables。

    ```tsx
    // 例如，在 CopilotChat.tsx 中
    <CopilotChat
      instructions='你是一个任务管理助手。你现在不仅可以添加、删除任务，还可以更新任务状态...'
      // ...
    />
    ```

## 7. 官方文档

要了解更多高级用法（如自定义 UI、Agentic UI 等），请查阅 CopilotKit 官方文档。

- **官方文档地址**: [https://docs.copilotkit.ai/](https://docs.copilotkit.ai/)

---

这份指南应该能帮助团队成员快速上手。随着我们对 CopilotKit 的使用更加深入，可以再来更新和丰富这份文档。
