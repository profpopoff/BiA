'use client'

import { useContext } from 'react'
import { InteractionContext } from '../../../../context/InteractionContext'
import styles from '../Events.module.scss'

export default function EventsWrapper({ children }:
   { children: React.ReactNode }) {

   const { filterActive } = useContext(InteractionContext)

   return (
      <div className={filterActive ? `${styles.wrapper} ${styles.filterActive}` : styles.wrapper}>
         {children}
      </div>
   )
}