"use client";

import * as React from "react";
import { ChevronDown } from "lucide-react";

import { cn } from "@/shared/lib/utils";
import { useTableOverflow } from "@/shared/ui/use-table-overflow";

export type TableVariant = "scroll" | "stack" | "priority";
export type TableDensity = "comfortable" | "compact";
export type TableAlign = "start" | "end" | "center";
export type TableColumnPriority = "primary" | "secondary" | "tertiary";
/** Stack variant only: which band of the card a column's cells belong to. */
export type TableGroup = "identity" | "contact" | "metric" | "meta" | "actions";

export interface TableProps extends React.ComponentProps<"table"> {
  variant?: TableVariant;
  density?: TableDensity;
  /** Scroll variant only: pins the header row while the body scrolls vertically. */
  stickyHeader?: boolean;
  /** Scroll variant only: pins the first column while the row scrolls horizontally. */
  stickyColumn?: boolean;
}

export interface TableHeadProps extends Omit<
  React.ComponentProps<"th">,
  "align"
> {
  align?: TableAlign;
  priority?: TableColumnPriority;
  /** Stack variant only. Defaults to "metric". Table/priority modes ignore this. */
  group?: TableGroup;
}

export interface TableCellProps extends Omit<
  React.ComponentProps<"td">,
  "align"
> {
  align?: TableAlign;
  priority?: TableColumnPriority;
  /** Overrides the column label this cell reports (stack layout, priority detail row). */
  label?: string;
  /** Opt-in single-line truncation (max-w-[28ch] + title attribute). Cells wrap by default. */
  truncate?: boolean;
}

/** Injected by TableRow so a cell can find its own column without prop drilling from callers. */
interface ColumnIndexProp {
  columnIndex?: number;
  /** Stack variant, body rows only: computed grid placement for band composition. */
  stackPlacement?: StackPlacement;
}

interface StackPlacement {
  band: TableGroup;
  /** CSS grid-column value; omitted for metric/meta cells (sized by Tailwind col-span classes). */
  gridColumn?: string;
  order: number;
}

interface ColumnMeta {
  label: string;
  align: TableAlign;
  priority: TableColumnPriority;
  group: TableGroup;
}

interface TableContextValue {
  variant: TableVariant;
  density: TableDensity;
  stickyHeader: boolean;
  stickyColumn: boolean;
  columns: ColumnMeta[];
  canScrollStart: boolean;
  canScrollEnd: boolean;
  scrolled: boolean;
}

const TableContext = React.createContext<TableContextValue>({
  variant: "scroll",
  density: "comfortable",
  stickyHeader: false,
  stickyColumn: false,
  columns: [],
  canScrollStart: false,
  canScrollEnd: false,
  scrolled: false,
});

function useTableContext() {
  return React.useContext(TableContext);
}

type RowGroup = "header" | "body" | "footer";

const RowGroupContext = React.createContext<RowGroup>("body");

function useRowGroup() {
  return React.useContext(RowGroupContext);
}

function getTextContent(node: React.ReactNode): string {
  if (node === null || node === undefined || typeof node === "boolean")
    return "";
  if (typeof node === "string" || typeof node === "number") return String(node);
  if (Array.isArray(node)) return node.map(getTextContent).join(" ").trim();
  if (React.isValidElement(node)) {
    const props = node.props as { children?: React.ReactNode };
    return getTextContent(props.children);
  }
  return "";
}

function isEmptyValue(node: React.ReactNode): boolean {
  if (node === null || node === undefined || node === false) return true;
  if (typeof node === "string") return node.trim() === "";
  if (Array.isArray(node)) return node.length === 0 || node.every(isEmptyValue);
  return false;
}

function alignToClass(align: TableAlign) {
  return align === "end"
    ? "text-end"
    : align === "center"
      ? "text-center"
      : "text-start";
}

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const PHONE_PATTERN = /^\+?[\d\s().-]{6,}$/;

/** Splits a 12-track grid evenly across `count` items (1-indexed grid lines). */
function splitTracks(index: number, count: number): string {
  if (count <= 1) return "1 / 13";
  const start = 1 + Math.round((index * 12) / count);
  const end = 1 + Math.round(((index + 1) * 12) / count);
  return `${start} / ${end}`;
}

