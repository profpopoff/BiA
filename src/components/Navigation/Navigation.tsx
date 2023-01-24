import { usePathname, useRouter } from "next/navigation"
import { useContext, useEffect, useRef, useState } from "react"

import { InteractionContext } from "../../context/InteractionContext"
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
      navLinksRef.current?.addEventListener('scroll', handleScroll, { passive: true })

      return () => navLinksRef.current?.removeEventListener('scroll', handleScroll)
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

   const router = useRouter()

   const handleClick = (link: string) => {
      toggleNav?.()
      setTimeout(() => router.push(link), 500)
   }

   const [windowWidth, setWindowWidth] = useState<Number>()

   const handleWindowWidthChange = (event: UIEvent) => {
      const w = event.target as Window
      setWindowWidth(w.innerWidth)
   }

   useEffect(() => {
      setWindowWidth(window.innerWidth)

      window.addEventListener('resize', handleWindowWidthChange)

      return () => {
         window.addEventListener('resize', handleWindowWidthChange)
      }
   }, [])

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
            <div className={navigation.link} onClick={() => handleClick('/')}>
               <h2 className={pathname == "/" ? `${navigation.linkLabel} ${navigation.linkActive}` : navigation.linkLabel}>Главная</h2>
               <div className={`${navigation.home} ${navigation.linkImage}`}></div>
            </div>
            <div className={navigation.link} onClick={() => handleClick('/events')}>
               <h2 className={pathname == "/events" ? `${navigation.linkLabel} ${navigation.linkActive}` : navigation.linkLabel}>Афиша</h2>
               <div className={`${navigation.linkImage} ${navigation.events}`}></div>
            </div>
            <div className={navigation.link} onClick={() => handleClick('/about')}>
               <h2 className={pathname == "/about" ? `${navigation.linkLabel} ${navigation.linkActive}` : navigation.linkLabel}>О музее</h2>
               <div className={`${navigation.linkImage} ${navigation.about}`}></div>
            </div>
            <div className={navigation.link} onClick={() => handleClick('/contact')}>
               <h2 className={pathname == "/contact" ? `${navigation.linkLabel} ${navigation.linkActive}` : navigation.linkLabel}>Контакты</h2>
               <div className={`${navigation.linkImage} ${navigation.contact}`}></div>
            </div>
         </div>
      </nav >
   )
}