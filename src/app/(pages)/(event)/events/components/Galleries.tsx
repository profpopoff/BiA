'use client'

import { useContext } from 'react'
import { quarterArray } from '../../../../../utils/divideArray'
import Gallery from "../../../../components/Gallery/Gallery"
import { FilterContext } from '../../context/FilterContext'
import styles from '../Events.module.scss'

export default function Galleries({ events }: { events: any[] }) {

   const { type, date } = useContext(FilterContext)

   const sortArray = (array: any[], sortBy: string) => {
      if (!!sortBy) {
         return [
            ...array.filter(el => el.type === sortBy),
            ...array.filter(el => el.type !== sortBy)
         ]
      } else {
         return array
      }
   }

   return (
      <div className={styles.galleries}>
         {quarterArray(sortArray(events, type)
            .slice(0, 4 * Math.floor((events.length - 2) / 4) + 2))
            .map((events, index: number) => <Gallery key={index} array={events} />)}
      </div>
   )
}