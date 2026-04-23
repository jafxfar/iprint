const clients = [
  "Эсхата Банк",
  "Далерон",
  "Фаровон",
  "Roller",
  "Silk Road",
  "Банк Арванд",
  "Ориён Банк",
  "Амонат Бонк",
  "American Space",
  "Giavoni",
]

const testimonials = [
  {
    quote:
      "IPrint полностью переосмыслила нашу идентичность. Результат превзошёл все ожидания — вовлечённость выросла на 340% за первый квартал.",
    author: "Юрий К.",
    role: "Дизайнер, Эсхата Банк",
  },
  {
    quote:
      "Команда не просто делает красиво — они понимают бизнес. Стратегия плюс исполнение на высшем уровне.",
    author: "Шерзод Д.",
    role: "IT-специалист, Далерон",
  },
  {
    quote:
      "Лучшее рекламное агентство, с которым мы работали. Честность, скорость, качество — редкое сочетание.",
    author: "Хусрав",
    role: "HR, Фаровон",
  },
]

export function ClientsSection() {
  return (
    <section className="bg-surface-light text-surface-light-foreground py-24 px-8">
      <div className="max-w-screen-2xl mx-auto">
        {/* Label */}
        <p className="text-xs tracking-[0.25em] uppercase text-[#65B337] mb-16 text-center">
          Наши клиенты
        </p>

        {/* Client logos text */}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-0 border border-surface-light-foreground/10 mb-24">
          {clients.map((name) => (
            <div
              key={name}
              className="flex items-center justify-center py-8 px-4 border-b border-r border-surface-light-foreground/10 last-of-type:border-r-0"
            >
              <span className="font-serif font-bold text-surface-light-foreground/40 text-lg tracking-tight hover:text-[#65B337] transition-colors duration-300 cursor-default">
                {name}
              </span>
            </div>
          ))}
        </div>

        {/* Testimonials */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((t, i) => (
            <div
              key={i}
              className="flex flex-col gap-6 border-t-2 border-[#65B337] pt-8"
            >
              <blockquote className="text-base leading-relaxed text-surface-light-foreground/80 italic">
                &ldquo;{t.quote}&rdquo;
              </blockquote>
              <div>
                <p className="font-semibold text-surface-light-foreground">{t.author}</p>
                <p className="text-xs tracking-widest uppercase text-surface-light-foreground/50 mt-1">
                  {t.role}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
