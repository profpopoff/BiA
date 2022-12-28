import styles from './Events.module.scss'
import { quarterArray } from "../../../../utils/divideArray"

import Filter from './components/Filter/Filter'
import { fetchEvents } from '../../../../utils/fetch'
import Galleries from './components/Galleries'

export default async function Events() {

   const { data } = await fetchEvents()

   return (
      <div className="container">
         <div className={styles.wrapper}>
            <Filter events={data} />
            <Galleries events={data} />
         </div>
      </div>
   )
}