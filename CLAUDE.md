# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## 🚀 Vibe Coding with Fast MVP

This is a **production-ready template** for rapid AI-powered application development. Use this as a starting point to quickly build and iterate on full-stack AI features.

### Quick Start for New Features

When the user asks to build a new feature, follow this pattern:

1. **Identify the feature type:**
   - AI Chat/Completion → Reference `src/app/(pages)/openai/page.tsx` and `src/server/routers/chat.ts`
   - CRUD with tRPC → Reference `src/server/routers/hello.ts` and `src/app/(pages)/trpc/page.tsx`
   - Brutalist UI → Reference `src/app/(pages)/page.tsx` and `src/app/(pages)/globals.css`

2. **Copy and adapt existing patterns:**
   - Don't reinvent the wheel - this template has working examples
   - Use existing routers, schemas, and components as blueprints
   - Keep the same error handling, validation, and type safety patterns

3. **Leverage the AI provider system:**
   - All AI features should use `resolveLanguageModel(provider, model)`
   - Support all 3 providers (OpenAI, Claude, Gemini) out of the box
   - See `src/lib/ai/providers/` for the abstraction layer

4. **Rapid iteration workflow:**
   ```bash
   pnpm dev          # Start dev server (auto-reload)
   # Make changes, test in browser
   pnpm format       # Format before committing
   ```

### Development Philosophy

- **Speed > Perfection** - Get working code first, refine later
- **Copy > Create** - Reuse existing components and patterns
- **Type Safety** - Use tRPC + Zod for end-to-end validation
- **Show, Don't Tell** - Build UI demos for every feature
- **Clean Slate** - Once you understand the structure, DELETE example files and start fresh
- **Beautiful First Impression** - Every demo MUST have an attractive homepage (modify `src/app/(pages)/page.tsx`)
- **Use Theme Variables** - NEVER hardcode colors like `#ba7123` or `bg-blue-500`, use theme classes instead

## Commands

**Development:**

```bash
pnpm dev          # Start dev server with Turbopack (port 3000 by default)
pnpm build        # Build production bundle with Turbopack
pnpm start        # Start production server
pnpm lint         # Run ESLint
pnpm format       # Format code with Prettier
```

**Database (Drizzle ORM + SQLite):**

```bash
pnpm db:push      # Push schema to database (development)
pnpm db:generate  # Generate migration files
pnpm db:migrate   # Run migrations (production)
pnpm db:studio    # Open Drizzle Studio
```

**Important:** Always use `pnpm` (not npm/yarn). Run `pnpm dev` for iteration; avoid running build during development.

## Architecture Overview

This is a Next.js 15 App Router project with a full-stack TypeScript architecture using tRPC for end-to-end type safety.

### Route Groups Structure

The `src/app` directory uses route groups to separate concerns:

- **`(pages)/`** - Client-facing pages and layouts
- **`(server)/api/`** - Server-side API endpoints (Route Handlers)
- **`(server)/api/trpc/[trpc]/`** - tRPC HTTP endpoint

### tRPC Layer

tRPC provides type-safe APIs between client and server:

- **Server:** `src/server/routers/` contains procedure definitions
  - `_app.ts` - Root router that merges all sub-routers
  - Individual routers like `hello.ts`, `chat.ts`
- **Client:** `src/lib/trpc/` contains tRPC React Query client setup
- **Schemas:** `src/lib/schema/` contains Zod schemas for input validation (shared between client/server)
- **Transformer:** Uses `superjson` to serialize complex types (Date, Map, Set, etc.)

**Adding a new tRPC router:**

1. Create router file in `src/server/routers/feature.ts`
2. Define Zod schema in `src/lib/schema/feature.ts`
3. Import and merge into `src/server/routers/_app.ts`

### AI Provider Architecture

Multi-provider AI integration using Vercel AI SDK:

- **Factory:** `src/lib/ai/providers/resolveLanguageModel(provider, model?)` - Single entry point for all AI operations
- **Providers:** `src/lib/ai/providers/{openai,gemini,claude}.ts` - Provider-specific configurations
- **Supported:** `'openai' | 'gemini' | 'claude'`

