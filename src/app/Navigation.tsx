import Link from "next/link"
import Image from "next/image"
import Cover from '../public/cover.jpeg'
import { useEffect, useRef, useState } from "react"

export default function Navigation({ navActive, setNavActive }: { navActive: boolean, setNavActive: Function }) {

   const toggleNavigation = () => setNavActive((prevNavActive: boolean) => !prevNavActive)

   const navLinksRef = useRef<any>(null)


   const [currentScroll, setCurrentScroll] = useState<number>(0)
   const [finalScroll, setFinalScroll] = useState<number>(1)
   const [scrolled, setScrolled] = useState(false)

   const handleScroll = () => {
      const position = navLinksRef.current.scrollLeft
      setCurrentScroll(position)
   }

   useEffect(() => {
      navLinksRef.current.addEventListener('scroll', handleScroll, { passive: true })

      return () => {
         navLinksRef.current.removeEventListener('scroll', handleScroll)
      }
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
         const maxX = navLinksRef.current.scrollWidth - window.innerWidth
         const panX = maxX * xDecimal
         navLinksRef.current.scrollTo({
            left: panX,
            behavior: 'auto'
         })
      }
   }

   const mouseEnter = (e: React.MouseEvent) => {
      const mouseX = e.pageX
      const xDecimal = mouseX / window.innerWidth
      const maxX = navLinksRef.current.scrollWidth - window.innerWidth
      const panX = maxX * xDecimal
      setFinalScroll(Math.floor(panX))
      navLinksRef.current.scrollTo({
         left: panX,
         behavior: 'smooth'
      })
   }

   return (
      <>
         <button
            className="nav-toggle"
            onClick={toggleNavigation}
         >
            {navActive ? 'true' : 'false'}
         </button>
         <nav className="nav">
            <div
               className="nav-links"
               ref={navLinksRef}
               onMouseMove={mouseScroll}
               onMouseEnter={mouseEnter}
               onMouseLeave={() => {
                  navLinksRef.current.scrollTo({
                     left: 0,
                     behavior: 'smooth'
                  })
                  setScrolled(false)
               }}
            >
               <Link className="link" href="/" onClick={toggleNavigation}>
                  <h2 className="link-label">home</h2>
                  <div className="link-image">
                     <Image className="src" alt="home" src={Cover} />
                  </div>
               </Link>
               <Link className="link" href="/cases" onClick={toggleNavigation}>
                  <h2 className="link-label">work</h2>
                  <div className="link-image">
                     <Image className="src" alt="home" src={Cover} />
                  </div>
               </Link>
               <Link className="link" href="/about" onClick={toggleNavigation}>
                  <h2 className="link-label">about</h2>
                  <div className="link-image">
                     <Image className="src" alt="home" src={Cover} />
                  </div>
               </Link>
               <Link className="link" href="/contact" onClick={toggleNavigation}>
                  <h2 className="link-label">contact</h2>
                  <div className="link-image">
                     <Image className="src" alt="home" src={Cover} />
                  </div>
               </Link>
               <Link className="link" href="/" onClick={toggleNavigation}>
                  <h2 className="link-label">join us</h2>
                  <div className="link-image">
                     <Image className="src" alt="home" src={Cover} />
                  </div>
               </Link>
            </div>
         </nav >

      </>
   )
}