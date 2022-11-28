'use client'

import { useContext } from "react"
import { InteractionContext } from "../InteractionContext"

export default function Main({
   children,
}: {
   children: React.ReactNode
}) {

   const { nav, toggleNav } = useContext(InteractionContext)

   return (
      <main className={nav ? 'navActive' : ''} onClick={() => nav && toggleNav?.()}>
         {children}
      </main>
   )
}