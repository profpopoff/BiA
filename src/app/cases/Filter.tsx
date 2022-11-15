'use client'

import { useContext, useState } from 'react'
import { InteractionContext } from '../InteractionContext'
import styles from './Cases.module.scss'

export default function Filter() {
   return (
      <>
         <FilterButton />
      </>
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