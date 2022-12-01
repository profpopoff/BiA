import '@fortawesome/fontawesome-svg-core/styles.css'
import '../style/index.scss'

import ContextProvider from './context/InteractionContext'
import Header from './components/Header/Header'
import MainToggle from './components/MainButton/MainButton'
import Navigation from './components/Navigation/Navigation'

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
          <main>{children}</main>
          <MainToggle />
          <Navigation />
        </ContextProvider>
      </body>
    </html>
  )
}
