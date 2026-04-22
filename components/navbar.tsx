"use client"

import { useState, useEffect } from "react"

const navLinks = [
  { label: "Проекты", id: "work" },
  { label: "Услуги", id: "services" },
  { label: "О нас", id: "about" },
  { label: "Контакты", id: "contact" },
]
export function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 40)
    window.addEventListener("scroll", handler)
    return () => window.removeEventListener("scroll", handler)
  }, [])

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${scrolled ? "bg-white/90 backdrop-blur-md border-b border-border" : "bg-transparent"
          }`}
      >
        <nav className="flex items-center justify-between px-8 py-5 max-w-screen-2xl mx-auto">
          {/* Logo */}
          <a
            href="#"
            className="font-serif font-bold text-lg tracking-[0.2em] text-foreground uppercase"
          >
            IPrint
          </a>

          {/* Desktop nav */}
          <ul className="hidden md:flex items-center gap-10">
            {navLinks.map((link) => (
              <li key={link.id}>
                <a
                  href={`#${link.id}`}
                  className="text-sm tracking-widest uppercase text-muted-foreground hover:text-foreground transition-colors duration-300"
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>

          {/* CTA */}
          <a
            href="#contact"
            className="hidden md:inline-flex items-center gap-2 text-sm tracking-widest uppercase border border-foreground px-5 py-2.5 text-foreground hover:bg-foreground hover:text-background transition-all duration-300"
          >
            Начать проект
            <span className="text-accent">↗</span>
          </a>

          {/* Burger */}
          <button
            className="md:hidden flex flex-col gap-1.5 p-1"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle menu"
          >
            <span
              className={`block h-px w-6 bg-foreground transition-transform duration-300 ${menuOpen ? "translate-y-2.5 rotate-45" : ""}`}
            />
            <span
              className={`block h-px w-6 bg-foreground transition-opacity duration-300 ${menuOpen ? "opacity-0" : ""}`}
            />
            <span
              className={`block h-px w-6 bg-foreground transition-transform duration-300 ${menuOpen ? "-translate-y-2.5 -rotate-45" : ""}`}
            />
          </button>
        </nav>
      </header>

      {/* Mobile menu */}
      <div
        className={`fixed inset-0 z-40 bg-background flex flex-col justify-center items-center gap-10 transition-all duration-500 md:hidden ${menuOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
          }`}
      >
        {navLinks.map((link) => (
          <a
            key={link.id}
            href={`#${link.id}`}
            onClick={() => setMenuOpen(false)}
            className="font-serif text-5xl font-bold text-foreground tracking-tight hover:text-accent transition-colors"
          >
            {link.label}
          </a>
        ))}
        <a
          href="#contact"
          onClick={() => setMenuOpen(false)}
          className="mt-6 text-sm tracking-widest uppercase border border-foreground px-8 py-3 text-foreground hover:bg-foreground hover:text-background transition-all duration-300"
        >
          Начать проект
        </a>
      </div>
    </>
  )
}
