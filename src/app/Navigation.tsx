import Link from "next/link"
import Image from "next/image"
import Cover from '../public/cover.jpeg'

export default function Navigation({ navActive, setNavActive }: { navActive: boolean, setNavActive: Function }) {

   const toggleNavigation = () => setNavActive((prevNavActive: boolean) => !prevNavActive)

   return (
      <>
         <button
            className="nav-toggle"
            onClick={toggleNavigation}
         >
            {navActive ? 'true' : 'false'}
         </button>
         <nav className="nav">
            <div className="nav-links">
               <Link className="link" href="/" onClick={toggleNavigation}>
                  <h2 className="link-label">home</h2>
                  <Image className="link-image" alt="home" src={Cover} />
               </Link>
               <Link className="link" href="/cases" onClick={toggleNavigation}>
               <h2 className="link-label">work</h2>
                  <Image className="link-image" alt="home" src={Cover} />
               </Link>
               {/* <Link href={`/case/${id}`}>case</Link> */}
               <Link className="link" href="/about" onClick={toggleNavigation}>
               <h2 className="link-label">about</h2>
                  <Image className="link-image" alt="home" src={Cover} />
               </Link>
               <Link className="link" href="/contact" onClick={toggleNavigation}>
               <h2 className="link-label">contact</h2>
                  <Image className="link-image" alt="home" src={Cover} />
               </Link>
               <Link className="link" href="/" onClick={toggleNavigation}>
               <h2 className="link-label">join us</h2>
                  <Image className="link-image" alt="home" src={Cover} />
               </Link>
            </div>
         </nav>

      </>
   )
}