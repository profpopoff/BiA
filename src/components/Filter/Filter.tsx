import { useContext, useState } from 'react'

import { InteractionContext } from '../../context/InteractionContext'
import { FilterContext } from '../../context/FilterContext'

import styles from './Filter.module.scss'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCalendarDays } from '@fortawesome/free-solid-svg-icons'

export default function Filter({ events }: { events: any[] }) {

   const { filterActive } = useContext(InteractionContext)

   return (
      <div className={styles.filter}>
         <div className={filterActive ?
            `${styles.filter_wrapper} ${styles.active}` :
            styles.filter_wrapper}
         >
            <Filters events={events} />
            <Button />
         </div>
      </div>
   )
}

const Filters = ({ events }: { events: any[] }) => {

   const { filter, changeFilter } = useContext(FilterContext)

   const changeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
      if (e.target.checked) {
         changeFilter?.(e.target.value)
      } else {
         changeFilter?.('')
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
            return 'Представление'
      }
   }

   function getTomorrow() {
      const tomorrow = new Date()
      tomorrow.setDate(tomorrow.getDate() + 1)
      return tomorrow.toDateString()
   }

   const todayISO = new Date().toISOString().split('T')[0]

   const [selectedDate, setSelecedDate] = useState(todayISO)

   return (
      <div className={styles.filters}>
         <div className={styles.category}>
            <h3>Категория</h3>
            <ul>
               {types.map(typeElement => (
                  <li key={typeElement}><label>
                     <input type="checkbox" value={`type:${typeElement}`} name="filter"
                        checked={filter.split(':')[1] === typeElement}
                        onChange={changeHandler}
                     />
                     <span>{typeToRus(typeElement)}</span>
                     <span>{events.filter(event => event.type === typeElement).length}</span>
                  </label></li>
               ))}
            </ul>
         </div>
         <div className={styles.date}>
            <h3>Дата</h3>
            <ul>
               <li><label>
                  <input type="checkbox" value={`date:${new Date().toDateString()}`} name="filter"
                     checked={filter.split(':')[1] === new Date().toDateString()}
                     onChange={changeHandler}
                  />
                  <span>Сегодня</span>
               </label></li>
               <li><label>
                  <input type="checkbox"
                     value={`date:${getTomorrow()}`}
                     name="date"
                     checked={filter.split(':')[1] === getTomorrow()}
                     onChange={changeHandler}
                  />
                  <span>Завтра</span>
               </label></li>
               <li><label className={styles.dateSelect}>
                  <input type="checkbox" value={`date:${selectedDate}`} name="filter"
                     checked={filter.split(':')[1] === selectedDate}
                     onChange={changeHandler}
                  />
                  <span>
                     {selectedDate === todayISO ?
                        'Выбрать день' : new Date(selectedDate).toLocaleDateString()}
                  </span>
                  <span className={styles.dateToggle}>
                     <span className={styles.dateToggleButton}>
                        <FontAwesomeIcon icon={faCalendarDays} className={styles.icon} />
                     </span>
                     <input
                        type="date"
                        className={styles.dateInput}
                        value={selectedDate}
                        min={todayISO}
                        onChange={(e) => setSelecedDate(e.target.value)}
                     />
                  </span>
               </label></li>
            </ul>
         </div>
      </div>
   )
}

export const Button = () => {

   const { nav, toggleNav, toggleFilter } = useContext(InteractionContext)
   const { filter } = useContext(FilterContext)

   const handleClick = () => {
      if (nav) {
         toggleNav?.()
      }
      toggleFilter?.()
   }

   return (
      <button
         className={styles.button}
         onClick={handleClick}
      >Фильтры {!!filter && '(1)'}</button>
   )
}