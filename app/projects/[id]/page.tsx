"use client"

import { use } from "react"
import { notFound } from "next/navigation"
import Link from "next/link"
import { useRef, useEffect, useState } from "react"
import projectsData from "@/data/projects.json"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"

// ── Reveal helper ──────────────────────────────────────────────────────────────
function Reveal({
  children,
  delay = 0,
  className = "",
  direction = "up",
}: {
  children: React.ReactNode
  delay?: number
  className?: string
  direction?: "up" | "left" | "right"
}) {
  const ref = useRef<HTMLDivElement>(null)
  useEffect(() => {
    const el = ref.current
    if (!el) return
    const transforms: Record<string, string> = {
      up: "translateY(48px)",
      left: "translateX(-48px)",
      right: "translateX(48px)",
    }
    el.style.opacity = "0"
    el.style.transform = transforms[direction]
    const t = setTimeout(() => {
      el.style.transition = `opacity 0.9s cubic-bezier(0.16,1,0.3,1) ${delay}ms, transform 0.9s cubic-bezier(0.16,1,0.3,1) ${delay}ms`
      el.style.opacity = "1"
      el.style.transform = "translate(0)"
    }, 50)
    return () => clearTimeout(t)
  }, [delay, direction])
  return <div ref={ref} className={className}>{children}</div>
}

// ── InView helper ──────────────────────────────────────────────────────────────
function useInView(threshold = 0.15) {
  const ref = useRef<HTMLDivElement>(null)
  const [inView, setInView] = useState(false)
  useEffect(() => {
    const el = ref.current
    if (!el) return
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setInView(true); obs.disconnect() } },
      { threshold }
    )
    obs.observe(el)
    return () => obs.disconnect()
  }, [threshold])
  return { ref, inView }
}

