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

/**
 * Скорость = размер файла / канал пользователя. «Локально» в dev это тот же HTTP, что и URL:
 * байты те же. В проде `public/*` на Vercel идёт с CDN — это уже «веб».
 * Ускорение: сжать ролик (720p, ~2–4 Mbps), отдельный лёгкий клип для mobile + `media`,
 * или `NEXT_PUBLIC_HERO_VIDEO_PRELOAD=metadata` — меньше фоновой загрузки до старта.
 */
const HERO_VIDEO_FALLBACK = "/bg.mp4"
/** Страница ролика на Pexels (атрибуция + скачивание «Free download»). */
const HERO_VIDEO_PEXELS_PAGE =
  "https://www.pexels.com/video/elegant-digital-flow-with-minimalist-waves-34645742/"

const isHeroVideoDebug =
  process.env.NODE_ENV === "development" || process.env.NEXT_PUBLIC_DEBUG_HERO_VIDEO === "1"

const logHeroVideo = (...parts: unknown[]) => {
  if (!isHeroVideoDebug) return
  console.warn("[Hero video]", ...parts)
}

const getHeroVideoSnapshot = (v: HTMLVideoElement) => ({
  currentSrc: v.currentSrc || v.src || "(пусто)",
  readyState: v.readyState,
  networkState: v.networkState,
  paused: v.paused,
  muted: v.muted,
  error: v.error
    ? { code: v.error.code, message: v.error.message || describeMediaErrorCode(v.error.code) }
    : null,
})

const describeMediaErrorCode = (code: number) => {
  switch (code) {
    case 1:
      return "MEDIA_ERR_ABORTED"
    case 2:
      return "MEDIA_ERR_NETWORK"
    case 3:
      return "MEDIA_ERR_DECODE"
    case 4:
      return "MEDIA_ERR_SRC_NOT_SUPPORTED"
    default:
      return "UNKNOWN"
  }
}

const heroVideoPrimary =
  typeof process.env.NEXT_PUBLIC_HERO_VIDEO_SRC === "string" &&
  process.env.NEXT_PUBLIC_HERO_VIDEO_SRC.trim().length > 0
    ? process.env.NEXT_PUBLIC_HERO_VIDEO_SRC.trim()
    : HERO_VIDEO_FALLBACK

const heroVideoUseLocalFallback =
  heroVideoPrimary !== HERO_VIDEO_FALLBACK

const heroVideoMobile =
  typeof process.env.NEXT_PUBLIC_HERO_VIDEO_SRC_MOBILE === "string" &&
  process.env.NEXT_PUBLIC_HERO_VIDEO_SRC_MOBILE.trim().length > 0
    ? process.env.NEXT_PUBLIC_HERO_VIDEO_SRC_MOBILE.trim()
    : ""

const rawPreload =
  typeof process.env.NEXT_PUBLIC_HERO_VIDEO_PRELOAD === "string"
    ? process.env.NEXT_PUBLIC_HERO_VIDEO_PRELOAD.trim().toLowerCase()
    : ""
