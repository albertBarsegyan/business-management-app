# Project conventions

## Tech stack
- Next.js 16 (App Router), React 19, TypeScript
- Tailwind CSS v4 + shadcn/ui (Radix primitives), lucide-react icons
- Package manager: pnpm

## Commands
- `pnpm dev` — start the dev server
- `pnpm build` — production build
- `pnpm start` — run the production build
- `pnpm lint` — run ESLint
- `pnpm build:ds-css` — build the design-system CSS bundle (`dist/ds-styles.css`)

## Structure
Feature-sliced design layout, rooted at `@/*`:
- `app/` — Next.js routes only; app-specific routes live under the `(zhamo)` route group
- `widgets/` — composed page sections (e.g. `day-calendar`, `booking-widget`), each with `ui/` and `model/` (and `lib/` where needed)
- `features/` — user-facing feature logic
- `entities/` — domain models/data
- `shared/` — reusable code: `shared/ui` (shadcn components), `shared/lib`, `shared/hooks`, `shared/config`

## UI components
Add shadcn components via the `shadcn` CLI — it respects the aliases in `components.json` (`@/shared/ui`, `@/shared/lib`, etc.). Base color is `neutral`, style is `radix-nova`.

@AGENTS.md
