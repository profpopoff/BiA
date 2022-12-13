'use client'

import { useContext, useState } from 'react'
import { InteractionContext } from '../../../../context/InteractionContext'

import filter from './Filter.module.scss'
import page from '../../Events.module.scss'

export default function Filter() {
   return (
      <div className={filter.filter}>
         <div className={filter.filter_wrapper}>
            <FilterButton />
         </div>
      </div>
   )
}

export const FilterButton = () => {

   const { nav, toggleNav, filterActive, toggleFilter } = useContext(InteractionContext)

   const handleClick = () => {
      if (nav) {
         toggleNav?.()
      }
      toggleFilter?.()
   }

   return (
      <button
         className={filterActive ? `${filter.button} ${filter.active} ${page.filterActive}` : filter.button}
         onClick={handleClick}
      >
         Filter Work
      </button>
   )
}