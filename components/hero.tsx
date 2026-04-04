"use client"

import { useEffect, useRef } from "react"

export function Hero() {
  const headlineRef = useRef<HTMLHeadingElement>(null)

  useEffect(() => {
    const el = headlineRef.current
    if (!el) return
    el.style.opacity = "0"
    el.style.transform = "translateY(60px)"
    const timer = setTimeout(() => {
      el.style.transition = "opacity 1s ease, transform 1s ease"
      el.style.opacity = "1"
      el.style.transform = "translateY(0)"
    }, 100)
    return () => clearTimeout(timer)
  }, [])

  return (
    <section className="relative min-h-screen flex flex-col justify-between pt-32 pb-16 px-8 max-w-screen-2xl mx-auto overflow-hidden">
      {/* Top row */}
      <div className="flex items-start justify-between">
        <p className="text-xs tracking-[0.25em] uppercase text-muted-foreground">
          Est. 2018 — Moscow
        </p>
        <p className="text-xs tracking-[0.25em] uppercase text-muted-foreground text-right">
          Design & Strategy
        </p>
      </div>

      {/* Main headline */}
      <div className="flex-1 flex items-center">
        <div className="w-full">
          <h1
            ref={headlineRef}
            className="font-serif font-bold leading-none text-foreground text-balance"
            style={{ fontSize: "clamp(3.5rem, 12vw, 14rem)", letterSpacing: "-0.02em" }}
          >
            Lead by<br />
            <span className="text-accent italic">Design.</span>
          </h1>
          <div className="mt-10 flex flex-col md:flex-row md:items-end justify-between gap-8">
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
          </div>
        </div>
      </div>

      {/* Bottom row */}
      <div className="flex items-end justify-between pt-12 border-t border-border">
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
          <span className="h-12 w-px bg-border" />
        </div>
      </div>

      {/* Decorative large background letter */}
      <div
        className="absolute right-0 top-1/2 -translate-y-1/2 font-serif font-bold leading-none text-border select-none pointer-events-none -z-0 opacity-20"
        style={{ fontSize: "clamp(8rem, 28vw, 36rem)", letterSpacing: "-0.05em" }}
        aria-hidden="true"
      >
        F
      </div>
    </section>
  )
}
