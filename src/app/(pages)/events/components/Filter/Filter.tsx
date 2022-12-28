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

   interface IFilter { type?: string, date?: string }

   const [filter, setFilter] = useState<IFilter>({})
   console.log(filter)

   const changeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
      if (e.target.checked) {
         setFilter({ ...filter, [e.target.name]: e.target.value })
      } else {
         setFilter(current => {
            const copy = { ...current }
            delete copy[e.target.name as keyof IFilter]
            return copy
         })
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
               {types.map(type => (
                  <li key={type}><label>
                     <input type="checkbox" value={type} name="type"
                        checked={filter.type === type}
                        onChange={changeHandler}
                     />
                     <span className={filterStyle.span}>
                        <span>{typeToRus(type)}</span>
                        <span>{events.filter(event => event.type === type).length}</span>
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
                     checked={filter.date === 'today'}
                     onChange={changeHandler}
                  />
                  <span>Сегодня</span>
               </label></li>
               <li><label>
                  <input type="checkbox" value="tomorrow" name="date"
                     checked={filter.date === 'tomorrow'}
                     onChange={changeHandler}
                  />
                  <span>Завтра</span>
               </label></li>
               <li><label>
                  <input type="checkbox" value="choose" name="date"
                     checked={filter.date === 'choose'}
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