/**
 * Reads the header row's TableHead children straight from the `children` tree
 * (pure data — no refs) so TableCell can look up its column's label/align/
 * priority by position without every call site hand-writing data-label.
 */
function extractColumns(children: React.ReactNode): ColumnMeta[] {
  for (const child of React.Children.toArray(children)) {
    if (!React.isValidElement(child) || child.type !== TableHeader) continue;

    const headerChildren = (child.props as React.ComponentProps<"thead">)
      .children;
    const headerRow = React.Children.toArray(headerChildren).find(
      (row) => React.isValidElement(row) && row.type === TableRow,
    );
    if (!headerRow || !React.isValidElement(headerRow)) continue;

    const rowChildren = (headerRow.props as React.ComponentProps<"tr">)
      .children;
    const columns: ColumnMeta[] = [];
    for (const cell of React.Children.toArray(rowChildren)) {
      if (React.isValidElement(cell) && cell.type === TableHead) {
        const cellProps = cell.props as TableHeadProps;
        columns.push({
          label: getTextContent(cellProps.children),
          align: cellProps.align ?? "start",
          priority: cellProps.priority ?? "secondary",
          group: cellProps.group ?? "metric",
        });
      }
    }
    return columns;
  }
  return [];
}

function Table({
  className,
  variant = "scroll",
  density = "comfortable",
  stickyHeader = false,
  stickyColumn = false,
  children,
  ...props
}: TableProps) {
  const {
    ref: overflowRef,
    canScrollStart,
    canScrollEnd,
    scrolled,
  } = useTableOverflow();

  const isScroll = variant === "scroll";
  const columns = extractColumns(children);

  const contextValue = React.useMemo<TableContextValue>(
    () => ({
      variant,
      density,
      stickyHeader,
      stickyColumn,
      columns,
      canScrollStart: isScroll && canScrollStart,
      canScrollEnd: isScroll && canScrollEnd,
      scrolled: isScroll && scrolled,
    }),
    [
      variant,
      density,
      stickyHeader,
      stickyColumn,
      columns,
      isScroll,
      canScrollStart,
      canScrollEnd,
      scrolled,
    ],
  );

  return (
    <TableContext.Provider value={contextValue}>
      <div
        data-slot="table-container"
        data-variant={variant}
        className="@container/table relative w-full"
      >
        <div
          ref={isScroll ? overflowRef : undefined}
          data-slot="table-scroll-area"
          role={isScroll ? "region" : undefined}
          aria-label={isScroll ? "Scrollable table" : undefined}
          tabIndex={isScroll ? 0 : undefined}
          className={cn(
            "w-full rounded-[inherit]",
            isScroll && "overflow-x-auto overscroll-x-contain",
            variant === "stack" &&
              "@md/table:overflow-x-auto @md/table:overscroll-x-contain",
            isScroll &&
              "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/50 focus-visible:ring-inset",
          )}
        >
          <table
            data-slot="table"
            role={variant === "stack" ? "table" : undefined}
            className={cn(
              "w-full caption-bottom border-separate border-spacing-0 text-sm",
              variant === "stack" && "@max-md/table:block",
              className,
            )}
            {...props}
          >
            {children}
          </table>
        </div>

        {isScroll && (
          <>
            <div
              aria-hidden="true"
              className={cn(
                "pointer-events-none absolute inset-y-0 start-0 w-8 bg-gradient-to-r from-background to-transparent opacity-0 transition-opacity motion-reduce:transition-none",
                canScrollStart && "opacity-100",
              )}
            />
            <div
              aria-hidden="true"
              className={cn(
                "pointer-events-none absolute inset-y-0 end-0 w-8 bg-gradient-to-l from-background to-transparent opacity-0 transition-opacity motion-reduce:transition-none",
                canScrollEnd && "opacity-100",
              )}
            />
          </>
        )}
      </div>
    </TableContext.Provider>
  );
}

function TableHeader({ className, ...props }: React.ComponentProps<"thead">) {
  const { variant } = useTableContext();

  return (
    <RowGroupContext.Provider value="header">
      <thead
        data-slot="table-header"
        role={variant === "stack" ? "rowgroup" : undefined}
        className={cn(
          "[&_tr]:border-b",
          variant === "stack" && "@max-md/table:sr-only",
          className,
        )}
        {...props}
      />
    </RowGroupContext.Provider>
  );
}