// ── Page ───────────────────────────────────────────────────────────────────────
export default function ProjectPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params)
  const index = projectsData.findIndex((p) => p.slug === id)
  if (index === -1) notFound()

  const project = projectsData[index]
  const prev = projectsData[index - 1] ?? null
  const next = projectsData[index + 1] ?? null

  return (
    <>
      <Navbar />
      <main className="bg-background text-foreground">

        {/* ── HERO: фон (heroImage) + главное изображение (coverImage) ── */}
        <section className="relative isolate z-0 flex min-h-[85vh] flex-col justify-end overflow-hidden md:min-h-[88vh]">
          <div className="pointer-events-none absolute inset-0 z-0 min-h-full w-full">
            <img
              src={project.heroImage}
              alt=""
              aria-hidden="true"
              className="absolute inset-0 h-full w-full scale-105 object-cover"
              style={{ animation: "heroZoom 8s ease-out forwards" }}
            />
            <div
              className="absolute inset-0 bg-gradient-to-t from-foreground/85 via-foreground/50 to-foreground/35"
              aria-hidden="true"
            />
            <div
              className="absolute inset-0 opacity-[0.06]"
              aria-hidden="true"
              style={{
                backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
                backgroundRepeat: "repeat",
                backgroundSize: "128px 128px",
              }}
            />
            <div
              className="absolute inset-0 bg-gradient-to-br from-brand/10 via-transparent to-transparent"
              aria-hidden="true"
            />
            <div
              className="absolute bottom-0 left-0 right-0 h-1 bg-brand"
              aria-hidden="true"
              style={{ boxShadow: "0 0 24px 4px rgba(101,179,55,0.6)" }}
            />
          </div>

          <div className="relative z-20 mx-auto grid w-full max-w-screen-2xl grid-cols-1 gap-10 px-8 pb-16 pt-32 md:pt-40 lg:grid-cols-12 lg:items-end lg:gap-x-12 lg:gap-y-0">
            <div className="lg:col-span-7">
              <Reveal delay={100}>
                <nav aria-label="Breadcrumb" className="mb-8">
                  <ol className="flex flex-wrap items-center gap-2 text-xs tracking-widest text-white/50 uppercase">
                    <li>
                      <Link href="/" className="transition-colors duration-200 hover:text-brand">
                        Главная
                      </Link>
                    </li>
                    <li aria-hidden="true" className="text-white/30">
                      /
                    </li>
                    <li>
                      <Link href="/#work" className="transition-colors duration-200 hover:text-brand">
                        Проекты
                      </Link>
                    </li>
                    <li aria-hidden="true" className="text-white/30">
                      /
                    </li>
                    <li className="text-white">{project.title}</li>
                  </ol>
                </nav>
              </Reveal>

              <Reveal delay={200}>
                <div className="mb-6 inline-flex items-center gap-2">
                  <span className="h-2 w-2 rounded-full bg-brand brand-pulse" aria-hidden="true" />
                  <p className="text-xs font-medium tracking-[0.3em] text-brand uppercase">{project.category}</p>
                </div>
              </Reveal>

              <div className="overflow-hidden">
                <Reveal delay={350}>
                  <h1
                    className="font-serif leading-none font-bold text-white"
                    style={{ fontSize: "clamp(3rem, 10vw, 10rem)", letterSpacing: "-0.02em" }}
                  >
                    {project.title}
                  </h1>
                </Reveal>
              </div>
            </div>

            <div className="lg:col-span-5">
              <Reveal delay={450} direction="right">
                <figure className="relative mx-auto w-full max-w-lg lg:mx-0 lg:max-w-none">
                  <div className="relative aspect-4/3 overflow-hidden rounded-lg border border-white/20 bg-white/5 shadow-2xl ring-1 ring-white/10">
                    <img
                      src={project.coverImage}
                      alt={`${project.title} — ключевой визуал проекта`}
                      className="h-full w-full object-cover transition-transform duration-700 ease-out hover:scale-[1.02]"
                      width={1200}
                      height={900}
                      loading="eager"
                    />
                    <div
                      className="pointer-events-none absolute inset-0 bg-gradient-to-t from-foreground/20 to-transparent"
                      aria-hidden="true"
                    />
                  </div>
                  <figcaption className="mt-3 text-xs tracking-wider text-white/45 uppercase">
                    Ключевой кадр
                  </figcaption>
                </figure>
              </Reveal>
            </div>
          </div>
        </section>

        {/* ── META ROW ── */}
        <MetaRow project={project} />

        {/* ── SUMMARY + CHALLENGE / SOLUTION ── */}
        <SummarySection project={project} />

        {/* ── GALLERY ── */}
        <GallerySection project={project} />

        {/* ── RESULTS ── */}
        <ResultsSection project={project} />

        {/* ── NEXT / PREV ── */}
        <NavSection prev={prev} next={next} />

        {/* ── CTA ── */}
        <CtaSection />

        <Footer />
      </main>

      <style jsx global>{`
        @keyframes heroZoom {
          from { transform: scale(1.05); }
          to   { transform: scale(1); }
        }
      `}</style>
    </>
  )
}

// ── Sub-components ─────────────────────────────────────────────────────────────

function MetaRow({ project }: { project: typeof projectsData[0] }) {
  const { ref, inView } = useInView()
  return (
    <section className="border-b border-border overflow-hidden" ref={ref}>
      <div
        className="px-8 max-w-screen-2xl mx-auto py-10 grid grid-cols-2 md:grid-cols-4 gap-8"
        style={{
          opacity: inView ? 1 : 0,
          transform: inView ? "translateY(0)" : "translateY(32px)",
          transition: "opacity 0.7s ease, transform 0.7s ease",
        }}
      >
        {[
          { label: "Клиент", content: <p className="text-foreground font-medium">{project.client}</p> },
          { label: "Год",    content: <p className="text-foreground font-medium">{project.year}</p> },
          { label: "Категория", content: <p className="text-foreground font-medium">{project.category}</p> },
          {
            label: "Услуги",
            content: (
              <div className="flex flex-wrap gap-1.5">
                {project.services.map((s) => (
                  <span key={s} className="text-xs tracking-wider px-2 py-0.5 bg-brand/10 border border-brand text-brand">
                    {s}
                  </span>
                ))}
              </div>
            ),
          },
        ].map(({ label, content }, i) => (
          <div
            key={label}
            style={{
              opacity: inView ? 1 : 0,
              transform: inView ? "translateY(0)" : "translateY(20px)",
              transition: `opacity 0.6s ease ${i * 80}ms, transform 0.6s ease ${i * 80}ms`,
            }}
          >
            <p className="text-xs tracking-widest uppercase text-muted-foreground mb-2">{label}</p>
            {content}
          </div>
        ))}
      </div>
    </section>
  )
}