**Critical:** Never handle API keys directly in components or Route Handlers. Always use `resolveLanguageModel()` which reads from environment variables. When adding a new provider, extend the factory and update `.env.example`.

### Database Layer

- **ORM:** Drizzle with SQLite (libSQL/Turso compatible)
- **Schemas:** `src/db/schema/` defines table structures
- **Client:** `src/db/db.ts` exports database instance
- **Migrations:** Do NOT create new tables or migrations without explicit instruction. Use existing tables or in-memory data for demos.

### Component Organization

```
src/components/
├── ui/           # UI components (morphing-text animation)
├── chat/         # Chat feature components
├── helloDemo/    # Demo components
└── providers/    # React context providers (tRPC, Theme)
```

**Component strategy:** Use Radix UI Themes components with Brutalist CSS classes. Follow the Neo-Brutalism design system for all new UI.

## 🎨 Neo-Brutalism Design System - Use This!

The project uses a **Neo-Brutalism design system** defined in `src/app/(pages)/globals.css`. **ALWAYS use Brutalist CSS classes instead of custom styles.**

### ❌ DON'T Do This:

```tsx
// BAD - Hardcoded colors and styles
<div className="bg-[#ba7123] text-[#f0f0f0]">
<div className="bg-blue-500 text-white rounded-lg shadow-lg px-4 py-2">
<button style={{ background: 'linear-gradient(135deg, #ba7123, #523737)' }}>
```

### ✅ DO This Instead:

**Brutalist Components (Recommended):**

```tsx
// Use Brutalist CSS classes
<div className="brutalist-container">           // Page container
<div className="brutalist-card p-8">           // Large card with padding
<div className="brutalist-card-sm p-6">        // Small card
<button className="brutalist-button">          // Default button
<button className="brutalist-button brutalist-button-blue">  // Colored button
<input className="brutalist-input" />          // Input field
<span className="brutalist-badge brutalist-badge-green">  // Badge
<table className="brutalist-table">            // Table
<div className="brutalist-stat-card">          // Stat card
```

**Typography:**

```tsx
<h1 className="brutalist-title">Main Title</h1>
<h2 className="brutalist-heading">Heading</h2>
<p className="brutalist-text">Body text</p>
<p className="brutalist-text brutalist-text-secondary">Secondary text</p>
```

**Color Variants:**

```tsx
// Buttons
brutalist - button - pink
brutalist - button - blue
brutalist - button - green

// Badges
brutalist - badge - blue
brutalist - badge - green
brutalist - badge - yellow
brutalist - badge - queued
```

### Design Tokens

**Colors:**

- `--color-pink`: #ff7aa3
- `--color-yellow`: #ffd966
- `--color-blue`: #6ba4ff
- `--color-green`: #5fe0a8
- `--text-primary`: #000000
- `--text-secondary`: #666666

**Borders:**

- `--border-thick`: 3px
- `--border-medium`: 2px
- `--border-thin`: 1px

**Shadows:**

- `--shadow-lg`: 6px 6px 0 rgba(0, 0, 0, 0.15)
- `--shadow-md`: 4px 4px 0 rgba(0, 0, 0, 0.15)

**Radius:**

- `--radius-xl`: 20px
- `--radius-lg`: 16px
- `--radius-md`: 12px

### Why This Matters

1. **Design Consistency** - All pages use the same Brutalist style
2. **Fast Development** - Pre-built components, no custom CSS needed
3. **Visual Identity** - Bold, functional, geometric design
4. **Maintainability** - Update design tokens in one place

## Development Workflow

### 🎯 Step-by-Step: Adding a New Feature

**Example: User wants "AI-powered image generator"**

**Step 0: Clean Up Examples (2 min)** ⚠️ IMPORTANT

```bash
# Once you understand the structure, remove example pages
rm -rf src/app/(pages)/trpc
rm -rf src/app/(pages)/openai
# Keep the structure, remove the demos
```

1. **Create the page** (5 min)

   ```bash
   # Copy existing pattern
   cp src/app/(pages)/openai/page.tsx src/app/(pages)/image-gen/page.tsx
   # Update imports and content
   ```

