# Repository Guidelines for AI Agents

> This template is designed for **Vibe Coding** - rapid AI-assisted development from a production-ready starting point.

## 🎯 Agent Mindset: Ship Fast, Iterate Faster

When a user asks you to build something:

1. **Don't start from scratch** - This repo has working examples for AI chat, tRPC APIs, and UI components
2. **Copy > Create** - Find the closest existing pattern and adapt it
3. **Show, don't explain** - Build working code with UI, not just API endpoints
4. **Test as you go** - Use `pnpm dev` and verify in browser after each step

### Example Decision Tree

```
User: "Build me a chatbot"
├─ ✅ DO: Copy src/app/(pages)/openai/page.tsx + src/server/routers/chat.ts
├─ ✅ DO: Reuse OpenAIChatDemo.tsx component
├─ ❌ DON'T: Build a new chat UI from scratch
└─ ❌ DON'T: Create a REST API (use tRPC instead)

User: "Add a database table for users"
├─ ⚠️ PAUSE: Ask if they really need persistence (in-memory might be fine for MVP)
├─ ✅ IF YES: Create schema in src/db/schema/, run pnpm db:push
└─ ❌ DON'T: Auto-create migrations without user confirmation

User: "Make the UI look better"
├─ ✅ DO: Add shadcn/ui components (pnpm dlx shadcn@latest add [component])
├─ ✅ DO: Reference src/components/magicui/ for animations
└─ ❌ DON'T: Write custom CSS (use Tailwind utilities)
```

## Project Structure & Module Organization

- **Project Structure**: `src/app` handles routing and pages (distinguishing between `(pages)` client views and `(server)` Route Handlers), `src/components` stores reusable UI components (prioritizing subdirectories like `ui/` and `magicui/`), `src/lib` contains utilities and AI Providers, while `src/server` and `src/db` manage tRPC and Drizzle logic. Before making changes, identify the relevant directories to maintain consistency between files and responsibilities.

- **New Feature Workflow - The Fast MVP Way**:
  1. **Discovery (2 min)**: Scan existing code for similar features
     - Check `src/app/(pages)/` for page examples
     - Check `src/server/routers/` for API patterns
     - Check `src/components/` for reusable UI
  2. **Copy & Adapt (10 min)**: Clone the closest match
     - Copy entire page structure including error handling
     - Copy tRPC router with all its error cases
     - Copy Zod schema and extend it
  3. **Integrate (5 min)**: Wire up the new code
     - Add router to `src/server/routers/_app.ts`
     - Create page in `src/app/(pages)/feature-name/page.tsx`
     - Import and use in UI
  4. **Test & Iterate (5 min)**: Verify in browser
     - Check `pnpm dev` output for errors
     - Test happy path in browser
     - Test error cases
  5. **Polish (5 min)**: Format and finalize
     - Run `pnpm format`
     - Add loading states if missing
     - Improve error messages

  **Total: ~25 minutes per feature** (vs hours from scratch)

- **Development Process**: Always iterate using `pnpm dev` or other watch scripts. Do not run `pnpm build` within a session. Prefer project-specific scripts when executing commands.

- **Dependency Management**: Use only `pnpm add/update/remove`. Keep `pnpm-lock.yaml` synchronized with `package.json`. Restart the development server after dependency changes.

- **Code Style & UI Component Strategy**:
  - **TypeScript only** - No JavaScript files
  - **Tailwind utilities** - No custom CSS files unless absolutely necessary
  - **Co-locate styles** - Keep styles with components

  **UI Component Decision Matrix**:

  ```
  Need a button/input/card?
  ├─ ✅ FIRST: Check if it's in src/components/ui/ (shadcn/ui)
  ├─ ✅ IF NOT: Run `pnpm dlx shadcn@latest add button`
  └─ ❌ LAST RESORT: Create custom component

  Need animations/effects?
  ├─ ✅ FIRST: Check src/components/magicui/ (AnimatedButton, ParticleDemo, etc.)
  ├─ ✅ IF NOT: Check magicui.design for more components
  └─ ❌ LAST RESORT: Use framer-motion directly

  Need complex layout?
  ├─ ✅ Use Tailwind flex/grid utilities
  └─ ❌ Don't create layout components
  ```

  **Speed tip**: Browse existing pages (`src/app/(pages)/*/page.tsx`) to see real usage examples

- **AI Provider - Multi-Model Support Built-in**:
  - ✅ **ALWAYS use**: `resolveLanguageModel(provider, model?)` from `src/lib/ai/providers`
  - ✅ **Support all 3**: OpenAI, Claude, Gemini (already configured!)
  - ❌ **NEVER do**: `const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY })`
  - 📚 **Example**: See `src/server/routers/chat.ts:24-27` for the correct pattern
  - 🔧 **Adding new provider**: Extend factory in `src/lib/ai/providers/`, update types, add to `.env.example`

  **Why this matters**: Users can switch AI providers without changing code. Your feature works with all 3 providers immediately.

