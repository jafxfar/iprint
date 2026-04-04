const items = [
  "AI Strategy",
  "Brand Identity",
  "Product Design",
  "Motion & Film",
  "Digital Campaigns",
  "Growth Marketing",
  "UX Research",
  "Content Strategy",
]

export function MarqueeTicker({ inverted = false }: { inverted?: boolean }) {
  const repeated = [...items, ...items, ...items, ...items]

  return (
    <div
      className={`overflow-hidden border-y py-4 ${
        inverted
          ? "border-surface-light-foreground/20 bg-surface-light text-surface-light-foreground"
          : "border-border bg-secondary text-foreground"
      }`}
    >
      <div className="animate-marquee flex whitespace-nowrap w-max">
        {repeated.map((item, i) => (
          <span
            key={i}
            className="inline-flex items-center gap-6 mx-6 text-xs tracking-[0.3em] uppercase font-medium"
          >
            {item}
            <span className={`text-accent ${inverted ? "text-accent" : ""}`}>✦</span>
          </span>
        ))}
      </div>
    </div>
  )
}
