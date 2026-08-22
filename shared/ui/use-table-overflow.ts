"use client"

import * as React from "react"

export interface TableOverflowState {
  /** There is hidden content toward the inline-start edge (user has scrolled away from start). */
  canScrollStart: boolean
  /** There is hidden content toward the inline-end edge. */
  canScrollEnd: boolean
  /** The container has been scrolled vertically away from the top. */
  scrolled: boolean
}

export interface UseTableOverflowResult extends TableOverflowState {
  ref: React.RefCallback<HTMLElement>
}

const INITIAL_STATE: TableOverflowState = {
  canScrollStart: false,
  canScrollEnd: false,
  scrolled: false,
}

/**
 * Tracks horizontal/vertical scroll position of a table's scroll container so
 * callers can drive edge fades, sticky-header hairlines, and sticky-column
 * shadows. Uses a ResizeObserver (content/container size changes) plus a
 * rAF-throttled scroll listener rather than polling. Direction-aware:
 * "start"/"end" follow the container's actual writing direction instead of
 * assuming LTR.
 */
export function useTableOverflow(): UseTableOverflowResult {
  const nodeRef = React.useRef<HTMLElement | null>(null)
  const rafRef = React.useRef(0)
  const resizeObserverRef = React.useRef<ResizeObserver | null>(null)
  const [state, setState] = React.useState<TableOverflowState>(INITIAL_STATE)

  const measure = React.useCallback(() => {
    const node = nodeRef.current
    if (!node) return

    const { scrollLeft, scrollWidth, clientWidth, scrollTop } = node
    const isRtl = getComputedStyle(node).direction === "rtl"
    const maxScroll = scrollWidth - clientWidth
    const distanceFromStart = isRtl ? maxScroll + scrollLeft : scrollLeft
    const distanceFromEnd = isRtl ? -scrollLeft : maxScroll - scrollLeft

    setState((prev) => {
      const next: TableOverflowState = {
        canScrollStart: distanceFromStart > 1,
        canScrollEnd: distanceFromEnd > 1,
        scrolled: scrollTop > 0,
      }
      if (
        prev.canScrollStart === next.canScrollStart &&
        prev.canScrollEnd === next.canScrollEnd &&
        prev.scrolled === next.scrolled
      ) {
        return prev
      }
      return next
    })
  }, [])

  const onScroll = React.useCallback(() => {
    if (rafRef.current) return
    rafRef.current = requestAnimationFrame(() => {
      rafRef.current = 0
      measure()
    })
  }, [measure])

  const ref = React.useCallback<React.RefCallback<HTMLElement>>(
    (node) => {
      const previous = nodeRef.current
      if (previous) {
        previous.removeEventListener("scroll", onScroll)
      }
      resizeObserverRef.current?.disconnect()
      resizeObserverRef.current = null

      nodeRef.current = node

      if (node) {
        node.addEventListener("scroll", onScroll, { passive: true })
        measure()

        if (typeof ResizeObserver !== "undefined") {
          const observer = new ResizeObserver(() => measure())
          observer.observe(node)
          resizeObserverRef.current = observer
        }
      } else {
        setState(INITIAL_STATE)
      }
    },
    [measure, onScroll]
  )

  React.useEffect(
    () => () => {
      const node = nodeRef.current
      if (node) node.removeEventListener("scroll", onScroll)
      resizeObserverRef.current?.disconnect()
      if (rafRef.current) cancelAnimationFrame(rafRef.current)
    },
    [onScroll]
  )

  return { ref, ...state }
}
