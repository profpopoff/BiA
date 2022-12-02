'use client'

import Link from 'next/link'
import { useEffect, useRef } from 'react'

import galleryStyle from './gallery.module.scss'

export default function Gallery({ gallery, index }: { gallery: any[], index: number }) {

   const galleryRef = useRef<HTMLDivElement>(null)

   useEffect(() => {
      console.log(
         galleryRef.current?.scrollHeight,
         galleryRef.current?.parentElement?.scrollHeight,
         galleryRef.current?.parentElement?.parentElement?.parentElement?.scrollTop,
      )

      // !? scroll event listener on galleryRef.current?.parentElement?.parentElement?.parentElement
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