"use client"

import { useInView, useCountUp } from "@/hooks/use-in-view"

const stats = [
  { num: 2014, suffix: "", label: "Год основания" },
  { num: 10, suffix: "+", label: "Сотрудников" },
  { num: 12, suffix: "", label: "Отраслей" },
  { num: 4, suffix: "×", label: "Наград" },
]

function StatItem({ num, suffix, label, inView }: { num: number; suffix: string; label: string; inView: boolean }) {
  const count = useCountUp(num, 1600, inView)
  return (
    <div className="py-10 px-6 border-r border-b border-surface-light-foreground/10 last:border-r-0">
      <p
        className="font-serif font-bold text-surface-light-foreground leading-none"
        style={{ fontSize: "clamp(2.5rem, 4vw, 4rem)" }}
      >
        {count}{suffix}
      </p>
      <p className="text-xs tracking-widest uppercase text-surface-light-foreground/50 mt-3">
        {label}
      </p>
    </div>
  )
}

export function AboutSection() {
  const { ref: sectionRef, inView } = useInView({ threshold: 0.1 })
  const { ref: titleRef, inView: titleInView } = useInView()
  const { ref: copyRef, inView: copyInView } = useInView()

  return (
    <section id="about" className="bg-surface-light text-surface-light-foreground overflow-hidden">
      <div className="max-w-screen-2xl mx-auto px-8 py-24">
        {/* Top label */}
        <p
          className="text-xs tracking-[0.25em] uppercase text-surface-light-foreground/50 mb-16 transition-all duration-700"
          style={{
            opacity: inView ? 1 : 0,
            transform: inView ? "translateY(0)" : "translateY(20px)",
          }}
          ref={sectionRef as React.RefObject<HTMLParagraphElement>}
        >
          О нас
        </p>

        {/* Main copy */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-start">
          <div
            ref={titleRef as React.RefObject<HTMLDivElement>}
            className="transition-all duration-1000"
            style={{
              opacity: titleInView ? 1 : 0,
              transform: titleInView ? "translateY(0)" : "translateY(60px)",
            }}
          >
            <h2
              className="font-serif font-bold leading-tight text-balance"
              style={{ fontSize: "clamp(2.5rem, 5vw, 5rem)", letterSpacing: "-0.02em" }}
            >
              Партнёр в создании завтрашнего дня
            </h2>
          </div>

          <div
            ref={copyRef as React.RefObject<HTMLDivElement>}
            className="flex flex-col gap-8 transition-all duration-1000 delay-200"
            style={{
              opacity: copyInView ? 1 : 0,
              transform: copyInView ? "translateY(0)" : "translateY(60px)",
            }}
          >
            <p className="text-base md:text-lg leading-relaxed text-surface-light-foreground/70">
              iPrint — современное рекламно-производственное агентство и типография, расположенная в городе Худжанд.
              Мы специализируемся на создании качественной печатной продукции и рекламных решений для бизнеса любого масштаба — от небольших компаний до крупных брендов.
            </p>
            <p className="text-base md:text-lg leading-relaxed text-surface-light-foreground/70">
              Наша команда объединяет опытных специалистов, современные технологии печати и креативный подход к каждому проекту.
              Мы понимаем, что реклама — это не просто изображение или текст, это инструмент, который помогает бизнесу расти, привлекать клиентов и создавать сильный бренд.
            </p>
            {/* <a
              href="#contact"
              className="self-start inline-flex items-center gap-3 text-sm tracking-widest uppercase border border-surface-light-foreground/30 px-8 py-3 text-surface-light-foreground hover:bg-surface-light-foreground hover:text-surface-light transition-all duration-300 mt-4"
            >
              Our Story ↗
            </a> */}
          </div>
        </div>

        {/* Stats row — animated counters */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-0 border-t border-surface-light-foreground/10 mt-24">
          {stats.map(({ num, suffix, label }) => (
            <StatItem key={label} num={num} suffix={suffix} label={label} inView={inView} />
          ))}
        </div>
      </div>
    </section>
  )
}
