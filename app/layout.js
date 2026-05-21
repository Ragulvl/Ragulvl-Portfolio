import './globals.css'

export const metadata = {
  title: 'Ragul VL | Full Stack Developer & AI Engineer',
  description: 'Portfolio of Ragul VL - Full Stack Developer, Competitive Programmer, and AI & Data Science Engineer. B.Tech AI & DS @ KIT Coimbatore.',
  keywords: 'Ragul VL, portfolio, developer, software engineer, full-stack, react, node.js, competitive programming, AI, data science',
  openGraph: {
    title: 'Ragul VL | Full Stack Developer & AI Engineer',
    description: 'Full Stack Developer, Competitive Programmer, and AI & Data Science Engineer building scalable real-world products.',
    url: 'https://ragulvl.github.io/Ragulvl-Portfolio',
    siteName: 'Ragul VL Portfolio',
    type: 'website',
    locale: 'en_US',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Ragul VL | Full Stack Developer & AI Engineer',
    description: 'Full Stack Developer, Competitive Programmer, and AI & Data Science Engineer building scalable real-world products.',
  },
  robots: {
    index: true,
    follow: true,
  },
}

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="dark">
      <body className="antialiased">
        {children}
      </body>
    </html>
  )
}
