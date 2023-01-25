import Image from 'next/image'
import { usePathname } from 'next/navigation'
import { useContext, useEffect, useRef } from 'react'

import Event from '../../interfaces/Event'

import styles from './Gallery.module.scss'
import events from '../../style/pages/Events.module.scss'

import EventCard from '../EventCard/EventCard'
import { FilterContext } from '../../context/FilterContext'

const Gallery = ({ array, galleryIndex, container, selectedGallery, setSelectedGallery }: {
   array: any[], galleryIndex: number,
   container: React.RefObject<HTMLDivElement>,
   selectedGallery?: number,
   setSelectedGallery?: React.Dispatch<React.SetStateAction<number>>
}) => {

   const galleryRef = useRef<HTMLDivElement>(null)

   useEffect(() => {
      const maxTargetHeight = galleryRef.current?.parentElement?.scrollHeight!
      const currentTargetHeight = galleryRef.current?.scrollHeight!

      const onScroll = () => {
         if (galleryRef.current!.parentElement!.getBoundingClientRect().y <= 0) {
            const scrollY = -galleryRef.current!.parentElement!.getBoundingClientRect().y
            const yDecimal = scrollY / (maxTargetHeight - window.innerHeight)
            const maxY = currentTargetHeight - maxTargetHeight
            const panY = maxY * yDecimal
            galleryRef.current!.style.transform = `translateY(${-panY}px)`
         }
      }

      container.current?.addEventListener('scroll', onScroll)
      return () => {
         container.current?.removeEventListener('scroll', onScroll)
      }
   }, [])

   const { filter } = useContext(FilterContext)

   useEffect(() => {

      container.current?.scrollTo({ top: 0 })

      const animation = (from: string) => [
         { transform: `translateY(${from})`, opacity: '0' },
         { transform: 'translateY(0px)', opacity: '1' }
      ]

      const animationTiming = {
         duration: 300,
         iterations: 1,
      }

      if (galleryIndex % 2 === 0) {
         for (let i = 0; i < galleryRef.current!.childNodes.length - 1; i++) {
            galleryRef.current?.children[i].animate(animation('-30%'), animationTiming)
         }
      } else {
         for (let i = 0; i < galleryRef.current!.childNodes.length - 1; i++) {
            galleryRef.current?.children[i].animate(animation('30%'), animationTiming)
         }
      }
   }, [filter])

   const pathname = usePathname()

   return (
      <div
         className={pathname === '/events' ?
            `${styles.gallery} ${events.gallery}` :
            `${styles.gallery} ${styles.reverse}`}
         ref={galleryRef}
         style={{ zIndex: selectedGallery === galleryIndex ? '2' : '1' }}
      >
         {pathname === '/contact' ?
            array.map((image: string, index: number) =>
               <ImageCard image={image} key={index} />) :
            array.map((event: Event) =>
               <EventCard event={event} key={event._id} galleryIndex={galleryIndex} container={container} setSelectedGallery={setSelectedGallery} />)
         }
      </div>
   )
}

const ImageCard = ({ image }: { image: string }) => {
   return (
      <div className={styles.card}>
         <div className={styles.image}>
            <Image
               className={styles.src}
               src={image}
               fill
               priority
               alt='image'
            />
         </div>
      </div>
   )
}

export default Gallery