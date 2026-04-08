"use client"

import { useEffect, useState, useRef } from "react"

// Grid columns × rows for the block-wipe exit animation
const COLS = 8
const ROWS = 6

export function PageLoader() {
  const [count, setCount] = useState(0)
  const [phase, setPhase] = useState<"counting" | "wiping" | "done">("counting")
  const [wipedBlocks, setWipedBlocks] = useState<Set<number>>(new Set())
  const rafRef = useRef<number | null>(null)
  const startRef = useRef<number | null>(null)
  const DURATION = 2200 // ms to count 0→100

  // Phase 1 — count from 0 to 100 using requestAnimationFrame
  useEffect(() => {
    if (phase !== "counting") return

    const animate = (ts: number) => {
      if (!startRef.current) startRef.current = ts
      const elapsed = ts - startRef.current
      const progress = Math.min(elapsed / DURATION, 1)
      // ease-in-out cubic
      const eased = progress < 0.5
        ? 4 * progress * progress * progress
        : 1 - Math.pow(-2 * progress + 2, 3) / 2
      setCount(Math.floor(eased * 100))

      if (progress < 1) {
        rafRef.current = requestAnimationFrame(animate)
      } else {
        setCount(100)
        // small pause at 100 then start wipe
        setTimeout(() => setPhase("wiping"), 300)
      }
    }

    rafRef.current = requestAnimationFrame(animate)
    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current)
    }
  }, [phase])

  // Phase 2 — staggered block wipe bottom-to-top, column by column
  useEffect(() => {
    if (phase !== "wiping") return

    const total = COLS * ROWS
    const timers: ReturnType<typeof setTimeout>[] = []

    // Build order: bottom row first, column stagger within each row
    const order: number[] = []
    for (let row = ROWS - 1; row >= 0; row--) {
      for (let col = 0; col < COLS; col++) {
        order.push(row * COLS + col)
      }
    }

    order.forEach((idx, i) => {
      const t = setTimeout(() => {
        setWipedBlocks((prev) => new Set(prev).add(idx))
      }, i * 28)
      timers.push(t)
    })

    // After all blocks wiped → done
    const done = setTimeout(() => setPhase("done"), order.length * 28 + 400)
    timers.push(done)

    return () => timers.forEach(clearTimeout)
  }, [phase])

  if (phase === "done") return null

  const padded = String(count).padStart(3, "0")

  return (
    <div
      className="fixed inset-0 z-[9999] overflow-hidden"
      aria-hidden="true"
    >
      {/* ── BLOCK GRID (sits above the counter, clips away during wipe) ── */}
      <div
        className="absolute inset-0 grid pointer-events-none"
        style={{
          gridTemplateColumns: `repeat(${COLS}, 1fr)`,
          gridTemplateRows: `repeat(${ROWS}, 1fr)`,
        }}
      >
        {Array.from({ length: COLS * ROWS }).map((_, i) => (
          <div
            key={i}
            style={{
              background: "#0a0a0a",
              transform: wipedBlocks.has(i) ? "translateY(-105%)" : "translateY(0%)",
              transition: wipedBlocks.has(i)
                ? "transform 0.55s cubic-bezier(0.76, 0, 0.24, 1)"
                : "none",
            }}
          />
        ))}
      </div>

      {/* ── COUNTER (sits underneath the grid blocks) ── */}
      <div className="absolute inset-0 flex flex-col items-center justify-center bg-[#0a0a0a] select-none">
        {/* Agency name */}
        <p
          className="font-serif font-bold tracking-[0.3em] uppercase mb-12"
          style={{
            fontSize: "clamp(0.65rem, 1.2vw, 0.9rem)",
            color: "rgba(255,255,255,0.35)",
            letterSpacing: "0.4em",
          }}
        >
          FORMA — Lead by Design
        </p>

        {/* Giant counter */}
        <div
          className="font-serif font-bold leading-none tabular-nums"
          style={{
            fontSize: "clamp(6rem, 22vw, 22rem)",
            color: "#ffffff",
            letterSpacing: "-0.04em",
            lineHeight: 1,
          }}
        >
          {padded}
        </div>

        {/* Thin progress bar at bottom */}
        <div className="absolute bottom-0 left-0 w-full h-[2px] bg-white/10">
          <div
            className="h-full bg-white"
            style={{
              width: `${count}%`,
              transition: "width 0.05s linear",
            }}
          />
        </div>

        {/* Loading label */}
        <p
          className="absolute bottom-6 right-8 font-sans text-[10px] tracking-[0.3em] uppercase"
          style={{ color: "rgba(255,255,255,0.3)" }}
        >
          Loading
        </p>
      </div>
    </div>
  )
}
