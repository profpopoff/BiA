import Image from "next/image"
import { usePathname, useRouter } from "next/navigation"
import { useContext } from "react"

import { decode } from "html-entities"

import { FilterContext } from "../../context/FilterContext"
import { InteractionContext } from "../../context/InteractionContext"

import styles from '../Gallery/Gallery.module.scss'

const EventCard = ({ event, galleryIndex, container, setSelectedGallery }: {
   event: any,
   galleryIndex: number,
   container: React.RefObject<HTMLDivElement>,
   setSelectedGallery?: React.Dispatch<React.SetStateAction<number>>
}) => {

   const { filter } = useContext(FilterContext)

   const router = useRouter()

   const pathname = usePathname()

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

      const target = e.currentTarget as HTMLElement
      const clientRect = target.getBoundingClientRect()

      const wrapper = target.parentElement?.parentElement?.parentElement?.parentElement!
      const mainContainer = container.current as HTMLElement

      if (pathname === '/events') {
         const filter = wrapper.children[1] as HTMLElement
         filter.style.zIndex = '1'
      }

      mainContainer.style.overflow = 'hidden'

      target.style.pointerEvents = 'none'
      target.style.cursor = 'default'
      target.style.zIndex = '2'
      target.style.inset = `${-clientRect.y}px 
      ${-(window.innerWidth - clientRect.x - clientRect.width)}px 
      ${-(window.innerHeight - clientRect.y - clientRect.height)}px 
      ${-clientRect.x}px`

      setTimeout(() => router.push(`/event/${event.link}`), 750)
   }

   const { nav } = useContext(InteractionContext)

   return (
      <div
         className={isFiltered() ?
            styles.card : `${styles.card} ${styles.filtered}`}
         key={event._id}
      >
         <div
            className={styles.cardContainer}
            onClick={(e) => !nav && clickHandle(e)}
         >
            <div className={styles.image}>
               <Image
                  className={styles.src}
                  src={event.images.cover}
                  fill
                  priority
                  sizes="(max-width: 1024px) 300vw, 100vw"
                  alt={`${decode(event.title)} image`}
               />
            </div>
            <h2 className={styles.headline}>
               <span className={styles.title}>{decode(event.title)}</span>
               {!!event.artist && <span className={styles.artist}>{decode(event.artist.name)}</span>}
            </h2>
            {new Date() < new Date(event.dates.start) &&
               <div className={styles.marker}>
                  <span className={styles.text}>Скоро</span>
               </div>}
         </div>
      </div>
   )
}

export default EventCard