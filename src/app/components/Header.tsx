'use client'

import Link from 'next/link'

import { useContext } from "react"
import { InteractionContext } from "./InteractionContext"

export default function Header() {

   const { nav, toggleNav } = useContext(InteractionContext)

   return (
      <header>
         <Link href='/' className='link' onClick={() => nav && toggleNav?.()}>ErArta.</Link>
      </header>
   )

}