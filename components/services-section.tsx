"use client"

import { useState } from "react"
import { useInView } from "@/hooks/use-in-view"

const services = [
  {
    id: "01",
    title: "Широкоформатная печать",
    items: [
      "Интерьерная печать",
      "Печать на баннере",
      "Печать на плёнке",
      "Пресс-стена",
    ],
  },
  {
    id: "02",
    title: "УФ печать",
    items: [
      "Стеклянная картина",
      "Печать на стекле",
      "Печать на ПВХ",
      "Печать на металле",
      "Печать на дереве",
      "Печать на пенокартоне",
      "Печать на акриле",
      "Печать на керамике",
      "Печать на фанере",
      "Печать на коже",
      "Тактильные таблички",
    ],
  },
  {
    id: "03",
    title: "Вывески",
    items: [
      "Световые вывески",
      "Светодиодные вывески",
      "Интерьерные вывески",
      "Фасадные вывески",
      "Вывеска на магазин",
      "Наружные вывески",
      "Лайтбоксы",
      "Световые короба",
      "Панель-кронштейны",
      "Объёмные буквы",
      "Буквы с контражурной подсветкой",
      "Буквы на вывеске",
      "Крышные конструкции",
    ],
  },
  {
    id: "04",
    title: "Таблички",
    items: [
      "Таблички с графиком работы",
    ],
  },
  {
    id: "05",
    title: "Стенды",
    items: [
      "Выставочный стенд",
      "Дизайн стендов на выставку",
      "Застройка выставки",
      "Мобильные выставочные стенды",
    ],
  },
]

function ServiceCard({
  service,
  index,
}: {
  service: typeof services[0]
  index: number
}) {
  const { ref, inView } = useInView({ threshold: 0.1 })
  const [hovered, setHovered] = useState(false)

  return (
    <div
      ref={ref as React.RefObject<HTMLDivElement>}
      className="border-t border-border pt-8 pb-10 flex flex-col gap-6 cursor-default"
      style={{
        opacity: inView ? 1 : 0,
        transform: inView ? "translateY(0)" : "translateY(36px)",
        transition: `opacity 0.7s ease ${index * 80}ms, transform 0.7s ease ${index * 80}ms`,
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* Header */}
      <div className="flex items-start justify-between gap-4">
        <div>
          <span className="text-[10px] tracking-[0.3em] uppercase text-muted-foreground font-sans block mb-2">
            {service.id}
          </span>
          <h3
            className="font-serif font-bold text-foreground leading-tight transition-colors duration-300"
            style={{
              fontSize: "clamp(1.1rem, 1.8vw, 1.5rem)",
              letterSpacing: "-0.01em",
              color: hovered ? "oklch(0.09 0 0)" : undefined,
            }}
          >
            {service.title}
          </h3>
        </div>
        <span
          className="text-muted-foreground mt-1 shrink-0 transition-transform duration-500"
          style={{ transform: hovered ? "rotate(45deg)" : "rotate(0deg)", fontSize: "1.25rem" }}
          aria-hidden="true"
        >
          +
        </span>
      </div>

      {/* Items list */}
      <ul className="flex flex-col gap-2.5">
        {service.items.map((item, i) => (
          <li
            key={item}
            className="flex items-center gap-3 group/item"
            style={{
              opacity: inView ? 1 : 0,
              transform: inView ? "translateX(0)" : "translateX(-16px)",
              transition: `opacity 0.5s ease ${index * 80 + i * 40 + 200}ms, transform 0.5s ease ${index * 80 + i * 40 + 200}ms`,
            }}
          >
            <span
              className="w-1 h-1 rounded-full bg-muted-foreground shrink-0 transition-colors duration-200 group-hover/item:bg-foreground"
              aria-hidden="true"
            />
            <span className="text-sm text-muted-foreground leading-snug transition-colors duration-200 group-hover/item:text-foreground">
              {item}
            </span>
          </li>
        ))}
      </ul>
    </div>
  )
}

export function ServicesSection() {
  const { ref: headerRef, inView: headerInView } = useInView()

  return (
    <section id="services" className="py-28 px-8 max-w-screen-2xl mx-auto">

      {/* Section header */}
      <div
        ref={headerRef as React.RefObject<HTMLDivElement>}
        className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-20"
        style={{
          opacity: headerInView ? 1 : 0,
          transform: headerInView ? "translateY(0)" : "translateY(40px)",
          transition: "opacity 0.8s ease, transform 0.8s ease",
        }}
      >
        <div>
          <p className="text-xs tracking-[0.3em] uppercase text-muted-foreground mb-4 font-sans">
            Что мы делаем
          </p>
          <h2
            className="font-serif font-bold text-foreground leading-none"
            style={{ fontSize: "clamp(2.5rem, 6vw, 6rem)", letterSpacing: "-0.03em" }}
          >
            Услуги
          </h2>
        </div>
        <p className="max-w-sm text-muted-foreground text-sm leading-relaxed font-sans">
          Полный цикл рекламного производства — от разработки дизайна до монтажа и изготовления любых форматов.
        </p>
      </div>

      {/* Services grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-x-8 gap-y-0">
        {services.map((service, i) => (
          <ServiceCard key={service.id} service={service} index={i} />
        ))}
      </div>

      {/* CTA row */}
      <div
        className="mt-20 pt-10 border-t border-border flex flex-col sm:flex-row sm:items-center justify-between gap-6"
        style={{
          opacity: headerInView ? 1 : 0,
          transition: "opacity 0.8s ease 0.6s",
        }}
      >
        <p className="text-muted-foreground text-sm font-sans">
          Не нашли нужную услугу? Обсудим индивидуально.
        </p>
        <a
          href="#contact"
          className="group inline-flex items-center gap-3 text-sm tracking-widest uppercase text-foreground font-sans"
        >
          <span className="h-px w-8 bg-foreground transition-all duration-500 group-hover:w-16" />
          Обсудить проект
        </a>
      </div>
    </section>
  )
}
