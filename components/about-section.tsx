export function AboutSection() {
  return (
    <section id="about" className="bg-surface-light text-surface-light-foreground">
      <div className="max-w-screen-2xl mx-auto px-8 py-24">
        {/* Top label */}
        <p className="text-xs tracking-[0.25em] uppercase text-surface-light-foreground/50 mb-16">
          About the Agency
        </p>

        {/* Main copy */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-start">
          <div>
            <h2
              className="font-serif font-bold leading-tight text-balance"
              style={{ fontSize: "clamp(2.5rem, 5vw, 5rem)", letterSpacing: "-0.02em" }}
            >
              Творческая компания, выбранная лидерами для создания завтрашнего дня.
            </h2>
          </div>
          <div className="flex flex-col gap-8">
            <p className="text-base md:text-lg leading-relaxed text-surface-light-foreground/70">
              За 25 лет мы помогли нашим партнёрам завоевать место в руках, домах и сердцах
              миллионов людей — объединяя исследования мирового класса, дизайн и технологии
              для достижения беспрецедентного результата.
            </p>
            <p className="text-base md:text-lg leading-relaxed text-surface-light-foreground/70">
              Когда технологии радикально меняют наш мир, мы помогаем клиентам адаптироваться
              и ускоряться — трансформируя их платформы, людей и процессы, чтобы вести.
            </p>
            <a
              href="#contact"
              className="self-start inline-flex items-center gap-3 text-sm tracking-widest uppercase border border-surface-light-foreground/30 px-8 py-3 text-surface-light-foreground hover:bg-surface-light-foreground hover:text-surface-light transition-all duration-300 mt-4"
            >
              Our Story ↗
            </a>
          </div>
        </div>

        {/* Stats row */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-0 border-t border-surface-light-foreground/10 mt-24">
          {[
            { num: "2018", label: "Founded" },
            { num: "45+", label: "Team members" },
            { num: "12", label: "Industries served" },
            { num: "4×", label: "Award winner" },
          ].map(({ num, label }) => (
            <div key={label} className="py-10 px-6 border-r border-b border-surface-light-foreground/10 last:border-r-0">
              <p
                className="font-serif font-bold text-surface-light-foreground leading-none"
                style={{ fontSize: "clamp(2.5rem, 4vw, 4rem)" }}
              >
                {num}
              </p>
              <p className="text-xs tracking-widest uppercase text-surface-light-foreground/50 mt-3">
                {label}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
