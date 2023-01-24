import Link from 'next/link'
import { useContext } from "react"

import { InteractionContext } from "../../app/context/InteractionContext"
import header from './Header.module.scss'

export default function Header() {

   const { nav, toggleNav } = useContext(InteractionContext)

   return (
      <header className={header.container}>
         <Link href='/' className={header.link} onClick={() => nav && toggleNav?.()}>ErArta.</Link>
      </header>
   )
}