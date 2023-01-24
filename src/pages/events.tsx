import { GetServerSideProps } from "next"
import { useContext, useEffect, useRef, useState } from "react"

import { InteractionContext } from "../context/InteractionContext"
import FilterProvider, { FilterContext } from "../context/FilterContext"
import { getEvents } from "./api/events"
import Event from "../interfaces/Event"
import { countOff, quarterArray } from "../utils/divideArray"
import { jsonParser } from "../utils/jsonParser"

import styles from '../style/pages/Events.module.scss'

import Filter from "../components/Filter/Filter"
import Gallery from "../components/Gallery/Gallery"
import Layout from "../components/layout"

function Events({ events }: { events: Event[] }) {

   const { filterActive } = useContext(InteractionContext)

   const containerRef = useRef<HTMLDivElement>(null)

   const [selectedGallery, setSelectedGallery] = useState(0)

   return (
      <Layout title="Афиша">
         <FilterProvider>
            <div
               className={`container ${filterActive ?
                  `${styles.eventsContainer} ${styles.filterActive}` :
                  styles.eventsContainer}`}
               ref={containerRef}
            >
               <div className={styles.wrapper}>
                  <EventsGalleries events={events} containerRef={containerRef} />
                  <Filter events={events} />
               </div>
            </div>
         </FilterProvider>
      </Layout>
   )
}

const EventsGalleries = ({ events, containerRef }: { events: Event[], containerRef: React.RefObject<HTMLDivElement> }) => {

   const { filter } = useContext(FilterContext)

   const [selectedGallery, setSelectedGallery] = useState(0)

   const sortArray = (array: Event[]) => {

      const filterType = filter.split(':')[0]
      const filterValue = filter.split(':')[1]

      if (filterType === 'type') {
         return [
            ...array.filter(el => el.type === filterValue),
            ...array.filter(el => el.type !== filterValue)
         ]
      } else if (filterType === 'date') {
         return [
            ...array.filter(el => el.dates.end ?
               new Date(filterValue) <= new Date(el.dates.end) &&
               new Date(filterValue) >= new Date(el.dates.start) :
               new Date(filterValue) === new Date(el.dates.start)),
            ...array.filter(el => el.dates.end ?
               new Date(filterValue) > new Date(el.dates.end) ||
               new Date(filterValue) < new Date(el.dates.start) :
               new Date(filterValue) !== new Date(el.dates.start))
         ]
      } else {
         return array
      }
   }

   const array = sortArray(events).slice(0, 4 * Math.floor((events.length - 2) / 4) + 2)

   const galleriesElement = (array: any[]) => {
      return (
         array.map((events: Event[], index: number) =>
            <Gallery key={index} array={events} container={containerRef} galleryIndex={index} selectedGallery={selectedGallery} setSelectedGallery={setSelectedGallery} />)
      )
   }

   const [windowWidth, setWindowWidth] = useState<Number>()

   const handleWindowWidthChange = (event: UIEvent) => {
      const w = event.target as Window
      setWindowWidth(w.innerWidth)
   }

   useEffect(() => {
      setWindowWidth(window.innerWidth)

      window.addEventListener('resize', handleWindowWidthChange)

      return () => {
         window.addEventListener('resize', handleWindowWidthChange)
      }
   }, [])

   return (
      <div className={!windowWidth ? `${styles.galleries} ${styles.transition}` : styles.galleries}>
         {!!windowWidth && (windowWidth > 1024 ?
            galleriesElement(quarterArray(array)) :
            galleriesElement(countOff(array, 2)))}
      </div>
   )
}

export const getServerSideProps: GetServerSideProps = async () => {

   const events = await getEvents()

   return {
      props: { events: jsonParser(events) }
   }
}

export default Events
