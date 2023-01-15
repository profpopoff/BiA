'use client'

import { useContext, useState } from 'react'
import { quarterArray } from '../../../../../utils/divideArray'
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

   return (
      <div className={styles.galleries}>
         {quarterArray(sortArray(events)
            .slice(0, 4 * Math.floor((events.length - 2) / 4) + 2))
            .map((events, index: number) =>
               <Gallery key={index} array={events} galleryIndex={index} selectedGallery={selectedGallery} setSelectedGallery={setSelectedGallery} />)}
      </div>
   )
}