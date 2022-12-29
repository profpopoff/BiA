'use client'

import Link from 'next/link'
import Image from 'next/image'
import { usePathname } from 'next/navigation'
import { useContext, useEffect, useRef } from 'react'

import galleryStyle from './gallery.module.scss'
import styles from '../../(pages)/(event)/events/Events.module.scss'
import { decode } from 'html-entities'
import { FilterContext } from '../../(pages)/(event)/context/FilterContext'

const Gallery = ({ events }: { events: any[] }) => {

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

   const { type, date } = useContext(FilterContext)

   useEffect(() => {
      const container = galleryRef.current?.parentElement?.parentElement?.parentElement
      container?.scrollTo({
         top: 0,
         behavior: 'smooth'
      })
   }, [type, date])


   const pathname = usePathname()

   return (
      <div
         className={pathname === '/' ? `${galleryStyle.gallery} ${galleryStyle.reverse}` : `${galleryStyle.gallery} ${styles.gallery}`}
         ref={galleryRef}
      >
         {events.map((event) =>
            <Card event={event} key={event._id} />
         )}
      </div>
   )
}

const Card = ({ event }: { event: any }) => {

   const { type, date } = useContext(FilterContext)

   return (
      <Link href={`/event/${event.link}`}
         className={!!type && type !== event.type ?
            `${galleryStyle.card} ${galleryStyle.filtered}`
            : galleryStyle.card}
         key={event._id}
      >
         <Image
            className={galleryStyle.image}
            src={event.images.cover}
            fill={true}
            sizes='50vw'
            alt={`${decode(event.title)} image`}
         />
         <h2 className={galleryStyle.headline}>
            <span className={galleryStyle.title}>{decode(event.title)}</span>
            {!!event.artist && <span className={galleryStyle.artist}>{decode(event.artist.name)}</span>}
         </h2>
         {new Date() < new Date(event.dates.start) &&
            <div className={galleryStyle.marker}>
               <span className={galleryStyle.text}>Скоро</span>
            </div>}
      </Link>
   )
}

export default Gallery