function SummarySection({ project }: { project: typeof projectsData[0] }) {
  const { ref: summaryRef, inView: summaryInView } = useInView()
  const { ref: colRef, inView: colInView } = useInView()

  return (
    <section className="px-8 max-w-screen-2xl mx-auto py-24">
      {/* Summary quote */}
      <div
        ref={summaryRef as React.RefObject<HTMLDivElement>}
        className="mb-20 max-w-4xl relative"
        style={{
          opacity: summaryInView ? 1 : 0,
          transform: summaryInView ? "translateY(0)" : "translateY(40px)",
          transition: "opacity 0.9s ease, transform 0.9s ease",
        }}
      >
        {/* Big decorative green quote */}
        <span
          className="absolute -top-8 -left-4 font-serif text-9xl text-brand/15 leading-none select-none pointer-events-none"
          aria-hidden="true"
        >
          &ldquo;
        </span>
        <p
          className="font-serif font-bold text-foreground leading-snug relative z-10"
          style={{ fontSize: "clamp(1.5rem, 3.5vw, 3rem)" }}
        >
          {project.summary}
        </p>
        {/* Brand accent line below */}
        <div
          className="mt-8 h-px bg-brand origin-left"
          style={{
            width: summaryInView ? "5rem" : "0",
            transition: "width 0.8s cubic-bezier(0.16,1,0.3,1) 0.4s",
          }}
        />
      </div>

      {/* Two columns */}
      <div
        ref={colRef as React.RefObject<HTMLDivElement>}
        className="grid grid-cols-1 md:grid-cols-2 gap-16 border-t border-border pt-16"
      >
        {[
          { key: "Задача", text: project.challenge },
          { key: "Решение", text: project.solution },
        ].map(({ key, text }, i) => (
          <div
            key={key}
            style={{
              opacity: colInView ? 1 : 0,
              transform: colInView ? "translateX(0)" : `translateX(${i === 0 ? "-" : ""}40px)`,
              transition: `opacity 0.8s ease ${i * 120}ms, transform 0.8s ease ${i * 120}ms`,
            }}
          >
            <div className="flex items-center gap-3 mb-6">
              <span className="w-1.5 h-1.5 rounded-full bg-brand flex-shrink-0" aria-hidden="true" />
              <p className="text-xs tracking-[0.25em] uppercase text-brand font-medium">{key}</p>
            </div>
            <p className="text-base leading-relaxed text-muted-foreground">{text}</p>
          </div>
        ))}
      </div>
    </section>
  )
}

function GallerySection({ project }: { project: typeof projectsData[0] }) {
  const { ref, inView } = useInView(0.1)
  return (
    <section className="px-8 max-w-screen-2xl mx-auto pb-24" ref={ref}>
      <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
        {project.gallery.map((src, i) => {
          const isWide = i === 0
          return (
            <div
              key={i}
              className={`group overflow-hidden bg-card ${isWide ? "md:col-span-8" : "md:col-span-4"}`}
              style={{
                opacity: inView ? 1 : 0,
                transform: inView ? "translateY(0)" : "translateY(40px)",
                transition: `opacity 0.7s ease ${i * 100}ms, transform 0.7s ease ${i * 100}ms`,
              }}
            >
              <div className="relative overflow-hidden aspect-[4/3]">
                <img
                  src={src}
                  alt={`${project.title} — изображение ${i + 1}`}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                />
                {/* Brand overlay on hover */}
                <div className="absolute inset-0 bg-brand/0 group-hover:bg-brand/10 transition-colors duration-500" />
              </div>
            </div>
          )
        })}
      </div>
    </section>
  )
}

