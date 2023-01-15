'use client'

import { useContext, useState } from 'react'
import { countOff } from '../../utils/divideArray'
import styles from '../HomePage.module.scss'
import Gallery from './Gallery/Gallery'

export default function HomePageGalleries({ events }: { events: any[] }) {

   const [selectedGallery, setSelectedGallery] = useState(0)

   return (
      <div className={styles.galleries}>
         {countOff(events
            .slice(0, 2 * Math.floor((events.length - 3) / 2) + 3), 2)
            .map((events: any[], index: number) => <Gallery key={index} array={events} galleryIndex={index} selectedGallery={selectedGallery} setSelectedGallery={setSelectedGallery} />)}
      </div>
   )
}