function TableBody({ className, ...props }: React.ComponentProps<"tbody">) {
  const { variant } = useTableContext();

  return (
    <RowGroupContext.Provider value="body">
      <tbody
        data-slot="table-body"
        role={variant === "stack" ? "rowgroup" : undefined}
        className={cn(
          "[&_tr:last-child]:border-0",
          variant === "stack" && "@max-md/table:block @max-md/table:space-y-3",
          className,
        )}
        {...props}
      />
    </RowGroupContext.Provider>
  );
}

function TableFooter({ className, ...props }: React.ComponentProps<"tfoot">) {
  const { variant } = useTableContext();

  return (
    <RowGroupContext.Provider value="footer">
      <tfoot
        data-slot="table-footer"
        role={variant === "stack" ? "rowgroup" : undefined}
        className={cn(
          "border-t bg-muted/50 font-medium [&>tr]:last:border-b-0",
          className,
        )}
        {...props}
      />
    </RowGroupContext.Provider>
  );
}

interface HiddenEntry {
  label: string;
  content: React.ReactNode;
}

function TableRow({
  className,
  children,
  ...props
}: React.ComponentProps<"tr">) {
  const ctx = useTableContext();
  const rowGroup = useRowGroup();
  const reactId = React.useId();
  const [expanded, setExpanded] = React.useState(false);

  const isPriority = ctx.variant === "priority";
  const isStack = ctx.variant === "stack";
  const isHeaderRow = rowGroup === "header";
  const isBodyRow = rowGroup === "body";

  const childArray = React.Children.toArray(children);

  // Stack variant, body rows: compose the card from each column's `group`
  // instead of source order. Cross-cell placement (which cells share a grid
  // row/line) has to be computed here, once, over the whole row — a single
  // cell can't know this about its siblings on its own.
  const stackPlacementByIndex = new Map<number, StackPlacement>();
  let stackHasIdentityOrContact = false;
  let stackHasMetric = false;
  let stackHasActions = false;

  if (isStack && isBodyRow) {
    const bandGroups: Record<Exclude<TableGroup, "meta">, number[]> = {
      identity: [],
      contact: [],
      metric: [],
      actions: [],
    };

    childArray.forEach((child, index) => {
      if (!React.isValidElement(child) || child.type !== TableCell) return;
      const rawGroup = ctx.columns[index]?.group ?? "metric";
      const band = rawGroup === "meta" ? "metric" : rawGroup;
      bandGroups[band].push(index);
    });

    bandGroups.identity.forEach((index, i) => {
      const gridColumn =
        bandGroups.identity.length > 1
          ? i === 0
            ? "1 / 3"
            : "3 / 13"
          : "1 / 13";
      stackPlacementByIndex.set(index, {
        band: "identity",
        gridColumn,
        order: i,
      });
    });

    bandGroups.contact.forEach((index, i) => {
      stackPlacementByIndex.set(index, {
        band: "contact",
        gridColumn: splitTracks(i, bandGroups.contact.length),
        order: 10 + i,
      });
    });

    bandGroups.metric.forEach((index, i) => {
      stackPlacementByIndex.set(index, { band: "metric", order: 20 + i });
    });

    bandGroups.actions.forEach((index, i) => {
      stackPlacementByIndex.set(index, {
        band: "actions",
        gridColumn: splitTracks(i, bandGroups.actions.length),
        order: 1000 + i,
      });
    });

    stackHasIdentityOrContact =
      bandGroups.identity.length > 0 || bandGroups.contact.length > 0;
    stackHasMetric = bandGroups.metric.length > 0;
    stackHasActions = bandGroups.actions.length > 0;
  }

  const processedChildren = childArray.map((child, index) => {
    if (!React.isValidElement(child)) return child;
    if (child.type === TableCell) {
      return React.cloneElement<ColumnIndexProp>(
        child as React.ReactElement<ColumnIndexProp>,
        {
          columnIndex: index,
          stackPlacement: stackPlacementByIndex.get(index),
        },
      );
    }
    if (child.type === TableHead) {
      return React.cloneElement<ColumnIndexProp>(
        child as React.ReactElement<ColumnIndexProp>,
        { columnIndex: index },
      );
    }
    return child;
  });

  let primaryLabel = "";
  const hiddenEntries: HiddenEntry[] = [];

  if (isPriority && isBodyRow) {
    for (let index = 0; index < childArray.length; index += 1) {
      const child = childArray[index];
      if (!React.isValidElement(child) || child.type !== TableCell) continue;

      const cellProps = child.props as TableCellProps;
      const column = ctx.columns[index];
      const priority = cellProps.priority ?? column?.priority ?? "secondary";

      if (priority === "primary") {
        if (!primaryLabel) primaryLabel = getTextContent(cellProps.children);
      } else {
        hiddenEntries.push({
          label: cellProps.label ?? column?.label ?? "",
          content: cellProps.children,
        });
      }
    }
  }

  const detailsId = `${reactId}-row-details`;

  const tr = (
    <tr
      data-slot="table-row"
      role={ctx.variant === "stack" ? "row" : undefined}
      className={cn(
        "group/row border-b transition-colors hover:bg-muted/50 has-aria-expanded:bg-muted/50 data-[state=selected]:bg-muted motion-reduce:transition-none",
        ctx.density === "compact" ? "@md/table:h-9" : "@md/table:h-10",
        "@max-md/table:min-h-11",
        isStack &&
          "@max-md/table:grid @max-md/table:auto-rows-min @max-md/table:grid-cols-12 @max-md/table:items-start @max-md/table:gap-x-3 @max-md/table:gap-y-2 @max-md/table:rounded-xl @max-md/table:border @max-md/table:border-border @max-md/table:bg-card @max-md/table:p-4 @max-md/table:border-b-0",
        className,
      )}
      {...props}
    >
      {processedChildren}
      {isStack && isBodyRow && stackHasIdentityOrContact && stackHasMetric && (
        <td
          aria-hidden="true"
          data-slot="table-cell"
          className="hidden @max-md/table:col-[1/13] @max-md/table:order-[19] @max-md/table:block @max-md/table:h-px @max-md/table:bg-border"
        />
      )}
      {isStack &&
        isBodyRow &&
        stackHasActions &&
        (stackHasIdentityOrContact || stackHasMetric) && (
          <td
            aria-hidden="true"
            data-slot="table-cell"
            className="hidden @max-md/table:col-[1/13] @max-md/table:order-[999] @max-md/table:block @max-md/table:h-px @max-md/table:bg-border"
          />
        )}
      {isPriority && isHeaderRow && (
        <th
          aria-hidden="true"
          data-slot="table-head"
          className="w-10 p-0 @md/table:hidden"
        />
      )}
      {isPriority && isBodyRow && (
        <td
          data-slot="table-cell"
          className="w-10 p-0 text-end align-middle @md/table:hidden"
        >
          {hiddenEntries.length > 0 ? (
            <button
              type="button"
              aria-expanded={expanded}
              aria-controls={detailsId}
              aria-label={`${expanded ? "Hide" : "Show"} more details for ${
                primaryLabel || "this row"
              }`}
              onClick={() => setExpanded((value) => !value)}
              className="mx-auto flex size-8 items-center justify-center rounded-md text-muted-foreground transition-colors hover:bg-muted hover:text-foreground @max-md/table:size-11"
            >
              <ChevronDown
                className={cn(
                  "size-4 transition-transform motion-reduce:transition-none",
                  expanded && "rotate-180",
                )}
              />
            </button>
          ) : null}
        </td>
      )}
    </tr>
  );

  if (isPriority && isBodyRow && hiddenEntries.length > 0) {
    const colSpan = ctx.columns.length + 1;

    return (
      <>
        {tr}
        <tr
          data-slot="table-row"
          role={ctx.variant === "stack" ? "row" : undefined}
          className="border-b"
          hidden={!expanded}
        >
          <td
            id={detailsId}
            colSpan={colSpan}
            className="bg-muted/30 px-3 py-3"
          >
            <dl className="grid grid-cols-1 gap-x-6 gap-y-2 @sm/table:grid-cols-2">
              {hiddenEntries.map((entry, i) => (
                <div
                  key={i}
                  className="flex items-baseline justify-between gap-4"
                >
                  <dt className="text-xs text-muted-foreground">
                    {entry.label || "—"}
                  </dt>
                  <dd className="text-end text-sm tabular-nums">
                    {isEmptyValue(entry.content) ? (
                      <span className="text-muted-foreground/60">—</span>
                    ) : (
                      entry.content
                    )}
                  </dd>
                </div>
              ))}
            </dl>
          </td>
        </tr>
      </>
    );
  }

  return tr;
}

