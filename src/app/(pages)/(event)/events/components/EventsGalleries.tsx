'use client'

import { useContext, useEffect, useRef, useState } from 'react'
import { countOff, quarterArray } from '../../../../../utils/divideArray'
import Gallery from "../../../../components/Gallery/Gallery"
import { FilterContext } from '../../context/FilterContext'
import styles from '../Events.module.scss'

export default function EventsGalleries({ events }: { events: any[] }) {

   const { filter } = useContext(FilterContext)

   const [selectedGallery, setSelectedGallery] = useState(0)

   const sortArray = (array: any[]) => {

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
         array.map((events: any, index: number) =>
            <Gallery key={index} array={events} galleryIndex={index} selectedGallery={selectedGallery} setSelectedGallery={setSelectedGallery} />)
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