export function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer className="border-t border-border px-8 py-12 max-w-screen-2xl mx-auto">
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-8">
        {/* Logo & tagline */}
        <div>
          <span className="font-serif font-bold text-2xl tracking-[0.15em] text-foreground uppercase">
            FORMA
          </span>
          <p className="text-xs tracking-widest uppercase text-muted-foreground mt-2">
            Lead by Design
          </p>
        </div>

        {/* Nav links */}
        <nav className="flex flex-wrap gap-8">
          {["Work", "Services", "About", "Contact", "Privacy"].map((l) => (
            <a
              key={l}
              href={`#${l.toLowerCase()}`}
              className="text-xs tracking-widest uppercase text-muted-foreground hover:text-foreground transition-colors duration-300"
            >
              {l}
            </a>
          ))}
        </nav>

        {/* Social */}
        <div className="flex gap-5">
          {["IG", "TG", "LI", "BE"].map((s) => (
            <a
              key={s}
              href="#"
              className="w-9 h-9 border border-border flex items-center justify-center text-xs text-muted-foreground hover:border-foreground hover:text-foreground transition-all duration-300"
            >
              {s}
            </a>
          ))}
        </div>
      </div>

      {/* Bottom */}
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 mt-12 pt-8 border-t border-border">
        <p className="text-xs text-muted-foreground">
          © {year} FORMA Agency. Все права защищены.
        </p>
        <p className="text-xs text-muted-foreground">
          Москва, Россия — hello@forma-agency.ru
        </p>
      </div>

      {/* Giant footer text */}
      <div
        className="overflow-hidden mt-8 -mx-8"
        aria-hidden="true"
      >
        <p
          className="font-serif font-bold text-border leading-none select-none whitespace-nowrap"
          style={{ fontSize: "clamp(5rem, 20vw, 22rem)", letterSpacing: "-0.04em", opacity: 0.3 }}
        >
          FORMA
        </p>
      </div>
    </footer>
  )
}
