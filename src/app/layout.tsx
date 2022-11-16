'use client'

import './globals.scss'
import '@fortawesome/fontawesome-svg-core/styles.css'

import ContextProvider from './InteractionContext'
import Main from './Main'
import MainToggle from './MainToggle'
import Navigation from './Navigation'

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
        <ContextProvider>
          <Main>{children}</Main>
          <MainToggle />
          <Navigation />
        </ContextProvider>
      </body>
    </html>
  )
}
