'use client'

import Link from 'next/link'
import { useEffect, useRef } from 'react'

import galleryStyle from './gallery.module.scss'

export default function Gallery({ gallery }: { gallery: any[] }) {

   const galleryRef = useRef<HTMLDivElement>(null)

   useEffect(() => {
      const container = galleryRef.current?.parentElement?.parentElement?.parentElement
      const maxHeight = galleryRef.current?.parentElement?.scrollHeight!
      const currentHeight = galleryRef.current?.scrollHeight!

      const onScroll = () => {
         const scrollY = galleryRef.current?.parentElement?.parentElement?.parentElement?.scrollTop!
         const yDecimal = scrollY / (maxHeight - window.innerHeight)
         const maxY = currentHeight - maxHeight
         const panY = maxY * yDecimal
         galleryRef.current!.style.transform = `translateY(${-panY}px)`
      }

      container?.addEventListener('scroll', onScroll)
      return () => {
         container?.removeEventListener('scroll', onScroll)
      }
   }, [])


   return (
      <div className={galleryStyle.gallery}
         ref={galleryRef}
      >
         {gallery.map((item) =>
            <Link href='/' className={galleryStyle.card} key={item.id}>
               {/* <Image className={gallery.image} src={Cover} alt="cover" /> */}
               <div className={galleryStyle.headline}>
                  <h2 className={galleryStyle.title}>{item.title}</h2>
                  {!!item.artist && <span className={galleryStyle.artist}>{item.artist}</span>}
               </div>
            </Link>
         )}
      </div>
   )
}