function TableHead({
  className,
  align = "start",
  priority = "secondary",
  group: _group,
  columnIndex,
  children,
  ...props
}: TableHeadProps & ColumnIndexProp) {
  const ctx = useTableContext();

  const isFirstColumn = columnIndex === 0;
  const isSticky = ctx.variant === "scroll" && ctx.stickyHeader;
  const isStickyColumn =
    ctx.variant === "scroll" && ctx.stickyColumn && isFirstColumn;

  return (
    <th
      data-slot="table-head"
      scope="col"
      role={ctx.variant === "stack" ? "columnheader" : undefined}
      className={cn(
        "h-10 px-3 align-middle text-xs font-medium tracking-wide text-muted-foreground first:ps-4 last:pe-4 [&:has([role=checkbox])]:pe-0",
        "@max-md/table:h-11",
        ctx.density === "compact" && "@md/table:h-9",
        alignToClass(align),
        align === "end" && "tabular-nums",
        isSticky && [
          "sticky top-0 z-20 bg-background",
          ctx.scrolled && "shadow-[inset_0_-1px_0_var(--border)]",
        ],
        isStickyColumn && [
          "sticky start-0 bg-background",
          isSticky ? "z-30" : "z-10",
          ctx.canScrollStart &&
            "after:absolute after:inset-y-0 after:end-0 after:w-px after:bg-border after:content-['']",
        ],
        ctx.variant === "priority" &&
          priority === "tertiary" &&
          "@max-md/table:hidden",
        ctx.variant === "priority" &&
          priority === "secondary" &&
          "@max-sm/table:hidden",
        className,
      )}
      {...props}
    >
      {children}
    </th>
  );
}

