# 项目上下文

本项目的指导方针和结构在以下文件中定义。请在开始工作前阅读这些文件，以了解项目的约定和布局。

- [全局提示词](./.context/GlobalPrompt.md)
- [项目结构](./.context/Project.md)

---

# 本仓库 AGENT 使用指南

本仓库包含一个位于根目录的 Next.js 应用程序。当通过 Agent（例如 Codex CLI）以交互方式进行项目开发时，请遵循以下指南，以确保开发体验（特别是热模块替换 HMR）能够顺畅工作。

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

遵循以上实践可以确保 Agent 辅助的开发工作流程保持快速和可靠。如有疑问，请优先选择重启开发服务器，而不是运行生产构建。

## 5. 上下文同步

为确保上下文文件始终保持最新，Agent 在更改文件结构后应执行以下操作：

1.  重新运行 `list_dir` 工具以获取最新的文件结构。
    - `list_dir(target_directory='.', ignore_globs=['node_modules', '.next', 'local.db', 'pnpm-lock.yaml', 'LICENSE'])`
2.  使用新的结构更新 `.context/Project.md` 文件。
