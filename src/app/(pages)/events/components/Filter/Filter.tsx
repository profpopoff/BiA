'use client'

import { useContext, useState } from 'react'
import { InteractionContext } from '../../../../context/InteractionContext'

import filterStyle from './Filter.module.scss'
import page from '../../Events.module.scss'

export default function Filter({ events }: { events: any[] }) {

   const { filterActive } = useContext(InteractionContext)

   return (
      <div className={filterStyle.filter}>
         <div className={filterActive ? `${filterStyle.filter_wrapper} ${filterStyle.active} ${page.filterActive}` : filterStyle.filter_wrapper}>
            <Filters events={events} />
            <Button />
         </div>
      </div>
   )
}

const Filters = ({ events }: { events: any[] }) => {
   const [filter, setFilter] = useState({ type: '', date: '' })

   const changeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
      if (e.target.checked) {
         setFilter({ ...filter, [e.target.name]: e.target.value })
      } else {
         setFilter({ ...filter, [e.target.name]: '' })

      }
   }

   return (
      <div className={filterStyle.filters}>
         <div className={filterStyle.category}>
            <h3>Тип</h3>
            <ul>
               <li><label>
                  <input type="checkbox" value="exhibition" name="type"
                     checked={filter.type === 'exhibition'}
                     onChange={changeHandler}
                  />
                  Временная выставка
                  {events.filter(event => event.type === 'exhibition').length}
               </label></li>
               <li><label>
                  <input type="checkbox" value="stage" name="type"
                     checked={filter.type === 'stage'}
                     onChange={changeHandler}
                  />
                  Выступление на сцене
                  {events.filter(event => event.type === 'stage').length}
               </label></li>
            </ul>
         </div>
         <div className={filterStyle.date}>
            <h3>Дата</h3>
            <ul>
               <li><label>
                  <input type="checkbox" value="today" name="date"
                     checked={filter.date === 'today'}
                     onChange={changeHandler}
                  />
                  Сегодня
               </label></li>
               <li><label>
                  <input type="checkbox" value="tomorrow" name="date"
                     checked={filter.date === 'tomorrow'}
                     onChange={changeHandler}
                  />
                  Завтра
               </label></li>
               <li><label>
                  <input type="checkbox" value="choose" name="date"
                     checked={filter.date === 'choose'}
                     onChange={changeHandler}
                  />
                  Выбрать день
               </label></li>
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
         className={filterStyle.button}
         onClick={handleClick}
      >Фильтры</button>
   )
}