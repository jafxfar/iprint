import { notFound } from "next/navigation"
import Link from "next/link"
import type { Metadata } from "next"
import projects from "@/data/projects.json"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"

interface Props {
  params: Promise<{ id: string }>
}

export async function generateStaticParams() {
  return projects.map((p) => ({ id: p.slug }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params
  const project = projects.find((p) => p.slug === id)
  if (!project) return {}
  return {
    title: `${project.title} — IPrint`,
    description: project.summary,
  }
}

export default async function ProjectPage({ params }: Props) {
  const { id } = await params
  const index = projects.findIndex((p) => p.slug === id)
  if (index === -1) notFound()

  const project = projects[index]
  const prev = projects[index - 1] ?? null
  const next = projects[index + 1] ?? null

  return (
    <>
      <Navbar />
      <main className="bg-background text-foreground">

        {/* ── HERO ── */}
        <section className="relative min-h-[70vh] flex flex-col justify-end overflow-hidden">
          {/* Hero image */}
          <div className="absolute inset-0 -z-10">
            <img
              src={project.heroImage}
              alt={project.title}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-foreground/60" />
          </div>

          {/* Content */}
          <div className="relative z-10 px-8 max-w-screen-2xl mx-auto w-full pb-16 pt-40">
            {/* Breadcrumb */}
            <nav aria-label="Breadcrumb" className="mb-8">
              <ol className="flex items-center gap-2 text-xs tracking-widest uppercase text-white/50">
                <li>
                  <Link href="/" className="hover:text-white transition-colors duration-200">
                    Главная
                  </Link>
                </li>
                <li aria-hidden="true">/</li>
                <li>
                  <Link href="/#work" className="hover:text-white transition-colors duration-200">
                    Проекты
                  </Link>
                </li>
                <li aria-hidden="true">/</li>
                <li className="text-white">{project.title}</li>
              </ol>
            </nav>

            {/* Category */}
            <p className="text-xs tracking-[0.3em] uppercase text-brand mb-4">
              {project.category}
            </p>

            {/* Title */}
            <h1
              className="font-serif font-bold text-white leading-none"
              style={{ fontSize: "clamp(3rem, 10vw, 10rem)", letterSpacing: "-0.02em" }}
            >
              {project.title}
            </h1>
          </div>
        </section>

        {/* ── META ROW ── */}
        <section className="border-b border-border">
          <div className="px-8 max-w-screen-2xl mx-auto py-10 grid grid-cols-2 md:grid-cols-4 gap-8">
            <div>
              <p className="text-xs tracking-widest uppercase text-muted-foreground mb-2">Клиент</p>
              <p className="text-foreground font-medium">{project.client}</p>
            </div>
            <div>
              <p className="text-xs tracking-widest uppercase text-muted-foreground mb-2">Год</p>
              <p className="text-foreground font-medium">{project.year}</p>
            </div>
            <div>
              <p className="text-xs tracking-widest uppercase text-muted-foreground mb-2">Категория</p>
              <p className="text-foreground font-medium">{project.category}</p>
            </div>
            <div>
              <p className="text-xs tracking-widest uppercase text-muted-foreground mb-2">Услуги</p>
              <div className="flex flex-wrap gap-1.5">
                {project.services.map((s) => (
                  <span
                    key={s}
                    className="text-xs tracking-wider px-2 py-0.5 border border-brand text-brand"
                  >
                    {s}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ── SUMMARY + CHALLENGE / SOLUTION ── */}
        <section className="px-8 max-w-screen-2xl mx-auto py-24">
          {/* Summary */}
          <div className="mb-20 max-w-3xl">
            <p
              className="font-serif font-bold text-foreground leading-snug"
              style={{ fontSize: "clamp(1.5rem, 3.5vw, 3rem)" }}
            >
              {project.summary}
            </p>
          </div>

          {/* Two columns */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16 border-t border-border pt-16">
            <div>
              <p className="text-xs tracking-[0.25em] uppercase text-brand mb-6">
                Задача
              </p>
              <p className="text-base leading-relaxed text-muted-foreground">
                {project.challenge}
              </p>
            </div>
            <div>
              <p className="text-xs tracking-[0.25em] uppercase text-brand mb-6">
                Решение
              </p>
              <p className="text-base leading-relaxed text-muted-foreground">
                {project.solution}
              </p>
            </div>
          </div>
        </section>

        {/* ── GALLERY ── */}
        <section className="px-8 max-w-screen-2xl mx-auto pb-24">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
            {project.gallery.map((src, i) => {
              const isWide = i === 0
              return (
                <div
                  key={i}
                  className={`overflow-hidden bg-card ${isWide ? "md:col-span-8" : "md:col-span-4"}`}
                >
                  <img
                    src={src}
                    alt={`${project.title} — изображение ${i + 1}`}
                    className="w-full h-full object-cover aspect-[4/3] hover:scale-105 transition-transform duration-700"
                  />
                </div>
              )
            })}
          </div>
        </section>

        {/* ── RESULTS ── */}
        <section className="bg-foreground text-background">
          <div className="px-8 max-w-screen-2xl mx-auto py-24">
            <p className="text-xs tracking-[0.3em] uppercase text-brand mb-12">
              Результаты
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
              {project.results.map((result, i) => (
                <div key={i} className="flex flex-col gap-4 border-t border-white/10 pt-6">
                  <span
                    className="font-serif font-bold text-brand"
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

        {/* ── NEXT / PREV ── */}
        <section className="border-t border-border">
          <div className="px-8 max-w-screen-2xl mx-auto py-16 flex items-center justify-between gap-8">
            {prev ? (
              <Link
                href={`/projects/${prev.slug}`}
                className="group flex flex-col gap-2"
              >
                <span className="text-xs tracking-widest uppercase text-muted-foreground group-hover:text-brand transition-colors duration-300">
                  ← Предыдущий
                </span>
                <span className="font-serif font-bold text-foreground text-2xl md:text-4xl group-hover:text-brand transition-colors duration-300">
                  {prev.title}
                </span>
              </Link>
            ) : (
              <div />
            )}

            {next ? (
              <Link
                href={`/projects/${next.slug}`}
                className="group flex flex-col gap-2 items-end text-right"
              >
                <span className="text-xs tracking-widest uppercase text-muted-foreground group-hover:text-brand transition-colors duration-300">
                  Следующий →
                </span>
                <span className="font-serif font-bold text-foreground text-2xl md:text-4xl group-hover:text-brand transition-colors duration-300">
                  {next.title}
                </span>
              </Link>
            ) : (
              <div />
            )}
          </div>
        </section>

        {/* ── CTA ── */}
        <section className="px-8 max-w-screen-2xl mx-auto py-24 text-center border-t border-border">
          <p className="text-xs tracking-[0.3em] uppercase text-muted-foreground mb-6">
            Готовы к следующему шагу?
          </p>
          <h2
            className="font-serif font-bold text-foreground leading-none mb-12"
            style={{ fontSize: "clamp(2.5rem, 7vw, 7rem)", letterSpacing: "-0.02em" }}
          >
            Начать проект
          </h2>
          <Link
            href="/#contact"
            className="inline-flex items-center gap-3 text-sm tracking-widest uppercase bg-brand text-brand-foreground px-10 py-4 hover:bg-foreground hover:text-background transition-all duration-300"
          >
            Обсудить задачу
            <span>↗</span>
          </Link>
        </section>

        <Footer />
      </main>
    </>
  )
}
