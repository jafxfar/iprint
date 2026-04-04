"use client"

import { useEffect, useRef } from "react"

export function CursorFollower() {
  const cursorRef = useRef<HTMLDivElement>(null)
  const dotRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const cursor = cursorRef.current
    const dot = dotRef.current
    if (!cursor || !dot) return

    let mouseX = 0
    let mouseY = 0
    let curX = 0
    let curY = 0

    const onMouseMove = (e: MouseEvent) => {
      mouseX = e.clientX
      mouseY = e.clientY
      dot.style.left = `${mouseX}px`
      dot.style.top = `${mouseY}px`
    }

    const onMouseEnterLink = () => cursor.classList.add("scale-[3]", "opacity-30")
    const onMouseLeaveLink = () => cursor.classList.remove("scale-[3]", "opacity-30")

    const addLinkListeners = () => {
      document.querySelectorAll("a, button").forEach((el) => {
        el.addEventListener("mouseenter", onMouseEnterLink)
        el.addEventListener("mouseleave", onMouseLeaveLink)
      })
    }

    addLinkListeners()

    let raf: number
    const animate = () => {
      curX += (mouseX - curX) * 0.1
      curY += (mouseY - curY) * 0.1
      cursor.style.left = `${curX}px`
      cursor.style.top = `${curY}px`
      raf = requestAnimationFrame(animate)
    }
    raf = requestAnimationFrame(animate)

    document.addEventListener("mousemove", onMouseMove)

    return () => {
      document.removeEventListener("mousemove", onMouseMove)
      cancelAnimationFrame(raf)
      document.querySelectorAll("a, button").forEach((el) => {
        el.removeEventListener("mouseenter", onMouseEnterLink)
        el.removeEventListener("mouseleave", onMouseLeaveLink)
      })
    }
  }, [])

  return (
    <>
      {/* Lagging ring */}
      <div
        ref={cursorRef}
        className="pointer-events-none fixed z-[9999] -translate-x-1/2 -translate-y-1/2 w-8 h-8 rounded-full border border-foreground/40 transition-transform duration-300 hidden md:block"
        style={{ left: "-100px", top: "-100px" }}
        aria-hidden="true"
      />
      {/* Instant dot */}
      <div
        ref={dotRef}
        className="pointer-events-none fixed z-[9999] -translate-x-1/2 -translate-y-1/2 w-1.5 h-1.5 rounded-full bg-accent hidden md:block"
        style={{ left: "-100px", top: "-100px" }}
        aria-hidden="true"
      />
    </>
  )
}
