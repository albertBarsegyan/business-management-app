# Data model — reverse-engineered from the frontend

**Date:** 2026-08-21
**Git commit:** `fa07e0f31b3156e13e0b622d9d66ac49c6bc33ff` (branch `main`; working tree had uncommitted changes at analysis time — see note below)
**Routes found:** 24 (20 in the `(zhamo)` app route group, 3 root-level, 1 uncommitted dev demo)
**Data-wait points found:** 27 (UI moments that imply a backend call — the codebase has **zero** real data-fetching code: no `fetch`/`axios`/`"use server"`/route handlers/react-query/SWR/zod anywhere in `app/`, `widgets/`, `features/`, `entities/`, or `shared/`. Every screen renders hardcoded mock arrays.)

> **Working-tree note:** at analysis time `app/(zhamo)/integrations/page.tsx` and `widgets/integrations/` were staged as deleted, and `widgets/day-calendar/model/nav-items.ts` / `widgets/day-calendar/ui/sidebar-nav.tsx` had unstaged edits (adding icons — unrelated to this analysis) and `app/table-demo/` was untracked. This report reflects the working tree as it stood, i.e. **no `/integrations` route exists**.

## Table of contents

- [1. Inventory](#1-inventory)
  - [1.1 Routes](#11-routes)
  - [1.2 Data-wait points](#12-data-wait-points)
  - [1.3 Existing types](#13-existing-types)
  - [1.4 UI-implied fields](#14-ui-implied-fields)
- [2. Entities & API](#2-entities--api)
  - [2.1 Entity catalog](#21-entity-catalog)
  - [2.2 API contract](#22-api-contract-by-route)
  - [2.3 Gaps](#23-gaps)
- [3. Database schema](#3-database-schema)

---

## 1. Inventory

### 1.1 Routes

Every `app/**/page.tsx` in this repo is a **Server Component** (no `"use client"` directive at the page level) that does nothing but import and render one client-component widget. There are **no dynamic segments** (`[id]`, `[slug]`) anywhere in `app/`, and **no `loading.tsx` / `error.tsx` / `not-found.tsx`** exist for any route. `app/layout.tsx` (root) wraps everything in `TooltipProvider`; `app/(zhamo)/layout.tsx` only swaps in the Zhamo font stack — neither does auth/data loading.

| Route | File | Renders | Notes |
|---|---|---|---|
| `/` | `app/page.tsx` | inline marketing landing page | Server Component, static JSX only |
| `/sign-in` | `app/sign-in/page.tsx` | `SignInForm` (`features/sign-in/ui/sign-in-form.tsx`) | client form, `router.push("/reports")` on submit, no real auth call |
| `/sign-up` | `app/sign-up/page.tsx` | `SignUpForm` (`features/sign-up/ui/sign-up-form.tsx`) | client form, `router.push("/setup")` on submit, no real auth call |
| `/table-demo` | `app/table-demo/page.tsx` | inline (untracked, dev-only) | showcases `shared/ui/table.tsx` variants with throwaway mock rows; **not a real business screen**, excluded from entity catalog but used below as corroborating evidence for Client/Team/Service/Settings field names |
| `/appointment-panel` | `app/(zhamo)/appointment-panel/page.tsx:1-4` | `AppointmentPanelScreen` (`widgets/appointment-panel`) | |
| `/billing` | `app/(zhamo)/billing/page.tsx:1-4` | `BillingScreen` (`widgets/billing`) | |
| `/booking` | `app/(zhamo)/booking/page.tsx:1-4` | `DayCalendarScreen` (`widgets/day-calendar`) | **misleading name** — this is the staff day-calendar/scheduling dashboard, not the customer booking flow |
| `/clients` | `app/(zhamo)/clients/page.tsx:1-4` | `ClientsScreen` (`widgets/clients`) | |
| `/customer` | `app/(zhamo)/customer/page.tsx:1-4` | `CustomerBookingScreen` (`widgets/booking-widget`) | the actual customer-facing booking flow lives here |
| `/design-system` | `app/(zhamo)/design-system/page.tsx:1-4` | `DesignSystemSheet` | dev/style tooling, no data types at all — excluded from entity catalog |
| `/finance` | `app/(zhamo)/finance/page.tsx:1-4` | `FinanceScreen` (`widgets/finance`) | |
| `/landing-builder` | `app/(zhamo)/landing-builder/page.tsx:1-4` | `LandingBuilder` (`widgets/landing-builder`) | |
| `/loyalty` | `app/(zhamo)/loyalty/page.tsx:1-4` | `LoyaltyScreen` (`widgets/loyalty`) | |
| `/notifications` | `app/(zhamo)/notifications/page.tsx:1-4` | `NotificationsScreen` (`widgets/notifications`) | |
| `/onboarding` | `app/(zhamo)/onboarding/page.tsx:1-4` | `OnboardingFlow` (`widgets/onboarding-flow`) | |
| `/payroll` | `app/(zhamo)/payroll/page.tsx:1-4` | `PayrollScreen` (`widgets/payroll`) | |
| `/products` | `app/(zhamo)/products/page.tsx:1-4` | `ProductsScreen` (`widgets/products`) | |
| `/reports` | `app/(zhamo)/reports/page.tsx:1-4` | `ReportsScreen` (`widgets/reports`) | |
| `/resources` | `app/(zhamo)/resources/page.tsx:1-4` | `ResourcesScreen` (`widgets/resources`) | |
| `/screens` | `app/(zhamo)/screens/page.tsx:1-4` | `ScreenIndex` | dev site-map/nav page, not a business screen — excluded from entity catalog, used only as corroborating evidence (see 1.4) |
| `/services` | `app/(zhamo)/services/page.tsx:1-4` | `ServicesScreen` (`widgets/services`) | |
| `/settings` | `app/(zhamo)/settings/page.tsx:1-4` | `SettingsScreen` (`widgets/settings`) | |
| `/setup` | `app/(zhamo)/setup/page.tsx:1-4` | `SetupModalScreen` (`widgets/setup-modal`) | onboarding wizard for service/team/schedule setup |
| `/team` | `app/(zhamo)/team/page.tsx:1-4` | `TeamScreen` (`widgets/team`) | |

**Orphaned widgets (built, no route mounts them):**
- `widgets/branding-builder/` — referenced only by a dead link (`href: "/branding"`) in `widgets/screen-index/model/screens.ts:86`; no `app/(zhamo)/branding/` directory exists.

### 1.2 Data-wait points

No real network layer exists anywhere in the repo. Every row below is a UI affordance (button with no `onClick` handler wired, a skeleton component, a toast, a filter control acting on an in-memory array, etc.) that implies what a real backend interaction would look like.

| # | File:line | Trigger | Implies |
|---|---|---|---|
| 1 | `widgets/setup-modal/ui/service-skeleton.tsx` (shape from `widgets/setup-modal/model/setup-data.ts:3-8`) | loading skeleton | `POST /services` during setup wizard |
| 2 | `widgets/setup-modal/ui/team-skeleton.tsx` (shape from `setup-data.ts:9-13`) | loading skeleton | `POST /team-members` during setup wizard |
| 3 | `widgets/setup-modal/ui/schedule-skeleton.tsx` (shape from `setup-data.ts:14-16`) | loading skeleton | `PUT /schedule` during setup wizard |
| 4 | `widgets/appointment-panel/ui/saved-toast.tsx` | optimistic "Saved" toast | fast, optimistic `POST/PATCH /appointments` |
| 5 | `widgets/appointment-panel/ui/conflict-banner.tsx:23-25` + `widgets/booking-widget/ui/mobile-widget/step-confirmed.tsx:9-13` | double-booking race message with 3 alternative slots | `POST /appointments` returns `409 Conflict` + server-suggested alternatives on both staff and customer booking flows |
| 6 | `widgets/booking-widget/lib/use-booking-flow.ts:29-35` (5-step machine) | multi-step booking wizard | `GET /services`, `GET /specialists`, `GET /availability?date=`, `POST /verify-phone`, `POST /appointments` (guest) |
| 7 | `widgets/setup-modal/model/setup-data.ts:41-45` (`walkthrough` copy) | "matches them or creates the card as you type" | `GET /clients/search?phone=` typeahead, used by both appointment-panel and the customer flow |
| 8 | `widgets/day-calendar/model/month-days.ts` (`load` field, per-day float) | mini-calendar occupancy heatmap | `GET /calendar/month?month=` returning per-day occupancy ratio |
| 9 | `widgets/booking-widget` mounted at `/customer` but never linked from anywhere else in the app | — | dead-end/soft-launch feature; flagged as a gap (§2.3) |
| 10 | `widgets/clients/ui/add-client-panel.tsx` (whole form, "Save client" button `:127-129` has no handler) | client-create form | `POST /clients` |
| 11 | `widgets/clients/ui/empty-state.tsx:18-23` | "Add first client" / "Import from Excel" | `POST /clients` (single) and a bulk-import job |
| 12 | `widgets/team/ui/team-table.tsx:24-26` | "Add" button, no form implemented | `POST /team-members` (shape not directly observable from UI) |
| 13 | `widgets/onboarding-flow/*` (whole 4-screen flow, "Set up my workspace" CTA in `step-location.tsx:86`) | tenant signup wizard | single bundled `POST /workspaces` (or `/onboarding/complete`) |
| 14 | `widgets/services/index.tsx:20` | "Add service" button, no handler | `POST /services` |
| 15 | `widgets/products/index.tsx:18` | "Add product" button, no handler | `POST /products` |
| 16 | `widgets/billing/index.tsx:24-28` | "Change plan" button, no handler | `GET /billing/plans` + `PATCH /billing/subscription` |
| 17 | `widgets/billing/index.tsx:42-46` | "Update card" button, no handler | processor-hosted flow, e.g. `POST /billing/payment-method/setup-intent` (Stripe-style) |
| 18 | `widgets/payroll/index.tsx:17` | "Run payroll" button, no handler | `POST /payroll/runs` (batch action creating payslips for a period) |
| 19 | `widgets/services/index.tsx:8-13` | category filter pills (client-side `useMemo`) | `GET /services?category=` if server-paginated |
| 20 | `widgets/finance/index.tsx:23` (caption "Recent transactions") | bounded feed, no pagination UI | `GET /finance/transactions?limit=` |
| 21 | `widgets/settings/index.tsx:12` | "Save changes" button, no handler | `PATCH /settings` (bundles profile + hours + preferences) |
| 22 | `widgets/resources/index.tsx:18` | "Add resource" button, no handler | `POST /resources` |
| 23 | `widgets/notifications/index.tsx:17-19` | per-channel toggle columns | `PATCH /notification-rules/:id` |
| 24 | `widgets/reports/index.tsx` (whole screen, no date-picker/refresh control) | static aggregate tables | `GET /reports/revenue-by-week`, `GET /reports/top-services`, `GET /reports/stats` — implicit default period, no way to change it in the UI |
| 25 | `widgets/landing-builder/model/use-landing-builder.ts:524` (`publish()`) | flips a local boolean | `POST /pages/:id/publish` |
| 26 | `widgets/landing-builder/model/use-landing-builder.ts:119-121` (`markDirty()` on every edit) | resets `published` to `false` on every field change, never persists | implies an autosave-draft endpoint that the mock never calls (edits are lost on refresh) |
| 27 | `widgets/branding-builder/lib/build-view-model.ts:50` | hardcodes `"Draft — 4 unpublished changes"` | implies a **change counter since last publish** — a different fidelity than landing-builder's plain boolean; the two builders model "draft state" inconsistently (see §2.3) |

### 1.3 Existing types

Grouped by domain. No zod schemas or react-hook-form usage exist anywhere in the repo (confirmed by repo-wide grep) — every form is a plain `useState`-driven `<input>`, so "required" below is read from HTML `required`/placeholder/default-value conventions, not schema validation.

#### Scheduling / booking

- `PanelMode` = `"new" | "edit" | "conflict"` — `widgets/appointment-panel/model/types.ts:1`
- `VisitStatus` = `"Pending" | "Arrived" | "No-show" | "Confirmed"` — `types.ts:3`
- `PanelService` — `types.ts:5-17`: `id: string`, `name: string`, `meta: string`, `price: string`, `selected?: boolean`, `detail?: { price: string; discountPercent: string; duration: string; masterShare: string }`
- `PanelMatch` — `types.ts:19-27`: `name`, `phone`, `initials`, `avatar`, `visits`, `last` (all `string`), `linked?: boolean`
- `TimeSlot` — `widgets/day-calendar/model/slots.ts:1-8` — purely visual grid config (label/colors), not a domain entity
- `MonthDay` — `widgets/day-calendar/model/month-days.ts:1-8`: `n`, `bg`, `color`, `weight: "400"|"700"`, `load`, `loadColor` — `load` is a derived occupancy value
- `Stat` (generic, reused across many domains) — `widgets/day-calendar/ui/stat-grid.tsx:1-6`: `{ label: string; value: string; sub?: string; subColor?: string }`
- `team` (day-calendar's 4 staff shown on the calendar) — `widgets/day-calendar/model/team.ts:3-8` — **no declared TS type**, `as const` array of `{ name, role, hours, initials, color }`
- `BookingStep` = `1|2|3|4|5` — `widgets/booking-widget/model/types.ts:1`
- `SlotState` = `"free" | "gone" | "picked"` — `types.ts:3`
- `ServiceOption` — `types.ts:5-9`: `name`, `duration`, `price` (all `string`)
- `ServiceCategory` — `types.ts:11-17`: `name`, `count: string`, `glyph: string`, `open: boolean`, `services: ServiceOption[]`
- `Specialist` — `types.ts:19-25`: `name`, `role`, `rating`, `free`, `initials` (all `string`)
- `DateOption` — `types.ts:27-31`: `dow`, `day`, `free` (all `string`)
- `TimeSlotDef` — `types.ts:33-36`: `label: string`, `state: SlotState`
- `TimeGroupDef` — `types.ts:38-42`: `label`, `meta`, `slots: TimeSlotDef[]`
- `SetupStep` = `1|2|3|4` — `widgets/setup-modal/model/types.ts:1`
- `DayKey` = `"Sun"|"Mon"|"Tue"|"Wed"|"Thu"|"Fri"|"Sat"` — `types.ts:3`
- `Duration` = `"30 m" | "1 h" | "1 h 30 m"` — `types.ts:7` — **narrower** than the free-text durations used elsewhere (e.g. day-calendar's `"45 min"`, services' `"2 h 30 min"`) — see gaps
- `HourPreset` = `"9:00–18:00"|"9:00–22:00"|"10:00–18:00"|"10:00–22:00"|"Custom hours"` — `types.ts:9`

#### People / HR

- `Segment` — `widgets/clients/model/clients.ts:1`: `label`, `count`, `border`, `bg`, `color`, `weight` (all `string`) — styling fields are presentation, not domain data
- `ClientRow` — `clients.ts:12-30`: `name`, `initials`, `avatar`, `phone`, `email`, `sold` (formatted money string), `balance` (formatted money string, can be negative), `balanceColor`, `visits: string` (numeric-as-string), `discount: string`, `last: string` (`dd.mm.yyyy`), `first: string` (`dd.mm.yyyy`), `check`, `checkBg`, `checkBorder`, `bg`, `vip: boolean` — all required, no optionals
- `TeamRow` — `widgets/team/model/team.ts:3-20`: `name`, `position: string`, `initials`, `avatar`, `phone`, `email`, `schedule: string`, `schedBg`, `schedColor`, `toggleBg: string`, `knob: string`, `services: string` (numeric-as-string), `role`, `subscription`, `subColor`, `bg` — all required
- `Chip` (onboarding) — `widgets/onboarding-flow/model/onboarding-data.ts:3-10`: `label: string`, `check?: string`, `border`, `bg`, `color` (`string`), `weight: "400"|"600"`

#### Commerce / money

- `ServiceRow` — `widgets/services/model/data.ts:1-8`: `name`, `category`, `duration`, `price` (formatted string), `staff` (denormalized string, e.g. `"Karen, Davit"`), `online: boolean`
- `ProductRow` — `widgets/products/model/data.ts:10-17`: `name`, `sku`, `category` (`string`), `stock: number`, `price: string`, `status: "In stock" | "Low stock" | "Out of stock"`
- `TransactionRow` — `widgets/finance/model/data.ts:10-16`: `date`, `client`, `type: "Appointment" | "Product sale" | "Refund" | "Payout"`, `amount: string`, `status: "Paid" | "Pending" | "Refunded"`
- `InvoiceRow` — `widgets/billing/model/data.ts:14`: `date`, `amount`, `status: "Paid" | "Due"` (2-value union, distinct enum from `TransactionRow.status`), `invoiceNo: string`
- `currentPlan` (untyped object literal) — `billing/model/data.ts:1-6`: `name`, `price`, `renewsOn`, `seats` (formatted `"4 of 5 team members"`)
- `paymentMethod` (untyped object literal) — `billing/model/data.ts:8-12`: `brand`, `last4`, `expires` (`MM/YY`)
- `PayrollRow` — `widgets/payroll/model/data.ts:10-17`: `name`, `role`, `base`, `commission`, `total` (all `string`, formatted money), `status: "Paid" | "Scheduled"`

#### Engagement / ops

- `TierRow` — `widgets/loyalty/model/data.ts:10`: `tier`, `threshold`, `perk` (all `string`)
- `MemberRow` — `loyalty/model/data.ts:18`: `name: string`, `tier: "Bronze"|"Silver"|"Gold"`, `points: number`, `lastVisit: string`
- `NotificationRow` — `widgets/notifications/model/data.ts:1-7`: `label`, `description` (`string`), `sms: boolean`, `email: boolean`, `push: boolean`
- `ResourceRow` — `widgets/resources/model/data.ts:1-6`: `name: string`, `type: "Chair"|"Room"|"Equipment"`, `assignedTo: string`, `status: "Available"|"In use"|"Maintenance"`
- `WeekRow` — `widgets/reports/model/data.ts:10`: `week`, `appointments: number`, `revenue: string`, `avgTicket: string`
- `ServiceRow` (reports, distinct from services' `ServiceRow`) — `reports/model/data.ts:19`: `service: string`, `bookings: number`, `revenue: string`, `share: string`
- `BusinessProfile` — `widgets/settings/model/data.ts:1-6`: `name`, `address`, `timezone`, `currency` (all `string`)
- `HoursRow` — `settings/model/data.ts:15-19`: `day: string`, `open: boolean`, `hours: string`
- `PreferenceRow` — `settings/model/data.ts:31-35`: `label`, `description` (`string`), `on: boolean`

#### Marketing / website builder

- `SpacingOption` = `"compact"|"normal"|"roomy"`, `BgOption` = `"page"|"tinted"|"dark"`, `DeviceOption` = `"desktop"|"phone"`, `SurfaceOption` = `"light"|"dark"` — `widgets/landing-builder/model/types.ts:1-4`
- `SectionBaseProps` — `types.ts:6-11`: `heading: string`, `spacing: SpacingOption`, `bg: BgOption`, `bleed: boolean`
- 11 section-specific prop types extending `SectionBaseProps` (`ServicesProps`, `TeamProps`, `GalleryProps`, `ReviewsProps`, `AboutProps`, `HoursProps`, `OffersProps`, `LoyaltyProps`, `FaqProps`, `BeforeAfterProps`, `InstagramProps`, `CustomProps`) — `types.ts:13-44`
- `BodySectionPropsMap` — `types.ts:46-59`: maps the 12 section keys to their props type (the discriminated-union key set); `BodySectionKey = keyof BodySectionPropsMap` — `types.ts:61`
- `NavProps` — `types.ts:63-69`: `sticky`, `showName`, `showLinks: boolean`, `cta: string`, `bg: "solid"|"transparent"`
- `HeroProps` — `types.ts:71-79`: `layout: "fullbleed"|"split"|"centered"`, `height: "compact"|"standard"|"tall"`, `title`, `sub`, `cta: string`, `second`, `trust: boolean`
- `FooterProps` — `types.ts:81-85`: `cols: number`, `signup`, `badge: boolean`
- `BuilderProps` — `types.ts:89-93`: `BodySectionPropsMap & { nav: NavProps; hero: HeroProps; footer: FooterProps }` — the full page-config object
- `SectionMetaEntry` — `types.ts:95-100`: `name`, `mono`, `body`, `needs` (all `string`)
- `OfferCard` — `widgets/landing-builder/model/rendered-section.ts:31-41`: `title`, `body`, `code`, `until` (+ styling)
- `LoyaltyPlan` — `rendered-section.ts:43-50`: `name`, `price`, `perks: string[]` (+ styling)
- `RenderedSection` — discriminated union on `kind`, `rendered-section.ts:52-64`
- `StructureRow` — `widgets/landing-builder/model/use-landing-builder.ts:53-66`: `key: SelectedKey`, `label`, `grip: string`, `movable`, `locked: boolean`, `meta: string`, `selected`, `on: boolean` — implies section **order** and **enabled** are independent of content props
- Page-level builder state (`use-landing-builder.ts:82-96`): `accent: string`, `surface: SurfaceOption`, `device: DeviceOption` (UI-only), `published: boolean`, `selected: SelectedKey` (UI-only), `order: BodySectionKey[]`, `enabled: Partial<Record<BodySectionKey, boolean>>`, `props: BuilderProps`

### 1.4 UI-implied fields

Grouped by domain; every claim is cited.

**Scheduling.** Appointment cards in the day-calendar columns (`widgets/day-calendar/ui/appointment-columns/anna-column.tsx:10-38` and siblings) are hand-authored JSX, not data-driven — but their content implies `Appointment` fields: `startTime`/`endTime`, `clientName`, a denormalized `serviceName + duration + price` line, an optional `status` badge (only `"Pending"` observed, `anna-column.tsx:24-26`), and staff assignment implicit in which column renders the card. Visit-status chips in the appointment panel (`widgets/appointment-panel/ui/cart-column.tsx:23-48`) confirm the exact 4-value enum with per-status dot styling (`widgets/appointment-panel/model/appointment-panel-data.ts:6-11`). Client search (`widgets/appointment-panel/ui/client-column.tsx:38`) implies phone-prefix typeahead; `client-column.tsx:57-58` ("14 visits · 96 000 ֏ lifetime") implies denormalized `visitCount`/`lifetimeSpend` on Client. `cart-column.tsx:70` ("Only services Karen can perform are shown. Prices follow the Kentron price list.") implies both a `TeamMember`↔`Service` capability join and **branch-scoped pricing**. `timing-column.tsx:69-79` implies a `source` field (only `"Walk-in"` observed) and a `room` field; `:84-89` implies freetext `comments`; `:53-58` implies a technical-break sub-block on the appointment. `panel-header.tsx:16` ("Record #10428") implies a human-facing sequential reference distinct from the PK. `appointment-panel/index.tsx:26` ("Created 02.07.2026 by Lilit · last edited 2 min ago") implies `createdAt`/`createdBy`/`updatedAt` audit fields. `step-confirmed.tsx:67-69` ("Free to cancel until 12:30 on 13 August — two hours before") implies a `cancellationWindowHours` business rule. `step-details.tsx:7-43` (4-digit OTP entry, resend cooldown, guest phone verification, "No account, no password") implies a `VerificationCode` entity and that guest bookings require no user account. `use-booking-flow.ts:56,75-78` (an "Any specialist" option above the named staff list) implies `Appointment.staffId` is nullable pre-confirmation.

**Setup wizard** (`widgets/setup-modal/ui/step-form-service.tsx:16-44`, `step-form-team.tsx:5-18`, `step-form-schedule.tsx:16-93`) is the richest form-level evidence: Service create collects `name` (required), `category` (free text), `price` (numeric AMD), `duration` (enum, narrower than elsewhere — see gaps); Team-member create collects `name`, `specialization`, and an immediate "Performs [service]" confirmation (evidencing the join table at creation time); Schedule collects a per-weekday boolean (`Record<DayKey, boolean>`) plus a **single global** `opens`/`closes` pair applied uniformly to every open day (not per-day custom hours).

**People.** `widgets/clients/ui/client-table.tsx:23` search placeholder ("Search by name, phone, email **or card number**") implies a `cardNumber` field not present in `ClientRow`, but confirmed present in `widgets/clients/ui/add-client-panel.tsx:86-89`. That same add-client form is the authoritative Client-create shape and is substantially richer than the list-row projection: name; phone (`+374` country code, required — "Phone is the only required field", `add-client-panel.tsx:123`); optional secondary phone; optional email; date of birth; gender (binary chip, Female/Male only, `:63-69`); "importance class" dropdown (default `"Regular"` — likely the real source of `ClientRow.vip`, `:72-77`); free-form category dropdown (default `"Colour clients"`, `:78-83`); card number; discount %; "Disable online booking" toggle; free-text note; `sold`/`paid` numeric inputs (implying `balance = sold - paid` is derived, `:108-120`). `widgets/clients/ui/empty-state.tsx:15,19-23` names three client-acquisition channels (staff-added, Excel import, self-added via public booking link) implying a `source`/`origin` field absent from `ClientRow`. `widgets/clients/ui/client-table.tsx:45-73` shows locked/permission-gated `Sold`/`Balance` columns (🔒 icon), offset pagination with page-size selector and total count, and bulk-select actions.

`widgets/team/ui/team-table.tsx:30-34` filter controls (Position, Employment status, Account status, Access, Included in plan) imply a richer TeamMember record than `TeamRow` exposes. Sub-tabs `Position / Specialization / System users` (`:41-43`) imply team members can be grouped by position, by a separate specialization dimension, or filtered to only those with login accounts. `team.ts:25`'s row (`position: "· Invite sent"`, `email: "invite pending"`, `schedule: "Add to schedule"`, `subscription: "Not in plan"`) conflates an **invitation-pending state** into ordinary fields — a modeling smell flagged for Phase 2. "Found: 6" (`team-table.tsx:37`) vs only 4 mock rows, and "Without position — 2 team members" (`:51-55`) vs zero rows with an empty position in the mock — both are internal count/data mismatches in the mock itself, not requirements.

Onboarding (`widgets/onboarding-flow/ui/step-*.tsx`) collects, across its 4 static screens: first/last name; location-count chip (`One`/`Multiple`/`I'm self-employed`); brand name; position (dropdown, values in `onboarding-data.ts:33-40`); business-type multi-chip (9 values, `:42-52`); a business-type-dependent industry dropdown; team-size bucket (5 values, `:54`); "do you provide services yourself" boolean; country/city; referral source (5 values, `:56-58`); and a promo code with an apply-confirmation implying a `PromoCode` entity (percent-off, duration-in-months).

**Commerce.** Products: `widgets/products/index.tsx:6-10` maps the exact 3-value status enum to colors; stock is a real `number`, price a formatted string. Services: `widgets/services/index.tsx:23-44` category filter pills over `categories`; the "staff" column is denormalized ("Karen, Davit"), implying a real many-to-many. Finance: `widgets/finance/index.tsx:24`'s composite rowKey (`date-client-amount`) confirms no id exists in the mock; the `client` field is overloaded to sometimes hold a real client name, sometimes `"Retail — walk-in"`, sometimes `"<staff name> — payout"` — a polymorphic counterparty, flagged as a gap. Billing: `widgets/billing/index.tsx:14-29` implies a `Subscription`/`Plan` entity with seat-count enforcement tied to team size; `:31-47` (masked card, brand, expiry) confirms only a processor token should ever be stored, never raw card data. Payroll: "Run payroll" (`widgets/payroll/index.tsx:17`) plus the caption "August 2026" (`:23`) imply a `PayrollRun`/period entity that individual payslip rows belong to; `total` is always arithmetically `base + commission` in the mock.

**Engagement.** Loyalty tier pill coloring (`widgets/loyalty/index.tsx:6-10`) confirms the closed 3-value tier enum. Notifications render two tables sharing one column set — the table each row lives in (client-facing vs team-facing) is an implicit `audience` dimension not present as a field on `NotificationRow`. Resources: `assignedTo` holds a *person* name for Chair/Room rows but a *room* name for Equipment rows (`widgets/resources/index.tsx:26`) — a mixed reference target, flagged as a gap. Reports render pre-formatted currency/percent strings with no date-range control — these read as **derived rollups**, not raw stored entities. Settings: `hours: string` (e.g. `"9:00 – 22:00"`) is a formatted range that should split into `openTime`/`closeTime`; `workingHours` is a fixed 7-row array keyed by weekday name, implying exactly one row per day of week.

**Marketing.** The publish checklist (`use-landing-builder.ts:504-513`) runs three checks: nav/hero/footer CTA link consistency; hours matching the "work schedule" (explicit cross-domain dependency, `:462` — "Hours are read from your work schedule — edit them there"); and a >6-enabled-sections warning or a missing-cancellation-policy warning implying a default 2-hour cancellation rule. The structure panel confirms `nav` and `footer` are fixed/non-movable/always-on while the 12 body sections are reorderable and independently toggleable. `builder-topbar.tsx:4-9,51` shows `published` drives a status label and disables the Publish button once already published. `brand-editor.tsx:35` (`readOnly` input, `zhamo.am/studio-aram`) implies a `slug` field for the public page URL. `brand-editor.tsx:16-20,19` (logo/cover upload targets, unwired) implies an `Asset` entity referenced by URL. `booking-rules-and-checks.tsx:9-19` renders booking-policy toggles (accept-online-bookings, require-SMS-confirmation, show-prices-publicly, take-deposits) that read as belonging to a business-level settings entity rather than the landing page itself.

**Corroborating evidence from non-business routes.** `app/table-demo/page.tsx` (untracked dev demo, not a real screen) independently confirms field names not otherwise seen in the "real" widgets: client `sold`/`balance`/`discount`/`firstVisit`/`lastVisit` (`clientDetailRows`, table-demo/page.tsx:152-189), team `branch` field (`teamRows`, `:191-220` — e.g. `"Downtown — Amiryan St."`), and a 12-column service-catalog row shape including `room`, `buffer`, `tax`, `stock` (`catalogRows`, `:228-285`) that's richer than `widgets/services/model/data.ts`'s `ServiceRow`. `widgets/screen-index/model/screens.ts:86-92` independently confirms landing-builder-style "draft/published" and "7-template catalogue" language for the orphaned branding-builder widget.

---

## 2. Entities & API

### 2.1 Entity catalog

Legend: **[confirmed]** appears in a declared type/interface · **[inferred]** implied by UI rendering (filters, chips, form fields) but not in any declared type · **[assumed]** not visible anywhere in the frontend, added because the model can't function without it (e.g. primary keys, tenant scoping, audit timestamps).

#### Business (tenant / workspace)

Purpose: the top-level tenant record created at the end of onboarding; singleton per business in the current UI (no multi-business switcher anywhere).

| Field | Type | Req. | Evidence |
|---|---|---|---|
| `id` | uuid | yes | **[assumed]** — PK, needed for every FK below |
| `name` | string | yes | **[confirmed]** `settings/model/data.ts:2` (`BusinessProfile.name`); also collected at onboarding as "Business name" — `features/sign-up/ui/sign-up-form.tsx:39-48` |
| `address` | string | yes | **[confirmed]** `settings/model/data.ts:3` |
| `timezone` | string | yes | **[confirmed]** `settings/model/data.ts:4` (`"Asia/Yerevan (UTC+4)"`) |
| `currency` | string | yes | **[confirmed]** `settings/model/data.ts:5` (`"AMD"` implied by `֏` symbol repo-wide) |
| `businessType` | enum (9 values) | yes | **[inferred]** `widgets/onboarding-flow/model/onboarding-data.ts:42-52` |
| `industry` | string | no | **[inferred]** dependent dropdown, `step-your-business.tsx:97-103` |
| `teamSizeBucket` | enum (5 values) | no | **[inferred]** `onboarding-data.ts:54` |
| `providesServicesSelf` | boolean | no | **[inferred]** `step-your-business.tsx:122-130` |
| `country` | string | yes | **[inferred]** `step-location.tsx:38` (default "Armenia") |
| `city` | string | yes | **[inferred]** `step-location.tsx:45` (default "Yerevan") |
| `referralSource` | enum (5 values) | no | **[inferred]** `onboarding-data.ts:56-58` |
| `cancellationWindowHours` | integer | yes | **[inferred]** `step-confirmed.tsx:67-69` ("two hours before"), default checklist assumption `use-landing-builder.ts:504-513` |
| `createdAt` | timestamp | yes | **[assumed]** |
| `updatedAt` | timestamp | yes | **[assumed]** |

**Open question (§2.3):** is there a `Branch` entity below Business (evidence: "Kentron price list", table-demo's `branch` field), or is this single-location only in the current UI? See gap.

#### Branch — **[assumed / disputed, see §2.3]**

Purpose: a physical location, if the business is multi-location. Evidence is thin and contradictory (see gaps) — included here as a candidate, not a settled entity.

| Field | Type | Req. | Evidence |
|---|---|---|---|
| `id` | uuid | yes | **[assumed]** |
| `businessId` | FK → Business | yes | **[assumed]** |
| `name` | string | yes | **[inferred]** `app/table-demo/page.tsx:196` (`"Downtown — Amiryan St."`), `widgets/appointment-panel/ui/cart-column.tsx:70` ("Kentron price list") |
| `address` | string | no | **[assumed]** |

#### User (login account)

Purpose: a person who can sign in. Distinct from `TeamMember` — team-table's "System users" sub-tab implies only some team members have a login.

| Field | Type | Req. | Evidence |
|---|---|---|---|
| `id` | uuid | yes | **[assumed]** |
| `email` | string, unique | yes | **[confirmed]** `sign-in-form.tsx:26-34`, `sign-up-form.tsx:51-60` |
| `passwordHash` | string | yes | **[inferred]** — plaintext `password` field exists in the form (`sign-up-form.tsx:63-75`, min 8 chars); real backend must hash it |
| `fullName` | string | yes | **[confirmed]** `sign-up-form.tsx:26-35` ("Your name") |
| `businessId` | FK → Business | yes | **[assumed]** — the account that completes onboarding owns the created Business |
| `teamMemberId` | FK → TeamMember, nullable | no | **[assumed]** — links a login to a staff record when applicable |
| `role` | enum (Owner/Manager/etc.) | yes | **[inferred]** `onboarding-data.ts:33-40` (Owner/Manager/Receptionist/Professional/Marketer/Accountant) — collected as "your position", ambiguous whether this is `User.role` or `TeamMember.role` |
| `createdAt` | timestamp | yes | **[assumed]** |

#### TeamMember

Purpose: staff who can be scheduled, assigned services, and paid.

| Field | Type | Req. | Evidence |
|---|---|---|---|
| `id` | uuid | yes | **[assumed]** — mocks key on `name`, never a real id (`widgets/team/ui/team-table.tsx` rowKey, `widgets/payroll/index.tsx:24`) |
| `businessId` | FK → Business | yes | **[assumed]** |
| `branchId` | FK → Branch, nullable | no | **[inferred]**, see Branch gap |
| `name` | string | yes | **[confirmed]** `team.ts:4` |
| `initials` | string | yes | **[confirmed]** `team.ts:6` — likely computed, not stored |
| `avatarColor` | string | yes | **[confirmed]** `team.ts:7` |
| `phone` | string | yes | **[confirmed]** `team.ts:8` |
| `email` | string | no | **[confirmed]** `team.ts:9` (one mock row holds `"invite pending"` here instead — see Invitation) |
| `position` | string | no | **[confirmed]** `team.ts:5`, free text (`"Barber"`, `"Colourist"`, `"Nail technician"` observed) |
| `specialization` | string | no | **[inferred]** distinct sub-tab from Position, `team-table.tsx:41-43` |
| `role` | enum | yes | **[confirmed]** `team.ts:16` (`"Professional"`, `"Manager"` observed — full member list not enumerated in UI) |
| `scheduleUntil` | date, nullable | no | **[inferred]** `team.ts:10` (`"until 06.09.2026"`) — a schedule *expiry*, not the schedule itself |
| `onlineBookingEnabled` | boolean | yes | **[inferred]** `team-table.tsx` toggle column (`toggleBg`/`knob` styling in `TeamRow`) |
| `serviceCount` | integer | no | **[confirmed]** `team.ts:15`, denormalized count — should be derived from `TeamMemberService` |
| `subscriptionSeatStatus` | enum (`Paid`/`Not in plan`) | yes | **[confirmed]** `team.ts:17` |
| `employmentStatus` | string | no | **[inferred]** filter-only, `team-table.tsx:30-34` — no values enumerated |
| `accountStatus` | string | no | **[inferred]** filter-only, ditto |
| `accessLevel` | string | no | **[inferred]** filter-only, ditto |
| `createdAt` | timestamp | yes | **[assumed]** |

#### Invitation — **[assumed]**

Purpose: pending team-member invite. Currently conflated into `TeamMember`'s `position`/`email`/`schedule`/`subscription` string fields in the mock (`team.ts:25`); split out here as its own concept.

| Field | Type | Req. | Evidence |
|---|---|---|---|
| `id` | uuid | yes | **[assumed]** |
| `teamMemberId` | FK → TeamMember | yes | **[assumed]** |
| `email` | string | yes | **[assumed]** |
| `sentAt` | timestamp | yes | **[assumed]** |
| `acceptedAt` | timestamp, nullable | no | **[assumed]** |

#### Client

Purpose: a customer who books/receives services.

| Field | Type | Req. | Evidence |
|---|---|---|---|
| `id` | uuid | yes | **[assumed]** |
| `businessId` | FK → Business | yes | **[assumed]** |
| `name` | string | yes | **[confirmed]** `clients.ts:13`, `add-client-panel.tsx:32` |
| `phone` | string | yes | **[confirmed]** `clients.ts:15`, `add-client-panel.tsx:36-42` (only required field per `:123`) |
| `secondaryPhone` | string, nullable | no | **[inferred]** `add-client-panel.tsx:44-52` |
| `email` | string, nullable | no | **[confirmed]** `clients.ts:16`, optional in form (`add-client-panel.tsx:54-57`) |
| `dateOfBirth` | date, nullable | no | **[inferred]** `add-client-panel.tsx:59-62` |
| `gender` | enum (`Female`/`Male`) | no | **[inferred]** `add-client-panel.tsx:63-69` — only 2 values shown, may be incomplete |
| `importanceClass` | enum, default `"Regular"` | yes | **[inferred]** `add-client-panel.tsx:72-77` — likely the real source of `vip`, member list beyond "Regular" unknown |
| `vip` | boolean | yes | **[confirmed]** `clients.ts:29` — **may be redundant with `importanceClass`**, see gaps |
| `categoryId` | FK → ClientCategory, nullable | no | **[inferred]** `add-client-panel.tsx:78-83` (default "Colour clients") |
| `cardNumber` | string, nullable | no | **[inferred]** `add-client-panel.tsx:86-89`, `client-table.tsx:23` |
| `discountPercent` | integer, default 0 | yes | **[confirmed]** `clients.ts:22` (`"10%"`/`"—"`), form default `"0"` (`add-client-panel.tsx:90-93`) |
| `onlineBookingDisabled` | boolean, default false | yes | **[inferred]** `add-client-panel.tsx:95-103` |
| `note` | text, nullable | no | **[inferred]** `add-client-panel.tsx:104-107` |
| `sold` (lifetime billed, minor units) | integer | yes | **[inferred]** `add-client-panel.tsx:108-114`, displayed as `clients.ts:19` |
| `paid` (lifetime paid, minor units) | integer | yes | **[inferred]** `add-client-panel.tsx:115-120` |
| `balance` (computed: `sold - paid`) | integer, derived | yes | **[confirmed]** `clients.ts:20` — should NOT be stored, derive at read time |
| `visitCount` | integer, derived | yes | **[confirmed]** `clients.ts:21` (string in mock, real type int), also `client-column.tsx:57-58` |
| `firstVisitAt` | date, nullable | no | **[confirmed]** `clients.ts:26` |
| `lastVisitAt` | date, nullable | no | **[confirmed]** `clients.ts:25` |
| `source` | enum (staff-added / import / self-booked) | no | **[inferred]** `empty-state.tsx:15,19-23` — not in any type |
| `createdAt` | timestamp | yes | **[assumed]** |

#### ClientCategory — **[assumed, split out from Client]**

| Field | Type | Req. | Evidence |
|---|---|---|---|
| `id` | uuid | yes | **[assumed]** |
| `businessId` | FK → Business | yes | **[assumed]** |
| `name` | string | yes | **[inferred]** `add-client-panel.tsx:78-83` (tenant-defined, e.g. "Colour clients") |

#### PromoCode — **[assumed]**

| Field | Type | Req. | Evidence |
|---|---|---|---|
| `code` | string, PK | yes | **[inferred]** `step-location.tsx:69-78` |
| `discountPercent` | integer | yes | **[inferred]** "25% off" |
| `durationMonths` | integer | yes | **[inferred]** "first three months" |

#### Service

Purpose: a bookable offering.

| Field | Type | Req. | Evidence |
|---|---|---|---|
| `id` | string (slug) | yes | **[confirmed]** `appointment-panel/model/types.ts:5` (`PanelService.id`) — **but `booking-widget` keys services by `name` instead**, see gaps |
| `businessId` | FK → Business | yes | **[assumed]** |
| `branchId` | FK → Branch, nullable | no | **[inferred]** "Kentron price list" implies branch-scoped pricing |
| `name` | string | yes | **[confirmed]** `services/model/data.ts:2` |
| `category` | string | yes | **[confirmed]** `services/model/data.ts:3` |
| `durationMinutes` | integer | yes | **[confirmed]** stored as formatted string in mocks (`"30 min"`, `"2 h 30 min"`); setup wizard uses a **narrower 3-value enum** (`"30 m"|"1 h"|"1 h 30 m"`, `setup-modal/model/types.ts:7`) — inconsistent granularity, see gaps |
| `priceMinor` | integer (AMD) | yes | **[confirmed]** formatted string in mocks, raw integer in setup form (`step-form-service.tsx`) |
| `onlineBookable` | boolean | yes | **[confirmed]** `services/model/data.ts:7` |
| `createdAt` | timestamp | yes | **[assumed]** |
| `updatedAt` | timestamp | yes | **[assumed]** |

#### TeamMemberService (join) — **[assumed]**

Purpose: which staff can perform which service, evidenced by denormalized `Service.staff` string and by `cart-column.tsx:70` ("Only services Karen can perform are shown") and the setup wizard's immediate "Performs [service]" confirmation on team-member creation.

| Field | Type | Req. |
|---|---|---|
| `teamMemberId` | FK → TeamMember | yes |
| `serviceId` | FK → Service | yes |

#### Resource

Purpose: a bookable physical asset.

| Field | Type | Req. | Evidence |
|---|---|---|---|
| `id` | uuid | yes | **[assumed]** |
| `businessId` | FK → Business | yes | **[assumed]** |
| `name` | string | yes | **[confirmed]** `resources/model/data.ts:2` |
| `type` | enum (`Chair`/`Room`/`Equipment`) | yes | **[confirmed]** `resources/model/data.ts:3` |
| `assignedTo` | string (mixed target — see gaps) | no | **[confirmed]** `resources/model/data.ts:4` — holds a person name for Chair/Room, a room name for Equipment |
| `status` | enum (`Available`/`In use`/`Maintenance`) | yes | **[confirmed]** `resources/model/data.ts:5` |

#### Appointment

Purpose: a booked time slot.

| Field | Type | Req. | Evidence |
|---|---|---|---|
| `id` | uuid | yes | **[assumed]** — `panel-header.tsx:16` shows a separate human-facing "Record #10428" reference |
| `businessId` | FK → Business | yes | **[assumed]** |
| `branchId` | FK → Branch, nullable | no | **[inferred]** |
| `clientId` | FK → Client, nullable (guest bookings) | no | **[inferred]** — guest OTP flow implies bookings can exist before a full Client record is created |
| `teamMemberId` | FK → TeamMember, nullable | no | **[inferred]** `use-booking-flow.ts:56,75-78` ("Any specialist" — nullable pre-confirmation) |
| `resourceId` | FK → Resource, nullable | no | **[inferred]** `timing-column.tsx:69-79` ("Chair 2") |
| `startAt` | timestamp | yes | **[confirmed]** displayed as `"09:00 – 10:00"` |
| `endAt` | timestamp | yes | **[confirmed]** ditto |
| `status` | enum (`Pending`/`Arrived`/`No-show`/`Confirmed`) | yes | **[confirmed]** `appointment-panel/model/types.ts:3` |
| `source` | enum, only `"Walk-in"` observed | no | **[inferred]** `timing-column.tsx:69-79` — full member list unknown |
| `comments` | text, nullable | no | **[inferred]** `timing-column.tsx:84-89` |
| `recordNumber` | integer, sequential, unique per business | yes | **[inferred]** `panel-header.tsx:16` |
| `bookerIsVisitor` | boolean, default true | yes | **[inferred]** `client-column.tsx:29` ("Client is booking for another visitor") |
| `createdAt` | timestamp | yes | **[confirmed]** `appointment-panel/index.tsx:26` |
| `createdBy` | FK → User/TeamMember | yes | **[confirmed]** ditto |
| `updatedAt` | timestamp | yes | **[inferred]** ditto ("last edited 2 min ago") |

#### AppointmentService (line item / cart) — **[assumed, split from Appointment]**

Purpose: one or more services attached to an appointment with a price/discount snapshot, evidenced by `PanelService.detail` (`{ price, discountPercent, duration, masterShare }`, `appointment-panel/model/types.ts:9-16`) and the cart UI in `cart-column.tsx`.

| Field | Type | Req. | Evidence |
|---|---|---|---|
| `id` | uuid | yes | **[assumed]** |
| `appointmentId` | FK → Appointment | yes | **[assumed]** |
| `serviceId` | FK → Service | yes | **[assumed]** |
| `teamMemberId` | FK → TeamMember | yes | **[inferred]** — the performer may differ per line item |
| `priceMinor` | integer, snapshot | yes | **[confirmed]** `types.ts:10` |
| `discountPercent` | integer, snapshot | no | **[confirmed]** `types.ts:11` |
| `durationMinutes` | integer, snapshot | yes | **[confirmed]** `types.ts:12` |
| `staffSharePercent` | integer | no | **[confirmed]** `types.ts:13` (`masterShare`) — commission split, feeds Payslip |

#### Break — **[assumed]**

Purpose: a blocked/technical-break time range, evidenced by `timing-column.tsx:53-58` ("15:15 – 15:30", "clean-up").

| Field | Type | Req. |
|---|---|---|
| `id` | uuid | yes |
| `appointmentId` | FK → Appointment, nullable | no |
| `teamMemberId` | FK → TeamMember, nullable | no |
| `startAt` | timestamp | yes |
| `endAt` | timestamp | yes |
| `label` | string | no |

#### BusinessHours

Purpose: per-weekday open/close, one row per day of week.

| Field | Type | Req. | Evidence |
|---|---|---|---|
| `businessId` | FK → Business | yes | **[assumed]** |
| `weekday` | enum (Mon–Sun) | yes | **[confirmed]** `settings/model/data.ts:16` (`HoursRow.day`); also `setup-modal/model/types.ts:3` (`DayKey`) |
| `isOpen` | boolean | yes | **[confirmed]** `settings/model/data.ts:17` |
| `openTime` | time, nullable | no | **[inferred]** currently a formatted range string (`settings/model/data.ts:18`) |
| `closeTime` | time, nullable | no | **[inferred]** ditto — setup wizard confirms **one shared open/close pair for all open days**, not per-day (`step-form-schedule.tsx:16-93`) |

#### VerificationCode (OTP) — **[assumed]**

Purpose: guest phone verification during customer-facing booking. Evidence: `widgets/booking-widget/ui/mobile-widget/step-details.tsx:7-43` (4-digit code, resend cooldown).

| Field | Type | Req. |
|---|---|---|
| `id` | uuid | yes |
| `phone` | string | yes |
| `code` | string (hashed) | yes |
| `expiresAt` | timestamp | yes |
| `consumedAt` | timestamp, nullable | no |

#### BookingPreference

Purpose: per-tenant boolean feature flags for the booking flow.

| Field | Type | Req. | Evidence |
|---|---|---|---|
| `businessId` | FK → Business | yes | **[assumed]** |
| `label` | string | yes | **[confirmed]** `settings/model/data.ts:32` |
| `description` | string | yes | **[confirmed]** `settings/model/data.ts:33` |
| `enabled` | boolean | yes | **[confirmed]** `settings/model/data.ts:34` |

*(Note: `widgets/branding-builder`'s `bookingRules` — accept-online-bookings, require-SMS-confirmation, show-prices-publicly, take-deposits — reads as the same concept modeled a second time; likely the same table, see gaps.)*

#### Product

| Field | Type | Req. | Evidence |
|---|---|---|---|
| `id` | uuid | yes | **[assumed]** — mock keys on `sku` |
| `businessId` | FK → Business | yes | **[assumed]** |
| `name` | string | yes | **[confirmed]** `products/model/data.ts:11` |
| `sku` | string, unique | yes | **[confirmed]** `products/model/data.ts:12` |
| `category` | string | yes | **[confirmed]** `products/model/data.ts:13` |
| `stock` | integer | yes | **[confirmed]** `products/model/data.ts:14` |
| `priceMinor` | integer (AMD) | yes | **[confirmed]** formatted string in mock |
| `status` | enum (`In stock`/`Low stock`/`Out of stock`) | yes | **[confirmed]** `products/model/data.ts:15-17` — roughly tracks `stock` thresholds but stored independently in the mock; ambiguous whether it should be computed, see gaps |

#### Transaction / LedgerEntry

Purpose: a financial movement.

| Field | Type | Req. | Evidence |
|---|---|---|---|
| `id` | uuid | yes | **[assumed]** — mock rowKey is composite `date-client-amount` |
| `businessId` | FK → Business | yes | **[assumed]** |
| `occurredAt` | date | yes | **[confirmed]** `finance/model/data.ts:11` |
| `type` | enum (`Appointment`/`Product sale`/`Refund`/`Payout`) | yes | **[confirmed]** `finance/model/data.ts:13` |
| `counterparty` | polymorphic — see gaps | yes | **[confirmed]** `finance/model/data.ts:12` — overloaded string (Client name / "Retail — walk-in" / "`<staff>` — payout") |
| `amountMinor` | integer (AMD) | yes | **[confirmed]** formatted string in mock |
| `status` | enum (`Paid`/`Pending`/`Refunded`) | yes | **[confirmed]** `finance/model/data.ts:15` — distinct enum from `InvoiceRow.status` |

#### Subscription / Plan (platform SaaS billing, NOT client invoicing)

| Field | Type | Req. | Evidence |
|---|---|---|---|
| `businessId` | FK → Business | yes | **[assumed]** |
| `planName` | string | yes | **[confirmed]** `billing/model/data.ts:2` |
| `priceMinor` | integer | yes | **[confirmed]** `billing/model/data.ts:3` |
| `renewsOn` | date | yes | **[confirmed]** `billing/model/data.ts:4` |
| `seatLimit` | integer | yes | **[inferred]** parsed from `"4 of 5 team members"` |
| `seatsUsed` | integer, derived | yes | **[inferred]** should derive from `count(TeamMember)`, not store |

#### PaymentMethod (tokenized)

| Field | Type | Req. | Evidence |
|---|---|---|---|
| `businessId` | FK → Business | yes | **[assumed]** |
| `processorToken` | string | yes | **[assumed]** — never store raw PAN |
| `brand` | string | yes | **[confirmed]** `billing/model/data.ts:9` |
| `last4` | string(4) | yes | **[confirmed]** `billing/model/data.ts:10` |
| `expiresMonthYear` | string (`MM/YY`) | yes | **[confirmed]** `billing/model/data.ts:11` |

#### Invoice (platform subscription invoice — see gap re: client invoicing)

| Field | Type | Req. | Evidence |
|---|---|---|---|
| `id` | uuid | yes | **[assumed]** |
| `businessId` | FK → Business | yes | **[assumed]** |
| `invoiceNo` | string, human-readable (e.g. `INV-2026-08`) | yes | **[confirmed]** `billing/model/data.ts:14` |
| `issuedAt` | date | yes | **[confirmed]** ditto |
| `amountMinor` | integer | yes | **[confirmed]** ditto |
| `status` | enum (`Paid`/`Due`) | yes | **[confirmed]** ditto |

#### PayrollRun — **[assumed, split from Payslip]**

Purpose: a pay period/batch, evidenced by the "Run payroll" action and the "August 2026" table caption.

| Field | Type | Req. | Evidence |
|---|---|---|---|
| `id` | uuid | yes | **[assumed]** |
| `businessId` | FK → Business | yes | **[assumed]** |
| `period` | string/date-range (e.g. "August 2026") | yes | **[inferred]** `payroll/index.tsx:23` |
| `runAt` | timestamp, nullable | no | **[assumed]** |

#### Payslip

| Field | Type | Req. | Evidence |
|---|---|---|---|
| `id` | uuid | yes | **[assumed]** — mock keys on `name` |
| `payrollRunId` | FK → PayrollRun | yes | **[assumed]** |
| `teamMemberId` | FK → TeamMember | yes | **[confirmed]** `payroll/model/data.ts:11` |
| `role` | string, snapshot | no | **[confirmed]** `payroll/model/data.ts:12` |
| `baseMinor` | integer | yes | **[confirmed]** `payroll/model/data.ts:13` |
| `commissionMinor` | integer | yes | **[confirmed]** `payroll/model/data.ts:14` |
| `totalMinor`, derived (`base + commission`) | integer, derived | yes | **[confirmed]** `payroll/model/data.ts:15` — should NOT be stored |
| `status` | enum (`Paid`/`Scheduled`) | yes | **[confirmed]** `payroll/model/data.ts:16` |

#### LoyaltyTier

| Field | Type | Req. | Evidence |
|---|---|---|---|
| `businessId` | FK → Business | yes | **[assumed]** |
| `name` | enum (`Bronze`/`Silver`/`Gold`) | yes | **[confirmed]** `loyalty/model/data.ts:19` |
| `threshold` | string (visit count or spend) | yes | **[confirmed]** `loyalty/model/data.ts:10` |
| `perk` | string | yes | **[confirmed]** ditto |

#### LoyaltyMember — **[assumed as a projection, not necessarily its own table]**

| Field | Type | Req. | Evidence |
|---|---|---|---|
| `clientId` | FK → Client | yes | **[inferred]** — `MemberRow.name` should be a Client reference, not free text |
| `tier` | FK → LoyaltyTier | yes | **[confirmed]** `loyalty/model/data.ts:19` |
| `points` | integer | yes | **[confirmed]** ditto |
| `lastVisitAt` | date | yes | **[confirmed]** ditto |

#### NotificationRule

| Field | Type | Req. | Evidence |
|---|---|---|---|
| `businessId` | FK → Business | yes | **[assumed]** |
| `audience` | enum (`client`/`team`) | yes | **[inferred]** — implicit in which of the two mock tables the row lives in, `notifications/model/data.ts:9,16` |
| `label` | string | yes | **[confirmed]** `notifications/model/data.ts:2` |
| `description` | string | yes | **[confirmed]** ditto |
| `smsEnabled` | boolean | yes | **[confirmed]** ditto |
| `emailEnabled` | boolean | yes | **[confirmed]** ditto |
| `pushEnabled` | boolean | yes | **[confirmed]** ditto |

#### LandingPage

| Field | Type | Req. | Evidence |
|---|---|---|---|
| `id` | uuid | yes | **[assumed]** |
| `businessId` | FK → Business | yes | **[assumed]** |
| `slug` | string, unique | yes | **[inferred]** `brand-editor.tsx:35` (`zhamo.am/studio-aram`) — evidenced on the branding-builder side; see gap on whether these are the same page |
| `accent` | string (color, one of 5 presets) | yes | **[confirmed]** `use-landing-builder.ts:84`, presets in `data.ts:105-111` |
| `surface` | enum (`light`/`dark`) | yes | **[confirmed]** `use-landing-builder.ts:85` |
| `published` | boolean | yes | **[confirmed]** `use-landing-builder.ts:87` |
| `order` | array of section keys | yes | **[confirmed]** `use-landing-builder.ts:90` |
| `enabled` | map of section key → boolean | yes | **[confirmed]** `use-landing-builder.ts:91` |
| `sectionProps` | JSON (`BuilderProps`-shaped) | yes | **[confirmed]** `use-landing-builder.ts:94` |
| `updatedAt` | timestamp | yes | **[assumed]** |

#### BrandTemplate — **[assumed, seed/static data]**

Purpose: the 7 fixed template presets consumed by branding-builder; likely not tenant-owned.

| Field | Type | Req. |
|---|---|---|
| `id` | string (e.g. `minimal`, `editorial`, `dark`, `grid`, `clinic`, `storefront`, `timetable`) | yes |
| `name` | string | yes |

#### Asset — **[assumed, implied but never typed anywhere]**

| Field | Type | Req. |
|---|---|---|
| `id` | uuid | yes |
| `businessId` | FK → Business | yes |
| `url` | string | yes |
| `kind` | enum (logo/cover/gallery) | no |

### 2.2 API contract (by route)

Grouped so each screen's needs are visible together. All endpoints are `[proposed]` — none exist today.

**`/booking` (day-calendar / staff scheduling dashboard)**
- `GET /calendar/day?date=&branchId=` → `{ teamMembers: TeamMember[], appointments: Appointment[] }` grouped per staff column
- `GET /calendar/month?month=&branchId=` → per-day occupancy for the mini-calendar (`MonthDay.load`)
- Pagination: none (single-day view); Errors: none handled in UI today

**`/appointment-panel`**
- `GET /appointments/:id` → Appointment + AppointmentService[] + Client + audit fields
- `GET /clients/search?phone=` → typeahead matches (`PanelMatch[]`)
- `GET /services?teamMemberId=&branchId=` → services that staff member can perform, branch-priced
- `POST /appointments` / `PATCH /appointments/:id` → body: client (existing id or inline new-client fields), teamMemberId, resourceId, startAt/endAt, services[], comments, source; **on conflict returns `409` + `alternatives: TimeSlot[]`**
- `DELETE /appointments/:id`

**`/customer` (booking-widget)**
- `GET /public/:businessSlug/services`, `GET /public/:businessSlug/specialists`, `GET /public/:businessSlug/availability?date=&serviceId=&specialistId=`
- `POST /public/:businessSlug/verify-phone` → sends OTP; `POST /public/:businessSlug/verify-phone/confirm` → body `{ phone, code }`
- `POST /public/:businessSlug/appointments` (guest) → same conflict/alternatives contract as staff-side
- **Gap:** this screen has no route linking to it from the rest of the app (see §2.3)

**`/clients`**
- `GET /clients?segment=&search=&page=&pageSize=` → paginated, offset-based (page-size selector + numbered pages observed)
- `POST /clients` → full add-client-panel field set
- `POST /clients/import` → bulk Excel import (async job, status not modeled in UI)
- Bulk action: `PATCH /clients/bulk` with `{ ids[], action }` (exact actions not enumerated in UI)

**`/team`**
- `GET /team-members?position=&employmentStatus=&accountStatus=&access=&plan=`
- `POST /team-members` (shape unobserved — no form in UI, inferred from `TeamMember` fields)
- `POST /team-members/:id/invite` → creates Invitation
- `PATCH /team-members/:id` (e.g. online-booking toggle)

**`/onboarding` + `/setup`**
- `POST /workspaces` (bundles Business + owner User fields, promo code)
- `POST /services`, `POST /team-members`, `PUT /schedule` (from setup wizard steps)

**`/services`**
- `GET /services?category=`
- `POST /services`

**`/products`**
- `GET /products`
- `POST /products`

**`/finance`**
- `GET /finance/stats` → `Stat[]`
- `GET /finance/transactions?limit=` → recent/bounded feed

**`/billing`**
- `GET /billing/subscription`, `GET /billing/plans`, `PATCH /billing/subscription`
- `GET /billing/payment-method`, `POST /billing/payment-method/setup-intent`
- `GET /billing/invoices`

**`/payroll`**
- `GET /payroll/runs/:period` → `Payslip[]` for the period
- `POST /payroll/runs` → batch-create payslips for current period

**`/loyalty`**
- `GET /loyalty/tiers`
- `GET /loyalty/members?sort=points`

**`/notifications`**
- `GET /notification-rules?audience=`
- `PATCH /notification-rules/:id`

**`/resources`**
- `GET /resources`
- `POST /resources`

**`/reports`**
- `GET /reports/stats`, `GET /reports/revenue-by-week`, `GET /reports/top-services` — no date-range control in UI, implicit default period (gap)

**`/settings`**
- `GET /settings` → Business + BusinessHours[] + BookingPreference[]
- `PATCH /settings` → bundled update

**`/landing-builder`**
- `GET /pages/:id`
- `PATCH /pages/:id` (autosave-on-edit — implied by `markDirty()`, never actually called in the mock)
- `POST /pages/:id/publish`
- `POST /assets` (logo/cover/gallery uploads)

### 2.3 Gaps

Ordered roughly by how much they'd change the schema if answered differently.

1. **Multi-branch vs single-location.** `cart-column.tsx:70` ("Kentron price list") and table-demo's `branch` field imply multiple physical locations with branch-scoped pricing, but every other widget (Settings' singleton `BusinessProfile`, onboarding's single address/city) models exactly one location. **This changes whether `Branch` exists at all**, and whether `Service.price`, `TeamMember`, `Resource`, and `Appointment` need a `branchId`.
2. **Transaction counterparty is polymorphic.** `finance/model/data.ts` overloads one `client: string` field to mean a real Client, an anonymous walk-in, or a staff payout target. A real schema needs either three nullable FKs (`clientId`/`teamMemberId`/an `isWalkIn` flag) or a polymorphic `counterpartyType`/`counterpartyId` pair — **this is a real design decision, not just a naming choice**.
3. **"Invoicing" feature is unimplemented.** The marketing homepage (`app/page.tsx:40-43`) promises "Turn appointments into invoices... track what's paid, pending, or overdue" as a core feature, but the only `Invoice` type found anywhere (`widgets/billing/model/data.ts`) is the **platform's own SaaS subscription invoice**, not a client-facing invoice tied to appointments. There is no client-invoice UI anywhere in the app. Do you want a `ClientInvoice` entity designed from the marketing promise alone (almost entirely `[assumed]`), or should it be left out of Phase 3 as out-of-scope?
4. **Two incompatible Service identity schemes.** `appointment-panel`/day-calendar model services with a stable `id: string` slug; `booking-widget` keys everything (`servicePrices`, `serviceDurations`, `defaultCart`) by service **name**. If both surfaces read the same `Service` table, one of them is wrong/stale relative to a real id-keyed schema — worth confirming before finalizing `Service.id`.
5. **`Resource.assignedTo` mixes two different reference targets** — a person for Chair/Room, a room name for Equipment. A real FK can't point at two different tables without either a polymorphic reference or splitting `Resource` by type.
6. **LandingPage vs BrandingProfile overlap.** `widgets/landing-builder` and `widgets/branding-builder` both look like "build the public-facing page" tools — branding-builder has its own 7-template catalogue, its own `slug` field (`zhamo.am/studio-aram`), its own booking-policy toggles, and a *different* draft-state model (a change counter vs landing-builder's plain boolean). Are these two genuinely separate products (e.g. one is the public marketing site, the other configures the booking-widget's branding), or is one superseding the other in an in-progress migration? This determines whether Phase 3 gets one entity or two.
7. **`Client.vip` boolean vs `importanceClass` enum** (`add-client-panel.tsx:72-77`, default "Regular") look like the same concept modeled twice at different fidelity. Collapse to one field, or are they independent (e.g. vip = manually flagged, importanceClass = a broader tiering)?
8. **Duration/time granularity is inconsistent across three places**: day-calendar/services use free-text minutes (`"45 min"`, `"2 h 30 min"`), the setup wizard uses a closed 3-value enum (`"30 m"|"1 h"|"1 h 30 m"`), and reports/billing use formatted date-only strings with no time-of-day. Real `durationMinutes`/`startAt`/`endAt` should reconcile these, but the enum vs free-text mismatch needs a decision (does the UI mock's narrow enum reflect a real product constraint, or is it just wizard-step laziness?).
9. **`BookingPreference` (settings) vs branding-builder's `bookingRules`** look like the same toggle set (online booking, SMS confirmation, price visibility, deposits) defined in two widgets. Confirm they're the same table before Phase 3.
10. **`booking-widget` has no route.** It's fully built (5-step flow, OTP, conflict handling) but nothing in the app links to `/customer`. Is this a soft-launched/hidden feature that should still be schema'd in full, or genuinely out of scope for this pass?
11. **Product `status` enum vs computed from `stock`.** The mock's status roughly tracks stock thresholds (0→Out of stock, low→Low stock) but stores them independently, and `productStats`'s "Low stock: 4" count doesn't match the 2 actual low-stock rows in the mock — is `status` a stored, staff-editable override (e.g. for manual "discontinued" states) or purely computed from `stock`?
12. **Cardinality of `Appointment.teamMemberId`**: nullable "any specialist" pre-confirmation is clear, but does a *confirmed* appointment support multiple staff (e.g. a colour + cut done by two people in one visit), or exactly one? `AppointmentService.teamMemberId` (per line item) suggests multiple staff per appointment is already the right shape — confirming this before Phase 3 avoids a rework.

---

## 3. Database schema

*(Pending — see chat for the gaps above before this section is written.)*