- **Data & Backend**: Do not create new tables or migrations without explicit instruction. Prefer in-memory data, the existing `hello` table, or tRPC mocks. If persistence is necessary, confirm with the user before executing `pnpm db:generate` → `pnpm db:push`.

- **Role & Mindset**: Review relevant code and directory structure before acting. Prioritize readability in code, followed by performance and maintainability. Maintain appropriate modularization. Avoid security risks (e.g., direct `innerHTML` usage).

- **Delivery Process**: When multiple solutions exist, rank them by recommendation level and list pros/cons, applicable scenarios, project suitability, and potential risks. Check existing dependencies before suggesting new ones to avoid redundancy. Use the project’s default testing framework to supplement tests when needed.

- **Constraints**: Focus responses strictly on the current request; avoid extraneous work. Final decisions rest with the user. If unintended modifications are detected, pause and seek clarification.

- **Tool Use**: Use context7 to get more detailed information for MagicUI components.

## Build, Test, and Development Commands

Use `pnpm dev` for local development with Turbopack HMR. Run `pnpm lint` to execute ESLint across the repo, and `pnpm format` for Prettier-driven formatting. Production builds (`pnpm build` then `pnpm start`) should run only when explicitly validating deployment artifacts. Database workflows rely on Drizzle scripts: `pnpm db:generate` for migrations, `pnpm db:push` to sync schema, and `pnpm db:studio` to inspect data.

## Coding Style & Naming Conventions

All new code should be in TypeScript. Follow the repository Prettier defaults (two-space indentation, single quotes, no semicolons) and rely on `pnpm format` before committing. Favor descriptive PascalCase for components, camelCase for utilities, and kebab-case for file names unless extending an existing pattern. Co-locate styles with their components, prefer Tailwind utilities, and use the `cn` helper from `src/lib/utils/utils` for conditional classes.

## Testing Guidelines

A dedicated automated test suite is not yet wired in; when adding coverage, scaffold the toolchain (Vitest or Jest) within the feature scope and expose a `pnpm test` script. Co-locate tests next to the implementation (`Component.test.tsx`, `route.test.ts`) and prioritise integration points such as tRPC procedures, AI provider adapters, and critical UI flows. Include deterministic mocks for external APIs.

## Commit & Pull Request Guidelines

Craft commits that focus on a single concern and use present-tense, sentence-case messages (e.g., `Add chat provider fallback`). Pull requests should describe the motivation, outline key changes, note any schema or environment updates, and link to tracking issues. Provide screenshots or terminal output when the work affects user-visible flows or CLI behaviour.

## Security & Configuration Tips

Never commit `.env*` files. Resolve AI credentials through `src/lib/ai/providers/resolveLanguageModel`, avoiding direct key usage in routes or components. Confirm database migrations with the team before applying them, and audit external dependencies for overlap with existing utilities before adding new packages.

## 🚀 Quick Reference for Common Tasks

### Task: Add AI Chat Feature

```bash
# 1. Copy existing chat component
cp src/components/chat/OpenAIChatDemo.tsx src/components/chat/MyChat.tsx

# 2. Use existing chat router (already has streaming + error handling)
# Just import from src/server/routers/chat.ts

# 3. Create page
# Copy src/app/(pages)/openai/page.tsx structure
```

### Task: Add CRUD Operations

```bash
# 1. Define schema
# See src/lib/schema/hello.ts as example

# 2. Create router
# See src/server/routers/hello.ts for query/mutation patterns

# 3. Use in component
# import { trpc } from '@/lib/trpc/client'
# const query = trpc.feature.list.useQuery()
```

### Task: Add New Page with Navigation

```bash
# 1. Create page
mkdir -p src/app/\(pages\)/new-feature
# Copy src/app/(pages)/trpc/page.tsx as starting point

# 2. Add to navigation
# Edit src/app/(pages)/page.tsx to add link
```

### Task: Add Animated UI Component

```bash
# 1. Check magicui examples first
ls src/components/magicui/

# 2. Or add shadcn component
pnpm dlx shadcn@latest add [component-name]

# 3. Import and use in your page
```

## 📊 Success Metrics

When you've done a good job:

- ✅ Feature works end-to-end (UI → tRPC → AI/DB → UI)
- ✅ Supports all 3 AI providers (or N/A if not AI feature)
- ✅ Has loading states and error handling
- ✅ Passes `pnpm lint` and `pnpm format`
- ✅ User can test it in browser immediately
- ✅ Code looks similar to existing patterns in the repo

When you need to slow down:

- ⚠️ Creating new architectural patterns (ask first!)
- ⚠️ Adding database migrations (confirm with user)
- ⚠️ Installing new major dependencies (check if exists first)
- ⚠️ Writing custom hooks/utilities (reuse existing or use tRPC)