function ResultsSection({ project }: { project: typeof projectsData[0] }) {
  const { ref, inView } = useInView()
  return (
    <section className="bg-foreground text-background" ref={ref}>
      <div className="px-8 max-w-screen-2xl mx-auto py-24">
        {/* Section label */}
        <div
          className="flex items-center gap-4 mb-16"
          style={{
            opacity: inView ? 1 : 0,
            transform: inView ? "translateY(0)" : "translateY(24px)",
            transition: "opacity 0.7s ease, transform 0.7s ease",
          }}
        >
          <div className="h-px w-12 bg-brand" />
          <p className="text-xs tracking-[0.3em] uppercase text-brand font-medium">Результаты</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {project.results.map((result, i) => (
            <div
              key={i}
              className="group flex flex-col gap-4 border-t border-white/10 pt-6 hover:border-brand transition-colors duration-500"
              style={{
                opacity: inView ? 1 : 0,
                transform: inView ? "translateY(0)" : "translateY(40px)",
                transition: `opacity 0.7s ease ${200 + i * 120}ms, transform 0.7s ease ${200 + i * 120}ms`,
              }}
            >
              <span
                className="font-serif font-bold text-brand group-hover:text-brand/80 transition-colors duration-300"
                style={{ fontSize: "clamp(2.5rem, 5vw, 5rem)", lineHeight: 1 }}
                aria-hidden="true"
              >
                0{i + 1}
              </span>
              <p className="text-base leading-relaxed text-background/80">{result}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

function NavSection({
  prev,
  next,
}: {
  prev: typeof projectsData[0] | null
  next: typeof projectsData[0] | null
}) {
  const { ref, inView } = useInView()
  return (
    <section className="border-t border-border" ref={ref}>
      <div
        className="px-8 max-w-screen-2xl mx-auto py-16 flex items-center justify-between gap-8"
        style={{
          opacity: inView ? 1 : 0,
          transition: "opacity 0.7s ease",
        }}
      >
        {prev ? (
          <Link href={`/projects/${prev.slug}`} className="group flex flex-col gap-2">
            <span className="inline-flex items-center gap-2 text-xs tracking-widest uppercase text-muted-foreground group-hover:text-brand transition-colors duration-300">
              <span className="block w-6 h-px bg-muted-foreground group-hover:w-10 group-hover:bg-brand transition-all duration-300" />
              Предыдущий
            </span>
            <span className="font-serif font-bold text-foreground text-2xl md:text-4xl group-hover:text-brand transition-colors duration-300">
              {prev.title}
            </span>
          </Link>
        ) : <div />}

        {next ? (
          <Link href={`/projects/${next.slug}`} className="group flex flex-col gap-2 items-end text-right">
            <span className="inline-flex items-center gap-2 text-xs tracking-widest uppercase text-muted-foreground group-hover:text-brand transition-colors duration-300">
              Следующий
              <span className="block w-6 h-px bg-muted-foreground group-hover:w-10 group-hover:bg-brand transition-all duration-300" />
            </span>
            <span className="font-serif font-bold text-foreground text-2xl md:text-4xl group-hover:text-brand transition-colors duration-300">
              {next.title}
            </span>
          </Link>
        ) : <div />}
      </div>
    </section>
  )
}

function CtaSection() {
  const { ref, inView } = useInView()
  return (
    <section
      className="px-8 max-w-screen-2xl mx-auto py-32 text-center border-t border-border"
      ref={ref}
    >
      <div
        style={{
          opacity: inView ? 1 : 0,
          transform: inView ? "translateY(0)" : "translateY(40px)",
          transition: "opacity 0.9s ease, transform 0.9s ease",
        }}
      >
        <p className="text-xs tracking-[0.3em] uppercase text-brand mb-6 font-medium">
          Готовы к следующему шагу?
        </p>
        <h2
          className="font-serif font-bold text-foreground leading-none mb-4"
          style={{ fontSize: "clamp(2.5rem, 7vw, 7rem)", letterSpacing: "-0.02em" }}
        >
          Начать <span className="text-brand italic">проект</span>
        </h2>
        {/* Brand underline */}
        <div
          className="mx-auto mb-12 h-1 bg-brand"
          style={{
            width: inView ? "4rem" : "0",
            transition: "width 0.8s cubic-bezier(0.16,1,0.3,1) 0.4s",
          }}
        />
        <Link
          href="/#contact"
          className="group inline-flex items-center gap-3 text-sm tracking-widest uppercase bg-brand text-brand-foreground px-10 py-4 hover:bg-foreground hover:text-background transition-all duration-300"
        >
          Обсудить задачу
          <span className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform duration-300">↗</span>
        </Link>
      </div>
    </section>
  )
}
