import Navigation from './Navigation'

import './globals.scss'

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html>
      <head>
        <title>BiA</title>
      </head>
      <body>
        {children}
        <Navigation />
      </body>
    </html>
  )
}