function TableCell({
  className,
  align,
  priority,
  label,
  truncate = false,
  columnIndex,
  stackPlacement,
  children,
  ...props
}: TableCellProps & ColumnIndexProp) {
  const ctx = useTableContext();

  const column =
    columnIndex !== undefined ? ctx.columns[columnIndex] : undefined;
  const resolvedAlign = align ?? column?.align ?? "start";
  const resolvedPriority = priority ?? column?.priority ?? "secondary";
  const resolvedLabel = label ?? column?.label ?? "";

  const isFirstColumn = columnIndex === 0;
  const isPrimary = resolvedPriority === "primary";
  const empty = isEmptyValue(children);

  const isStickyColumn =
    ctx.variant === "scroll" && ctx.stickyColumn && isFirstColumn;

  const content = empty ? (
    <span className="text-muted-foreground/60">—</span>
  ) : (
    children
  );

  const baseClasses =
    "min-w-0 px-3 py-2 align-middle first:ps-4 last:pe-4 [&:has([role=checkbox])]:pe-0";
  const gridStyle: React.CSSProperties | undefined = stackPlacement
    ? {
        order: stackPlacement.order,
        ...(stackPlacement.gridColumn
          ? { gridColumn: stackPlacement.gridColumn }
          : null),
      }
    : undefined;

  if (stackPlacement) {
    if (stackPlacement.band === "identity") {
      const isCheckboxSlot = stackPlacement.gridColumn === "1 / 3";
      return (
        <td
          data-slot="table-cell"
          role="cell"
          style={gridStyle}
          className={cn(
            baseClasses,
            isCheckboxSlot
              ? cn(
                  alignToClass(resolvedAlign),
                  "@max-md/table:flex @max-md/table:min-h-11 @max-md/table:min-w-11 @max-md/table:items-center @max-md/table:justify-center @max-md/table:p-2.5",
                )
              : cn(
                  alignToClass(resolvedAlign),
                  "font-medium text-foreground",
                  "@max-md/table:flex @max-md/table:min-w-0 @max-md/table:items-center @max-md/table:gap-3 @max-md/table:p-0 @max-md/table:text-[15px] @max-md/table:leading-tight",
                ),
            className,
          )}
          {...props}
        >
          {content}
        </td>
      );
    }

    if (stackPlacement.band === "contact") {
      const contactIndex = stackPlacement.order - 10;
      const text = getTextContent(children);
      let linked: React.ReactNode = content;
      if (!empty && typeof children === "string") {
        const trimmed = text.trim();
        if (EMAIL_PATTERN.test(trimmed)) {
          linked = (
            <a href={`mailto:${trimmed}`} className="hover:underline">
              {content}
            </a>
          );
        } else if (PHONE_PATTERN.test(trimmed)) {
          linked = (
            <a
              href={`tel:${trimmed.replace(/[()\s-]/g, "")}`}
              className="hover:underline"
            >
              {content}
            </a>
          );
        }
      }

      return (
        <td
          data-slot="table-cell"
          role="cell"
          style={gridStyle}
          className={cn(
            baseClasses,
            alignToClass(resolvedAlign),
            "text-muted-foreground",
            "@max-md/table:flex @max-md/table:min-w-0 @max-md/table:items-center @max-md/table:gap-1 @max-md/table:p-0 @max-md/table:text-sm @max-md/table:leading-tight",
            className,
          )}
          {...props}
        >
          {contactIndex > 0 && (
            <span
              aria-hidden="true"
              className="hidden text-muted-foreground/60 @max-md/table:inline"
            >
              ·
            </span>
          )}
          <span className="@max-md/table:min-w-0 @max-md/table:flex-1 @max-md/table:truncate">
            {linked}
          </span>
        </td>
      );
    }

    if (stackPlacement.band === "actions") {
      return (
        <td
          data-slot="table-cell"
          role="cell"
          style={gridStyle}
          className={cn(
            baseClasses,
            "text-end",
            "@max-md/table:flex @max-md/table:justify-end @max-md/table:gap-1 @max-md/table:p-0 @max-md/table:pt-1",
            className,
          )}
          {...props}
        >
          {content}
        </td>
      );
    }

    // metric / meta
    return (
      <td
        data-slot="table-cell"
        role="cell"
        style={gridStyle}
        className={cn(
          baseClasses,
          alignToClass(resolvedAlign),
          resolvedAlign === "end" && "tabular-nums",
          "text-muted-foreground",
          "@max-md/table:col-span-4 @max-[340px]/table:col-span-6 @max-md/table:flex @max-md/table:flex-col @max-md/table:gap-0.5 @max-md/table:p-0 @max-md/table:text-start",
          className,
        )}
        {...props}
      >
        <span className="hidden @max-md/table:block @max-md/table:text-[11px] @max-md/table:leading-none @max-md/table:tracking-wide @max-md/table:text-muted-foreground @max-md/table:uppercase">
          {resolvedLabel || "—"}
        </span>
        <span className="@max-md/table:text-sm @max-md/table:leading-tight @max-md/table:text-foreground @max-md/table:tabular-nums">
          {content}
        </span>
      </td>
    );
  }

  return (
    <td
      data-slot="table-cell"
      role={ctx.variant === "stack" ? "cell" : undefined}
      title={truncate && !empty ? getTextContent(children) : undefined}
      className={cn(
        baseClasses,
        alignToClass(resolvedAlign),
        resolvedAlign === "end" && "tabular-nums",
        isPrimary ? "font-medium text-foreground" : "text-muted-foreground",
        truncate ? "max-w-[28ch] truncate" : "whitespace-normal break-words",
        isStickyColumn && [
          "sticky start-0 z-[1] bg-background group-hover/row:bg-muted/50",
          ctx.canScrollStart &&
            "after:absolute after:inset-y-0 after:end-0 after:w-px after:bg-border after:content-['']",
        ],
        ctx.variant === "priority" &&
          resolvedPriority === "tertiary" &&
          "@max-md/table:hidden",
        ctx.variant === "priority" &&
          resolvedPriority === "secondary" &&
          "@max-sm/table:hidden",
        className,
      )}
      {...props}
    >
      {content}
    </td>
  );
}

function TableCaption({
  className,
  ...props
}: React.ComponentProps<"caption">) {
  return (
    <caption
      data-slot="table-caption"
      className={cn("mt-4 text-sm text-muted-foreground", className)}
      {...props}
    />
  );
}

export {
  Table,
  TableHeader,
  TableBody,
  TableFooter,
  TableHead,
  TableRow,
  TableCell,
  TableCaption,
};
