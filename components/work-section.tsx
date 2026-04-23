"use client"

import { useState } from "react"
import Link from "next/link"
import { useInView } from "@/hooks/use-in-view"

const projects = [
  {
    id: "01",
    slug: "vella",
    title: "Vella",
    category: "Brand Identity & Strategy",
    tags: ["Retail", "Identity"],
    color: "bg-warm",
    textColor: "text-warm-foreground",
    size: "large",
    img: "/placeholder.svg?width=900&height=600",
  },
  {
    id: "02",
    slug: "meridian",
    title: "Meridian",
    category: "Digital Campaign",
    tags: ["Finance", "Campaign"],
    color: "bg-secondary",
    textColor: "text-foreground",
    size: "small",
    img: "/placeholder.svg?width=600&height=600",
  },
  {
    id: "03",
    slug: "aura-health",
    title: "Aura Health",
    category: "Product Design & Motion",
    tags: ["Health", "Product"],
    color: "bg-card",
    textColor: "text-foreground",
    size: "small",
    img: "/placeholder.svg?width=600&height=600",
  },
  {
    id: "04",
    slug: "kronos",
    title: "Kronos",
    category: "AI Strategy & Brand",
    tags: ["Tech", "AI"],
    color: "bg-secondary",
    textColor: "text-foreground",
    size: "large",
    img: "/placeholder.svg?width=900&height=600",
  },
  {
    id: "05",
    slug: "novus-collective",
    title: "Novus Collective",
    category: "Content & Identity",
    tags: ["Fashion", "Content"],
    color: "bg-card",
    textColor: "text-foreground",
    size: "small",
    img: "/placeholder.svg?width=600&height=600",
  },
  {
    id: "06",
    slug: "pulse-media",
    title: "Pulse Media",
    category: "Growth Marketing",
    tags: ["Media", "Growth"],
    color: "bg-warm",
    textColor: "text-warm-foreground",
    size: "small",
    img: "/placeholder.svg?width=600&height=600",
  },
]

const filters = ["All", "Identity", "Campaign", "Product", "AI", "Content"]

export function WorkSection() {
  const [active, setActive] = useState("All")
  const { ref: headerRef, inView: headerInView } = useInView()

  const filtered =
    active === "All"
      ? projects
      : projects.filter((p) => p.tags.some((t) => t === active))

  return (
    <section id="work" className="py-24 px-8 max-w-screen-2xl mx-auto">
      {/* Header */}
      <div
        ref={headerRef as React.RefObject<HTMLDivElement>}
        className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-16 border-b border-border pb-8 transition-all duration-900"
        style={{
          opacity: headerInView ? 1 : 0,
          transform: headerInView ? "translateY(0)" : "translateY(40px)",
          transitionDuration: "800ms",
        }}
      >
        
          <h2
            className="font-serif font-bold text-foreground leading-none"
            style={{ fontSize: "clamp(2.5rem, 6vw, 6rem)", letterSpacing: "-0.02em" }}
          >
            Наши <span className="text-brand italic">проекты</span>
          </h2>
        

        {/* Filters */}
        <div className="flex flex-wrap gap-2">
          {filters.map((f) => (
            <button
              key={f}
              onClick={() => setActive(f)}
              className={`text-xs tracking-widest uppercase px-4 py-2 border transition-all duration-300 ${
                active === f
                  ? "bg-brand text-brand-foreground border-brand"
                  : "border-border text-muted-foreground hover:border-brand hover:text-brand"
              }`}
            >
              {f}
            </button>
          ))}
        </div>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
        {filtered.map((project, i) => {
          const isLarge = project.size === "large"
          const colSpan = isLarge ? "md:col-span-7" : "md:col-span-5"

          return (
            <ProjectCard
              key={project.id}
              project={project}
              colSpan={colSpan}
              index={i}
              href={`/projects/${project.slug}`}
            />
          )
        })}
      </div>
    </section>
  )
}

function ProjectCard({
  project,
  colSpan,
  index,
  href,
}: {
  project: typeof projects[0]
  colSpan: string
  index: number
  href: string
}) {
  const { ref, inView } = useInView({ threshold: 0.1 })

  return (
    <Link
      href={href}
      ref={ref as React.RefObject<HTMLAnchorElement>}
      className={`group relative overflow-hidden cursor-pointer ${colSpan} block`}
      style={{
        opacity: inView ? 1 : 0,
        transform: inView ? "translateY(0)" : "translateY(60px)",
        transition: `opacity 0.7s cubic-bezier(0.16,1,0.3,1) ${index * 80}ms, transform 0.7s cubic-bezier(0.16,1,0.3,1) ${index * 80}ms`,
      }}
    >
      <div className={`relative aspect-[4/3] overflow-hidden ${project.color}`}>
        <img
          src={project.img}
          alt={project.title}
          className="w-full h-full object-cover opacity-60 group-hover:opacity-90 group-hover:scale-105 transition-all duration-700"
        />
        {/* Dark overlay fades out on hover */}
        <div className="absolute inset-0 bg-black/20 group-hover:bg-black/0 transition-all duration-500" />
        {/* Brand green left-edge accent bar */}
        <div className="absolute left-0 top-0 bottom-0 w-1 bg-brand scale-y-0 group-hover:scale-y-100 origin-bottom transition-transform duration-500" />
        {/* Project number */}
        <span className={`absolute top-6 left-6 font-mono text-xs tracking-widest ${project.textColor} opacity-60 group-hover:opacity-0 transition-opacity duration-300`}>
          {project.id}
        </span>
        {/* Arrow badge — slides in from top-right */}
        <span className="absolute top-6 right-6 w-9 h-9 flex items-center justify-center bg-brand text-brand-foreground opacity-0 group-hover:opacity-100 translate-y-[-8px] group-hover:translate-y-0 transition-all duration-300 text-base font-bold">
          ↗
        </span>
        {/* Category tag slides up on hover */}
        <div className="absolute bottom-0 left-0 right-0 p-6 translate-y-full group-hover:translate-y-0 transition-transform duration-500 bg-foreground/85 backdrop-blur-sm">
          <p className="text-xs tracking-widest uppercase text-brand">{project.category}</p>
        </div>
      </div>
      <div className="pt-5 pb-8 border-b border-border group-hover:border-brand transition-colors duration-500">
        <div className="flex items-start justify-between gap-4">
          <div>
            <h3 className="font-serif font-bold text-foreground text-2xl mb-1 group-hover:text-brand transition-colors duration-300">
              {project.title}
            </h3>
            <p className="text-sm text-muted-foreground">{project.category}</p>
          </div>
          <span className="flex items-center gap-1 text-xs tracking-widest uppercase text-brand mt-1 opacity-0 group-hover:opacity-100 translate-x-2 group-hover:translate-x-0 transition-all duration-300">
            View ↗
          </span>
        </div>
      </div>
    </Link>
  )
}
