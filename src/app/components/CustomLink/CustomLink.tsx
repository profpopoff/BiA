import Link from "next/link"

import styles from './CustomLink.module.scss'

export default function CustomLink({ children, href }: {
   children: React.ReactNode, href: String
}) {
   return (
      <Link href={href.toString()} className={styles.link}>
         <span className={styles.dot}></span>
         <span className={styles.text}>{children}</span>
      </Link>
   )
}