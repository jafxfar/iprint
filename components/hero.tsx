"use client"

import { useEffect, useRef } from "react"

function Reveal({
  children,
  delay = 0,
  className = "",
}: {
  children: React.ReactNode
  delay?: number
  className?: string
}) {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    el.style.opacity = "0"
    el.style.transform = "translateY(48px)"
    const timer = setTimeout(() => {
      el.style.transition = "opacity 0.9s cubic-bezier(0.16,1,0.3,1), transform 0.9s cubic-bezier(0.16,1,0.3,1)"
      el.style.opacity = "1"
      el.style.transform = "translateY(0)"
    }, delay)
    return () => clearTimeout(timer)
  }, [delay])

  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  )
}

export function Hero() {
  const bgLetterRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const el = bgLetterRef.current
    if (!el) return

    const onScroll = () => {
      const progress = window.scrollY / window.innerHeight
      el.style.transform = `translateY(calc(-50% + ${progress * 120}px))`
      el.style.opacity = String(Math.max(0, 0.15 - progress * 0.3))
    }

    window.addEventListener("scroll", onScroll, { passive: true })
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  return (
    <section className="relative min-h-screen flex flex-col justify-between pt-32 pb-16 px-8 max-w-screen-2xl mx-auto overflow-hidden">
      {/* Top row */}
      <Reveal delay={200} className="flex items-start justify-between">
        <p className="text-xs tracking-[0.25em] uppercase text-muted-foreground">
          Est. 2018 — Moscow
        </p>
        <p className="text-xs tracking-[0.25em] uppercase text-muted-foreground text-right">
          Design & Strategy
        </p>
      </Reveal>

      {/* Main headline */}
      <div className="flex-1 flex items-center">
        <div className="w-full">
          <div className="overflow-hidden">
            <Reveal delay={350}>
              <h1
                className="font-serif font-bold leading-none text-foreground"
                style={{ fontSize: "clamp(3.5rem, 12vw, 14rem)", letterSpacing: "-0.02em" }}
              >
                Lead by
              </h1>
            </Reveal>
          </div>
          <div className="overflow-hidden">
            <Reveal delay={500}>
              <h1
                className="font-serif font-bold leading-none"
                style={{ fontSize: "clamp(3.5rem, 12vw, 14rem)", letterSpacing: "-0.02em" }}
              >
                <span className="text-accent italic">Design.</span>
              </h1>
            </Reveal>
          </div>

          <Reveal delay={700} className="mt-10 flex flex-col md:flex-row md:items-end justify-between gap-8">
            <p className="max-w-md text-base md:text-lg leading-relaxed text-muted-foreground">
              Запускаем следующее поколение интеллектуальных брендов.
              Стратегия, продукт и идентичность — для компаний, которые хотят вести.
            </p>
            <a
              href="#work"
              className="group inline-flex items-center gap-3 text-sm tracking-widest uppercase text-foreground self-start md:self-auto"
            >
              <span className="h-px w-12 bg-foreground group-hover:w-20 transition-all duration-500" />
              View Work
            </a>
          </Reveal>
        </div>
      </div>

      {/* Bottom stats row */}
      <Reveal delay={900} className="flex items-end justify-between pt-12 border-t border-border">
        <div className="flex gap-12">
          {[
            { num: "25+", label: "Years" },
            { num: "200+", label: "Projects" },
            { num: "98%", label: "Retention" },
          ].map(({ num, label }) => (
            <div key={label}>
              <p className="font-serif font-bold text-3xl text-foreground">{num}</p>
              <p className="text-xs tracking-widest uppercase text-muted-foreground mt-1">{label}</p>
            </div>
          ))}
        </div>
        <div className="hidden md:flex items-center gap-4">
          <span className="text-xs tracking-[0.25em] uppercase text-muted-foreground">Scroll</span>
          <span
            className="h-12 w-px bg-border"
            style={{
              animation: "scrollPulse 2s ease-in-out infinite",
            }}
          />
        </div>
      </Reveal>

      {/* Parallax background letter */}
      <div
        ref={bgLetterRef}
        className="absolute right-0 top-1/2 font-serif font-bold leading-none text-foreground select-none pointer-events-none -z-0"
        style={{
          fontSize: "clamp(8rem, 28vw, 36rem)",
          letterSpacing: "-0.05em",
          opacity: 0.15,
          transform: "translateY(-50%)",
          transition: "transform 0.05s linear",
        }}
        aria-hidden="true"
      >
        F
      </div>
    </section>
  )
}
