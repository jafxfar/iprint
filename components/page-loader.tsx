"use client"

import { useEffect, useState, useRef } from "react"

// Grid dimensions for the block-wipe exit animation
const COLS = 10
const ROWS = 8

// Stagger timings
const COL_STAGGER = 60    // ms between each column (left → right)
const ROW_STAGGER = 45    // ms between rows within a column (bottom → top)
const BLOCK_DURATION = 580 // ms — CSS transition duration per block

function getBlockDelay(idx: number): number {
  const col = idx % COLS
  const row = Math.floor(idx / COLS)
  // Bottom row (ROWS-1) fires first → rowOffset = 0
  // Top row (0) fires last → rowOffset = (ROWS-1) * ROW_STAGGER
  const rowOffset = (ROWS - 1 - row) * ROW_STAGGER
  return col * COL_STAGGER + rowOffset
}

// Total time until the very last block finishes sliding out
const TOTAL_WIPE_MS =
  (COLS - 1) * COL_STAGGER + (ROWS - 1) * ROW_STAGGER + BLOCK_DURATION + 100

export function PageLoader() {
  const [count, setCount] = useState(0)
  const [phase, setPhase] = useState<"counting" | "wiping" | "done">("counting")
  const rafRef = useRef<number | null>(null)
  const startRef = useRef<number | null>(null)
  const DURATION = 2200 // ms to count 0 → 100

  // Phase 1 — animate counter from 0 to 100
  useEffect(() => {
    if (phase !== "counting") return

    const animate = (ts: number) => {
      if (!startRef.current) startRef.current = ts
      const elapsed = ts - startRef.current
      const progress = Math.min(elapsed / DURATION, 1)
      // ease-in-out cubic
      const eased =
        progress < 0.5
          ? 4 * progress * progress * progress
          : 1 - Math.pow(-2 * progress + 2, 3) / 2
      setCount(Math.floor(eased * 100))

      if (progress < 1) {
        rafRef.current = requestAnimationFrame(animate)
      } else {
        setCount(100)
        setTimeout(() => setPhase("wiping"), 350)
      }
    }

    rafRef.current = requestAnimationFrame(animate)
    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current)
    }
  }, [phase])

  // Phase 2 — wait for all block transitions to finish, then unmount
  useEffect(() => {
    if (phase !== "wiping") return
    const done = setTimeout(() => setPhase("done"), TOTAL_WIPE_MS)
    return () => clearTimeout(done)
  }, [phase])

  if (phase === "done") return null

  const padded = String(count).padStart(3, "0")
  const isWiping = phase === "wiping"

  return (
    <div
      className="fixed inset-0"
      style={{ zIndex: 9999 }}
      aria-hidden="true"
    >
      {/*
       * ── LAYER 1: BLOCK GRID (bottom of stack) ──────────────────────
       * 10×8 solid dark blocks that cover the whole screen.
       * When phase="wiping" each block slides UP and out of view,
       * revealing the real page content that sits below z-9999.
       *
       * Each block uses translateY(-110vh) — a full viewport height —
       * so it completely exits the screen regardless of its own height.
       * The grid wrapper has overflow:hidden to clip the sliding blocks
       * without affecting the counter layer above.
       */}
      <div
        className="absolute inset-0"
        style={{
          display: "grid",
          gridTemplateColumns: `repeat(${COLS}, 1fr)`,
          gridTemplateRows: `repeat(${ROWS}, 1fr)`,
          overflow: "hidden",
        }}
      >
        {Array.from({ length: COLS * ROWS }).map((_, i) => {
          const delay = getBlockDelay(i)
          return (
            <div
              key={i}
              style={{
                backgroundColor: "#0a0a0a",
                willChange: "transform",
                transform: isWiping ? "translateY(-110vh)" : "translateY(0%)",
                transition: isWiping
                  ? `transform ${BLOCK_DURATION}ms cubic-bezier(0.76, 0, 0.24, 1) ${delay}ms`
                  : "none",
              }}
            />
          )
        })}
      </div>

      {/*
       * ── LAYER 2: COUNTER (top of stack, above block grid) ──────────
       * The counter is always rendered on top so it's visible during
       * counting. It fades out quickly at the start of the wipe phase
       * before blocks begin sliding, keeping the UI clean.
       */}
      <div
        className="absolute inset-0 flex flex-col items-center justify-center select-none pointer-events-none"
        style={{
          opacity: isWiping ? 0 : 1,
          transition: isWiping ? "opacity 0.15s ease" : "none",
        }}
      >
        {/* Agency name */}
        <p
          style={{
            fontSize: "clamp(0.65rem, 1.2vw, 0.9rem)",
            color: "rgba(255,255,255,0.35)",
            letterSpacing: "0.4em",
            fontWeight: 700,
            textTransform: "uppercase",
            marginBottom: "3rem",
          }}
        >
          IPrint — Дизайн как основа лидерства
        </p>

        {/* Giant counter */}
        <div
          style={{
            fontSize: "clamp(6rem, 22vw, 22rem)",
            color: "#ffffff",
            fontWeight: 700,
            letterSpacing: "-0.04em",
            lineHeight: 1,
            fontVariantNumeric: "tabular-nums",
          }}
        >
          {padded}
        </div>

        {/* Thin progress bar */}
        <div
          className="absolute bottom-0 left-0 w-full"
          style={{ height: "2px", backgroundColor: "rgba(255,255,255,0.1)" }}
        >
          <div
            style={{
              height: "100%",
              backgroundColor: "#ffffff",
              width: `${count}%`,
              transition: "width 0.05s linear",
            }}
          />
        </div>

        {/* Loading label */}
        <p
          className="absolute bottom-6 right-8"
          style={{
            fontSize: "10px",
            letterSpacing: "0.3em",
            textTransform: "uppercase",
            color: "rgba(255,255,255,0.3)",
          }}
        >
          Loading
        </p>
      </div>
    </div>
  )
}
