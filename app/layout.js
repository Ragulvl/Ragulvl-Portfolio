import './globals.css'

export const metadata = {
  title: 'Ragul VL | Software Development Engineer',
  description: 'Immersive portfolio of Ragul VL - Full-Stack Developer, Competitive Programmer, AI & Data Science Enthusiast',
  keywords: 'portfolio, developer, software engineer, full-stack, react, node.js, competitive programming',
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
