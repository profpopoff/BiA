'use client'

import { useContext, useState } from 'react'
import { InteractionContext } from '../../components/InteractionContext'
import styles from './Cases.module.scss'

export default function Filter() {
   return (
      <div className={styles.filter}>
         <div className={styles.filter_wrapper}>
            <FilterButton />
         </div>
      </div>
   )
}

export const FilterButton = () => {

   const { nav, toggleNav, filter, toggleFilter } = useContext(InteractionContext)

   const handleClick = () => {
      if (nav) {
         toggleNav?.()
      }
      toggleFilter?.()
   }

   return <button className={`${styles.filtersButton} ${filter && styles.filterActive}`} onClick={handleClick}>Filter Work</button>
}