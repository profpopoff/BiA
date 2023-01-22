'use client'

import Link from 'next/link'
import Image from 'next/image'
import { usePathname, useRouter } from 'next/navigation'
import { useContext, useEffect, useRef, useState } from 'react'

import galleryStyle from './gallery.module.scss'
import styles from '../../(pages)/(event)/events/Events.module.scss'
import { decode } from 'html-entities'
import { FilterContext } from '../../(pages)/(event)/context/FilterContext'
import { InteractionContext } from '../../context/InteractionContext'

const Gallery = ({ array, galleryIndex, selectedGallery, setSelectedGallery }:
   { array: any[], galleryIndex: number, selectedGallery?: number, setSelectedGallery?: React.Dispatch<React.SetStateAction<number>> }) => {

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

   const { filter } = useContext(FilterContext)

   useEffect(() => {
      const container = galleryRef.current?.parentElement?.parentElement?.parentElement

      container?.scrollTo({ top: 0 })

      const animation = (from: string) => [
         { transform: `translateY(${from})`, opacity: '0' },
         { transform: 'translateY(0px)', opacity: '1' }
      ]

      const animationTiming = {
         duration: 300,
         iterations: 1,
      }

      if (galleryIndex % 2 === 0) {
         galleryRef.current?.children[0].animate(animation('-100px'), animationTiming)
         galleryRef.current?.children[1].animate(animation('-100px'), animationTiming)
         galleryRef.current?.children[2].animate(animation('-100px'), animationTiming)
         galleryRef.current?.children[3].animate(animation('-100px'), animationTiming)
      } else {
         galleryRef.current?.children[0].animate(animation('100px'), animationTiming)
         galleryRef.current?.children[1].animate(animation('100px'), animationTiming)
         galleryRef.current?.children[2].animate(animation('100px'), animationTiming)
         galleryRef.current?.children[3].animate(animation('100px'), animationTiming)
      }
   }, [filter])


   const pathname = usePathname()

   return (
      <div
         className={pathname === '/events' ? `${galleryStyle.gallery} ${styles.gallery}` : `${galleryStyle.gallery} ${galleryStyle.reverse}`}
         ref={galleryRef}
         style={{ zIndex: selectedGallery === galleryIndex ? '2' : '1' }}
      >
         {pathname === '/contact' ?
            array.map((image, index) =>
               <ImageCard image={image} key={index} />) :
            array.map((event, index) =>
               <EventCard event={event} key={event._id} galleryIndex={galleryIndex} setSelectedGallery={setSelectedGallery} />)
         }
      </div>
   )
}

const EventCard = ({ event, galleryIndex, setSelectedGallery }:
   { event: any, galleryIndex: number, setSelectedGallery?: React.Dispatch<React.SetStateAction<number>> }) => {

   const { filter } = useContext(FilterContext)

   const router = useRouter()

   const isFiltered = () => {

      const filterType = filter.split(':')[0]
      const filterValue = filter.split(':')[1]

      if (filterType === 'type') {
         return filterValue === event.type ? true : false
      } else if (filterType === 'date') {
         return event.dates.end ?
            new Date(filterValue) <= new Date(event.dates.end) &&
            new Date(filterValue) >= new Date(event.dates.start) :
            new Date(filterValue) === new Date(event.dates.start) ? true : false
      } else { return true }
   }

   const clickHandle = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {

      setSelectedGallery?.(galleryIndex)

      const container = e.currentTarget as HTMLElement
      const clientRect = container.getBoundingClientRect()

      const wrapper = container.parentElement?.parentElement?.parentElement?.parentElement!
      const mainContainer = wrapper.parentElement! as HTMLElement
      const filter = wrapper.children[0].children[0]! as HTMLElement

      mainContainer.style.overflow = 'hidden'

      filter.style.zIndex = '1'

      container.style.pointerEvents = 'none'
      container.style.cursor = 'default'
      container.style.zIndex = '2'
      container.style.inset = `${-clientRect.y}px 
      ${-(window.innerWidth - clientRect.x - clientRect.width)}px 
      ${-(window.innerHeight - clientRect.y - clientRect.height)}px 
      ${-clientRect.x}px`

      router.push(`/event/${event.link}`)
   }

   const { nav } = useContext(InteractionContext)

   return (
      <div
         className={isFiltered() ?
            galleryStyle.card : `${galleryStyle.card} ${galleryStyle.filtered}`}
         key={event._id}
      >
         <div
            className={galleryStyle.cardContainer}
            onClick={(e) => !nav && clickHandle(e)}
         >
            <div className={galleryStyle.image}>
               <Image
                  className={galleryStyle.src}
                  src={event.images.cover}
                  fill={true}
                  sizes='100vw'
                  alt={`${decode(event.title)} image`}
               />
            </div>
            <h2 className={galleryStyle.headline}>
               <span className={galleryStyle.title}>{decode(event.title)}</span>
               {!!event.artist && <span className={galleryStyle.artist}>{decode(event.artist.name)}</span>}
            </h2>
            {new Date() < new Date(event.dates.start) &&
               <div className={galleryStyle.marker}>
                  <span className={galleryStyle.text}>Скоро</span>
               </div>}
         </div>
      </div>
   )
}

const ImageCard = ({ image }: { image: string }) => {
   return (
      <div className={galleryStyle.card}>
         <div className={galleryStyle.image}>
            <Image
               className={galleryStyle.src}
               src={image}
               fill
               sizes='50vw'
               alt='image'
            />
         </div>
      </div>
   )
}

export default Gallery