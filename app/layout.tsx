import type { Metadata } from 'next'
import { Inter, Syne } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import './globals.css'

const inter = Inter({
  subsets: ['latin', 'cyrillic'],
  variable: '--font-inter',
})

const syne = Syne({
  subsets: ['latin'],
  weight: ['400', '600', '700', '800'],
  variable: '--font-syne',
})

export const metadata: Metadata = {
  title: 'FORMA — Lead by Design',
  description: 'Рекламное агентство нового поколения. Стратегия, дизайн и технологии для брендов, которые хотят вести.',
  generator: 'v0.app',
  openGraph: {
    title: 'FORMA — Lead by Design',
    description: 'Рекламное агентство нового поколения.',
    type: 'website',
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="ru" className={`${inter.variable} ${syne.variable}`}>
      <body className="font-sans antialiased bg-background text-foreground">
        {children}
        {process.env.NODE_ENV === 'production' && <Analytics />}
      </body>
    </html>
  )
}
