import Head from 'next/head'
import { useContext } from 'react'

import { InteractionContext } from '../context/InteractionContext'
import Header from './Header/Header'

import MainButton from './MainButton/MainButton'
import Navigation from './Navigation/Navigation'

export default function Layout({ children, title }:
   { children: React.ReactNode, title?: string }) {

   const { nav, toggleNav } = useContext(InteractionContext)

   return (
      <>
         <Head>
            <title>{`${!!title ? title + ' | ' : ''}Erarta`}</title>
            <meta name="viewport" content="width=device-width, initial-scale=1" />
         </Head>
         <Header />
         <main
            className={!!nav ? "navActive" : ''}
            onClick={() => !!nav && toggleNav?.()}
         >
            {children}
         </main>
         <MainButton />
         <Navigation />
      </>
   )
}