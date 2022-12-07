'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useEffect, useRef } from 'react'

import galleryStyle from './gallery.module.scss'
import styles from '../../(pages)/cases/Cases.module.scss'


export default function Gallery({ gallery }: { gallery: any[] }) {

   const galleryRef = useRef<HTMLDivElement>(null)

   useEffect(() => {
      const container = galleryRef.current?.parentElement?.parentElement?.parentElement
      const maxTargetHeight = galleryRef.current?.parentElement?.scrollHeight!
      const currentTargetHeight = galleryRef.current?.scrollHeight!

      const onScroll = () => {
         const scrollY = container?.scrollTop!
         const yDecimal = scrollY / (maxTargetHeight - window.innerHeight)
         const maxY = currentTargetHeight - maxTargetHeight
         const panY = maxY * yDecimal
         galleryRef.current!.style.transform = `translateY(${-panY}px)`
      }

      container?.addEventListener('scroll', onScroll)
      return () => {
         container?.removeEventListener('scroll', onScroll)
      }
   }, [])

   const pathname = usePathname()

   return (
      <div
         className={pathname === '/' ? `${galleryStyle.gallery} ${galleryStyle.reverse}` : `${galleryStyle.gallery} ${styles.gallery}`}
         ref={galleryRef}
      >
         {gallery.map((event) =>
            <Link href={`/case/${event.id}`} className={galleryStyle.card} key={event.id}>
               {/* <Image className={gallery.image} src={Cover} alt="cover" /> */}
               <div className={galleryStyle.headline}>
                  <h2 className={galleryStyle.title}>{event.title}</h2>
                  {!!event.artist && <span className={galleryStyle.artist}>{event.artist}</span>}
               </div>
            </Link>
         )}
      </div>
   )
}