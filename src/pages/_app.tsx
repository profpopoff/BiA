import type { AppProps } from 'next/app'

import '../style/index.scss'
import InteractionProvider from '../context/InteractionContext'

import NextNProgress from 'nextjs-progressbar'
import '@fortawesome/fontawesome-svg-core/styles.css'

export default function MyApp({ Component, pageProps }: AppProps) {
   return (
      <InteractionProvider>
         <NextNProgress color="#D00439" height={0} />
         <Component {...pageProps} />
      </InteractionProvider>
   )
}
