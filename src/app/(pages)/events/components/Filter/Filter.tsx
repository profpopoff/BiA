'use client'

import { useContext, useState } from 'react'
import { InteractionContext } from '../../../../context/InteractionContext'

import filter from './Filter.module.scss'
import page from '../../Events.module.scss'

export default function Filter() {

   const { filterActive } = useContext(InteractionContext)

   return (
      <div className={filter.filter}>
         <div className={filterActive ? `${filter.filter_wrapper} ${filter.active} ${page.filterActive}` : filter.filter_wrapper}>
            <Filters />
            <Button />
         </div>
      </div>
   )
}

const Filters = () => {
   return (
      <div className={filter.filters}>
         <div className={filter.category}>
            <h3>Категория</h3>
            <ul>
               <li>Временная вытсавка</li>
               <li>Постоянная выставка</li>
               <li>Выступление на сцене</li>
            </ul>
         </div>
         <div className={filter.date}>
            <h3>Дата</h3>
            <ul>
               <li>Сугодня</li>
               <li>Завтра</li>
               <li>Выбрать день</li>
            </ul>
         </div>
      </div>
   )
}

export const Button = () => {

   const { nav, toggleNav, toggleFilter } = useContext(InteractionContext)

   const handleClick = () => {
      if (nav) {
         toggleNav?.()
      }
      toggleFilter?.()
   }

   return (
      <button
         className={filter.button}
         onClick={handleClick}
      >Фильтры</button>
   )
}