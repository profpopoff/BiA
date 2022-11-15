'use client'

import { useState } from 'react'
import styles from './Cases.module.scss'

export default function Filters() {

   const [filtersActive, setFiltersActive] = useState<Boolean>(false)

   return (
      <div className={!!filtersActive && styles.filtersActive}>
         <button className={styles.filtersButton} onClick={() => setFiltersActive(prev => !prev)}>Filter Work</button>
      </div>
   )
}