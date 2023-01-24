'use client'

import Link from 'next/link'
import { useContext } from "react"

import header from './Header.module.scss'
import { InteractionContext } from "../../context/InteractionContext"

export default function Header() {

   const { nav, toggleNav } = useContext(InteractionContext)

   return (
      <header className={header.container}>
         <Link href='/' className={header.link} onClick={() => nav && toggleNav?.()}>ErArta.</Link>
      </header>
   )
}