"use client"

import { useEffect, useRef, useState } from "react"

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

// Free Pexels stock videos (advertising / creative / urban atmosphere)
const VIDEO_SOURCES = [
  // City timelapse with neon lights — advertising/urban
  "https://videos.pexels.com/video-files/3129671/3129671-uhd_2560_1440_30fps.mp4",
  // Creative agency people working
  "https://videos.pexels.com/video-files/3209828/3209828-uhd_2560_1440_25fps.mp4",
]

export function Hero() {
  const videoRef = useRef<HTMLVideoElement>(null)
  const bgLetterRef = useRef<HTMLDivElement>(null)
  const [videoLoaded, setVideoLoaded] = useState(false)
  const [videoError, setVideoError] = useState(false)

  // Parallax on the overlay content while scrolling
  useEffect(() => {
    const el = bgLetterRef.current
    if (!el) return
    const onScroll = () => {
      const progress = window.scrollY / window.innerHeight
      el.style.transform = `translateY(calc(-50% + ${progress * 120}px))`
      el.style.opacity = String(Math.max(0, 0.08 - progress * 0.2))
    }
    window.addEventListener("scroll", onScroll, { passive: true })
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  // Ensure video plays (autoplay policy)
  useEffect(() => {
    const vid = videoRef.current
    if (!vid) return
    vid.muted = true
    vid.play().catch(() => {})
  }, [])

  return (
    <section className="relative min-h-screen flex flex-col justify-between pt-32 pb-16 overflow-hidden">

      {/* ── VIDEO BACKGROUND ── */}
      <div className="absolute inset-0 -z-10">
        {/* Light overlay so text stays readable over video */}
        <div className="absolute inset-0 z-10 bg-white/75" />
        {/* Gradient vignette for depth */}
        <div
          className="absolute inset-0 z-10 pointer-events-none"
          style={{
            background:
              "radial-gradient(ellipse at center, transparent 20%, rgba(255,255,255,0.5) 100%)",
          }}
        />
        {/* Grain texture overlay */}
        <div
          className="absolute inset-0 z-10 opacity-[0.04] pointer-events-none"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
            backgroundRepeat: "repeat",
            backgroundSize: "128px 128px",
          }}
          aria-hidden="true"
        />

        {/* Video element */}
        {!videoError && (
          <video
            ref={videoRef}
            className="absolute inset-0 w-full h-full object-cover"
            style={{
              opacity: videoLoaded ? 1 : 0,
              transition: "opacity 1.8s ease",
            }}
            autoPlay
            muted
            loop
            playsInline
            preload="auto"
            onCanPlayThrough={() => setVideoLoaded(true)}
            onError={() => setVideoError(true)}
          >
            <source src={VIDEO_SOURCES[0]} type="video/mp4" />
            <source src={VIDEO_SOURCES[1]} type="video/mp4" />
          </video>
        )}

        {/* Fallback for when video hasn't loaded yet */}
        <div
          className="absolute inset-0 bg-background"
          style={{
            opacity: videoLoaded ? 0 : 1,
            transition: "opacity 1.8s ease",
          }}
          aria-hidden="true"
        />
      </div>

      {/* ── CONTENT ── */}
      <div className="relative z-20 px-8 max-w-screen-2xl mx-auto w-full flex flex-col min-h-screen justify-between">
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
              style={{ animation: "scrollPulse 2s ease-in-out infinite" }}
            />
          </div>
        </Reveal>
      </div>

      {/* Parallax background letter (still visible over video, very subtle) */}
      <div
        ref={bgLetterRef}
        className="absolute right-0 top-1/2 font-serif font-bold leading-none text-foreground select-none pointer-events-none z-10"
        style={{
          fontSize: "clamp(8rem, 28vw, 36rem)",
          letterSpacing: "-0.05em",
          opacity: 0.08,
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