2. **Create tRPC router** (10 min)

   ```typescript
   // src/server/routers/imageGen.ts
   export const imageGenRouter = router({
     generate: publicProcedure
       .input(imageGenSchema.generate)
       .mutation(async ({ input }) => {
         const model = resolveLanguageModel(input.provider)
         // Implementation here
       }),
   })
   ```

3. **Define schema** (5 min)

   ```typescript
   // src/lib/schema/imageGen.ts
   export const imageGenSchema = {
     generate: z.object({
       prompt: z.string().min(1),
       provider: z.enum(['openai', 'claude', 'gemini']),
     }),
   }
   ```

4. **Register router** (2 min)

   ```typescript
   // src/server/routers/_app.ts
   import { imageGenRouter } from './imageGen'

   export const appRouter = router({
     hello: helloRouter,
     chat: chatRouter,
     imageGen: imageGenRouter, // Add this
   })
   ```

5. **Build the UI** (15 min)
   - Use Brutalist CSS classes from `src/app/(pages)/globals.css`
   - Follow the pattern in `OpenAIChatDemo.tsx`
   - Add loading states and error handling

6. **Design Beautiful Homepage** (10 min) 🎨 REQUIRED
   ```tsx
   // Edit src/app/(pages)/page.tsx
   // Use Brutalist classes, NOT hardcoded colors!
   <div className='brutalist-container'>
     <h1 className='brutalist-title'>Demo Name</h1>
     <div className='brutalist-card p-8'>
       <h2 className='brutalist-heading'>Feature</h2>
       <button className='brutalist-button brutalist-button-blue'>
         Try Now
       </button>
     </div>
   </div>
   ```

**Total time: ~50 minutes from idea to production-ready demo**

### 🔥 Common Patterns (Copy These!)

**Pattern 1: AI Streaming Response**

```typescript
// See src/server/routers/chat.ts for full example
import { streamText } from 'ai'

const stream = await streamText({
  model: resolveLanguageModel(provider, model),
  messages: [...conversationHistory],
})
```

**Pattern 2: tRPC Mutation with Error Handling**

```typescript
// Always use TRPCError for proper error responses
catch (error) {
  throw new TRPCError({
    code: 'INTERNAL_SERVER_ERROR',
    message: 'User-friendly message',
    cause: error,
  })
}
```

**Pattern 3: React Query Hook**

```typescript
// Client-side usage
const mutation = trpc.feature.action.useMutation({
  onSuccess: (data) => {
    /* handle success */
  },
  onError: (error) => {
    /* handle error */
  },
})
```

### 💡 Best Practices for Agents

1. **Always check existing code first**
   - Read `src/app/(pages)/*/page.tsx` for page patterns
   - Read `src/server/routers/*.ts` for API patterns
   - Read `src/components/` for reusable UI

2. **Preserve the architecture**
   - Keep route groups structure (pages) vs (server)
   - Use tRPC for all API calls, not fetch/axios
   - Use Zod schemas for validation
   - Use `resolveLanguageModel()` for AI, never direct API keys

3. **Progressive enhancement**
   - Start with working code (copy existing)
   - Add features incrementally
   - Test after each change

4. **Component reuse priority:**

   ```
   1. Brutalist CSS classes (src/app/(pages)/globals.css)
   2. Radix UI Themes components (with Brutalist styling)
   3. Custom components only if absolutely necessary
   ```

5. **Don't over-engineer**
   - In-memory state is fine for MVP
   - Database only if explicitly needed
   - Simple > Complex

### Critical Constraints

- Use `pnpm dev` for iteration (has HMR)
- Never commit `.env` files
- Restart dev server after dependency changes
- Don't modify database schema without confirmation
- Run `pnpm format` before showing code to user

## Environment Variables

Copy `.env.example` to `.env.local`:

- `DB_FILE_NAME` - Database file path (default: `file:local.db`)
- `OPENAI_API_KEY`, `OPENAI_MODEL`, `OPENAI_BASE_URL`
- `GOOGLE_API_KEY`, `GOOGLE_MODEL`, `GOOGLE_API_BASE_URL`
- `ANTHROPIC_API_KEY`, `ANTHROPIC_MODEL`, `ANTHROPIC_BASE_URL`

---

- Always follow <projectRoot>/llmdoc/feature/neo-brutalism-design-system.md to design new page and component
