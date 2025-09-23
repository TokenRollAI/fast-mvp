# Repository Guidelines

## Project Structure & Module Organization

- **Project Structure**: `src/app` handles routing and pages (distinguishing between `(pages)` client views and `(server)` Route Handlers), `src/components` stores reusable UI components (prioritizing subdirectories like `ui/` and `magicui/`), `src/lib` contains utilities and AI Providers, while `src/server` and `src/db` manage tRPC and Drizzle logic. Before making changes, identify the relevant directories to maintain consistency between files and responsibilities.

- **New Feature Workflow**: Confirm existing implementations and dependencies, choose reusable components or routes. When adding pages/endpoints in `src/app`, update corresponding Providers, routers, or schemas accordingly. Extract shared logic into `src/lib` or existing modules to avoid duplication. After implementation, verify types, state management, and error handling, then add tests as needed.

- **Development Process**: Always iterate using `pnpm dev` or other watch scripts. Do not run `pnpm build` within a session. Prefer project-specific scripts when executing commands.

- **Dependency Management**: Use only `pnpm add/update/remove`. Keep `pnpm-lock.yaml` synchronized with `package.json`. Restart the development server after dependency changes.

- **Code Style**: Prioritize TypeScript; keep component-related styles in the same directory as components. Follow conventions for Tailwind, shadcn/ui, and magicui. UI Component Strategy:
  - Prioritize adding existing components from third-party libraries (shadcn/ui, magicui) instead building from scratch
  - Use pnpm dlx shadcn-ui@latest add … to incorporate official templates when necessary
  - Only consider fully custom implementation when existing components cannot meet the requirements

- **AI Provider**: Consistently retrieve models via `src/lib/ai/providers/resolveLanguageModel`. Do not handle API keys directly in components or Route Handlers. When adding a new Provider, extend the factory and types in that directory and update `.env.example`.

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
