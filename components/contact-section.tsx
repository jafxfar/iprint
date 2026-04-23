"use client"

import { useState } from "react"
import { useInView } from "@/hooks/use-in-view"

export function ContactSection() {
  const [formData, setFormData] = useState({
    name: "",
    company: "",
    email: "",
    budget: "",
    message: "",
  })
  const [submitted, setSubmitted] = useState(false)

  const { ref: titleRef, inView: titleInView } = useInView()
  const { ref: formRef, inView: formInView } = useInView({ threshold: 0.05 })

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
      <div
        ref={titleRef as React.RefObject<HTMLDivElement>}
        className="mb-24 overflow-hidden"
      >
        <div
          style={{
            opacity: titleInView ? 1 : 0,
            transform: titleInView ? "translateY(0)" : "translateY(80px)",
            transition: "opacity 1s cubic-bezier(0.16,1,0.3,1), transform 1s cubic-bezier(0.16,1,0.3,1)",
          }}
        >
          <h2
            className="font-serif font-bold text-foreground leading-none text-balance"
            style={{ fontSize: "clamp(3rem, 10vw, 11rem)", letterSpacing: "-0.03em" }}
          >
            Начать проект
          </h2>
        </div>
      </div>

      {submitted ? (
        <div
          className="border border-brand p-12 max-w-lg"
          style={{ animation: "fadeUp 0.6s ease forwards" }}
        >
          <p className="font-serif font-bold text-3xl text-foreground mb-4">
            Отлично! ✦
          </p>
          <p className="text-muted-foreground leading-relaxed">
            Мы получили ваш запрос и свяжемся с вами в течение 24 часов. До встречи!
          </p>
        </div>
      ) : (
        <div
          ref={formRef as React.RefObject<HTMLDivElement>}
          className="grid grid-cols-1 md:grid-cols-2 gap-16 items-start"
        >
          {/* Left info */}
          <div
            className="flex flex-col gap-10"
            style={{
              opacity: formInView ? 1 : 0,
              transform: formInView ? "translateX(0)" : "translateX(-40px)",
              transition: "opacity 0.8s ease 0.1s, transform 0.8s ease 0.1s",
            }}
          >
            <div>
              <p className="text-xs tracking-[0.25em] uppercase text-muted-foreground mb-4">
                Связаться с нами
              </p>
              <p className="text-base md:text-lg leading-relaxed text-muted-foreground max-w-sm">
                Расскажите нам о вашем проекте. Мы свяжемся в течение 24 часов и предложим стратегию.
              </p>
            </div>

            <div className="flex flex-col gap-6">
              {[
                { label: "Почта", val: "INFO@IPRINT.TJ" },
                { label: "Телефон", val: "+992 (92) 882-99-55\n+992 (92) 772-99-55" },
                { label: "Адрес", val: "г. Худжанд, Таджикистан" },
              ].map(({ label, val }, i) => (
                <div
                  key={label}
                  className="border-t border-border pt-4"
                  style={{
                    opacity: formInView ? 1 : 0,
                    transform: formInView ? "translateY(0)" : "translateY(20px)",
                    transition: `opacity 0.6s ease ${0.2 + i * 0.1}s, transform 0.6s ease ${0.2 + i * 0.1}s`,
                  }}
                >
                  <p className="text-xs tracking-widest uppercase text-muted-foreground mb-1">
                    {label}
                  </p>
                  <p className="text-foreground font-medium whitespace-pre-line">{val}</p>
                </div>
              ))}
            </div>

            <div className="flex flex-wrap gap-6">
              {[
                {
                  label: "Instagram",
                  href: "https://www.instagram.com/iprint_9955/",
                },
                {
                  label: "Telegram",
                  href: "https://t.me/iprint_tj1",
                },
              ].map(({ label, href }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs tracking-widest uppercase text-muted-foreground hover:text-foreground transition-colors duration-300 relative after:absolute after:bottom-0 after:left-0 after:h-px after:w-0 after:bg-foreground after:transition-all after:duration-300 hover:after:w-full"
                >
                  {label}
                </a>
              ))}
            </div>
          </div>

          {/* Form */}
          <form
            onSubmit={handleSubmit}
            className="flex flex-col gap-0"
            style={{
              opacity: formInView ? 1 : 0,
              transform: formInView ? "translateX(0)" : "translateX(40px)",
              transition: "opacity 0.8s ease 0.2s, transform 0.8s ease 0.2s",
            }}
          >
            {[
              {
                name: "name",
                label: "Ваше имя",
                type: "text",
                required: true,
                placeholder: "Иван Иванов",
              },
              {
                name: "company",
                label: "Компания",
                type: "text",
                required: false,
                placeholder: "Название компании",
              },
              {
                name: "email",
                label: "Электронная почта",
                type: "email",
                required: true,
                placeholder: "you@company.ru",
              },
            ].map((field, i) => (
        <div
              key={field.name}
              className="border-b border-border py-5 focus-within:border-brand transition-colors duration-300"
                style={{
                  opacity: formInView ? 1 : 0,
                  transform: formInView ? "translateY(0)" : "translateY(24px)",
                  transition: `opacity 0.6s ease ${0.3 + i * 0.08}s, transform 0.6s ease ${0.3 + i * 0.08}s`,
                }}
              >
                <label className="block text-xs tracking-widest uppercase text-muted-foreground mb-2">
                  {field.label}
                  {field.required && <span className="text-brand ml-1">*</span>}
                </label>
                <input
                  type={field.type}
                  name={field.name}
                  value={formData[field.name as keyof typeof formData]}
                  onChange={handleChange}
                  required={field.required}
                  className="w-full bg-transparent text-foreground text-base outline-none placeholder:text-muted-foreground/40"
                  placeholder={field.placeholder}
                />
              </div>
            ))}

            <div
              className="border-b border-border py-5 focus-within:border-brand transition-colors duration-300"
              style={{
                opacity: formInView ? 1 : 0,
                transform: formInView ? "translateY(0)" : "translateY(24px)",
                transition: "opacity 0.6s ease 0.54s, transform 0.6s ease 0.54s",
              }}
            >
              <label className="block text-xs tracking-widest uppercase text-muted-foreground mb-2">
                Бюджет проекта
              </label>
              <select
                name="budget"
                value={formData.budget}
                onChange={handleChange}
                className="w-full bg-transparent text-foreground text-base outline-none"
              >
                <option value="">Выберите диапазон</option>
                <option value="<1k">До 1 000 c</option>
                <option value="1k-10k">1 000 — 10 000 c</option>
                <option value="10k-50k">10 000 — 50 000 c</option>
                <option value="50k+">Более 50 000 c</option>
              </select>
            </div>

            <div
              className="border-b border-border py-5 focus-within:border-brand transition-colors duration-300"
              style={{
                opacity: formInView ? 1 : 0,
                transform: formInView ? "translateY(0)" : "translateY(24px)",
                transition: "opacity 0.6s ease 0.62s, transform 0.6s ease 0.62s",
              }}
            >
              <label className="block text-xs tracking-widest uppercase text-muted-foreground mb-2">
                Сообщение <span className="text-brand">*</span>
              </label>
              <textarea
                name="message"
                value={formData.message}
                onChange={handleChange}
                required
                rows={4}
                className="w-full bg-transparent text-foreground text-base outline-none resize-none placeholder:text-muted-foreground/40"
                placeholder="Опишите задачу, сроки и ожидания…"
              />
            </div>

            <div
              style={{
                opacity: formInView ? 1 : 0,
                transform: formInView ? "translateY(0)" : "translateY(24px)",
                transition: "opacity 0.6s ease 0.7s, transform 0.6s ease 0.7s",
              }}
            >
              <button
                type="submit"
                className="mt-8 w-full md:w-auto self-start inline-flex items-center justify-center gap-3 text-sm tracking-widest uppercase bg-foreground text-background px-12 py-5 hover:bg-brand hover:text-brand-foreground transition-all duration-300 font-medium group"
              >
                Отправить заявку
                <span className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform duration-300">↗</span>
              </button>
            </div>
          </form>
        </div>
      )}
    </section>
  )
}
