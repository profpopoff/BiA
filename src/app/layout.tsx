import '@fortawesome/fontawesome-svg-core/styles.css'
import '../style/index.scss'

import ContextProvider from './InteractionContext'
import Header from './components/Header'
import Main from './components/Main'
import MainToggle from './components/MainToggle'
import Navigation from './components/Navigation'

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
          <Header />
          <Main>{children}</Main>
          <MainToggle />
          <Navigation />
        </ContextProvider>
      </body>
    </html>
  )
}
