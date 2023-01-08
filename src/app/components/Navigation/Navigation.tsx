'use client'

import Link from "next/link"
import Image from "next/image"
import { usePathname } from "next/navigation"
import { useContext, useEffect, useRef, useState } from "react"
import { InteractionContext } from "../../context/InteractionContext"
import images from '../../../public/img/navigation/navigationImages'

import navigation from './Navigation.module.scss'

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
      <nav className={navigation.container}>
         <div
            className={nav ? `${navigation.links} ${navigation.active} navActive` : navigation.links}
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
            <Link className={navigation.link} href="/" onClick={toggleNav}>
               <h2 className={pathname == "/" ? `${navigation.linkLabel} ${navigation.linkActive}` : navigation.linkLabel}>Главная</h2>
               <div className={navigation.linkImage}>
                  <Image className={navigation.src} alt="home" src={images.home} priority />
               </div>
            </Link>
            <Link className={navigation.link} href="/events" onClick={toggleNav}>
               <h2 className={pathname == "/events" ? `${navigation.linkLabel} ${navigation.linkActive}` : navigation.linkLabel}>Афиша</h2>
               <div className={navigation.linkImage}>
                  <Image className={navigation.src} alt="home" src={images.events} priority />
               </div>
            </Link>
            <Link className={navigation.link} href="/about" onClick={toggleNav}>
               <h2 className={pathname == "/about" ? `${navigation.linkLabel} ${navigation.linkActive}` : navigation.linkLabel}>О музее</h2>
               <div className={navigation.linkImage}>
                  <Image className={navigation.src} alt="home" src={images.about} priority />
               </div>
            </Link>
            <Link className={navigation.link} href="/contact" onClick={toggleNav}>
               <h2 className={pathname == "/contact" ? `${navigation.linkLabel} ${navigation.linkActive}` : navigation.linkLabel}>Контакты</h2>
               <div className={navigation.linkImage}>
                  <Image className={navigation.src} alt="home" src={images.contact} priority />
               </div>
            </Link>
            <Link className={navigation.link} href="/" onClick={toggleNav}>
               <h2 className={pathname == "/" ? `${navigation.linkLabel} ${navigation.linkActive}` : navigation.linkLabel}>join us</h2>
               <div className={navigation.linkImage}>
                  <Image className={navigation.src} alt="home" src={images.contact} />
               </div>
            </Link>
         </div>
      </nav >
   )
}