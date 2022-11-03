'use client'

import { useState } from 'react'
import './globals.scss'
import Navigation from './Navigation'

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {

  const [navActive, setNavActive] = useState(false)

  return (
    <html>
      <head>
        <title>BiA</title>
      </head>
      <body data-nav={navActive}>
        <main>
          {children}
        </main>
        <Navigation navActive={navActive} setNavActive={setNavActive} />
      </body>
    </html>
  )
}
