import Link from "next/link"

export default function Navigation() {
   return (
      <nav>
         <div className="nav-links">
            <Link href="/">home</Link>
            <Link href="/cases">work</Link>
            {/* <Link href={`/case/${id}`}>case</Link> */}
            <Link href="/about">about</Link>
            <Link href="/contact">contact</Link>
            <Link href="/">join us</Link>
         </div>
      </nav>
   )
}