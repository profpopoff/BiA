import type { AppProps } from 'next/app'

import '../style/index.scss'
import InteractionProvider from '../context/InteractionContext'

import '@fortawesome/fontawesome-svg-core/styles.css'

export default function MyApp({ Component, pageProps }: AppProps) {
   return (
      <InteractionProvider>
         <Component {...pageProps} />
      </InteractionProvider>
   )
}
