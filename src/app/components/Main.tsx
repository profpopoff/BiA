'use client'

import { useContext } from "react"
import { InteractionContext } from "../context/InteractionContext"

export default function MainComponent({ children }:
   { children: React.ReactNode }) {

   const { nav, toggleNav } = useContext(InteractionContext)

   return (
      <main className={!!nav ? "navActive" : ''} onClick={() => !!nav && toggleNav?.()}>{children}</main>
   )
}