import '@fortawesome/fontawesome-svg-core/styles.css'
import '../style/index.scss'

import ContextProvider from './context/InteractionContext'
import Header from './components/Header/Header'
import MainToggle from './components/MainButton/MainButton'
import Navigation from './components/Navigation/Navigation'
import MainComponent from './components/Main'

export default function RootLayout({ children }: {
  children: React.ReactNode
}) {

  return (
    <html>
      <body>
        <ContextProvider>
          <Header />
          <MainComponent>{children}</MainComponent>
          <MainToggle />
          <Navigation />
        </ContextProvider>
      </body>
    </html>
  )
}
