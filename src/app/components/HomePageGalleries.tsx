'use client'

import { useState } from 'react'

import styles from '../HomePage.module.scss'
import Gallery from './Gallery/Gallery'

import { countOff } from '../../utils/divideArray'

export default function HomePageGalleries({ events }: { events: any[] }) {

   const [selectedGallery, setSelectedGallery] = useState(0)

   return (
      <div className={styles.galleries}>
         {countOff(events.slice(0, 9), 2)
            .map((events: any[], index: number) => <Gallery key={index} array={events} galleryIndex={index} selectedGallery={selectedGallery} setSelectedGallery={setSelectedGallery} />)}
      </div>
   )
}