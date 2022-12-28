'use client'

import { useContext, useState } from 'react'
import { InteractionContext } from '../../../../../context/InteractionContext'

import filterStyle from './Filter.module.scss'
import page from '../../Events.module.scss'
import { FilterContext } from '../../../context/FilterContext'

export default function Filter({ events }: { events: any[] }) {

   const { filterActive } = useContext(InteractionContext)

   return (
      <div className={filterStyle.filter}>
         <div className={filterActive ?
            `${filterStyle.filter_wrapper} ${filterStyle.active} ${page.filterActive}` :
            filterStyle.filter_wrapper}
         >
            <Filters events={events} />
            <Button />
         </div>
      </div>
   )
}

const Filters = ({ events }: { events: any[] }) => {

   const { type, changeType, date, changeDate } = useContext(FilterContext)

   const changeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
      if (e.target.checked) {
         [e.target.name].toString() === 'type' ?
            changeType?.(e.target.value) :
            changeDate?.(e.target.value)
      } else {
         [e.target.name].toString() === 'type' ?
            changeType?.('') :
            changeDate?.('')
      }
   }

   const types = Array.from(new Set(events.map((item: any) => item.type)))

   const typeToRus = (item: string) => {
      switch (item) {
         case 'photo':
            return 'Фотография'
         case 'painting':
            return 'Живопись'
         case 'digital':
            return 'Digital art'
         case 'sculpture':
            return 'Скульптура'
         case 'performance':
            return 'Выступление на сцене'
      }
   }

   return (
      <div className={filterStyle.filters}>
         <div className={filterStyle.category}>
            <h3>Категория</h3>
            <ul>
               {types.map(typeElement => (
                  <li key={typeElement}><label>
                     <input type="checkbox" value={typeElement} name="type"
                        checked={type === typeElement}
                        onChange={changeHandler}
                     />
                     <span className={filterStyle.span}>
                        <span>{typeToRus(typeElement)}</span>
                        <span>{events.filter(event => event.type === typeElement).length}</span>
                     </span>
                  </label></li>
               ))}
            </ul>
         </div>
         <div className={filterStyle.date}>
            <h3>Дата</h3>
            <ul>
               <li><label>
                  <input type="checkbox" value="today" name="date"
                     checked={date === 'today'}
                     onChange={changeHandler}
                  />
                  <span>Сегодня</span>
               </label></li>
               <li><label>
                  <input type="checkbox" value="tomorrow" name="date"
                     checked={date === 'tomorrow'}
                     onChange={changeHandler}
                  />
                  <span>Завтра</span>
               </label></li>
               <li><label>
                  <input type="checkbox" value="choose" name="date"
                     checked={date === 'choose'}
                     onChange={changeHandler}
                  />
                  <span>Выбрать день</span>
               </label></li>
            </ul>
         </div>
      </div>
   )
}

export const Button = () => {

   const { nav, toggleNav, toggleFilter } = useContext(InteractionContext)
   const { type, date } = useContext(FilterContext)

   const handleClick = () => {
      if (nav) {
         toggleNav?.()
      }
      toggleFilter?.()
   }

   return (
      <button
         className={filterStyle.button}
         onClick={handleClick}
      >Фильтры {(type|| date) && `(${[type, date].filter(a => a).map(a => a).length})`}</button>
   )
}