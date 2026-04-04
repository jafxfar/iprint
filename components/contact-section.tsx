"use client"

import { useState } from "react"

export function ContactSection() {
  const [formData, setFormData] = useState({
    name: "",
    company: "",
    email: "",
    budget: "",
    message: "",
  })
  const [submitted, setSubmitted] = useState(false)

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setSubmitted(true)
  }

  return (
    <section id="contact" className="py-24 px-8 max-w-screen-2xl mx-auto">
      {/* CTA headline */}
      <div className="mb-24">
        <h2
          className="font-serif font-bold text-foreground leading-none text-balance"
          style={{ fontSize: "clamp(3rem, 10vw, 11rem)", letterSpacing: "-0.03em" }}
        >
          Start a<br />
          <span className="text-accent italic">Project.</span>
        </h2>
      </div>

      {submitted ? (
        <div className="border border-accent p-12 max-w-lg">
          <p className="font-serif font-bold text-3xl text-foreground mb-4">
            Отлично! ✦
          </p>
          <p className="text-muted-foreground leading-relaxed">
            Мы получили ваш запрос и свяжемся с вами в течение 24 часов. До встречи!
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-start">
          {/* Left info */}
          <div className="flex flex-col gap-10">
            <div>
              <p className="text-xs tracking-[0.25em] uppercase text-muted-foreground mb-4">
                Get in touch
              </p>
              <p className="text-base md:text-lg leading-relaxed text-muted-foreground max-w-sm">
                Расскажите нам о вашем проекте. Мы свяжемся в течение 24 часов и предложим стратегию.
              </p>
            </div>

            <div className="flex flex-col gap-6">
              {[
                { label: "Email", val: "hello@forma-agency.ru" },
                { label: "Phone", val: "+7 (495) 000-00-00" },
                { label: "Location", val: "Москва, Россия" },
              ].map(({ label, val }) => (
                <div key={label} className="border-t border-border pt-4">
                  <p className="text-xs tracking-widest uppercase text-muted-foreground mb-1">
                    {label}
                  </p>
                  <p className="text-foreground font-medium">{val}</p>
                </div>
              ))}
            </div>

            <div className="flex gap-6">
              {["Instagram", "Telegram", "LinkedIn", "Behance"].map((soc) => (
                <a
                  key={soc}
                  href="#"
                  className="text-xs tracking-widest uppercase text-muted-foreground hover:text-foreground transition-colors duration-300"
                >
                  {soc}
                </a>
              ))}
            </div>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="flex flex-col gap-0">
            {[
              { name: "name", label: "Your Name", type: "text", required: true },
              { name: "company", label: "Company", type: "text", required: false },
              { name: "email", label: "Email Address", type: "email", required: true },
            ].map((field) => (
              <div key={field.name} className="border-b border-border py-5 focus-within:border-foreground transition-colors duration-300">
                <label className="block text-xs tracking-widest uppercase text-muted-foreground mb-2">
                  {field.label}
                  {field.required && <span className="text-accent ml-1">*</span>}
                </label>
                <input
                  type={field.type}
                  name={field.name}
                  value={formData[field.name as keyof typeof formData]}
                  onChange={handleChange}
                  required={field.required}
                  className="w-full bg-transparent text-foreground text-base outline-none placeholder:text-muted-foreground/40"
                  placeholder={`Enter ${field.label.toLowerCase()}`}
                />
              </div>
            ))}

            <div className="border-b border-border py-5 focus-within:border-foreground transition-colors duration-300">
              <label className="block text-xs tracking-widest uppercase text-muted-foreground mb-2">
                Budget Range
              </label>
              <select
                name="budget"
                value={formData.budget}
                onChange={handleChange}
                className="w-full bg-transparent text-foreground text-base outline-none"
              >
                <option value="" className="bg-background">Select budget</option>
                <option value="<500k" className="bg-background">До 500 000 ₽</option>
                <option value="500k-2m" className="bg-background">500 000 — 2 000 000 ₽</option>
                <option value="2m-10m" className="bg-background">2 000 000 — 10 000 000 ₽</option>
                <option value="10m+" className="bg-background">Более 10 000 000 ₽</option>
              </select>
            </div>

            <div className="border-b border-border py-5 focus-within:border-foreground transition-colors duration-300">
              <label className="block text-xs tracking-widest uppercase text-muted-foreground mb-2">
                Message <span className="text-accent">*</span>
              </label>
              <textarea
                name="message"
                value={formData.message}
                onChange={handleChange}
                required
                rows={4}
                className="w-full bg-transparent text-foreground text-base outline-none resize-none placeholder:text-muted-foreground/40"
                placeholder="Tell us about your project..."
              />
            </div>

            <button
              type="submit"
              className="mt-8 w-full md:w-auto self-start inline-flex items-center justify-center gap-3 text-sm tracking-widest uppercase bg-foreground text-background px-12 py-5 hover:bg-accent hover:text-accent-foreground transition-all duration-300 font-medium"
            >
              Send Request
              <span>↗</span>
            </button>
          </form>
        </div>
      )}
    </section>
  )
}