const heroVideoPreload: "auto" | "metadata" | "none" =
  rawPreload === "auto" || rawPreload === "none" || rawPreload === "metadata" ? rawPreload : "metadata"

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

  // Autoplay: call play() after media is ready (early play() often fails silently)
  useEffect(() => {
    const vid = videoRef.current
    if (!vid) return

    const kickPlayback = (reason: string) => {
      vid.muted = true
      vid.defaultMuted = true
      vid.loop = true
      vid.playsInline = true
      void vid.play().catch((err: unknown) => {
        logHeroVideo(`play() отклонён (${reason})`, err, getHeroVideoSnapshot(vid))
      })
    }

    logHeroVideo("инициализация", getHeroVideoSnapshot(vid), { primary: heroVideoPrimary, fallback: heroVideoUseLocalFallback })
    kickPlayback("mount")

    const onReady = () => kickPlayback("loadeddata|canplay|canplaythrough")
    vid.addEventListener("loadeddata", onReady)
    vid.addEventListener("canplay", onReady)
    vid.addEventListener("canplaythrough", onReady)

    const onVisibility = () => {
      if (document.visibilityState === "visible" && vid.paused) kickPlayback("visibilitychange")
    }
    document.addEventListener("visibilitychange", onVisibility)

    const onEnded = () => {
      if (!vid.loop) return
      vid.currentTime = 0
      void vid.play().catch((err: unknown) => logHeroVideo("play() после ended", err, getHeroVideoSnapshot(vid)))
    }
    vid.addEventListener("ended", onEnded)

    return () => {
      vid.removeEventListener("loadeddata", onReady)
      vid.removeEventListener("canplay", onReady)
      vid.removeEventListener("canplaythrough", onReady)
      document.removeEventListener("visibilitychange", onVisibility)
      vid.removeEventListener("ended", onEnded)
    }
  }, [])

  return (
    <section className="relative isolate z-0 min-h-screen flex flex-col justify-between pt-32 pb-16 overflow-hidden">

      {/* ── VIDEO BACKGROUND ──
          Не используйте -z-10: слой уходит под непрозрачный bg-background у <main> и видео не видно. */}
      <div className="absolute inset-0 z-0 min-h-full w-full">
        {/* Light overlay so text stays readable over video */}
        <div className="absolute inset-0 z-10 bg-white/65" />
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
            className="absolute inset-0 z-0 h-full w-full object-cover"
            style={{
              opacity: videoLoaded ? 1 : 0,
              transition: "opacity 1.2s ease",
            }}
            autoPlay
            muted
            playsInline
            loop
            preload={heroVideoPreload}
            onLoadedMetadata={() => {
              logHeroVideo("loadedmetadata", videoRef.current && getHeroVideoSnapshot(videoRef.current))
              setVideoLoaded(true)
            }}
            onLoadedData={() => {
              logHeroVideo("loadeddata", videoRef.current && getHeroVideoSnapshot(videoRef.current))
              setVideoLoaded(true)
            }}
            onCanPlay={() => {
              logHeroVideo("canplay", videoRef.current && getHeroVideoSnapshot(videoRef.current))
              setVideoLoaded(true)
            }}
            onPlaying={() => {
              logHeroVideo("playing — воспроизведение идёт", videoRef.current && getHeroVideoSnapshot(videoRef.current))
              setVideoLoaded(true)
            }}
            onWaiting={() => logHeroVideo("waiting — не хватает данных в буфере")}
            onStalled={() => logHeroVideo("stalled — загрузка остановилась")}
            onAbort={() => logHeroVideo("abort — загрузка прервана")}
            onError={(e) => {
              const v = e.currentTarget
              logHeroVideo("событие error — см. error.code / networkState", getHeroVideoSnapshot(v))
              setVideoError(true)
            }}
          >
            {heroVideoMobile ? (
              <source src={heroVideoMobile} type="video/mp4" media="(max-width: 768px)" />
            ) : null}
            <source src={heroVideoPrimary} type="video/mp4" />
            {heroVideoUseLocalFallback ? <source src={HERO_VIDEO_FALLBACK} type="video/mp4" /> : null}
          </video>
        )}

        {/* Fallback for when video hasn't loaded yet */}
        <div
          className="absolute inset-0 z-1 bg-background"
          style={{
            opacity: videoLoaded ? 0 : 1,
            transition: "opacity 1.2s ease",
            pointerEvents: "none",
          }}
          aria-hidden="true"
        />
      </div>

      {/* ── CONTENT ── */}
      <div className="relative z-20 px-8 max-w-screen-2xl mx-auto w-full flex flex-col min-h-screen justify-between">
        {/* Top row */}
        <Reveal delay={200} className="flex items-start justify-between">
          <p className="text-xs tracking-[0.25em] uppercase text-muted-foreground">
            С 2014 года — Худжанд
          </p>
          <p className="text-xs tracking-[0.25em] uppercase text-muted-foreground text-right">
            Типография и рекламное агентство
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
                  Ваше преимущество 
                </h1>
              </Reveal>
            </div>
            <div className="overflow-hidden">
              <Reveal delay={500}>
                <h1
                  className="font-serif font-bold leading-none"
                  style={{ fontSize: "clamp(3.5rem, 12vw, 14rem)", letterSpacing: "-0.02em" }}
                >
                  <span className="text-brand italic">в дизайне</span>
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
                className="group inline-flex items-center gap-3 text-sm tracking-widest uppercase text-foreground self-start md:self-auto hover:text-brand transition-colors duration-300"
              >
                <span className="h-px w-12 bg-foreground group-hover:w-20 group-hover:bg-brand transition-all duration-500" />
                Наши проекты
              </a>
            </Reveal>
          </div>
        </div>

        {/* Bottom stats row */}
        <Reveal delay={900} className="flex flex-col gap-4 pt-12 border-t border-brand/30 md:flex-row md:items-end md:justify-between">
          <div className="flex flex-col gap-4">
            <div className="flex gap-12">
              {[
                { num: "22+", label: "лет" },
                { num: "1000+", label: "проектов" },
                { num: "99%", label: "удовлетворенных клиентов" },
              ].map(({ num, label }, i) => (
                <div
                  key={label}
                  className="animate-count-up"
                  style={{ animationDelay: `${900 + i * 120}ms` }}
                >
                  <p className="font-serif font-bold text-3xl text-brand">{num}</p>
                  <p className="text-xs tracking-widest uppercase text-muted-foreground mt-1">{label}</p>
                </div>
              ))}
            </div>
            {/* <p className="text-[10px] tracking-wide text-muted-foreground/80 max-w-md">
              Фоновое видео:{" "}
              <a
                href={HERO_VIDEO_PEXELS_PAGE}
                target="_blank"
                rel="noopener noreferrer"
                className="underline decoration-muted-foreground/50 underline-offset-2 hover:text-brand hover:decoration-brand"
              >
                Pexels — Elegant digital flow with minimalist waves
              </a>
              . Скачайте MP4 с Pexels и положите как{" "}
              <code className="rounded bg-muted/60 px-1 py-0.5 text-[9px]">public/bg.mp4</code>
              {" "}или задайте{" "}
              <code className="rounded bg-muted/60 px-1 py-0.5 text-[9px]">NEXT_PUBLIC_HERO_VIDEO_SRC</code>
              {" "}(прямая ссылка на файл из Network). Для узких экранов —{" "}
              <code className="rounded bg-muted/60 px-1 py-0.5 text-[9px]">NEXT_PUBLIC_HERO_VIDEO_SRC_MOBILE</code>
              {", "}
              <code className="rounded bg-muted/60 px-1 py-0.5 text-[9px]">NEXT_PUBLIC_HERO_VIDEO_PRELOAD</code>
              {" "}(metadata | auto | none).
            </p> */}
          </div>
          {/* Brand scroll indicator */}
          <a
            href="#work"
            aria-label="Прокрутить вниз"
            className="hidden md:flex flex-col items-center gap-2 text-brand hover:opacity-70 transition-opacity duration-300"
          >
            <span className="text-xs tracking-widest uppercase text-brand">Scroll</span>
            <span
              className="block w-px h-12 bg-brand origin-top"
              style={{ animation: "scrollPulse 1.8s ease-in-out infinite" }}
            />
          </a>
        </Reveal>
      </div>

      {/* Decorative parallax watermark */}
      <div
        ref={bgLetterRef}
        className="pointer-events-none absolute right-0 top-1/2 z-15 flex select-none items-center justify-end"
        style={{
          height: "clamp(6.4rem, 22.4vw, 28.8rem)",
          width: "clamp(6.4rem, 22.4vw, 28.8rem)",
          opacity: 0.08,
          transform: "translateY(-50%)",
          transition: "transform 0.05s linear",
        }}
        aria-hidden="true"
      >
        <svg
          viewBox="0 0 24 24"
          className="h-full w-full shrink-0"
          fill="#86868b"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M18.71,19.5C17.88,20.74 17,21.95 15.66,21.97C14.32,22 13.89,21.18 12.37,21.18C10.84,21.18 10.37,21.95 9.1,21.97C7.79,22 6.8,20.68 5.96,19.47C4.25,17 2.94,12.45 4.7,9.39C5.57,7.87 7.13,6.91 8.82,6.88C10.1,6.86 11.32,7.75 12.11,7.75C12.89,7.75 14.37,6.68 15.92,6.84C16.57,6.87 18.39,7.1 19.56,8.82C19.47,8.88 17.39,10.1 17.41,12.63C17.44,15.65 20.06,16.66 20.09,16.67C20.06,16.74 19.67,18.11 18.71,19.5M13,3.5C13.73,2.67 14.94,2.04 15.94,2C16.06,3.17 15.62,4.31 14.92,5.08C14.26,5.92 13.06,6.61 11.93,6.53C11.76,5.43 12.37,4.43 13,3.5Z" />
        </svg>
      </div>
    </section>
  )
}
