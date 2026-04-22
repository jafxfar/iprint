export function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer className="px-8 max-w-screen-2xl mx-auto">
      

      {/* Bottom */}
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 mt-12 pt-8 border-t border-border">
        <p className="text-xs text-muted-foreground">
          © {year} IPrint Agency. Все права защищены.
        </p>
        <p className="text-xs text-muted-foreground">
          Худжанд, Таджикистан — INFO@IPRINT.TJ
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
          IPrint
        </p>
      </div>
    </footer>
  )
}
