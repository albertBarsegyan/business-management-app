# `shared/ui/table.tsx` — mobile/tablet rework

Backward compatible: every existing `<Table>`/`<TableHead>`/`<TableCell>` call
renders identically at desktop widths with zero prop changes. The one
behavior change even with no new props: cells no longer force
`whitespace-nowrap` — they wrap by default now (see `truncate` below).

Demo: `/table-demo` — a `priority`-variant client list, a grouped `stack`-
variant client list (checkbox + identity + contact + a 6-field metrics grid
+ actions), a `stack`-variant team list, a 12-column `scroll` table, and a
2-column `stack` table. Hook: `shared/ui/use-table-overflow.ts`.

## New props

### `<Table>`

| Prop | Type | Default | Effect |
|---|---|---|---|
| `variant` | `"scroll" \| "stack" \| "priority"` | `"scroll"` | `scroll`: horizontal-scroll table with edge fades. `stack`: rows become cards below the container's `md` breakpoint. `priority`: columns drop by `priority` as the container narrows, reachable via a chevron-expandable detail row. |
| `density` | `"comfortable" \| "compact"` | `"comfortable"` | `compact` drops row height to 36px above `md` (padding only; the 44px mobile row height is unaffected). |
| `stickyHeader` | `boolean` | `false` | `scroll` variant only. Pins the header row; gets a hairline once scrolled. |
| `stickyColumn` | `boolean` | `false` | `scroll` variant only. Pins the first column; gets a hairline + shadow once scrolled past the start. |

### `<TableHead>`

| Prop | Type | Default | Effect |
|---|---|---|---|
| `align` | `"start" \| "end" \| "center"` | `"start"` | Column alignment. Also read by `TableCell` as a fallback. |
| `priority` | `"primary" \| "secondary" \| "tertiary"` | `"secondary"` | Drives `priority`'s hide order (`tertiary` hides first, `primary` never hides). Not used by `stack` — see `group` below. |
| `group` | `"identity" \| "contact" \| "metric" \| "meta" \| "actions"` | `"metric"` | `stack` variant only. Composes the card from bands instead of source order: `identity` (checkbox/avatar/name/badge, one line), `contact` (tel:/mailto: auto-linked, joined with a middot), `metric`/`meta` (label-above-value stat in a responsive 3→2 column grid), `actions` (footer, end-aligned, hairline above). Table and `priority` modes ignore this entirely. |

### `<TableCell>`

| Prop | Type | Default | Effect |
|---|---|---|---|
| `align` | `"start" \| "end" \| "center"` | inherited from the column | Overrides the column's alignment for this cell. |
| `priority` | `"primary" \| "secondary" \| "tertiary"` | inherited from the column | Overrides the column's priority for this cell. |
| `label` | `string` | derived from the column header's text | Used as the label in `stack` cards and the `priority` detail `<dl>`. |
| `truncate` | `boolean` | `false` | Opt-in single-line clamp (`max-w-[28ch] truncate` + `title`). Cells wrap by default now — this used to be the only behavior (`whitespace-nowrap` on every cell). |

Column metadata (label/align/priority/group) is read straight from the
header row's `<TableHead>` elements — no `data-label` or index prop needed
on `TableCell`; just render cells in the same order as the headers.

### `stack` band composition, concretely

Grouping is per-column (`TableHead group=`), not per-cell — a whole column's
cells move together. At most two `identity` columns are meaningful (a narrow
checkbox slot + the name slot); extras beyond that overlap. `contact`
columns split the row evenly and get a `·` between them; a cell's own string
content is auto-linked as `tel:`/`mailto:` when it looks like one (`typeof
children === "string"` only — rich content is left alone). Reordering is
done with CSS `order` + explicit `grid-column`, not by moving cells in the
DOM, so a `stack`-variant table still renders as a plain table with columns
in source order at `@md/table` and up.

## No `app/globals.css` changes

Everything is Tailwind v4 utilities (`@container/table`, `@md/table:`,
`@max-md/table:`, logical properties, `motion-reduce:`) — all built in,
nothing added to the design-system CSS.
