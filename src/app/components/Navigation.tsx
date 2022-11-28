'use client'

import Link from "next/link"
import Image from "next/image"
import { usePathname } from "next/navigation"
import Cover from '../../public/cover.jpeg'
import { useContext, useEffect, useRef, useState } from "react"
import { InteractionContext } from "../InteractionContext"

export default function Navigation() {

   const { nav, toggleNav } = useContext(InteractionContext)

   const navLinksRef = useRef<any>(null)

   const pathname = usePathname()

   const [currentScroll, setCurrentScroll] = useState<number>(0)
   const [finalScroll, setFinalScroll] = useState<number>(1)
   const [scrolled, setScrolled] = useState(false)

   const handleScroll = () => {
      const position = navLinksRef.current.scrollLeft
      setCurrentScroll(position)
   }

   useEffect(() => {
      navLinksRef.current.addEventListener('scroll', handleScroll, { passive: true })

      return () => navLinksRef.current.removeEventListener('scroll', handleScroll)
   }, [])

   useEffect(() => {
      if (finalScroll === currentScroll) {
         setScrolled(true)
      }
   }, [currentScroll])

   const mouseScroll = (e: React.MouseEvent) => {
      if (scrolled) {
         const mouseX = e.pageX
         const xDecimal = mouseX / window.innerWidth
         const maxX = e.currentTarget.scrollWidth - window.innerWidth
         const panX = maxX * xDecimal
         e.currentTarget.scrollTo({
            left: panX,
            behavior: 'auto'
         })
      }
   }

   const mouseEnter = (e: React.MouseEvent) => {
      const mouseX = e.pageX
      const xDecimal = mouseX / window.innerWidth
      const maxX = e.currentTarget.scrollWidth - window.innerWidth
      const panX = maxX * xDecimal
      setFinalScroll(Math.floor(panX))
      e.currentTarget.scrollTo({
         left: panX,
         behavior: 'smooth'
      })
   }

   return (
      <nav className="nav">
         <div
            className={nav ? "nav-links navActive" : "nav-links"}
            ref={navLinksRef}
            onMouseMove={mouseScroll}
            onMouseEnter={mouseEnter}
            onMouseLeave={(e) => {
               e.currentTarget.scrollTo({
                  left: 0,
                  behavior: 'smooth'
               })
               setScrolled(false)
            }}
         >
            <Link className="link" href="/" onClick={toggleNav}>
               <h2 className={`link-label ${pathname == "/" ? "active" : ""}`}>home</h2>
               <div className="link-image">
                  <Image className="src" alt="home" src={Cover} />
               </div>
            </Link>
            <Link className="link" href="/cases" onClick={toggleNav}>
               <h2 className={`link-label ${pathname == "/cases" ? "active" : ""}`}>work</h2>
               <div className="link-image">
                  <Image className="src" alt="home" src={Cover} />
               </div>
            </Link>
            <Link className="link" href="/about" onClick={toggleNav}>
               <h2 className={`link-label ${pathname == "/about" ? "active" : ""}`}>about</h2>
               <div className="link-image">
                  <Image className="src" alt="home" src={Cover} />
               </div>
            </Link>
            <Link className="link" href="/contact" onClick={toggleNav}>
               <h2 className={`link-label ${pathname == "/contact" ? "active" : ""}`}>contact</h2>
               <div className="link-image">
                  <Image className="src" alt="home" src={Cover} />
               </div>
            </Link>
            <Link className="link" href="/" onClick={toggleNav}>
               <h2 className={`link-label ${pathname == "/join-us" ? "active" : ""}`}>join us</h2>
               <div className="link-image">
                  <Image className="src" alt="home" src={Cover} />
               </div>
            </Link>
         </div>
      </nav >
   )
}