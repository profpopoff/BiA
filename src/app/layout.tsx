import '@fortawesome/fontawesome-svg-core/styles.css'
import '../style/index.scss'

import ContextProvider from './InteractionContext'
import Header from './_components/Header'
import Main from './_components/Main'
import MainToggle from './_components/MainToggle'
import Navigation from './_components/Navigation'

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
