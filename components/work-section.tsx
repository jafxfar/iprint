"use client"

import { useState } from "react"
import { useInView } from "@/hooks/use-in-view"

const projects = [
  {
    id: "01",
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
        <div>
          <p className="text-xs tracking-[0.25em] uppercase text-muted-foreground mb-3">
            Selected Work
          </p>
          <h2
            className="font-serif font-bold text-foreground leading-none"
            style={{ fontSize: "clamp(2.5rem, 6vw, 6rem)", letterSpacing: "-0.02em" }}
          >
            Our Work
          </h2>
        </div>

        {/* Filters */}
        <div className="flex flex-wrap gap-2">
          {filters.map((f) => (
            <button
              key={f}
              onClick={() => setActive(f)}
              className={`text-xs tracking-widest uppercase px-4 py-2 border transition-all duration-300 ${
                active === f
                  ? "bg-foreground text-background border-foreground"
                  : "border-border text-muted-foreground hover:border-foreground hover:text-foreground"
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
            />
          )
        })}
      </div>

      {/* View all */}
      <div className="text-center mt-16">
        <a
          href="#"
          className="inline-flex items-center gap-3 text-sm tracking-widest uppercase border border-border px-10 py-4 text-foreground hover:bg-foreground hover:text-background hover:border-foreground transition-all duration-300"
        >
          View All Projects
          <span>↗</span>
        </a>
      </div>
    </section>
  )
}

function ProjectCard({
  project,
  colSpan,
  index,
}: {
  project: typeof projects[0]
  colSpan: string
  index: number
}) {
  const { ref, inView } = useInView({ threshold: 0.1 })

  return (
    <article
      ref={ref as React.RefObject<HTMLElement>}
      className={`group relative overflow-hidden cursor-pointer ${colSpan}`}
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
          className="w-full h-full object-cover opacity-60 group-hover:opacity-80 group-hover:scale-105 transition-all duration-700"
        />
        {/* Overlay */}
        <div className="absolute inset-0 bg-background/20 group-hover:bg-background/0 transition-all duration-500" />
        {/* Project number */}
        <span className={`absolute top-6 left-6 font-mono text-xs tracking-widest ${project.textColor} opacity-60`}>
          {project.id}
        </span>
        {/* Arrow slides in on hover */}
        <span className="absolute top-6 right-6 opacity-0 group-hover:opacity-100 translate-x-2 group-hover:translate-x-0 transition-all duration-300 text-foreground text-xl">
          ↗
        </span>
        {/* Category tag slides up on hover */}
        <div className="absolute bottom-0 left-0 right-0 p-6 translate-y-full group-hover:translate-y-0 transition-transform duration-500 bg-background/80 backdrop-blur-sm">
          <p className="text-xs tracking-widest uppercase text-foreground/70">{project.category}</p>
        </div>
      </div>
      <div className="pt-5 pb-8 border-b border-border">
        <div className="flex items-start justify-between gap-4">
          <div>
            <h3 className="font-serif font-bold text-foreground text-2xl mb-1 group-hover:text-accent transition-colors duration-300">
              {project.title}
            </h3>
            <p className="text-sm text-muted-foreground">{project.category}</p>
          </div>
          <span className="text-xs tracking-widest uppercase text-muted-foreground mt-1 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            View ↗
          </span>
        </div>
      </div>
    </article>
  )
}
