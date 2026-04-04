"use client"

import { useState } from "react"
import { useInView } from "@/hooks/use-in-view"

const services = [
  {
    num: "01",
    title: "AI Strategy & Execution",
    desc: "Разрабатываем чёткие дорожные карты ИИ, соответствующие бизнес-целям. От прототипирования до масштабирования — мы превращаем потенциал в конкурентное преимущество.",
    tags: ["LLM Integration", "AI Roadmaps", "Automation"],
  },
  {
    num: "02",
    title: "Brand & Identity",
    desc: "Создаём идентичности, которые резонируют с аудиторией на эмоциональном уровне. Логотипы, система визуальных коммуникаций, тональность — всё, что делает бренд узнаваемым.",
    tags: ["Visual Identity", "Naming", "Brand Systems"],
  },
  {
    num: "03",
    title: "Product Innovation",
    desc: "Проектируем цифровые продукты с нуля или переосмысливаем существующие. UX-исследования, прототипирование, дизайн-система и разработка под ключ.",
    tags: ["UX Design", "Product Strategy", "Prototyping"],
  },
  {
    num: "04",
    title: "Digital Campaigns",
    desc: "Запускаем интегрированные кампании, которые охватывают аудиторию в нужный момент. Таргетированная реклама, контент-стратегия, performance-аналитика.",
    tags: ["Paid Media", "Content", "Analytics"],
  },
  {
    num: "05",
    title: "Motion & Film",
    desc: "Рассказываем истории через движение. Рекламные ролики, моушн-дизайн, анимация и интерактивный опыт, который невозможно забыть.",
    tags: ["Commercial", "Motion Design", "3D/AR"],
  },
]

function ServiceRow({
  service,
  index,
  isOpen,
  onToggle,
}: {
  service: typeof services[0]
  index: number
  isOpen: boolean
  onToggle: () => void
}) {
  const { ref, inView } = useInView({ threshold: 0.2 })

  return (
    <div
      ref={ref as React.RefObject<HTMLDivElement>}
      className="service-item"
      style={{
        opacity: inView ? 1 : 0,
        transform: inView ? "translateX(0)" : "translateX(-40px)",
        transition: `opacity 0.6s ease ${index * 100}ms, transform 0.6s ease ${index * 100}ms`,
      }}
    >
      <button
        className="w-full flex items-start md:items-center justify-between gap-6 py-8 text-left group"
        onClick={onToggle}
        aria-expanded={isOpen}
      >
        <div className="flex items-start md:items-center gap-6 md:gap-12">
          <span className="font-mono text-xs text-muted-foreground pt-1 md:pt-0 shrink-0">
            {service.num}
          </span>
          <h3
            className="font-serif font-bold text-foreground group-hover:text-accent transition-colors duration-300"
            style={{ fontSize: "clamp(1.5rem, 3vw, 2.5rem)" }}
          >
            {service.title}
          </h3>
        </div>
        <span
          className={`text-muted-foreground text-xl transition-transform duration-300 shrink-0 ${
            isOpen ? "rotate-45" : "rotate-0"
          }`}
        >
          +
        </span>
      </button>

      {/* Expandable */}
      <div
        className="overflow-hidden transition-all duration-500"
        style={{ maxHeight: isOpen ? "300px" : "0px" }}
      >
        <div className="pb-8 pl-0 md:pl-[calc(3rem+4rem)] flex flex-col md:flex-row gap-8 md:gap-16">
          <p className="text-muted-foreground text-base leading-relaxed max-w-xl">
            {service.desc}
          </p>
          <div className="flex flex-wrap gap-2 md:ml-auto md:items-start">
            {service.tags.map((tag) => (
              <span
                key={tag}
                className="text-xs tracking-widest uppercase border border-border px-3 py-1.5 text-muted-foreground"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export function ServicesSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(0)
  const { ref: headerRef, inView: headerInView } = useInView()

  return (
    <section id="services" className="py-24 px-8 max-w-screen-2xl mx-auto">
      <div
        ref={headerRef as React.RefObject<HTMLDivElement>}
        className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-16 border-b border-border pb-8"
        style={{
          opacity: headerInView ? 1 : 0,
          transform: headerInView ? "translateY(0)" : "translateY(40px)",
          transition: "opacity 0.8s ease, transform 0.8s ease",
        }}
      >
        <div>
          <p className="text-xs tracking-[0.25em] uppercase text-muted-foreground mb-3">
            What we do
          </p>
          <h2
            className="font-serif font-bold text-foreground leading-none"
            style={{ fontSize: "clamp(2.5rem, 6vw, 6rem)", letterSpacing: "-0.02em" }}
          >
            Services
          </h2>
        </div>
        <p className="max-w-sm text-muted-foreground text-sm leading-relaxed">
          Мы предлагаем полный спектр услуг — от стратегии до реализации — чтобы ваш бренд был виден там, где это важно.
        </p>
      </div>

      <div className="divide-y divide-border">
        {services.map((service, i) => (
          <ServiceRow
            key={service.num}
            service={service}
            index={i}
            isOpen={openIndex === i}
            onToggle={() => setOpenIndex(openIndex === i ? null : i)}
          />
        ))}
      </div>
    </section>
  )
}
